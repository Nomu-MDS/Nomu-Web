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
  max-width: 78%;
  word-break: break-word;
}
.chat-bubble--sent {
  background: #3C3C3B;
  color: #fff;
  border-radius: 100px;
  padding: 0.625rem 1.25rem;
}
.chat-bubble--received {
  background: rgba(60, 60, 59, 0.2);
  color: #3C3C3B;
  border-radius: 100px;
  padding: 0.625rem 1.25rem;
}
.chat-bubble-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
  margin: 0;
  letter-spacing: -0.015em;
}
.chat-bubble-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  margin-top: 0.2rem;
}
.chat-bubble-time {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  opacity: 0.7;
  letter-spacing: -0.014em;
}
.chat-bubble-status {
  font-size: 0.7rem;
  opacity: 0.7;
}
.chat-bubble-attachment {
  max-width: 200px;
  max-height: 150px;
  border-radius: 0.75rem;
  margin-bottom: 0.35rem;
  object-fit: cover;
}
</style>
