const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    name: String,
    author: String
}, {
    timestamps: true
});

module.exports = model('Book', BookSchema);