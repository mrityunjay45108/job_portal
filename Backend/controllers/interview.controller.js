// Backend/controllers/interview.controller.js
const Interview = require("../models/Interview.model");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

// @desc    Schedule interview
const scheduleInterview = async (req, res) => {
  try {
    const {
      jobId,
      candidateId,
      date,
      time,
      mode,
      link,
      candidateName,
      candidateEmail,
      jobTitle,
    } = req.body;

    const interview = await Interview.create({
      jobId,
      jobTitle,
      candidateId,
      candidateName,
      candidateEmail,
      recruiterId: req.userId,
      date,
      time,
      mode,
      link,
      status: "scheduled",
    });

    // Update application status to interview
    await Application.findOneAndUpdate(
      { jobId, candidateId },
      { status: "interview" },
    );

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get recruiter interviews
const getRecruiterInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ recruiterId: req.userId }).sort({
      date: 1,
    });

    res.json({
      success: true,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update interview status
const updateInterviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const interview = await Interview.findOneAndUpdate(
      { _id: req.params.id, recruiterId: req.userId },
      { status },
      { new: true },
    );

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  scheduleInterview,
  getRecruiterInterviews,
  updateInterviewStatus,
};
