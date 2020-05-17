const express = require('express');
const router = express.Router();
const autor = require('../controllers/autor.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, autor.getAutor);
router.post('/', auth, autor.createAutor);
router.get('/:id', auth, autor.getAutor);
router.get('/activarautor/:id', auth, autor.activateAutor);
router.put('/:id', auth, autor.editAutor);
router.delete('/:id', auth, autor.deleteAutor);

module.exports = router;