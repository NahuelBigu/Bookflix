const { Router } = require('express');
const router = Router();
const user = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

// RUTAS
router.get('/', auth, user.getUsers);
router.get('/:id', auth, user.getUser);
router.get('/habilitar/:id', auth, user.habilitarUser);
router.get('/hacerAdmin/:id', auth, user.hacerAdmin);
router.get('/sacarAdmin/:id', auth, user.sacarAdmin);
router.get('/getUserByToken/:token', auth, user.getUserByToken);

router.get('/ascender/:id', auth, user.ascenderUser);
router.get('/descender/:id', auth, user.descenderUser);
router.put('/:id', user.editUser);
router.put('/perfiles/:id', user.editarProfile);
router.delete('/:id', user.deleteUser);

router.post('/signup', user.createUser);

router.post('/signin', user.iniciarSesion);

router.get('/verifyToken/:token', async(req, res) => {
    const payload = await jwt.verify(req.token, 'secretkey');
    if (!payload) {
        return false;
    }
    return true;
});




module.exports = router;