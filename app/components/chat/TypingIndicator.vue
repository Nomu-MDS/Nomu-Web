<template>
  <div class="typing-indicator">
    <span>{{ name }} est en train d'écrire</span>
    <span class="typing-dots">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<style scoped>
.typing-indicator {
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
.typing-dots {
  display: inline-flex;
  gap: 0.2rem;
}
.typing-dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: #465E8A;
  opacity: 0.5;
  animation: typingBounce 1.2s ease-in-out infinite;
}
.typing-dot:nth-child(2) {
  animation-delay: 0.15s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.3s;
}
@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
}
</style>
