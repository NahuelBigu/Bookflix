const userCtrl = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');
userCtrl.getUsers = async function() {
    const users = await User.find();
    res.json(users);
}

userCtrl.getUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}
userCtrl.getUserByToken = async(req, res) => {
    const payload = await jwt.verify(req.params.token, 'secretkey');
    if (!payload) {
        return res.status(401).send('Unauhtorized Request');
    }
    const user = await User.findById(payload._id);
    res.json(user);
}
userCtrl.createUser = async(req, res) => {
    const { email, password, plan, creditCardName, creditCardNumber, creditCardCVV, creditCardMM, creditCardYY } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(401).send('The email already exists');
    const newUser = new User({
        email,
        password,
        plan,
        creditCardName,
        creditCardNumber,
        creditCardCVV,
        creditCardMM,
        creditCardYY,
        active: true
    });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({
        token,
        user
    });
}

userCtrl.editUser = async(req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.email
    }
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true });
}

userCtrl.deleteUser = async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, { active: false });
}

userCtrl.iniciarSesion = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('El email es incorrecto');
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).send('Contraseña incorrecta');
    if (!user.active) return res.status(401).send('La cuenta esta deshabilitada');

    const token = jwt.sign({ _id: user._id }, 'secretkey');

    return res.status(200).json({
        token,
        user
    });
}


module.exports = userCtrl;