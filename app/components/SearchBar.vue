
<template>
  <div class="flex flex-col md:flex-row gap-4 items-center mb-6">
    <div class="flex-1 w-full">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('search')"
        type="search"
        class="w-full border border-orange-200 rounded-full px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Rechercher un profil, un intérêt, une ville..."
      />
    </div>
    <div>
      <button @click="$emit('toggle-filters')" class="flex items-center gap-2 px-4 py-2 rounded-full border border-orange-300 bg-orange-50 text-orange-600 font-medium hover:bg-orange-100 transition">
        <span>Filtres</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A2 2 0 0013 14.586V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.414a2 2 0 00-.586-1.414L2 6.707A1 1 0 012 6V4z"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue', 'search', 'toggle-filters'])
</script>
