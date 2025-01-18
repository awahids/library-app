const { prisma } = require('../configs/database');
const { errorHandler } = require('../helpers/error.handler');
const { paramPaginate, paginationResponse } = require('../helpers/pagination.helper');
const validatorResult = require('../validator/validator-result');

const createBook = async (req, res) => {
    const { title, author, publishedAt, stock, rackUuid } = req.body;

    // validation
    validatorResult(req, res);

    const rak = await prisma.rak.findUnique({ where: { uuid: rackUuid } });
    if (!rak) {
        throw errorHandler('Rak not found', 404);
    }

    const book = await prisma.book.create({
        data: {
            title,
            author,
            publishedAt: new Date(publishedAt),
            stock,
            rakId: rak.id,
        },
        select: {
            id: true,
            uuid: true,
            title: true,
            author: true,
            publishedAt: true,
            stock: true,
            rak: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                }
            }
        }
    })

    return book;
};

const getBooks = async (req, res) => {
    // Run validations
    validatorResult(req, res);

    const { pageNumber, skip, take } = paramPaginate(req);

    const [books, total] = await prisma.$transaction([
        prisma.book.findMany({
            skip,
            take,
            select: {
                id: true,
                uuid: true,
                title: true,
                author: true,
                publishedAt: true,
                stock: true,
                rak: {
                    select: {
                        id: true,
                        uuid: true,
                        name: true,
                    }
                }
            }
        }),
        prisma.book.count(),
    ]);

    return paginationResponse(total, books, take, pageNumber, skip);
};

module.exports = {
    createBook,
    getBooks
};