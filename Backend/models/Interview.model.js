// Backend/models/Interview.model.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  // ==================== BASIC INFORMATION ====================
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  
  // ==================== CANDIDATE DETAILS ====================
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
    default: ''
  },
  
  // ==================== RECRUITER DETAILS ====================
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiterName: {
    type: String,
    default: ''
  },
  
  // ==================== SCHEDULING DETAILS ====================
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 60,
    description: 'Duration in minutes'
  },
  
  // ==================== INTERVIEW MODE ====================
  mode: {
    type: String,
    enum: ['online', 'offline', 'phone', 'ai'],
    default: 'online'
  },
  link: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  
  // ==================== ADDITIONAL NOTES ====================
  notes: {
    type: String,
    default: ''
  },
  
  // ==================== STATUS ====================
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'ai_practice', 'ai_completed'],
    default: 'scheduled'
  },
  
  // ==================== FEEDBACK & RATING ====================
  feedback: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  
  // ==================== REMINDERS ====================
  reminderSent: {
    type: Boolean,
    default: false
  },
  meetingId: {
    type: String,
    default: ''
  },
  
  // ==================== AI INTERVIEW SPECIFIC FIELDS ====================
  isAIMode: {
    type: Boolean,
    default: false
  },
  aiQuestions: [{
    question: String,
    type: String,
    difficulty: String,
    expectedKeywords: [String]
  }],
  aiAnswers: [String],
  aiAnalyses: [{
    score: Number,
    feedback: String,
    missingKeywords: [String],
    improvement: String
  }],
  aiTotalScore: {
    type: Number,
    default: null
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// ==================== INDEXES FOR BETTER QUERY PERFORMANCE ====================
// Index for recruiter's interviews
interviewSchema.index({ recruiterId: 1, date: 1 });

// Index for candidate's interviews
interviewSchema.index({ candidateId: 1, date: 1 });

// Index for job interviews
interviewSchema.index({ jobId: 1 });

// Index for status and date queries
interviewSchema.index({ status: 1, date: 1 });

// Index for upcoming interviews (common query)
interviewSchema.index({ status: 'scheduled', date: 1 });

// Compound index for recruiter's upcoming interviews
interviewSchema.index({ recruiterId: 1, status: 'scheduled', date: 1 });

// Index for AI mode interviews
interviewSchema.index({ isAIMode: 1 });

// Index for completed AI interviews
interviewSchema.index({ isAIMode: 1, status: 'ai_completed' });

// ==================== INSTANCE METHODS ====================

// Check if interview is upcoming
interviewSchema.methods.isUpcoming = function() {
  const interviewDateTime = new Date(`${this.date}T${this.time}`);
  return interviewDateTime > new Date() && this.status === 'scheduled';
};

// Check if interview is today
interviewSchema.methods.isToday = function() {
  const today = new Date().toDateString();
  const interviewDate = new Date(this.date).toDateString();
  return today === interviewDate;
};

// Get meeting link (for online interviews)
interviewSchema.methods.getMeetingLink = function() {
  if (this.mode === 'online' && this.link) {
    return this.link;
  }
  return null;
};

// Check if AI interview is completed
interviewSchema.methods.isAICompleted = function() {
  return this.isAIMode && this.status === 'ai_completed';
};

// Get AI interview score
interviewSchema.methods.getAIScore = function() {
  return this.aiTotalScore || 0;
};

// ==================== STATIC METHODS ====================

// Get upcoming interviews for a candidate
interviewSchema.statics.getUpcomingForCandidate = function(candidateId) {
  const today = new Date().toISOString().split('T')[0];
  return this.find({
    candidateId: candidateId,
    status: { $in: ['scheduled', 'confirmed'] },
    date: { $gte: today }
  }).sort({ date: 1, time: 1 });
};

// Get upcoming interviews for a recruiter
interviewSchema.statics.getUpcomingForRecruiter = function(recruiterId) {
  const today = new Date().toISOString().split('T')[0];
  return this.find({
    recruiterId: recruiterId,
    status: { $in: ['scheduled', 'confirmed'] },
    date: { $gte: today }
  }).sort({ date: 1, time: 1 });
};

// Get interviews by date range
interviewSchema.statics.getByDateRange = function(startDate, endDate, recruiterId) {
  const query = {
    date: { $gte: startDate, $lte: endDate }
  };
  if (recruiterId) {
    query.recruiterId = recruiterId;
  }
  return this.find(query).sort({ date: 1, time: 1 });
};

// Get AI practice interviews for a candidate
interviewSchema.statics.getAIPracticeInterviews = function(candidateId) {
  return this.find({
    candidateId: candidateId,
    isAIMode: true,
    status: { $in: ['ai_practice', 'ai_completed'] }
  }).sort({ createdAt: -1 });
};

// Get completed AI interviews with scores
interviewSchema.statics.getCompletedAIInterviews = function(candidateId) {
  return this.find({
    candidateId: candidateId,
    isAIMode: true,
    status: 'ai_completed',
    aiTotalScore: { $ne: null }
  }).sort({ completedAt: -1 });
};

module.exports = mongoose.model('Interview', interviewSchema);