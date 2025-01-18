const { prisma } = require('../configs/database');
const { paramPaginate, paginationResponse } = require('../helpers/pagination.helper');
const { handleFormatWhere } = require('../helpers/where-format.helper');
const validatorResult = require('../validator/validator-result');

const createStudent = async (req, res) => {
  const {
    name,
    nim,
    isActive,
  } = req.body;

  // validation
  validatorResult(req, res);

  const student = await prisma.student.create({
    data: {
      name,
      nim,
      isActive,
    },
    select: {
      id: true,
      uuid: true,
      name: true,
      nim: true,
      isActive: true,
    }
  });

  return student;
}

const getStudents = async (req, res) => {
  // Run validations
  validatorResult(req, res);

  const { pageNumber, skip, take } = paramPaginate(req);

  const filters = handleFormatWhere(req.body.filters)

  const [students, total] = await prisma.$transaction([
    prisma.student.findMany({
      skip,
      take,
      where: filters,
      select: {
        id: true,
        uuid: true,
        name: true,
        nim: true,
        isActive: true,
      }
    }),
    prisma.student.count({
      where: filters
    }),
  ])

  return paginationResponse(total, students, take, pageNumber, skip);
}

const getStudentByNim = async (nim) => {
  const student = await prisma.student.findUnique({ where: { nim } });

  return student;
}

module.exports = {
  createStudent,
  getStudentByNim,
  getStudents
}