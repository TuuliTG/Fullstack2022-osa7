import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1
  }
  const link = `/blogs/${blog.id}`
  return (
    <div style={style} className="blog">
      <a href={link}>
        {blog.title} {blog.author}
      </a>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired
}

export default Blog
