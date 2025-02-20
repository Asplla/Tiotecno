import { onMounted, onUnmounted } from 'vue'

export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string) => {
    if (!process.client) return

    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 65
      element.scrollIntoView({ behavior: 'smooth' })
      
      // 补偿头部高度
      setTimeout(() => {
        window.scrollBy({
          top: -headerOffset,
          behavior: 'smooth'
        })
      }, 0)
    }
  }

  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement
    const link = target.closest('a')
    if (!link?.hash) return

    e.preventDefault()
    const elementId = link.hash.slice(1)
    scrollToElement(elementId)
  }

  const setupScrollHandlers = () => {
    if (!process.client) return
    document.addEventListener('click', handleClick)
  }

  const cleanupScrollHandlers = () => {
    if (!process.client) return
    document.removeEventListener('click', handleClick)
  }

  onMounted(setupScrollHandlers)
  onUnmounted(cleanupScrollHandlers)

  return {
    scrollToElement
  }
} 