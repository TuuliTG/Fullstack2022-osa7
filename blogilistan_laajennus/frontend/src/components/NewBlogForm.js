import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div className="container">
      <h2 className="center">Create new</h2>

      <Form className="center" onSubmit={handleSubmit}>
        <div>
          <Form.Control
            type="text"
            placeholder="Title of the blog"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"></Form.Control>
        </div>
        <div>
          <Form.Control
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="Author of the blog"></Form.Control>
        </div>
        <div>
          <Form.Control
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="Url of the blog"></Form.Control>
        </div>
        <Button id="create-butto" variant="primary" className="m-2" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlogForm
