const { Schema, model } = require('mongoose');

const autorSchemma = new Schema({
    name: String,
    active: { type: Boolean, required: true }
}, {
    timestamps: true
})

module.exports = model('Autor', autorSchemma);