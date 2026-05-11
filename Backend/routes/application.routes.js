// Backend/routes/application.routes.js
const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  getApplicationById,
  updateApplicationStatus,
  toggleBookmark,
  withdrawApplication
} = require('../controllers/application.controller');
const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// Candidate routes
router.post('/apply', isAuthenticated, authorize('candidate'), applyForJob);
router.get('/my-applications', isAuthenticated, authorize('candidate'), getMyApplications);
router.delete('/:id/withdraw', isAuthenticated, authorize('candidate'), withdrawApplication);

// Recruiter routes
router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterApplications);
router.get('/:id', isAuthenticated, getApplicationById);
router.put('/:id/status', isAuthenticated, authorize('recruiter'), updateApplicationStatus);
router.patch('/:id/bookmark', isAuthenticated, authorize('recruiter'), toggleBookmark);

module.exports = router;