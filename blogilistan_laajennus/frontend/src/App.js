import { Routes, Route } from 'react-router-dom'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import BlogDetails from './components/BlogDetails'
import FrontPage from './components/FrontPage'
import NavigationBar from './components/Navigation'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/users" element={<UsersPage />}></Route>
        <Route path="/users/:id" element={<UserPage />}></Route>
        <Route path="/blogs/:id" element={<BlogDetails />}></Route>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  )
}

export default App
