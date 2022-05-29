import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

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
    <div className="container">
      <Notification />
      <h2 className="center">Log in to application</h2>

      <Form className="center" onSubmit={handleSubmit}>
        <div>
          <Form.Control
            type="text"
            className="m-2"
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"></Form.Control>
        </div>
        <div>
          <Form.Control
            type="password"
            className="m-2"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <Button id="login-button" className="m-2" type="submit" variant="primary">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
