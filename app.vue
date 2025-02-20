<template>
  <div>
    <LanguageSuggestion />
    <div v-if="mounted" :class="{ 'contents': !isLoading, 'invisible': isLoading }">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <ClientOnly>
      <InitOverlay @hidden="isLoading = false" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { useLanguage } from '~/composables/useLanguage'
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import { useInitOverlay } from '~/composables/useInitOverlay'
import { usePageMeta } from '~/composables/usePageMeta'
import { useI18n } from 'vue-i18n'
import config from '~/config/config'
import LanguageSuggestion from './components/LanguageSuggestion.vue'
import { useHead } from 'nuxt/app'
import { computed } from 'vue'

const mounted = ref(false)
const isLoading = ref(true)

// 初始化默认语言
const { locale, t } = useI18n()

// 设置默认标题
usePageMeta()

// 设置默认的 SEO 配置
useHead({
  title: computed(() => `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`),
  meta: [
    {
      name: 'description',
      content: computed(() => config.site.description)
    },
    {
      name: 'keywords',
      content: computed(() => config.site.keywords.join(', '))
    },
    // Open Graph
    {
      property: 'og:title',
      content: computed(() => `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`)
    },
    {
      property: 'og:description',
      content: computed(() => config.site.description)
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: config.site.url
    },
    {
      property: 'og:image',
      content: `${config.site.url}${config.site.ogImage}`
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: config.site.url
    }
  ]
})

const { initTheme, cleanup: cleanupTheme } = useTheme()
const { currentLocale } = useLanguage()
const { scrollToElement, cleanup: cleanupScroll } = useSmoothScroll()
const { hideInitOverlay } = useInitOverlay()

// 在 setup 时就初始化主题和语言
if (process.client) {
  initTheme()
  locale.value = config.language.default
}

onMounted(() => {
  mounted.value = true
  hideInitOverlay()
  isLoading.value = false
})

onUnmounted(() => {
  cleanupTheme()
  cleanupScroll()
})
</script>
