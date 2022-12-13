const connectDB = require('./db');
const app = require('./app');

const MODE = process.env.PRODUCTION === true ? 'Production' : 'Development';
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`${MODE} server listening on port ${PORT}...`);
});

connectDB(MONGO_URI);

process.on('unhandledRejection', err => {
  console.log(`An error has occured: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
  console.log(`\nSIGINT signal received, server will now shut down.`);
  server.close(() => process.exit(0));
});