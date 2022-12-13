// Jest Expect methods can be found here: https://jestjs.io/docs/expect
const request = require('supertest');

const baseURL = 'http://localhost:5000';

describe('sanity check', () => {
  test('1 + 1 = 2', () => {
    const result = 1 + 1;
    expect(result).toEqual(2);
  });
  test('sanity /GET response data', async () => {
    const res = await request(baseURL).get("/api/sanity");
    expect(res.body.success).toBe(true);
    expect(res.body.msg).toBe('Passed sanity check!');
  });
});


// describe('User tests', () => {

// });