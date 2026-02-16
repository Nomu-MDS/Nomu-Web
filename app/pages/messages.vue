<template>
  <div class="messages-layout">
    <ConversationSidebar
      :conversations="conversations"
      :my-user-id="myUserId"
      :loading="loading"
      :error="error"
      :active-id="activeConversationId"
    />
    <div class="messages-main">
      <NuxtPage :transition="{ name: 'chat-fade', mode: 'out-in' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MeResponse } from '~/types'

definePageMeta({ middleware: 'auth' })

useSeoMeta({
  title: 'Messages — Nomu',
  description: 'Consultez vos conversations et échangez avec la communauté Nomu.',
  robots: 'noindex, nofollow',
})

const route = useRoute()
const { get } = useApi()
const { conversations, loading, error, fetchConversations } = useConversations()
const myUserId = ref(0)

const activeConversationId = computed(() => {
  const id = route.params.conversationId
  return id ? Number(id) : undefined
})

provide('messagesMyUserId', myUserId)
provide('messagesConversations', conversations)

onMounted(async () => {
  try {
    const me = await get<MeResponse>('/users/me')
    myUserId.value = me.id
  } catch {}
  await fetchConversations()
})
</script>

<style>
/* Chat transition (must be global for NuxtPage) */
.chat-fade-enter-active {
  transition: opacity 0.15s ease;
}
.chat-fade-leave-active {
  transition: opacity 0.1s ease;
}
.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.messages-layout {
  display: flex;
  height: calc(100vh - 64px);
  background: #E4DBCB;
}
.messages-layout > :first-child {
  width: 360px;
  flex-shrink: 0;
}
.messages-main {
  flex: 1;
  min-width: 0;
  position: relative;
}

@media (max-width: 768px) {
  .messages-layout > :first-child {
    display: none;
  }
  .messages-layout {
    height: 100vh;
  }
}
</style>
