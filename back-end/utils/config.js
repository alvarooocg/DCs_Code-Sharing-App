require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB

module.exports = {
    PORT, MONGO_URI
}