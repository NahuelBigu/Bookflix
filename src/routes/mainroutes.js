const { Router } = require('express');
const router = Router();
const user = require('../controllers/user.controller');

const User = require('../models/User');
const Book = require('../models/Book');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.get('/:id', user.getUser);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);

router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({
        token,
        'user': newUser
    });
});

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('The email dosent exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

    const token = jwt.sign({ _id: user._id }, 'secretkey');

    return res.status(200).json({
        token,
        'user': user
    });
});

router.get('/tasks', (req, res) => {});

router.get('/private-tasks', verifyToken, (req, res) => {});

async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauhtorized Request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauhtorized Request');
        }

        const payload = await jwt.verify(token, 'secretkey');
        if (!payload) {
            return res.status(401).send('Unauhtorized Request');
        }
        req.userId = payload._id;
        next();
    } catch (e) {
        //console.log(e)
        return res.status(401).send('Unauhtorized Request');
    }
}

module.exports = router;