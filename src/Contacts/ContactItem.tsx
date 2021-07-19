
import { rainbowColors } from '../apis/constants'
import { User } from '../apis/model'
import { shouldTxtBeBlack } from '../utils'
import './contacts.css'

interface Props {
  user: User
  index: number
  receiver: string[]
  setReceiver: React.Dispatch<React.SetStateAction<string[]>>
}

const ContactItem: React.FC<Props> = ({ user, index, receiver, setReceiver }) => {
  const { id: userId, name } = user
  const isReceiverSelected = receiver.includes(userId)
  const color = isReceiverSelected ? rainbowColors[index % 12] : undefined

  const toggleReceiverSelection = () => {
    if (!isReceiverSelected) setReceiver([...receiver, userId])
    else setReceiver(receiver.filter(e => e !== userId))
  }

  return (
    <button className='list-item'
      onClick={() => toggleReceiverSelection()}
      style={{ backgroundColor: color }}>
      <h3 className={`${color && shouldTxtBeBlack(color) && 'black'}`}>{name}</h3>
    </button>
  )
}

export default ContactItem