<template>
  <div class="page-bg">

    <!-- ── Hero ───────────────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">Réservations</h1>
        <p class="hero-sub">Suivez et gérez vos expériences</p>
      </div>
    </section>

    <!-- ── White card ─────────────────────────────────────────────────────── -->
    <div class="white-card">
      <div class="inner">

        <!-- Toolbar -->
        <div class="toolbar">
          <div class="filters">
            <button
              v-for="tab in tabs" :key="tab.value"
              class="filter-btn"
              :class="{ active: activeTab === tab.value }"
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
              <span v-if="countByStatus(tab.value)" class="filter-count">{{ countByStatus(tab.value) }}</span>
            </button>
          </div>

          <div class="view-toggle">
            <button class="view-btn" :class="{ active: viewMode === 'calendar' }" title="Vue calendrier" @click="viewMode = 'calendar'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </button>
            <button class="view-btn" :class="{ active: viewMode === 'list' }" title="Vue liste" @click="viewMode = 'list'">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="cal-skeleton">
          <USkeleton class="h-8 w-48 mb-4" />
          <USkeleton class="h-64 w-full rounded-2xl" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="empty-state">
          <p class="empty-title">Erreur de chargement</p>
          <button class="btn-outline" @click="fetchMyReservations">Réessayer</button>
        </div>

        <template v-else>

          <!-- ── Calendar view ──────────────────────────────────────────── -->
          <template v-if="viewMode === 'calendar'">
            <ClientOnly>
              <VCalendar
                class="nomu-cal"
                :attributes="calendarAttrs"
                expanded
                borderless
                @dayclick="onDayClick"
              />
            </ClientOnly>

            <!-- Legend -->
            <div class="cal-legend">
              <span class="legend-item"><span class="dot dot-pending" />En attente</span>
              <span class="legend-item"><span class="dot dot-accepted" />Acceptée</span>
              <span class="legend-item"><span class="dot dot-declined" />Refusée</span>
            </div>

            <!-- Detail panel -->
            <Transition name="panel">
              <div v-if="selectedReservations.length" class="detail-panel">
                <div class="detail-panel-header">
                  <span class="detail-panel-date">{{ selectedDateLabel }}</span>
                  <button class="detail-close" @click="selectedDate = null">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div class="detail-list">
                  <ReservationCard
                    v-for="resa in selectedReservations"
                    :key="resa.id"
                    :resa="resa"
                    :partner-name="partnerName(resa)"
                    :action-loading="actionLoading"
                    :current-user-id="currentUserId"
                    @accept="handleAccept"
                    @decline="handleDecline"
                  />
                </div>
              </div>
            </Transition>

            <div v-if="filteredReservations.length === 0" class="empty-state">
              <p class="empty-title">Aucune réservation</p>
              <p class="empty-sub">{{ activeTab === 'all' ? 'Vos réservations apparaîtront ici.' : 'Aucune réservation avec ce statut.' }}</p>
            </div>
          </template>

          <!-- ── List view ──────────────────────────────────────────────── -->
          <template v-else>
            <div v-if="filteredReservations.length === 0" class="empty-state">
              <p class="empty-title">Aucune réservation</p>
              <p class="empty-sub">{{ activeTab === 'all' ? 'Vos réservations apparaîtront ici.' : 'Aucune réservation avec ce statut.' }}</p>
            </div>

            <div v-else class="list-wrap">
              <div v-for="group in groupedByMonth" :key="group.key" class="list-group">
                <h3 class="list-month">{{ group.label }}</h3>
                <div class="list-cards">
                  <ReservationCard
                    v-for="resa in group.items"
                    :key="resa.id"
                    :resa="resa"
                    :partner-name="partnerName(resa)"
                    :action-loading="actionLoading"
                    :current-user-id="currentUserId"
                    @accept="handleAccept"
                    @decline="handleDecline"
                  />
                </div>
              </div>
            </div>
          </template>

        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '~/types'

definePageMeta({ middleware: 'auth' })
useSeoMeta({
  title: 'Mes réservations — Nomu',
  description: 'Suivez et gérez vos réservations sur Nomu.',
  robots: 'noindex, nofollow',
})

const { reservations, loading: resaLoading, error, fetchMyReservations, acceptReservation, declineReservation } = useReservations()
const { get } = useApi()

const initialLoading = ref(true)
const loading        = computed(() => initialLoading.value || resaLoading.value)
const activeTab      = ref<'all' | 'pending' | 'accepted' | 'declined'>('all')
const viewMode       = ref<'calendar' | 'list'>('calendar')
const actionLoading  = ref<number | null>(null)
const currentUserId  = ref<number | null>(null)
const selectedDate   = ref<string | null>(null)

