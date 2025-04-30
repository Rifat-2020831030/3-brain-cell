const request = require('supertest');
const express = require('express');
const { generalLimiter, loginLimiter, registrationLimiter } = require('../../src/utils/rateLimiter');

describe('Rate Limiters', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe('generalLimiter', () => {
    it('should allow requests under the limit', async () => {
      app.use(generalLimiter);
      app.get('/', (req, res) => res.status(200).send('OK'));

      for (let i = 0; i < 200; i++) {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
      }
    });

    it('should block requests exceeding the limit', async () => {
      app.use(generalLimiter);
      app.get('/', (req, res) => res.status(200).send('OK'));

      for (let i = 0; i < 200; i++) {
        await request(app).get('/');
      }

      const response = await request(app).get('/');
      expect(response.status).toBe(429);
      expect(response.text).toBe('Too many requests from this IP. Please try again after 30 minutes.');
    });
  });

  describe('loginLimiter', () => {
    it('should allow login attempts under the limit', async () => {
      app.use(loginLimiter);
      app.post('/login', (req, res) => res.status(200).send('Login OK'));

      for (let i = 0; i < 20; i++) {
        const response = await request(app).post('/login');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Login OK');
      }
    });

    it('should block login attempts exceeding the limit', async () => {
      app.use(loginLimiter);
      app.post('/login', (req, res) => res.status(200).send('Login OK'));

      for (let i = 0; i < 20; i++) {
        await request(app).post('/login');
      }

      const response = await request(app).post('/login');
      expect(response.status).toBe(429);
      expect(response.text).toBe('Too many login attempts. Please try again later.');
    });
  });

  describe('registrationLimiter', () => {
    it('should allow registration attempts under the limit', async () => {
      app.use(registrationLimiter);
      app.post('/register', (req, res) => res.status(200).send('Register OK'));

      for (let i = 0; i < 20; i++) {
        const response = await request(app).post('/register');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Register OK');
      }
    });

    it('should block registration attempts exceeding the limit', async () => {
      app.use(registrationLimiter);
      app.post('/register', (req, res) => res.status(200).send('Register OK'));

      for (let i = 0; i < 20; i++) {
        await request(app).post('/register');
      }

      const response = await request(app).post('/register');
      expect(response.status).toBe(429);
      expect(response.text).toBe('Too many registration attempts. Please try again later.');
    });
  });
});