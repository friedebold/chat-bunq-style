import React, { useEffect, useState } from 'react'
import { markConversationAsSeen } from '../apis/bunqApi'
import { ChatConversation, ExistingConversation, SelectedConversation, User } from '../apis/model'
import './chat.css'
import ChatDetails from './ChatDetails'
import ChatScreen from './ChatScreen'

interface Props {
  activeUser: User
  conversations: ChatConversation[]
  selectedConversation: ExistingConversation
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation>>
}
const Chat: React.FC<Props> = ({ activeUser, selectedConversation, setSelectedConversation, conversations }) => {
  const { id: conversationId } = selectedConversation
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)

  useEffect(() => {
    const markAsSeenListener = setInterval(async () => {
      markConversationAsSeen(conversationId, activeUser.id)
    }, 6000)
    return () => clearInterval(markAsSeenListener)
  }, [activeUser, conversationId])

  useEffect(() => {
    setIsDetailsExpanded(false)
  }, [selectedConversation])
  
  const currentChat: ChatConversation | undefined = conversations.find(e => e.conversation.conversationId === conversationId)

  return !currentChat ? <div className='flex center'><p>Loading...</p></div>
    : !isDetailsExpanded
      ? <ChatScreen
        {...{ activeUser }}
        {...{ currentChat }}
        {...{ selectedConversation }}
        {...{ setSelectedConversation }}
        {...{ setIsDetailsExpanded }}
      />
      : <ChatDetails
        {...{ currentChat }}
        {...{ selectedConversation }}
        {...{ setIsDetailsExpanded }}
      />
}

export default Chat