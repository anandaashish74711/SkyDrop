// backend/routes/imageRoutes.js

const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const imageController = require('../controllers/imageController');

const router = express.Router();

// Multer configuration
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Construct the absolute path to the uploads folder in the parent directory
    const uploadDir = path.join(__dirname, '..', 'uploads');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage });

// Routes
router.post('/upload', authMiddleware, upload.single('image'), imageController.uploadImage);

module.exports = router;
