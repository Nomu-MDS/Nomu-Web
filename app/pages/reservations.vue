<template>
  <div class="min-h-screen w-full bg-[#E4DBCB]">
    <!-- Hero header -->
    <section class="bg-[#465E8A] px-6 pt-10 pb-8 rounded-b-4xl">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="font-[roca] font-bold text-3xl text-white mb-2">
          Mes <span class="text-[#B6FFD7] italic">réservations</span>
        </h1>
        <p class="font-mono text-sm text-white/60">
          Suivez et gérez vos expériences
        </p>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 pt-10">
      <!-- Tabs -->
      <div class="flex gap-2 overflow-x-auto pb-1 mb-6 justify-center">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs whitespace-nowrap cursor-pointer transition-all duration-200 border-none shadow-sm"
          :class="activeTab === tab.value
            ? 'bg-[#465E8A] text-white shadow-md'
            : 'bg-white text-[#465E8A] hover:shadow-md'"
        >
          {{ tab.label }}
          <span
            v-if="countByStatus(tab.value)"
            class="text-[0.65rem] font-bold px-1.5 py-px rounded-full min-w-4 text-center"
            :class="activeTab === tab.value ? 'bg-white/25' : 'bg-[#465E8A]/10'"
          >
            {{ countByStatus(tab.value) }}
          </span>
        </button>
      </div>

      <!-- Loading skeletons -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl overflow-hidden border border-[#465E8A]/10">
          <USkeleton class="h-1 w-full" />
          <div class="p-5">
            <div class="flex items-center gap-3 mb-4">
              <USkeleton class="h-10 w-10 rounded-full" />
              <div class="flex-1 space-y-2">
                <USkeleton class="h-3.5 w-28" />
                <USkeleton class="h-3 w-20" />
              </div>
              <USkeleton class="h-6 w-20 rounded-full" />
            </div>
            <USkeleton class="h-24 w-full rounded-xl mb-4" />
            <div class="flex gap-2.5">
              <USkeleton class="h-10 flex-1 rounded-full" />
              <USkeleton class="h-10 flex-1 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-white rounded-2xl border-2 border-[#465E8A]/10 p-12 text-center">
        <p class="font-mono text-sm text-red-600 mb-3">{{ error }}</p>
        <button
          @click="fetchMyReservations"
          class="px-5 py-2 rounded-full border-[1.5px] border-[#465E8A] bg-transparent text-[#465E8A] font-mono text-sm cursor-pointer transition-all hover:bg-[#465E8A] hover:text-white"
        >
          Réessayer
        </button>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredReservations.length === 0" class="bg-white rounded-2xl border-2 border-[#465E8A]/10 p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mx-auto mb-4 text-[#465E8A]/25">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <p class="font-[roca] font-bold text-lg text-[#465E8A]/50 mb-1">
          {{ activeTab === 'all' ? 'Aucune réservation' : 'Rien ici' }}
        </p>
        <p class="font-mono text-xs text-[#465E8A]/35">
          {{ activeTab === 'all' ? 'Vos réservations apparaîtront ici.' : 'Aucune réservation avec ce statut.' }}
        </p>
      </div>

      <!-- Reservation grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="resa in filteredReservations"
          :key="resa.id"
          class="bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group border border-[#465E8A]/10"
        >
          <!-- Top colored bar based on status -->
          <div
            class="h-1"
            :class="{
              'bg-amber-400': resa.status === 'pending',
              'bg-emerald-400': resa.status === 'accepted',
              'bg-red-400': resa.status === 'declined',
            }"
          />

          <div class="p-5">
            <!-- Header: avatar + name + status badge -->
            <div class="flex items-center gap-3 mb-4">
              <UserAvatar :name="partnerName(resa)" size="md" />
              <div class="flex-1 min-w-0">
                <p class="font-[roca] font-bold text-sm text-[#465E8A] truncate">{{ partnerName(resa) }}</p>
                <p class="font-mono text-xs text-[#465E8A]/50">{{ formatDateLong(resa.date) }}</p>
              </div>
              <span
                class="shrink-0 px-2.5 py-1 rounded-full font-mono text-[0.65rem] font-bold"
                :class="{
                  'bg-amber-100 text-amber-700': resa.status === 'pending',
                  'bg-emerald-100 text-emerald-700': resa.status === 'accepted',
                  'bg-red-100 text-red-700': resa.status === 'declined',
                }"
              >
                {{ statusLabel(resa.status) }}
              </span>
            </div>

            <!-- Offer block -->
            <div class="bg-[#465E8A] rounded-xl p-4 mb-4">
              <h3 class="font-[roca] font-bold text-white text-base mb-2 leading-tight">{{ resa.title }}</h3>
              <div class="flex items-center gap-4 flex-wrap">
                <span class="flex items-center gap-1.5 font-mono text-xs text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {{ formatDate(resa.date) }}
                </span>
                <span class="flex items-center gap-1.5 font-mono text-xs text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ computeDuration(resa.date, resa.end_date) }}
                </span>
                <span class="flex items-center gap-1.5 font-mono text-xs text-[#B6FFD7] font-bold ml-auto">
                  {{ formatPrice(resa.price) }}
                </span>
              </div>
            </div>

            <!-- Actions: receiver can accept/decline -->
            <div v-if="resa.status === 'pending' && resa.creator_id !== currentUserId" class="grid grid-cols-2 gap-2.5">
              <button
                @click="handleDecline(resa.id)"
                :disabled="actionLoading === resa.id"
                class="py-2.5 rounded-full font-[roca] font-bold text-sm cursor-pointer transition-all border-[1.5px] border-[#465E8A]/15 bg-[#E4DBCB] text-[#465E8A] hover:bg-[#d9ceba] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Refuser
              </button>
              <button
                @click="handleAccept(resa.id)"
                :disabled="actionLoading === resa.id"
                class="py-2.5 rounded-full font-[roca] font-bold text-sm cursor-pointer transition-all border-none bg-[#465E8A] text-white hover:bg-[#3a4e6e] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Accepter
              </button>
            </div>

            <!-- Pending (sender) -->
            <div v-else-if="resa.status === 'pending' && resa.creator_id === currentUserId" class="text-center py-1">
              <span class="font-mono text-xs text-[#465E8A]/50">En attente de réponse…</span>
            </div>

            <!-- Conversation link -->
            <div v-else class="text-right">
              <NuxtLink
                v-if="resa.conversation_id"
                :to="`/messages/${resa.conversation_id}`"
                class="inline-flex items-center gap-1 font-mono text-xs text-[#465E8A]/50 no-underline transition-all hover:text-[#465E8A] hover:underline"
              >
                Voir la conversation
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Reservation } from '~/types'

