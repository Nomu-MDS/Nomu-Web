<template>
  <div :class="['chat-bubble', sent ? 'chat-bubble--sent' : 'chat-bubble--received']">
    <img v-if="attachment" :src="attachment" alt="Image" class="chat-bubble-attachment" />
    <p class="chat-bubble-text">{{ content }}</p>
    <div class="chat-bubble-meta">
      <span class="chat-bubble-time">{{ formattedTime }}</span>
      <span v-if="sent" class="chat-bubble-status">{{ read ? '✓✓' : '✓' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: string
  createdAt: string
  sent: boolean
  read: boolean
  attachment?: string | null
}>()

const formattedTime = computed(() =>
  new Date(props.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
)
</script>

<style scoped>
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
.chat-bubble-attachment {
  max-width: 100%;
  max-height: 200px;
  border-radius: 0.5rem;
  margin-bottom: 0.35rem;
  object-fit: cover;
}
</style>
