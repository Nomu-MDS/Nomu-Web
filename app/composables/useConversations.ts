import type { Conversation, Message, ConversationUser } from '~/types'

export function useConversations() {
  const { get } = useApi()
  const conversations = ref<Conversation[]>([])
  const loading = ref(true)
  const error = ref('')

  async function fetchConversations() {
    loading.value = true
    error.value = ''
    try {
      const data = await get<{ conversations: Conversation[] }>('/conversations')
      conversations.value = data.conversations || []
    } catch {
      error.value = 'Impossible de charger les conversations.'
    } finally {
      loading.value = false
    }
  }

  function getOtherUser(conversation: Conversation, myUserId: number): ConversationUser {
    return conversation.voyager_id === myUserId ? conversation.Local : conversation.Voyager
  }

  function getLastMessage(conversation: Conversation): Message | null {
    if (!conversation.Messages?.length) return null
    return conversation.Messages[conversation.Messages.length - 1]
  }

  function getUnreadCount(conversation: Conversation, myUserId: number): number {
    if (!conversation.Messages) return 0
    return conversation.Messages.filter(m => !m.read && m.user_id !== myUserId).length
  }

  return { conversations, loading, error, fetchConversations, getOtherUser, getLastMessage, getUnreadCount }
}
