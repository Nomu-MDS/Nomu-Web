<template>
  <div>
    <div v-if="loading" class="results-grid">
      <div v-for="i in 6" :key="i" class="result-card" style="pointer-events:none;">
        <USkeleton class="h-12 w-12 rounded-full shrink-0" />
        <div class="result-info space-y-2">
          <div class="flex items-baseline gap-2">
            <USkeleton class="h-4 w-28" />
            <USkeleton class="h-3 w-16" />
          </div>
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-3/4" />
          <div class="flex gap-1.5 mt-1">
            <USkeleton class="h-5 w-14 rounded-full" />
            <USkeleton class="h-5 w-16 rounded-full" />
            <USkeleton class="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="results.length" class="results-grid">
        <NuxtLink
          v-for="profile in results"
          :key="profile.id"
          :to="`/profile/${profile.user_id || profile.id}`"
          class="result-card"
        >
          <UserAvatar :name="profile.name" :image-url="profile.image_url" size="lg" />
          <div class="result-info">
            <div class="result-header">
              <span class="result-name">{{ profile.name }}</span>
              <span v-if="profile.city || profile.country" class="result-location">
                {{ profile.city }}<span v-if="profile.city && profile.country">, </span>{{ profile.country }}
              </span>
            </div>
            <div class="result-bio">{{ profile.biography || profile.bio }}</div>
            <div class="result-interests">
              <span
                v-for="interest in parseInterests(profile.interests).slice(0, 3)"
                :key="interest"
                class="result-interest-badge"
              >{{ interest }}</span>
              <span v-if="parseInterests(profile.interests).length > 3" class="result-interest-more">
                +{{ parseInterests(profile.interests).length - 3 }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="results-empty">
        <span v-if="hasSearched">Aucun profil trouvé.</span>
        <span v-else>Recherchez un profil ou explorez les intérêts !</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ results: any[]; loading: boolean; hasSearched: boolean }>()

function parseInterests(interests: string | string[] | undefined): string[] {
  if (!interests) return []
  if (Array.isArray(interests)) return interests
  return interests.split(',').map(s => s.trim()).filter(Boolean)
}
</script>

<style scoped>
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1rem;
}
.result-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: #fff;
  border-radius: 1rem;
  border: 1px solid rgba(70, 94, 138, 0.08);
  box-shadow: 0 2px 12px rgba(70, 94, 138, 0.06);
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
}
.result-card:hover {
  box-shadow: 0 6px 24px rgba(70, 94, 138, 0.14);
  transform: translateY(-2px);
}
.result-info {
  flex: 1;
  min-width: 0;
}
.result-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
}
.result-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #465E8A;
}
.result-location {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #465E8A;
  opacity: 0.6;
}
.result-bio {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #465E8A;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.result-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.result-interest-badge {
  background: #B6FFD7;
  color: #465E8A;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 400;
}
.result-interest-more {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #465E8A;
  opacity: 0.5;
  padding: 0.2rem 0.4rem;
}
.results-empty {
  text-align: center;
  padding: 3rem 0;
  font-family: 'Space Mono', monospace;
  color: #465E8A;
  opacity: 0.6;
}
</style>
