const express = require('express');
const router = express.Router();
const book = require('../controllers/book.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', book.getActiveBooks);
router.get('/allBooks', book.getBooks);
router.post('/', book.createBook);
router.get('/:id', book.getBook);
router.put('/:id', book.editBook);
router.delete('/:id', book.deleteBook);

module.exports = router;