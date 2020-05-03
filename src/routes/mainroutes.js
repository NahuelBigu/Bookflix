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

router.post('/signup', user.createUser);

router.post('/signin', user.iniciarSesion);

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