<template>
  <div class="chat-date-separator">{{ label }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{ date: string }>()

const label = computed(() => {
  const d = new Date(props.date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (d.toDateString() === today.toDateString()) return "Aujourd'hui"
  if (d.toDateString() === yesterday.toDateString()) return 'Hier'
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
})
</script>

<style scoped>
.chat-date-separator {
  text-align: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #465E8A;
  opacity: 0.5;
  padding: 0.75rem 0;
}
</style>
