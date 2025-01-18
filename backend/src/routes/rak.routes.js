const express = require('express');
const router = express.Router();
const { create, getAll } = require('../controllers/rak.controller');
const { validateBody } = require('../validator/rak.validator');
const { validateQuery } = require('../validator/common.validator');

router.post('/rak', validateBody, create);
router.get('/raks', validateQuery, getAll);

module.exports = router;