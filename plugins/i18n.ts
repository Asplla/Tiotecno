import { createI18n } from 'vue-i18n'
import zh from '~/locales/zh'
import en from '~/locales/en'
import es from '~/locales/es'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh',
    fallbackLocale: 'zh',
    allowComposition: true,
    messages: {
      zh,
      en,
      es
    }
  })

  vueApp.use(i18n)

  return {
    provide: {
      i18n: i18n.global
    }
  }
}) 