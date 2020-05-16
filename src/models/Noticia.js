const { Schema, model } = require('mongoose');

const noticiaSchemma = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, required: true },
    historial: Array
}, {
    timestamps: true
})

module.exports = model('Noticia', noticiaSchemma);