const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateProfile 
} = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/me', isAuthenticated, getCurrentUser);
router.put('/profile', isAuthenticated, updateProfile);

module.exports = router;