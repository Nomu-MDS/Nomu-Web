<template>
  <div class="chat-page">
    <ChatHeader :name="otherUser?.name" />

    <div v-if="loading" class="chat-loading">
      <div class="w-full max-w-2xl mx-auto px-4 space-y-4">
        <div class="flex items-end gap-2">
          <USkeleton class="h-8 w-8 rounded-full shrink-0" />
          <USkeleton class="h-16 w-52 rounded-2xl rounded-bl-sm" />
        </div>
        <div class="flex items-end gap-2 justify-end">
          <USkeleton class="h-10 w-40 rounded-2xl rounded-br-sm" />
        </div>
        <div class="flex items-end gap-2">
          <USkeleton class="h-8 w-8 rounded-full shrink-0" />
          <USkeleton class="h-12 w-64 rounded-2xl rounded-bl-sm" />
        </div>
        <div class="flex items-end gap-2 justify-end">
          <USkeleton class="h-16 w-48 rounded-2xl rounded-br-sm" />
        </div>
      </div>
    </div>

    <template v-else>
      <ChatMessageList
        ref="messageList"
        :messages="messages"
        :reservations="convReservations"
        :my-user-id="myUserId"
        :typing-name="isOtherTyping ? typingUserName : null"
        :action-loading="resaActionLoading"
        @accept-reservation="handleAcceptResa"
        @decline-reservation="handleDeclineResa"
      />
      <ChatInput
        :conversation-id="conversationId"
        @send="handleSend"
        @typing="handleTyping"
        @reservation-created="loadReservations"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Message, Conversation, ConversationUser, Reservation } from '~/types'

const route = useRoute()
const { get } = useApi()
const { connect, joinConversation, leaveConversation, sendMessage, emitTyping, markMessageRead, getSocketInstance } = useSocket()
const { reservations, fetchMyReservations, acceptReservation, declineReservation } = useReservations()

// Provided by the parent messages.vue layout
const myUserId = inject<Ref<number>>('messagesMyUserId', ref(0))

const conversationId = computed(() => Number(route.params.conversationId))

const messages = ref<Message[]>([])
const otherUser = ref<ConversationUser | null>(null)
const loading = ref(true)
const isOtherTyping = ref(false)
const typingUserName = ref('')
const messageList = ref<any>(null)
const resaActionLoading = ref<number | null>(null)

const convReservations = computed(() =>
  reservations.value.filter((r) => r.conversation_id === conversationId.value)
)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

function handleSend(content: string) {
  sendMessage(conversationId.value, content)
  emitTyping(conversationId.value, false)
  if (typingTimeout) clearTimeout(typingTimeout)
}

function handleTyping() {
  emitTyping(conversationId.value, true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {
    emitTyping(conversationId.value, false)
  }, 2000)
}

async function loadReservations() {
  await fetchMyReservations()
}

async function handleAcceptResa(id: number) {
  resaActionLoading.value = id
  await acceptReservation(id)
  resaActionLoading.value = null
}

async function handleDeclineResa(id: number) {
  resaActionLoading.value = id
  await declineReservation(id)
  resaActionLoading.value = null
}

async function initChat() {
  loading.value = true
  messages.value = []
  otherUser.value = null
  isOtherTyping.value = false

  try {
    const convData = await get<{ conversation: Conversation }>(`/conversations/${conversationId.value}`)
    const conv = convData.conversation
    otherUser.value = conv.voyager_id === myUserId.value ? conv.Local : conv.Voyager

    const [msgData] = await Promise.all([
      get<{ messages: Message[] }>(`/conversations/${conversationId.value}/messages?limit=50&offset=0`),
      fetchMyReservations(),
    ])
    messages.value = (msgData.messages || []).reverse()

    const sock = connect()
    joinConversation(conversationId.value)

    sock.on('new_message', (data: { message: Message }) => {
      if (data.message.conversation_id !== conversationId.value) return
      if (messages.value.some(m => m.id === data.message.id)) return
      messages.value.push(data.message)
      if (data.message.user_id !== myUserId.value) {
        markMessageRead(data.message.id)
      }
    })

    sock.on('user_typing', (data: { conversation_id: number; userId: number; userName: string; isTyping: boolean }) => {
      if (data.conversation_id === conversationId.value && data.userId !== myUserId.value) {
        isOtherTyping.value = data.isTyping
        typingUserName.value = data.userName
      }
    })

    sock.on('message_read_update', (data: { message_id: number; conversation_id: number; read: boolean }) => {
      const msg = messages.value.find(m => m.id === data.message_id)
      if (msg) msg.read = data.read
    })

    messages.value
      .filter(m => !m.read && m.user_id !== myUserId.value)
      .forEach(m => markMessageRead(m.id))

    nextTick(() => messageList.value?.scrollToBottom())
  } catch (e) {
    console.error('Chat init error:', e)
  } finally {
    loading.value = false
  }
}

function cleanupSocket() {
  leaveConversation(conversationId.value)
  const sock = getSocketInstance()
  if (sock) {
    sock.off('new_message')
    sock.off('user_typing')
    sock.off('message_read_update')
  }
  if (typingTimeout) clearTimeout(typingTimeout)
}

watch(conversationId, (newId, oldId) => {
  if (oldId) {
    leaveConversation(oldId)
    const sock = getSocketInstance()
    if (sock) {
      sock.off('new_message')
      sock.off('user_typing')
      sock.off('message_read_update')
    }
  }
  if (newId) initChat()
})

onMounted(() => { initChat() })
onBeforeUnmount(() => { cleanupSocket() })
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}
.chat-loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
</style>
