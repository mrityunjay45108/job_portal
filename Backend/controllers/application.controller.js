// Backend/controllers/application.controller.js
const Application = require("../models/Application.model");
const Job = require("../models/Job.model");
const User = require("../models/User.model");

// @access  Private (Candidate only)
const applyForJob = async (req, res) => {
  try {
    console.log(" Apply for Job Request:");
    console.log("Body:", req.body);
    console.log("User ID:", req.userId);
    console.log("User Role:", req.userRole);

    const {
      jobId,
      coverLetter,
      experience,
      skills,
      expectedSalary,
      noticePeriod,
      resumeUrl,
      resumeName,
      resumePublicId,
    } = req.body;

    // Check if user is candidate
    if (req.userRole !== "candidate") {
      return res.status(403).json({
        success: false,
        message: "Only candidates can apply for jobs",
      });
    }

    // Validate required fields
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      candidateId: req.userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Get job details
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Get candidate details
    const candidate = await User.findById(req.userId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    console.log("Job found:", job.jobTitle);
    console.log("Candidate found:", candidate.fullName);

    // Calculate AI match score
    let aiScore = 0;
    if (job.skills && candidate.profile?.skills && job.skills.length > 0) {
      const matchedSkills = job.skills.filter((skill) =>
        candidate.profile.skills.some(
          (cs) => cs && cs.toLowerCase() === skill.toLowerCase(),
        ),
      );
      aiScore = Math.round((matchedSkills.length / job.skills.length) * 100);
    }

    // Create application data
    const applicationData = {
      jobId: job._id,
      jobTitle: job.jobTitle,
      company: job.companyName,
      candidateId: req.userId,
      candidateName: candidate.fullName,
      candidateEmail: candidate.email,
      candidatePhone: candidate.phoneNumber || "",
      resumeUrl: resumeUrl || candidate.profile?.resumeUrl || "",
      resumeName: resumeName || candidate.profile?.resumeName || "",
      resumePublicId: resumePublicId || candidate.profile?.resumePublicId || "",
      coverLetter: coverLetter || "",
      experience: experience || "",
      skills: skills || "",
      expectedSalary: expectedSalary || "",
      noticePeriod: noticePeriod || "",
      status: "pending",
      aiScore: aiScore,
      appliedDate: new Date(),
    };

    console.log("Creating application with data:", applicationData);

    const application = await Application.create(applicationData);

    // Increment applicants count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

    console.log("Application created successfully:", application._id);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: {
        id: application._id,
        jobTitle: application.jobTitle,
        company: application.company,
        status: application.status,
        appliedDate: application.appliedDate,
        aiScore: application.aiScore,
      },
    });
  } catch (error) {
    console.error("Apply error:", error);
    console.error("Error details:", error.message);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit application",
    });
  }
};

// @access  Private (Candidate only)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidateId: req.userId,
    }).sort({ appliedDate: -1 });

    res.json({
      success: true,
      applications: applications.map((app) => ({
        id: app._id,
        jobId: app.jobId,
        jobTitle: app.jobTitle,
        company: app.company,
        appliedDate: app.appliedDate,
        status: app.status,
        coverLetter: app.coverLetter,
        matchScore: app.aiScore,
        feedback: app.feedback,
        resumeUrl: app.resumeUrl,
        resumeName: app.resumeName,
      })),
    });
  } catch (error) {
    console.error("Get my applications error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @access  Private (Recruiter only)
const getRecruiterApplications = async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.userId });
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      jobId: { $in: jobIds },
    }).sort({ appliedDate: -1 });

    res.json({
      success: true,
      applications: applications.map((app) => ({
        id: app._id,
        jobId: app.jobId,
        jobTitle: app.jobTitle,
        company: app.company,
        candidateId: app.candidateId,
        candidateName: app.candidateName,
        candidateEmail: app.candidateEmail,
        candidatePhone: app.candidatePhone,
        appliedDate: app.appliedDate,
        status: app.status,
        coverLetter: app.coverLetter,
        experience: app.experience,
        skills: app.skills,
        expectedSalary: app.expectedSalary,
        noticePeriod: app.noticePeriod,
        resumeUrl: app.resumeUrl,
        resumeName: app.resumeName,
        aiScore: app.aiScore,
        isBookmarked: app.isBookmarked,
        feedback: app.feedback,
      })),
    });
  } catch (error) {
    console.error("Get recruiter applications error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single application details
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const job = await Job.findById(application.jobId);
    const isCandidate = application.candidateId.toString() === req.userId;
    const isRecruiter = job?.companyId.toString() === req.userId;

    if (!isCandidate && !isRecruiter) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this application",
      });
    }

    res.json({ success: true, application });
  } catch (error) {
    console.error("Get application by id error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update application status (Recruiter)
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, feedback } = req.body;

    const validStatuses = [
      "pending",
      "shortlisted",
      "interview",
      "hired",
      "rejected",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const job = await Job.findOne({
      _id: application.jobId,
      companyId: req.userId,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    await application.save();

    res.json({
      success: true,
      message: `Application ${status}`,
      application: {
        id: application._id,
        status: application.status,
        feedback: application.feedback,
      },
    });
  } catch (error) {
    console.error("Update application status error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Toggle bookmark for application (Recruiter)
// @route   PATCH /api/applications/:id/bookmark
// @access  Private (Recruiter only)
const toggleBookmark = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const job = await Job.findOne({
      _id: application.jobId,
      companyId: req.userId,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    application.isBookmarked = !application.isBookmarked;
    await application.save();

    res.json({
      success: true,
      isBookmarked: application.isBookmarked,
      message: application.isBookmarked
        ? "Candidate bookmarked"
        : "Bookmark removed",
    });
  } catch (error) {
    console.error("Toggle bookmark error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Withdraw application (Candidate)
// @route   DELETE /api/applications/:id/withdraw
// @access  Private (Candidate only)
const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.candidateId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to withdraw this application",
      });
    }

    if (
      application.status !== "pending" &&
      application.status !== "shortlisted"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot withdraw application at this stage",
      });
    }

    application.status = "rejected";
    application.feedback = "Application withdrawn by candidate";
    await application.save();

    await Job.findByIdAndUpdate(application.jobId, {
      $inc: { applicantsCount: -1 },
    });

    res.json({
      success: true,
      message: "Application withdrawn successfully",
    });
  } catch (error) {
    console.error("Withdraw application error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  getApplicationById,
  updateApplicationStatus,
  toggleBookmark,
  withdrawApplication,
};
