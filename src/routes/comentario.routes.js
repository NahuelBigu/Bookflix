const express = require('express');
const router = express.Router();
const comentario = require('../controllers/comentario.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, comentario.getComentarios);
router.post('/', auth, comentario.createComentario);
router.get('/:id', auth, comentario.getComentario);
router.put('/:id', auth, comentario.editComentario);
router.delete('/:id', auth, comentario.deleteComentario);

module.exports = router;