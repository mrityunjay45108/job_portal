// Backend/routes/job.routes.js
const express = require('express');
const router = express.Router();
const {
  createJob,
  getRecruiterJobs,
  getAllActiveJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus
} = require('../controllers/job.controller');
const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');
// ---------------------- PUBLIC ROUTES ---------------------
// Get all active jobs (no auth required)
router.get('/active', getAllActiveJobs);
// Get job by ID (no auth required)
router.get('/:id', getJobById);
// -------------------- RECRUITER ROUTES -----------------------
// Create a new job (recruiter only)
router.post('/', isAuthenticated, authorize('recruiter'), createJob);
// Get recruiter's jobs (recruiter only)
router.get('/recruiter/jobs', isAuthenticated, authorize('recruiter'), getRecruiterJobs);
// Update job (recruiter only)
router.put('/:id', isAuthenticated, authorize('recruiter'), updateJob);
// Delete job (recruiter only)
router.delete('/:id', isAuthenticated, authorize('recruiter'), deleteJob);
// Update job status (recruiter only)
router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateJobStatus);

module.exports = router;