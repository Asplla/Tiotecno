<template>
  <div
    ref="cardRef"
    class="relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8"
    :class="className"
    @mousemove="handleMouseMove"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
      :style="{
        opacity: opacity,
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
      }"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  className?: string
  spotlightColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  spotlightColor: 'rgba(255, 255, 255, 0.25)'
})

const cardRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const position = ref({ x: 0, y: 0 })
const opacity = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value || isFocused.value) return

  const rect = cardRef.value.getBoundingClientRect()
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

const handleFocus = () => {
  isFocused.value = true
  opacity.value = 0.6
}

const handleBlur = () => {
  isFocused.value = false
  opacity.value = 0
}

const handleMouseEnter = () => {
  opacity.value = 0.6
}

const handleMouseLeave = () => {
  opacity.value = 0
}
</script> 