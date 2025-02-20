import { defineNuxtPlugin } from '#app'
import { createVNode, render } from 'vue'
import Toast from '~/components/Toast.vue'

const createToast = () => {
  if (process.server) {
    // 在服务器端返回空方法
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
    }
  }

  let container: HTMLDivElement | null = null

  const show = (message: string, type = 'info', duration = 3000) => {
    // 清理之前的 container
    if (container) {
      document.body.removeChild(container)
      render(null, container)
    }

    // 创建新的 container
    container = document.createElement('div')
    document.body.appendChild(container)

    const vnode = createVNode(Toast, {
      message,
      type,
      duration,
      onClose: () => {
        if (container) {
          document.body.removeChild(container)
          render(null, container)
          container = null
        }
      }
    })
    
    render(vnode, container)
  }

  return {
    success: (message: string, duration?: number) => show(message, 'success', duration),
    error: (message: string, duration?: number) => show(message, 'error', duration),
    info: (message: string, duration?: number) => show(message, 'info', duration),
    warning: (message: string, duration?: number) => show(message, 'warning', duration),
  }
}

export type ToastInstance = ReturnType<typeof createToast>

export default defineNuxtPlugin((nuxtApp) => {
  const toast = createToast()
  
  return {
    provide: {
      toast
    }
  }
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastInstance
  }
} 