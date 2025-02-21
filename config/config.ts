export interface SiteConfig {
  site: {
    url: string
    title: string
    description: string
    keywords: string[]
    author: string
    email: string
    favicon: string
    ogImage: string
    socials: {
      twitter?: string
      github?: string
      linkedin?: string
    }
  }
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
  site: {
    url: 'https://tiotecno.vercel.app',
    title: 'Tiotecno - Trusted China Sourcing Agent.',
    description: 'China purchasing agent dedicated to source the best prices and highest quality. Offering one-stop service tailored for Amazon sellers and online store owners.',
    keywords: [
      'China sourcing agent',
      'China buying agent',
      'China procurement service',
      'China product sourcing',
      'China supplier verification',
      'China factory audit',
      'China quality inspection',
      'China manufacturing',
      'China wholesale supplier',
      'Amazon FBA sourcing',
      'China import export',
      'China trade agent',
      'China supply chain',
      'China dropshipping agent',
      'Alibaba sourcing agent'
    ],
    author: 'Tiotecno.',
    email: 'tiotecno@hotmail.com',
    favicon: '/favicon.ico',
    ogImage: '/src/img/og-image.jpg',
    socials: {
      twitter: 'https://twitter.com/your-handle',
      github: 'https://github.com/Tiotecno',
      linkedin: 'https://linkedin.com/in/your-profile'
    }
  },
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