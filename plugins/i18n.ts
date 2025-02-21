import { createI18n } from 'vue-i18n'
import zh from '~/locales/zh'
import en from '~/locales/en'
import es from '~/locales/es'
import config from '~/config/config'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,  // 禁用 Vue 2 的兼容模式，使用 Vue 3 的 Composition API
    globalInjection: true,  // 全局注入 $t, $d 等国际化函数到模板中
    locale: config.language.default,  // 从配置文件获取默认语言
    fallbackLocale: config.language.fallback,  // 从配置文件获取回退语言
    allowComposition: true,  // 允许在 Composition API 中使用 i18n
    messages: {  // 导入各语言的翻译文件
      zh,  // 中文翻译
      en,  // 英文翻译
      es   // 西班牙语翻译
    }
  })

  vueApp.use(i18n)

  return {
    provide: {
      i18n: i18n.global
    }
  }
}) 