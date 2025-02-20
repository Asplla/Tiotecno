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
                                class="text-sm navbar-link transition-colors"
                            >
                                {{ t(`menu.${item.href.substring(1)}`) }}
                            </a>
                        </nav>
                    </div>
                    <!-- Copyright -->
                    <p class="text-sm text-center md:text-left text-secondary">© {{ new Date().getFullYear() }} Tiotecno. {{ t('footer.rights') }}</p>
                </div>
                <!-- Language & Theme Switcher -->
                <div class="flex items-center gap-x-4 -mt-2">
                    <ClientOnly>
                    <!-- 语言切换下拉菜单 -->
                    <div v-if="canSwitchLanguage"
                        class="relative dropdown-container"
                        @mouseover="isLangOpen = true" 
                        @mouseleave="isLangOpen = false"
                    >
                        <button 
                            class="flex items-center space-x-1 px-3 py-2 rounded-md footer-btn"
                        >
                            <!-- 翻译图标 -->
                            <WorldIcon class="w-5 h-5" />
                            <span class="text-sm">{{ currentLocale?.label || 'Language' }}</span>
                            <!-- 下箭头图标 -->
                            <ArrowDownIcon class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isLangOpen }" />
                        </button>
                        
                        <div 
                            v-show="isLangOpen"
                            class="dropdown-menu bottom-[calc(100%+1px)] right-0"
                        >
                            <button
                                v-for="lang in availableLocales"
                                :key="lang.code"
                                @click="changeLang(lang.code)"
                                :class="{ 'active': currentLocale?.code === lang.code }"
                            >
                                <span class="text-sm">{{ lang.label }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- 主题切换按钮 -->
                    <button 
                        v-if="canSwitchTheme"
                        @click="toggleTheme"
                        class="p-2 rounded-md footer-btn"
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

<script setup>
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
const { currentLocale, availableLocales, changeLocale, canSwitchLanguage } = useLanguage()
const { currentTheme, isDarkMode, toggleTheme, canSwitchTheme } = useTheme()

const isLangOpen = ref(false)
const selectedLocale = ref('zh-CN')

const themeLabels = {
    system: t('theme.system'),
    light: t('theme.light'),
    dark: t('theme.dark')
}

const changeLang = (code) => {
    changeLocale(code)
    isLangOpen.value = false
}

const switchLocale = () => {
    // TODO: Implement locale switching logic
}
</script>