import Notification from '../components/Notification'
import LoggedUser from '../components/LoggedUser'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import NewBlogForm from '../components/NewBlogForm'
import Blog from '../components/Blog'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import userService from '../services/user'
import loginService from '../services/login'
import { setAllBlogs, addBlog } from '../reducers/blogReducer'
import { loginUser } from '../reducers/userReducer'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
const FrontPage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
  useEffect(() => {
    const getBlogs = async () => {
      let res = await blogService.getAll()
      res = res.sort(byLikes)
      dispatch(setAllBlogs(res))
    }
    getBlogs()
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password
      })
      .then((user) => {
        dispatch(loginUser(user))
        userService.setUser(user)
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const createBlog = async (blog) => {
    blogService
      .create(blog)
      .then((createdBlog) => {
        notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
        dispatch(addBlog(createdBlog))
        blogFormRef.current.toggleVisibility()
        window.location.reload(false)
      })
      .catch((error) => {
        notify('creating a blog failed: ' + error.response.data.error, 'alert')
      })
  }
  const notify = (message, type = 'info') => {
    const payload = { message: message, type: type }
    dispatch(setNotificationMessage(payload))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  }
  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <div>
      <h2>Blogs App</h2>

      <Notification />

      <LoggedUser />

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default FrontPage
