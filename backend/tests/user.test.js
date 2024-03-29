//const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Vicar Second',
      name: 'Víctor Arriaga Ríos',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
describe('addition of a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'Minni Hiiri', passwordHash })

    await user.save()
  })
  test('creation fails with proper statuscode and message if username is shorter than 3', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart[0])
    const newUser = {
      username: 'Roope',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log('Virheviesti on nyt: ', result.body.error)
    expect(result.body.error).toMatch(/(username should be at least 3 letters long|password should be at least 3 letters long)/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log(usersAtStart[0])
    const newUser = {
      username: 'Minni Hiiri',
      name: 'Superuser',
      password: 'sal',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log('Virheviesti on nyt: ', result.body.error)
    expect(result.body.error).toMatch(/(username is already taken)/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})



