const { validationResult } = require("express-validator");

module.exports = function validatorResult(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Invalid Request',
      code: 400,
      errors: errors.array(),
    });
  };
}