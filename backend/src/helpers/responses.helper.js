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

const errorResponse = ({ error, statusCode = 500 } = {}) => {
    return {
        success: false,
        statusCode,
        error,
    };
};

const sendSuccessResponse = (res, data, message = 'Success', isPaginate = false, statusCode = 200) => {
    return res.status(statusCode).json(successResponse({ data, isPaginate, message, statusCode }));
};

const sendErrorResponse = (res, statusCode = 500, error = null) => {
    return res.status(statusCode).json(errorResponse({ error, statusCode }));
};

module.exports = {
    successResponse,
    errorResponse,
    sendSuccessResponse,
    sendErrorResponse,
    HttpException
};