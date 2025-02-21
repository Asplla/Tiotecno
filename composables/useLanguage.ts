import { ref, computed, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCookie } from '#app'
import config from '~/config/config'
import { useInitOverlay } from './useInitOverlay'
import { useHead } from '#imports'
import { languageLabels } from '~/constants/languages'

// 自动导入所有语言包
const locales = import.meta.glob('~/locales/*.ts', { eager: true })

// 全局检测状态
let isGlobalDetecting = false

// 动态生成国家到语言的映射
const countryToLanguage = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]
  if (!code || !(module as any).default?.language?.countries) return acc
  
  const countries = (module as any).default.language.countries
  countries.forEach((country: string) => {
    acc[country] = code
  })
  return acc
}, {} as Record<string, string>)

// 动态生成语言标签映射
const languageLabels = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]
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

export const useLanguage = () => {
  const { locale, availableLocales: i18nLocales, t } = useI18n()
  const localeCookie = useCookie('locale', {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  })

  const defaultLanguage = config.language.default
  const currentCode = ref(defaultLanguage)
  const suggestedLanguage = ref<string | null>(null)
  const showLanguageSuggestion = ref(false)
  const countryName = ref('')
  const suggestionMessages = ref<{
    title: string;
    text: string;
    accept: string;
    reject: string;
  } | null>(null)

  // 检查是否允许切换语言
  const canSwitchLanguage = computed(() => config.language.allowSwitch)

  // 初始化语言
  const initLanguage = () => {
    // 如果有 cookie，使用 cookie 中的语言
    if (localeCookie.value) {
      currentCode.value = localeCookie.value
      locale.value = localeCookie.value
    } else {
      // 否则使用默认语言
      currentCode.value = defaultLanguage
      locale.value = defaultLanguage
      localeCookie.value = defaultLanguage
    }
  }

  // 立即初始化默认语言
  initLanguage()

  // 检测访问者的地理位置并设置相应的语言
  const detectAndSetLanguage = async () => {
    // 使用全局状态检查
    if (isGlobalDetecting) return
    isGlobalDetecting = true

    try {
      // 使用新的获取位置函数
      const countryCode = await getLocation()

      // 根据国家代码查找对应的语言
      const detectedLanguage = countryToLanguage[countryCode]
      // 如果没有检测到对应语言，默认建议英语
      const suggestedLang = detectedLanguage || 'en'

      // 先存储检测结果，等待 InitOverlay 消失后再显示
      const shouldShowSuggestion = suggestedLang !== currentCode.value && !checkSuggestionRejected()

      if (shouldShowSuggestion) {
        // 准备提示消息
        suggestedLanguage.value = suggestedLang
        countryName.value = countryCode

        // 获取检测到的语言包
        const detectedLocale = Object.entries(locales).find(([path]) => 
          path.includes(`/${suggestedLang}.ts`)
        )?.[1]

        if (detectedLocale && (detectedLocale as any).default?.language) {
          const langMessages = (detectedLocale as any).default.language
          // 获取当前语言包
          const currentLocale = Object.entries(locales).find(([path]) => 
            path.includes(`/${currentCode.value}.ts`)
          )?.[1]
          const currentLangMessages = (currentLocale as any)?.default?.language
          
          suggestionMessages.value = {
            title: langMessages.suggestionTitle || 'Language Suggestion',
            text: (langMessages.suggestionText || 'Would you like to switch to {language}?')
              .replace('{country}', getCountryName(countryName.value, suggestedLang))
              .replace('{language}', languageLabels[suggestedLang]),
            accept: (langMessages.suggestionAccept || 'Switch to {language}')
              .replace('{language}', languageLabels[suggestedLang]),
            reject: (currentLangMessages?.suggestionReject || 'Keep {language}')
              .replace('{language}', languageLabels[currentCode.value])
          }
        } else {
          suggestionMessages.value = {
            title: 'Language Suggestion',
            text: `Would you like to switch to ${languageLabels[suggestedLang]}?`,
            accept: `Switch to ${languageLabels[suggestedLang]}`,
            reject: `Keep ${languageLabels[currentCode.value]}`
          }
        }

        showLanguageSuggestion.value = true
      }
    } catch (error) {
      initLanguage()
    } finally {
      isGlobalDetecting = false
    }
  }

  // 接受语言建议
  const acceptLanguageSuggestion = () => {
    if (suggestedLanguage.value) {
      currentCode.value = suggestedLanguage.value
      locale.value = suggestedLanguage.value
      localeCookie.value = suggestedLanguage.value
    }
    showLanguageSuggestion.value = false
  }

  // 拒绝语言建议
  const rejectLanguageSuggestion = () => {
    showLanguageSuggestion.value = false
    // 记录拒绝时间
    if (process.client) {
      localStorage.setItem('languageSuggestionRejected', Date.now().toString())
    }
  }

  if (process.client) {
    // 等待页面加载完成后再检测
    onMounted(() => {
      detectAndSetLanguage()
    })
  }

  const availableLocales = computed(() => 
    i18nLocales.map(code => ({
      code,
      label: languageLabels[code] || code
    }))
  )

  const currentLocale = computed(() => {
    return availableLocales.value.find((l: { code: string }) => l.code === currentCode.value)
  })

  const suggestedLocale = computed(() => {
    if (!suggestedLanguage.value) return null
    return availableLocales.value.find((l: { code: string }) => l.code === suggestedLanguage.value)
  })

  const changeLocale = (code: string) => {
    if (!canSwitchLanguage.value) return
    
    currentCode.value = code
    locale.value = code
    localeCookie.value = code

    // 更新页面标题
    useHead({
      title: `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`
    })
  }

  // 获取国家名称
  const getCountryName = (code: string, languageCode?: string) => {
    const regionNames = new Intl.DisplayNames([languageCode || locale.value], { type: 'region' })
    try {
      return regionNames.of(code) || code
    } catch (error) {
      return code
    }
  }

  return {
    currentLocale,
    suggestedLocale,
    availableLocales,
    showLanguageSuggestion,
    countryName,
    suggestionMessages,
    changeLocale,
    detectAndSetLanguage,
    acceptLanguageSuggestion,
    rejectLanguageSuggestion,
    canSwitchLanguage
  }
} 