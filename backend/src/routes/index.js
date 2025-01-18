var express = require('express');
var router = express.Router();
var inventoriesRouter = require('./inventory.routes');
const { sendSuccessResponse } = require('@/helpers/responses.helper');

router.get('/', function(req, res, next) {
  return sendSuccessResponse(res, null, 'Welcome to the API', 200);
});

// inventory routes
router.use('/', inventoriesRouter);

module.exports = router;
