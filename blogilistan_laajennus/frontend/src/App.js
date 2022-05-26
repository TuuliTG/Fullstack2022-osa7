import { Routes, Route } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import BlogDetails from './components/BlogDetails'
import FrontPage from './components/FrontPage'
import userService from './services/user'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from './reducers/userReducer'
import { useEffect } from 'react'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setLoggedUser(userFromStorage))
    }
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersPage />}></Route>
        <Route path="/users/:id" element={<UserPage />}></Route>
        <Route path="/blogs/:id" element={<BlogDetails />}></Route>
        <Route path="/" element={<FrontPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
