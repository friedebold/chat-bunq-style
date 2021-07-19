import React, { useState } from 'react';
import { User } from './apis/model';
import './App.css';
import Login from './Login';
import ResponsiveAppContainer from './ResponsiveAppContainer';

const App: React.FC = () => {

  const [allUsers, setAllUsers] = useState<User[]>([])

  const [activeUser, setActiveUser] = useState<User | null>(null)

  if (!activeUser) return <Login {...{ setActiveUser }} {...{ allUsers }} {...{ setAllUsers }} />
  return <ResponsiveAppContainer  {...{ activeUser }} {...{ allUsers }} />
  /* 
   {...{ conversations }}
   {...{ selectedConversation }}
   {...{ setSelectedConversation }}
   {...{ refreshConversations }}
   {...{ isConversationsRefreshing }} */
}

export default App;