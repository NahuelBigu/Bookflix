const userCtrl = {};
const User = require('../models/User');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
var valid = require('card-validator');

userCtrl.getUsers = async(req, res) => {
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

function validarPassword(valor) {
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(valor)) {
        return true
    } else {
        return false
    }

}

function validarEmail(valor) {
    const patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (patt.test(valor)) {
        return true
    } else {
        return false
    }
}
userCtrl.createUser = async(req, res) => {
    const { email, password, plan, creditCardName, creditCardNumber, creditCardCVV, creditCardMM, creditCardYY } = req.body;
    if (!validarEmail(email)) return res.status(401).send('Email incorrecto');

    const userAux = await User.findOne({ email });
    if (userAux) return res.status(401).send('El email ya existe');

    if (!validarPassword(password)) return res.status(401).send('Contraseña Incorrecta. (Mínimo 6 caracteres, al menos 1 letra y 1 número)');
    if (creditCardName === "") return res.status(401).send('Nombre completo de tarejata incorrecto');
    var numberValidation = valid.number(creditCardNumber);
    if (!numberValidation.isValid) return res.status(401).send('Numero de tarjeta invalida');
    var expirationDate = String(creditCardMM) + "/" + String(creditCardYY);
    var expirationValidation = valid.expirationDate(expirationDate);
    if (!expirationValidation.isValid) return res.status(401).send('Fecha de tarjeta invalida');
    var cvvValidation = valid.cvv(String(creditCardCVV));
    if (!cvvValidation.isValid) return res.status(401).send('Cvv de tarjeta invalida');
    const user = new User({
        email,
        password,
        plan,
        creditCardName,
        creditCardNumber,
        creditCardCVV,
        creditCardMM,
        creditCardYY,
        active: true,
        photo: "../../../../assets/img/perfil" + (Math.floor(Math.random() * 7) + 1) + ".png"
    });
    var profile = new Profile({
        name: creditCardName,
        photo: "../../../../assets/img/perfil" + (Math.floor(Math.random() * 7) + 1) + ".png"
    })
    user.profiles.push(profile);
    user.password = await user.encryptPassword(password);
    await user.save();
    const token = await jwt.sign({ _id: user._id }, 'secretkey');
    res.status(200).json({
        token,
        user
    });
}

userCtrl.editUser = async(req, res) => {
    const { id } = req.params;

    if (req.body.user.email === "" || !validarEmail(req.body.user.email)) return res.status(401).send('Email incorrecto');
    if (req.body.user.creditCardName === "") return res.status(401).send('Nombre completo de tarejata incorrecto');
    var numberValidation = valid.number(req.body.user.creditCardNumber);
    if (!numberValidation.isValid) return res.status(401).send('Numero de tarjeta invalida');
    var expirationDate = String(req.body.user.creditCardMM) + "/" + String(req.body.user.creditCardYY);
    var expirationValidation = valid.expirationDate(expirationDate);
    if (!expirationValidation.isValid) return res.status(401).send('Fecha de tarjeta invalida');
    var cvvValidation = valid.cvv(String(req.body.user.creditCardCVV));
    if (!cvvValidation.isValid) return res.status(401).send('Cvv de tarjeta invalida');

    user = await User.findById(id);
    user.email = req.body.user.email;
    user.creditCardName = req.body.user.creditCardName;
    user.creditCardNumber = req.body.user.creditCardNumber;
    user.creditCardCVV = req.body.user.creditCardCVV;
    user.creditCardMM = req.body.user.creditCardMM;
    user.creditCardYY = req.body.user.creditCardYY;

    user.photo = req.body.user.photo;
    if (req.body.oldPasswordTry != "") {
        const match = await user.matchPassword(req.body.oldPasswordTry);
        if (!match) return res.status(401).send('Contraseña actual incorrecta');

        if (!validarPassword(req.body.newPassword)) return res.status(401).send('Contraseña nueva incorrecta. (Mínimo 6 caracteres, al menos 1 letra y 1 número)');
        if (req.body.newPassword != req.body.newPasswordRepeated) return res.status(401).send('La contraseña nueva y la confirmacion no coinciden');


        user.password = await user.encryptPassword(req.body.newPassword);

    }
    user.save();
    res.json({ 'status': "true" });
}

userCtrl.deleteUser = async(req, res) => {

    const user = await User.findById(req.params.id);
    user.active = false;
    await user.save();
    res.json({ 'status': true });
}

userCtrl.habilitarUser = async(req, res) => {

    const user = await User.findById(req.params.id);
    user.active = true;
    user.save();
    res.json({ 'status': true });
}
userCtrl.hacerAdmin = async(req, res) => {
    const user = await User.findById(req.params.id);
    user.plan = 0;
    user.save();
    res.json({ 'status': true });
}
userCtrl.sacarAdmin = async(req, res) => {
    const user = await User.findById(req.params.id);
    user.plan = 1;
    user.save();
    res.json({ 'status': true });
}
userCtrl.descenderUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    user.plan = 1;
    user.save();
    res.json({ 'status': true });
}
userCtrl.ascenderUser = async(req, res) => {
    const user = await User.findById(req.params.id);
    user.plan = 2;
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

userCtrl.editarProfile = async(req, res) => {
    const { id } = req.params;
    user = await User.findById(id);
    console.log(user.profiles);
    user.profiles = req.body.profiles;
    console.log(req.body.profiles);
    console.log(user.profiles);
    await user.save();
    res.json({ 'status': req.body });
}

userCtrl.crearProfile = async(req, res) => {
    const { id } = req.params;
    user = await User.findById(id);
    user.profiles.push(
        new Profile({
            name: req.body.name,
            photo: "../../../../assets/img/perfil" + (Math.floor(Math.random() * 7) + 1) + ".png"
        })
    );
    user.save();
    res.json({ 'status': "true" });
}

userCtrl.getUsersWithinDates = async(req, res) => {
    const users = await User.find();
    const dateIni = Date.parse(req.body.dateIni);
    const dateFin = Date.parse(req.body.dateFin);
    res.json(users.filter(function(x) { return (Date.parse(x.createdAt) >= dateIni && Date.parse(x.createdAt) <= dateFin) }));
}

module.exports = userCtrl;