import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

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
      ]
    },
  },
  router: {
    options: {
      hashMode: false,
      scrollBehaviorType: 'smooth'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://myphp-theta-three.vercel.app',
        changeOrigin: true,
        prependPath: true
      }
    },
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
    './plugins/i18n',
    './plugins/smoothScroll.client'
  ],
  build: {
    transpile: ['vue-i18n']
  },
  typescript: {
    shim: false
  },
})