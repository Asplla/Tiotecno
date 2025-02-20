<template>
  <div :class="{ 'contents': !isLoading, 'invisible': isLoading }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LanguageSuggestion />
  </div>
  <ClientOnly>
    <InitOverlay @hidden="isLoading = false" />
  </ClientOnly>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { useTheme } from '~/composables/useTheme'
import { useLanguage } from '~/composables/useLanguage'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const { initTheme, cleanup: cleanupTheme } = useTheme()
const { currentLocale } = useLanguage()
const { scrollToElement, cleanup: cleanupScroll } = useSmoothScroll()
const isLoading = ref(true)

// 在 setup 时就初始化主题和语言
if (process.client) {
  initTheme()
}

onUnmounted(() => {
  cleanupTheme()
  cleanupScroll()
})
</script>
