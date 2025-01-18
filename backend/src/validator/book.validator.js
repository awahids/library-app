const { body } = require("express-validator");

const validateBody = [
  body('title')
    .notEmpty().withMessage('Judul wajib diisi')
    .isString().withMessage('Judul harus berupa string')
    .isLength({ min: 3 }).withMessage('Judul minimal 3 karakter'),
  body('author')
    .notEmpty().withMessage('Penulis wajib diisi')
    .isString().withMessage('Penulis harus berupa string')
    .isLength({ min: 3 }).withMessage('Penulis minimal 3 karakter'),
  body('publishedAt')
    .notEmpty().withMessage('Tahun wajib diisi')
    .isDate().withMessage('Tahun harus berupa tanggal'),
  body('stock')
    .notEmpty().withMessage('Stok wajib diisi')
    .isInt().withMessage('Stok harus berupa angka')
    .isLength({ min: 1 }).withMessage('Stok minimal 1'),
  body('rackUuid')
    .notEmpty().withMessage('Rak wajib diisi')
    .isString().withMessage('Rak harus berupa string')
];

module.exports = {
  validateBody
};