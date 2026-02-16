<template>
  <div class="messages-layout">
    <ConversationSidebar
      :conversations="conversations"
      :my-user-id="myUserId"
      :loading="loading"
      :error="error"
    />
    <div class="messages-main">
      <div class="messages-placeholder">
        <div class="messages-placeholder-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </div>
        <p class="messages-placeholder-title">Vos messages</p>
        <p class="messages-placeholder-text">Sélectionnez une conversation pour commencer.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MeResponse } from '~/types'

definePageMeta({ middleware: 'auth' })

const { get } = useApi()
const { conversations, loading, error, fetchConversations } = useConversations()
const myUserId = ref(0)

onMounted(async () => {
  try {
    const me = await get<MeResponse>('/users/me')
    myUserId.value = me.id
  } catch {}
  await fetchConversations()
})
</script>

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
  display: flex;
  align-items: center;
  justify-content: center;
}
.messages-placeholder {
  text-align: center;
  color: #465E8A;
  opacity: 0.5;
}
.messages-placeholder-icon {
  margin-bottom: 1rem;
}
.messages-placeholder-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0 0 0.35rem;
}
.messages-placeholder-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  margin: 0;
}

@media (max-width: 768px) {
  .messages-layout > :first-child {
    width: 100%;
  }
  .messages-main {
    display: none;
  }
}
</style>
