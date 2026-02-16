<template>
  <div class="min-h-screen w-full" style="background:#E4DBCB;">
    <div class="max-w-2xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="roca-title text-2xl md:text-3xl text-[#465E8A]">Mon compte</h1>
        <button v-if="me && !editing" @click="handleLogout" class="logout-btn">
          Se déconnecter
        </button>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-6">
        <div class="account-card text-center">
          <div class="flex justify-center mb-4">
            <USkeleton class="h-20 w-20 rounded-full" />
          </div>
          <USkeleton class="h-5 w-32 mx-auto mb-2" />
          <USkeleton class="h-3.5 w-44 mx-auto" />
        </div>
        <div class="account-card">
          <USkeleton class="h-5 w-16 mb-4" />
          <div class="grid grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i" class="space-y-1.5">
              <USkeleton class="h-3 w-14" />
              <USkeleton class="h-4 w-24" />
            </div>
          </div>
        </div>
        <div class="account-card">
          <USkeleton class="h-5 w-36 mb-4" />
          <div class="flex flex-wrap gap-2">
            <USkeleton v-for="i in 4" :key="i" class="h-7 w-20 rounded-full" />
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="account-card">
        <p class="account-error">{{ error }}</p>
      </div>

      <!-- View Mode -->
      <div v-else-if="me && !editing" class="space-y-6">
        <!-- Avatar + name -->
        <div class="account-card" style="text-align:center;">
          <div class="flex justify-center mb-4">
            <UserAvatar :name="me.name" :image-url="currentProfile?.image_url" size="xl" />
          </div>
          <h2 class="account-name">{{ me.name }}</h2>
          <p class="account-email">{{ me.email }}</p>
        </div>

        <!-- Profile info -->
        <div class="account-card">
          <h2 class="account-label">Profil</h2>
          <div class="account-grid">
            <div v-if="currentProfile?.first_name" class="account-field">
              <span class="account-field-label">Prénom</span>
              <span class="account-field-value">{{ currentProfile.first_name }}</span>
            </div>
            <div v-if="currentProfile?.last_name" class="account-field">
              <span class="account-field-label">Nom</span>
              <span class="account-field-value">{{ currentProfile.last_name }}</span>
            </div>
            <div v-if="currentProfile?.age" class="account-field">
              <span class="account-field-label">Âge</span>
              <span class="account-field-value">{{ currentProfile.age }} ans</span>
            </div>
            <div v-if="currentProfile?.city" class="account-field">
              <span class="account-field-label">Ville</span>
              <span class="account-field-value">{{ currentProfile.city }}</span>
            </div>
            <div v-if="currentProfile?.country" class="account-field">
              <span class="account-field-label">Pays</span>
              <span class="account-field-value">{{ currentProfile.country }}</span>
            </div>
            <div class="account-field">
              <span class="account-field-label">Visible dans la recherche</span>
              <span class="account-field-value">{{ currentProfile?.is_searchable ? 'Oui' : 'Non' }}</span>
            </div>
            <div v-if="currentProfile?.biography" class="account-field account-field--full">
              <span class="account-field-label">Biographie</span>
              <span class="account-field-value">{{ currentProfile.biography }}</span>
            </div>
          </div>
        </div>

        <!-- Interests -->
        <div v-if="currentProfile?.Interests?.length" class="account-card">
          <h2 class="account-label">Centres d'intérêt</h2>
          <div class="account-interests">
            <span v-for="interest in currentProfile.Interests" :key="interest.id" class="account-interest-badge">
              {{ interest.name }}
            </span>
          </div>
        </div>

        <button @click="startEdit" class="edit-btn">Éditer mon profil</button>

        <p class="space-mono-regular text-sm text-[#465E8A] opacity-75">
          Compte créé le {{ formatDate(me.createdAt) }}
        </p>
      </div>

      <!-- Edit Mode -->
      <div v-else-if="me && editing" class="space-y-6">
        <div class="account-card">
          <h2 class="account-label">Modifier mon profil</h2>

          <div v-if="saveError" class="account-error mb-4">{{ saveError }}</div>

          <form @submit.prevent="saveProfile" class="edit-form">
            <div class="edit-grid">
              <div class="edit-field">
                <label class="edit-label">Prénom</label>
                <input v-model="editForm.first_name" type="text" class="edit-input" placeholder="Prénom" />
              </div>
              <div class="edit-field">
                <label class="edit-label">Nom</label>
                <input v-model="editForm.last_name" type="text" class="edit-input" placeholder="Nom" />
              </div>
              <div class="edit-field">
                <label class="edit-label">Âge</label>
                <input v-model.number="editForm.age" type="number" class="edit-input" placeholder="Âge" min="1" max="120" />
              </div>
              <div class="edit-field">
                <label class="edit-label">Ville</label>
                <input v-model="editForm.city" type="text" class="edit-input" placeholder="Ville" />
              </div>
              <div class="edit-field">
                <label class="edit-label">Pays</label>
                <input v-model="editForm.country" type="text" class="edit-input" placeholder="Pays" />
              </div>
            </div>

            <div class="edit-field mt-4">
              <label class="edit-label">Biographie</label>
              <textarea v-model="editForm.biography" class="edit-textarea" rows="3" placeholder="Parlez de vous..."></textarea>
            </div>

            <div class="edit-field mt-4">
              <label class="edit-check-label">
                <input v-model="editForm.is_searchable" type="checkbox" class="edit-checkbox" />
                <span>Mon profil est visible dans la recherche</span>
              </label>
            </div>

            <!-- Interest selection -->
            <div v-if="allInterests.length" class="edit-field mt-4">
              <label class="edit-label">Centres d'intérêt</label>
              <div class="edit-interests">
                <button
                  v-for="interest in allInterests"
                  :key="interest.id"
                  type="button"
                  @click="toggleInterest(interest.id)"
                  :class="['edit-interest-badge', { 'edit-interest-badge--active': editForm.interest_ids?.includes(interest.id) }]"
                >
                  {{ interest.name }}
                </button>
              </div>
            </div>

            <div class="edit-actions">
              <button type="button" @click="editing = false" class="edit-cancel-btn">Annuler</button>
              <button type="submit" :disabled="saveLoading" class="edit-save-btn">
                <span v-if="saveLoading" class="edit-spinner"></span>
                <span v-else>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MeResponse, UserProfile, ProfileEditPayload } from '~/types'

