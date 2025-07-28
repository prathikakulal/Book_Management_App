const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../middleware/uploadMiddleware');
router.get('/', bookController.getBooks);

router.post('/', upload.single('coverImage'), bookController.createBook);


module.exports = router;