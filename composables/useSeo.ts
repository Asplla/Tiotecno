import { useHead, useRoute } from '#imports'
import { useI18n } from 'vue-i18n'
import config from '~/config/config'

export const useSeo = (options?: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
}) => {
  const route = useRoute()
  const { locale } = useI18n()

  const title = options?.title || config.site.title
  const description = options?.description || config.site.description
  const url = options?.url || `${config.site.url}${route.path}`
  const image = options?.image || `${config.site.url}${config.site.ogImage}`
  const keywords = options?.keywords || config.site.keywords

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'author', content: config.site.author },
      
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: locale.value },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // 其他重要的 meta 标签
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: config.site.favicon },
      { rel: 'canonical', href: url }
    ]
  })
} 