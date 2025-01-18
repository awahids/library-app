const express = require('express');
const router = express.Router();
const { create, getAll } = require('../controllers/student.controller');
const { validateBody } = require('../validator/student.validator');
const { validateQuery } = require('../validator/common.validator');

router.post('/student', validateBody, create);
router.post('/students', validateQuery, getAll);

module.exports = router;