// ── Filters ────────────────────────────────────────────────────────────────
const tabs = [
  { label: 'Toutes',     value: 'all'      as const },
  { label: 'En attente', value: 'pending'  as const },
  { label: 'Acceptées',  value: 'accepted' as const },
  { label: 'Refusées',   value: 'declined' as const },
]

const filteredReservations = computed(() =>
  activeTab.value === 'all'
    ? reservations.value
    : reservations.value.filter(r => r.status === activeTab.value)
)

function countByStatus(status: string) {
  if (status === 'all') return reservations.value.length
  return reservations.value.filter(r => r.status === status).length
}

// ── v-calendar attributes ──────────────────────────────────────────────────
const DOT_COLORS: Record<string, string> = {
  pending:  '#d97706',
  accepted: '#059669',
  declined: '#dc2626',
}

const calendarAttrs = computed(() => {
  const attrs: any[] = filteredReservations.value.map(r => ({
    dot:   { style: { backgroundColor: DOT_COLORS[r.status] ?? '#888', width: '6px', height: '6px' } },
    dates: { start: new Date(r.date), end: new Date(r.end_date) },
  }))

  if (selectedDate.value) {
    attrs.push({
      highlight: { style: { background: '#465E8A' }, contentStyle: { color: '#fff' } },
      dates: new Date(selectedDate.value + 'T12:00:00'),
    })
  }

  return attrs
})

// ── Day click ──────────────────────────────────────────────────────────────
function onDayClick(day: { id: string }) {
  selectedDate.value = selectedDate.value === day.id ? null : day.id
}

const selectedReservations = computed(() => {
  if (!selectedDate.value) return []
  const d = new Date(selectedDate.value + 'T12:00:00')
  return filteredReservations.value.filter(r => {
    const start = new Date(r.date)
    const end   = new Date(r.end_date)
    return d >= start && d <= end
  })
})

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) return ''
  return new Date(selectedDate.value + 'T12:00:00')
    .toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^./, c => c.toUpperCase())
})

// ── List: group by month ───────────────────────────────────────────────────
const groupedByMonth = computed(() => {
  const sorted = [...filteredReservations.value].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const groups: { key: string; label: string; items: Reservation[] }[] = []
  for (const r of sorted) {
    const d     = new Date(r.date)
    const key   = `${d.getFullYear()}-${d.getMonth()}`
    const label = d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      .replace(/^./, c => c.toUpperCase())
    let group = groups.find(g => g.key === key)
    if (!group) { group = { key, label, items: [] }; groups.push(group) }
    group.items.push(r)
  }
  return groups
})

// ── Helpers ────────────────────────────────────────────────────────────────
function partnerName(resa: Reservation) {
  if (!resa.Conversation) return 'Inconnu'
  const conv = resa.Conversation
  return currentUserId.value === conv.voyager_id
    ? (conv.Local?.name ?? 'Hôte')
    : (conv.Voyager?.name ?? 'Voyageur')
}

async function handleAccept(id: number) {
  actionLoading.value = id
  await acceptReservation(id)
  actionLoading.value = null
}
async function handleDecline(id: number) {
  actionLoading.value = id
  await declineReservation(id)
  actionLoading.value = null
}

onMounted(async () => {
  try {
    const me = await get<{ id: number }>('/users/me')
    currentUserId.value = me.id
  } catch {}
  await fetchMyReservations()
  initialLoading.value = false
})
</script>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────────────── */
.page-bg  { min-height: 100vh; background: #E4DBCB; }
.hero     { padding: 2.5rem 1.5rem 1.5rem; }
.hero-inner { max-width: 48rem; margin: 0 auto; }
.hero-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 2.25rem;
  color: #0E224A;
  letter-spacing: -0.04em;
  margin: 0 0 4px;
}
.hero-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  color: #465E8A;
  opacity: 0.7;
  margin: 0;
}

