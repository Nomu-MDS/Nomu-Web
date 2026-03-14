<template>
  <div class="auth-page">
    <div class="auth-card auth-card--wide">
      <NuxtLink to="/" class="auth-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="w-28 h-auto" />
      </NuxtLink>
      <h1 class="auth-title">Créer un compte</h1>
      <p class="auth-subtitle">Rejoins la communauté Nomu et découvre des expériences uniques.</p>

      <button type="button" class="auth-google-btn" @click="goToGoogle">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
        </svg>
        S'inscrire avec Google
      </button>

      <div class="auth-divider">
        <span class="auth-divider-line" />
        <span class="auth-divider-text">ou avec un email</span>
        <span class="auth-divider-line" />
      </div>

      <form class="auth-form" @submit.prevent="submit">
        <div v-if="error" class="auth-error" role="alert">
          {{ error }}
        </div>
        <div class="auth-grid">
          <div class="auth-field">
            <label for="signup-firstname" class="auth-label">Prénom</label>
            <input
              id="signup-firstname"
              v-model="first_name"
              type="text"
              required
              autocomplete="given-name"
              class="auth-input"
              placeholder="Ton prénom"
            />
          </div>
          <div class="auth-field">
            <label for="signup-lastname" class="auth-label">Nom</label>
            <input
              id="signup-lastname"
              v-model="last_name"
              type="text"
              required
              autocomplete="family-name"
              class="auth-input"
              placeholder="Ton nom de famille"
            />
          </div>
        </div>
        <div class="auth-field">
          <label for="signup-email" class="auth-label">Email</label>
          <input
            id="signup-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            class="auth-input"
            placeholder="toi@exemple.com"
          />
        </div>
        <div class="auth-field">
          <label for="signup-password" class="auth-label">Mot de passe</label>
          <input
            id="signup-password"
            v-model="password"
            type="password"
            required
            autocomplete="new-password"
            class="auth-input"
            placeholder="••••••••"
          />
        </div>
        <div class="auth-field">
          <label for="signup-location" class="auth-label">Ville ou région</label>
          <input
            id="signup-location"
            v-model="location"
            type="text"
            autocomplete="address-level2"
            class="auth-input"
            placeholder="Paris, Lyon..."
          />
        </div>
        <div class="auth-field">
          <label for="signup-bio" class="auth-label">Bio (optionnel)</label>
          <textarea
            id="signup-bio"
            v-model="bio"
            class="auth-input auth-textarea"
            rows="3"
            placeholder="Présente-toi en quelques mots..."
          />
        </div>
        <label class="auth-checkbox">
          <input v-model="isSearchable" type="checkbox" class="auth-checkbox-input" />
          <span class="auth-checkbox-text">Mon profil peut être trouvé dans les recherches</span>
        </label>
        <button type="submit" class="auth-submit" :disabled="loading">
          <span v-if="loading" class="auth-spinner" aria-hidden="true" />
          <span v-else>Créer mon compte</span>
        </button>
      </form>

      <p class="auth-footer">
        Déjà un compte ?
        <NuxtLink to="/login" class="auth-link">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'guest' })

useSeoMeta({
  title: 'Créer un compte — Nomu',
  description: 'Rejoignez la communauté Nomu et découvrez des expériences uniques. Inscription gratuite en quelques secondes.',
  ogTitle: 'Rejoignez Nomu — Créez votre compte',
  ogDescription: 'Inscrivez-vous gratuitement pour explorer des profils et réserver des expériences authentiques.',
})

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const location = ref('')
const bio = ref('')
const isSearchable = ref(true)
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { signup } = useAuth()
const config = useRuntimeConfig()

function goToGoogle() {
  window.location.href = config.public.apiBase + '/auth/google'
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const result = await signup({
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      is_searchable: isSearchable.value,
      bio: bio.value,
      location: location.value,
    })
    if (result.success) {
      if (result.token) {
        await router.push('/')
      } else {
        await router.push('/login')
      }
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
  box-shadow: 0 20px 50px rgba(70, 94, 138, 0.12);
}

.auth-card--wide {
  max-width: 600px;
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

.auth-google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border: 1.5px solid rgba(70, 94, 138, 0.3);
  border-radius: 9999px;
  background: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #3C3C3B;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  margin-bottom: 1.25rem;
}

.auth-google-btn:hover {
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.1);
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.auth-divider-line {
  flex: 1;
  height: 1px;
  background: rgba(70, 94, 138, 0.2);
}

.auth-divider-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: #465E8A;
  opacity: 0.7;
  white-space: nowrap;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.auth-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 500px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }
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

.auth-textarea {
  resize: vertical;
  min-height: 80px;
}

.auth-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #465E8A;
}

.auth-checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.15rem;
  accent-color: #465E8A;
  cursor: pointer;
}

.auth-checkbox-text {
  flex: 1;
}

.auth-submit {
  margin-top: 0.25rem;
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
</style>
