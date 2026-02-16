<template>
  <div ref="container" class="chat-message-list">
    <div v-if="!messages.length && !reservations.length" class="chat-empty">
      <p>Aucun message pour l'instant.</p>
      <p>Envoyez le premier message !</p>
    </div>

    <template v-for="(item, idx) in timeline" :key="item.key">
      <ChatDateSeparator v-if="showDateBefore(idx)" :date="item.date" />

      <!-- Message bubble -->
      <template v-if="item.type === 'message'">
        <div :class="['chat-bubble-wrap', item.data.user_id === myUserId ? 'chat-bubble-wrap--sent' : 'chat-bubble-wrap--received']">
          <ChatBubble
            :content="item.data.content"
            :created-at="item.data.createdAt"
            :sent="item.data.user_id === myUserId"
            :read="item.data.read"
            :attachment="item.data.attachment"
          />
        </div>
      </template>

      <!-- Reservation card -->
      <template v-if="item.type === 'reservation'">
        <div class="chat-bubble-wrap chat-bubble-wrap--received">
          <ChatReservationCard
            :reservation="item.data"
            :my-user-id="myUserId"
            :loading="actionLoading === item.data.id"
            @accept="$emit('acceptReservation', $event)"
            @decline="$emit('declineReservation', $event)"
          />
        </div>
      </template>
    </template>

    <ChatTypingIndicator v-if="typingName" :name="typingName" />
  </div>
</template>

<script setup lang="ts">
import type { Message, Reservation } from '~/types'

const props = defineProps<{
  messages: Message[]
  reservations: Reservation[]
  myUserId: number
  typingName?: string | null
  actionLoading?: number | null
}>()

defineEmits<{
  acceptReservation: [id: number]
  declineReservation: [id: number]
}>()

type TimelineItem =
  | { type: 'message'; data: Message; date: string; key: string }
  | { type: 'reservation'; data: Reservation; date: string; key: string }

const timeline = computed<TimelineItem[]>(() => {
  const items: TimelineItem[] = []

  for (const msg of props.messages) {
    items.push({ type: 'message', data: msg, date: msg.createdAt, key: `msg-${msg.id}` })
  }
  for (const resa of props.reservations) {
    items.push({ type: 'reservation', data: resa, date: resa.createdAt, key: `resa-${resa.id}` })
  }

  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return items
})

const container = ref<HTMLElement | null>(null)

function showDateBefore(idx: number): boolean {
  if (idx === 0) return true
  const current = new Date(timeline.value[idx].date).toDateString()
  const prev = new Date(timeline.value[idx - 1].date).toDateString()
  return current !== prev
}

function scrollToBottom() {
  nextTick(() => {
    if (container.value) {
      container.value.scrollTop = container.value.scrollHeight
    }
  })
}

watch(() => props.messages.length + props.reservations.length, scrollToBottom)

defineExpose({ scrollToBottom })
</script>

<style scoped>
.chat-message-list {
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
</style>
