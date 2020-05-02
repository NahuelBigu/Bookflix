const userCtrl = {};
const User = require('../models/User');

userCtrl.getUsers = async function () {
    const users = await User.find();
    res.json(users);
}

userCtrl.getUser = async (req,res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.createUser = async (req,res) => {
    const user = new User(req.body);
    await user.save();
}

userCtrl.editUser = async (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.email
    }
    User.findByIdAndUpdate(req.params.id,{$set: user},{new: true});
}

userCtrl.deleteUser = async (req,res) => {
    await User.findByIdAndRemove(req.params.id);
}

module.exports = userCtrl;