export interface Interest {
  id: number
  name: string
  icon: string | null
  is_active: boolean
}

export interface UserProfile {
  id: number
  first_name: string | null
  last_name: string | null
  age: number | null
  biography: string | null
  country: string | null
  city: string | null
  image_url: string | null
  is_searchable: boolean
  Interests: Interest[]
  createdAt: string
  updatedAt: string
  user_id: number
}

export interface MeResponse {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
  bio: string | null
  location: string | null
  createdAt: string
  updatedAt: string
  Profiles: UserProfile[]
}

export interface ProfileDetail {
  id: number
  first_name: string | null
  last_name: string | null
  age: number | null
  biography: string | null
  country: string | null
  city: string | null
  image_url: string | null
  // Sequelize peut retourner les deux casings selon l'endpoint
  interests?: { id: number; name: string }[]
  Interests?: { id: number; name: string; icon?: string | null }[]
}

export interface SearchHit {
  id: number
  user_id: number
  name: string
  location: string | null
  bio: string | null
  biography: string | null
  country: string | null
  city: string | null
  image_url: string | null
  interests: string
}

export interface ConversationUser {
  id: number
  name: string
  email: string
}

export interface Message {
  id: number
  user_id: number
  conversation_id: number
  content: string
  attachment: string | null
  read: boolean
  createdAt: string
  Sender: ConversationUser
}

export interface Conversation {
  id: number
  voyager_id: number
  local_id: number
  createdAt: string
  updatedAt: string
  Voyager: ConversationUser
  Local: ConversationUser
  Messages: Message[]
}

export interface ProfileEditPayload {
  name?: string
  bio?: string
  location?: string
  first_name?: string
  last_name?: string
  age?: number | null
  biography?: string
  country?: string
  city?: string
  image_url?: string
  is_searchable?: boolean
  interest_ids?: number[]
}

export interface Reservation {
  id: number
  title: string
  status: 'pending' | 'accepted' | 'declined'
  creator_id: number
  conversation_id: number
  price: number
  date: string
  end_date: string
  createdAt: string
  updatedAt: string
  Conversation?: Conversation
}
