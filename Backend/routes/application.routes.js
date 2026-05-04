// // Backend/routes/application.routes.js
// const express = require('express');
// const router = express.Router();
// const {
//   applyForJob,
//   getMyApplications,
//   getRecruiterApplications,
//   updateApplicationStatus,
//   toggleBookmark
// } = require('../controllers/application.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // Candidate routes
// router.post('/apply', isAuthenticated, authorize('candidate'), applyForJob);
// router.get('/my-applications', isAuthenticated, authorize('candidate'), getMyApplications);

// // Recruiter routes
// router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterApplications);
// router.put('/:id/status', isAuthenticated, authorize('recruiter'), updateApplicationStatus);
// router.patch('/:id/bookmark', isAuthenticated, authorize('recruiter'), toggleBookmark);

// module.exports = router;

// // Backend/routes/application.routes.js
// const express = require('express');
// const router = express.Router();
// const {
//   applyForJob,
//   getMyApplications,
//   getRecruiterApplications,
//   getApplicationById,
//   updateApplicationStatus,
//   toggleBookmark,
//   withdrawApplication  // Added withdrawApplication
// } = require('../controllers/application.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // ==================== CANDIDATE ROUTES ====================
// // Apply for a job
// router.post('/apply', isAuthenticated, authorize('candidate'), applyForJob);

// // Get my applications (candidate view)
// router.get('/my-applications', isAuthenticated, authorize('candidate'), getMyApplications);

// // Withdraw an application (candidate)
// router.delete('/:id/withdraw', isAuthenticated, authorize('candidate'), withdrawApplication);

// // ==================== RECRUITER ROUTES ====================
// // Get all applications for recruiter's jobs
// router.get('/recruiter', isAuthenticated, authorize('recruiter'), getRecruiterApplications);

// // Get single application by ID (both candidate and recruiter can access with proper authorization)
// router.get('/:id', isAuthenticated, getApplicationById);

// // Update application status (shortlist, interview, hire, reject)
// router.put('/:id/status', isAuthenticated, authorize('recruiter'), updateApplicationStatus);

// // Toggle bookmark for application
// router.patch('/:id/bookmark', isAuthenticated, authorize('recruiter'), toggleBookmark);

// module.exports = router;




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