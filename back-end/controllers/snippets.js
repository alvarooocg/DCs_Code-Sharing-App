const snippetsRouter = require('express').Router()
const Snippet = require('../models/snippet')

snippetsRouter.get('/', async (request, response) => {
    try {
        const snippets = await Snippet.find({})
        response.json(snippets)
    } catch(error) {
        console.error('Error =>', error)
        res.status(500).json({ error: 'Something went wrong' })
    }
})

snippetsRouter.get('/:id', (request, response) => {
    Snippet.findById(request.params.id)
        .then(snippet => {
            if (snippet) response.json(snippet)
            else response.status(404).send({ error: 'Not found' })
        })
        .catch(err => {
            console.error('Error =>', err)
            res.status(500).json({ error: 'Something went wrong' })
        })
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
        console.error('Error =>', error)
        res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = snippetsRouter