const express = require('express');
const router = express.Router();
const user = require('../dao/user.dao');

router.post('/register', user.register);

router.post('/login', user.login);

router.post('/confirmar', user.confirmar);

module.exports = router;