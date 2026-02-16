import { io, type Socket } from 'socket.io-client'

let socket: Socket | null = null

export function useSocket() {
  const config = useRuntimeConfig()
  const socketUrl = (config.public.socketUrl as string || 'http://localhost:3001').replace(/\/$/, '')
  const { getToken } = useAuth()

  function connect(): Socket {
    if (socket?.connected) return socket

    const token = getToken()
    if (!token) throw new Error('No auth token')

    socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message)
    })

    socket.on('error', (data: { message: string }) => {
      console.error('Socket error:', data.message)
    })

    return socket
  }

  function disconnect() {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  }

  function getSocketInstance(): Socket | null {
    return socket
  }

  function joinConversation(conversationId: number) {
    socket?.emit('join_conversation', { conversation_id: conversationId })
  }

  function leaveConversation(conversationId: number) {
    socket?.emit('leave_conversation', { conversation_id: conversationId })
  }

  function sendMessage(conversationId: number, content: string, attachment?: string) {
    socket?.emit('send_message', {
      conversation_id: conversationId,
      content,
      attachment: attachment || undefined,
    })
  }

  function emitTyping(conversationId: number, isTyping: boolean) {
    socket?.emit('typing', { conversation_id: conversationId, isTyping })
  }

  function markMessageRead(messageId: number) {
    socket?.emit('message_read', { message_id: messageId })
  }

  return {
    connect,
    disconnect,
    getSocketInstance,
    joinConversation,
    leaveConversation,
    sendMessage,
    emitTyping,
    markMessageRead,
  }
}
