// // const Job = require('../models/Job.model');

// // // @desc    Get all jobs
// // const getAllJobs = async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ status: 'active' }).sort({ postedDate: -1 });
// //     res.json({ success: true, jobs });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Get single job
// // const getJobById = async (req, res) => {
// //   try {
// //     const job = await Job.findById(req.params.id);
// //     if (!job) {
// //       return res.status(404).json({ success: false, message: 'Job not found' });
// //     }
// //     res.json({ success: true, job });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Create a job
// // const createJob = async (req, res) => {
// //   try {
// //     const jobData = {
// //       ...req.body,
// //       companyId: req.userId,
// //       postedDate: new Date()
// //     };
// //     const job = await Job.create(jobData);
// //     res.status(201).json({ success: true, job });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Get recruiter's jobs
// // const getMyJobs = async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ companyId: req.userId });
// //     res.json({ success: true, jobs });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Update job
// // const updateJob = async (req, res) => {
// //   try {
// //     const job = await Job.findOneAndUpdate(
// //       { _id: req.params.id, companyId: req.userId },
// //       req.body,
// //       { new: true }
// //     );
// //     if (!job) {
// //       return res.status(404).json({ success: false, message: 'Job not found' });
// //     }
// //     res.json({ success: true, job });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Delete job
// // const deleteJob = async (req, res) => {
// //   try {
// //     const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.userId });
// //     if (!job) {
// //       return res.status(404).json({ success: false, message: 'Job not found' });
// //     }
// //     res.json({ success: true, message: 'Job deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // // @desc    Update job status
// // const updateJobStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     const job = await Job.findOneAndUpdate(
// //       { _id: req.params.id, companyId: req.userId },
// //       { status },
// //       { new: true }
// //     );
// //     if (!job) {
// //       return res.status(404).json({ success: false, message: 'Job not found' });
// //     }
// //     res.json({ success: true, job });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // module.exports = {
// //   getAllJobs,
// //   getJobById,
// //   createJob,
// //   getMyJobs,
// //   updateJob,
// //   deleteJob,
// //   updateJobStatus
// // };


// // Backend/controllers/job.controller.js
// const Job = require('../models/Job.model');

// // @desc    Create a new job
// const createJob = async (req, res) => {
//   try {
//     const jobData = {
//       ...req.body,
//       companyId: req.userId,
//       companyName: req.user.fullName || 'Company'
//     };
    
//     const job = await Job.create(jobData);
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
//   } catch (error) {
//     console.error('Create job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get all jobs for recruiter
// const getRecruiterJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ companyId: req.userId }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get all active jobs for candidates
// const getAllActiveJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get job by ID
// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     // Increment views
//     await Job.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
//     res.json({
//       success: true,
//       job
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job
// const updateJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       req.body,
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job updated successfully',
//       job
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Delete job
// const deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.userId });
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job deleted successfully'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job status
// const updateJobStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       { status },
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: `Job ${status === 'active' ? 'published' : 'archived'} successfully`,
//       job
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// };



// // Backend/controllers/job.controller.js
// const Job = require('../models/Job.model');

// // @desc    Create a new job
// // @route   POST /api/jobs
// // @access  Private (Recruiter only)
// const createJob = async (req, res) => {
//   try {
//     console.log('📝 Create Job Request:');
//     console.log('Body:', req.body);
//     console.log('User ID:', req.userId);
//     console.log('User Role:', req.userRole);
    
//     // Check if user is authenticated
//     if (!req.userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: Please login'
//       });
//     }
    
//     // Check if user is recruiter
//     if (req.userRole !== 'recruiter') {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Only recruiters can post jobs'
//       });
//     }
    
//     // Validate required fields
//     if (!req.body.jobTitle) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job title is required'
//       });
//     }
    
//     if (!req.body.companyName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Company name is required'
//       });
//     }
    
//     if (!req.body.location) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location is required'
//       });
//     }
    
//     if (!req.body.description) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job description is required'
//       });
//     }
    
//     // Create job data
//     const jobData = {
//       companyId: req.userId,
//       companyName: req.body.companyName,
//       jobTitle: req.body.jobTitle,
//       location: req.body.location,
//       salary: req.body.salary || 'Negotiable',
//       jobType: req.body.jobType || 'Full-time',
//       experience: req.body.experience || 'Not specified',
//       description: req.body.description,
//       skills: req.body.skills || [],
//       status: 'active',
//       urgentHiring: req.body.urgentHiring || false,
//       postedDate: new Date()
//     };
    
