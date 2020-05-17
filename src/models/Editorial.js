const { Schema, model } = require('mongoose');

const editorialSchemma = new Schema({
    name: String,
    active: { type: Boolean, required: true }
}, {
    timestamps: true
})

module.exports = model('Editorial', editorialSchemma);