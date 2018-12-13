const express = require('express');
const router = express.Router();
const categoria = require('../dao/categoria.dao');

router.get('/', categoria.getCategorias);

router.post('/', categoria.addCategoria);

router.post('/:name', categoria.addChildren);

router.get('/:id', categoria.findCategoriaById);

module.exports = router;