const { prisma } = require('../configs/database');
const validatorResult = require('../validator/validator-result');

const createRak = async (req, res) => {
  const { name } = req.body;

  // validation
  validatorResult(req, res);

  const rak = await prisma.rak.create({
    data: {
      name
    }
  });

  return rak;
};

const getRaks = async (req, res) => {
  // Run validations
  validatorResult(req, res);

  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page);

  const take = parseInt(limit);
  const skip = (pageNumber - 1) * take;

  const raks = await prisma.rak.findMany({
    skip,
    take,
  });

  return raks;
};

module.exports = {
  createRak,
  getRaks
}