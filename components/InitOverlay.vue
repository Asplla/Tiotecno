<template>
  <div 
    class="fixed inset-0 z-[100] transition-all duration-500 flex items-center justify-center bg-primary"
    :class="[
      { 'opacity-0 pointer-events-none': !show }
    ]"
  >
    <!-- Logo -->
    <LogoIcon 
      class="h-10 animate-pulse transition-colors duration-500 text-primary" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import LogoIcon from '~/assets/img/logo.svg'
import { useTheme } from '~/composables/useTheme'

const show = ref(true)
const { $router } = useNuxtApp()

const emit = defineEmits(['hidden'])

onMounted(() => {
  // 初始加载完成后隐藏
  setTimeout(() => {
    show.value = false
    emit('hidden')
  }, 500)

  // 监听路由变化
  $router.beforeEach(() => {
    show.value = true
  })

  $router.afterEach(() => {
    // 路由变化完成后隐藏
    setTimeout(() => {
      show.value = false
      emit('hidden')
    }, 500)
  })
})
</script> 