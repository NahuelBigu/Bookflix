const { Schema, model } = require('mongoose');

const prophileSchemma = new Schema ({
    name: {type: String, required: true},
    id: {type: String, required: true},
    photo: {type: String, required: true},
    history:  {type: Array, required: true},
    favorite:  {type: Array, required: true}
})

module.exports = model('Prophile', prophileSchemma);

