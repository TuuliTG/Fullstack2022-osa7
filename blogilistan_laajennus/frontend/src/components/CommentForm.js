import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import commentService from '../services/comment'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const createdComment = await commentService.create(blogId, comment)
    window.location.reload(false)
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Give your comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CommentForm
