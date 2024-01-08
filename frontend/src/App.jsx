import { useState, useEffect } from 'react'
import Blog from './components/blog'
import Form from './components/form'
import Notification from './components/notification'
import blogService from './services/blogs'

const App = ({ blogs }) => {
  const [blogList, setBlogList] = useState([])
  const [newTitle, setNewTitle] = useState('title...')
  const [newAuthor, setNewAuthor] = useState('author...')
  const [newUrl, setNewUrl] = useState('url...')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const deleteBlog = (id) => {
    console.log('Poistetaan Blogi')
    setBlogList(blogList.filter(blog => blog.id !== id));
  };

  const handleTitleChange = (event) => {
    console.log('Title changed:', event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log('Author changed:', event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log('Url changed:', event.target.value)
    setNewUrl(event.target.value)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogList( blogs )
    )  
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }
    const findBlog = blogList.find(n => n.title === newTitle)
    if (findBlog) {
      if (window.confirm(`${newTitle} is already in the list. Do you wish to update the current details?`)) {
        console.log('Päivitetään')
        const changedBlog = { ...findBlog, title: newTitle }
        blogService
        .update(findBlog.id, changedBlog)
        .then(() => {
          blogService.getAll().then((updatedBlogs) => {
            setBlogList(updatedBlogs);
          });
          setSuccessMessage(`Your proposed amendments have been duly attended to, and I am pleased to inform you that the update has been executed with success, embodying the refinement of the existing details.`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 7000);
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
          return
        })
        .catch(error => {
          console.error('Error:', error);
          return
        });
      }
    } else {
      console.log("Else-haarassa uutta oliota luomassa.")
      blogService
      .create(blogObject)
      .then(() => {
        blogService.getAll().then((updatedBlogs) => {
          setBlogList(updatedBlogs)
        });
        console.log('Uusi luotu')
        setSuccessMessage(`Verily, the novel addition of a Blog hath been successfully appended unto the esteemed register.`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 7000);
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 7000);
      });
    }
  }

  return (
    <div>
      <h1>My Blogs</h1>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Form 
          newTitle={newTitle} 
          newAuthor={newAuthor} 
          newUrl={newUrl}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          addBlog={addBlog} 
          />
      <h3>My favorite blogs</h3>
      <ul>
        {blogList.map(blog => 
          <Blog key={blog.id} blog={blog} deleteBlog={() => deleteBlog(blog.id)} />
        )}
      </ul>
    </div>
  )
}


export default App