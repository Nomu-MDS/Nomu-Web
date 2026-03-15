<template>
  <aside class="explore-filters" :class="{ 'explore-filters--open': mobileOpen }">
    <div v-if="mobileOpen" class="fixed inset-0 bg-[#465E8A]/40 backdrop-blur-sm" @click="$emit('close')" />

    <div class="explore-filters-panel bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="flex items-center gap-3 px-5 py-4 border-b border-[#465E8A]/8 shrink-0">
        <span class="font-[roca] font-bold text-lg text-[#465E8A] flex-1">Filtres</span>
        <button v-if="totalCount" @click="clearAll" class="font-mono text-xs text-[#465E8A]/60 hover:opacity-100 underline cursor-pointer bg-transparent border-none">
          Tout effacer
        </button>
        <button @click="$emit('close')" class="hidden max-[900px]:block text-[#465E8A]/50 hover:opacity-100 bg-transparent border-none cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-5 py-2 space-y-4">
        <!-- Ville -->
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2 font-[roca] font-bold text-sm text-[#465E8A]">
            Ville
            <span v-if="selectedCities.length" class="bg-[#465E8A] text-white text-xs font-mono px-2 py-px rounded-full min-w-[1.2rem] text-center">{{ selectedCities.length }}</span>
          </label>
          <select
            v-model="selectedCities"
            multiple
            class="w-full px-3 py-2 bg-[#E4DBCB]/30 border border-[#465E8A]/10 rounded-lg font-mono text-sm text-[#465E8A] transition-all focus:outline-none focus:ring-2 focus:ring-[#B6FFD7]/50 focus:border-[#465E8A]/30"
            size="5"
          >
            <option v-for="city in cities" :key="city" :value="city" class="px-2 py-1.5 checked:bg-[#465E8A] checked:text-white">
              {{ city }}
            </option>
          </select>
        </div>

        <!-- Catégories -->
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2 font-[roca] font-bold text-sm text-[#465E8A]">
            Catégories
            <span v-if="selectedInterests.length" class="bg-[#465E8A] text-white text-xs font-mono px-2 py-px rounded-full min-w-[1.2rem] text-center">{{ selectedInterests.length }}</span>
          </label>
          <select
            v-model="selectedInterests"
            multiple
            class="w-full px-3 py-2 bg-[#E4DBCB]/30 border border-[#465E8A]/10 rounded-lg font-mono text-sm text-[#465E8A] transition-all focus:outline-none focus:ring-2 focus:ring-[#B6FFD7]/50 focus:border-[#465E8A]/30"
            size="6"
          >
            <option v-for="interest in interests" :key="interest.id" :value="interest.name" class="px-2 py-1.5 checked:bg-[#465E8A] checked:text-white">
              {{ interest.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Footer (mobile only) -->
      <div class="hidden max-[900px]:block px-5 py-4 border-t border-[#465E8A]/8">
        <button @click="$emit('close')" class="w-full py-3 rounded-full bg-[#465E8A] hover:bg-[#3a4666] text-white font-[roca] font-bold text-sm transition-colors cursor-pointer border-none">
          Voir les résultats
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Interest } from '~/types'

const props = defineProps<{
  interests: Interest[]
  mobileOpen?: boolean
}>()

defineEmits<{ close: [] }>()

const selectedCities = defineModel<string[]>('selectedCities', { default: () => [] })
const selectedInterests = defineModel<string[]>('selectedInterests', { default: () => [] })

const cities = [
  'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse',
  'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Lille',
  'Grenoble', 'Rennes', 'Brest', 'Annecy', 'Chambéry',
  'Nancy', 'Metz', 'Bayonne', 'Pau', 'Reims',
  'Tours', 'La Rochelle', 'Caen', 'Rouen', 'Dijon',
  'Clermont-Ferrand', 'Perpignan', 'Toulon', 'Avignon', 'Aix-en-Provence',
]

const totalCount = computed(() =>
  selectedCities.value.length + selectedInterests.value.length
)

function clearAll() {
  selectedCities.value = []
  selectedInterests.value = []
}
</script>

<style scoped>
.explore-filters {
  width: 280px;
  flex-shrink: 0;
}

.explore-filters-panel {
  position: sticky;
  top: 5rem;
  max-height: calc(100vh - 5.5rem);
}

@media (max-width: 900px) {
  .explore-filters {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    width: auto;
  }
  .explore-filters--open {
    pointer-events: auto;
    opacity: 1;
  }
  .explore-filters-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 85vh;
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: 0 -10px 40px rgba(70, 94, 138, 0.2);
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
  }
  .explore-filters--open .explore-filters-panel {
    transform: translateY(0);
  }
}
</style>
