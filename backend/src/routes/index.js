var express = require('express');
var router = express.Router();
const { sendSuccessResponse } = require('../helpers/responses.helper');
const raksRouter = require('./rak.routes');

router.get('/', function (req, res, next) {
  return sendSuccessResponse(res, Date('YYYY-MM-DD'), 'Welcome to the API', 200);
});

// rak routes
router.use('/', raksRouter);

module.exports = router;
