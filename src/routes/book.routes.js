const express = require('express');
const router = express.Router();

const book = require('../controllers/book.controller');

router.get('/',book.getBooks);
router.post('/', book.createBook);
router.get('/:id', book.getBook);
router.put('/:id', book.editBook);
router.delete('/:id', book.deleteBook);

module.exports = router;