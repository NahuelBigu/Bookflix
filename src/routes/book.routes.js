const express = require('express');
const router = express.Router();
const book = require('../controllers/book.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, book.getActiveBooks);
router.get('/allBooks', auth, book.getBooks);
router.get('/habilitar/:id', auth, book.habilitarBook);
router.post('/', auth, book.createBook);
router.get('/:id', auth, book.getBook);
router.get('/trailers/:id', auth, book.getBook);
router.put('/:id', auth, book.editBook);
router.delete('/:id', auth, book.deleteBook);

module.exports = router;