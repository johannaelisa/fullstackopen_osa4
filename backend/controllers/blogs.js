const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

/*blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userid = decodedToken.id

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === userid.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Unauthorized: token invalid' })
  }
  //const user = await User.findById(decodedToken.id)

  console.log('Tötteröö', body)
  const firstUser = await User.findOne()
  console.log('firstUser on: ', firstUser)

  /*if (firstUser) {
    const userId = firstUser._id.toString()
  }*/

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: firstUser._id,
  })
  console.log('newBlog on nyt', newBlog )
  const savedBlog = await newBlog.save()

  const populatedBlog = await Blog
    .findById(savedBlog._id).populate('user')
  console.log('populatedBlog: ', populatedBlog)

  const updateUser = await User.findByIdAndUpdate(firstUser._id, { blogs: newBlog,  }, { new: true, runValidators: true, context: 'query' })

  response.status(201).json(savedBlog)
  response.status(200).json(populatedBlog)
  response.status(200).json(updateUser)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json()
  }
})


blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title: body.title, author: body.author, url: body.url, likes: body.likes }, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})


module.exports = blogsRouter
