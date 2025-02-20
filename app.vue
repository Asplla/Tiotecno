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

const mounted = ref(false)
const isLoading = ref(true)

// 初始化默认语言
const { locale } = useI18n()

// 设置默认标题
usePageMeta()

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
