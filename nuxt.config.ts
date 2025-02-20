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
  }
})