const app = require('./app');

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

process.on('unhandledRejection', err => {
  console.log(`An error has occured: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on('SIGINT', () => {
  console.log(`\nSIGINT signal received, server will now shut down.`);
  server.close(() => process.exit(0));
});