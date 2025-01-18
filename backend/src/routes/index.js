var express = require('express');
var router = express.Router();
const { sendSuccessResponse } = require('../helpers/responses.helper');
const raksRouter = require('./rak.routes');
const booksRouter = require('./book.routes');
const studentsRouter = require('./student.routes');

router.get('/', function (req, res, next) {
  return sendSuccessResponse(res, Date('YYYY-MM-DD'), 'Welcome to the API', 200);
});

router.use('/', raksRouter);
router.use('/', booksRouter);
router.use('/', studentsRouter);

module.exports = router;
