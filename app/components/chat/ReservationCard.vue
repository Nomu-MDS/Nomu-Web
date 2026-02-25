<template>
  <div class="resa-bubble">
    <div class="resa-bubble-card">
      <!-- Sender info -->
      <div class="resa-bubble-sender">
        <UserAvatar :name="isCreator ? 'Vous' : senderName" size="md" />
        <span class="resa-bubble-sender-text">
          <template v-if="isCreator">Vous avez envoyé une <strong>offre</strong></template>
          <template v-else>{{ senderName }} vous a envoyé une <strong>offre</strong></template>
        </span>
      </div>

      <!-- Offer details -->
      <div class="resa-bubble-offer">
        <div class="resa-bubble-offer-top">
          <h4 class="resa-bubble-title">{{ reservation.title }}</h4>
          <span class="resa-bubble-date">{{ formatDateShort(reservation.date) }}</span>
        </div>
        <div class="resa-bubble-details">
          <span class="resa-bubble-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ duration }}
          </span>
          <span class="resa-bubble-detail">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            {{ formatPrice(reservation.price) }}
          </span>
        </div>
      </div>

      <!-- Status or actions -->
      <div v-if="reservation.status === 'pending' && !isCreator" class="resa-bubble-actions">
        <button @click="$emit('decline', reservation.id)" :disabled="loading" class="resa-bubble-btn resa-bubble-btn--decline">
          Refuser
        </button>
        <button @click="$emit('accept', reservation.id)" :disabled="loading" class="resa-bubble-btn resa-bubble-btn--accept">
          Accepter
        </button>
      </div>

      <div v-else-if="reservation.status === 'pending' && isCreator" class="resa-bubble-status resa-bubble-status--pending">
        En attente de réponse…
      </div>

      <div v-else-if="reservation.status === 'accepted'" class="resa-bubble-status resa-bubble-status--accepted">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Réservation acceptée
      </div>

      <div v-else-if="reservation.status === 'declined'" class="resa-bubble-status resa-bubble-status--declined">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Réservation refusée
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '~/types'

const props = defineProps<{
  reservation: Reservation
  myUserId: number
  loading?: boolean
}>()

defineEmits<{
  accept: [id: number]
  decline: [id: number]
}>()

const isCreator = computed(() => props.reservation.creator_id === props.myUserId)

const senderName = computed(() => {
  if (!props.reservation.Conversation) return 'Quelqu\'un'
  const conv = props.reservation.Conversation
  if (conv.voyager_id === props.myUserId) return conv.Local?.name || 'Hôte'
  return conv.Voyager?.name || 'Voyageur'
})

const duration = computed(() => {
  const start = new Date(props.reservation.date)
  const end = new Date(props.reservation.end_date)
  const diffMs = end.getTime() - start.getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (diffH >= 24) {
    const days = Math.floor(diffH / 24)
    return `${days}j${diffH % 24 > 0 ? ` ${diffH % 24}h` : ''}`
  }
  if (diffH > 0 && diffM > 0) return `${diffH}h${String(diffM).padStart(2, '0')}`
  if (diffH > 0) return `${diffH}h`
  return `${diffM}min`
})

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatPrice(price: number | string) {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num)
}
</script>

<style scoped>
.resa-bubble {
  max-width: 85%;
  width: 22rem;
}
.resa-bubble-card {
  background: #EFEFED;
  border: 1.5px solid #465E8A;
  border-radius: 1.5rem;
  overflow: hidden;
}

/* Sender row */
.resa-bubble-sender {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 1.15rem 0.75rem;
}
.resa-bubble-sender-text {
  font-family: 'roca', sans-serif;
  font-size: 0.92rem;
  color: #0E224A;
  line-height: 1.3;
}
.resa-bubble-sender-text strong {
  font-weight: 700;
}

/* Offer block */
.resa-bubble-offer {
  margin: 0 0.85rem;
  background: #465E8A;
  border-radius: 1rem;
  padding: 0.9rem 1rem;
}
.resa-bubble-offer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}
.resa-bubble-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}
.resa-bubble-date {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  padding-top: 0.15rem;
}
.resa-bubble-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.resa-bubble-detail {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
}

/* Action buttons */
.resa-bubble-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  padding: 0.85rem;
}
.resa-bubble-btn {
  padding: 0.6rem;
  border-radius: 9999px;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  border: none;
}
.resa-bubble-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.resa-bubble-btn--decline {
  background: #E4DBCB;
  color: #465E8A;
  border: 1.5px solid rgba(70, 94, 138, 0.2);
}
.resa-bubble-btn--decline:hover:not(:disabled) {
  background: #d9ceba;
}
.resa-bubble-btn--accept {
  background: #465E8A;
  color: #fff;
}
.resa-bubble-btn--accept:hover:not(:disabled) {
  background: #3a4e6e;
}

/* Status labels */
.resa-bubble-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.7rem 0.85rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
}
.resa-bubble-status--pending {
  color: #465E8A;
  opacity: 0.5;
}
.resa-bubble-status--accepted {
  color: #065F46;
  background: #D1FAE5;
}
.resa-bubble-status--declined {
  color: #991B1B;
  background: #FEE2E2;
}
</style>
