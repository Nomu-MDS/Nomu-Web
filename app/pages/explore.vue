<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <!-- Même bandeau + formulaire que la home -->
    <section class="w-full flex flex-col items-center justify-center py-16 px-4 mb-8" style="background:#465E8A;border-radius:0 0 2.5rem 2.5rem;">
      <div class="max-w-4xl w-full flex flex-col items-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 roca-title text-center text-white">
          Explorer les <span style="color:#B6FFD7;font-style:italic;">profils</span>
        </h1>
        <p class="text-base md:text-lg mb-6 space-mono-regular text-center text-white">
          Affinez votre recherche ci-dessous.
        </p>
        <form @submit.prevent="onSubmit" class="w-full max-w-2xl flex items-center gap-2 mb-4">
          <input
            v-model="query"
            type="search"
            class="flex-1 rounded-full border border-white bg-white/90 px-6 py-4 text-lg space-mono-regular text-[#465E8A] focus:outline-none focus:ring-2 focus:ring-[#B6FFD7] transition"
            placeholder="Que cherchez-vous ? Par exemple : Yoga, Cuisine, Paris..."
            aria-label="Recherche de profils"
          />
          <button type="submit" class="rounded-full bg-white hover:bg-[#e4dbcb] transition px-6 py-4 text-[#3A5AFF] font-bold text-lg shadow border border-[#3A5AFF]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 py-6">
      <h2 class="roca-title text-xl md:text-2xl text-[#465E8A] mb-6">
        Résultats pour « {{ query || '...' }} »
      </h2>
      <ProfileResults :results="results" :loading="loading" :has-searched="hasSearched" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const selectedInterests = ref<string[]>([])

// Champ du formulaire : initialisé avec ?q= au chargement / quand on vient de la home
const query = ref('')

const { results, loading, hasSearched, searchProfiles } = useProfileSearch(query, selectedInterests)

function syncQueryFromRoute() {
  const q = (route.query.q as string) || ''
  if (query.value !== q) query.value = q
}

function onSubmit() {
  router.replace({ path: '/explore', query: { q: query.value?.trim() || '' } })
}

onMounted(() => {
  syncQueryFromRoute()
  if (query.value) searchProfiles()
})

watch(() => route.query.q, () => {
  syncQueryFromRoute()
  if (query.value) searchProfiles()
})
</script>

<style scoped>
.roca-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
}
.space-mono-regular {
  font-family: 'Space Mono', monospace;
  font-weight: 400;
}
</style>
