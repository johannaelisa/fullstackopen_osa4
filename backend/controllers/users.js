const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length < 3) {
    return response.status(400).json({ error: 'username should be at least 3 letters long' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password should be at least 3 letters long' })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({ error: 'username is already taken' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter