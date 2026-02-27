<template>
  <div class="layout-root">
    <Navbar />
    <main class="layout-main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
.layout-root {
  min-height: 100dvh;
  width: 100%;
  background: #E4DBCB;
  display: flex;
  flex-direction: column;
}
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
