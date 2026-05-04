// const express = require('express');
// const router = express.Router();
// const {
//   getAllJobs,
//   getJobById,
//   createJob,
//   getMyJobs,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// } = require('../controllers/job.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // Public routes
// router.get('/', getAllJobs);
// router.get('/:id', getJobById);

// // Recruiter only routes
// router.post('/', isAuthenticated, authorize('recruiter'), createJob);
// router.get('/my-jobs', isAuthenticated, authorize('recruiter'), getMyJobs);
// router.put('/:id', isAuthenticated, authorize('recruiter'), updateJob);
// router.delete('/:id', isAuthenticated, authorize('recruiter'), deleteJob);
// router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateJobStatus);

// module.exports = router;


// // Backend/routes/job.routes.js
// const express = require('express');
// const router = express.Router();
// const {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// } = require('../controllers/job.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // Public routes
// router.get('/active', getAllActiveJobs);
// router.get('/:id', getJobById);

// // Recruiter routes
// router.post('/', isAuthenticated, authorize('recruiter'), createJob);
// router.get('/recruiter/jobs', isAuthenticated, authorize('recruiter'), getRecruiterJobs);
// router.put('/:id', isAuthenticated, authorize('recruiter'), updateJob);
// router.delete('/:id', isAuthenticated, authorize('recruiter'), deleteJob);
// router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateJobStatus);

// module.exports = router;

// // Backend/routes/job.routes.js
// const express = require('express');
// const router = express.Router();
// const {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// } = require('../controllers/job.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // Public routes
// router.get('/active', getAllActiveJobs);
// router.get('/:id', getJobById);

// // Recruiter routes
// router.post('/', isAuthenticated, authorize('recruiter'), createJob);
// router.get('/recruiter/jobs', isAuthenticated, authorize('recruiter'), getRecruiterJobs);
// router.put('/:id', isAuthenticated, authorize('recruiter'), updateJob);
// router.delete('/:id', isAuthenticated, authorize('recruiter'), deleteJob);
// router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateJobStatus);

// // Test route (remove after testing)
// router.post('/test', (req, res) => {
//   console.log('Test body:', req.body);
//   res.json({ received: req.body, timestamp: new Date() });
// });

// module.exports = router;



// // Backend/routes/job.routes.js
// const express = require('express');
// const router = express.Router();
// const {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// } = require('../controllers/job.controller');
// const { isAuthenticated, authorize } = require('../middleware/isAuthenticated');

// // ==================== TEST ROUTES ====================
// // Public test route (no auth required)
// router.post('/test-public', (req, res) => {
//   console.log('🔍 TEST-PUBLIC - Received body:', JSON.stringify(req.body, null, 2));
//   res.json({ 
//     success: true, 
//     message: 'Public test endpoint working',
//     received: req.body,
//     timestamp: new Date().toISOString()
//   });
// });

// // Authenticated test route (requires token)
// router.post('/test-auth', isAuthenticated, (req, res) => {
//   console.log('🔍 TEST-AUTH - Received body:', JSON.stringify(req.body, null, 2));
//   console.log('🔍 TEST-AUTH - User ID:', req.userId);
//   console.log('🔍 TEST-AUTH - User Role:', req.userRole);
//   res.json({ 
//     success: true, 
//     message: 'Authenticated test endpoint working',
//     received: req.body,
//     user: { id: req.userId, role: req.userRole },
//     timestamp: new Date().toISOString()
//   });
// });

// // ==================== PUBLIC ROUTES ====================
// // Get all active jobs (no auth required)
// router.get('/active', getAllActiveJobs);
// // Get job by ID (no auth required)
// router.get('/:id', getJobById);

// // ==================== RECRUITER ROUTES ====================
// // Create a new job (recruiter only)
// router.post('/', isAuthenticated, authorize('recruiter'), createJob);
// // Get recruiter's jobs (recruiter only)
// router.get('/recruiter/jobs', isAuthenticated, authorize('recruiter'), getRecruiterJobs);
// // Update job (recruiter only)
// router.put('/:id', isAuthenticated, authorize('recruiter'), updateJob);
// // Delete job (recruiter only)
// router.delete('/:id', isAuthenticated, authorize('recruiter'), deleteJob);
// // Update job status (recruiter only)
// router.patch('/:id/status', isAuthenticated, authorize('recruiter'), updateJobStatus);

// module.exports = router;


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

// ==================== PUBLIC ROUTES ====================
// Get all active jobs (no auth required)
router.get('/active', getAllActiveJobs);
// Get job by ID (no auth required)
router.get('/:id', getJobById);

// ==================== RECRUITER ROUTES ====================
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