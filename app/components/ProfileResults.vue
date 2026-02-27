<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" class="results-grid">
      <div v-for="i in 8" :key="i" class="result-card-wrap">
        <USkeleton class="absolute inset-0" style="border-radius:20px;" />
      </div>
    </div>

    <!-- Results -->
    <div v-else-if="results.length" class="results-grid">
      <div
        v-for="profile in results"
        :key="profile.id"
        class="result-card-wrap"
        @click="handleProfileClick(profile)"
      >
        <!-- Background image or DiceBear avatar fallback -->
        <img :src="avatarUrl(profile)" class="result-img" alt="" loading="lazy" />

        <!-- Gradient overlay -->
        <div class="result-overlay" />

        <!-- Interest tag (top-left) -->
        <span v-if="firstInterest(profile)" class="result-tag">
          {{ firstInterest(profile) }}
        </span>

        <!-- Name + location (bottom) -->
        <div class="result-bottom">
          <span class="result-name">{{ profile.name }}</span>
          <span v-if="profile.city || profile.country" class="result-location">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 inline-block shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {{ [profile.city, profile.country].filter(Boolean).join(', ') }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="results-empty">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mx-auto mb-3 opacity-30">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
      <p v-if="hasSearched" class="results-empty-text">Aucun profil trouvé.</p>
      <p v-else class="results-empty-text">Recherchez un profil ou explorez les intérêts !</p>
    </div>

    <LoginRequiredModal v-model="showLoginModal" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ results: any[]; loading: boolean; hasSearched: boolean }>()

const router = useRouter()
const { isLoggedIn } = useAuth()
const showLoginModal = ref(false)

function handleProfileClick(profile: any) {
  if (isLoggedIn.value) {
    router.push(`/profile/${profile.user_id || profile.id}`)
  } else {
    showLoginModal.value = true
  }
}

function parseInterests(interests: string | string[] | undefined): string[] {
  if (!interests) return []
  if (Array.isArray(interests)) return interests
  return interests.split(',').map(s => s.trim()).filter(Boolean)
}

function firstInterest(profile: any): string | null {
  const interests = parseInterests(profile.interests)
  return interests[0] || null
}

function avatarUrl(profile: any): string {
  if (profile.image_url) return profile.image_url
  const id = profile.user_id || profile.id || 0
  return `https://i.pravatar.cc/500?img=${(id % 70) + 1}`
}
</script>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

@media (min-width: 640px) {
  .results-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
}

@media (min-width: 1024px) {
  .results-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }
}

.result-card-wrap {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  display: block;
  box-shadow: 0 4px 12px rgba(14, 34, 74, 0.12);
  transition: transform 0.2s, box-shadow 0.2s;
}

.result-card-wrap:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 34, 74, 0.2);
}

.result-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.result-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 35%,
    rgba(14, 34, 74, 0.45) 65%,
    rgba(14, 34, 74, 0.88) 100%
  );
}

/* Interest tag — top-left */
.result-tag {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  background: rgba(255, 106, 87, 0.88);
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  white-space: nowrap;
  max-width: calc(100% - 1.2rem);
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Name + location — bottom */
.result-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 0.85rem 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.result-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #fff;
  letter-spacing: -0.015em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Empty state */
.results-empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #465E8A;
}

.results-empty-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
  opacity: 0.6;
  margin: 0;
}
</style>
