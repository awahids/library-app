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

const validateBookBorrow = [
  body('studentUuid')
    .notEmpty().withMessage('Siswa wajib diisi')
    .isString().withMessage('Siswa harus berupa string'),

  body('data')
    .isArray({ min: 1 }).withMessage('Data buku harus berupa array minimal 1 item')
    .custom((items) => {
      for (const item of items) {
        if (!item.bookUuid) throw new Error('bookUuid wajib diisi');
        if (typeof item.bookUuid !== 'string') throw new Error('bookUuid harus berupa string');
        if (!item.duration) throw new Error('duration wajib diisi');
        if (typeof item.duration !== 'number') throw new Error('duration harus berupa angka');
        if (item.duration < 1 || item.duration > 14) throw new Error('Durasi minimal 1, maksimal 14');
      }
      return true;
    }),
];

module.exports = {
  validateBody,
  validateBookBorrow
};