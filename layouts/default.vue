<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/layouts/Header.vue'
import Footer from '~/layouts/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
</style> 