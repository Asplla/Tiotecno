import { ref } from 'vue'

export const useInitOverlay = () => {
  const isInitializing = ref(true)
  const isInitialized = ref(false)

  const hideInitOverlay = () => {
    isInitializing.value = false
    isInitialized.value = true
  }

  const showInitOverlay = () => {
    isInitializing.value = true
  }

  return {
    isInitializing,
    isInitialized,
    hideInitOverlay,
    showInitOverlay
  }
} 