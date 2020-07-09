const express = require('express');
const router = express.Router();
const plan = require('../controllers/planes.controller');

// auth se pone entre la ruta y el controlador , lo que hace es verificar si una peticion tiene el token y es valida la peticion deberia ir en todo lo que usa un usuario logeado
const auth = require('../middleware/auth');

router.get('/', plan.getPlanes);
router.get('/:id', auth, plan.getPlan);
router.get('/habilitar/:id', auth, plan.habilitarPlan);
router.post('/', auth, plan.createPlan);
router.put('/:id', auth, plan.editPlan);
router.delete('/:id', auth, plan.deletePlan);
module.exports = router;