definePageMeta({ middleware: 'auth' })

useSeoMeta({
  title: 'Mes réservations — Nomu',
  description: 'Suivez et gérez vos réservations d\'expériences sur Nomu.',
  robots: 'noindex, nofollow',
})

const { reservations, loading: resaLoading, error, fetchMyReservations, acceptReservation, declineReservation } = useReservations()
const { get } = useApi()
const initialLoading = ref(true)
const loading = computed(() => initialLoading.value || resaLoading.value)

const activeTab = ref<'all' | 'pending' | 'accepted' | 'declined'>('all')
const actionLoading = ref<number | null>(null)
const currentUserId = ref<number | null>(null)

const tabs = [
  { label: 'Toutes', value: 'all' as const },
  { label: 'En attente', value: 'pending' as const },
  { label: 'Acceptées', value: 'accepted' as const },
  { label: 'Refusées', value: 'declined' as const },
]

const filteredReservations = computed(() => {
  if (activeTab.value === 'all') return reservations.value
  return reservations.value.filter((r) => r.status === activeTab.value)
})

function countByStatus(status: string) {
  if (status === 'all') return reservations.value.length
  return reservations.value.filter((r) => r.status === status).length
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    pending: 'En attente',
    accepted: 'Acceptée',
    declined: 'Refusée',
  }
  return map[status] || status
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateLong(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(price: number | string) {
  const num = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(num)
}

function computeDuration(start: string, end: string) {
  const diffMs = new Date(end).getTime() - new Date(start).getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  const diffM = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (diffH >= 24) {
    const days = Math.floor(diffH / 24)
    return `${days}j${diffH % 24 > 0 ? ` ${diffH % 24}h` : ''}`
  }
  if (diffH > 0 && diffM > 0) return `${diffH}h${String(diffM).padStart(2, '0')}`
  if (diffH > 0) return `${diffH}h`
  return `${diffM}min`
}

function partnerName(resa: Reservation) {
  if (!resa.Conversation) return 'Inconnu'
  const conv = resa.Conversation
  if (currentUserId.value === conv.voyager_id) {
    return conv.Local?.name || 'Hôte'
  }
  return conv.Voyager?.name || 'Voyageur'
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
