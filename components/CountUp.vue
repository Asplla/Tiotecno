<template>
  <span ref="countRef" :class="className" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  to: number
  from?: number
  direction?: 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  startWhen?: boolean
  separator?: string
  onStart?: () => void
  onEnd?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  from: 0,
  direction: 'up',
  delay: 0,
  duration: 2,
  className: '',
  startWhen: true,
  separator: '',
  onStart: undefined,
  onEnd: undefined
})

const countRef = ref<HTMLElement | null>(null)
const currentValue = ref(props.direction === 'down' ? props.to : props.from)
let animationFrame: number | null = null
let startTime: number | null = null

// 使用 vueuse 的 useIntersectionObserver 替代 React 的 useInView
const { stop } = useIntersectionObserver(
  countRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && props.startWhen) {
      startAnimation()
    }
  },
  { threshold: 0 }
)

// 格式化数字
const formatNumber = (num: number) => {
  const options = {
    useGrouping: !!props.separator,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }

  const formattedNumber = new Intl.NumberFormat('en-US', options).format(
    Number(num.toFixed(0))
  )

  return props.separator
    ? formattedNumber.replace(/,/g, props.separator)
    : formattedNumber
}

// 使用 requestAnimationFrame 实现平滑动画
const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const progress = (timestamp - startTime) / (props.duration * 1000)

  if (progress < 1) {
    const easedProgress = easeOutExpo(progress)
    const value = props.direction === 'down'
      ? props.to + (props.from - props.to) * (1 - easedProgress)
      : props.from + (props.to - props.from) * easedProgress

    if (countRef.value) {
      countRef.value.textContent = formatNumber(value)
    }
    animationFrame = requestAnimationFrame(animate)
  } else {
    if (countRef.value) {
      countRef.value.textContent = formatNumber(props.direction === 'down' ? props.from : props.to)
    }
    props.onEnd?.()
  }
}

// 缓动函数
const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

// 开始动画
const startAnimation = () => {
  if (props.onStart) props.onStart()
  
  // 设置初始值
  if (countRef.value) {
    countRef.value.textContent = formatNumber(props.direction === 'down' ? props.to : props.from)
  }

  // 延迟启动动画
  setTimeout(() => {
    startTime = null
    animationFrame = requestAnimationFrame(animate)
  }, props.delay * 1000)
}

// 监听 startWhen 变化
watch(() => props.startWhen, (newVal) => {
  if (newVal) {
    startAnimation()
  }
})

// 清理
onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  stop()
})
</script>