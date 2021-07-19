import React, { useEffect, useState } from "react"
import { fetchLastSeen } from "../apis/bunqApi"
import { ChatConversation, ExistingConversation, SelectedConversation, User } from "../apis/model"
import { displayLastSeen, shouldTxtBeBlack } from "../utils"
import './chat.css'

interface Props {
  activeUser: User
  currentChat: ChatConversation
  selectedConversation: ExistingConversation
  setSelectedConversation: React.Dispatch<React.SetStateAction<null | SelectedConversation>>
  setIsDetailsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatHeader: React.FC<Props> = ({ activeUser, currentChat, selectedConversation, setSelectedConversation, setIsDetailsExpanded }) => {
  const { name, color, id: conversationId } = selectedConversation

  const correspondent = currentChat.users.filter(e => e.userid !== activeUser.id)[0]
  const isGroup = currentChat.users.length > 2
  const showLastSeen = correspondent.lastseen && !isGroup
  const txtShouldBeBlack = shouldTxtBeBlack(color)

  const [lastSeen, setLastSeen] = useState<string | null>(null)


  useEffect(() => {
    const getLastSeen = async () => {
      fetchLastSeen(conversationId, correspondent.userid)
        .then(lastSeenTimestamp => setLastSeen(lastSeenTimestamp.lastseen))
        .catch(err => console.log(err))
    }
    getLastSeen()
    const lastSeenListener = setInterval(async () => {
      getLastSeen()
    }, 6000)

    return () => clearInterval(lastSeenListener)
  }, [conversationId, correspondent])

  return (
    <div className='chat-header' style={{ backgroundColor: color }}>
      <button className='nav-btn top left' onClick={() => setSelectedConversation(null)}>
        <p className={txtShouldBeBlack ? 'black' : ''}>v</p>
      </button>
      <h2 className={txtShouldBeBlack ? 'black' : ''}>{name + ' ' + conversationId}</h2> {/* //CHANGEEEEE */}
      {
        (showLastSeen && lastSeen) &&
        <p className={txtShouldBeBlack ? 'black' : ''}
          style={{ opacity: 0.5 }}
        >{displayLastSeen(lastSeen)}</p>
      }
      {
        isGroup &&
        <button className={`nav-btn top right ${txtShouldBeBlack ? 'black' : ''}`}
          onClick={() => setIsDetailsExpanded(true)}
        >
          <p className={txtShouldBeBlack ? 'black' : ''}>?</p>
        </button>
      }
    </div>

  )
}

export default ChatHeader