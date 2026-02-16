<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <!-- HERO SECTION FULL WIDTH -->
    <section class="w-full flex flex-col items-center justify-center py-20 px-4 mb-12" style="background:#465E8A;border-radius:0 0 2.5rem 2.5rem;">
    <div class="max-w-4xl w-full flex flex-col items-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6 roca-title text-center text-white">
        Trouver les bons <span style="color:#B6FFD7;font-style:italic;">profils</span><br />pour toutes vos envies
      </h1>
      <p class="text-lg md:text-xl mb-8 space-mono-regular text-center text-white">
        Explorez, discutez et réservez des expériences uniques avec la communauté Nomu.
      </p>
      <form @submit.prevent="searchProfiles" class="w-full max-w-2xl flex items-center gap-2 mb-4">
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
      <!-- Plus de filtres d'intérêts ni de bouton 'Tout effacer' car l'API ne fournit pas d'intérêts -->
    </div>
  </section>

  <LoginRequiredModal v-model="showLoginModal" />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Nomu — Trouvez les bons profils pour toutes vos envies',
  description: 'Explorez, discutez et réservez des expériences uniques avec la communauté Nomu. Yoga, cuisine, voyages et bien plus.',
  ogTitle: 'Nomu — Expériences uniques entre passionnés',
  ogDescription: 'Trouvez les bons profils, échangez et réservez des expériences authentiques.',
  ogImage: 'https://app.nomu.charlesremy.dev/img/Nomu_OG.png',
  twitterCard: 'summary_large_image',
})

const query = ref('')
const showLoginModal = ref(false)
const router = useRouter()
const { isLoggedIn } = useAuth()

function searchProfiles() {
  if (!isLoggedIn.value) {
    showLoginModal.value = true
    return
  }
  router.push({ path: '/explore', query: { q: query.value || '' } })
}
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
