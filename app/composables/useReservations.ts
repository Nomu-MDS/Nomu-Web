import type { Reservation } from '~/types'

export function useReservations() {
  const { get, post, patch } = useApi()
  const reservations = ref<Reservation[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchMyReservations() {
    loading.value = true
    error.value = ''
    try {
      reservations.value = await get<Reservation[]>('/reservations/me')
    } catch (e: any) {
      error.value = e.message || 'Erreur lors du chargement des réservations'
      reservations.value = []
    } finally {
      loading.value = false
    }
  }

  async function createReservation(payload: {
    title: string
    conversation_id: number
    price: number
    date: string
    end_date: string
  }) {
    loading.value = true
    error.value = ''
    try {
      const newRes = await post<Reservation>('/reservations', payload)
      reservations.value.unshift(newRes)
      return { success: true, reservation: newRes }
    } catch (e: any) {
      error.value = e.message || 'Erreur lors de la création'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function acceptReservation(id: number) {
    loading.value = true
    error.value = ''
    try {
      const updated = await patch<Reservation>(`/reservations/${id}/accept`, {})
      const idx = reservations.value.findIndex((r) => r.id === id)
      if (idx >= 0) reservations.value[idx] = updated
      return { success: true }
    } catch (e: any) {
      error.value = e.message || 'Erreur lors de l\'acceptation'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function declineReservation(id: number) {
    loading.value = true
    error.value = ''
    try {
      const updated = await patch<Reservation>(`/reservations/${id}/decline`, {})
      const idx = reservations.value.findIndex((r) => r.id === id)
      if (idx >= 0) reservations.value[idx] = updated
      return { success: true }
    } catch (e: any) {
      error.value = e.message || 'Erreur lors du refus'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    reservations,
    loading,
    error,
    fetchMyReservations,
    createReservation,
    acceptReservation,
    declineReservation,
  }
}
