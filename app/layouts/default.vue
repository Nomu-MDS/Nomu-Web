<template>
  <div class="layout-root">
    <Navbar />
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>

<style scoped>
.layout-root {
  height: 100dvh;
  width: 100%;
  background: #E4DBCB;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.layout-main {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
