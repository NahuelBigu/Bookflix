const express = require('express');
const router = express.Router();
const genero = require('../controllers/genero.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, genero.getGeneros);
router.post('/', auth, genero.createGenero);
router.get('/:id', auth, genero.getGenero);
router.get('/activargenero/:id', auth, genero.activateGenero);
router.put('/:id', auth, genero.editGenero);
router.delete('/:id', auth, genero.deleteGenero);

module.exports = router;