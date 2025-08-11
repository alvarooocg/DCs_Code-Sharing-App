const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    customId: {
        type: String, 
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    }
})

snippetSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Snippet', snippetSchema)