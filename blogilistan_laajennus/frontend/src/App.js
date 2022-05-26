import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import { setNotificationMessage, resetNotification } from './reducers/notificationReducer'
import { addBlog, setAllBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, setLoggedUser } from './reducers/userReducer'
import UsersPage from './components/UsersPage'
import LoggedUser from './components/LoggedUser'
const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const getBlogs = async () => {
      let res = await blogService.getAll()
      res = res.sort(byLikes)
      dispatch(setAllBlogs(res))
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(setLoggedUser(userFromStorage))
    }
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

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes)
      dispatch(setAllBlogs(updatedBlogs))
    })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id
    }

    blogService.update(liked.id, liked).then((updatedBlog) => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b)).sort(byLikes)
      dispatch(setAllBlogs(updatedBlogs))
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

  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersPage />}></Route>
        <Route
          path="/"
          element={
            <div>
              <h2>Blogs App</h2>

              <Notification />

              <LoggedUser />

              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <NewBlogForm onCreate={createBlog} />
              </Togglable>

              <div id="blogs">
                {blogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    likeBlog={likeBlog}
                    removeBlog={removeBlog}
                    user={user}
                  />
                ))}
              </div>
            </div>
          }></Route>
      </Routes>
    </div>
  )
}

export default App
