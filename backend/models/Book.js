// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // This will store the URL of the image from Cloudinary
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);