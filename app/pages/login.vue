<template>
  <div class="auth-page">
    <div class="auth-card">
      <NuxtLink to="/" class="auth-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="w-28 h-auto" />
      </NuxtLink>
      <h1 class="auth-title">Connexion</h1>
      <p class="auth-subtitle">Content de te revoir ! Connecte-toi pour explorer les profils.</p>

      <form class="auth-form" @submit.prevent="submit">
        <div v-if="error" class="auth-error" role="alert">
          {{ error }}
        </div>
        <div class="auth-field">
          <label for="login-email" class="auth-label">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="auth-input"
            placeholder="toi@exemple.com"
          />
        </div>
        <div class="auth-field">
          <label for="login-password" class="auth-label">Mot de passe</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="auth-input"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" class="auth-submit" :disabled="loading">
          <span v-if="loading" class="auth-spinner" aria-hidden="true" />
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="auth-divider">
        <span class="auth-divider-line" />
        <span class="auth-divider-text">ou</span>
        <span class="auth-divider-line" />
      </div>

      <button type="button" class="auth-google-btn" @click="goToGoogle">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
        </svg>
        Continuer avec Google
      </button>

      <p class="auth-footer">
        Pas encore de compte ?
        <NuxtLink to="/signup" class="auth-link">Créer un compte</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'guest' })

useSeoMeta({
  title: 'Connexion — Nomu',
  description: 'Connectez-vous à votre compte Nomu pour explorer les profils et réserver des expériences uniques.',
  ogTitle: 'Connexion — Nomu',
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { login } = useAuth()
const config = useRuntimeConfig()

function goToGoogle() {
  window.location.href = config.public.apiBase + '/auth/google'
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const result = await login({ email: email.value, password: password.value })
    if (result.success) {
      await router.push('/')
    } else {
      error.value = result.error ?? 'Une erreur est survenue.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #E4DBCB;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(14, 34, 74, 0.1), 0 2px 8px rgba(14, 34, 74, 0.06);
}

.auth-logo {
  display: block;
  margin-bottom: 1.5rem;
}

.auth-logo img {
  display: block;
}

.auth-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.75rem;
  color: #0E224A;
  margin: 0 0 0.5rem;
}

.auth-subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #3C3C3B;
  opacity: 0.9;
  margin: 0 0 1.75rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.auth-error {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #c53030;
  background: #fff5f5;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #feb2b2;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #465E8A;
}

.auth-input {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid rgba(70, 94, 138, 0.3);
  border-radius: 0.875rem;
  color: #3C3C3B;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-input::placeholder {
  color: #a0aec0;
}

.auth-input:focus {
  outline: none;
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.15);
}

.auth-submit {
  margin-top: 0.5rem;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.875rem 1.5rem;
  border-radius: 9999px;
  background: #465E8A;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.auth-submit:hover:not(:disabled) {
  background: #3a4666;
}

.auth-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: auth-spin 0.7s linear infinite;
}

@keyframes auth-spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
  margin: 1.5rem 0 0;
  text-align: center;
}

.auth-link {
  color: #465E8A;
  font-weight: 700;
  text-decoration: underline;
}

.auth-link:hover {
  text-decoration: none;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.25rem 0;
}
.auth-divider-line {
  flex: 1;
  height: 1px;
  background: rgba(70, 94, 138, 0.2);
}
.auth-divider-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #a0aec0;
}

.auth-google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border: 1.5px solid rgba(70, 94, 138, 0.3);
  border-radius: 9999px;
  background: #fff;
  color: #3C3C3B;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 1rem;
}
.auth-google-btn:hover {
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.1);
}
</style>
