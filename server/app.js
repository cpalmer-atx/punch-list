require('dotenv').config({ path: './config/.env' });
const { urlencoded } = require('express');
const express = require('express');
const path = require('path');

const production = process.env.PRODUCTION;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers
app.use('/api/sanity', require('./routes/sanity'));
app.use('/api/users', require('./routes/user'));

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