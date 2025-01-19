const express = require('express');
const router = express.Router();
const { validateBody, validateBookBorrow } = require('../validator/book.validator');
const { create, getAll, createBorrowBook } = require('../controllers/book.controller');
const { validateQuery } = require('../validator/common.validator');

router.post('/book', validateBody, create); // create new book
router.post('/book/borrow', validateBookBorrow, createBorrowBook); // pastikan penulisan benar
router.post('/books', validateQuery, getAll); // get all books with pagination

module.exports = router;