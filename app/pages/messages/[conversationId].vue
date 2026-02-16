<template>
  <div class="messages-layout">
    <ConversationSidebar
      :conversations="conversations"
      :my-user-id="myUserId"
      :loading="conversationsLoading"
      :error="conversationsError"
      :active-id="conversationId"
    />
    <div class="messages-main">
      <div class="chat-page">
        <!-- Top bar -->
        <div class="chat-header">
          <NuxtLink to="/messages" class="chat-back">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </NuxtLink>
          <div v-if="otherUser" class="chat-header-info">
            <div class="chat-header-avatar">{{ getInitials(otherUser.name) }}</div>
            <span class="chat-header-name">{{ otherUser.name }}</span>
          </div>
        </div>
        <!-- Loading -->
        <div v-if="loading" class="chat-loading">
          <span>Chargement...</span>
        </div>
        <!-- Chat area -->
        <template v-else>
          <!-- Messages -->
          <div ref="messagesContainer" class="chat-messages">
            <div v-if="!messages.length" class="chat-empty">
              <p>Aucun message pour l'instant.</p>
              <p>Envoyez le premier message !</p>
            </div>

            <div
              v-for="(msg, idx) in messages"
              :key="msg.id"
              :class="['chat-bubble-wrap', msg.user_id === myUserId ? 'chat-bubble-wrap--sent' : 'chat-bubble-wrap--received']"
            >
              <!-- Date separator -->
              <div v-if="shouldShowDate(idx)" class="chat-date-separator">
                {{ formatDate(msg.createdAt) }}
              </div>

              <div :class="['chat-bubble', msg.user_id === myUserId ? 'chat-bubble--sent' : 'chat-bubble--received']">
                <!-- Attachment -->
                <img v-if="msg.attachment" :src="msg.attachment" alt="Image" class="chat-attachment" />

                <p class="chat-bubble-text">{{ msg.content }}</p>
                <div class="chat-bubble-meta">
                  <span class="chat-bubble-time">{{ formatTime(msg.createdAt) }}</span>
                  <span v-if="msg.user_id === myUserId" class="chat-bubble-status">
                    {{ msg.read ? '✓✓' : '✓' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="isOtherTyping" class="chat-typing">
              <span>{{ typingUserName }} est en train d'écrire</span>
              <span class="chat-typing-dots">
                <span class="chat-typing-dot"></span>
                <span class="chat-typing-dot"></span>
                <span class="chat-typing-dot"></span>
              </span>
            </div>
          </div>
          <!-- Input area -->
          <div class="chat-input-area">
            <form @submit.prevent="handleSend" class="chat-input-form">
              <input
                v-model="newMessage"
                type="text"
                class="chat-input"
                placeholder="Écrire un message..."
                maxlength="2000"
                @input="handleInput"
              />
              <button type="submit" :disabled="!newMessage.trim()" class="chat-send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message, MeResponse, Conversation, ConversationUser } from '~/types'
import ConversationSidebar from '~/components/ConversationSidebar.vue'
import { useConversations } from '~/composables/useConversations'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { get } = useApi()
const { connect, joinConversation, leaveConversation, sendMessage, emitTyping, markMessageRead, getSocketInstance } = useSocket()
const { conversations, loading: conversationsLoading, error: conversationsError, fetchConversations } = useConversations()

const conversationId = computed(() => Number(route.params.conversationId))

const messages = ref<Message[]>([])
const myUserId = ref(0)
const otherUser = ref<ConversationUser | null>(null)
const loading = ref(true)
const newMessage = ref('')
const isOtherTyping = ref(false)
const typingUserName = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

function getInitials(name: string): string {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return "Aujourd'hui"
  if (date.toDateString() === yesterday.toDateString()) return 'Hier'
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}

function shouldShowDate(idx: number): boolean {
  if (idx === 0) return true
  const current = new Date(messages.value[idx].createdAt).toDateString()
  const prev = new Date(messages.value[idx - 1].createdAt).toDateString()
  return current !== prev
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function handleSend() {
  const content = newMessage.value.trim()
  if (!content) return
  sendMessage(conversationId.value, content)
  newMessage.value = ''
  emitTyping(conversationId.value, false)
  if (typingTimeout) clearTimeout(typingTimeout)
}

function handleInput() {
  emitTyping(conversationId.value, true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => {
    emitTyping(conversationId.value, false)
  }, 2000)
}

onMounted(async () => {
  try {
    // Fetch conversations for sidebar
    await fetchConversations()

    // Get my user ID
    const me = await get<MeResponse>('/users/me')
    myUserId.value = me.id

    // Get conversation details
    const convData = await get<{ conversation: Conversation }>(`/conversations/${conversationId.value}`)
    const conv = convData.conversation
    otherUser.value = conv.voyager_id === me.id ? conv.Local : conv.Voyager

    // Get messages (API returns newest first, we reverse for display)
    const msgData = await get<{ messages: Message[] }>(`/conversations/${conversationId.value}/messages?limit=50&offset=0`)
    messages.value = (msgData.messages || []).reverse()

    // Connect socket
    const sock = connect()
    joinConversation(conversationId.value)

    // Listen for new messages
    sock.on('new_message', (data: { message: Message }) => {
      // Prevent duplicates
      if (messages.value.some(m => m.id === data.message.id)) return
      messages.value.push(data.message)
      scrollToBottom()
      // Mark as read if from other user
      if (data.message.user_id !== myUserId.value) {
        markMessageRead(data.message.id)
      }
    })

    // Typing indicator
    sock.on('user_typing', (data: { conversation_id: number; userId: number; userName: string; isTyping: boolean }) => {
      if (data.conversation_id === conversationId.value && data.userId !== myUserId.value) {
        isOtherTyping.value = data.isTyping
        typingUserName.value = data.userName
      }
    })

    // Read receipt updates
    sock.on('message_read_update', (data: { message_id: number; conversation_id: number; read: boolean }) => {
      const msg = messages.value.find(m => m.id === data.message_id)
      if (msg) msg.read = data.read
    })

    // Mark existing unread messages as read
    messages.value
      .filter(m => !m.read && m.user_id !== myUserId.value)
      .forEach(m => markMessageRead(m.id))

    scrollToBottom()
  } catch (e) {
    console.error('Chat init error:', e)
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  leaveConversation(conversationId.value)
  const sock = getSocketInstance()
  if (sock) {
    sock.off('new_message')
    sock.off('user_typing')
    sock.off('message_read_update')
  }
  if (typingTimeout) clearTimeout(typingTimeout)
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
  min-width: 0;
}

.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #E4DBCB;
}

/* Header */
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #465E8A;
  flex-shrink: 0;
}
.chat-back {
  color: #fff;
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: opacity 0.2s;
  text-decoration: none;
}
.chat-back:hover {
  opacity: 1;
}
.chat-header-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.chat-header-avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
}
.chat-header-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}

/* Loading */
.chat-loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  color: #465E8A;
  opacity: 0.7;
}

