import blogService from '../services/blogs'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { Button } from 'react-bootstrap'
import CommentForm from './CommentForm'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState([])
  const [showCommentForm, setShowCommentForm] = useState(false)
  const addedBy = blog && blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const blogId = useParams().id
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const getBlogById = async () => {
      let res = await blogService.getById(blogId)

      setBlog(res)
      setLikes(res.likes)
      setComments(res.comments.map((comment) => <li key={comment.id}>{comment.comment}</li>))
    }
    getBlogById()
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }, [])

  const likeBlog = async () => {
    const updatedBlog = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user && blog.user !== null ? blog.user.id : null
    }

    blogService.update(updatedBlog.id, updatedBlog).then((blog) => {
      const payload = { message: `you liked '${blog.title}' by ${blog.author}`, type: 'info' }
      dispatch(setNotificationMessage(payload))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
      setLikes(likes + 1)
      setBlog(blog)
    })
  }

  const removeBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

    if (!ok) {
      return
    }

    blogService.remove(blog.id, loggedUser.token).then((b) => {
      navigate('/')
    })
  }

  if (blog === null) {
    return <></>
  }

  return (
    <div>
      <Notification />
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {likes} likes <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      Added by {addedBy}
      {loggedUser.name === { addedBy } && <button onClick={() => removeBlog()}>Delete blog</button>}
      <h3>Comments</h3>
      <Button onClick={() => setShowCommentForm(!showCommentForm)}>
        {showCommentForm === true ? 'Close form' : 'Add a comment'}
      </Button>
      {showCommentForm ? <CommentForm blogId={blog.id} /> : null}
      <ul>{comments}</ul>
    </div>
  )
}

export default BlogDetails
