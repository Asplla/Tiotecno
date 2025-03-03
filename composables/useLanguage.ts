import { ref, computed, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#imports'
import { useCookie } from '#app'
import config from '~/config/config'
import { useInitOverlay } from './useInitOverlay'
import { useHead } from '#imports'
import { useRoute, useRouter } from 'vue-router'
import { useState } from '#imports'
import { useRuntimeConfig } from '#app'

// 自动导入所有语言包
const locales = import.meta.glob('~/locales/*.ts', { eager: true })
// 全局检测状态
let isGlobalDetecting = false

interface I18nObject {
  loc?: {
    source: string;
  };
  // 生产环境的结构
  t?: number;
  b?: {
    t?: number;
    s?: string;
    i?: Array<{
      t?: number;
      k?: string;
      v?: string;
      s?: string;
    }>;
  };
}

interface LanguageModule {
  default: {
    language: {
      name: string | I18nObject
      lang: string | I18nObject
      status: boolean
      countries: (string | I18nObject)[]
      suggestion: {
        title: string | I18nObject
        text: string | I18nObject
        accept: string | I18nObject
        reject: string | I18nObject
      }
    }
  }
}

// 构建国家到语言的映射
const countryToLanguage = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.split('/').pop()?.replace('.ts', '')
  const langModule = module as LanguageModule
  
  // 确保模块有正确的结构
  if (!code || !langModule.default?.language?.countries) {
    return acc
  }
  
  // 处理 i18n 转换后的对象数组
  const countries = Object.values(langModule.default.language.countries).map(country => {
    const i18nObj = country as I18nObject
    return i18nObj.loc?.source || country
  })
  
  countries.forEach((country: unknown) => {
    if (typeof country !== 'string') {
      return
    }
    acc[country] = code
  })
  
  return acc
}, {} as Record<string, string>)

// 动态生成语言标签映射
const languageLabels = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.split('/').pop()?.replace('.ts', '')
  if (!code || !(module as any).default?.language?.name) return acc
  
  acc[code] = (module as any).default.language.name
  return acc
}, {} as Record<string, string>)

// 检查是否在12小时内拒绝过语言切换建议
const checkSuggestionRejected = () => {
  if (!process.client) return false
  const rejectedTime = localStorage.getItem('languageSuggestionRejected')
  if (!rejectedTime) return false
  
  const twelveHours = 12 * 60 * 60 * 1000 // 12小时的毫秒数
  const timeDiff = Date.now() - parseInt(rejectedTime)
  return timeDiff < twelveHours
}

// 添加地理位置 API 列表
const geoAPIs = [
  {
    url: 'https://get.geojs.io/v1/ip/country.json',
    parse: (data: any) => data.country
  },
  {
    url: 'https://api.db-ip.com/v2/free/self',
    parse: (data: any) => data.countryCode
  },
  {
    url: 'https://api.ipapi.is/',
    parse: (data: any) => data.location.country.code
  },
  {
    url: 'https://ipwho.is/',
    parse: (data: any) => data.country_code
  },
  {
    url: 'https://api.seeip.org/geoip',
    parse: (data: any) => data.country_code
  },
  {
    url: 'https://api.myip.com',
    parse: (data: any) => data.cc
  }
]
// 添加获取地理位置的函数
const getLocation = async () => {
  for (const api of geoAPIs) {
    try {
      const response = await fetch(api.url)
      if (!response.ok) {
        continue
      }
      
      const data = await response.json()
      const countryCode = api.parse(data)
      
      if (countryCode) {
        return countryCode
      }
    } catch (error) {
      continue
    }
  }
  throw new Error('All geolocation APIs failed')
}

// 辅助函数：从 i18n 对象或字符串中获取实际值
const getI18nValue = (value: string | I18nObject): string => {
  if (typeof value === 'string') return value
  
  // 开发环境
  if (value.loc?.source) {
    return value.loc.source
  }
  
  // 生产环境
  if (value.t === 0 && value.b) {
    // 简单文本
    if (value.b.s) {
      return value.b.s
    }
    // 复杂文本（带变量）
    if (value.b.i) {
      let result = ''
      let currentText = ''
      
      value.b.i.forEach(item => {
        if (item.t === 3) {
          // 累积普通文本
          currentText += item.v || ''
        } else if (item.t === 4) {
          // 添加累积的文本和变量占位符
          result += currentText + `{${item.k}}`
          currentText = ''
        }
      })
      
      // 添加最后剩余的文本
      result += currentText
      
      return result
    }
  }
  
  return ''
}

