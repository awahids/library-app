const seedStudents = require('./seeders/student.seeder');
const seedBooks = require('./seeders/book.seeder');
const seedRaks = require('./seeders/rak.seeder');

const seedAll = async () => {
  try {
    console.log('Starting seeding process...');

    await seedRaks();
    await seedStudents();
    await seedBooks();

    console.log('Seeding process completed!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit(0);
  }
};

seedAll();
