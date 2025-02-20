import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  optimizeDeps: {
    exclude: ['@rollup/rollup-linux-x64-gnu']
  },
  build: {
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu']
    }
  },
  plugins: [
    vue(),
    svgLoader()
  ]
}) 