import { useI18n } from 'vue-i18n'
import { useHead } from '#app'
import { useLanguage } from './useLanguage'
import config from '~/config/config'

export const usePageMeta = (pageTitle?: string) => {
  const { t } = useI18n()
  const { currentLocale } = useLanguage()
  const defaultLanguage = config.language.default

  useHead({
    htmlAttrs: {
      lang: currentLocale.value?.code || defaultLanguage
    },
    title: pageTitle 
      ? `${pageTitle} - ${config.site.title}`
      : config.site.title,
    meta: [
      {
        name: 'description',
        content: config.site.description
      }
    ]
  })

  return {
    title: pageTitle || config.site.title,
    lang: currentLocale.value?.code || defaultLanguage
  }
} 