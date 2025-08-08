const { request } = require('express')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({ 
        error: 'unknown endpoint',
        path: request.path,
        method: request.method,
        availableEndpoints: [
            'GET /',
            'GET /api',
            'GET /api/health',
            'GET /api/snippets',
            'GET /api/snippets/:id',
            'POST /api/snippets'
        ]
    })
}

const errorHandler = (error, request, response, next) => {
    logger.error('Error name:', error.name)
    logger.error('Error message:', error.message)
    logger.error('Stack:', error.stack)
  
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'duplicate key error' })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    response.status(500).json({ error: 'internal server error' })
}

module.exports = {
    requestLogger, unknownEndpoint, errorHandler
}