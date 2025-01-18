const { body, query } = require("express-validator");

const validateBody = [
  body('name')
    .notEmpty().withMessage('Rak wajib diisi')
    .isString().withMessage('Rak harus berupa string')
    .isLength({ min: 3 }).withMessage('Rak minimal 3 karakter'),
];

module.exports = {
  validateBody,
};