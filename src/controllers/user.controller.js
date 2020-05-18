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
    const userAux = await User.findOne({ email });
    if (userAux) return res.status(401).send('El email ya existe');

    var numberValidation = valid.number(creditCardNumber);
    var expirationDate = String(creditCardMM) + "/" + String(creditCardYY);
    var expirationValidation = valid.expirationDate(expirationDate);
    var cvvValidation = valid.cvv(creditCardCVV)
    if (!expirationValidation.isValid || !numberValidation.isValid || !cvvValidation.isValid) return res.status(401).send('Tarjeta invalida');

    const user = new User({
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
    user.password = await user.encryptPassword(password);
    await user.save();
    const token = await jwt.sign({ _id: user._id }, 'secretkey');
    res.status(200).json({
        token,
        user
    });
}

function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
        return true
    } else {
        return false
    }
}
userCtrl.editUser = async(req, res) => {
    const { id } = req.params;
    if (req.body.user.email === "" || validarEmail(req.body.user.email)) return res.status(401).send('Email incorrecto');
    if (req.body.user.creditCardName === "") return res.status(401).send('Nombre completo de tarejata incorrecto');
    var numberValidation = valid.number(req.body.user.creditCardNumber);
    var expirationDate = String(req.body.user.creditCardMM) + "/" + String(req.body.user.creditCardYY);
    var expirationValidation = valid.expirationDate(expirationDate);
    var cvvValidation = valid.cvv(String(req.body.user.creditCardCVV));
    if (!expirationValidation.isValid || !numberValidation.isValid || !cvvValidation.isValid) return res.status(401).send('Tarjeta invalida');

    user = await User.findById(id);
    user.email = req.body.user.email;
    user.creditCardName = req.body.user.creditCardName;
    user.creditCardNumber = req.body.user.creditCardNumber;
    user.creditCardCVV = req.body.user.creditCardCVV;
    user.creditCardMM = req.body.user.creditCardMM;
    user.creditCardYY = req.body.user.creditCardYY;

    if (req.body.oldPasswordTry != "") {
        if (req.body.newPassword == req.body.newPasswordRepeated) return res.status(401).send('Contraseña incorrecta');
        const match = await user.matchPassword(req.body.newPassword);
        if (!match) return res.status(401).send('Contraseña incorrecta');
        user.password = req.body.newPassword;
    }
    user.save();
    res.json({ 'status': "true" });
}

userCtrl.deleteUser = async(req, res) => {

    const user = await User.findById(req.params.id);
    user.active = false;
    user.save();
    res.json({ 'status': true });
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