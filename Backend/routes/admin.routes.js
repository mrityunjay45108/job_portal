const express = require('express');
const router = express.Router();
const {
  adminLogin,
  setupFirstAdmin,
  getDashboardStats,
  getCandidates,
  deleteCandidate,
  getRecruiters,
  deleteRecruiter,
  getAllJobs,
  updateJob,
  deleteJob,
  getAllApplications,
  getReports,
  getServerStats,
  getDatabaseStats,
  getApiStats,
  getStorageStats,
  getActivityStats,
  getJobStatsByMonth,
  getStatusDistribution,
  exportReport,
  getAdmins,
  createAdmin,
  deleteAdmin
} = require('../controllers/admin.controller');
const { isAdminAuthenticated } = require('../middleware/adminAuth');

// Public routes
router.post('/setup', setupFirstAdmin);
router.post('/login', adminLogin);

// Protected routes (require authentication)
router.use(isAdminAuthenticated);

// Dashboard
router.get('/stats', getDashboardStats);

// Candidates
router.get('/candidates', getCandidates);
router.delete('/candidates/:id', deleteCandidate);

// Recruiters
router.get('/recruiters', getRecruiters);
router.delete('/recruiters/:id', deleteRecruiter);

// Jobs
router.get('/jobs', getAllJobs);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// Applications
router.get('/applications', getAllApplications);

// Reports
router.get('/reports', getReports);
router.get('/reports/export', exportReport);

// System Stats
router.get('/system/server-stats', getServerStats);
router.get('/system/database-stats', getDatabaseStats);
router.get('/system/api-stats', getApiStats);
router.get('/system/storage-stats', getStorageStats);
router.get('/system/activity-stats', getActivityStats);
router.get('/jobs/stats', getJobStatsByMonth);
router.get('/applications/status-distribution', getStatusDistribution);

// Admin Management Routes
router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.delete('/admins/:id', deleteAdmin);

// Companies Routes - Simple placeholders for now
router.get('/companies', (req, res) => {
  res.json({ success: true, companies: [] });
});

router.get('/companies/:id', (req, res) => {
  res.json({ success: true, company: null });
});

router.put('/companies/:id', (req, res) => {
  res.json({ success: true, message: 'Company updated' });
});

router.delete('/companies/:id', (req, res) => {
  res.json({ success: true, message: 'Company deleted' });
});

// Interviews Routes - Simple placeholders for now
router.get('/interviews', (req, res) => {
  res.json({ success: true, interviews: [] });
});

router.get('/interviews/:id', (req, res) => {
  res.json({ success: true, interview: null });
});

router.put('/interviews/:id/status', (req, res) => {
  res.json({ success: true, message: 'Status updated' });
});

router.delete('/interviews/:id', (req, res) => {
  res.json({ success: true, message: 'Interview deleted' });
});

module.exports = router;