<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <h1 class="roca-title text-2xl md:text-3xl text-[#465E8A] mb-8">Mon compte</h1>

      <div v-if="loading" class="account-card flex justify-center py-12">
        <span class="account-loading">Chargement...</span>
      </div>
      <div v-else-if="error" class="account-card">
        <p class="account-error">{{ error }}</p>
      </div>
      <div v-else-if="me" class="space-y-6">
        <div class="account-card">
          <h2 class="account-label">Profil</h2>
          <div class="account-grid">
            <div class="account-field">
              <span class="account-field-label">Nom</span>
              <span class="account-field-value">{{ me.name }}</span>
            </div>
            <div class="account-field">
              <span class="account-field-label">Email</span>
              <span class="account-field-value">{{ me.email }}</span>
            </div>
            <div class="account-field">
              <span class="account-field-label">Rôle</span>
              <span class="account-field-value">{{ me.role }}</span>
            </div>
            <div v-if="me.bio" class="account-field account-field--full">
              <span class="account-field-label">Bio</span>
              <span class="account-field-value">{{ me.bio }}</span>
            </div>
            <div v-if="me.location" class="account-field">
              <span class="account-field-label">Ville / région</span>
              <span class="account-field-value">{{ me.location }}</span>
            </div>
            <div class="account-field">
              <span class="account-field-label">Profil visible dans la recherche</span>
              <span class="account-field-value">{{ me.Profile?.is_searchable ? 'Oui' : 'Non' }}</span>
            </div>
          </div>
        </div>
        <div v-if="me.Profile" class="account-card">
          <h2 class="account-label">Détails du profil</h2>
          <div class="account-grid">
            <div v-if="me.Profile.first_name" class="account-field">
              <span class="account-field-label">Prénom</span>
              <span class="account-field-value">{{ me.Profile.first_name }}</span>
            </div>
            <div v-if="me.Profile.last_name" class="account-field">
              <span class="account-field-label">Nom</span>
              <span class="account-field-value">{{ me.Profile.last_name }}</span>
            </div>
            <div v-if="me.Profile.city" class="account-field">
              <span class="account-field-label">Ville</span>
              <span class="account-field-value">{{ me.Profile.city }}</span>
            </div>
            <div v-if="me.Profile.country" class="account-field">
              <span class="account-field-label">Pays</span>
              <span class="account-field-value">{{ me.Profile.country }}</span>
            </div>
            <div v-if="me.Profile.biography" class="account-field account-field--full">
              <span class="account-field-label">Biographie</span>
              <span class="account-field-value">{{ me.Profile.biography }}</span>
            </div>
          </div>
        </div>
        <p class="space-mono-regular text-sm text-[#465E8A] opacity-75">
          Compte créé le {{ formatDate(me.createdAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

interface Profile {
  id: number
  last_name: string | null
  first_name: string | null
  age: number | null
  biography: string | null
  country: string | null
  city: string | null
  image_url: string | null
  is_searchable: boolean
  createdAt: string
  updatedAt: string
  user_id: number
  Interests: unknown[]
}

interface Me {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  bio: string | null
  location: string | null
  createdAt: string
  updatedAt: string
  Profile: Profile
}

const config = useRuntimeConfig()
const apiBase = (config.public.apiBaseUrl as string)?.replace(/\/$/, '') || 'http://localhost:3001'
const { getToken } = useAuth()

const me = ref<Me | null>(null)
const loading = ref(true)
const error = ref('')

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

onMounted(async () => {
  const token = getToken()
  if (!token) return
  try {
    const res = await fetch(`${apiBase}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      error.value = res.status === 401 ? 'Session expirée. Reconnecte-toi.' : 'Impossible de charger ton profil.'
      return
    }
    me.value = await res.json()
  } catch {
    error.value = 'Impossible de joindre le serveur.'
  } finally {
    loading.value = false
  }
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
.account-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(70, 94, 138, 0.08);
}
.account-label {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  color: #465E8A;
  margin: 0 0 1rem;
}
.account-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.account-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.account-field--full {
  grid-column: 1 / -1;
}
.account-field-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #465E8A;
  opacity: 0.85;
}
.account-field-value {
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  color: #465E8A;
}
.account-loading {
  font-family: 'Space Mono', monospace;
  color: #465E8A;
  opacity: 0.8;
}
.account-error {
  font-family: 'Space Mono', monospace;
  color: #c53030;
}
</style>
