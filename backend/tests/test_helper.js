const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'Tupu',
    name: 'Tupu Ankka',
    password: 'salasana!',
    likes: 0
  },
  {
    username: 'Hupu',
    name: 'Hupu Ankka',
    password: 'salasana!',
    likes: 0
  },
  {
    username: 'Lupu',
    name: 'Lupu Ankka',
    password: 'salasana!',
    likes: 0
  },

]

const initialBlogs = [
  {
    title: 'Ensure that everything still works',
    author: 'Minni Hiiri',
    url: 'http://everythingisok.com',
    likes: 0
  },
  {
    title: 'Hello World',
    author: 'Hessu Hopo',
    url: 'http://helloworld.com',
    likes: 0
  },
  {
    title: 'You can lead a horse to water, but you can`t make it drink.',
    author: 'Proverb',
    url: 'http://proverb.com',
    likes: 0
  },
  {
    title: 'A penny for your thoughts.',
    author: 'John Heywood',
    url: 'http://johnheywood.com',
    likes: 0
  },
  {
    title: 'Roope Ankka',
    author: 'You can`t have your cake and eat it too.',
    url: 'http://money.com',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'Rihanna' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers
}