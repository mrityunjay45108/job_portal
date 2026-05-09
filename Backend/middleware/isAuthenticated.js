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