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

export default Blog
