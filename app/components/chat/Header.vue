<template>
  <div class="chat-header">
    <NuxtLink to="/messages" class="chat-header-back">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </NuxtLink>

    <div v-if="name" class="chat-header-info">
      <UserAvatar :name="name" :image-url="imageUrl" size="sm" />
      <span class="chat-header-name">{{ name }}</span>
    </div>

    <button v-if="userId" class="chat-header-flag" @click="reportModal = true" title="Signaler cet utilisateur">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18m0-13.5 6-3 6 3 6-3V18l-6 3-6-3-6 3" />
      </svg>
    </button>
  </div>

  <!-- ── Modal signalement ────────────────────────────────────────────── -->
  <Teleport to="body">
    <div v-if="reportModal" class="report-overlay" @click.self="closeModal">
      <div class="report-sheet">
        <h3 class="report-title">Signaler {{ name }}</h3>

        <div v-if="reportSuccess" class="report-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10b981" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Signalement envoyé. Merci.
        </div>

        <template v-else>
          <label class="report-label">Raison *</label>
          <select v-model="reportReason" class="report-input report-select">
            <option value="" disabled>Choisissez un motif…</option>
            <option value="Comportement inapproprié">Comportement inapproprié</option>
            <option value="Spam ou publicité">Spam ou publicité</option>
            <option value="Harcèlement">Harcèlement</option>
            <option value="Faux profil">Faux profil</option>
            <option value="Contenu offensant">Contenu offensant</option>
            <option value="Autre">Autre</option>
          </select>

          <label class="report-label">Détails (optionnel)</label>
          <textarea v-model="reportMessage" class="report-input report-textarea" rows="3" placeholder="Décrivez le problème…" />

          <p v-if="reportError" class="report-error">{{ reportError }}</p>

          <div class="report-actions">
            <button class="report-btn-cancel" @click="closeModal">Annuler</button>
            <button
              class="report-btn-submit"
              :disabled="!reportReason || reportLoading"
              @click="submitReport"
            >
              {{ reportLoading ? 'Envoi…' : 'Signaler' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  name?: string | null
  imageUrl?: string | null
  userId?: number | null
}>()

const { post } = useApi()

const reportModal   = ref(false)
const reportReason  = ref('')
const reportMessage = ref('')
const reportLoading = ref(false)
const reportError   = ref('')
const reportSuccess = ref(false)

function closeModal() {
  reportModal.value   = false
  reportReason.value  = ''
  reportMessage.value = ''
  reportError.value   = ''
  reportSuccess.value = false
}

async function submitReport() {
  if (!reportReason.value || !props.userId) return
  reportLoading.value = true
  reportError.value   = ''
  try {
    await post('/reports', {
      reportedUserId: props.userId,
      reason:  reportReason.value,
      message: reportMessage.value.trim() || undefined,
    })
    reportSuccess.value = true
    reportReason.value  = ''
    reportMessage.value = ''
    setTimeout(() => { reportModal.value = false; reportSuccess.value = false }, 2000)
  } catch (e: any) {
    reportError.value = e?.statusCode === 409
      ? 'Vous avez déjà signalé cet utilisateur.'
      : 'Une erreur est survenue.'
  } finally {
    reportLoading.value = false
  }
}
</script>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: #E4DBCB;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(70, 94, 138, 0.1);
}
.chat-header-back {
  color: #465E8A;
  display: flex;
  align-items: center;
  opacity: 0.85;
  transition: opacity 0.2s;
  text-decoration: none;
}
.chat-header-back:hover { opacity: 1; }

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
}
.chat-header-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #465E8A;
  letter-spacing: -0.02em;
}

.chat-header-flag {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: none;
  border: none;
  color: rgba(70, 94, 138, 0.4);
  cursor: pointer;
  transition: color 0.15s;
  flex-shrink: 0;
}
.chat-header-flag:hover { color: rgba(70, 94, 138, 0.9); }

/* ── Modal ───────────────────────────────────────────────────────────── */
.report-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 34, 74, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  padding: 0 1rem 1.5rem;
}
.report-sheet {
  width: 100%;
  max-width: 520px;
  background: #F9F5EE;
  border-radius: 20px;
  padding: 28px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 -8px 40px rgba(14, 34, 74, 0.25);
  animation: slideUp 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
}
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.report-title {
  font-family: 'roca', sans-serif;
  font-size: 18px;
  color: #0E224A;
  margin: 0 0 6px;
}
.report-label {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #465E8A;
  letter-spacing: 0.3px;
  margin-bottom: -4px;
}
.report-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid rgba(70, 94, 138, 0.25);
  border-radius: 10px;
  background: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #0E224A;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  resize: none;
}
.report-input:focus { border-color: #465E8A; }
.report-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23465E8A' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
}
.report-textarea { min-height: 80px; }
.report-error {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #e53e3e;
  margin: 0;
}
.report-success {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  color: #0E224A;
  padding: 12px 0 8px;
}
.report-actions {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}
.report-btn-cancel {
  flex: 1;
  height: 46px;
  border-radius: 30px;
  border: 1.5px solid rgba(70, 94, 138, 0.3);
  background: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #465E8A;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.report-btn-cancel:hover { border-color: #465E8A; color: #0E224A; }
.report-btn-submit {
  flex: 1;
  height: 46px;
  border-radius: 30px;
  border: none;
  background: #0E224A;
  font-family: 'roca', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #E4DBCB;
  cursor: pointer;
  transition: opacity 0.15s;
}
.report-btn-submit:hover:not(:disabled) { opacity: 0.88; }
.report-btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
