const express = require('express');
const router = express.Router();
const noticias = require('../controllers/noticias.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, noticias.getNoticias);
router.post('/', auth, noticias.createNoticia);
router.get('/:id', auth, noticias.getNoticia);
router.get('/activarnoticia/:id', auth, noticias.activateNoticia);
router.put('/:id', auth, noticias.editNoticia);
router.delete('/:id', auth, noticias.deleteNoticia);

module.exports = router;