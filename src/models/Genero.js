const { Schema, model } = require('mongoose');

const generoSchemma = new Schema({
    name: String,
    active: { type: Boolean, required: true }
}, {
    timestamps: true
})

module.exports = model('Genero', generoSchemma);