definePageMeta({ layout: 'default', middleware: 'auth' })

useSeoMeta({
  title: 'Mon compte — Nomu',
  description: 'Gérez votre profil, vos informations et vos centres d\'intérêt sur Nomu.',
  robots: 'noindex, nofollow',
})

const { getToken, logout: authLogout } = useAuth()
const { get, patch } = useApi()
const { interests: allInterests, fetchInterests } = useInterests()

const me = ref<MeResponse | null>(null)
const loading = ref(true)
const error = ref('')
const editing = ref(false)
const editForm = ref<ProfileEditPayload>({})
const saveLoading = ref(false)
const saveError = ref('')

const currentProfile = computed<UserProfile | null>(() => {
  if (!me.value) return null
  // API returns Profiles[] array or legacy Profile object
  const profiles = (me.value as any).Profiles || (me.value as any).profiles
  if (Array.isArray(profiles) && profiles.length > 0) return profiles[0]
  // Fallback: legacy singular Profile field
  return (me.value as any).Profile || null
})

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return iso
  }
}

function startEdit() {
  const p = currentProfile.value
  editForm.value = {
    name: me.value?.name || '',
    bio: me.value?.bio || '',
    first_name: p?.first_name || '',
    last_name: p?.last_name || '',
    age: p?.age || null,
    biography: p?.biography || '',
    country: p?.country || '',
    city: p?.city || '',
    is_searchable: p?.is_searchable ?? true,
    interest_ids: p?.Interests?.map(i => i.id) || [],
  }
  editing.value = true
}

function toggleInterest(id: number) {
  if (!editForm.value.interest_ids) editForm.value.interest_ids = []
  const idx = editForm.value.interest_ids.indexOf(id)
  if (idx >= 0) editForm.value.interest_ids.splice(idx, 1)
  else editForm.value.interest_ids.push(id)
}

async function saveProfile() {
  saveLoading.value = true
  saveError.value = ''
  try {
    const updated = await patch<MeResponse>('/users/profile', editForm.value)
    me.value = updated
    editing.value = false
  } catch (e: any) {
    saveError.value = e.message || 'Impossible de sauvegarder.'
  } finally {
    saveLoading.value = false
  }
}

function handleLogout() {
  authLogout()
  navigateTo('/login')
}

onMounted(async () => {
  await fetchInterests()
  const token = getToken()
  if (!token) return
  try {
    me.value = await get<MeResponse>('/users/me')
  } catch (e: any) {
    error.value = e.message || 'Impossible de charger ton profil.'
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
.account-error {
  font-family: 'Space Mono', monospace;
  color: #c53030;
}
.account-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: #465E8A;
  margin: 0;
}
.account-email {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #465E8A;
  opacity: 0.6;
  margin: 0.25rem 0 0;
}
.account-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.account-interest-badge {
  background: #B6FFD7;
  color: #465E8A;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
}
.edit-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 9999px;
  border: 2px solid #465E8A;
  background: #fff;
  color: #465E8A;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-btn:hover {
  background: #465E8A;
  color: #fff;
}
.logout-btn {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  border: 1.5px solid #c53030;
  background: transparent;
  color: #c53030;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}
.logout-btn:hover {
  background: #c53030;
  color: #fff;
}
/* Edit form */
.edit-form {
  display: flex;
  flex-direction: column;
}
.edit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.edit-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.edit-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #465E8A;
  opacity: 0.85;
}
.edit-input {
  padding: 0.65rem 0.85rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #465E8A;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.edit-input:focus {
  outline: none;
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.15);
}
.edit-textarea {
  padding: 0.65rem 0.85rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #465E8A;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.edit-textarea:focus {
  outline: none;
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.15);
}
.edit-check-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #465E8A;
  cursor: pointer;
}
.edit-checkbox {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: #465E8A;
}
.edit-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.edit-interest-badge {
  padding: 0.45rem 0.9rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(70, 94, 138, 0.25);
  background: #fff;
  color: #465E8A;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-interest-badge:hover {
  background: #f5f3ee;
}
.edit-interest-badge--active {
  background: #465E8A;
  color: #fff;
  border-color: #465E8A;
}
.edit-interest-badge--active:hover {
  background: #3a4666;
}
.edit-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.edit-cancel-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 9999px;
  border: 2px solid #465E8A;
  background: #fff;
  color: #465E8A;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-cancel-btn:hover {
  background: #f5f3ee;
}
.edit-save-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 9999px;
  border: none;
  background: #465E8A;
  color: #fff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  min-height: 48px;
}
.edit-save-btn:hover {
  background: #3a4666;
}
.edit-save-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.edit-spinner {
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
