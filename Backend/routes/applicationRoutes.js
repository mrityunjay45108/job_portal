const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus
} = require('../controllers/application.controller');
const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// Candidate routes
router.post('/apply', isAuthenticated, authorize('candidate'), applyForJob);
router.get('/my-applications', isAuthenticated, authorize('candidate'), getMyApplications);

// Recruiter routes
router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterApplications);
router.put('/:id/status', isAuthenticated, authorize('recruiter'), updateApplicationStatus);

module.exports = router;