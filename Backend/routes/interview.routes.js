// Backend/routes/interview.routes.js
const express = require('express');
const router = express.Router();
const {
  // Regular Interview Functions
  scheduleInterview,
  getRecruiterInterviews,
  getCandidateInterviews,
  updateInterviewStatus,
  // AI Interview Functions
  generateInterviewQuestions,
  analyzeAnswer,
  scheduleAIInterview,
  saveAIInterviewResults
} = require('../controllers/interview.controller');
const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// -------------------------- REGULAR INTERVIEW ROUTES -------------------------
// Recruiter routes
router.post('/', isAuthenticated, authorize('recruiter'), scheduleInterview);
router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterInterviews);
router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateInterviewStatus);

// Candidate routes for viewing interviews
router.get('/candidate', isAuthenticated, authorize('candidate'), getCandidateInterviews);

// --------------------- AI INTERVIEW ROUTES ----------------------
// AI Interview (Candidate only - Practice Mode)
router.post('/generate-questions', isAuthenticated, authorize('candidate'), generateInterviewQuestions);
router.post('/analyze-answer', isAuthenticated, authorize('candidate'), analyzeAnswer);
router.post('/schedule-ai', isAuthenticated, authorize('candidate'), scheduleAIInterview);
router.post('/save-results', isAuthenticated, authorize('candidate'), saveAIInterviewResults);

module.exports = router;