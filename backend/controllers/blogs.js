const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  console.log('Tötteröö 1')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  console.log('Tötteröö 2')
  console.log('Received raw data:', body)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  return newBlog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
})

module.exports = blogsRouter
