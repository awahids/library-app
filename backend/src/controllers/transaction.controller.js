const { sendSuccessResponse, sendErrorResponse } = require('../helpers/responses.helper');
const { getTransactions } = require('../services/transaction.service');

const getAll = async (req, res) => {
  try {
    const students = await getTransactions(req, res);

    return sendSuccessResponse(res, students, "Transactions fetched successfully", true);
  } catch (error) {
    console.error('Error fetching students:', error);
    return sendErrorResponse(res, error.statusCode, error.message);
  }
};

module.exports = {
  getAll
}