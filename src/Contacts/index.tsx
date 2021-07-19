
import React, { useState } from 'react'
import { createGroupConversation, createPersonalConversation } from '../apis/bunqApi'
import { rainbowColors } from '../apis/constants'
import { SelectedConversation, User } from '../apis/model'
import ContactList from './ContactList'
import './contacts.css'
import GroupCreator from './GroupCreator'

interface Props {
  allUsers: User[]
  activeUser: User
  setIsCreatingNewMessage: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation>>
  refreshConversations: () => void
}

const Contacts: React.FC<Props> = ({
  activeUser,
  allUsers,
  setIsCreatingNewMessage,
  setSelectedConversation,
  refreshConversations,
}) => {

  const [receiver, setReceiver] = useState<string[]>([])
  const [isCreatingGroupName, setIsCreatingGroupName] = useState<boolean>(false)

  const saveReceiver = () => {
    //Personal Conversation
    if (receiver.length === 1) {
      const receiverName = allUsers.find(e => e.id === receiver[0])!.name
      createPersonalConversation(receiver.toString(), activeUser.id)
        .then((conversationId) => {
          setIsCreatingNewMessage(false)
          setSelectedConversation({ id: conversationId, name: receiverName, color: rainbowColors[0] })
          refreshConversations()
        })
    }
    //Initialize Group Creator
    else setIsCreatingGroupName(true)
  }

  const saveGroupConversation = (groupName: string) => {
    createGroupConversation(receiver.toString(), activeUser.id, groupName.trim())
      .then((conversationId) => {
        setIsCreatingNewMessage(false)
        setIsCreatingGroupName(false)
        setSelectedConversation({ id: conversationId, name: groupName, color: rainbowColors[0] })
        refreshConversations()
      })
  }

  if (!isCreatingGroupName) return <ContactList
    {...{ activeUser }}
    {...{ allUsers }}
    {...{ receiver }}
    {...{ setReceiver }}
    {...{ setIsCreatingNewMessage }}
    {...{ saveReceiver }}
  />
  return <GroupCreator {...{ setIsCreatingGroupName }} {...{ saveGroupConversation }} />
}

export default Contacts