//     const job = await Job.create(jobData);
    
//     console.log('✅ Job created successfully:', job._id);
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
    
//   } catch (error) {
//     console.error('❌ Create job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to create job'
//     });
//   }
// };

// // @desc    Get all jobs for recruiter
// // @route   GET /api/jobs/recruiter/jobs
// // @access  Private (Recruiter only)
// const getRecruiterJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ companyId: req.userId }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     console.error('Get recruiter jobs error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get all active jobs for candidates
// // @route   GET /api/jobs/active
// // @access  Public
// const getAllActiveJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     console.error('Get active jobs error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get job by ID
// // @route   GET /api/jobs/:id
// // @access  Public
// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     // Increment views
//     await Job.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
//     res.json({
//       success: true,
//       job
//     });
//   } catch (error) {
//     console.error('Get job by id error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job
// // @route   PUT /api/jobs/:id
// // @access  Private (Recruiter only)
// const updateJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       req.body,
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job updated successfully',
//       job
//     });
//   } catch (error) {
//     console.error('Update job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Delete job
// // @route   DELETE /api/jobs/:id
// // @access  Private (Recruiter only)
// const deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.userId });
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job status
// // @route   PATCH /api/jobs/:id/status
// // @access  Private (Recruiter only)
// const updateJobStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       { status },
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: `Job ${status === 'active' ? 'published' : 'archived'} successfully`,
//       job
//     });
//   } catch (error) {
//     console.error('Update job status error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// };

// Backend/controllers/job.controller.js
// const Job = require('../models/Job.model');

// // @desc    Create a new job
// // @route   POST /api/jobs
// // @access  Private (Recruiter only)
// const createJob = async (req, res) => {
//   try {
//     console.log('📝 Create Job Request:');
//     console.log('User:', req.user); // Should now have full user object
//     console.log('User ID:', req.userId);
//     console.log('User Role:', req.userRole);
//     console.log('Body:', req.body);
    
//     // Check if user is authenticated
//     if (!req.userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: Please login'
//       });
//     }
    
//     // Check if user is recruiter
//     if (req.userRole !== 'recruiter') {
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Only recruiters can post jobs'
//       });
//     }
    
//     // Validate required fields
//     if (!req.body.jobTitle) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job title is required'
//       });
//     }
    
//     if (!req.body.companyName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Company name is required'
//       });
//     }
    
//     if (!req.body.location) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location is required'
//       });
//     }
    
//     if (!req.body.description) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job description is required'
//       });
//     }
    
//     // Get company name from either request body or user profile
//     const companyName = req.body.companyName || req.user?.profile?.company || req.user?.fullName || 'Company';
    
//     // Create job data
//     const jobData = {
//       companyId: req.userId,
//       companyName: companyName,
//       jobTitle: req.body.jobTitle,
//       location: req.body.location,
//       salary: req.body.salary || 'Negotiable',
//       jobType: req.body.jobType || 'Full-time',
//       experience: req.body.experience || 'Not specified',
//       description: req.body.description,
//       skills: req.body.skills || [],
//       status: 'active',
//       urgentHiring: req.body.urgentHiring || false,
//       postedDate: new Date()
//     };
    
//     const job = await Job.create(jobData);
    
//     console.log('✅ Job created successfully:', job._id);
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
    
//   } catch (error) {
//     console.error('❌ Create job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to create job'
//     });
//   }
// };

// // ... rest of your controller functions remain the same



// Backend/controllers/job.controller.js
// const Job = require('../models/Job.model');

// // @desc    Create a new job
// // @route   POST /api/jobs
// // @access  Private (Recruiter only)
// const createJob = async (req, res) => {
//   try {
//     console.log('📝 Create Job Request:');
//     console.log('Body:', req.body);
//     console.log('User ID:', req.userId);
//     console.log('User Role:', req.userRole);
    
//     // ✅ Don't try to access req.user.fullName - it might not exist
//     // Use companyName from request body instead
    
//     // Validate required fields
//     if (!req.body.jobTitle) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job title is required'
//       });
//     }
    
//     if (!req.body.companyName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Company name is required'
//       });
//     }
    
//     if (!req.body.location) {
//       return res.status(400).json({
//         success: false,
//         message: 'Location is required'
//       });
//     }
    
//     if (!req.body.description) {
//       return res.status(400).json({
//         success: false,
//         message: 'Job description is required'
//       });
//     }
    
