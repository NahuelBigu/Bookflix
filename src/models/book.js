const { Schema, model } = require('mongoose');

const bookSchemma = new Schema({
    name: { type: String, required: true },
    isbn: { type: String, required: true },
    synopsis: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    editorial: { type: String, required: true },
    image: { type: String, required: true },
    trailers: Array,
    bookPDF: { type: String },
    maxChapters: { type: Number, required: true },
    duedate: { type: String, required: true },
    chapters: { type: Array, required: true },
    active: { type: Boolean, required: true },
    views: { type: Number, required: true },
    comments: Array
}, {
    timestamps: true
})

module.exports = model('Book', bookSchemma);