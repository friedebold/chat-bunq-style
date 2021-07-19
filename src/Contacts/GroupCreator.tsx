
import React, { useState } from 'react'
import { rainbowColors } from '../apis/constants'
import './contacts.css'

interface Props {
  setIsCreatingGroupName: React.Dispatch<React.SetStateAction<boolean>>
  saveGroupConversation: (groupName: string) => void
}

const GroupCreator: React.FC<Props> = ({ setIsCreatingGroupName, saveGroupConversation }) => {
  const [groupName, setGroupName] = useState<string>('')

  return (
    <div className='page' style={{ backgroundColor: rainbowColors[0] }}>
      <textarea className='group-name-input'
        value={groupName}
        placeholder={'Enter group name here'}
        onChange={(e) => setGroupName(e.target.value)} />

      <button className='nav-btn left' onClick={() => setIsCreatingGroupName(false)}>
        <p className='black'>v</p>
      </button>
      {
        groupName &&
        <button className='nav-btn right' onClick={() => saveGroupConversation(groupName)}>
          <p className='black'>v</p>
        </button>
      }
    </div >
  )
}

export default GroupCreator
