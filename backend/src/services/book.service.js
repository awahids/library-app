const { prisma } = require('../configs/database');
const { errorHandler } = require('../helpers/error.handler');
const { paramPaginate, paginationResponse } = require('../helpers/pagination.helper');
const validatorResult = require('../validator/validator-result');
const { handleFormatWhere } = require('../helpers/where-format.helper');
const { getStudentByUuid } = require('./student.service');

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
            stock: parseInt(stock),
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
    const filters = handleFormatWhere(req.body.filters)

    const [books, total] = await prisma.$transaction([
        prisma.book.findMany({
            skip,
            take,
            where: filters,
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

        prisma.book.count({
            where: {
                stock: {
                    not: 0
                },
                ...filters
            },
        }),
    ]);

    return paginationResponse(total, books, take, pageNumber, skip);
};

const getBookByuuid = async (uuid) => {
    const book = await prisma.book.findUnique({ where: { uuid } });
    return book;
}

const borrowBooks = async (req, res) => {
    // Validasi input
    validatorResult(req, res);

    const { studentUuid, data } = req.body;

    const student = await getStudentByUuid(studentUuid);
    if (!student) {
        throw errorHandler('Student not found', 404);
    }

    if (!student.isActive) {
        throw errorHandler(`Student ${student.name} is not active`, 403);
    }

    const result = await prisma.$transaction(async (tx) => {
        // Validasi dan kurangi stok buku
        const bookPromises = data.map(async (item) => {
            const book = await tx.book.findUnique({
                where: {
                    uuid: item.bookUuid
                },
                select: {
                    id: true,
                    title: true,
                    stock: true,
                    author: true,
                    rak: {
                        select: {
                            id: true,
                            uuid: true,
                            name: true,
                        }
                    }
                }
            });

            if (!book) {
                throw errorHandler(`Book with UUID ${item.bookUuid} not found`, 404);
            }

            if (book.stock <= 0) {
                throw errorHandler(`${book.title} is out of stock`, 403);
            }

            // Update stok buku
            await tx.book.update({
                where: { uuid: item.bookUuid },
                data: { stock: { decrement: 1 } },
            });

            return {
                book,
                studentId: student.id,
                bookId: book.id,
                duration: item.duration,
            };
        });

        // Tunggu semua validasi selesai
        const transactions = await Promise.all(bookPromises);

        // Bulk insert ke tabel transaction
        await tx.transaction.createMany({
            data: transactions.map(({ studentId, bookId, duration }) => ({
                studentId,
                bookId,
                duration,
            })),
        });

        return {
            ...student,
            books: transactions.map(({ book }) => ({
                ...book
            }))
        };
    });

    return result;
};

module.exports = {
    createBook,
    getBooks,
    getBookByuuid,
    borrowBooks
};