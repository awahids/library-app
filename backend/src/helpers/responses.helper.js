class HttpException extends Error {
    constructor(response, status) {
        super(response.message);
        this.response = response;
        this.status = status;
        this.name = 'HttpException';
    }
}

const successResponse = ({ data, isPaginate = false, message = 'success', statusCode = 200 }) => {
    return {
        success: true,
        message,
        statusCode,
        data: isPaginate ? data.items : data,
        meta: isPaginate ? data.meta : undefined
    };
};

const errorResponse = ({ message = 'internal server error', statusCode = 500, data } = {}) => {
    throw new HttpException({
        success: false,
        statusCode,
        message,
        data
    }, statusCode);
};

// Helper untuk mengirim respons sukses
const sendSuccessResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json(successResponse({ data, message, statusCode }));
};

// Helper untuk mengirim respons kesalahan
const sendErrorResponse = (res, message = 'Internal Server Error', statusCode = 500) => {
    return res.status(statusCode).json(errorResponse({ message, statusCode }));
};

module.exports = {
    successResponse,
    errorResponse,
    sendSuccessResponse,
    sendErrorResponse,
    HttpException
};