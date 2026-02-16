<template>
  <div class="chat-input-area">
    <!-- Reservation form floating card -->
    <Transition name="resa-panel">
      <div v-if="showResaForm" class="resa-backdrop" @click.self="showResaForm = false">
        <div class="resa-card">
          <!-- Header with icon -->
          <div class="resa-card-header">
            <div class="resa-card-header-left">
              <div class="resa-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <h3 class="resa-card-title">Nouvelle réservation</h3>
                <p class="resa-card-subtitle">Proposez une expérience</p>
              </div>
            </div>
            <button @click="showResaForm = false" class="resa-form-close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleResaSubmit" class="resa-form-body">
            <!-- Title -->
            <div class="resa-field">
              <label class="resa-label">Titre de l'expérience</label>
              <input v-model="resaForm.title" type="text" class="resa-input resa-input--lg" placeholder="Ex : Visite guidée de Montmartre" required />
            </div>

            <!-- Price -->
            <div class="resa-field">
              <label class="resa-label">Prix</label>
              <div class="resa-price-wrap">
                <span class="resa-price-currency">€</span>
                <input v-model.number="resaForm.price" type="number" class="resa-input resa-input--price" placeholder="50" min="1" step="0.01" required />
              </div>
            </div>

            <!-- Dates -->
            <div class="resa-dates">
              <div class="resa-field">
                <label class="resa-label">Début</label>
                <input v-model="resaForm.date" type="datetime-local" class="resa-input" required />
              </div>
              <div class="resa-dates-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <div class="resa-field">
                <label class="resa-label">Fin</label>
                <input v-model="resaForm.end_date" type="datetime-local" class="resa-input" required />
              </div>
            </div>

            <div v-if="resaError" class="resa-error">{{ resaError }}</div>

            <Transition name="resa-success-anim">
              <div v-if="resaSuccess" class="resa-success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Réservation envoyée !
              </div>
            </Transition>

            <button type="submit" :disabled="resaLoading || resaSuccess" class="resa-submit">
              <span v-if="resaLoading" class="resa-spinner"></span>
              <span v-else>Envoyer la proposition</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Input bar -->
    <div class="chat-input-form">
      <button type="button" @click="showResaForm = !showResaForm" :class="['chat-plus-btn', { 'chat-plus-btn--active': showResaForm }]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      <form @submit.prevent="handleSubmit" class="chat-input-inner">
        <input
          v-model="text"
          type="text"
          class="chat-input"
          placeholder="Écrire un message..."
          maxlength="2000"
          @input="$emit('typing')"
        />
        <button type="submit" :disabled="!text.trim()" class="chat-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  conversationId: number
}>()

const emit = defineEmits<{
  send: [content: string]
  typing: []
  reservationCreated: []
}>()

const { createReservation } = useReservations()

const text = ref('')
const showResaForm = ref(false)
const resaLoading = ref(false)
const resaError = ref('')
const resaSuccess = ref(false)

const resaForm = ref({
  title: '',
  price: null as number | null,
  date: '',
  end_date: '',
})

function handleSubmit() {
  const content = text.value.trim()
  if (!content) return
  emit('send', content)
  text.value = ''
}

async function handleResaSubmit() {
  resaError.value = ''
  resaSuccess.value = false

  if (!resaForm.value.title.trim()) {
    resaError.value = 'Le titre est requis'
    return
  }
  if (!resaForm.value.price || resaForm.value.price <= 0) {
    resaError.value = 'Le prix doit être supérieur à 0'
    return
  }
  if (!resaForm.value.date || !resaForm.value.end_date) {
    resaError.value = 'Les dates sont requises'
    return
  }
  if (new Date(resaForm.value.end_date) <= new Date(resaForm.value.date)) {
    resaError.value = 'La date de fin doit être après la date de début'
    return
  }

  resaLoading.value = true
  const result = await createReservation({
    title: resaForm.value.title.trim(),
    conversation_id: props.conversationId,
    price: resaForm.value.price,
    date: new Date(resaForm.value.date).toISOString(),
    end_date: new Date(resaForm.value.end_date).toISOString(),
  })
  resaLoading.value = false

  if (result.success) {
    resaSuccess.value = true
    resaForm.value = { title: '', price: null, date: '', end_date: '' }
    emit('reservationCreated')
    setTimeout(() => {
      showResaForm.value = false
      resaSuccess.value = false
    }, 1500)
  } else {
    resaError.value = result.error || 'Erreur lors de la création'
  }
}
</script>

