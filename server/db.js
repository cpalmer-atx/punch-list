const mongoose = require('mongoose');

const connectDB = async (URI) => {
  try {
    mongoose.set('strictQuery', true);
    
    const conn = await mongoose.connect(URI);
    console.log(`Connection to ${conn.connection.host} database successful.`);
    conn.connection.on('error', err => {
      console.error({
        msg: 'There was an error with the database.',
        error: err
      });
    });
  } catch (err) {
    console.error({
      msg: 'Something went wrong while connecting to the database',
      error: err
    });
  }
}

module.exports = connectDB;