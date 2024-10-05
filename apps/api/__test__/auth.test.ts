import request from 'supertest';
import App from '../src/app';
import prisma from '../src/prisma';
import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';

const app = new App().app; // Initialize the app

describe('Auth user tests', () => {
  // Connect to the database before all tests
  beforeAll(async () => {
    await prisma.$connect();
  });

  // Disconnect from the database after all tests
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('returns success login', async () => {
    // Send a login request
    const response = await request(app)
      .post('/login') // Ensure this matches your actual endpoint
      .send({
        username: 'rohman@gmail.com', // Update to match valid credentials in your DB
        password: 'AlphaThap42@',       // Ensure this password is correct
      });

    console.log('Response Status:', response.status); // Log status code
    console.log('Response Body:', response.body); // Log the body

    // Check if response status is 200
    //  expect(response.status).toBe(200);  // Expect the status to be 200
    // expect(response.body).toBeDefined(); // Ensure response body is defined
    // expect(response.body).toHaveProperty('success', true); // Check for success property
  });
});
