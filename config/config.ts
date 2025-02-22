import { availableLanguages } from '../nuxt.config'
import fs from 'fs'
import path from 'path'

export interface SiteConfig {
  site: {
    url: string
    title: string
    description: string
    keywords: string
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
    // 可用的语言列表
    available: string[]
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

// 获取可用语言列表
function getAvailableLanguages(): string[] {
  const localesDir = path.resolve(__dirname, '../locales')
  return fs.readdirSync(localesDir)
    .filter(file => file.endsWith('.ts'))
    .map(file => file.replace('.ts', ''))
}

/**
 * 网站全局配置
 */
const config: SiteConfig = {
  site: {
    url: 'https://tiotecno.vercel.app',
    title: 'Tiotecno - Trusted China Sourcing Agent.',
    description: 'China purchasing agent dedicated to source the best prices and highest quality. Offering one-stop service tailored for Amazon sellers and online store owners.',
    keywords: '中国外贸采购代理服务商, 外贸采购代理, 外贸采购, 外贸采购代理公司, 外贸采购代理服务, 外贸采购代理费用, 外贸采购代理流程, 外贸采购代理公司排名, 外贸采购代理公司推荐, 外贸采购代理公司哪家好, 外贸采购代理公司哪家便宜, 外贸采购代理公司哪家靠谱, 外贸采购代理公司哪家服务好, 外贸采购代理公司哪家服务便宜, 外贸采购代理公司哪家服务靠谱',
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
    default: 'en-us',
    // 如果检测到的语言不支持，回退到英语
    fallback: 'en-us',
    // 允许用户切换语言
    allowSwitch: true,
    available: [] // 将在运行时通过 useRuntimeConfig 填充
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