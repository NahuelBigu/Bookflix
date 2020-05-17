const { Schema, model } = require('mongoose');

const bookSchemma = new Schema({
    name: { type: String, required: true },
    synopsis: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    editorial: { type: String, required: true },
    image: { type: String, required: true },
    bookPDF: { type: String, required: true },
    active: { type: Boolean, required: true },
    historial: Array
}, {
    timestamps: true
})

module.exports = model('Book', bookSchemma);