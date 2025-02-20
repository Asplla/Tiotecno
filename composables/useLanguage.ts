import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCookie } from '#app'
import config from '~/config/config'

// 自动导入所有语言包
const locales = import.meta.glob('~/locales/*.ts', { eager: true })

// 动态生成国家到语言的映射
const countryToLanguage = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]
  const countries = (module as any).default?.language?.countries as string[] || []
  
  countries.forEach((country: string) => {
    // 如果一个国家已经有语言映射，我们保留第一个映射
    if (!acc[country] && code) {
      acc[country] = code
    }
  })
  return acc
}, {} as Record<string, string>)

// 动态生成语言标签映射
const languageLabels = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]
  if (code && (module as any).default?.language?.name) {
    acc[code] = (module as any).default.language.name
  }
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

export const useLanguage = () => {
  const { locale, availableLocales: i18nLocales } = useI18n()
  const localeCookie = useCookie('locale', {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
    watch: true
  })

  const defaultLanguage = 'en' // 设置默认语言为英语
  const currentCode = ref(localeCookie.value || defaultLanguage)
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

  // 检测访问者的地理位置并设置相应的语言
  const detectAndSetLanguage = async () => {
    try {
      // 使用 GeoJS API 替代 ipapi.co
      const response = await fetch('https://get.geojs.io/v1/ip/country.json', {
        mode: 'cors'
      })
      const data = await response.json()
      
      // 获取国家名称
      const countryResponse = await fetch(`https://get.geojs.io/v1/ip/country/${data.ip}.json`, {
        mode: 'cors'
      })
      const countryData = await countryResponse.json()
      countryName.value = countryData.name || data.country

      // 根据国家代码获取对应的语言，如果没有对应的语言则使用默认语言
      const detectedLanguage = countryToLanguage[data.country] || defaultLanguage

      if (localeCookie.value) {
        // 如果当前使用的语言与定位到的地区使用的语言不一致，且未在12小时内拒绝过建议
        if (localeCookie.value !== detectedLanguage && !checkSuggestionRejected()) {
          // 建议切换到定位地区的语言
          suggestedLanguage.value = detectedLanguage
          showLanguageSuggestion.value = true
          
          // 获取检测到的语言包
          const detectedLocale = Object.entries(locales).find(([path]) => 
            path.includes(`/${detectedLanguage}.ts`)
          )?.[1]
          
          // 使用检测到的语言的提示文字
          if (detectedLocale) {
            suggestionMessages.value = {
              title: (detectedLocale as any).default.language.suggestionTitle || 'Language Suggestion',
              text: (detectedLocale as any).default.language.suggestionText || 
                `We noticed you're browsing from ${countryName.value}. Would you like to switch to ${
                  languageLabels[detectedLanguage]
                }?`,
              accept: (detectedLocale as any).default.language.suggestionAccept || 
                `Switch to ${languageLabels[detectedLanguage]}`,
              reject: (detectedLocale as any).default.language.suggestionReject || 
                `Keep ${languageLabels[localeCookie.value]}`
            }
          }
        }
      } else {
        // 如果没有设置语言，直接使用检测到的语言
        currentCode.value = detectedLanguage
        locale.value = detectedLanguage
        localeCookie.value = detectedLanguage
      }
    } catch (error) {
      console.error('Failed to detect location:', error)
      if (!localeCookie.value) {
        currentCode.value = defaultLanguage
        locale.value = defaultLanguage
        localeCookie.value = defaultLanguage
      }
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
    // 在客户端初始化时检测语言
    detectAndSetLanguage()
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