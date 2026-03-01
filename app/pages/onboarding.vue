<template>
  <div class="onboarding-page">
    <div class="onboarding-card">
      <NuxtLink to="/" class="onboarding-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="w-28 h-auto" />
      </NuxtLink>

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: step === 1 ? '50%' : '100%' }" />
        </div>
        <span class="progress-label">Étape {{ step }}/2</span>
      </div>

      <!-- ── Step 1 : Photo ───────────────────────────────────────────────── -->
      <template v-if="step === 1">
        <h1 class="onboarding-title">Ta photo de profil</h1>
        <p class="onboarding-subtitle">Ajoute une photo pour que les autres puissent te reconnaître. Tu pourras la modifier plus tard.</p>

        <div v-if="uploadError" class="onboarding-error">{{ uploadError }}</div>

        <div class="avatar-section">
          <button type="button" class="avatar-btn" @click="fileInput?.click()" :disabled="uploading">
            <div class="avatar-circle">
              <img v-if="avatarUrl" :src="avatarUrl" alt="Photo de profil" class="avatar-img" />
              <span v-else class="avatar-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#465E8A" opacity="0.4">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </span>
              <div class="avatar-overlay">
                <span v-if="uploading" class="onboarding-spinner" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
                  <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/>
                  <path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9Zm3 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
                </svg>
              </div>
            </div>
          </button>
          <p class="avatar-hint">{{ uploading ? 'Upload en cours…' : avatarUrl ? 'Changer la photo' : 'Ajouter une photo' }}</p>
          <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" style="display:none" @change="handleFileChange" />
        </div>

        <div class="step-actions">
          <button class="onboarding-skip" @click="step = 2">Passer cette étape</button>
          <button class="onboarding-submit" :disabled="uploading" @click="step = 2">
            {{ avatarUrl ? 'Continuer' : 'Passer' }}
          </button>
        </div>
      </template>

      <!-- ── Step 2 : Intérêts ────────────────────────────────────────────── -->
      <template v-else>
        <h1 class="onboarding-title">Tes centres d'intérêt</h1>
        <p class="onboarding-subtitle">Sélectionne au moins un intérêt pour personnaliser ton expérience.</p>

        <div v-if="error" class="onboarding-error">{{ error }}</div>

        <div v-if="loading" class="onboarding-loading">
          <span class="onboarding-spinner" />
        </div>

        <div v-else class="onboarding-interests">
          <button
            v-for="interest in interests"
            :key="interest.id"
            type="button"
            :class="['interest-badge', { 'interest-badge--active': selected.includes(interest.id) }]"
            @click="toggle(interest.id)"
          >
            {{ interest.name }}
          </button>
        </div>

        <div class="step-actions">
          <button class="onboarding-skip" @click="step = 1">Retour</button>
          <button
            class="onboarding-submit"
            :disabled="selected.length === 0 || saving"
            @click="save"
          >
            <span v-if="saving" class="onboarding-spinner onboarding-spinner--white" />
            <span v-else>Terminer</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'auth' })

useSeoMeta({ robots: 'noindex' })

const { patch } = useApi()
const { getToken } = useAuth()
const { interests, fetchInterests } = useInterests()

const step = ref(1)
const selected = ref<number[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')

// Photo
const fileInput = ref<HTMLInputElement | null>(null)
const avatarUrl = ref<string | null>(null)
const uploading = ref(false)
const uploadError = ref('')

onMounted(async () => {
  await fetchInterests()
  loading.value = false
})

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  avatarUrl.value = URL.createObjectURL(file)
  uploading.value = true
  uploadError.value = ''

  try {
    const token = getToken()
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('/api/upload/profile-photo/file', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || 'Erreur upload')
    }

    const data = await res.json()
    avatarUrl.value = data.image_url
  } catch (e: any) {
    avatarUrl.value = null
    uploadError.value = e.message || "Impossible d'uploader la photo"
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function toggle(id: number) {
  const idx = selected.value.indexOf(id)
  if (idx >= 0) selected.value.splice(idx, 1)
  else selected.value.push(id)
}

async function save() {
  if (selected.value.length === 0 || saving.value) return
  saving.value = true
  error.value = ''
  try {
    await patch('/users/profile', { interest_ids: selected.value })
    navigateTo('/')
  } catch {
    error.value = 'Impossible de sauvegarder. Réessaie.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  background: #E4DBCB;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.onboarding-card {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(14, 34, 74, 0.1);
}
.onboarding-logo {
  display: block;
  margin-bottom: 1.5rem;
}

/* Progress */
.progress-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}
.progress-track {
  flex: 1;
  height: 6px;
  background: rgba(70, 94, 138, 0.15);
  border-radius: 9999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #465E8A;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.progress-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: #465E8A;
  white-space: nowrap;
}

.onboarding-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: #0E224A;
  margin: 0 0 0.5rem;
}
.onboarding-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #3C3C3B;
  margin: 0 0 1.75rem;
}
.onboarding-error {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #c53030;
  background: #fff5f5;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #feb2b2;
  margin-bottom: 1rem;
}
.onboarding-loading {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* Avatar */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.avatar-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.avatar-btn:disabled { cursor: not-allowed; }
.avatar-circle {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(70, 94, 138, 0.08);
  border: 2px dashed rgba(70, 94, 138, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 50%;
}
.avatar-btn:hover .avatar-overlay,
.avatar-btn:disabled .avatar-overlay { opacity: 1; }
.avatar-hint {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #465E8A;
  font-weight: 600;
}

/* Interests */
.onboarding-interests {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-bottom: 2rem;
}
.interest-badge {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(70, 94, 138, 0.25);
  background: #fff;
  color: #465E8A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.15s;
}
.interest-badge:hover { border-color: #465E8A; }
.interest-badge--active {
  background: #465E8A;
  color: #fff;
  border-color: #465E8A;
}

/* Actions */
.step-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.onboarding-skip {
  flex-shrink: 0;
  background: none;
  border: 1.5px solid rgba(70, 94, 138, 0.3);
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  color: #465E8A;
  cursor: pointer;
  transition: border-color 0.2s;
}
.onboarding-skip:hover { border-color: #465E8A; }
.onboarding-submit {
  flex: 1;
  padding: 0.875rem;
  border-radius: 9999px;
  background: #465E8A;
  color: #fff;
  border: none;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}
.onboarding-submit:hover:not(:disabled) { background: #3a4666; }
.onboarding-submit:disabled { opacity: 0.6; cursor: not-allowed; }

.onboarding-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(70, 94, 138, 0.3);
  border-top-color: #465E8A;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
.onboarding-spinner--white {
  border-color: rgba(255,255,255,0.3);
  border-top-color: #fff;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
