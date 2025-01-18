const express = require('express');
const router = express.Router();
const { validateBody } = require('../validator/book.validator');
const { create, getAll } = require('../controllers/book.controller');
const { validateQuery } = require('../validator/common.validator');

router.post('/book', validateBody, create);
router.post('/books', validateQuery, getAll);

module.exports = router;