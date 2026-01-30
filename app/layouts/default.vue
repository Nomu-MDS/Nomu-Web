<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <Navbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>
