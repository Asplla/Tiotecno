import { ref, watch, computed } from 'vue'
import config from '~/config/config'

interface CustomMediaQueryList extends MediaQueryList {
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

// 从 localStorage 获取保存的主题设置
const getSavedTheme = () => {
  if (process.client) {
    return localStorage.getItem('theme') || config.theme.default
  }
  return config.theme.default
}

// 创建共享的响应式状态
const currentTheme = ref(getSavedTheme())
const isDarkMode = ref(false)
let mediaQuery: CustomMediaQueryList | null = null

export const useTheme = () => {
  const canSwitchTheme = computed(() => config.theme.allowSwitch)

  // 应用主题
  const applyTheme = () => {
    if (!process.client) return

    const theme = currentTheme.value === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : currentTheme.value

    isDarkMode.value = theme === 'dark'
    
    // 更新主题类名
    const html = document.documentElement
    if (theme === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else if (theme === 'light') {
      html.classList.add('light')
      html.classList.remove('dark')
    } else {
      html.classList.remove('dark', 'light')
    }
  }

  // 切换主题
  const toggleTheme = (event?: Event) => {
    // 阻止事件冒泡
    event?.preventDefault?.()
    
    if (!canSwitchTheme.value || !process.client) return

    const themes = ['system', 'light', 'dark']
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextTheme = themes[(currentIndex + 1) % themes.length]

    // 如果不允许跟随系统且下一个主题是 system，则跳过
    if (!config.theme.followSystem && nextTheme === 'system') {
      currentTheme.value = themes[(currentIndex + 2) % themes.length]
    } else {
      currentTheme.value = nextTheme
    }

    localStorage.setItem('theme', currentTheme.value)
    applyTheme()
  }

  // 初始化主题
  const initTheme = () => {
    if (!process.client) return

    // 从 localStorage 或配置中获取初始主题
    const savedTheme = localStorage.getItem('theme')
    currentTheme.value = savedTheme || config.theme.default

    // 如果不允许跟随系统且当前是系统主题，则使用默认主题
    if (!config.theme.followSystem && currentTheme.value === 'system') {
      currentTheme.value = config.theme.default
      localStorage.setItem('theme', currentTheme.value)
    }

    // 设置系统主题变化监听
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)') as CustomMediaQueryList
    mediaQuery.addEventListener('change', applyTheme)

    // 应用初始主题
    applyTheme()
  }

  // 监听主题变化
  watch(currentTheme, () => {
    if (process.client) {
      applyTheme()
    }
  })

  // 清理监听器
  const cleanup = () => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', applyTheme)
    }
  }

  return {
    currentTheme,
    isDarkMode,
    toggleTheme,
    canSwitchTheme,
    initTheme,
    cleanup
  }
} 