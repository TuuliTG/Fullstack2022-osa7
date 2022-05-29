import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedUser from './LoggedUser'
import userService from '../services/user'

const UserPage = () => {
  const userId = useParams().id
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getUserById = async (id) => {
      let res = await userService.getUserById(userId)
      setUser(res)
      setBlogs(res.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>))
    }
    getUserById(userId)
  }, [])

  return (
    <div className="container">
      {user !== null ? (
        <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          <ul>{blogs}</ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserPage
