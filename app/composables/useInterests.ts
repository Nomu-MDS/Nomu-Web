import type { Interest } from '~/types'

const interests = ref<Interest[]>([])
const loaded = ref(false)

export function useInterests() {
  const { get } = useApi()

  async function fetchInterests() {
    if (loaded.value) return
    try {
      interests.value = await get<Interest[]>('/interests')
      loaded.value = true
    } catch (e) {
      console.error('Failed to load interests:', e)
    }
  }

  return { interests, fetchInterests, loaded }
}
