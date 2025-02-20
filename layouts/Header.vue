<template>
  <header class="fixed top-0 left-0 right-0 z-50 global-header transition-all duration-200"
    :class="isScrolled || isMenuOpen ? '' : 'bg-transparent border-transparent'">
    <div class="container mx-auto px-6 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <a href="/" class="text-xl font-bold flex items-center" :class="{ 'text-white': !isScrolled && !isMenuOpen, 'text-primary': isScrolled || isMenuOpen }">
          <LogoIcon class="h-4 mr-2 transition-colors" :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a v-for="item in menuItems" :key="item.href" :href="item.href" class="text-sm navbar-link transition-colors"
            :class="{
              'active': activeSection === item.href.substring(1)
            }"
            @click="scrollToSection($event, item.href)">
            {{ item.text }}
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden flex items-center justify-center" 
          :class="{ 'text-white': !isScrolled && !isMenuOpen, 'text-primary': isScrolled || isMenuOpen }"
          @click="toggleMenu"
        >
          <div class="w-[22px] h-[22px] relative flex items-center justify-center">
            <span class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-300"
              :class="isMenuOpen ? 'top-[10px] rotate-45' : 'top-[3px]'"></span>
            <span class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-300"
              :class="isMenuOpen ? 'opacity-0' : 'opacity-100 top-[10px]'"></span>
            <span class="absolute h-[2.5px] w-[22px] bg-current transition-all duration-300"
              :class="isMenuOpen ? 'top-[10px] -rotate-45' : 'top-[17px]'"></span>
          </div>
        </button>

        <!-- Mobile Navigation -->
        <div 
          class="fixed inset-x-0 top-[65px] h-[calc(100vh-65px)] z-30 md:hidden navbar-bg transition-all origin-top transform"
          :class="[
            isMenuOpen 
              ? 'opacity-100 translate-y-0 visible duration-400'
              : 'opacity-0 -translate-y-4 invisible duration-250'
          ]"
        >
          <nav class="container mx-auto px-6 py-4 flex flex-col space-y-4 transition-all duration-400 transform-gpu overflow-y-auto scrollbar-hidden">
            <a v-for="item in menuItems" :key="item.href" :href="item.href"
              class="text-sm text-primary transition-colors py-2" @click="scrollToSection($event, item.href)">
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import LogoIcon from '~/assets/img/logo.svg'
import { menuItems } from '~/config/menu'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')

// 检查当前活动的 section
const checkActiveSection = () => {
  const sections = menuItems.map(item => ({
    id: item.href.substring(1),
    element: document.querySelector(item.href)
  }))

  for (const section of sections) {
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      const offset = 100 // 可以调整这个值来改变触发点
      
      if (rect.top <= offset && rect.bottom >= offset) {
        activeSection.value = section.id
        return
      }
    }
  }
  activeSection.value = ''
}

// 切换菜单状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.classList.toggle('no-scroll', isMenuOpen.value)
}

// 监听滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
  checkActiveSection()
}

// 点击外部关闭菜单
const closeMenu = (e) => {
  if (isMenuOpen.value && !e.target.closest('header')) {
    isMenuOpen.value = false
    document.body.classList.remove('no-scroll')
  }
}

const scrollToSection = (e, href) => {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 65 // 减去 header 高度
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
    isMenuOpen.value = false
    document.body.classList.remove('no-scroll')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeMenu)
  handleScroll() // 初始检查
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeMenu)
  document.body.classList.remove('no-scroll') // 确保在组件卸载时恢复滚动
})
</script>