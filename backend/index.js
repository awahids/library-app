const server = require('./src/configs/server');

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

try {
  server(PORT);
} catch (error) {
  console.error(`Failed to start server on port ${PORT}:`, error);
  process.exit(1);
}