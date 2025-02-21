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
import { useSeo } from '~/composables/useSeo'
import { useI18n } from 'vue-i18n'
import config from '~/config/config'
import LanguageSuggestion from '@/components/LanguageSuggestion.vue'
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'

const mounted = ref(false)
const isLoading = ref(true)
const { locale, t } = useI18n()

// 设置全局 SEO
useSeo({
  title: `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`,
  ogTitle: `${t('meta.title.siteName')}${t('meta.title.separator')}${t('meta.title.siteDesc')}`,
  description: config.site.description,
  ogDescription: config.site.description,
  keywords: config.site.keywords,
  author: config.site.author,
  ogImage: config.site.ogImage,
  ogUrl: config.site.url,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: config.site.title,
  twitterDescription: config.site.description,
  twitterImage: config.site.ogImage
})

const { initTheme, cleanup: cleanupTheme } = useTheme()
const { currentLocale } = useLanguage()
const { hideInitOverlay } = useInitOverlay()

if (process.client) {
  initTheme()
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
