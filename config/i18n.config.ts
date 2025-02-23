import type { LocaleMessages } from '@intlify/core-base'
import config from './config'

// 自动导入所有语言包
const locales = import.meta.glob('../locales/*.ts', { eager: true })

interface LocaleMessage {
  [key: string]: any;
}

interface LocaleInfo {
  code: string;
  name: string;
  file: string;
}

// 处理语言包
const messages = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]

  if (code && (module as any).default) {
    // 预处理语言包
    const processMessages = (obj: any): any => {
      // 如果是数组，处理每个元素
      if (Array.isArray(obj)) {
        return obj.map(item => processMessages(item))
      }
      
      // 如果不是对象，直接返回
      if (!obj || typeof obj !== 'object') {
        return obj
      }
      
      // 处理对象
      const result: any = {}
      for (const key in obj) {
        const value = obj[key]
        
        // 处理生产环境的结构
        if (value?.t === 0 && value?.b) {
          if (value.b.s) {
            // 简单文本
            result[key] = value.b.s
          } else if (value.b.i) {
            // 复杂文本（带变量）
            result[key] = value.b.i
              .filter((item: any) => item.t === 3)
              .map((item: any) => item.v || '')
              .join('')
          }
        }
        // 递归处理其他对象
        else if (typeof value === 'object') {
          result[key] = processMessages(value)
        }
        // 保持其他值不变
        else {
          result[key] = value
        }
      }
      return result
    }
    
    acc[code] = processMessages((module as any).default)
  }
  return acc
}, {} as Record<string, any>)

// 获取可用的语言列表
const availableLocales = Object.entries(messages).map(([code, module]) => ({
  code,
  name: module.language.name.loc?.source || module.language.name,
  file: `${code}.ts`
}))

export default {
  legacy: false,
  locale: config.language.default,
  messages,
  fallbackLocale: config.language.fallback,
  availableLocales: availableLocales.map(locale => locale.code),
  formatLocaleMessage: (locale: string, message: LocaleMessage) => message
}

// 导出语言列表供 nuxt.config.ts 使用
export const getI18nLocales = (): LocaleInfo[] => availableLocales 