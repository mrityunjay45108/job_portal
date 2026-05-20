// backend/routes/chat.routes.js
const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chat.controller');

// Public route - no authentication required
router.post('/message', getChatResponse);

module.exports = router;