import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
  }

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password
      })
      .then((user) => {
        dispatch(loginUser(user))
        userService.setUser(user)
        const payload = { message: `${user.name} logged in!`, type: 'info' }
        dispatch(setNotificationMessage(payload))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
        navigate('/')
      })
      .catch(() => {
        //notify('wrong username/password', 'alert')
        const payload = { message: 'wrong username/password', type: 'alert' }
        dispatch(setNotificationMessage(payload))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
      })
  }

  return (
    <div>
      <Notification />
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
