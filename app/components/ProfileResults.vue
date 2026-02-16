<template>
  <div>
    <div v-if="loading" class="results-loading">
      <span class="results-loading-text">Chargement...</span>
    </div>
    <div v-else>
      <div v-if="results.length" class="results-grid">
        <NuxtLink
          v-for="profile in results"
          :key="profile.id"
          :to="`/profile/${profile.user_id || profile.id}`"
          class="result-card"
        >
          <div class="result-avatar-wrap">
            <img
              v-if="profile.image_url"
              :src="profile.image_url"
              alt="Avatar"
              class="result-avatar"
            />
            <div v-else class="result-avatar-placeholder">
              {{ getInitials(profile.name) }}
            </div>
          </div>
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

function getInitials(name: string | undefined): string {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
</script>

<style scoped>
.results-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
}
.results-loading-text {
  font-family: 'Space Mono', monospace;
  color: #465E8A;
  opacity: 0.8;
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
}
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
.result-avatar-wrap {
  flex-shrink: 0;
}
.result-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(70, 94, 138, 0.15);
}
.result-avatar-placeholder {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #465E8A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
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
