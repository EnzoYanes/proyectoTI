const express = require('express');
const router = express.Router();
const user = require('../dao/user.dao');

router.post('/register', user.register);

router.post('/login', user.login);

router.get('/:id', user.getUser);

router.put('/:id', user.putUser);

router.post('/addRecurso/:id', user.addRecursoToUser);

router.post('/confReg/:id', user.confReg);

router.post('/getAllUsers', user.getAllUsers);

module.exports = router;