import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const link = `/blogs/${blog.id}`
  const navigate = useNavigate()
  return (
    <>
      <tr>
        <td>
          <a type="button" onClick={() => navigate(link)}>
            {blog.title}
          </a>
        </td>
        <td>{blog.author}</td>
      </tr>
    </>
  )
}

export default Blog
