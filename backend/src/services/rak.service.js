const { prisma } = require('../configs/database');
const validatorResult = require('../validator/validator-result');
const { paramPaginate, paginationResponse } = require('../helpers/pagination.helper');

const createRak = async (req, res) => {
  const { name } = req.body;

  // validation
  validatorResult(req, res);

  const rak = await prisma.rak.create({
    data: {
      name
    },
    select: {
      id: true,
      uuid: true,
      name: true,
    }
  });

  return rak;
};

const getRaks = async (req, res) => {
  // Run validations
  validatorResult(req, res);

  const { pageNumber, skip, take } = paramPaginate(req);

  const [raks, total] = await prisma.$transaction([
    prisma.rak.findMany({
      skip,
      take,
      select: {
        id: true,
        uuid: true,
        name: true,
      }
    }),

    prisma.rak.count(),
  ])

  return paginationResponse(total, raks, take, pageNumber, skip);
};

module.exports = {
  createRak,
  getRaks
}