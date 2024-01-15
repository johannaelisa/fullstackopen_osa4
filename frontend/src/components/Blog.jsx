const Blog = ({ blog, likeBlog, deleteBlog }) => {
  return (
    <li>{blog.title} {blog.author} {blog.url}, Likes: {blog.likes}
    <button onClick={() => likeBlog(blog.id)}>Like</button>
    <button onClick={() => deleteBlog(blog.id)}>Delete</button>
    </li>
  )
}
export default Blog