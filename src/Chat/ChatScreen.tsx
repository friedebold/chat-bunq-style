import React, { useEffect, useState } from "react"
import { fetchNewMessages, getLast100Messages, sendMessage } from "../apis/bunqApi"
import { ChatConversation, ExistingConversation, Message, SelectedConversation, User } from "../apis/model"
import './chat.css'
import ChatHeader from "./ChatHeader"
import ChatMessage from "./ChatMessage"

interface Props {
  activeUser: User
  currentChat: ChatConversation
  selectedConversation: ExistingConversation
  setSelectedConversation: React.Dispatch<React.SetStateAction<null | SelectedConversation>>
  setIsDetailsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatScreen: React.FC<Props> = ({ activeUser, currentChat, selectedConversation, setSelectedConversation, setIsDetailsExpanded }) => {
  const { conversationId } = currentChat.conversation
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [isNoNewMessages, setIsNoNewMessages] = useState(false)

  useEffect(() => {
    const displayNoNewMessages = setTimeout(() => {
      if (isNoNewMessages) setIsNoNewMessages(false)
    }, 2000)
    return () => clearTimeout(displayNoNewMessages)
  }, [isNoNewMessages])

  const sortMessagesById = (messages: Message[]) => {
    return messages.sort((a, b) => Number(b.id) - Number(a.id))
  }

  const getLastMessageId = () => {
    const lastMessage: undefined | Message = sortMessagesById(chatMessages)[0]
    if (lastMessage) return Number(lastMessage.id)
    return 0
  }
  const saveNewMessages = () => {
    fetchNewMessages(conversationId, getLastMessageId().toString())
      .then((newMessages: Message[] | { message: "No new messages" }) => {
        console.log(newMessages)
        if (!Array.isArray(newMessages)) return setIsNoNewMessages(true)
        setChatMessages([...newMessages, ...chatMessages])
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getLast100Messages(conversationId, 0)
      .then(response => {
        setChatMessages(response)
      })
  }, [conversationId, setChatMessages,])

  const sendMessagePostRequest = () => {
    setMessageInput('')
    if (messageInput.trim() === '') return
    sendMessage(conversationId, activeUser.id, messageInput)
      .then(() => saveNewMessages())
  }
  return (
    <div className='chat-page flex'>
      <ChatHeader
        {...{ activeUser }}
        {...{ currentChat }}
        {...{ selectedConversation }}
        {...{ setSelectedConversation }}
        {...{ setIsDetailsExpanded }}
      />
      <div className='chat-window'>
        {
          chatMessages &&
          sortMessagesById(chatMessages).map((message: Message, index) => {
            return <ChatMessage {...{ message }} {...{ activeUser }} {...{ selectedConversation }} key={index} />
          })
        }
      </div>
      <div className='seperator' />
      <button onClick={() => saveNewMessages()}>
        <p>{isNoNewMessages ? 'No new messages' : 'Load new messages'}</p>
      </button>
      <div className='chat-input-container'>
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder='Type a message'
        />
        <button className='send-btn' onClick={() => sendMessagePostRequest()}>
          <p className='send-btn-txt black'>v</p>
        </button>
      </div>
    </div>
  )
}

export default ChatScreen