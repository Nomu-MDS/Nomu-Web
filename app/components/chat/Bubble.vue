<template>
  <div :class="['chat-bubble-outer', sent ? 'chat-bubble-outer--sent' : 'chat-bubble-outer--received']">
    <div :class="['chat-bubble', sent ? 'chat-bubble--sent' : 'chat-bubble--received']">
      <img v-if="attachment" :src="attachment" alt="Image" class="chat-bubble-attachment" />
      <p class="chat-bubble-text">{{ content }}</p>
    </div>
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
.chat-bubble-outer {
  display: flex;
  flex-direction: column;
  max-width: 78%;
  gap: 0.2rem;
}
.chat-bubble-outer--sent {
  align-items: flex-end;
}
.chat-bubble-outer--received {
  align-items: flex-start;
}

.chat-bubble {
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
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  line-height: 1.5;
  margin: 0;
}
.chat-bubble-meta {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.75rem;
}
.chat-bubble-time {
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  opacity: 0.5;
}
.chat-bubble-status {
  font-size: 0.65rem;
  opacity: 0.6;
  color: #465E8A;
}
.chat-bubble-attachment {
  max-width: 200px;
  max-height: 150px;
  border-radius: 0.75rem;
  margin-bottom: 0.35rem;
  object-fit: cover;
}
</style>
