<template>
  <div class="resa-card" :class="`border-${resa.status}`">
    <!-- Head -->
    <div class="resa-card-head">
      <UserAvatar :name="partnerName" size="sm" />
      <div class="resa-card-info">
        <p class="resa-partner">{{ partnerName }}</p>
        <NuxtLink :to="`/messages/${resa.conversation_id}`" class="conv-link">Voir la conversation →</NuxtLink>
      </div>
      <span class="status-badge" :class="`badge-${resa.status}`">{{ STATUS_LABELS[resa.status] ?? resa.status }}</span>
    </div>

    <!-- Title block -->
    <div class="resa-title-block">
      <h3 class="resa-title">{{ resa.title }}</h3>
    </div>

    <!-- Meta -->
    <div class="resa-meta">
      <div class="meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>Du {{ formatDate(resa.date) }}</span>
      </div>
      <div class="meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>Au {{ formatDate(resa.end_date) }}</span>
      </div>
      <div class="meta-item">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <span>{{ duration }}</span>
      </div>
      <div class="meta-item meta-price">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        <span>{{ formatPrice(resa.price) }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="resa.status === 'pending' && resa.creator_id !== currentUserId" class="resa-actions">
      <button class="btn-decline" :disabled="actionLoading === resa.id" @click="$emit('decline', resa.id)">
        {{ actionLoading === resa.id ? '…' : 'Refuser' }}
      </button>
      <button class="btn-accept" :disabled="actionLoading === resa.id" @click="$emit('accept', resa.id)">
        {{ actionLoading === resa.id ? '…' : 'Accepter' }}
      </button>
    </div>
    <p v-else-if="resa.status === 'pending'" class="waiting-label">En attente de réponse…</p>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '~/types'

const props = defineProps<{
  resa: Reservation
  partnerName: string
  actionLoading: number | null
  currentUserId: number | null
}>()

defineEmits<{ accept: [id: number]; decline: [id: number] }>()

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente', accepted: 'Acceptée', declined: 'Refusée',
}

const duration = computed(() => {
  const diffMs = new Date(props.resa.end_date).getTime() - new Date(props.resa.date).getTime()
  const h = Math.floor(diffMs / 3_600_000)
  const m = Math.floor((diffMs % 3_600_000) / 60_000)
  if (h >= 24) { const d = Math.floor(h / 24); return `${d}j${h % 24 ? ` ${h % 24}h` : ''}` }
  if (h > 0 && m > 0) return `${h}h${String(m).padStart(2, '0')}`
  return h > 0 ? `${h}h` : `${m}min`
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
}
function formatPrice(price: number | string) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
    .format(typeof price === 'string' ? parseFloat(price) : price)
}
</script>

<style scoped>
.resa-card {
  padding: 1.25rem;
  border-left: 4px solid transparent;
  border-bottom: 1px solid rgba(70, 94, 138, 0.08);
  background: #fff;
  transition: background 0.15s;
}
.resa-card:last-child { border-bottom: none; }
.resa-card:hover { background: #FAFAFA; }

.border-pending  { border-left-color: #d97706; }
.border-accepted { border-left-color: #059669; }
.border-declined { border-left-color: #dc2626; }

.resa-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.resa-card-info { flex: 1; min-width: 0; }
.resa-partner {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #0E224A;
  margin: 0 0 2px;
}
.conv-link {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  color: #07172e;
  opacity: 0.6;
  text-decoration: none;
  transition: opacity 0.15s;
}
.conv-link:hover { opacity: 1; }

.status-badge {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
}
.badge-pending  { background: #fef3c7; color: #b45309; }
.badge-accepted { background: #d1fae5; color: #065f46; }
.badge-declined { background: #fee2e2; color: #991b1b; }

.resa-title-block {
  background: #0E224A;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 12px;
}
.resa-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #E4DBCB;
  margin: 0;
}

.resa-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 14px;
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  color: rgba(70, 94, 138, 0.7);
}
.meta-item svg { flex-shrink: 0; color: #07172e; opacity: 0.6; }
.meta-price { color: #0E224A; font-weight: 600; }
.meta-price svg { opacity: 1; }

.resa-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.btn-decline, .btn-accept {
  height: 40px;
  border-radius: 999px;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
}
.btn-decline {
  background: rgba(70, 94, 138, 0.1);
  color: #07172e;
  border: 1.5px solid rgba(70, 94, 138, 0.2);
}
.btn-decline:hover { background: rgba(70, 94, 138, 0.18); }
.btn-accept { background: #0E224A; color: #E4DBCB; }
.btn-accept:hover { opacity: 0.88; }
.btn-decline:disabled, .btn-accept:disabled { opacity: 0.45; cursor: not-allowed; }

.waiting-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: rgba(70, 94, 138, 0.5);
  text-align: center;
  margin: 0;
  padding: 4px 0;
}
</style>
