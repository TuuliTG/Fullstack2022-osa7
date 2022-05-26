import userService from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
const LoggedUser = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(logoutUser())
    userService.clearUser()
    const payload = { message: 'Good bye!', type: 'info' }
    dispatch(setNotificationMessage(payload))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    navigate('/')
  }
  return (
    <div>
      <p>User {user.name} is logged in</p>
      <button className="m-2    " onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default LoggedUser
