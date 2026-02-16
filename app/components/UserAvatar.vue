<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    :alt="name || 'Avatar'"
    class="user-avatar user-avatar--img"
    :style="sizeStyle"
  />
  <div v-else class="user-avatar user-avatar--initials" :style="sizeStyle">
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string | null
  imageUrl?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  name: null,
  imageUrl: null,
  size: 'md',
})

const sizes: Record<string, { dim: string; font: string }> = {
  sm: { dim: '2.25rem', font: '0.75rem' },
  md: { dim: '2.75rem', font: '0.85rem' },
  lg: { dim: '3.5rem', font: '1rem' },
  xl: { dim: '5rem', font: '1.25rem' },
}

const sizeStyle = computed(() => {
  const s = sizes[props.size]
  return { width: s.dim, height: s.dim, fontSize: s.font }
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
})
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  flex-shrink: 0;
}
.user-avatar--img {
  object-fit: cover;
  border: 2px solid rgba(70, 94, 138, 0.15);
}
.user-avatar--initials {
  background: #465E8A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'roca', sans-serif;
  font-weight: 700;
}
</style>
