const express = require('express');
const router = express.Router();
const recurso = require('../dao/recurso.dao');

router.get('/', recurso.getRecursos);

router.get('/:id', recurso.getRecurso);

router.post('/', recurso.addRecurso);

module.exports = router;