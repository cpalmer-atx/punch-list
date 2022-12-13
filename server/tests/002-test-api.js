const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

const testAPI = () => {
  const URL = process.env.BASE_URL;
  mongoose.set('strictQuery', true);

  // Establish connection to database
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  // Run all tests
  it.skip('It should persist a new user to database', async () => {
    const res = await request(URL).post('/api/users')
      .send({
        name: "John",
        email: "j@d.com",
        password: "12345"
    });
    expect(res.statusCode).toBe(200);
  });
  it('It should reject new user attempt with missing name field', async () => {
    const res = await request(URL).post('/api/users')
      .send({
        email: "j@d.com",
        password: "12345"
    });
    expect(res.body.errors[0].param).toBe("name");
  });
  it('It should reject new user attempt with missing email field', async () => {
    const res = await request(URL).post('/api/users')
      .send({
        name: "john",
        password: "12345"
    });
    expect(res.body.errors[0].param).toBe("email");
  });
  it('It should reject new user attempt with missing password field', async () => {
    const res = await request(URL).post('/api/users')
      .send({
        name: "john",
        email: "j@d.com"
    });
    expect(res.body.errors[0].param).toBe("password");
  });
  it.skip('It should find existing user profile by email', async () => {

  });
  it.skip('It should delete a user profile', async () => {

  });

  // Close database connection
  afterEach(async () => {
    await mongoose.connection.close();
  });
}

module.exports = testAPI;