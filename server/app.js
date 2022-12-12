require('dotenv').config({ path: '../config/.env' });
const express = require('express');
const path = require('path');

const production = process.env.PRODUCTION;
const app = express();

// Middleware

//Routers

if (production) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
  );
} else {
  app.get('/', (req, res) => 
    res.send('App is in development mode, set production in config'));
}

module.exports = app;