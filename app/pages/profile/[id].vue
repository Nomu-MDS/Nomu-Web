<template>
  <div class="page-bg">

    <!-- ── Top bar ──────────────────────────────────────────────────────────── -->
    <section class="profile-hero">
      <div class="profile-topbar">
        <NuxtLink to="/explore" class="profile-back">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Retour
        </NuxtLink>
        <h1 class="profile-page-title">Profil</h1>
        <div style="width:72px"></div>
      </div>
    </section>

    <!-- ── Content ──────────────────────────────────────────────────────────── -->
    <div class="page-content">

      <!-- Loading skeleton -->
      <div v-if="loading" class="passport-card">
        <div class="pp-header">
          <div class="pp-header-id">
            <USkeleton class="h-6 w-6" style="border-radius:2px;flex-shrink:0" />
            <div style="display:flex;flex-direction:column;gap:5px">
              <USkeleton class="h-5 w-24" />
              <USkeleton class="h-3 w-40" />
            </div>
          </div>
          <USkeleton class="h-10 w-28" />
        </div>
        <div class="pp-gold-bar" />
        <div class="pp-body">
          <div class="pp-left">
            <USkeleton style="width:100%;aspect-ratio:3/4;border-radius:6px;" />
            <USkeleton class="h-3 w-20 mt-2" />
          </div>
          <div class="pp-divider" />
          <div class="pp-right">
            <USkeleton class="h-7 w-48" style="border-radius:3px" />
            <USkeleton class="h-5 w-36" style="border-radius:3px" />
            <USkeleton v-for="i in 3" :key="i" class="h-10 w-full" style="border-radius:3px" />
          </div>
        </div>
        <div class="pp-mrz">
          <div class="pp-mrz-rule" />
          <USkeleton class="h-4 w-full mb-1" style="border-radius:2px" />
          <USkeleton class="h-4 w-full" style="border-radius:2px" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="passport-card passport-card--center">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" viewBox="0 0 24 24" stroke="#9EA3AE" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" stroke-linecap="round" />
          <circle cx="12" cy="16.5" r="0.6" fill="#9EA3AE" />
        </svg>
        <p class="error-title">Profil introuvable</p>
        <p class="error-body">{{ error }}</p>
        <NuxtLink to="/explore" class="contact-btn" style="text-decoration:none;max-width:280px;">
          Retour à l'exploration
        </NuxtLink>
      </div>

      <!-- ── Passport ────────────────────────────────────────────────────────── -->
      <template v-else-if="profile">

        <!-- One unified block: passport + dark section + button -->
        <div class="profile-block">

          <!-- ── Passport card ── -->
          <div class="passport-card">
            <div class="pp-security" aria-hidden="true" />

            <div class="pp-header">
              <div class="pp-header-id">
                <span class="pp-emblem">✦</span>
                <div>
                  <p class="pp-country">NOMU</p>
                  <p class="pp-subtitle">PASSEPORT · PASSPORT · PASAPORTE</p>
                </div>
              </div>
              <div class="pp-header-num">
                <p class="pp-no-label">PASSPORT NO.</p>
                <p class="pp-no-value">{{ pPassportNumber }}</p>
              </div>
            </div>

            <div class="pp-gold-bar" />

            <div class="pp-body">
              <div class="pp-left">
                <img
                  :src="profile.image_url || pAvatarFallback"
                  :alt="profileName"
                  class="pp-photo"
                />
                <span class="pp-personal-no">{{ pDocNumber }}</span>
              </div>

              <div class="pp-divider" aria-hidden="true" />

              <div class="pp-right">
                <div class="pp-name-group">
                  <div class="pp-field">
                    <span class="pp-label">Surname / Nom</span>
                    <span class="pp-surname">{{ (profile.last_name || '—').toUpperCase() }}</span>
                  </div>
                  <div class="pp-field">
                    <span class="pp-label">Given Names / Prénoms</span>
                    <span class="pp-givenname">{{ (profile.first_name || '—').toUpperCase() }}</span>
                  </div>
                </div>
                <div class="pp-row">
                  <div class="pp-field">
                    <span class="pp-label">Nationality</span>
                    <span class="pp-value">{{ profile.country || '—' }}</span>
                  </div>
                  <div class="pp-field">
                    <span class="pp-label">Date of birth</span>
                    <span class="pp-value">{{ pBirthYear || '—' }}</span>
                  </div>
                </div>
                <div class="pp-row">
                  <div class="pp-field">
                    <span class="pp-label">Place of birth</span>
                    <span class="pp-value">{{ (profile.city || '—').toUpperCase() }}</span>
                  </div>
                  <div class="pp-field">
                    <span class="pp-label">Type / Code</span>
                    <span class="pp-value">P</span>
                  </div>
                </div>
                <div class="pp-row">
                  <div class="pp-field">
                    <span class="pp-label">Date of issue</span>
                    <span class="pp-value">{{ pStampDate }}</span>
                  </div>
                  <div class="pp-field">
                    <span class="pp-label">Date of expiry</span>
                    <span class="pp-value">{{ pExpiryDate }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pp-mrz">
              <div class="pp-mrz-rule" />
              <code class="pp-mrz-line">{{ mrzLine1 }}</code>
              <code class="pp-mrz-line">{{ mrzLine2 }}</code>
            </div>
          </div>

          <!-- ── Dark section : bio + intérêts + bouton ── -->
          <div class="dark-section">
            <div v-if="profile.biography" class="dark-block">
              <h2 class="dark-title">À propos</h2>
              <p class="dark-body">{{ profile.biography }}</p>
            </div>
            <div v-if="profileInterests.length" class="dark-block">
              <h2 class="dark-title">Intérêts</h2>
              <div class="tags-row">
                <span v-for="interest in profileInterests" :key="interest.id" class="dark-tag">
                  {{ interest.name }}
                </span>
              </div>
            </div>

            <!-- Bouton intégré -->
            <div class="contact-wrapper">
              <button
                class="contact-btn"
                :disabled="contactLoading"
                @click="startConversation"
              >
                <svg v-if="!contactLoading" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <span v-if="contactLoading" class="contact-spinner" />
                {{ contactLoading ? 'Chargement…' : 'Contacter' }}
              </button>
            </div>
          </div>

        </div>

      </template>
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
const userId = ref<number | null>(null)
const loading = ref(true)
const error = ref('')
const contactLoading = ref(false)

const profileName = computed(() => {
  if (!profile.value) return ''
  return [profile.value.first_name, profile.value.last_name].filter(Boolean).join(' ') || userName.value || 'Utilisateur'
})

const profileInterests = computed(() =>
  profile.value?.interests ?? profile.value?.Interests ?? []
)

// ── Passport helpers ──────────────────────────────────────────────────────

const pPassportNumber = computed(() => {
  const id = userId.value ?? 1
  const a = String((id * 73 + 17) % 900 + 100)
  const b = String((id * 137 + 53) % 9000 + 1000)
  const c = String((id * 31 + 7) % 90 + 10)
  return `${a} ${b} ${c}`
})

const pDocNumber = computed(() => {
  const id = userId.value ?? 1
  const prefix = profile.value?.country ? profile.value.country.slice(0, 2).toUpperCase() : 'NM'
  return `${prefix}${String((id * 17) % 900 + 100)}`
})

const pStampDate = computed(() =>
  new Date()
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()
)

const pExpiryDate = computed(() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 10)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
})

