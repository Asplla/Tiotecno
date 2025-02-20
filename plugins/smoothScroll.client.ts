export default defineNuxtPlugin(() => {
  if (process.client) {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      // 检查是否是锚点链接
      if (!link?.hash || !link.href.includes('#')) return
      
      const elementId = link.hash.slice(1)
      const element = document.getElementById(elementId)
      
      if (element) {
        e.preventDefault()
        const headerOffset = 65 // 头部高度
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }

    // 添加事件监听
    document.addEventListener('click', handleClick)

    // 清理函数
    return {
      destroy: () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }
}) 