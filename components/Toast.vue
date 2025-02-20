<template>
  <Teleport to="body">
    <div class="fixed top-[72px] left-0 right-0 flex justify-center z-40 pointer-events-none">
      <Transition 
        enter-from-class="opacity-0 translate-y-[-16px]"
        enter-active-class="transition-all duration-200 ease-out"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-to-class="opacity-0 translate-y-[-16px]"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
      >
        <div 
          v-show="isVisible"
          class="flex items-center py-2.5 px-4 max-w-[480px] w-auto inline-flex rounded-lg shadow-md pointer-events-auto mx-4"
          :class="typeClasses[type]"
        >
          <!-- 图标 -->
          <div class="mr-3 flex-shrink-0">
            <!-- Success Icon -->
            <svg v-if="type === 'success'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- Error Icon -->
            <svg v-if="type === 'error'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <!-- Info Icon -->
            <svg v-if="type === 'info'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 8v8m0-12h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <!-- 消息 -->
          <div class="flex-1 text-sm font-medium">{{ message }}</div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['close'])

const isVisible = ref(false)
let timer = null

const typeClasses = {
  success: 'toast-success shadow-sm',
  error: 'toast-error shadow-sm',
  info: 'toast-info shadow-sm'
}

const show = () => {
  clearTimeout(timer)
  isVisible.value = true
  if (props.duration > 0) {
    timer = setTimeout(() => {
      hide()
    }, props.duration)
  }
}

const hide = () => {
  isVisible.value = false
}

const beforeLeave = (el) => {
  // 确保元素在离开动画期间保持原有高度
  el.style.height = `${el.offsetHeight}px`
}

const afterLeave = () => {
  clearTimeout(timer)
  timer = null
  emit('close')
}

onMounted(() => {
  show()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.transform {
  transition-property: transform, opacity;
}

.toast-success {
  background-color: var(--toast-success-bg);
  color: var(--toast-success-text);
  border: 1px solid var(--toast-success-border);
}

.toast-error {
  background-color: var(--toast-error-bg);
  color: var(--toast-error-text);
  border: 1px solid var(--toast-error-border);
}

.toast-info {
  background-color: var(--toast-info-bg);
  color: var(--toast-info-text);
  border: 1px solid var(--toast-info-border);
}
</style> 