<template>
  <div class="interest-filters">
    <button
      v-for="interest in interests"
      :key="interest.id"
      @click="$emit('toggle', interest.name)"
      :class="['interest-badge', { 'interest-badge--active': selected.includes(interest.name) }]"
    >
      {{ interest.name }}
    </button>
    <button v-if="selected.length" @click="$emit('clear')" class="interest-clear">
      Tout effacer
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ interests: { id: number; name: string }[]; selected: string[] }>()
defineEmits(['toggle', 'clear'])
</script>

<style scoped>
.interest-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.interest-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(70, 94, 138, 0.25);
  background: #fff;
  color: #465E8A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
}
.interest-badge:hover {
  background: #f5f3ee;
}
.interest-badge--active {
  background: #465E8A;
  color: #fff;
  border-color: #465E8A;
}
.interest-badge--active:hover {
  background: #3a4666;
}
.interest-clear {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  background: transparent;
  color: #465E8A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;
  text-decoration: underline;
}
.interest-clear:hover {
  opacity: 1;
}
</style>
