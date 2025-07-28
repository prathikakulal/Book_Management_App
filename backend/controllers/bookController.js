const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary');

exports.createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    let coverImageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'book-covers',
        width: 400,
        crop: "scale"
      });
      coverImageUrl = result.secure_url;
    }

    const newBook = new Book({
      title,
      author,
      coverImage: coverImageUrl,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};
