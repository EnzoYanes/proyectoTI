const express = require('express');
const router = express.Router();
const suscripcion = require('../dao/suscripcion.dao');

router.get('/', suscripcion.getSuscripciones);

router.get('/:id', suscripcion.getSuscripcion);

router.post('/', suscripcion.addSuscripcion);

router.put('/:id', suscripcion.updateSuscripcion);

module.exports = router;