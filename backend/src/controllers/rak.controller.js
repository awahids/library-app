const { createRak, getRaks } = require('../services/rak.service');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/responses.helper');
const validatorResult = require('../validator/validator-result');

const create = async (req, res) => {
  try {
    const rak = await createRak(req, res);

    return sendSuccessResponse(res, rak, 'Rak created successfully', 201);
  } catch (error) {
    console.error('Error in create:', error);
    return sendErrorResponse(res, error.statusCode, error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const raks = await getRaks(req, res);

    return sendSuccessResponse(res, raks, 'Success');
  } catch (error) {
    console.error('Error fetching raks:', error);
    return sendErrorResponse(res, error.statusCode, error.message);
  }
};


module.exports = {
  create,
  getAll
}
