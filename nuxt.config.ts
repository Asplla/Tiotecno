import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import fs from 'fs'
import path from 'path'
import config from './config/config'

// 自动获取语言包信息的函数
function getLocales() {
  const localesDir = path.resolve(__dirname, 'locales')
  const files = fs.readdirSync(localesDir)
  
  return files
    .filter(file => file.endsWith('.ts'))
    .map(file => {
      const code = file.replace('.ts', '')
      // 动态导入语言包
      const locale = require(`./locales/${file}`).default
      // 只返回 status 为 true 的语言
      if (locale.language.status) {
        return {
          code,
          file,
          name: locale.language.name
        }
      }
      return null
    })
    .filter(locale => locale !== null)
}

// 导出可用语言列表（只包含语言代码）
export const availableLanguages = getLocales().map(locale => locale.code)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  imports: {
    dirs: ['composables/**']
  },
  experimental: {
    payloadExtraction: false
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      htmlAttrs: {
        lang: 'en' // 默认语言设置为英语
      }
    },
  },
  router: {
    options: {
      hashMode: false,
      scrollBehaviorType: 'smooth'
    }
  },
  nitro: {
    preset: 'vercel-edge'
  },
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            }
          ]
        },
      }),
    ],
  },
  css: [
    '@/assets/css/main.css'
  ],
  plugins: [
    './plugins/toast',
    './plugins/smoothScroll.client'
  ],
  typescript: {
    shim: false
  },
  build: {
    transpile: ['vue-i18n']
  },
  runtimeConfig: {
    public: {
      availableLanguages: getLocales().map(locale => locale.code)
    }
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: config.language.default,
    strategy: 'prefix',
    vueI18n: './config/i18n.config.ts',
    locales: getLocales(),
    detectBrowserLanguage: false,
  },
  modules: [
    '@nuxtjs/i18n'
  ]
})