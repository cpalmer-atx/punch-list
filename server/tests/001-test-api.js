const request = require('supertest');

const testAPI = () => {
  const baseURL = 'http://localhost:5000';

  it('It should pass a simple counting test', () => {
    expect(1 + 1).toEqual(2);
  });
  it('It should pass a simple /GET request', async () => {
    const res = await request(baseURL).get('/api/sanity');
    expect(res.body.msg).toBe('Passed sanity check!');
  });
}

module.exports = testAPI;