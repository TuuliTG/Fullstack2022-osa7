import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import Blog from '../components/Blog'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import { setAllBlogs, addBlog } from '../reducers/blogReducer'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const FrontPage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
  const navigate = useNavigate()

  useEffect(() => {
    const getBlogs = async () => {
      let res = await blogService.getAll()
      res = res.sort(byLikes)
      dispatch(setAllBlogs(res))
    }
    getBlogs()
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }, [])
  const notify = (message, type = 'info') => {
    const payload = { message: message, type: type }
    dispatch(setNotificationMessage(payload))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
  const createBlog = async (blog) => {
    blogService
      .create(blog, user.token)
      .then((createdBlog) => {
        notify(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`)
        dispatch(addBlog(createdBlog))
        blogFormRef.current.toggleVisibility()
        //window.location.reload(false)
      })
      .catch((error) => {
        notify('creating a blog failed: ' + error.response.data.error, 'alert')
      })
  }

  if (user === null) {
    navigate('/login')
  }

  return (
    <div className="container">
      <Notification />

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FrontPage
