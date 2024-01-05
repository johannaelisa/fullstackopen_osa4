import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = ({ blogs }) => {
  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogList( blogs )
    )  
  }, [])

  return (
    <div>
      <h1>My Blogs</h1>
      <ul>
        {blogList.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App