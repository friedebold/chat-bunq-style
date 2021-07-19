import moment from "moment"
import { ExistingConversation, Message, User } from "../apis/model"


interface Props {
  message: Message
  activeUser: User
  selectedConversation: ExistingConversation
}

const ChatMessage: React.FC<Props> = ({ activeUser, message, selectedConversation }) => {
  const activeUserIsSender = message.senderId === activeUser.id

  return (
    <div className='chat-message'
      style={{ alignSelf: activeUserIsSender ? 'flex-end' : 'flex-start' }}
    >
      {
        !activeUserIsSender &&
        <div className='chat-message-overlay' style={{
          backgroundColor: selectedConversation.color,
        }} />
      }
      <p className='black' style={{ zIndex: 2, position: 'relative' }}>{message.message}</p>
      <p className='black message-timestamp'>{moment(message.timestamp).format('LT')}</p>
    </div>
  )
}


export default ChatMessage