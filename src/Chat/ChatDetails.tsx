import { useEffect, useState } from "react"
import { fetchUsersAndLastSeen } from "../apis/bunqApi"
import { ChatConversation, ExistingConversation } from "../apis/model"
import { displayLastSeen, shouldTxtBeBlack } from "../utils"

interface Props {
  currentChat: ChatConversation
  selectedConversation: ExistingConversation
  setIsDetailsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatDetails: React.FC<Props> = ({ currentChat, selectedConversation, setIsDetailsExpanded }) => {
  const { name, color } = selectedConversation
  const { conversation, users } = currentChat
  const { conversationId } = conversation

  const [participantData, setParticipantData] = useState<{ id: string, name: string, lastseen: string }[]>([])

  useEffect(() => {
    fetchUsersAndLastSeen(users, conversationId)
      .then(result => setParticipantData(result))
  }, [users, conversationId])

  const txtShouldBeBlack = shouldTxtBeBlack(color)

  return (
    <div className='' style={{
      backgroundColor: color, 
    }}>
      <h1 className={txtShouldBeBlack ? 'black' : ''}>{name}</h1>
      <div className='group-details-list'>
        {
          participantData.map((user, index) => {
            const { name: userName, lastseen } = user
            return (
              <div className='group-details-item' key={index}>
                <div className='group-details-item-col1'>
                  <p className={txtShouldBeBlack ? 'black' : ''} style={{ fontWeight: 700 }}>{userName}</p>
                  {
                    lastseen &&
                    <p className={txtShouldBeBlack ? 'black' : ''}>{displayLastSeen(lastseen)}</p>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <button className='nav-btn left' onClick={() => setIsDetailsExpanded(false)}>
        <p className='black'>v</p>
      </button>
    </div >
  )
}

export default ChatDetails