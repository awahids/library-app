const express = require('express');
const router = express.Router();
const { getAll } = require('../controllers/transaction.controller');
const { validateQuery } = require('../validator/common.validator');

router.post('/transactions', validateQuery, getAll);

module.exports = router;