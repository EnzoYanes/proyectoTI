const express = require('express');
const router = express.Router();
const recurso = require('../dao/recurso.dao');

router.get('/', recurso.getRecursos);

router.get('/:id', recurso.getRecurso);

router.post('/', recurso.addRecurso);

router.put('/:id', recurso.updateRecurso);

router.post('/addCliente/:id', recurso.addCliente);

router.post('/upload', recurso.upload);

module.exports = router;