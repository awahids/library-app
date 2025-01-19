var express = require('express');
var router = express.Router();
const raksRouter = require('./rak.routes');
const booksRouter = require('./book.routes');
const studentsRouter = require('./student.routes');

router.use('/', raksRouter);
router.use('/', booksRouter);
router.use('/', studentsRouter);

module.exports = router;
