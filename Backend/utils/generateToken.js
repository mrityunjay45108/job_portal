const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '5d' }
  );
};

module.exports = generateToken;