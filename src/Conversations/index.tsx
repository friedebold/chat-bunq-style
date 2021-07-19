
import { useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { ChatConversation, SelectedConversation, User } from '../apis/model';
import Contacts from '../Contacts';
import Header from '../Header';
import ConversationItem from './ConversationItem';
import './conversations.css';

interface Props {
  activeUser: User
  allUsers: User[]
  /*   setIsCreatingNewMessage: React.Dispatch<React.SetStateAction<boolean>> */
  conversations: ChatConversation[]
  selectedConversation: SelectedConversation
  setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation | null>>
  refreshConversations: () => void
  isConversationsRefreshing: boolean
}

const Conversations: React.FC<Props> = ({ activeUser, allUsers, conversations, selectedConversation, setSelectedConversation, refreshConversations, isConversationsRefreshing }) => {

  const conversationsLoaded = conversations.length > 0

  const [isCreatingNewMessage, setIsCreatingNewMessage] = useState<boolean>(false)

  if (!isCreatingNewMessage) return (
    <div className='page'>
      <Header {...{ activeUser }} />
      <div className='flex'>
        {
          !conversationsLoaded
            ? <div className='flex center'>
              <p >Loading...</p>
            </div>
            : <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  width={width}
                  rowHeight={50}
                  rowCount={conversations.length}
                  rowRenderer={(props) => <ConversationItem
                    {...{ props }}
                    {...{ activeUser }}
                    {...{ allUsers }}
                    {...{ conversations }}
                    {...{ selectedConversation }}
                    {...{ setSelectedConversation }}
                    key={props.key}
                  />}
                />
              )}
            </AutoSizer>
        }
      </div>
      <button className='refresh-btn' onClick={() => refreshConversations()}>
        <p className='black'>{!isConversationsRefreshing ? 'Refresh' : 'Loading...'}</p>
      </button>

      <button className='nav-btn right notRotated' onClick={() => setIsCreatingNewMessage(true)}>
        <p className='black'>+</p>
      </button>
    </div>
  )
  return <Contacts
    {...{ allUsers }}
    {...{ activeUser }}
    {...{ setIsCreatingNewMessage }}
    {...{ setSelectedConversation }}
    {...{ refreshConversations }}
  />
}

export default Conversations