// 预加载所有语言包
const loadLanguageModule = async (code: string) => {
  try {
    // 使用 Object.entries 直接获取语言包
    const [, module] = Object.entries(locales).find(([path]) => 
      path.toLowerCase().includes(code.toLowerCase())
    ) || []
    
    const langModule = (module as LanguageModule)?.default
    if (!langModule?.language) {
      throw new Error(`Invalid language module for ${code}`)
    }
    return langModule.language
  } catch (error) {
    console.error(`Failed to load language module ${code}:`, error)
    // 回退到默认语言
    const [, defaultModule] = Object.entries(locales).find(([path]) => 
      path.toLowerCase().includes(config.language.default.toLowerCase())
    ) || []
    const defaultLangModule = (defaultModule as LanguageModule)?.default
    if (!defaultLangModule?.language) {
      throw new Error('Default language module not found')
    }
    return defaultLangModule.language
  }
}

export const useLanguage = () => {
  const { locale, locales: i18nLocales, t, setLocale } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const localeCookie = useCookie('locale', {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  })
  const switchLocalePath = useSwitchLocalePath()
  const { isInitializing } = useInitOverlay()
  const isClient = useRuntimeConfig().app.ssr === false

  const defaultLanguage = config.language.default

  const currentCode = useState<string>('locale.current', () => defaultLanguage)
  const suggestedLanguage = useState<string | null>('suggestedLanguage', () => null)
  const showLanguageSuggestion = useState('showLanguageSuggestion', () => false)
  const countryName = ref('')
  const suggestionMessages = useState<{
    title: string;
    text: string;
    accept: string;
    reject: string;
  } | null>('suggestionMessages', () => null)

  // 检查是否允许切换语言
  const canSwitchLanguage = computed(() => config.language.allowSwitch)

  // 获取国家名称
  const getCountryName = async (code: string, langCode: string = 'en_us') => {
    try {
      // 使用指定语言的国家名称
      const locale = langCode.replace('_', '-').toLowerCase()
      return new Intl.DisplayNames([locale], { type: 'region' }).of(code) || code
    } catch (error) {
      console.error('Error getting country name:', error)
      return code
    }
  }

  // 初始化语言
  const initLanguage = async () => {
    try {
      const route = useRoute()
      const router = useRouter()
      
      // 获取当前语言代码（从 URL 或 cookie）
      const urlLang = route.path.split('/')[1]
      const savedLang = localeCookie.value

      // 如果 URL 或 cookie 中没有语言设置，进行语言检测
      if (!urlLang && !savedLang) {
        try {
          // 使用 getLocation 函数获取国家代码
          const countryCode = await getLocation()
          
          if (countryCode && countryToLanguage[countryCode]) {
            const detectedLang = countryToLanguage[countryCode]
            
            // 首次访问自动切换到检测到的语言
            if (detectedLang !== currentCode.value) {
              // 直接设置语言并导航
              currentCode.value = detectedLang
              await setLocale(detectedLang)
              
              // 构建新路径
              const pathWithoutLang = route.path.replace(/^\/[^/]+/, '') || '/'
              const newPath = `/${detectedLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
              
              // 导航到新路径
              await router.push(newPath)
              return
            }
          }
          // 如果没有检测到合适的语言，使用默认语言
          currentCode.value = defaultLanguage
          await setLocale(defaultLanguage)
          
          // 构建新路径
          const pathWithoutLang = route.path.replace(/^\/[^/]+/, '') || '/'
          const newPath = `/${defaultLanguage}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
          
          // 导航到新路径
          await router.push(newPath)
          return
        } catch (error) {
          // 发生错误时也使用默认语言
          currentCode.value = defaultLanguage
          await setLocale(defaultLanguage)
          await router.push(`/${defaultLanguage}`)
        }
      }
      // 如果 URL 中有语言代码且与当前不同，更新当前语言
      if (urlLang && urlLang !== currentCode.value) {
        await changeLocale(urlLang)
        return
      }

      // 如果有保存的语言且与当前不同，更新当前语言
      if (savedLang && savedLang !== currentCode.value) {
        await changeLocale(currentCode.value)
      }
      
      // 初始化完成后检测语言
      await detectAndSetLanguage()
    } catch (error) {
      console.error('初始化语言时出错:', error)
    }
  }

  // 检测访问者的地理位置并设置相应的语言
  const detectAndSetLanguage = async () => {
    try {
      // 检查是否是首次访问
      const isFirstVisit = !localeCookie.value

      // 如果正在检测中，直接返回
      if (isGlobalDetecting) {
        return
      }
      isGlobalDetecting = true

      const countryCode = await getLocation()
      if (!countryCode) {
        return
      }

      let detectedLang = countryToLanguage[countryCode] || defaultLanguage
      // 如果建议的语言与当前语言不同，显示建议
      if (detectedLang !== currentCode.value) {
        // 首次访问直接切换建议语言包
        if(isFirstVisit){
          await changeLocale(detectedLang);
          return;
        }
        suggestedLanguage.value = detectedLang

        // 获取语言包
        const [, langModule] = Object.entries(locales).find(([path]) => 
          path.toLowerCase().includes(detectedLang.toLowerCase())
        ) || []

        const langMessages = (langModule as any)?.default?.language
        const langName = getI18nValue(langMessages.name);

        // 获取当前语言的名称
        const [, currentLangModule] = Object.entries(locales).find(([path]) => 
          path.toLowerCase().includes(currentCode.value.toLowerCase())
        ) || []

        const currentLangMessages = (currentLangModule as any)?.default?.language
        const currentLangName = getI18nValue(currentLangMessages.name)

        suggestionMessages.value = {
          title: getI18nValue(langMessages.suggestion.title),
          text: getI18nValue(langMessages.suggestion.text)
            .replace('{country}', await getCountryName(countryCode, detectedLang))
            .replace('{language}', langName),
          accept: getI18nValue(langMessages.suggestion.accept)
            .replace('{language}', langName),
          reject: getI18nValue(currentLangMessages.suggestion.reject)
            .replace('{language}', currentLangName)
        }

        showLanguageSuggestion.value = true
      }
    } catch (error) {
      console.error('语言检测出错:', error)
    } finally {
      isGlobalDetecting = false
    }
  }

  // 接受语言建议
  const acceptLanguageSuggestion = async () => {
    if (suggestedLanguage.value) {
      try {
        // 先关闭提示框
        showLanguageSuggestion.value = false
        
        const newLang = suggestedLanguage.value
        
        // 使用 changeLocale 切换语言
        await changeLocale(newLang)
      } catch (error) {
        console.error('Error switching language:', error)
      }
    }
  }

  // 拒绝语言建议
  const rejectLanguageSuggestion = () => {
    showLanguageSuggestion.value = false
    
    // 记录拒绝时间，设置 12 小时过期
    const rejectedTime = useCookie('locale.rejected_time', {
      default: () => '',
      maxAge: 60 * 60 * 12  // 12 小时
    })
    rejectedTime.value = Date.now().toString()
    
    // 清除建议
    suggestedLanguage.value = null
  }

  const currentLocale = computed(() => {
    return i18nLocales.value.find((l: { code: string }) => l.code === currentCode.value)
  })
  
  const suggestedLocale = computed(() => {
    if (!suggestedLanguage.value) return null
    return i18nLocales.value.find((l: { code: string }) => l.code === suggestedLanguage.value)
  })

  // 更新 HTML lang 属性
  const updateHtmlLang = async (code: string) => {
    try {
      // 从语言包中获取 lang
      const langModule = await loadLanguageModule(code)
      const lang = getI18nValue(langModule.lang).split('-')[0]
      useHead({
        htmlAttrs: {
          lang
        }
      })
    } catch (error) {
    }
  }

  const changeLocale = async (code: string) => {
    if (!canSwitchLanguage.value) return
    
    try {
      
      // 获取当前路径（移除语言前缀）
      const currentPath = route.path
      const pathWithoutLang = currentPath.replace(/^\/[^\/]+/, '') || '/'
      
      // 所有语言都添加前缀
      const newPath = `/${code}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
      
      // 先更新 i18n locale
      await setLocale(code)
      
      // 更新 cookie 和当前代码
      localeCookie.value = code
      currentCode.value = code
      
      // 更新 HTML lang 属性
      updateHtmlLang(code)
      
      // 只在路径不同时才进行导航
      if (newPath !== currentPath) {
        await router.replace(newPath)
      }
      
      // 强制更新 i18n 实例
      await nextTick()
      detectAndSetLanguage()
      locale.value = code
    } catch (error) {
      console.error('语言切换出错:', error)
    }
  }

  // 在组件挂载时初始化语言
  onMounted(() => {
    initLanguage()
  })

  return {
    locale,
    locales: i18nLocales,
    t,
    setLocale,
    currentCode,
    suggestedLanguage,
    showLanguageSuggestion,
    countryName,
    suggestionMessages,
    canSwitchLanguage,
    detectAndSetLanguage,
    acceptLanguageSuggestion,
    rejectLanguageSuggestion,
    getCountryName,
    currentLocale,
    suggestedLocale,
    changeLocale
  }
}