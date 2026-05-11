// Backend/controllers/job.controller.js
const Job = require('../models/Job.model');

// @desc    Create a new job
const createJob = async (req, res) => {
  try {
    console.log('Create Job Request Body:', req.body);
    
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