const { prisma } = require('../configs/database');
const { errorHandler } = require('../helpers/error.handler');
const validatorResult = require('../validator/validator-result');

const createBook = async (req, res) => {
    const { title, author, publishedAt, stock, rackUuid } = req.body;

    // validation
    validatorResult(req, res);

    const rak = await prisma.rak.findUnique({ where: { uuid: rackUuid } });
    if (!rak) {
        throw errorHandler('Rak not found', 404);
    }

    const buku = await prisma.book.create({
        data: {
            title,
            author,
            publishedAt: new Date(publishedAt),
            stock,
            rakId: rak.id,
        },
    })

    return buku;
};

const getBooks = async (req, res) => {
    // Run validations
    validatorResult(req, res);

    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const take = parseInt(limit);

    const skip = (pageNumber - 1) * take;
    const books = await prisma.book.findMany({ skip, take });

    return books;
};


module.exports = {
    createBook,
    getBooks
};