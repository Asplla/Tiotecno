<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/layouts/Header.vue'
import Footer from '~/layouts/Footer.vue'
</script>

<style scoped>
</style> 