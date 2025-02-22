import type { LocaleMessages } from '@intlify/core-base'
import config from './config'

// 自动导入所有语言包
const locales = import.meta.glob('../locales/*.ts', { eager: true })

// 处理语言包
const messages = Object.entries(locales).reduce((acc, [path, module]) => {
  const code = path.match(/\/([^/]+)\.ts$/)?.[1]

  if (code && (module as any).default) {
    // 预处理语言包中的对象
    const processI18nObject = (obj: any): any => {
      if (!obj || typeof obj !== 'object') return obj
      
      if (obj.loc?.source) {
        return obj.loc.source
      }
      
      if (obj.b?.i) {
        const textObj = obj.b.i.find((item: any) => item.s || item.v)
        if (textObj) {
          return textObj.s || textObj.v || ''
        }
      }
      
      const result: any = Array.isArray(obj) ? [] : {}
      
      for (const key in obj) {
        result[key] = processI18nObject(obj[key])
      }
      
      return result
    }
    
    acc[code] = processI18nObject((module as any).default)
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
  formatLocaleMessage: (locale, message) => message
}

// 导出语言列表供 nuxt.config.ts 使用
export const getI18nLocales = () => availableLocales 