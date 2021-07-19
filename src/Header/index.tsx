import { User } from '../apis/model'
import Rainbow from '../RainbowBackground'
import './header.css'

interface Props {
  activeUser: User
}

const Header: React.FC<Props> = ({ activeUser }) => {
  const { name } = activeUser
  return (
    <header>
      <Rainbow />
      <div className='header-container'>
        <h1>Hello, {name}</h1>
      </div>
    </header>
  )
}

export default Header