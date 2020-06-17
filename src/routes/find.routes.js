const express = require('express');
const router = express.Router();
const find = require('../controllers/find.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, find.getFind);
router.get('/search/:find', auth, find.search);

module.exports = router;