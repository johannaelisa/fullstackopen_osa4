const Blog = ({ blog }) => {
  return (
    <li><strong>{blog.title}</strong>: {blog.author} {blog.url}, Likes: {blog.likes}</li>
  )
}

export default Blog