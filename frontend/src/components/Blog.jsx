const Blog = ({ blog, deleteBlog }) => {
  return (
    <li>{blog.title} {blog.author} {blog.url}, Likes: {blog.likes}
    <button onClick={() => deleteBlog(blog.id)}>Delete</button>
    </li>
  )
}
export default Blog