<style scoped>
.chat-input-area {
  flex-shrink: 0;
  background: #fff;
  border-top: 1px solid rgba(70, 94, 138, 0.1);
  position: relative;
}

/* Input bar */
.chat-input-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
}
.chat-input-inner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}
.chat-input {
  flex: 1;
  padding: 0.7rem 1rem;
  border: 2px solid rgba(70, 94, 138, 0.15);
  border-radius: 9999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #465E8A;
  background: #f9f8f5;
  transition: border-color 0.2s;
  min-width: 0;
}
.chat-input:focus {
  outline: none;
  border-color: #465E8A;
}
.chat-input::placeholder {
  color: #465E8A;
  opacity: 0.4;
}

/* Plus button */
.chat-plus-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 2px solid rgba(70, 94, 138, 0.2);
  background: transparent;
  color: #465E8A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.chat-plus-btn:hover {
  border-color: #465E8A;
  background: rgba(70, 94, 138, 0.05);
}
.chat-plus-btn--active {
  background: #465E8A;
  border-color: #465E8A;
  color: #fff;
  transform: rotate(45deg);
}

/* Send button */
.chat-send-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  background: #465E8A;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.chat-send-btn:hover {
  background: #3a4666;
}
.chat-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Floating reservation card */
.resa-backdrop {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem 0.5rem;
  display: flex;
  justify-content: flex-start;
}
.resa-card {
  width: 22rem;
  max-width: calc(100vw - 2rem);
  background: #fff;
  border-radius: 1.25rem;
  box-shadow:
    0 12px 40px rgba(70, 94, 138, 0.18),
    0 2px 8px rgba(70, 94, 138, 0.08);
  overflow: hidden;
}

/* Header */
.resa-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #465E8A 0%, #5a74a0 100%);
}
.resa-card-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.resa-icon-wrap {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B6FFD7;
  flex-shrink: 0;
}
.resa-card-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}
.resa-card-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}
.resa-form-close {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 0.5rem;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.resa-form-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Form body */
.resa-form-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.1rem 1.25rem 1.25rem;
}
.resa-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}
.resa-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  color: #465E8A;
  opacity: 0.55;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.resa-input {
  padding: 0.55rem 0.75rem;
  border: 1.5px solid rgba(70, 94, 138, 0.12);
  border-radius: 0.6rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  color: #465E8A;
  background: #f8f7f4;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 0;
}
.resa-input:focus {
  outline: none;
  border-color: #465E8A;
  box-shadow: 0 0 0 3px rgba(70, 94, 138, 0.1);
  background: #fff;
}
.resa-input--lg {
  font-size: 0.9rem;
  padding: 0.65rem 0.85rem;
}

/* Price field */
.resa-price-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.resa-price-currency {
  position: absolute;
  left: 0.75rem;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #465E8A;
  pointer-events: none;
}
.resa-input--price {
  padding-left: 1.75rem;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Dates row */
.resa-dates {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 0.4rem;
}
.resa-dates-arrow {
  color: #465E8A;
  opacity: 0.25;
  padding-bottom: 0.65rem;
  display: flex;
  align-items: center;
}

/* Submit button */
.resa-submit {
  padding: 0.7rem;
  border-radius: 0.75rem;
  border: none;
  background: linear-gradient(135deg, #465E8A 0%, #5a74a0 100%);
  color: #fff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 2.75rem;
  box-shadow: 0 4px 12px rgba(70, 94, 138, 0.25);
  margin-top: 0.25rem;
}
.resa-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(70, 94, 138, 0.3);
}
.resa-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Error & success */
.resa-error {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: #c53030;
  background: #FEE2E2;
  padding: 0.45rem 0.75rem;
  border-radius: 0.5rem;
}
.resa-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: #065F46;
  background: #D1FAE5;
  padding: 0.55rem 0.75rem;
  border-radius: 0.5rem;
}
.resa-spinner {
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  border: 2.5px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Card animation */
.resa-panel-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.resa-panel-leave-active {
  transition: all 0.2s ease-in;
}
.resa-panel-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
.resa-panel-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.98);
}

/* Success message animation */
.resa-success-anim-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.resa-success-anim-leave-active {
  transition: all 0.15s ease-in;
}
.resa-success-anim-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.resa-success-anim-leave-to {
  opacity: 0;
}
</style>
