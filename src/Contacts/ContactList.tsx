
import { SetStateAction } from 'react'
import { User } from '../apis/model'
import Header from '../Header'
import { sortStringsAlphabetically } from '../utils'
import ContactItem from './ContactItem'
import './contacts.css'

interface Props {
  activeUser: User
  allUsers: User[]
  receiver: string[]
  setReceiver: React.Dispatch<SetStateAction<string[]>>
  setIsCreatingNewMessage: React.Dispatch<SetStateAction<boolean>>
  saveReceiver: () => void
}

const ContactList: React.FC<Props> = ({ activeUser, allUsers, receiver, setReceiver, setIsCreatingNewMessage, saveReceiver }) => {

  //Remove activeUser from users list
  const filteredContactList = allUsers.filter(e => e.id !== activeUser.id)

  return (
    <div className='page'>
      <Header {...{ activeUser }} />
      <h2 className='contacts-title'>Send message to</h2>
      <div className='contact-list'>
        {
          filteredContactList.sort(sortStringsAlphabetically).map((user, index) => {
            return <ContactItem {...{ user }} {...{ index }} {...{ receiver }} {...{ setReceiver }} key={index} />
          })
        }
      </div>
      <button className='nav-btn left' onClick={() => setIsCreatingNewMessage(false)}>
        <p className='black'>v</p>
      </button>
      {
        receiver.length > 0 &&
        <button className='nav-btn right' onClick={() => saveReceiver()}>
          <p className='black'>v</p>
        </button>
      }
    </div >
  )
}
export default ContactList