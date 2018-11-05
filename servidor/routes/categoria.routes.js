const express = require('express');
const router = express.Router();
const categoria = require('../dao/categoria.dao');

router.get('/', categoria.getCategorias);

router.post('/', categoria.addCategoria);

module.exports = router;