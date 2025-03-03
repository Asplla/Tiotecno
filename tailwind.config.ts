import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
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
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
  plugins: [],
} 