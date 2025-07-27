// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/uploadMiddleware');
router.get('/', bookController.getBooks);

// Add middleware to the creation route
router.post('/', upload.single('coverImage'), bookController.createBook);

// ... other routes (GET, PUT, DELETE)
// For updating a book with a new image, the PUT route would be similar:
// router.put('/:id', upload.single('coverImage'), bookController.updateBook);

module.exports = router;