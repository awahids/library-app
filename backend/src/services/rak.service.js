const { prisma } = require('../configs/database');

const createRak = async (data) => {
  const rak = await prisma.rak.create({ data });

  return rak;
};

const getRaks = async (skip = 0, take = 5) => {
  try {
    const raks = await prisma.rak.findMany({
      skip,
      take,
    });
    return raks;
  } catch (error) {
    console.error('Error in getRaks:', error);
    throw new Error('Failed to fetch raks');
  }
};

module.exports = {
  createRak,
  getRaks
}