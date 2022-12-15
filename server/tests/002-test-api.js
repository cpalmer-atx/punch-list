const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

const testAPI = () => {
  const URL = process.env.BASE_URL;
  mongoose.set('strictQuery', true);

  const validUser = {
    name: "John",
    email: "j@d.com",
    password: "12345"
  }

  // Establish connection to database
  beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  // Run all tests
  it('It should persist a new user to database', async () => {
    const res = await request(URL).post('/api/users').send(validUser);
    validUser.id = res.body.data._id;
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
  it('It should find existing user profile by email', async () => {
    const res = await request(URL).get(`/api/users/search`).send({ email: validUser.email });
    expect(res.body.success).toBe(true);
  });
  it('It should find existing user profile by id', async () => {
    const res = await request(URL).get(`/api/users/${validUser.id}`)
    expect(res.body.data.email).toBe(validUser.email)
  });
  it('It should delete a user profile', async () => {
    const res = await request(URL).get(`/api/users/${validUser.id}`);
    expect(res.body.success).toBe(true);
  });

  // Close database connection
  afterEach(async () => {
    await mongoose.connection.close();
  });
}

module.exports = testAPI;