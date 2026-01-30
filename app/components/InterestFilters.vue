<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="interest in interests"
      :key="interest.id"
      @click="$emit('toggle', interest.name)"
      :class="[
        'px-4 py-2 rounded-full border text-sm font-medium transition',
        selected.includes(interest.name)
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
      ]"
    >
      {{ interest.name }}
    </button>
    <button v-if="selected.length" @click="$emit('clear')" class="ml-2 px-3 py-2 rounded-full text-xs bg-gray-100 text-gray-500 hover:bg-gray-200">Tout effacer</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ interests: { id: number; name: string }[]; selected: string[] }>()
defineEmits(['toggle', 'clear'])
</script>
