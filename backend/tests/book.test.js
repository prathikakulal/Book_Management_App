// backend/tests/book.test.js
const request = require('supertest');
const app = require('../server'); // Assuming your server.js exports the app
const path = require('path');

describe('POST /api/books', () => {
  it('should create a new book with an image', async () => {
    const res = await request(app)
      .post('/api/books')
      .field('title', 'Test Book')
      .field('author', 'Test Author')
      .attach('coverImage', path.resolve(__dirname, 'test-image.png')); // Have a test image in this folder

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Book');
    expect(res.body).toHaveProperty('coverImage');
    expect(res.body.coverImage).toContain('cloudinary.com');
  });

  it('should return 500 for invalid file type', async () => {
    const res = await request(app)
      .post('/api/books')
      .field('title', 'Another Book')
      .field('author', 'Test Author')
      .attach('coverImage', path.resolve(__dirname, 'test-file.txt')); // Attach a non-image file

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toContain('File upload only supports');
  });
});