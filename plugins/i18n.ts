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
    messages: {
      zh,
      en,
      es
    }
  })

  vueApp.use(i18n)
}) 