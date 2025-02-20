<template>
  <div>
    <LanguageSuggestion />
    <div v-if="mounted" :class="{ 'contents': !isLoading, 'invisible': isLoading }">
      <div class="min-h-screen flex flex-col">
        <Header />
        <main>
          <NuxtPage />
        </main>
        <Footer />
      </div>
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
import { useInitOverlay } from '~/composables/useInitOverlay'
import { useI18n } from 'vue-i18n'
import config from '~/config/config'
import LanguageSuggestion from './components/LanguageSuggestion.vue'
import Header from '~/layouts/Header.vue'
import Footer from '~/layouts/Footer.vue'
import { useSeoMeta } from '#imports'
import { computed } from 'vue'

const mounted = ref(false)
const isLoading = ref(true)

// 初始化默认语言
const { locale, t } = useI18n()

// 设置默认的 SEO 配置
useSeoMeta({
  title: computed(() => `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`),
  ogTitle: computed(() => `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`),
  description: computed(() => config.site.description),
  ogDescription: computed(() => config.site.description),
  keywords: computed(() => config.site.keywords.join(', ')),
  author: config.site.author,
  ogImage: config.site.ogImage,
  ogUrl: config.site.url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => config.site.title),
  twitterDescription: computed(() => config.site.description),
  twitterImage: config.site.ogImage
})

const { initTheme, cleanup: cleanupTheme } = useTheme()
const { currentLocale } = useLanguage()
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
})
</script>