const pBirthYear = computed(() => profile.value?.age ? String(new Date().getFullYear() - profile.value.age) : null)
const pAvatarFallback = computed(() => `https://i.pravatar.cc/500?img=${((userId.value ?? 1) % 70) + 1}`)

// ── MRZ lines ─────────────────────────────────────────────────────────────

const mrzLine1 = computed(() => {
  if (!profile.value) return '<'.repeat(44)
  const surname = (profile.value.last_name || '').toUpperCase().replace(/[^A-Z]/g, '<')
  const given = (profile.value.first_name || '').toUpperCase().replace(/[^A-Z]/g, '<')
  return `P<NMU${surname}<<${given}`.padEnd(44, '<').slice(0, 44)
})

const mrzLine2 = computed(() => {
  if (!profile.value) return '<'.repeat(44)
  const docNum = pDocNumber.value.replace(/\s/g, '').padEnd(9, '<').slice(0, 9)
  const nat = 'NMU'
  const by = profile.value.age ? String(new Date().getFullYear() - profile.value.age).slice(-2) : '00'
  const expY = String(new Date().getFullYear() + 10).slice(-2)
  return `${docNum}0${nat}${by}01010M${expY}12310<<<<<<<<<<<<<<<`.padEnd(44, '<').slice(0, 44)
})

