// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({}); // Use memory storage or temporary disk storage

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const mimetype = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: File upload only supports the following filetypes - ' + allowedFileTypes), false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: fileFilter,
});

module.exports = upload;