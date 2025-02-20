export default defineNuxtPlugin(() => {
  if (process.client) {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (!link?.hash) return

      e.preventDefault()
      const elementId = link.hash.slice(1)
      const element = document.getElementById(elementId)
      
      if (element) {
        const headerOffset = 65
        element.scrollIntoView({ behavior: 'smooth' })
        
        setTimeout(() => {
          window.scrollBy({
            top: -headerOffset,
            behavior: 'smooth'
          })
        }, 0)
      }
    }

    document.addEventListener('click', handleClick)
  }
}) 