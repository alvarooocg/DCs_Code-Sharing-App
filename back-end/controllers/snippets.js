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
    Snippet.findOne({ customId: request.params.id })
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
            return response.status(400).json({ error: 'Code missing' })
        }

        const snippet = new Snippet({
            customId: body.id,
            code: body.code
        })

        const newSnippet = await snippet.save()
        response.status(201).json(newSnippet)
    } catch (error) {
        next(error)
    }
})

snippetsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.code) {
            return response.status(400).json({ error: 'Code missing' })
        }

        const updatedSnippet = await Snippet.findOneAndUpdate(
            { customId: request.params.id },
            { code: body.code },
            { new: true, runValidators: true }
        )

        if (!updatedSnippet) {
            return response.status(404).json({ error: 'Snippet not found' })
        }

        response.json(updatedSnippet)
    } catch (error) {
        next(error)
    }
})

module.exports = snippetsRouter

const app = require('../app') // Ajusta la ruta según tu estructura

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://d-cs-code-sharing-app.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  app(req, res)
}