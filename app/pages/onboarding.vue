<template>
  <div class="onboarding-page">
    <div class="onboarding-card">
      <NuxtLink to="/" class="onboarding-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="w-28 h-auto" />
      </NuxtLink>

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

      <button
        class="onboarding-submit"
        :disabled="selected.length === 0 || saving"
        @click="save"
      >
        <span v-if="saving" class="onboarding-spinner onboarding-spinner--white" />
        <span v-else>Continuer</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'auth' })

useSeoMeta({ robots: 'noindex' })

const { patch } = useApi()
const { interests, fetchInterests } = useInterests()

const selected = ref<number[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  await fetchInterests()
  loading.value = false
})

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
.interest-badge:hover {
  border-color: #465E8A;
}
.interest-badge--active {
  background: #465E8A;
  color: #fff;
  border-color: #465E8A;
}
.onboarding-submit {
  width: 100%;
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
