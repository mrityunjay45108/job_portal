
// Backend/models/Job.model.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Company ID is required']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  companyWebsite: {
    type: String,
    default: ''
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  locationType: {
    type: String,
    enum: ['On-site', 'Remote', 'Hybrid'],
    default: 'On-site'
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  salary: {
    type: String,
    default: 'Negotiable'
  },
  salaryMin: {
    type: Number,
    default: null
  },
  salaryMax: {
    type: Number,
    default: null
  },
  salaryType: {
    type: String,
    enum: ['yearly', 'monthly', 'hourly'],
    default: 'yearly'
  },
  experience: {
    type: String,
    default: 'Not specified'  // NOT required
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: [{
    type: String
  }],
  qualifications: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  department: {
    type: String,
    default: ''
  },
  openings: {
    type: Number,
    default: 1
  },
  skills: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'draft', 'closed'],
    default: 'active'
  },
  applicantsCount: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  urgentHiring: {
    type: Boolean,
    default: false
  },
  featuredJob: {
    type: Boolean,
    default: false
  },
  remotePolicy: {
    type: String,
    default: ''
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
jobSchema.index({ status: 1, postedDate: -1 });
jobSchema.index({ companyId: 1 });
jobSchema.index({ jobTitle: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);