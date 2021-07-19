export interface User {
  id: string
  name: string
}

export interface ChatUser {
  conversationId: string
  id: string
  is_owner: '1' | '0'
  lastseen: null
  status: null
  userid: string
}

export interface ChatConversation {
  conversation: {
    conversationId: string
    id: string
    is_owner: '1' | '0'
    lastseen: null | string
    name: null | string
    status: string
    type: string
    userid: string
  }
  users: ChatUser[]
}

export type ExistingConversation = { id: string, name: string, color: string }

export type SelectedConversation = ExistingConversation | null

export interface Message {
  conversationid: string
  id: string
  message: string
  senderId: string
  status: string
  timestamp: string
}