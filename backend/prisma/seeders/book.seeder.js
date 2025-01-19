const { prisma } = require('../../src/configs/database');

const seedBooks = async () => {
  const raks = await prisma.rak.findMany();

  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedAt: new Date('1925-04-10'),
      stock: 10,
      rakId: raks[0]?.id || 1,
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedAt: new Date('1960-07-11'),
      stock: 5,
      rakId: raks[1]?.id || 2,
    },
    {
      title: '1984',
      author: 'George Orwell',
      publishedAt: new Date('1949-06-08'),
      stock: 8,
      rakId: raks[2]?.id || 3,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedAt: new Date('1813-01-28'),
      stock: 12,
      rakId: raks[3]?.id || 4,
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      publishedAt: new Date('1951-07-16'),
      stock: 6,
      rakId: raks[4]?.id || 5,
    },
    {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      publishedAt: new Date('1954-07-29'),
      stock: 9,
      rakId: raks[5]?.id || 6,
    },
  ];

  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log('Books seeded successfully.');
};

module.exports = seedBooks;