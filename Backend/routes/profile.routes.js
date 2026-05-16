const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, uploadAvatar, uploadResume } = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!require('fs').existsSync(uploadDir)) {
      require('fs').mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Public route
router.get('/profile/:userId', getUserProfile);

// Protected routes
router.put('/profile/:userId', isAuthenticated, updateUserProfile);
router.post('/avatar', isAuthenticated, upload.single('avatar'), uploadAvatar);
router.post('/resume', isAuthenticated, upload.single('resume'), uploadResume);

module.exports = router;