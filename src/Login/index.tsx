import { useEffect, useState } from "react"
import { fetchUsers } from "../apis/bunqApi"
import { User } from "../apis/model"
import Rainbow from "../RainbowBackground"
import './login.css'

interface Props {
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>
  allUsers: User[]
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const Login: React.FC<Props> = ({ setActiveUser, setAllUsers, allUsers }) => {

  const greetMessage0 = 'Welcome'
  const greetMessage1 = 'Log in as'

  const [greeting, setGreeting] = useState<string>(greetMessage0)
  const [showGreeting, setShowGreeting] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      //Display 'Welcome' for 1500ms
      setShowGreeting(false)

      //Wait for transition to finish after 200ms
      setTimeout(() => {
        setGreeting(greetMessage1)
        setShowGreeting(true)

        fetchUsers()
          .then(users => setAllUsers(users))
          .catch(err => console.log(err))
      }, 200)
    }, 1500)
  }, [setAllUsers])

  return (
    <div className='login'>
      <Rainbow />
      <img className='logo-img' src={process.env.PUBLIC_URL + '/logo.png'} alt='logo' />
      <div className='login-container'>
        <h1 className={`greeter ${showGreeting && 'opacity1'}`}>{greeting}</h1>
        <div className={`login-user-wrapper ${allUsers.length !== 0 ? 'opacity1' : 'closed'}`}>
          {
            <div className='login-user-container'>
              {
                allUsers.map((user, index) => {
                  return (
                    <button className='login-user-btn' onClick={() => setActiveUser(user)} key={index}>
                      <p className='black'>{user.name}</p>
                    </button>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login