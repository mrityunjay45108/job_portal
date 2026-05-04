// const Application = require('../models/Application.model');
// const Job = require('../models/Job.model');

// // @desc    Apply for a job
// const applyForJob = async (req, res) => {
//   try {
//     const { jobId, coverLetter, experience, skills, expectedSalary, noticePeriod } = req.body;

//     const existingApplication = await Application.findOne({ jobId, candidateId: req.userId });
//     if (existingApplication) {
//       return res.status(400).json({ success: false, message: 'Already applied for this job' });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }

//     const application = await Application.create({
//       jobId,
//       jobTitle: job.jobTitle,
//       company: job.company,
//       candidateId: req.userId,
//       candidateName: req.user.fullName,
//       candidateEmail: req.user.email,
//       candidatePhone: req.user.phoneNumber,
//       coverLetter,
//       experience,
//       skills,
//       expectedSalary,
//       noticePeriod,
//       status: 'pending',
//       appliedDate: new Date()
//     });

//     await Job.findByIdAndUpdate(jobId, { $inc: { applicants: 1 } });

//     res.status(201).json({ success: true, application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get my applications
// const getMyApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ candidateId: req.userId });
//     res.json({ success: true, applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get recruiter applications
// const getRecruiterApplications = async (req, res) => {
//   try {
//     const jobs = await Job.find({ companyId: req.userId });
//     const jobIds = jobs.map(job => job._id);
//     const applications = await Application.find({ jobId: { $in: jobIds } });
//     res.json({ success: true, applications });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Update application status
// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { status, feedback } = req.body;
//     const application = await Application.findById(req.params.id);
//     if (!application) {
//       return res.status(404).json({ success: false, message: 'Application not found' });
//     }

//     const job = await Job.findOne({ _id: application.jobId, companyId: req.userId });
//     if (!job) {
//       return res.status(403).json({ success: false, message: 'Permission denied' });
//     }

//     application.status = status;
//     if (feedback) application.feedback = feedback;
//     await application.save();

//     res.json({ success: true, application });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   applyForJob,
//   getMyApplications,
//   getRecruiterApplications,
//   updateApplicationStatus
// };

// // Backend/controllers/application.controller.js
// const Application = require('../models/Application.model');
// const Job = require('../models/Job.model');

// // @desc    Apply for a job
// const applyForJob = async (req, res) => {
//   try {
//     const { jobId, coverLetter, experience, skills, expectedSalary, noticePeriod } = req.body;

//     // Check if already applied
//     const existingApplication = await Application.findOne({
//       jobId,
//       candidateId: req.userId
//     });

//     if (existingApplication) {
//       return res.status(400).json({
//         success: false,
//         message: 'You have already applied for this job'
//       });
//     }

//     // Get job details
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: 'Job not found'
//       });
//     }

//     // Create application
//     const application = await Application.create({
//       jobId,
//       jobTitle: job.jobTitle,
//       company: job.companyName,
//       candidateId: req.userId,
//       candidateName: req.user.fullName,
//       candidateEmail: req.user.email,
//       candidatePhone: req.user.phoneNumber,
//       coverLetter,
//       experience,
//       skills,
//       expectedSalary,
//       noticePeriod,
//       status: 'pending',
//       appliedDate: new Date()
//     });

//     // Increment applicants count
//     await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

//     res.status(201).json({
//       success: true,
//       message: 'Application submitted successfully',
//       application
//     });
//   } catch (error) {
//     console.error('Apply error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get my applications (candidate)
// const getMyApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ candidateId: req.userId })
//       .sort({ appliedDate: -1 });

//     res.json({ success: true, applications });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Get recruiter applications
// const getRecruiterApplications = async (req, res) => {
//   try {
//     const jobs = await Job.find({ companyId: req.userId });
//     const jobIds = jobs.map(job => job._id);

//     const applications = await Application.find({ jobId: { $in: jobIds } })
//       .sort({ appliedDate: -1 });

//     res.json({ success: true, applications });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Update application status (shortlist, interview, hire, reject)
// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { status, feedback } = req.body;

//     // Verify recruiter owns this job
//     const application = await Application.findById(req.params.id);
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     const job = await Job.findOne({
//       _id: application.jobId,
//       companyId: req.userId
//     });

//     if (!job) {
//       return res.status(403).json({
//         success: false,
//         message: 'Permission denied'
//       });
//     }

//     // Update application
//     application.status = status;
//     if (feedback) application.feedback = feedback;
//     await application.save();

//     res.json({
//       success: true,
//       message: `Application ${status}`,
//       application
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // @desc    Toggle bookmark
// const toggleBookmark = async (req, res) => {
//   try {
//     const application = await Application.findById(req.params.id);
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     application.isBookmarked = !application.isBookmarked;
//     await application.save();

//     res.json({
//       success: true,
//       isBookmarked: application.isBookmarked
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// module.exports = {
//   applyForJob,
//   getMyApplications,
//   getRecruiterApplications,
//   updateApplicationStatus,
//   toggleBookmark
// };

// Backend/controllers/application.controller.js
const Application = require("../models/Application.model");
const Job = require("../models/Job.model");
const User = require("../models/User.model");

// @desc    Apply for a job with resume upload
// @route   POST /api/applications/apply
// @access  Private (Candidate only)
const applyForJob = async (req, res) => {
  try {
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

    // Create application
    const application = await Application.create({
      jobId,
      jobTitle: job.jobTitle,
      company: job.companyName,
      candidateId: req.userId,
      candidateName: candidate.fullName,
      candidateEmail: candidate.email,
      candidatePhone: candidate.phoneNumber,
      resumeUrl: resumeUrl || candidate.profile?.resumeUrl || "",
      resumeName: resumeName || candidate.profile?.resumeName || "",
      resumePublicId: resumePublicId || candidate.profile?.resumePublicId || "",
      coverLetter: coverLetter || "",
      experience: experience || candidate.profile?.experience || "",
      skills: skills || (candidate.profile?.skills || []).join(", "),
      expectedSalary: expectedSalary || "",
      noticePeriod: noticePeriod || "",
      status: "pending",
      aiScore: aiScore,
      appliedDate: new Date(),
    });

    // Increment applicants count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get my applications (Candidate)
// @route   GET /api/applications/my-applications
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

// @desc    Get all applications for recruiter's jobs
// @route   GET /api/applications/recruiter
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

// ==================== NEW: WITHDRAW APPLICATION ====================
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

    // Check if candidate owns this application
    if (application.candidateId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to withdraw this application",
      });
    }

    // Only allow withdrawal if status is pending or shortlisted
    if (
      application.status !== "pending" &&
      application.status !== "shortlisted"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot withdraw application at this stage",
      });
    }

    // Update status to rejected with withdrawal note
    application.status = "rejected";
    application.feedback = "Application withdrawn by candidate";
    await application.save();

    // Decrement applicants count
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
