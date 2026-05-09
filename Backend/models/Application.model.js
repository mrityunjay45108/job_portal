
// module.exports = mongoose.model('Application', applicationSchema);
// Backend/models/Application.model.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  candidatePhone: {
    type: String,
    required: true
  },
  // Resume fields (Cloudinary support)
  resumeUrl: {
    type: String,
    default: ''
  },
  resumeName: {
    type: String,
    default: ''
  },
  resumePublicId: {
    type: String,
    default: ''
  },
  // Application details
  coverLetter: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    default: ''
  },
  skills: {
    type: String,
    default: ''
  },
  expectedSalary: {
    type: String,
    default: ''
  },
  noticePeriod: {
    type: String,
    default: ''
  },
  // Status fields
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'interview', 'hired', 'rejected'],
    default: 'pending'
  },
  aiScore: {
    type: Number,
    default: null
  },
  feedback: {
    type: String,
    default: ''
  },
  isBookmarked: {
    type: Boolean,
    default: false
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
applicationSchema.index({ jobId: 1, candidateId: 1 });
applicationSchema.index({ candidateId: 1 });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);