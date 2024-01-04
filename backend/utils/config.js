require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.DATABASE_URL

module.exports = {
  MONGODB_URI,
  PORT
}