// ── SEO ──────────────────────────────────────────────────────────────────

useSeoMeta({
  title: () => profileName.value ? `${profileName.value} — Nomu` : 'Profil — Nomu',
  description: () => profile.value?.biography
    ? `Découvrez le profil de ${profileName.value} sur Nomu : ${profile.value.biography.slice(0, 140)}`
    : `Découvrez ce profil sur Nomu et réservez une expérience unique.`,
  ogTitle: () => profileName.value ? `${profileName.value} sur Nomu` : 'Profil — Nomu',
  ogDescription: () => profile.value?.biography?.slice(0, 200) || 'Découvrez ce profil et réservez une expérience unique sur Nomu.',
})

// ── Data fetching ─────────────────────────────────────────────────────────

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
    console.error('Error starting conversation:', e)
  } finally {
    contactLoading.value = false
  }
}
</script>

<style scoped>
/* ── Page ──────────────────────────────────────────────────────────────────── */
.page-bg {
  min-height: 100vh;
  background: #E4DBCB;
}

/* ── Top bar ───────────────────────────────────────────────────────────────── */
.profile-hero {
  background: #E4DBCB;
  padding: 1.5rem 1.5rem 5rem;
}
.profile-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 64rem;
  margin: 0 auto;
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
.profile-back:hover { opacity: 1; }

.profile-page-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: -0.5px;
  color: #465E8A;
  margin: 0;
}

/* ── Content wrapper ───────────────────────────────────────────────────────── */
.page-content {
  max-width: 64rem;
  margin: -3rem auto 0;
  padding: 0 1.5rem 48px;
}

/* ── Unified profile block (passport + dark section) ─────────────────────── */
.profile-block {
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(20, 40, 80, 0.2),
    0 4px 12px rgba(20, 40, 80, 0.1);
}

/* ── Passport card ─────────────────────────────────────────────────────────── */
.passport-card {
  background: #F9F5EE;
  position: relative;
  overflow: hidden;
}
.passport-card--center {
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(20, 40, 80, 0.2), 0 4px 12px rgba(20, 40, 80, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 3rem 2rem;
  text-align: center;
}

/* Security paper pattern */
.pp-security {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(70, 94, 138, 0.035) 20px,
      rgba(70, 94, 138, 0.035) 21px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      rgba(70, 94, 138, 0.035) 20px,
      rgba(70, 94, 138, 0.035) 21px
    );
  pointer-events: none;
  border-radius: 20px;
}

/* ── Passport header ───────────────────────────────────────────────────────── */
.pp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 22px 20px;
  background: linear-gradient(130deg, #141E36 0%, #1C2B4A 40%, #2B3F6E 75%, #3D5480 100%);
}
.pp-header-id {
  display: flex;
  align-items: center;
  gap: 14px;
}
.pp-emblem {
  font-size: 28px;
  color: #C8B99A;
  line-height: 1;
  flex-shrink: 0;
  opacity: 0.9;
}
.pp-country {
  font-family: 'roca', sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 6px;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.1;
}
.pp-subtitle {
  font-family: 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  color: rgba(200, 185, 154, 1);
  margin: 0;
  margin-top: 4px;
}
.pp-header-num {
  text-align: right;
}
.pp-no-label {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 1.2px;
  color: rgba(200, 185, 154, 1);
  margin: 0;
  text-transform: uppercase;
}
.pp-no-value {
  font-family: 'Courier New', monospace;
  font-size: 22px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  margin-top: 3px;
  letter-spacing: 2px;
}

/* Gold bar */
.pp-gold-bar {
  height: 4px;
  background: linear-gradient(90deg,
    #A8895A 0%,
    #C8B99A 25%,
    #EDD9A0 50%,
    #C8B99A 75%,
    #A8895A 100%
  );
}

/* ── Passport body ─────────────────────────────────────────────────────────── */
.pp-body {
  display: flex;
  align-items: stretch;
  padding: 24px 32px 20px;
  gap: 0;
}

/* Left: photo */
.pp-left {
  width: 34%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding-right: 28px;
}
.pp-photo {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 6px;
  display: block;
  border: 1px solid rgba(70, 94, 138, 0.18);
  box-shadow: 0 2px 8px rgba(20, 40, 80, 0.12);
}
.pp-personal-no {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 1.5px;
  color: #465E8A;
  opacity: 0.85;
}

