// const express = require('express');
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   getCurrentUser, 
//   updateProfile,
//   getUserProfile,
//   updateUserProfile,
//   uploadAvatar,
//   uploadResume
// } = require('../controllers/user.controller');
// const { isAuthenticated } = require('../middleware/isAuthenticated');
// const multer = require('multer');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = 'uploads/';
//     if (!require('fs').existsSync(uploadDir)) {
//       require('fs').mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.fieldname === 'avatar') {
//     const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (allowedTypes.includes(ext)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPG, PNG, GIF, WEBP are allowed.'));
//     }
//   } else if (file.fieldname === 'resume') {
//     const allowedTypes = ['.pdf', '.doc', '.docx'];
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (allowedTypes.includes(ext)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only PDF, DOC, DOCX are allowed.'));
//     }
//   } else {
//     cb(new Error('Invalid file field'));
//   }
// };

// const upload = multer({ 
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// // --------------------- PUBLIC ROUTES -------------------------
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile/:userId', getUserProfile);  // Public route to view profile

// // --------------------- PROTECTED ROUTES --------------------
// // Add this route BEFORE the /me route if using :userId
// router.get('/profile/:userId', getUserProfile);
// router.get('/me', isAuthenticated, getCurrentUser);
// router.put('/profile', isAuthenticated, updateProfile);
// router.put('/profile/:userId', isAuthenticated, updateUserProfile);
// router.post('/avatar', isAuthenticated, upload.single('avatar'), uploadAvatar);
// router.post('/resume', isAuthenticated, upload.single('resume'), uploadResume);

// module.exports = router;





const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateProfile,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  uploadResume
} = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'avatar') {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, GIF, WEBP are allowed.'));
    }
  } else if (file.fieldname === 'resume') {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX are allowed.'));
    }
  } else {
    cb(new Error('Invalid file field'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ==================== PUBLIC ROUTES ====================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:userId', getUserProfile);  // ✅ Public route - only once

// ==================== PROTECTED ROUTES ====================
router.get('/me', isAuthenticated, getCurrentUser);
router.put('/profile', isAuthenticated, updateProfile);
router.put('/profile/:userId', isAuthenticated, updateUserProfile);
router.post('/avatar', isAuthenticated, upload.single('avatar'), uploadAvatar);
router.post('/resume', isAuthenticated, upload.single('resume'), uploadResume);

module.exports = router;