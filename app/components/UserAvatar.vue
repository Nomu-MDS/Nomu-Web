<template>
  <img
    :src="resolvedUrl"
    :alt="name || 'Avatar'"
    class="user-avatar user-avatar--img"
    :style="sizeStyle"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string | null
  imageUrl?: string | null
  userId?: number | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  name: null,
  imageUrl: null,
  userId: null,
  size: 'md',
})

const resolvedUrl = computed(() => {
  if (props.imageUrl) return props.imageUrl
  const seed = props.userId ?? Math.abs((props.name ?? '?').charCodeAt(0))
  return `https://i.pravatar.cc/500?img=${(seed % 70) + 1}`
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
</style>
