const middleware = require('../utils/middleware')
const snippetsRouter = require('express').Router()
const Snippet = require('../models/snippet')

snippetsRouter.get('/', async (request, response) => {
    const snippets = await Snippet.find({})
    response.json(snippets)
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
    const body = request.body

    const snippet = new Snippet({
        id: body.code,
        code: body.code
    })

    if (!body.code) {
        return response.status(400).json({ error: 'Code mising' })
    }

    const newSnippet = await snippet.save()
})

module.exports = snippetsRouter