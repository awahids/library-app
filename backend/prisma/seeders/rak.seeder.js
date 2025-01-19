const { prisma } = require('../../src/configs/database');

const seedRaks = async () => {
  const raks = [
    { name: 'Rak Fiksi' },
    { name: 'Rak Non-Fiksi' },
    { name: 'Rak Komputer' },
    { name: 'Rak Fisika' },
    { name: 'Rak Kimia' },
    { name: 'Rak Biologi' },
  ];

  await prisma.rak.createMany({
    data: raks,
    skipDuplicates: true,
  });

  console.log('Racks seeded successfully.');
};

module.exports = seedRaks;
