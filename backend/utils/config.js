require('dotenv').config()

const PORT = process.env.PORT
//const MONGODB_URI = process.env.DATABASE_URL

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.DATABASE_URL

module.exports = {
  MONGODB_URI,
  PORT
}