.white-card {
  background: #fff;
  border-radius: 32px 32px 0 0;
  min-height: 70vh;
}
.inner {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

/* ── Toolbar ─────────────────────────────────────────────────────────────── */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}
.filters { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; }
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 999px;
  border: 1.5px solid rgba(70, 94, 138, 0.2);
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: #465E8A;
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn:hover { border-color: #465E8A; }
.filter-btn.active { background: #465E8A; border-color: #465E8A; color: #fff; }
.filter-count {
  font-size: 0.65rem;
  font-weight: 700;
  background: rgba(255,255,255,0.25);
  padding: 1px 6px;
  border-radius: 999px;
}
.filter-btn:not(.active) .filter-count { background: rgba(70,94,138,0.12); color: #465E8A; }

/* ── View toggle ─────────────────────────────────────────────────────────── */
.view-toggle {
  display: flex;
  gap: 4px;
  background: rgba(70, 94, 138, 0.07);
  border-radius: 10px;
  padding: 3px;
  flex-shrink: 0;
}
.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(70, 94, 138, 0.45);
  cursor: pointer;
  transition: all 0.15s;
}
.view-btn:hover { color: #465E8A; }
.view-btn.active { background: #fff; color: #0E224A; box-shadow: 0 1px 4px rgba(14,34,74,0.12); }

/* ── v-calendar overrides ────────────────────────────────────────────────── */
.nomu-cal {
  width: 100% !important;
  border-radius: 20px;
  background: #F9F7F4 !important;
  border: 1px solid rgba(70, 94, 138, 0.1) !important;
  font-family: 'Poppins', sans-serif;
}
:deep(.vc-header) { padding: 1rem 1.25rem 0.5rem; }
:deep(.vc-title) {
  font-family: 'roca', sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.05rem !important;
  color: #0E224A !important;
}
:deep(.vc-arrow) {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  border: 1.5px solid rgba(70, 94, 138, 0.2) !important;
  background: #fff !important;
  color: #465E8A !important;
}
:deep(.vc-arrow:hover) { border-color: #465E8A !important; background: #465E8A !important; color: #fff !important; }
:deep(.vc-weekday) {
  font-family: 'Poppins', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 600 !important;
  color: rgba(70, 94, 138, 0.5) !important;
}
:deep(.vc-weeks) { padding: 0 0.5rem 0.75rem; }
:deep(.vc-day) { min-height: 64px; padding: 6px 0; }
:deep(.vc-day-content) {
  font-family: 'Poppins', sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  color: #0E224A !important;
  width: 36px !important;
  height: 36px !important;
}
:deep(.vc-day-content:hover) { background: rgba(70, 94, 138, 0.1) !important; }
:deep(.vc-highlight) { border-radius: 50% !important; width: 36px !important; height: 36px !important; }
:deep(.vc-dots) { gap: 3px; margin-top: 2px; }
:deep(.vc-dot) { width: 7px !important; height: 7px !important; }

/* ── Legend ──────────────────────────────────────────────────────────────── */
.cal-legend {
  display: flex;
  gap: 16px;
  margin-top: 0.75rem;
  justify-content: center;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.7rem;
  color: rgba(70, 94, 138, 0.6);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-pending  { background: #d97706; }
.dot-accepted { background: #059669; }
.dot-declined { background: #dc2626; }

/* ── Detail panel ────────────────────────────────────────────────────────── */
.detail-panel {
  margin-top: 1.25rem;
  border-radius: 20px;
  border: 1.5px solid rgba(70, 94, 138, 0.15);
  overflow: hidden;
}
.detail-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #F9F7F4;
  border-bottom: 1px solid rgba(70, 94, 138, 0.1);
}
.detail-panel-date {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #0E224A;
}
.detail-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(70, 94, 138, 0.1);
  color: #465E8A;
  cursor: pointer;
  transition: background 0.15s;
}
.detail-close:hover { background: rgba(70, 94, 138, 0.2); }
.detail-list { display: flex; flex-direction: column; }

/* ── List view ───────────────────────────────────────────────────────────── */
.list-wrap { display: flex; flex-direction: column; gap: 2rem; }
.list-month {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: rgba(70, 94, 138, 0.5);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(70, 94, 138, 0.1);
}
.list-cards {
  border-radius: 20px;
  border: 1.5px solid rgba(70, 94, 138, 0.15);
  overflow: hidden;
}

/* ── Empty / skeleton ────────────────────────────────────────────────────── */
.cal-skeleton { padding: 1rem 0; }
.empty-state { margin-top: 1.5rem; text-align: center; padding: 3rem 1rem; }
.empty-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: rgba(70, 94, 138, 0.5);
  margin: 0 0 6px;
}
.empty-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  color: rgba(70, 94, 138, 0.35);
  margin: 0;
}
.btn-outline {
  margin-top: 1rem;
  padding: 8px 20px;
  border-radius: 999px;
  border: 1.5px solid #465E8A;
  background: transparent;
  color: #465E8A;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  cursor: pointer;
}
.btn-outline:hover { background: #465E8A; color: #fff; }

/* ── Panel transition ────────────────────────────────────────────────────── */
.panel-enter-active, .panel-leave-active { transition: all 0.25s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(12px); }
</style>
