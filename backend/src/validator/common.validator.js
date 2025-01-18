const { query } = require("express-validator");

const validateQuery = [
  query('per_page')
    .optional()
    .escape()
    .isInt({ min: 1 })
    .withMessage('per_page harus berupa angka positif'),

  query('page')
    .optional()
    .escape()
    .isInt({ min: 1 })
    .withMessage('page harus berupa angka positif'),
];

module.exports = {
  validateQuery,
};