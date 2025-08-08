const snippetsRouter = require('express').Router()
const Snippet = require('../models/snippet')

snippetsRouter.get('/', async (request, response) => {
    try {
        const snippets = await Snippet.find({})
        response.json(snippets)
    } catch(error) {
        console.error('Error =>', error)
        response.status(500).json({ error: 'Something went wrong' })
    }
})

snippetsRouter.get('/:id', async (request, response) => {
    try {
        const snippet = await Snippet.findById(request.params.id)
        if (snippet) {
            response.json(snippet)
        } else {
            response.status(404).send({ error: 'Not found' })
        }
    } catch (error) {
        console.error('Error =>', error)
        response.status(500).json({ error: 'Something went wrong' })
    }
})

snippetsRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (!body.code) {
            return response.status(400).json({ error: 'Code missing' })
        }

        const snippet = new Snippet({
            code: body.code
        })

        const newSnippet = await snippet.save()
        response.status(201).json(newSnippet)
    } catch (error) {
        console.error('Error =>', error)
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
        response.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = snippetsRouter