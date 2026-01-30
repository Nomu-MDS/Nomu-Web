<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center py-10">
      <span class="text-orange-500 animate-pulse">Chargement...</span>
    </div>
    <div v-else>
      <div v-if="results.length" class="grid md:grid-cols-2 gap-6">
        <div v-for="profile in results" :key="profile.id" class="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
          <img
            :src="profile.image_url || '/default-avatar.png'"
            alt="Avatar"
            class="w-16 h-16 rounded-full object-cover border-2 border-orange-200 bg-white"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-semibold text-lg text-orange-700">{{ profile.name }}</span>
              <span v-if="profile.city || profile.country" class="text-xs text-orange-400">{{ profile.city }}<span v-if="profile.city && profile.country">, </span>{{ profile.country }}</span>
            </div>
            <div class="text-gray-600 text-sm mb-1 line-clamp-2">{{ profile.biography || profile.bio }}</div>
            <div class="flex flex-wrap gap-1">
              <span v-for="interest in (profile.interests ? profile.interests.split(',').slice(0,3) : [])" :key="interest" class="bg-orange-200 text-orange-800 px-2 py-0.5 rounded-full text-xs">{{ interest }}</span>
              <span v-if="profile.interests && profile.interests.split(',').length > 3" class="text-xs text-orange-400">+{{ profile.interests.split(',').length - 3 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-10">
        <span v-if="hasSearched">Aucun profil trouvé.</span>
        <span v-else>Recherchez un profil ou explorez les intérêts !</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ results: any[]; loading: boolean; hasSearched: boolean }>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
