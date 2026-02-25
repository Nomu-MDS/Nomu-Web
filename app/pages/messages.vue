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
import type { MeResponse, Message } from '~/types'

definePageMeta({ middleware: 'auth' })

useSeoMeta({
  title: 'Messages — Nomu',
  description: 'Consultez vos conversations et échangez avec la communauté Nomu.',
  robots: 'noindex, nofollow',
})

const route = useRoute()
const { get } = useApi()
const { conversations, loading, error, fetchConversations } = useConversations()
const { connect, getSocketInstance } = useSocket()
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

  // Brancher le socket pour mettre à jour les badges non-lus en temps réel
  try {
    const sock = connect()

    sock.on('new_message', (data: { message: Message }) => {
      const conv = conversations.value.find(c => c.id === data.message.conversation_id)
      if (!conv) return
      if (!conv.Messages) conv.Messages = []
      if (!conv.Messages.some(m => m.id === data.message.id)) {
        conv.Messages.push(data.message)
      }
    })

    sock.on('message_read_update', (data: { message_id: number; conversation_id: number; read: boolean }) => {
      const conv = conversations.value.find(c => c.id === data.conversation_id)
      if (!conv?.Messages) return
      const msg = conv.Messages.find(m => m.id === data.message_id)
      if (msg) msg.read = data.read
    })
  } catch {}
})

onBeforeUnmount(() => {
  const sock = getSocketInstance()
  if (sock) {
    sock.off('new_message')
    sock.off('message_read_update')
  }
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
  height: calc(100dvh - var(--navbar-h));
  overflow: hidden;
  background: #E4DBCB;
}
.messages-layout > :first-child {
  width: 300px;
  flex-shrink: 0;
}
.messages-main {
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 768px) {
  .messages-layout > :first-child {
    display: none;
  }
}
</style>
