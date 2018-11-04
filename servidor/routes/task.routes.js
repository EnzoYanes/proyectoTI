const express = require('express');
const router = express.Router();
const task = require('../dao/task.dao');

router.get('/', task.getTasks);

router.get('/:id', task.getTask);

router.post('/', task.insertTask);

router.put('/:id', task.updateTask);

router.delete('/:id', task.deleteTask);

module.exports = router;