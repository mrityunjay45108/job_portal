// Backend/routes/interview.routes.js
const express = require('express');
const router = express.Router();
const {
  scheduleInterview,
  getRecruiterInterviews,
  updateInterviewStatus
} = require('../controllers/interview.controller');
const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

router.post('/', isAuthenticated, authorize('recruiter'), scheduleInterview);
router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterInterviews);
router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateInterviewStatus);

module.exports = router;