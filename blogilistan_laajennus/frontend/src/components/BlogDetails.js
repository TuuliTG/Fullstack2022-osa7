import blogService from '../services/blogs'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import { Button, Card } from 'react-bootstrap'
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
      user: blog.user && blog.user !== null ? blog.user.id : null,
      comments: blog.comments.map((c) => c.id)
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
    <div className="container">
      <Notification />
      <h2 className="header">
        {blog.title} by {blog.author}
      </h2>
      <Card>
        <Card.Body>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>
            {likes} likes{' '}
            <Button className="m-2" variant="secondary" onClick={() => likeBlog(blog.id)}>
              like
            </Button>
          </Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Title className="m-2">Added by {addedBy}</Card.Title>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Comments:</Card.Title>
          <ul>{comments}</ul>
        </Card.Body>
      </Card>
      <Button
        className="m-2"
        variant="secondary"
        onClick={() => setShowCommentForm(!showCommentForm)}>
        {showCommentForm === true ? 'Close form' : 'Add a comment'}
      </Button>
      {loggedUser.name === addedBy && <Button onClick={() => removeBlog()}>Delete blog</Button>}
      {showCommentForm ? <CommentForm blogId={blog.id} /> : null}
    </div>
  )
}

export default BlogDetails
