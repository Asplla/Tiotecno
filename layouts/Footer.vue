<template>
    <footer class="py-8 bg-primary">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-start gap-6">
                <!-- Left Section: Logo, Nav & Copyright -->
                <div class="flex flex-col items-center md:items-start gap-6 w-full md:w-auto">
                    <!-- Logo & Nav -->
                    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <!-- Logo -->
                        <a href="/" class="text-xl font-bold dark-text flex items-center">
                            <ClientOnly>
                            <LogoIcon class="h-4 mr-2 text-primary" />
                            </ClientOnly>
                        </a>
                        <!-- Navigation Links -->
                        <nav class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                            <a 
                                v-for="item in menuItems" 
                                :key="item.href"
                                :href="item.href" 
                                @click.prevent="scrollToElement(item.href.substring(1))"
                                class="text-sm navbar-link transition-colors"
                            >
                                {{ t(`menu.${item.href.substring(1)}`) }}
                            </a>
                        </nav>
                    </div>
                    <!-- Copyright -->
                    <p class="text-sm text-center md:text-left text-secondary">{{ t('footer.copyright') }} © {{ new Date().getFullYear() }} Tiotecno. {{ t('footer.rights') }}</p>
                </div>
                <!-- Language & Theme Switcher -->
                <div class="flex items-center mx-auto md:mx-0 gap-x-4 -mt-2">
                    <ClientOnly>
                    <!-- 语言切换下拉菜单 -->
                    <div v-if="canSwitchLanguage"
                        class="relative dropdown-container"
                        @mouseover="isLangOpen = true" 
                        @mouseleave="isLangOpen = false"
                    >
                        <button 
                            class="dropdown-btn flex items-center space-x-1 px-3 py-2 rounded-md footer-btn"
                        >
                            <!-- 翻译图标 -->
                            <WorldIcon class="w-5 h-5" />
                            <span class="text-sm px-0.5">{{ currentLocale?.name || 'Language' }}</span>
                            <!-- 下箭头图标 -->
                            <ArrowDownIcon class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isLangOpen }" />
                        </button>
                        
                        <div 
                            v-show="isLangOpen"
                            class="dropdown-menu w-36 mb-2 bottom-[calc(100%+1px)] right-0"
                        >
                            <button class="dropdown-item text-sm px-4 py-2"
                                v-for="locale in locales"
                                :key="locale.code"
                                @click="onLocaleChange(locale.code)"
                                :class="{ 'active': currentLocale?.code === locale.code }"
                            >
                                {{ locale.name }}
                            </button>
                        </div>
                    </div>

                    <!-- 主题切换按钮 -->
                    <button 
                        v-if="canSwitchTheme"
                        @click="toggleTheme"
                        class="p-2 rounded-md footer-btn btn-default"
                        :title="themeLabels[currentTheme]"
                    >
                        <ThemeSystemIcon v-if="currentTheme === 'system'" class="w-5 h-5" />
                        <ThemeLightIcon v-else-if="currentTheme === 'light'" class="w-5 h-5" />
                        <ThemeDarkIcon v-else class="w-5 h-5" />
                    </button>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menuItems } from '~/config/menu'
import { useTheme } from '~/composables/useTheme'
import { useLanguage } from '~/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import LogoIcon from '~/assets/img/logo.svg?component'
import ArrowDownIcon from '~/assets/icon/chevron-down.svg?component'
import WorldIcon from '~/assets/icon/world.svg?component'
import ThemeSystemIcon from '~/assets/icon/theme-system.svg?component'
import ThemeLightIcon from '~/assets/icon/theme-light.svg?component'
import ThemeDarkIcon from '~/assets/icon/theme-dark.svg?component'

const { t } = useI18n()
const {
    currentCode,
    currentLocale,
    changeLocale,
    canSwitchLanguage,
    locales
} = useLanguage()
const { currentTheme, isDarkMode, toggleTheme, canSwitchTheme } = useTheme()

const isLangOpen = ref(false)

const themeLabels: { [key: string]: string } = {
    system: t('theme.system'),
    light: t('theme.light'),
    dark: t('theme.dark')
}

const onLocaleChange = (code: string) => {
    changeLocale(code)
    isLangOpen.value = false
}

const scrollToElement = (elementId: string) => {
    if (!process.client) return
    
    const element = document.getElementById(elementId)
    if (element) {
        const headerOffset = 65
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
}
</script>