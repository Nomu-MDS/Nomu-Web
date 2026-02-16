<template>
  <div class="min-h-screen w-full bg-[#E4DBCB]">
    <!-- Search header -->
    <section class="bg-[#465E8A] px-6 pt-10 pb-8 rounded-b-4xl">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="font-[roca] font-bold text-[1.75rem] text-white mb-5">
          Explorer les <span class="text-[#B6FFD7] italic">profils</span>
        </h1>
        <form @submit.prevent="onSubmit" class="flex gap-2 max-w-xl mx-auto">
          <input
            v-model="query"
            type="search"
            class="flex-1 py-3 px-5 rounded-full border-none bg-white/90 font-mono text-sm text-[#465E8A] transition-shadow focus:outline-none focus:ring-[3px] focus:ring-[#B6FFD7]/40 placeholder:text-[#465E8A]/50"
            placeholder="Yoga, Cuisine, Paris..."
            aria-label="Recherche de profils"
          />
          <button type="submit" class="p-3 rounded-full border-none bg-white text-[#465E8A] cursor-pointer flex items-center justify-center transition-colors hover:bg-[#E4DBCB]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- Content: filters + results -->
    <div class="explore-content w-full max-w-[95vw] 2xl:max-w-[70vw] mx-auto p-6 flex gap-6 items-start">
      <!-- Mobile filter toggle -->
      <button class="explore-filter-toggle" @click="filtersOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
        Filtres
        <span v-if="activeFilterCount" class="bg-[#465E8A] text-white text-[0.65rem] font-bold px-1.5 py-px rounded-full min-w-[1.1rem] text-center">{{ activeFilterCount }}</span>
      </button>

      <!-- Sidebar filters -->
      <ExploreFilters
        :interests="interests"
        :mobile-open="filtersOpen"
        v-model:selected-cities="selectedCities"
        v-model:selected-countries="selectedCountries"
        v-model:selected-interests="selectedInterests"
        @close="filtersOpen = false"
      />

      <!-- Results -->
      <div class="flex-1 min-w-0">
        <div class="flex items-baseline justify-between gap-3 mb-4">
          <h2 class="font-[roca] font-bold text-xl text-[#465E8A] m-0">
            Résultats
            <span v-if="query" class="font-normal text-base opacity-70">pour « {{ query }} »</span>
          </h2>
          <span v-if="hasSearched && !loading" class="font-mono text-xs text-[#465E8A]/50 shrink-0">
            {{ results.length }} profil{{ results.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Active filter tags -->
        <div v-if="activeFilterCount" class="flex flex-wrap gap-1.5 mb-4">
          <button
            v-for="city in selectedCities"
            :key="'c-' + city"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full border-none bg-[#465E8A]/10 text-[#465E8A] font-mono text-xs cursor-pointer transition-colors hover:bg-[#465E8A]/18"
            @click="removeFilter(selectedCities, city)"
          >
            {{ city }} <span class="text-sm leading-none opacity-60">&times;</span>
          </button>
          <button
            v-for="country in selectedCountries"
            :key="'co-' + country"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full border-none bg-[#465E8A]/10 text-[#465E8A] font-mono text-xs cursor-pointer transition-colors hover:bg-[#465E8A]/18"
            @click="removeFilter(selectedCountries, country)"
          >
            {{ country }} <span class="text-sm leading-none opacity-60">&times;</span>
          </button>
          <button
            v-for="interest in selectedInterests"
            :key="'i-' + interest"
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full border-none bg-[#B6FFD7]/40 text-[#465E8A] font-mono text-xs cursor-pointer transition-colors hover:bg-[#B6FFD7]/60"
            @click="removeFilter(selectedInterests, interest)"
          >
            {{ interest }} <span class="text-sm leading-none opacity-60">&times;</span>
          </button>
        </div>

        <ProfileResults :results="results" :loading="loading" :has-searched="hasSearched" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

useSeoMeta({
  title: 'Explorer les profils — Nomu',
  description: 'Parcourez les profils de la communauté Nomu. Filtrez par ville, pays ou centres d\'intérêt pour trouver l\'expérience idéale.',
  ogTitle: 'Explorer les profils — Nomu',
  ogDescription: 'Parcourez les profils et trouvez des expériences uniques près de chez vous.',
})

const route = useRoute()
const router = useRouter()

const query = ref('')
const selectedInterests = ref<string[]>([])
const selectedCities = ref<string[]>([])
const selectedCountries = ref<string[]>([])
const filtersOpen = ref(false)

const { interests, fetchInterests } = useInterests()
const { results, loading, hasSearched, searchProfiles } = useProfileSearch({
  query,
  interests: selectedInterests,
  cities: selectedCities,
  countries: selectedCountries,
})

const activeFilterCount = computed(() =>
  selectedInterests.value.length + selectedCities.value.length + selectedCountries.value.length
)

function removeFilter(arr: string[], value: string) {
  const idx = arr.indexOf(value)
  if (idx >= 0) arr.splice(idx, 1)
}

function syncQueryFromRoute() {
  const q = (route.query.q as string) || ''
  if (query.value !== q) query.value = q
}

function onSubmit() {
  router.replace({ path: '/explore', query: { q: query.value?.trim() || '' } })
}

watch([selectedInterests, selectedCities, selectedCountries], () => {
  searchProfiles()
}, { deep: true })

onMounted(async () => {
  await fetchInterests()
  syncQueryFromRoute()
  searchProfiles()
})

watch(() => route.query.q, () => {
  syncQueryFromRoute()
  searchProfiles()
})
</script>

<style scoped>
/* Mobile filter toggle — hidden on desktop, shown on mobile */
.explore-filter-toggle {
  display: none;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(70, 94, 138, 0.2);
  background: #fff;
  color: #465E8A;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  position: sticky;
  top: 5rem;
  z-index: 10;
  margin-bottom: 0.75rem;
}

@media (max-width: 900px) {
  .explore-content {
    flex-direction: column;
  }
  .explore-filter-toggle {
    display: inline-flex;
  }
}
</style>
