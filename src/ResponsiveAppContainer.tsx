import React, { useEffect, useState } from 'react';
import { fetchConversations } from './apis/bunqApi';
import { ChatConversation, SelectedConversation, User } from './apis/model';
import './App.css';
import Chat from './Chat';
import Conversations from './Conversations';

interface Props {
  activeUser: User
  allUsers: User[]
}

const ResponsiveAppContainer: React.FC<Props> = ({ activeUser, allUsers }) => {

  //Handle responsiveness
  const handleWindowWidth = () => {
    if (window.innerWidth < 600) return false
    else return true
  }
  const [isExpanded, setIsExpanded] = useState(handleWindowWidth())
  useEffect(() => {
    const handleResize = () => setIsExpanded(handleWindowWidth())
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation>(null)
  const [conversations, setConversations] = useState<ChatConversation[]>([])
  const [isConversationsRefreshing, setIsConversationsRefreshing] = useState<boolean>(false)

  useEffect(() => {
    if (activeUser) {
      fetchConversations(activeUser.id)
        .then((result: ChatConversation[]) => {
          setConversations(result.sort((a: ChatConversation, b: ChatConversation) => {
            return Number(b.conversation.conversationId) - Number(a.conversation.conversationId)
          }))
        })
    }
  }, [activeUser])

  const refreshConversations = () => {
    if (activeUser) {
      setIsConversationsRefreshing(true)
      fetchConversations(activeUser.id)
        .then((result) => {
          setConversations(result.sort((a: ChatConversation, b: ChatConversation) => {
            return Number(b.conversation.conversationId) - Number(a.conversation.conversationId)
          }))
          setIsConversationsRefreshing(false)
        })
    }
  }

  if (!activeUser) return <></>
  if (isExpanded) return (
    <div className='flex' >
      <Conversations
        {...{ activeUser }}
        {...{ allUsers }}
        {...{ conversations }}
        {...{ selectedConversation }}
        {...{ setSelectedConversation }}
        {...{ refreshConversations }}
        {...{ isConversationsRefreshing }}
      />
      {
        selectedConversation ?
          <div className='flex' >
            <Chat
              {...{ activeUser }}
              {...{ selectedConversation }}
              {...{ setSelectedConversation }}
              {...{ conversations }}
            />
          </div>
          :
          <div className='flex center'>
            <p className='selectConversation-txt'>Select a conversation</p>
          </div>
      }
    </div>
  )
  return !selectedConversation
    ? <Conversations
      {...{ activeUser }}
      {...{ allUsers }}
      {...{ conversations }}
      {...{ selectedConversation }}
      {...{ setSelectedConversation }}
      {...{ refreshConversations }}
      {...{ isConversationsRefreshing }}
    />
    : <Chat
      {...{ activeUser }}
      {...{ selectedConversation }}
      {...{ setSelectedConversation }}
      {...{ conversations }}
    />
}

export default ResponsiveAppContainer