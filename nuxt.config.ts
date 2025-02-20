import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader({
        svgoConfig: {
          multipass: true,
        },
      }),
    ],
  },
  css: [
    '@/assets/css/main.css'
  ],
  plugins: [
    '~/plugins/toast.ts'
  ],
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://myphp-theta-three.vercel.app',
        changeOrigin: true,
        prependPath: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  tailwindcss: {
    config: {
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue'
      ],
      safelist: [
        'space-x-1',
        'space-x-2',
        'space-x-3',
        'space-x-4',
        'space-x-5',
        'space-x-6',
        'space-x-7',
        'space-x-8',
        'space-y-1',
        'space-y-2',
        'space-y-3',
        'space-y-4',
        'space-y-5',
        'space-y-6',
        'space-y-7',
        'space-y-8',
      ]
    }
  }
})