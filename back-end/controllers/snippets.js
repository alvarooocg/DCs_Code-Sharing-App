const snippetsRouter = require('express').Router()
const Snippet = require('../models/snippet')

snippetsRouter.get('/', async (request, response, next) => {
    try {
        const snippets = await Snippet.find({})
        response.json(snippets)
    } catch(error) {
        next(error)
    }
})

snippetsRouter.get('/:id', (request, response, next) => {
    Snippet.findById(request.params.id)
        .then(snippet => {
            if (snippet) response.json(snippet)
            else response.status(404).send({ error: 'Not found' })
        })
        .catch(err => next(err))
})

snippetsRouter.post('/', async (request, response, next) => {
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
        next(error)
    }
})

module.exports = snippetsRouter