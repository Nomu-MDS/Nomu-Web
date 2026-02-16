<template>
  <div class="auth-page">
    <div class="auth-card auth-card--wide">
      <NuxtLink to="/" class="auth-logo">
        <img src="/img/Nomu_logo.svg" alt="Nomu" class="w-28 h-auto" />
      </NuxtLink>
      <h1 class="auth-title">Créer un compte</h1>
      <p class="auth-subtitle">Rejoins la communauté Nomu et découvre des expériences uniques.</p>

      <form class="auth-form" @submit.prevent="submit">
        <div v-if="error" class="auth-error" role="alert">
          {{ error }}
        </div>
        <div class="auth-grid">
          <div class="auth-field">
            <label for="signup-name" class="auth-label">Nom</label>
            <input
              id="signup-name"
              v-model="name"
              type="text"
              required
              autocomplete="name"
              class="auth-input"
              placeholder="Ton prénom ou pseudo"
            />
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

const name = ref('')
const email = ref('')
const password = ref('')
const location = ref('')
const bio = ref('')
const isSearchable = ref(true)
const error = ref('')
const loading = ref(false)
const router = useRouter()
const { signup } = useAuth()

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const result = await signup({
      name: name.value,
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
  color: #465E8A;
  margin: 0 0 0.5rem;
}

.auth-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  color: #465E8A;
  opacity: 0.9;
  margin: 0 0 1.75rem;
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
  font-family: 'Space Mono', monospace;
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
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: #465E8A;
}

.auth-input {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  color: #465E8A;
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
  font-family: 'Space Mono', monospace;
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
  font-family: 'Space Mono', monospace;
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
