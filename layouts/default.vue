<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    
    <!-- 语言建议弹窗 -->
    <ClientOnly>
      <div v-if="showLanguageSuggestion && suggestionMessages" class="language-suggestion-container">
        <div class="language-suggestion">
          <h3 class="language-suggestion-title">{{ suggestionMessages.title }}</h3>
          <p class="language-suggestion-text">{{ suggestionMessages.text }}</p>
          <div class="language-suggestion-buttons">
            <button @click="rejectLanguageSuggestion" class="language-suggestion-reject">
              {{ suggestionMessages.reject }}
            </button>
            <button @click="acceptLanguageSuggestion" class="language-suggestion-accept">
              {{ suggestionMessages.accept }}
            </button>
          </div>
        </div>
        <div class="language-suggestion-overlay" @click="rejectLanguageSuggestion"></div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from '~/layouts/Header.vue'
import Footer from '~/layouts/Footer.vue'
import { useLanguage } from '~/composables/useLanguage'
import { useInitOverlay } from '~/composables/useInitOverlay'

const { 
  showLanguageSuggestion, 
  suggestionMessages, 
  acceptLanguageSuggestion, 
  rejectLanguageSuggestion 
} = useLanguage()

const { hideInitOverlay } = useInitOverlay()

onMounted(() => {
  // 给一个短暂的延迟，确保页面内容已加载
  setTimeout(() => {
    hideInitOverlay()
  }, 1000)
})
</script>

<style scoped>
</style> 