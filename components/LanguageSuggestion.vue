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
           <SpotlightCard :spotlight-color="'var(--card-spotlight-color-dark)'"
            @click="acceptLanguageSuggestion"
            class="language-suggestion-accept"
          >
            {{ suggestionMessages?.accept }}
          </SpotlightCard>
          <SpotlightCard :spotlight-color="'var(--card-spotlight-color)'"
            @click="rejectLanguageSuggestion"
            class="language-suggestion-reject"
          >
            {{ suggestionMessages?.reject }}
          </SpotlightCard>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'
import SpotlightCard from '~/components/SpotlightCard.vue'
const {
  showLanguageSuggestion,
  suggestionMessages,
  acceptLanguageSuggestion,
  rejectLanguageSuggestion
} = useLanguage()
</script>