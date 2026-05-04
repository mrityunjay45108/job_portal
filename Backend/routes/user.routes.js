// // Backend/routes/user.routes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   getCurrentUser, 
//   updateProfile 
// } = require('../controllers/user.controller');
// const { isAuthenticated } = require('../middleware/isAuthenticated');

// // Public routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Protected routes (require authentication)
// router.get('/me', isAuthenticated, getCurrentUser);
// router.put('/profile', isAuthenticated, updateProfile);

// module.exports = router;


// Backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateProfile 
} = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes are working!' });
});

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', isAuthenticated, getCurrentUser);
router.put('/profile', isAuthenticated, updateProfile);

module.exports = router;