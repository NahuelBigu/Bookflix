const userCtrl = {};
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var valid = require('card-validator');

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
    if (user) return res.status(401).send('El email ya existe');

    var numberValidation = valid.number(creditCardNumber);
    var expirationDate = String(creditCardMM) + "/" + String(creditCardYY);
    var expirationValidation = valid.expirationDate(expirationDate);
    var cvvValidation = valid.cvv(creditCardCVV)
    if (!expirationValidation.isValid || !numberValidation.isValid || !cvvValidation.isValid) return res.status(401).send('Tarjeta invalida');

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

userCtrl.editUser = async(req, res) => {
    const { id } = req.params;
    user = await User.findById(id);
    user.email = req.body.user.email;
    user.creditCardName = req.body.user.creditCardName;
    user.creditCardNumber = req.body.user.creditCardNumber;
    user.creditCardCVV = req.body.user.creditCardCVV;
    user.creditCardMM = req.body.user.creditCardMM;
    user.creditCardYY = req.body.user.creditCardYY;

    if (req.body.password != "") {
        if (req.body.newPassword == req.body.newPasswordConfirm) return res.status(401).send('Contraseña incorrecta');
        const match = await user.matchPassword(req.body.newPassword);
        if (!match) return res.status(401).send('Contraseña incorrecta');
        user.password = req.body.newPassword;
    }
    user.save();
    res.json({ 'status': true });
}




module.exports = userCtrl;