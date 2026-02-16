<template>
  <div class="chat-header">
    <NuxtLink to="/messages" class="chat-header-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </NuxtLink>
    <div v-if="name" class="chat-header-info">
      <UserAvatar :name="name" :image-url="imageUrl" size="sm" />
      <span class="chat-header-name">{{ name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name?: string | null
  imageUrl?: string | null
}>()
</script>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #465E8A;
  flex-shrink: 0;
}
.chat-header-back {
  color: #fff;
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: opacity 0.2s;
  text-decoration: none;
}
.chat-header-back:hover {
  opacity: 1;
}
.chat-header-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.chat-header-info :deep(.user-avatar--initials) {
  background: rgba(255, 255, 255, 0.2);
}
.chat-header-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}
</style>
