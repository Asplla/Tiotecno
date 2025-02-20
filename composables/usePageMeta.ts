import { useI18n } from 'vue-i18n'
import { useHead } from '#imports'
import { useLanguage } from './useLanguage'
import config from '~/config/config'

export const usePageMeta = (pageTitle?: string) => {
  const { t } = useI18n()
  const { currentLocale } = useLanguage()
  const defaultLanguage = config.language.default

  useHead(() => {
    // 使用当前语言或默认语言
    const currentLang = currentLocale.value?.code || defaultLanguage

    const separator = t('meta.title.separator')
    const siteName = t('meta.title.siteName')
    const siteDesc = t('meta.title.siteDesc')

    const title = pageTitle
      ? `${pageTitle}${separator}${siteName}${separator}${siteDesc}`
      : `${siteName}${separator}${siteDesc}`

    return {
      title,
      htmlAttrs: {
        lang: currentLang
      }
    }
  })
} 