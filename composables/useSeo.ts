import { useHead } from '#app'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import config from '~/config/config'

interface SeoOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  author?: string
}

export const useSeo = (options?: SeoOptions) => {
  const route = useRoute()
  const { locale } = useI18n()

  const title = options?.title || config.site.title
  const description = options?.description || config.site.description
  const url = options?.url || `${config.site.url}${route.path}`
  const image = options?.image || `${config.site.url}${config.site.ogImage}`
  const keywords = options?.keywords || config.site.keywords
  const type = options?.type || 'website'

  useHead({
    title,
    htmlAttrs: {
      lang: locale.value
    },
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: options?.author || config.site.author },
      
      // Open Graph
      { property: 'og:type', content: options?.ogType || type },
      { property: 'og:url', content: options?.ogUrl || url },
      { property: 'og:title', content: options?.ogTitle || title },
      { property: 'og:description', content: options?.ogDescription || description },
      { property: 'og:image', content: options?.ogImage || image },
      { property: 'og:locale', content: locale.value },
      
      // Twitter
      { name: 'twitter:card', content: options?.twitterCard || 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: options?.twitterTitle || title },
      { name: 'twitter:description', content: options?.twitterDescription || description },
      { name: 'twitter:image', content: options?.twitterImage || image },
      
      // 其他重要的 meta 标签
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' }
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'icon', type: 'image/x-icon', href: config.site.favicon }
    ]
  })
} 