/* Messages area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  color: #465E8A;
  opacity: 0.5;
  text-align: center;
  gap: 0.25rem;
}
.chat-empty p {
  margin: 0;
  font-size: 0.9rem;
}

/* Date separator */
.chat-date-separator {
  text-align: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #465E8A;
  opacity: 0.5;
  padding: 0.75rem 0;
}

/* Bubble wrappers */
.chat-bubble-wrap {
  display: flex;
  flex-direction: column;
}
.chat-bubble-wrap--sent {
  align-items: flex-end;
}
.chat-bubble-wrap--received {
  align-items: flex-start;
}

/* Bubbles */
.chat-bubble {
  max-width: 70%;
  padding: 0.65rem 1rem;
  word-break: break-word;
}
.chat-bubble--sent {
  background: #465E8A;
  color: #fff;
  border-radius: 1rem 1rem 0.25rem 1rem;
}
.chat-bubble--received {
  background: #fff;
  color: #465E8A;
  border-radius: 1rem 1rem 1rem 0.25rem;
  box-shadow: 0 1px 4px rgba(70, 94, 138, 0.08);
}
.chat-bubble-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.88rem;
  line-height: 1.45;
  margin: 0;
}
.chat-bubble-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  margin-top: 0.3rem;
}
.chat-bubble-time {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  opacity: 0.55;
}
.chat-bubble-status {
  font-size: 0.7rem;
  opacity: 0.65;
}
.chat-attachment {
  max-width: 100%;
  max-height: 200px;
  border-radius: 0.5rem;
  margin-bottom: 0.35rem;
  object-fit: cover;
}

/* Typing indicator */
.chat-typing {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  color: #465E8A;
  opacity: 0.6;
  font-style: italic;
}
.chat-typing-dots {
  display: inline-flex;
  gap: 0.2rem;
}
.chat-typing-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: #465E8A;
  opacity: 0.5;
  animation: typingBounce 1.2s ease-in-out infinite;
}
.chat-typing-dot:nth-child(2) {
  animation-delay: 0.15s;
}
.chat-typing-dot:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* Input area */
.chat-input-area {
  flex-shrink: 0;
  padding: 0.75rem 1rem;
  background: #fff;
  border-top: 1px solid rgba(70, 94, 138, 0.1);
}
.chat-input-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.chat-input {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 2px solid rgba(70, 94, 138, 0.15);
  border-radius: 9999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #465E8A;
  background: #f9f8f5;
  transition: border-color 0.2s;
}
.chat-input:focus {
  outline: none;
  border-color: #465E8A;
}
.chat-input::placeholder {
  color: #465E8A;
  opacity: 0.4;
}
.chat-send-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  background: #465E8A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.chat-send-btn:hover {
  background: #3a4666;
}
.chat-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
