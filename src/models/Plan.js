const { Schema, model } = require('mongoose');

const PlanSchemma = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true },
    value: { type: Number, required: true },
    cantProfile: { type: Number, required: true }
})

module.exports = model('Plan', PlanSchemma);