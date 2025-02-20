import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [
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
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css'
  ],
  plugins: [
    '@/plugins/toast.ts',
    '@/plugins/i18n.ts'
  ],
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://myphp-theta-three.vercel.app/',
        changeOrigin: true,
        prependPath: false
      }
    }
  },
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['.vue'],
      }
    ]
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})