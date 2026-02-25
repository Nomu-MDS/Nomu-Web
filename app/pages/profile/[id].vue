<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <!-- Hero banner -->
    <section class="profile-hero">
      <NuxtLink to="/explore" class="profile-back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Retour
      </NuxtLink>
    </section>

    <div class="max-w-2xl mx-auto px-4" style="margin-top:-3rem;">
      <!-- Loading skeleton -->
      <div v-if="loading" class="profile-card">
        <div class="flex justify-center mb-5">
          <USkeleton class="h-20 w-20 rounded-full" />
        </div>
        <USkeleton class="h-6 w-40 mx-auto mb-2" />
        <USkeleton class="h-4 w-32 mx-auto mb-6" />
        <div class="text-left space-y-2 mb-6">
          <USkeleton class="h-4 w-20 mb-2" />
          <USkeleton class="h-3.5 w-full" />
          <USkeleton class="h-3.5 w-5/6" />
          <USkeleton class="h-3.5 w-2/3" />
        </div>
        <div class="flex flex-wrap gap-2 mb-6">
          <USkeleton v-for="i in 3" :key="i" class="h-7 w-20 rounded-full" />
        </div>
        <USkeleton class="h-12 w-full rounded-full" />
      </div>

      <!-- Error -->
      <div v-else-if="error" class="profile-card">
        <p class="profile-error">{{ error }}</p>
        <NuxtLink to="/explore" class="profile-link">Retour à l'exploration</NuxtLink>
      </div>

      <!-- Profile -->
      <div v-else-if="profile" class="profile-card">
        <!-- Avatar -->
        <div class="profile-avatar-section">
          <UserAvatar
            :name="profileName"
            :image-url="profile.image_url"
            size="xl"
          />
        </div>

        <!-- Name -->
        <h1 class="profile-name">{{ profileName }}</h1>

        <!-- Age & Location -->
        <p class="profile-meta">
          <span v-if="profile.age">{{ profile.age }} ans</span>
          <span v-if="profile.age && (profile.city || profile.country)"> · </span>
          <span v-if="profile.city">{{ profile.city }}</span>
          <span v-if="profile.city && profile.country">, </span>
          <span v-if="profile.country">{{ profile.country }}</span>
        </p>

        <!-- Biography -->
        <div v-if="profile.biography" class="profile-biography">
          <h2 class="profile-section-title">Biographie</h2>
          <p class="profile-biography-text">{{ profile.biography }}</p>
        </div>

        <!-- Interests -->
        <div v-if="profileInterests.length" class="profile-interests">
          <h2 class="profile-section-title">Centres d'intérêt</h2>
          <div class="profile-interests-list">
            <span v-for="interest in profileInterests" :key="interest.id" class="profile-interest-badge">
              {{ interest.name }}
            </span>
          </div>
        </div>

        <!-- Contact button -->
        <button
          @click="startConversation"
          :disabled="contactLoading"
          class="profile-contact-btn"
        >
          <span v-if="contactLoading" class="profile-spinner"></span>
          <span v-else>Contacter</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileDetail } from '~/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const { get, post } = useApi()

const profileId = computed(() => route.params.id as string)
const profile = ref<ProfileDetail | null>(null)
const userName = ref('')

const profileName = computed(() => {
  if (!profile.value) return ''
  return [profile.value.first_name, profile.value.last_name].filter(Boolean).join(' ') || userName.value || 'Utilisateur'
})

// Normalize interests regardless of Sequelize casing
const profileInterests = computed(() =>
  profile.value?.interests ?? profile.value?.Interests ?? []
)

useSeoMeta({
  title: () => profileName.value ? `${profileName.value} — Nomu` : 'Profil — Nomu',
  description: () => profile.value?.biography
    ? `Découvrez le profil de ${profileName.value} sur Nomu : ${profile.value.biography.slice(0, 140)}`
    : `Découvrez ce profil sur Nomu et réservez une expérience unique.`,
  ogTitle: () => profileName.value ? `${profileName.value} sur Nomu` : 'Profil — Nomu',
  ogDescription: () => profile.value?.biography?.slice(0, 200) || 'Découvrez ce profil et réservez une expérience unique sur Nomu.',
})
const userId = ref<number | null>(null)
const loading = ref(true)
const error = ref('')
const contactLoading = ref(false)

onMounted(async () => {
  try {
    const data = await get<{ id: number; name?: string; profile: ProfileDetail }>(`/users/${profileId.value}`)
    profile.value = data.profile
    userId.value = data.id
    userName.value = data.name || ''
  } catch (e: any) {
    const statusCode = e?.statusCode || 500

    if (statusCode === 403) {
      error.value = 'Ce profil n\'est pas accessible publiquement.'
    } else if (statusCode === 404) {
      error.value = 'Ce profil n\'existe pas.'
    } else {
      error.value = e?.message || 'Impossible de charger ce profil.'
    }
  } finally {
    loading.value = false
  }
})

async function startConversation() {
  if (!userId.value) return
  contactLoading.value = true
  try {
    const data = await post<{ conversation: { id: number }; existed: boolean }>('/conversations', {
      otherUserId: userId.value,
    })
    await router.push(`/messages/${data.conversation.id}`)
  } catch (e: any) {
    // L'erreur sera affichée par le toast automatiquement via useApi/plugin
    // On peut quand même mettre à jour le message d'erreur local si nécessaire
    console.error('Error starting conversation:', e)
  } finally {
    contactLoading.value = false
  }
}
</script>

<style scoped>
.profile-hero {
  background: #E4DBCB;
  padding: 1.5rem 1.5rem 5rem;
}
.profile-back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #465E8A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.profile-back:hover {
  opacity: 1;
}
.profile-card {
  background: #fff;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(70, 94, 138, 0.12);
  text-align: center;
}
.profile-avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.profile-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #0E224A;
  margin: 0 0 0.25rem;
}
.profile-meta {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
  opacity: 0.7;
  margin: 0 0 1.5rem;
}
.profile-section-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #465E8A;
  margin: 0 0 0.5rem;
  text-align: left;
}
.profile-biography {
  margin-bottom: 1.5rem;
}
.profile-biography-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
  opacity: 0.85;
  line-height: 1.6;
  text-align: left;
  margin: 0;
}
.profile-interests {
  margin-bottom: 1.5rem;
}
.profile-interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.profile-interest-badge {
  background: #465E8A;
  color: #fff;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
}
.profile-contact-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 9999px;
  border: none;
  background: #465E8A;
  color: #fff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s;
  min-height: 48px;
}
.profile-contact-btn:hover {
  background: #3a4666;
}
.profile-contact-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.profile-error {
  font-family: 'Poppins', sans-serif;
  color: #c53030;
  margin-bottom: 1rem;
}
.profile-link {
  font-family: 'Poppins', sans-serif;
  color: #465E8A;
  text-decoration: underline;
  font-size: 0.9rem;
}
.profile-spinner {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
