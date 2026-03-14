<template>
  <div class="flex items-center justify-center h-full">
    <div v-if="redirecting" class="w-full max-w-sm mx-auto px-6 py-8 space-y-4">
      <div v-for="i in 3" :key="i" class="flex items-end gap-2" :class="i % 2 === 0 ? 'justify-end' : ''">
        <USkeleton v-if="i % 2 !== 0" class="h-8 w-8 rounded-full shrink-0" />
        <USkeleton class="h-12 rounded-2xl" :class="i % 2 === 0 ? 'w-40 rounded-br-sm' : 'w-52 rounded-bl-sm'" />
      </div>
    </div>
    <div v-else class="text-center text-[#465E8A]/50 px-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-4 opacity-50">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
      <p class="font-[roca] font-bold text-xl mb-1">Vos messages</p>
      <p class="font-mono text-sm">Aucune conversation pour le moment.</p>
      <NuxtLink to="/explore" class="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#465E8A] text-white font-[roca] font-bold text-sm no-underline transition-colors hover:bg-[#3a4666]">
        Explorer
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Conversation } from '~/types'

const router = useRouter()
const route = useRoute()
const conversations = inject<Ref<Conversation[]>>('messagesConversations', ref([]))
const redirecting = ref(true)

function getLastMessageTime(conv: Conversation): number {
  const msgs = conv.Messages
  if (!msgs?.length) return 0
  return new Date(msgs[msgs.length - 1].createdAt).getTime()
}

function tryRedirect() {
  // Guard : ne rediriger que si on est encore sur /messages
  if (route.path !== '/messages') return false
  if (conversations.value.length > 0) {
    const sorted = [...conversations.value].sort((a, b) => getLastMessageTime(b) - getLastMessageTime(a))
    router.replace(`/messages/${sorted[0].id}`)
    return true
  }
  return false
}

watch(conversations, (val) => {
  if (val.length > 0) tryRedirect()
}, { immediate: true })

// Afficher l'état vide après timeout si toujours aucune conversation
let redirectTimer: ReturnType<typeof setTimeout> | null = null
onMounted(() => {
  redirectTimer = setTimeout(() => {
    if (!tryRedirect()) redirecting.value = false
  }, 3000)
})
onBeforeUnmount(() => {
  if (redirectTimer) clearTimeout(redirectTimer)
})
</script>
