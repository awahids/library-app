const { prisma } = require('../configs/database');
const validatorResult = require('../validator/validator-result');
const { paramPaginate, paginationResponse } = require('../helpers/pagination.helper');
const { handleFormatWhere } = require('../helpers/where-format.helper');

const getTransactions = async (req, res) => {
  // Run validations
  validatorResult(req, res);

  const { pageNumber, skip, take } = paramPaginate(req);

  const filters = handleFormatWhere(req.body.filters)

  const [transactions, total] = await prisma.$transaction([
    prisma.transaction.findMany({
      skip,
      take,
      where: filters,
      select: {
        id: true,
        uuid: true,
        duration: true,
        borrowDate: true,
        returnDate: true,
        student: {
          select: {
            id: true,
            uuid: true,
            name: true,
            nim: true,
            isActive: true,
          }
        },
        book: {
          select: {
            id: true,
            uuid: true,
            title: true,
            rak: {
              select: {
                id: true,
                uuid: true,
                name: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),

    prisma.transaction.count({
      where: filters
    }),
  ])

  return paginationResponse(total, transactions, take, pageNumber, skip);
};

module.exports = {
  getTransactions
}