/* Vertical divider */
.pp-divider {
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(70, 94, 138, 0.2) 10%,
    rgba(70, 94, 138, 0.2) 90%,
    transparent
  );
  flex-shrink: 0;
}

/* Right: fields */
.pp-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 28px;
}

.pp-name-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(70, 94, 138, 0.12);
}

.pp-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.pp-row {
  display: flex;
  gap: 24px;
  border-top: 1px solid rgba(70, 94, 138, 0.1);
  padding-top: 10px;
}
.pp-row .pp-field {
  flex: 1;
  min-width: 0;
}

.pp-label {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 0.8px;
  color: #7A8399;
  text-transform: uppercase;
  font-weight: 600;
}
.pp-surname {
  font-family: 'Courier New', monospace;
  font-size: 26px;
  font-weight: 700;
  color: #141E36;
  letter-spacing: 1.5px;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pp-givenname {
  font-family: 'Courier New', monospace;
  font-size: 19px;
  font-weight: 600;
  color: #2B3F6E;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pp-value {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 700;
  color: #1C2B4A;
  letter-spacing: 0.8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── MRZ Zone ──────────────────────────────────────────────────────────────── */
.pp-mrz {
  background: #EDE8DD;
  padding: 12px 32px 16px;
}
.pp-mrz-rule {
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    #C8B99A 0px,
    #C8B99A 6px,
    transparent 6px,
    transparent 11px
  );
  margin-bottom: 10px;
}
.pp-mrz-line {
  display: block;
  font-family: 'Courier New', monospace;
  font-size: 11.5px;
  letter-spacing: 1.6px;
  color: #2B3F6E;
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
}

/* ── Responsive: stack on narrow screens ───────────────────────────────────── */
@media (max-width: 560px) {
  .pp-header {
    padding: 18px 20px 16px;
  }
  .pp-country { font-size: 20px; letter-spacing: 4px; }
  .pp-no-value { font-size: 15px; }

  .pp-body {
    flex-direction: column;
    padding: 20px 20px 16px;
    gap: 16px;
  }
  .pp-left {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    padding-right: 0;
    padding-bottom: 0;
    gap: 16px;
  }
  .pp-photo {
    width: 38%;
    flex-shrink: 0;
  }
  .pp-divider { display: none; }
  .pp-right {
    padding-left: 0;
    gap: 10px;
  }
  .pp-surname { font-size: 20px; }
  .pp-givenname { font-size: 15px; }
  .pp-value { font-size: 14px; }
  .pp-label { font-size: 10px; }
  .pp-mrz { padding: 10px 20px 14px; }
  .pp-mrz-line { font-size: 9px; letter-spacing: 1px; }
}

/* ── Dark section ──────────────────────────────────────────────────────────── */
.dark-section {
  background: #0E224A;
  padding: 28px 32px 36px;
  min-height: 80px;
}
.dark-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.dark-block:last-child { margin-bottom: 0; }
.dark-title {
  font-family: 'roca', sans-serif;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: #E4DBCB;
  margin: 0;
}
.dark-body {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: #ECEDEE;
  opacity: 0.9;
  margin: 0;
}
.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dark-tag {
  padding: 6px 14px;
  border-radius: 6px;
  border: 0.5px solid rgba(228, 219, 203, 0.4);
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  letter-spacing: -0.2px;
  color: #E4DBCB;
}

/* ── Contact button wrapper ─────────────────────────────────────────────────── */
.contact-wrapper {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(228, 219, 203, 0.12);
}

/* ── Contact button ──────────────────────────────────────────────────────────── */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 54px;
  border-radius: 34px;
  border: none;
  background: #FF6A57;
  color: #ffffff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}
.contact-btn:hover { opacity: 0.92; }
.contact-btn:active { transform: scale(0.99); opacity: 0.88; }
.contact-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

/* ── Error states ──────────────────────────────────────────────────────────── */
.error-title {
  font-family: 'roca', sans-serif;
  font-size: 20px;
  color: #0E224A;
  text-align: center;
  margin: 0;
}
.error-body {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #465E8A;
  text-align: center;
  line-height: 1.5;
  margin: 0;
  opacity: 0.8;
}

/* ── Loading spinner ───────────────────────────────────────────────────────── */
.contact-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
