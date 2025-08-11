const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const snippetsRouter = require('./controllers/snippets')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGO_URI)

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
    .then(result => 
        logger.info('Connected to MongoDB')
    )
    .catch(err => 
        logger.error('Error connecting to MongoDB:', err.message)
    )

// CORS configurado correctamente para Vercel
app.use(cors({
    origin: [
        'https://d-cs-code-sharing-app.vercel.app',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/snippets', snippetsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app