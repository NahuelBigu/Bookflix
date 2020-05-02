const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    plan: { type: String, required: true},
    name: { type: String, required: true},
    creditCardNumber: { type: Number, required: true},
    expiration: {type: Date, required: true},
    CVV: {type: Number, required: true},
    historial: Array
}, {
    timestamps: true
});

module.exports = model('User', userSchema, 'users');