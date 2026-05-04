// const jwt = require('jsonwebtoken');
// const User = require('../models/User.model');

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
    
//     if (!token) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'No token provided. Please login.' 
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     req.user = user;
//     req.userId = user._id;
//     req.userRole = user.role;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid token' 
//       });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Token expired. Please login again.' 
//       });
//     }
//     res.status(500).json({ 
//       success: false, 
//       message: 'Authentication error' 
//     });
//   }
// };

// // Add authorize function
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ 
//         success: false, 
//         message: `Access denied. ${roles.join(' or ')} role required.` 
//       });
//     }
//     next();
//   };
// };

// module.exports = { isAuthenticated, authorize };


// Backend/middleware/isAuthenticated.js
// const jwt = require('jsonwebtoken');

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: No token provided'
//       });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
//     req.userId = decoded.id;
//     req.userRole = decoded.role;
    
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized: Invalid token'
//     });
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.userRole)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You do not have permission'
//       });
//     }
//     next();
//   };
// };

// module.exports = { isAuthenticated, authorize };


// // Backend/middleware/isAuthenticated.js
// const jwt = require('jsonwebtoken');

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: No token provided'
//       });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
//     req.userId = decoded.id;
//     req.userRole = decoded.role;
    
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized: Invalid token'
//     });
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.userRole)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You do not have permission'
//       });
//     }
//     next();
//   };
// };

// module.exports = { isAuthenticated, authorize };


// // Backend/middleware/isAuthenticated.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User.model');

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: No token provided'
//       });
//     }
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    
//     // ✅ IMPORTANT: Fetch the full user object from database
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: User not found'
//       });
//     }
    
//     // Attach user info to request
//     req.userId = decoded.id;
//     req.userRole = user.role;
//     req.user = user; // ✅ This is the important part - attach full user object
    
//     next();
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized: Invalid token'
//     });
//   }
// };

// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.userRole)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: You do not have permission'
//       });
//     }
//     next();
//   };
// };

// module.exports = { isAuthenticated, authorize };




// Backend/middleware/isAuthenticated.js
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    
    // Attach user info to request
    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    // Note: req.user is NOT set here to avoid database call
    // Use req.userId and req.userRole instead
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission'
      });
    }
    next();
  };
};

module.exports = { isAuthenticated, authorize };