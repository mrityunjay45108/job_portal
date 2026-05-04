// const jwt = require('jsonwebtoken');

// const generateToken = (userId, role) => {
//   return jwt.sign(
//     { id: userId, role: role },
//     process.env.JWT_SECRET || 'your_jwt_secret_key',
//     { expiresIn: '7d' }
//   );
// };

// module.exports = generateToken;


// Backend/utils/generateToken.js
// Backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role: role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;