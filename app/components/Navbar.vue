<template>
  <nav
    class="w-full"
    style="background: #e4dbcb"
    :class="'shadow-sm sticky top-0 z-20'"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-2">
        <NuxtLink to="/">
          <img src="/img/Nomu_logo.svg" alt="Nomu Logo" class="w-24 h-auto" />
        </NuxtLink>
      </div>
      <div class="flex items-center gap-6">
        <NuxtLink
          to="/explore"
          class="space-mono-regular text-[#465E8A] hover:underline"
          >Explorer</NuxtLink
        >
        <template v-if="isLoggedIn()">
          <NuxtLink
            to="/messages"
            class="space-mono-regular text-[#465E8A] hover:underline"
            >Messages</NuxtLink
          >
          <NuxtLink
            to="/account"
            class="rounded-full px-5 py-2 bg-[#465E8A] text-white font-bold roca-title text-base shadow hover:bg-[#3a4666] transition inline-block"
            >Mon compte</NuxtLink
          >
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="space-mono-regular text-[#465E8A] hover:underline"
            >Connexion</NuxtLink
          >
          <NuxtLink
            to="/signup"
            class="rounded-full px-5 py-2 bg-[#465E8A] text-white font-bold roca-title text-base shadow hover:bg-[#3a4666] transition inline-block"
            >S'inscrire</NuxtLink
          >
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()
</script>
