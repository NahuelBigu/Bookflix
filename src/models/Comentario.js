const { Schema, model } = require('mongoose');

const comentarioSchema = new Schema ({
    like: { type: Boolean, required: true },
    texto: { type: String, required: false },
    perfil: { type: String, required: true },
    active: { type: Boolean, required: true }
}, {
    timestamps: true
})

module.exports = model('Comentario', comentarioSchema);