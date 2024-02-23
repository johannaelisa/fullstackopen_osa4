const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogsToDb = helper.initialBlogs.map(blog => new Blog(blog))
    await Blog.insertMany(blogsToDb)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 10000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 10000)


  test('the first blog is about ensuring that magic happens', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toContain('Ensure that everything still works')
  }, 10000)

  describe('viewing a specific blog', () => {
    test('id not _id', async () => {
      const response = await api.get('/api/blogs')
      for (const obj of response.body) {
        expect(obj.id).toBeDefined()
      }
    }, 10000)
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if blog is deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogsToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogsToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogsToDelete.title)
    })
  })

  describe('addition of a new blog', () => {
    let firstUser

    beforeEach(async () => {
      firstUser = await helper.usersInDb(0)
    })

    test('a new blog is linked to a user', async () => {
      console.log('firstUser', firstUser)

      const newBlog = {
        title: 'We are using the populate method here."',
        author: 'Minni Hiiri',
        user: firstUser,
        url: 'https://fullstackopen.com',
        likes: 0
      }
      console.log('Uusi blogi', newBlog)
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const newBlogUser= response.body.map(r => r.user).filter(user => user !== undefined)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(newBlogUser).toHaveLength(1)
    })
    test('a new blog can be added', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Mooc',
        url: 'https://fullstackopen.com/osa4/backendin_testaaminen',
        likes: 0
      }
      console.log('Uusi blogi', newBlog)
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const newTitle = response.body.map(r => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(newTitle).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('blog without content is not added', async () => {
      const newBlog = {
        author: 'Aaron Adams',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
  })

  test('likes is 0', async () => {
    const newBlog = {
      title: 'To be left with a big fat zero.',
      author: 'Someone',
      url: 'https://somewhere.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    console.log('Nolla', response.body[response.body.length - 1].likes)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body[response.body.length - 1].likes).toBe(0)
  })

  describe('liking a blog', () => {
    test('succeeds with status code 204 if blog is liked', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const likesAtStart = blogToUpdate.likes
      const changedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(changedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd[0]
      const likesAtEnd = updatedBlog.likes

      expect(likesAtEnd).toBeGreaterThan(likesAtStart)
    })
  })

})


afterAll(async () => {
  await mongoose.connection.close()
})