//     // Create job data - use companyName from request body directly
//     const jobData = {
//       companyId: req.userId,
//       companyName: req.body.companyName,  // ✅ Use from request body
//       jobTitle: req.body.jobTitle,
//       location: req.body.location,
//       salary: req.body.salary || 'Negotiable',
//       jobType: req.body.jobType || 'Full-time',
//       experience: req.body.experience || 'Not specified',
//       description: req.body.description,
//       skills: req.body.skills || [],
//       status: 'active',
//       urgentHiring: req.body.urgentHiring || false,
//       postedDate: new Date()
//     };
    
//     const job = await Job.create(jobData);
    
//     console.log('✅ Job created successfully:', job._id);
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
    
//   } catch (error) {
//     console.error('❌ Create job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to create job'
//     });
//   }
// };

// // @desc    Get all jobs for recruiter
// // @route   GET /api/jobs/recruiter/jobs
// // @access  Private (Recruiter only)
// const getRecruiterJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ companyId: req.userId }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     console.error('Get recruiter jobs error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get all active jobs for candidates
// // @route   GET /api/jobs/active
// // @access  Public
// const getAllActiveJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       jobs
//     });
//   } catch (error) {
//     console.error('Get active jobs error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get job by ID
// // @route   GET /api/jobs/:id
// // @access  Public
// const getJobById = async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     // Increment views
//     await Job.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
//     res.json({
//       success: true,
//       job
//     });
//   } catch (error) {
//     console.error('Get job by id error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job
// // @route   PUT /api/jobs/:id
// // @access  Private (Recruiter only)
// const updateJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       req.body,
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job updated successfully',
//       job
//     });
//   } catch (error) {
//     console.error('Update job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Delete job
// // @route   DELETE /api/jobs/:id
// // @access  Private (Recruiter only)
// const deleteJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.userId });
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Job deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete job error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update job status
// // @route   PATCH /api/jobs/:id/status
// // @access  Private (Recruiter only)
// const updateJobStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, companyId: req.userId },
//       { status },
//       { new: true }
//     );
    
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: `Job ${status === 'active' ? 'published' : 'archived'} successfully`,
//       job
//     });
//   } catch (error) {
//     console.error('Update job status error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   createJob,
//   getRecruiterJobs,
//   getAllActiveJobs,
//   getJobById,
//   updateJob,
//   deleteJob,
//   updateJobStatus
// };


// // Backend/controllers/job.controller.js
// const createJob = async (req, res) => {
//   try {
//     console.log('='.repeat(50));
//     console.log('📝 CREATE JOB REQUEST');
//     console.log('='.repeat(50));
//     console.log('Headers:', req.headers);
//     console.log('User ID:', req.userId);
//     console.log('User Role:', req.userRole);
//     console.log('Request Body:', JSON.stringify(req.body, null, 2));
    
//     // Check if user is authenticated
//     if (!req.userId) {
//       console.log('❌ No user ID found');
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized: Please login'
//       });
//     }
    
//     // Check if user is recruiter
//     if (req.userRole !== 'recruiter') {
//       console.log('❌ User is not recruiter. Role:', req.userRole);
//       return res.status(403).json({
//         success: false,
//         message: 'Forbidden: Only recruiters can post jobs'
//       });
//     }
    
//     // Extract data from request body
//     const {
//       jobTitle,
//       companyName,
//       location,
//       description,
//       jobType,
//       experience,
//       skills,
//       urgentHiring,
//       salary,
//       locationType,
//       companyWebsite,
//       responsibilities,
//       qualifications,
//       benefits,
//       remotePolicy,
//       salaryMin,
//       salaryMax,
//       salaryType
//     } = req.body;
    
//     // Validate required fields with detailed messages
//     if (!jobTitle) {
//       console.log('❌ Missing jobTitle');
//       return res.status(400).json({
//         success: false,
//         message: 'Job title is required'
//       });
//     }
    
//     if (!companyName) {
//       console.log('❌ Missing companyName');
//       return res.status(400).json({
//         success: false,
//         message: 'Company name is required'
//       });
//     }
    
//     if (!location) {
//       console.log('❌ Missing location');
//       return res.status(400).json({
//         success: false,
//         message: 'Location is required'
//       });
//     }
    
//     if (!description) {
//       console.log('❌ Missing description');
//       return res.status(400).json({
//         success: false,
//         message: 'Job description is required'
//       });
//     }
    
