<template>
  <div :class="['chat-bubble-outer', sent ? 'chat-bubble-outer--sent' : 'chat-bubble-outer--received']">
    <img
      v-if="attachment"
      :src="attachment"
      alt="Image"
      class="chat-bubble-attachment"
      @click="lightboxOpen = true"
    />
    <div v-if="content?.trim()" :class="['chat-bubble', sent ? 'chat-bubble--sent' : 'chat-bubble--received']">
      <p class="chat-bubble-text">{{ content }}</p>
    </div>
    <div class="chat-bubble-meta">
      <span class="chat-bubble-time">{{ formattedTime }}</span>
      <span v-if="sent" class="chat-bubble-status">{{ read ? '✓✓' : '✓' }}</span>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="attachment && lightboxOpen" class="lightbox-overlay" @click.self="lightboxOpen = false">
      <button class="lightbox-close" @click="lightboxOpen = false">✕</button>
      <img :src="attachment" alt="Image" class="lightbox-img" />
    </div>
  </Teleport>
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

const lightboxOpen = ref(false)
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
  max-width: 260px;
  max-height: 200px;
  border-radius: 0.75rem;
  display: block;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.15s;
}
.chat-bubble-attachment:hover {
  opacity: 0.88;
}
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.lightbox-close {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem;
  opacity: 0.85;
}
.lightbox-close:hover {
  opacity: 1;
}
.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 0.75rem;
  object-fit: contain;
}
</style>
