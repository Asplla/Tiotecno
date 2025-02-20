<template>
    <footer class="py-8 bg-primary" :class="{ 'dark': currentTheme === 'dark' || (currentTheme === 'system' && isDarkMode) }">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <!-- Left Section: Logo, Nav & Copyright -->
                <div class="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
                    <!-- Logo & Nav -->
                    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <!-- Logo -->
                        <a href="/" class="text-xl font-bold dark-text flex items-center">
                            <LogoIcon class="h-4 mr-2" />
                        </a>
                        <!-- Navigation Links -->
                        <nav class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                            <a 
                                v-for="item in menuItems" 
                                :key="item.href"
                                :href="item.href" 
                                class="text-sm navbar-link transition-colors"
                            >
                                {{ item.text }}
                            </a>
                        </nav>
                    </div>
                    <!-- Copyright -->
                    <p class="text-sm text-center md:text-left">© 2025 Tiotecno. All rights reserved.</p>
                </div>
                <!-- Language & Theme Switcher -->
                <div class="flex items-center space-x-4">
                    <!-- 语言切换下拉菜单 -->
                    <div class="relative dropdown-container"
                        @mouseover="isLangOpen = true" 
                        @mouseleave="isLangOpen = false"
                    >
                        <button 
                            class="flex items-center space-x-1 px-3 py-2 rounded-md footer-btn"
                        >
                            <!-- 翻译图标 -->
                            <WorldIcon class="w-5 h-5" />
                            <span class="text-sm">{{ currentLang.label }}</span>
                            <!-- 下箭头图标 -->
                            <ArrowDownIcon class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isLangOpen }" />
                        </button>
                        
                        <div 
                            v-show="isLangOpen"
                            class="dropdown-menu bottom-[calc(100%+1px)] right-0"
                        >
                            <button
                                v-for="lang in languages"
                                :key="lang.code"
                                @click="changeLang(lang.code)"
                            >
                                <span class="text-sm">{{ lang.label }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- 主题切换按钮 -->
                    <button 
                        @click="toggleTheme"
                        class="p-2 rounded-md footer-btn"
                        :title="themeLabels[currentTheme]"
                    >
                        <!-- 系统主题图标 -->
                         <ThemeSystemIcon class="w-5 h-5" v-if="currentTheme === 'system'" />
                        <ThemeLightIcon class="w-5 h-5" v-else-if="currentTheme === 'light'" />
                        <!-- 日间模式图标 -->
                        <!-- 夜间模式图标 -->
                         <ThemeDarkIcon class="w-5 h-5" v-else />
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LogoIcon from '~/assets/img/logo.svg'
import ArrowDownIcon from '~/assets/icon/chevron-down.svg'
import WorldIcon from '~/assets/icon/world.svg'
import ThemeSystemIcon from '~/assets/icon/theme-system.svg'
import ThemeLightIcon from '~/assets/icon/theme-light.svg'
import ThemeDarkIcon from '~/assets/icon/theme-dark.svg'
import { menuItems } from '~/config/menu'
// 语言配置
const languages = [
    { code: 'zh', label: '简体中文' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
]

const currentLang = ref(languages[0])
const isLangOpen = ref(false)

const changeLang = (code) => {
    currentLang.value = languages.find(lang => lang.code === code)
    isLangOpen.value = false
    // TODO: 实现实际的语言切换逻辑
}

// 主题配置
const themes = ['system', 'light', 'dark']
const themeLabels = {
    system: '跟随系统',
    light: '日间模式',
    dark: '夜间模式'
}

const currentTheme = ref('system')
const isDarkMode = ref(false)

const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme.value)
    currentTheme.value = themes[(currentIndex + 1) % themes.length]
    applyTheme()
}

const applyTheme = () => {
    const theme = currentTheme.value === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : currentTheme.value

    isDarkMode.value = theme === 'dark'
    document.documentElement.classList.toggle('dark', theme === 'dark')
}

// 监听系统主题变化
onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', applyTheme)
    applyTheme()
})

const availableLocales = [
    {
        code: 'zh-CN',
        name: '简体中文',
    },
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'es',
        name: 'Español',
    }
]

const selectedLocale = ref('zh-CN')

const switchLocale = () => {
    // TODO: Implement locale switching logic
}
</script>