//     // Prepare job data
//     const jobData = {
//       companyId: req.userId,
//       companyName: companyName,
//       jobTitle: jobTitle,
//       location: location,
//       description: description,
//       jobType: jobType || 'Full-time',
//       experience: experience || 'Not specified',
//       skills: Array.isArray(skills) ? skills : [],
//       urgentHiring: urgentHiring || false,
//       salary: salary || 'Negotiable',
//       locationType: locationType || 'On-site',
//       companyWebsite: companyWebsite || '',
//       responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
//       qualifications: Array.isArray(qualifications) ? qualifications : [],
//       benefits: Array.isArray(benefits) ? benefits : [],
//       remotePolicy: remotePolicy || '',
//       salaryMin: salaryMin || null,
//       salaryMax: salaryMax || null,
//       salaryType: salaryType || 'yearly',
//       status: 'active',
//       postedDate: new Date()
//     };
    
//     console.log('📦 Job Data being saved:', JSON.stringify(jobData, null, 2));
    
//     const job = await Job.create(jobData);
    
//     console.log('✅ Job created successfully! ID:', job._id);
//     console.log('='.repeat(50));
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
    
//   } catch (error) {
//     console.error('❌ CREATE JOB ERROR:', error);
//     console.error('Error name:', error.name);
//     console.error('Error message:', error.message);
    
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       console.error('Validation errors:', messages);
//       return res.status(400).json({
//         success: false,
//         message: messages.join(', ')
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to create job'
//     });
//   }
// };



// const createJob = async (req, res) => {
//   try {
//     console.log('📝 Received body:', JSON.stringify(req.body, null, 2));
    
//     // Check if user is recruiter
//     if (req.userRole !== 'recruiter') {
//       return res.status(403).json({
//         success: false,
//         message: 'Only recruiters can post jobs'
//       });
//     }
    
//     // Validate required fields
//     const required = ['jobTitle', 'companyName', 'location', 'description'];
//     for (const field of required) {
//       if (!req.body[field]) {
//         console.log(`❌ Missing required field: ${field}`);
//         return res.status(400).json({
//           success: false,
//           message: `${field} is required`
//         });
//       }
//     }
    
//     const jobData = {
//       companyId: req.userId,
//       companyName: req.body.companyName,
//       jobTitle: req.body.jobTitle,
//       location: req.body.location,
//       description: req.body.description,
//       jobType: req.body.jobType || 'Full-time',
//       experience: req.body.experience || 'Not specified',
//       skills: req.body.skills || [],
//       salary: req.body.salary || 'Negotiable',
//       urgentHiring: req.body.urgentHiring || false,
//       status: 'active'
//     };
    
//     console.log('📦 Creating job with:', JSON.stringify(jobData, null, 2));
    
//     const job = await Job.create(jobData);
    
//     console.log('✅ Job created:', job._id);
    
//     res.status(201).json({
//       success: true,
//       message: 'Job posted successfully',
//       job
//     });
    
//   } catch (error) {
//     console.error('❌ Error details:', error);
    
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({
//         success: false,
//         message: messages.join(', ')
//       });
//     }
    
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };


// Backend/controllers/job.controller.js
const Job = require('../models/Job.model');

// @desc    Create a new job
const createJob = async (req, res) => {
  try {
    console.log('📝 Create Job Request Body:', req.body);
    
    // Check if user is recruiter
    if (req.userRole !== 'recruiter') {
      return res.status(403).json({
        success: false,
        message: 'Only recruiters can post jobs'
      });
    }
    
    const jobData = {
      companyId: req.userId,
      companyName: req.body.companyName,
      jobTitle: req.body.jobTitle,
      location: req.body.location,
      description: req.body.description,
      jobType: req.body.jobType || 'Full-time',
      experience: req.body.experience || 'Not specified',
      salary: req.body.salary || 'Negotiable',
      skills: req.body.skills || [],
      urgentHiring: req.body.urgentHiring || false,
      status: 'active'
    };
    
    const job = await Job.create(jobData);
    
    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      job
    });
    
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all jobs for recruiter
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.userId }).sort({ createdAt: -1 });
    res.json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error('Get recruiter jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all active jobs for candidates
const getAllActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error('Get active jobs error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Increment views
    await Job.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    res.json({
      success: true,
      job
    });
  } catch (error) {
    console.error('Get job by id error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, companyId: req.userId },
      req.body,
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, companyId: req.userId });
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update job status
const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, companyId: req.userId },
      { status },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      message: `Job ${status === 'active' ? 'published' : 'archived'} successfully`,
      job
    });
  } catch (error) {
    console.error('Update job status error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createJob,
  getRecruiterJobs,
  getAllActiveJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus
};