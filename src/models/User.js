const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    plan: { type: Number, required: true },
    creditCard: {
        type: {
            creditCardNumber: { type: Number, required: true },
            creditCardName: { type: String, required: true },
            creditCardMM: { type: Number, required: true },
            creditCardYY: { type: Number, required: true },
            creditCardCVV: { type: Number, required: true }
        },
        required: true
    },
    profiles: { type: Array, required: true },
    timestamps: true,
    active: { type: Boolean, required: true }
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = model('User', UserSchema);