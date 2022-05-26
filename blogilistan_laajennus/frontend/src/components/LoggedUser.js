import userService from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
const LoggedUser = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
    userService.clearUser()
    const payload = { message: 'Good bye!', type: 'info' }
    dispatch(setNotificationMessage(payload))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    //notify('good bye!')
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
