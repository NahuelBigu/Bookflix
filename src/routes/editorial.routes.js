const express = require('express');
const router = express.Router();
const editorial = require('../controllers/editorial.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', auth, editorial.getEditoriales);
router.post('/', auth, editorial.createEditorial);
router.get('/:id', auth, editorial.getEditorial);
router.get('/activareditorial/:id', auth, editorial.activateEditorial);
router.put('/:id', auth, editorial.editEditorial);
router.delete('/:id', auth, editorial.deleteEditorial);

module.exports = router;