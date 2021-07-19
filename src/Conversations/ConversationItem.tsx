
import { CSSProperties } from 'react';
import { ListRowProps } from 'react-virtualized';
import { rainbowColors } from '../apis/constants';
import { ChatConversation, SelectedConversation, User } from '../apis/model';
import { shouldTxtBeBlack } from '../utils';

interface Props {
  props: ListRowProps
  activeUser: User
  allUsers: User[]
  conversations: ChatConversation[]
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation>>
  selectedConversation: SelectedConversation

}

const ConversationItem: React.FC<Props> = ({ props, activeUser, allUsers, conversations, setSelectedConversation, selectedConversation }) => {
  const { index, style } = props
  const { conversation, users } = conversations[index]
  const { name: conversationName, conversationId } = conversation

  const isReceiverListValid = () => {
    for (let i = 0; i < users.length; i++) {
      let receiverIdFound = allUsers.find(user => user.id === users[i].userid)
      if (!receiverIdFound) return false
    }
    return true
  }

  const determineChatType = () => {
    const receiverList = users.filter(e => e.userid !== activeUser.id)
    const receiverListValid = isReceiverListValid()
    if (!receiverListValid || receiverList.length === 0) return { chatType: 'invalidChat', receiverList }
    if (receiverList.length === 1) return { chatType: 'personalChat', receiverList }
    return { chatType: 'groupChat', receiverList }
  }

  const determineDisplayedName = () => {
    const { chatType, receiverList } = determineChatType()
    if (chatType === 'invalidChat') return 'Invalid Chat'
    if (chatType === 'personalChat') {
      const personalChatReceiverName = allUsers.find(user => user.id === receiverList[0].userid)?.name
      if (!personalChatReceiverName) return 'Noname User'
      return personalChatReceiverName
    }
    if (!conversationName) return 'Noname Group'
    return conversationName
  }

  const displayedName = determineDisplayedName()

  const isSelected = selectedConversation && selectedConversation.id === conversationId
  const backgroundColorIfSelected = rainbowColors[index % 12]
  const txtShouldBeBlack = isSelected && shouldTxtBeBlack(backgroundColorIfSelected)

  //Causes debug logging to fire due to original style being modified
  const updatingStyle: CSSProperties = {
    ...style,
    backgroundColor: isSelected ? backgroundColorIfSelected : undefined
  }
  return (
    <button className='list-item'
      style={updatingStyle}
      onClick={() => {
        if (determineChatType().chatType !== 'invalidChat' && !isSelected) {
          setSelectedConversation({ id: conversationId, name: displayedName, color: backgroundColorIfSelected })
        }
      }}
    >
      <p className={txtShouldBeBlack ? 'black' : ''}> {displayedName}</p>
    </button >
  )
}

export default ConversationItem