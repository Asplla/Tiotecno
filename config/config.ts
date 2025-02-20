export interface SiteConfig {
  language: {
    // 默认语言代码
    default: string
    // 当所选语言不可用时的回退语言
    fallback: string
    // 是否允许用户切换语言
    allowSwitch: boolean
  }
  theme: {
    // 默认主题 ('light', 'dark', 'system')
    default: string
    // 是否允许用户切换主题
    allowSwitch: boolean
    // 是否允许跟随系统主题设置
    followSystem: boolean
  }
}

/**
 * 网站全局配置
 */
const config: SiteConfig = {
  language: {
    // 设置英语为默认语言
    default: 'en',
    // 如果检测到的语言不支持，回退到英语
    fallback: 'en',
    // 允许用户切换语言
    allowSwitch: true
  },
  theme: {
    // 强制使用暗色主题
    default: 'dark',
    // 禁止用户切换主题
    allowSwitch: false,
    // 禁止跟随系统主题设置
    followSystem: false
  }
}

export default config 