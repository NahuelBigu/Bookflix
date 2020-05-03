const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    plan: { type: String, required: true},
    name: { type: String, required: true},
    creditCard: { type: { 
        cardNumber: {type: Number, required: true},
        expiration: {type: Date, required: true},
        CVV: {type: Number, required: true}
    }, required: true },
}, {
    timestamps: true
});

UserSchema.method.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

UserSchema.method.matchPassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

module.exports = model('User', UserSchema);

