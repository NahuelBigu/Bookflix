const { Schema, model } = require('mongoose');

const bookSchemma = new Schema ({
    name: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    editorial: {type: String, required: true},
    image: {type: String, required: true},
    bookPDF: {type: String, required: true},
})

module.exports = model('book', bookSchemma);