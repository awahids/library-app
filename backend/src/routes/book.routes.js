const express = require('express');
const router = express.Router();
const { validateBody } = require('../validator/book.validator');
const { create, getAll } = require('../controllers/book.controller');

router.post('/book', validateBody, create);
router.get('/books', getAll);

module.exports = router;