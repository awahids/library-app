const { prisma } = require('../../src/configs/database');

const seedStudents = async () => {
  const students = [
    { name: 'John Doe', nim: '123456789', isActive: true },
    { name: 'Jane Smith', nim: '987654321', isActive: true },
    { name: 'Bob Johnson', nim: '555555555', isActive: false },
    { name: 'Alice Brown', nim: '111111111', isActive: true },
    { name: 'Charlie Wilson', nim: '222222222', isActive: false },
    { name: 'Emily Davis', nim: '333333333', isActive: true },
  ];

  await prisma.student.createMany({
    data: students,
    skipDuplicates: true,
  });

  console.log('Students seeded successfully.');
};

module.exports = seedStudents;
