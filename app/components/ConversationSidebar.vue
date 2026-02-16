<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Messages</h2>
    </div>

    <!-- Loading skeletons -->
    <div v-if="loading" class="sidebar-list">
      <div v-for="i in 6" :key="i" class="sidebar-item" style="pointer-events:none;">
        <USkeleton class="h-10 w-10 rounded-full shrink-0" />
        <div class="sidebar-item-content space-y-1.5">
          <div class="flex items-baseline justify-between">
            <USkeleton class="h-3.5 w-24" />
            <USkeleton class="h-2.5 w-8" />
          </div>
          <USkeleton class="h-3 w-36" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="sidebar-status--error">
      <span>{{ error }}</span>
    </div>

    <!-- Empty -->
    <div v-else-if="!conversations.length" class="sidebar-empty">
      <p class="sidebar-empty-title">Aucune conversation</p>
      <p class="sidebar-empty-text">Contactez quelqu'un depuis l'explorer.</p>
      <NuxtLink to="/explore" class="sidebar-explore-btn">Explorer</NuxtLink>
    </div>

    <!-- Conversation list -->
    <div v-else class="sidebar-list">
      <NuxtLink
        v-for="conv in sortedConversations"
        :key="conv.id"
        :to="`/messages/${conv.id}`"
        :class="['sidebar-item', { 'sidebar-item--active': activeId === conv.id }]"
      >
        <UserAvatar :name="getOtherUser(conv, myUserId).name" size="md" />
        <div class="sidebar-item-content">
          <div class="sidebar-item-top">
            <span class="sidebar-item-name">{{ getOtherUser(conv, myUserId).name }}</span>
            <span v-if="getLastMessage(conv)" class="sidebar-item-time">
              {{ formatRelativeTime(getLastMessage(conv)!.createdAt) }}
            </span>
          </div>
          <div class="sidebar-item-bottom">
            <span class="sidebar-item-preview">
              <template v-if="getLastMessage(conv)">
                <span v-if="getLastMessage(conv)!.user_id === myUserId" class="sidebar-item-you">Vous : </span>
                <span v-if="getLastMessage(conv)!.attachment">📷 Photo</span>
                <span v-else>{{ getLastMessage(conv)!.content }}</span>
              </template>
              <span v-else class="sidebar-item-preview--empty">Nouvelle conversation</span>
            </span>
            <span v-if="getUnreadCount(conv, myUserId) > 0" class="sidebar-item-unread">
              {{ getUnreadCount(conv, myUserId) }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Conversation, ConversationUser, Message } from '~/types'

const props = defineProps<{
  conversations: Conversation[]
  myUserId: number
  loading: boolean
  error: string
  activeId?: number
}>()

function getOtherUser(conv: Conversation, myId: number): ConversationUser {
  return conv.voyager_id === myId ? conv.Local : conv.Voyager
}

function getLastMessage(conv: Conversation): Message | null {
  if (!conv.Messages?.length) return null
  return conv.Messages[conv.Messages.length - 1]
}

function getUnreadCount(conv: Conversation, myId: number): number {
  if (!conv.Messages) return 0
  return conv.Messages.filter(m => !m.read && m.user_id !== myId).length
}

const sortedConversations = computed(() => {
  return [...props.conversations].sort((a, b) => {
    const aMsg = getLastMessage(a)
    const bMsg = getLastMessage(b)
    if (!aMsg && !bMsg) return 0
    if (!aMsg) return 1
    if (!bMsg) return -1
    return new Date(bMsg.createdAt).getTime() - new Date(aMsg.createdAt).getTime()
  })
})

function formatRelativeTime(iso: string): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return 'maintenant'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `${Math.floor(diff / 86400)}j`
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid rgba(70, 94, 138, 0.1);
}
.sidebar-header {
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid rgba(70, 94, 138, 0.08);
  flex-shrink: 0;
}
.sidebar-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  color: #465E8A;
  margin: 0;
}
.sidebar-status--error {
  padding: 2rem 1.25rem;
  text-align: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #c53030;
}
.sidebar-empty {
  padding: 2rem 1.25rem;
  text-align: center;
}
.sidebar-empty-title {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #465E8A;
  margin: 0 0 0.35rem;
}
.sidebar-empty-text {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: #465E8A;
  opacity: 0.6;
  margin: 0 0 1rem;
}
.sidebar-explore-btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  background: #465E8A;
  color: #fff;
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s;
}
.sidebar-explore-btn:hover {
  background: #3a4666;
}
.sidebar-list {
  flex: 1;
  overflow-y: auto;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  text-decoration: none;
  border-bottom: 1px solid rgba(70, 94, 138, 0.05);
  transition: background 0.15s;
  cursor: pointer;
}
.sidebar-item:hover {
  background: rgba(70, 94, 138, 0.04);
}
.sidebar-item--active {
  background: rgba(70, 94, 138, 0.08);
}
.sidebar-item-content {
  flex: 1;
  min-width: 0;
}
.sidebar-item-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.15rem;
}
.sidebar-item-name {
  font-family: 'roca', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  color: #465E8A;
}
.sidebar-item-time {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  color: #465E8A;
  opacity: 0.45;
  flex-shrink: 0;
}
.sidebar-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.sidebar-item-preview {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #465E8A;
  opacity: 0.55;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}
.sidebar-item-preview--empty {
  font-style: italic;
}
.sidebar-item-you {
  font-weight: 700;
  opacity: 0.75;
}
.sidebar-item-unread {
  background: #B6FFD7;
  color: #465E8A;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  flex-shrink: 0;
}
</style>
