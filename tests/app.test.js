const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return 200 OK', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    await request(app).get('/health').expect(200);
  });

  // The pipeline reads uptimeSeconds to tell a freshly deployed container from
  // the previous one, so the field has to stay an integer it can compare
  // against the deploy timestamp.
  it('should report uptime as a non-negative integer', async () => {
    const response = await request(app).get('/health');

    expect(response.body.status).toBe('healthy');
    expect(Number.isInteger(response.body.uptimeSeconds)).toBe(true);
    expect(response.body.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });
});