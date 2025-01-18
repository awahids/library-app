const { body } = require("express-validator");
const { getStudentByNim } = require("../services/student.service");
const { errorHandler } = require("../helpers/error.handler");

const validateBody = [
  body('name')
    .notEmpty().withMessage('Nama wajib diisi')
    .isString().withMessage('Nama harus berupa string')
    .isLength({ min: 3 }).withMessage('Nama minimal 3 karakter'),
  body('nim')
    .notEmpty().withMessage('NIM wajib diisi')
    .isString().withMessage('NIM harus berupa string')
    .isLength({ min: 8 }).withMessage('NIM minimal 8 karakter')
    .custom(async (nim) => {
      const student = await getStudentByNim(nim);
      if (student) {
        throw errorHandler('NIM sudah terdaftar', 400);
      }
    }),
  body('isActive')
    .notEmpty().withMessage('isActive wajib diisi')
    .isBoolean().withMessage('isActive harus berupa boolean')
];

module.exports = {
  validateBody
};