import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

export const useSmoothScroll = () => {
  const router = useRouter()

  const scrollToElement = async (id: string) => {
    // 等待下一个 DOM 更新周期
    await nextTick()
    
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 65 // 头部导航的高度
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // 使用原生滚动以获得更好的性能
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleSmoothScroll = async (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const link = target.closest('a') // 使用 closest 来处理嵌套元素
    
    if (!link) return
    
    const href = link.getAttribute('href')
    if (!href?.startsWith('#')) return
    
    event.preventDefault()
    const id = href.slice(1)
    
    await scrollToElement(id)
  }

  const setupScrollBehavior = () => {
    if (!process.client) return

    // 处理点击事件
    document.addEventListener('click', handleSmoothScroll)

    // 处理路由变化
    router.afterEach(async (to) => {
      if (to.hash) {
        await scrollToElement(to.hash.slice(1))
      }
    })
  }

  // 初始化
  setupScrollBehavior()

  const cleanup = () => {
    if (process.client) {
      document.removeEventListener('click', handleSmoothScroll)
    }
  }

  return {
    scrollToElement,
    cleanup
  }
} 