const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    email: String,
    password: String
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

