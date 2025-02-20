<template>
  <Transition>
    <div v-if="showLanguageSuggestion" class="language-suggestion-container">
      <div class="language-suggestion-overlay" @click="rejectLanguageSuggestion"></div>
      <div class="language-suggestion">
        <h2 class="language-suggestion-title">{{ suggestionMessages?.title }}</h2>
        <p class="language-suggestion-text">
          {{ suggestionMessages?.text }}
        </p>
        <div class="language-suggestion-buttons">
          <button 
            @click="acceptLanguageSuggestion"
            class="language-suggestion-accept"
          >
            {{ suggestionMessages?.accept }}
          </button>
          <button 
            @click="rejectLanguageSuggestion"
            class="language-suggestion-reject"
          >
            {{ suggestionMessages?.reject }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const {
  showLanguageSuggestion,
  suggestionMessages,
  acceptLanguageSuggestion,
  rejectLanguageSuggestion
} = useLanguage()
</script>