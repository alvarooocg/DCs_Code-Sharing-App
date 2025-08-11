const middleware = require('../utils/middleware')
const snippetsRouter = require('express').Router()
const Snippet = require('../models/snippet')

snippetsRouter.get('/', async (request, response) => {
    try {
        const snippets = await Snippet.find({})
        response.json(snippets)
    } catch(error) {
        middleware.errorHandler(error)
    }
})

snippetsRouter.get('/:id', (request, response) => {
    Snippet.findById(request.params.id)
        .then(snippet => {
            if (snippet) response.json(snippet)
            else response.status(404).send({ error: 'Not found' })
        })
        .catch(err => middleware.errorHandler(err))
})

snippetsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (!body.code) {
            return response.status(400).json({ error: 'Code mising' })
        }

        const snippet = new Snippet({
            id: body.code,
            code: body.code
        })

        const newSnippet = await snippet.save()
        response.status(201).json(newSnippet)
    } catch (error) {
        middleware.errorHandler(error)
    }
})

module.exports = snippetsRouter