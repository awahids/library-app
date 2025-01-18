const { createRak, getRaks } = require('../services/rak.service');
const { sendSuccessResponse } = require('../helpers/responses.helper');
const validatorResult = require('../validator/validator-result');

const create = async (req, res) => {
  // validation
  validatorResult(req, res);

  try {
    const { name } = req.body;

    const buku = await createRak({
      name
    });

    return sendSuccessResponse(res, buku, 'Created', 201);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  // Run validations
  validatorResult(req, res);

  try {
    const { page = 1, per_page = 5 } = req.query;
    const pageNumber = parseInt(page);
    const perPage = parseInt(per_page);

    const skip = (pageNumber - 1) * perPage;
    const raks = await getRaks(skip, perPage);

    return sendSuccessResponse(res, raks, 'Success');
  } catch (error) {
    console.error('Error fetching raks:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error: error.message,
    });
  }
};


module.exports = {
  create,
  getAll
}
