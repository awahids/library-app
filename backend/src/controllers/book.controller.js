const { sendErrorResponse, sendSuccessResponse } = require('../helpers/responses.helper');
const { createBook, getBooks } = require('../services/book.service');

const create = async (req, res) => {
    try {
        const newBook = await createBook(req, res);

        return sendSuccessResponse(res, newBook, 'Book created successfully', 201);
    } catch (error) {
        console.error('Error in create:', error);
        return sendErrorResponse(res, error.statusCode, error.message);
    }
};

const getAll = async (req, res) => {
    try {
        const books = await getBooks(req, res);

        return sendSuccessResponse(res, books, 'Success');
    } catch (error) {
        return sendErrorResponse(res, error.statusCode, error.message);
    }
};


module.exports = {
    create,
    getAll
};
