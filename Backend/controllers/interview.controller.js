// // Backend/controllers/interview.controller.js
// const Interview = require('../models/Interview.model');
// const Job = require('../models/Job.model');
// const Application = require('../models/Application.model');
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize Gemini AI
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ==================== REGULAR INTERVIEW FUNCTIONS ====================

// // @desc    Schedule interview (Regular)
// // @route   POST /api/interviews/schedule
// // @access  Private (Recruiter only)
// const scheduleInterview = async (req, res) => {
//   try {
//     const {
//       jobId,
//       candidateId,
//       date,
//       time,
//       mode,
//       link,
//       candidateName,
//       candidateEmail,
//       jobTitle,
//     } = req.body;

//     const interview = await Interview.create({
//       jobId,
//       jobTitle,
//       candidateId,
//       candidateName,
//       candidateEmail,
//       recruiterId: req.userId,
//       date,
//       time,
//       mode,
//       link,
//       status: "scheduled",
//       isAIMode: false
//     });

//     // Update application status to interview
//     await Application.findOneAndUpdate(
//       { jobId, candidateId },
//       { status: "interview" },
//     );

//     res.status(201).json({
//       success: true,
//       message: "Interview scheduled successfully",
//       interview,
//     });
//   } catch (error) {
//     console.error('Schedule interview error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Get recruiter interviews
// // @route   GET /api/interviews/recruiter
// // @access  Private (Recruiter only)
// const getRecruiterInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find({ recruiterId: req.userId }).sort({
//       date: 1,
//     });

//     res.json({
//       success: true,
//       interviews,
//     });
//   } catch (error) {
//     console.error('Get recruiter interviews error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Get candidate interviews
// // @route   GET /api/interviews/candidate
// // @access  Private (Candidate only)
// const getCandidateInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find({ candidateId: req.userId }).sort({
//       date: 1,
//     });

//     res.json({
//       success: true,
//       interviews,
//     });
//   } catch (error) {
//     console.error('Get candidate interviews error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Update interview status
// // @route   PUT /api/interviews/:id/status
// // @access  Private (Recruiter only)
// const updateInterviewStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const interview = await Interview.findOneAndUpdate(
//       { _id: req.params.id, recruiterId: req.userId },
//       { status },
//       { new: true },
//     );

//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         message: 'Interview not found'
//       });
//     }

//     res.json({
//       success: true,
//       interview,
//     });
//   } catch (error) {
//     console.error('Update interview status error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==================== AI INTERVIEW FUNCTIONS ====================

// // @desc    Generate AI interview questions
// // @route   POST /api/interviews/generate-questions
// // @access  Private (Candidate only)
// const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { jobId, experience, skills } = req.body;
    
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const prompt = `
//       Generate 5 interview questions for a ${job.jobTitle} position.
//       Company: ${job.companyName}
//       Required Skills: ${job.skills?.join(', ') || 'Not specified'}
//       Candidate Experience: ${experience || 'Not specified'}
//       Candidate Skills: ${skills || 'Not specified'}
      
//       Return ONLY valid JSON format:
//       {
//         "questions": [
//           {
//             "question": "question text here",
//             "type": "technical",
//             "difficulty": "easy",
//             "expectedKeywords": ["keyword1", "keyword2"]
//           }
//         ]
//       }
//     `;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let questionsText = response.text();
    
//     // Clean up the response to extract JSON
//     questionsText = questionsText.replace(/```json/g, '').replace(/```/g, '').trim();
//     const questions = JSON.parse(questionsText);
    
//     res.json({
//       success: true,
//       questions: questions.questions || questions
//     });
//   } catch (error) {
//     console.error('Generate questions error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message,
//       fallbackQuestions: getFallbackQuestions()
//     });
//   }
// };

// // Fallback questions if API fails
// const getFallbackQuestions = () => {
//   return {
//     questions: [
//       {
//         question: "Tell me about yourself and your professional background.",
//         type: "behavioral",
//         difficulty: "easy",
//         expectedKeywords: ["experience", "skills", "achievements"]
//       },
//       {
//         question: "What are your greatest technical strengths?",
//         type: "technical",
//         difficulty: "easy",
//         expectedKeywords: ["programming", "languages", "frameworks", "tools"]
//       },
//       {
//         question: "Describe a challenging project you worked on and how you overcame obstacles.",
//         type: "behavioral",
//         difficulty: "medium",
//         expectedKeywords: ["challenge", "solution", "teamwork", "result"]
//       },
//       {
//         question: "Where do you see yourself in 5 years?",
//         type: "behavioral",
//         difficulty: "easy",
//         expectedKeywords: ["growth", "career", "goals", "development"]
//       },
//       {
//         question: "Why are you interested in this position and our company?",
//         type: "behavioral",
//         difficulty: "medium",
//         expectedKeywords: ["company", "role", "values", "mission"]
//       }
//     ]
//   };
// };

// // @desc    Analyze interview answer
// // @route   POST /api/interviews/analyze-answer
// // @access  Private (Candidate only)
// const analyzeAnswer = async (req, res) => {
//   try {
//     const { question, answer, expectedKeywords } = req.body;
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const prompt = `
//       Analyze this interview answer:
      
//       Question: ${question}
//       Answer: ${answer}
//       Expected Keywords: ${expectedKeywords?.join(', ') || 'Not specified'}
      
//       Return ONLY valid JSON format:
//       {
//         "score": 75,
//         "feedback": "Your answer was good but could include more specific examples.",
//         "missingKeywords": ["keyword1", "keyword2"],
//         "improvement": "Add more quantifiable achievements to strengthen your answer."
//       }
//     `;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let analysisText = response.text();
    
//     // Clean up the response
//     analysisText = analysisText.replace(/```json/g, '').replace(/```/g, '').trim();
//     const analysis = JSON.parse(analysisText);
    
//     res.json({
//       success: true,
//       analysis
//     });
//   } catch (error) {
//     console.error('Analyze answer error:', error);
    
//     // Fallback analysis
//     res.json({
//       success: true,
//       analysis: {
//         score: 70,
//         feedback: "Your answer has been recorded. Focus on being more specific and using relevant keywords.",
//         missingKeywords: expectedKeywords?.slice(0, 3) || [],
//         improvement: "Practice structuring your answers using the STAR method (Situation, Task, Action, Result)."
//       }
//     });
//   }
// };

// // @desc    Schedule AI practice interview
// // @route   POST /api/interviews/schedule-ai
// // @access  Private (Candidate only)
// const scheduleAIInterview = async (req, res) => {
//   try {
//     const { jobId } = req.body;
    
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }
    
//     const interview = await Interview.create({
//       jobId,
//       jobTitle: job.jobTitle,
//       candidateId: req.userId,
//       candidateName: req.user.fullName,
//       candidateEmail: req.user.email,
//       recruiterId: req.userId,
//       date: new Date().toISOString().split('T')[0],
//       time: "Practice Mode",
//       mode: 'ai',
//       status: 'ai_practice',
//       isAIMode: true
//     });
    
//     res.status(201).json({
//       success: true,
//       message: 'AI Interview practice session started',
//       interview
//     });
//   } catch (error) {
//     console.error('Schedule AI interview error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Save AI interview results
// // @route   POST /api/interviews/save-results
// // @access  Private (Candidate only)
// const saveAIInterviewResults = async (req, res) => {
//   try {
//     const { interviewId, questions, answers, analyses, totalScore } = req.body;
    
//     const interview = await Interview.findByIdAndUpdate(
//       interviewId,
//       {
//         aiQuestions: questions,
//         aiAnswers: answers,
//         aiAnalyses: analyses,
//         aiTotalScore: totalScore,
//         status: 'ai_completed',
//         completedAt: new Date()
//       },
//       { new: true }
//     );
    
//     res.json({
//       success: true,
//       message: 'Interview results saved successfully',
//       interview
//     });
//   } catch (error) {
//     console.error('Save AI interview results error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   // Regular interview functions
//   scheduleInterview,
//   getRecruiterInterviews,
//   getCandidateInterviews,
//   updateInterviewStatus,
//   // AI interview functions
//   generateInterviewQuestions,
//   analyzeAnswer,
//   scheduleAIInterview,
//   saveAIInterviewResults
// };



// // Backend/controllers/interview.controller.js
// const Interview = require("../models/Interview.model");
// const Job = require("../models/Job.model");
// const Application = require("../models/Application.model");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ==================== REGULAR INTERVIEW FUNCTIONS ====================

// // @desc    Schedule interview (Recruiter)
// const scheduleInterview = async (req, res) => {
//   try {
//     const {
//       jobId,
//       candidateId,
//       date,
//       time,
//       mode,
//       link,
//       candidateName,
//       candidateEmail,
//       jobTitle,
//     } = req.body;

//     const interview = await Interview.create({
//       jobId,
//       jobTitle,
//       candidateId,
//       candidateName,
//       candidateEmail,
//       recruiterId: req.userId,
//       date,
//       time,
//       mode,
//       link,
//       status: "scheduled",
//       isAIMode: false
//     });

//     // Update application status to interview
//     await Application.findOneAndUpdate(
//       { jobId, candidateId },
//       { status: "interview" },
//     );

//     res.status(201).json({
//       success: true,
//       message: "Interview scheduled successfully",
//       interview,
//     });
//   } catch (error) {
//     console.error('Schedule interview error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Get recruiter interviews
// const getRecruiterInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find({ recruiterId: req.userId }).sort({
//       date: 1,
//     });

//     res.json({
//       success: true,
//       interviews,
//     });
//   } catch (error) {
//     console.error('Get recruiter interviews error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Get candidate interviews
// const getCandidateInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find({ candidateId: req.userId }).sort({
//       date: 1,
//     });

//     res.json({
//       success: true,
//       interviews,
//     });
//   } catch (error) {
//     console.error('Get candidate interviews error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // @desc    Update interview status
// const updateInterviewStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const interview = await Interview.findOneAndUpdate(
//       { _id: req.params.id, recruiterId: req.userId },
//       { status },
//       { new: true },
//     );

//     if (!interview) {
//       return res.status(404).json({
//         success: false,
//         message: 'Interview not found'
//       });
//     }

//     res.json({
//       success: true,
//       interview,
//     });
//   } catch (error) {
//     console.error('Update interview status error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==================== AI INTERVIEW FUNCTIONS ====================

// // @desc    Generate AI interview questions
// const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { jobId, experience, skills } = req.body;
    
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const prompt = `
//       Generate 5 interview questions for a ${job.jobTitle} position.
//       Company: ${job.companyName}
//       Required Skills: ${job.skills?.join(', ') || 'Not specified'}
//       Candidate Experience: ${experience || 'Not specified'}
//       Candidate Skills: ${skills || 'Not specified'}
      
//       Return ONLY valid JSON format:
//       {
//         "questions": [
//           {
//             "question": "question text here",
//             "type": "technical",
//             "difficulty": "easy",
//             "expectedKeywords": ["keyword1", "keyword2"]
//           }
//         ]
//       }
//     `;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let questionsText = response.text();
    
//     questionsText = questionsText.replace(/```json/g, '').replace(/```/g, '').trim();
//     const questions = JSON.parse(questionsText);
    
//     res.json({
//       success: true,
//       questions: questions.questions || questions
//     });
//   } catch (error) {
//     console.error('Generate questions error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message,
//       fallbackQuestions: getFallbackQuestions()
//     });
//   }
// };

// // Fallback questions
// const getFallbackQuestions = () => {
//   return {
//     questions: [
//       {
//         question: "Tell me about yourself and your professional background.",
//         type: "behavioral",
//         difficulty: "easy",
//         expectedKeywords: ["experience", "skills", "achievements"]
//       },
//       {
//         question: "What are your greatest technical strengths?",
//         type: "technical",
//         difficulty: "easy",
//         expectedKeywords: ["programming", "languages", "frameworks", "tools"]
//       },
//       {
//         question: "Describe a challenging project you worked on.",
//         type: "behavioral",
//         difficulty: "medium",
//         expectedKeywords: ["challenge", "solution", "teamwork", "result"]
//       },
//       {
//         question: "Where do you see yourself in 5 years?",
//         type: "behavioral",
//         difficulty: "easy",
//         expectedKeywords: ["growth", "career", "goals", "development"]
//       },
//       {
//         question: "Why are you interested in this position?",
//         type: "behavioral",
//         difficulty: "medium",
//         expectedKeywords: ["company", "role", "values", "mission"]
//       }
//     ]
//   };
// };

// // @desc    Analyze interview answer
// const analyzeAnswer = async (req, res) => {
//   try {
//     const { question, answer, expectedKeywords } = req.body;
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
//     const prompt = `
//       Analyze this interview answer:
      
//       Question: ${question}
//       Answer: ${answer}
//       Expected Keywords: ${expectedKeywords?.join(', ') || 'Not specified'}
      
//       Return ONLY valid JSON format:
//       {
//         "score": 75,
//         "feedback": "Your answer was good but could include more specific examples.",
//         "missingKeywords": ["keyword1", "keyword2"],
//         "improvement": "Add more quantifiable achievements to strengthen your answer."
//       }
//     `;
    
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let analysisText = response.text();
    
//     analysisText = analysisText.replace(/```json/g, '').replace(/```/g, '').trim();
//     const analysis = JSON.parse(analysisText);
    
//     res.json({
//       success: true,
//       analysis
//     });
//   } catch (error) {
//     console.error('Analyze answer error:', error);
//     res.json({
//       success: true,
//       analysis: {
//         score: 70,
//         feedback: "Your answer has been recorded. Focus on being more specific.",
//         missingKeywords: expectedKeywords?.slice(0, 3) || [],
//         improvement: "Practice using the STAR method (Situation, Task, Action, Result)."
//       }
//     });
//   }
// };

// // @desc    Schedule AI practice interview
// const scheduleAIInterview = async (req, res) => {
//   try {
//     const { jobId } = req.body;
    
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ success: false, message: 'Job not found' });
//     }
    
//     const interview = await Interview.create({
//       jobId,
//       jobTitle: job.jobTitle,
//       candidateId: req.userId,
//       candidateName: req.user.fullName,
//       candidateEmail: req.user.email,
//       recruiterId: req.userId,
//       date: new Date().toISOString().split('T')[0],
//       time: "Practice Mode",
//       mode: 'ai',
//       status: 'ai_practice',
//       isAIMode: true
//     });
    
//     res.status(201).json({
//       success: true,
//       message: 'AI Interview practice session started',
//       interviewId: interview._id,
//       interview
//     });
//   } catch (error) {
//     console.error('Schedule AI interview error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Save AI interview results
// const saveAIInterviewResults = async (req, res) => {
//   try {
//     const { interviewId, questions, answers, analyses, totalScore } = req.body;
    
//     const interview = await Interview.findByIdAndUpdate(
//       interviewId,
//       {
//         aiQuestions: questions,
//         aiAnswers: answers,
//         aiAnalyses: analyses,
//         aiTotalScore: totalScore,
//         status: 'ai_completed',
//         completedAt: new Date()
//       },
//       { new: true }
//     );
    
//     res.json({
//       success: true,
//       message: 'Interview results saved successfully',
//       interview
//     });
//   } catch (error) {
//     console.error('Save AI interview results error:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   // Regular interview
//   scheduleInterview,
//   getRecruiterInterviews,
//   getCandidateInterviews,
//   updateInterviewStatus,
//   // AI interview
//   generateInterviewQuestions,
//   analyzeAnswer,
//   scheduleAIInterview,
//   saveAIInterviewResults
// };


// Backend/controllers/interview.controller.js
const Interview = require("../models/Interview.model");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

// Try to import Gemini AI (optional)
let GoogleGenerativeAI;
let genAI;
try {
  GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("✅ Gemini AI initialized successfully");
  } else {
    console.log("⚠️ GEMINI_API_KEY not found, using fallback questions");
  }
} catch (error) {
  console.log("⚠️ @google/generative-ai package not installed, using fallback questions");
}

// ==================== FALLBACK QUESTIONS ====================
const getFallbackQuestions = (jobTitle = "this position") => {
  return {
    questions: [
      {
        question: `Tell me about yourself and why you're interested in the ${jobTitle} position.`,
        type: "behavioral",
        difficulty: "easy",
        expectedKeywords: ["experience", "skills", "passion", "career"]
      },
      {
        question: "What are your greatest technical strengths and how have you applied them?",
        type: "technical",
        difficulty: "medium",
        expectedKeywords: ["programming", "languages", "frameworks", "projects"]
      },
      {
        question: "Describe a challenging problem you solved and the approach you took.",
        type: "technical",
        difficulty: "hard",
        expectedKeywords: ["challenge", "solution", "analysis", "result", "learning"]
      },
      {
        question: "How do you handle tight deadlines and pressure? Give an example.",
        type: "behavioral",
        difficulty: "medium",
        expectedKeywords: ["deadline", "pressure", "priority", "time management", "result"]
      },
      {
        question: "Where do you see yourself professionally in the next 3-5 years?",
        type: "behavioral",
        difficulty: "easy",
        expectedKeywords: ["growth", "career", "goals", "development", "learning"]
      }
    ]
  };
};

// ==================== REGULAR INTERVIEW FUNCTIONS ====================

// @desc    Schedule interview (Regular)
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
      isAIMode: false
    });

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
    console.error('Schedule interview error:', error);
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
    console.error('Get recruiter interviews error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get candidate interviews
const getCandidateInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidateId: req.userId }).sort({
      date: 1,
    });

    res.json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error('Get candidate interviews error:', error);
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

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error('Update interview status error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== AI INTERVIEW FUNCTIONS ====================

// @desc    Generate AI interview questions
const generateInterviewQuestions = async (req, res) => {
  try {
    const { jobId, experience, skills } = req.body;
    
    console.log("Generating questions for job:", jobId);
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    let questions = [];
    
    // Try to use Gemini AI if available
    if (genAI && process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
          Generate 5 interview questions for a ${job.jobTitle} position.
          Company: ${job.companyName}
          Required Skills: ${job.skills?.join(', ') || 'Not specified'}
          
          Return ONLY valid JSON format:
          {
            "questions": [
              {
                "question": "question text here",
                "type": "technical",
                "difficulty": "easy",
                "expectedKeywords": ["keyword1", "keyword2"]
              }
            ]
          }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let questionsText = response.text();
        
        questionsText = questionsText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(questionsText);
        questions = parsed.questions || parsed;
        
        console.log("✅ AI-generated questions created");
      } catch (aiError) {
        console.error("AI generation failed, using fallback:", aiError.message);
        questions = getFallbackQuestions(job.jobTitle).questions;
      }
    } else {
      // Use fallback questions
      console.log("Using fallback questions");
      questions = getFallbackQuestions(job.jobTitle).questions;
    }
    
    res.json({
      success: true,
      questions: questions
    });
    
  } catch (error) {
    console.error('Generate questions error:', error);
    
    // Return fallback questions even on error
    res.json({
      success: true,
      questions: getFallbackQuestions().questions,
      message: "Using default questions. AI service temporarily unavailable."
    });
  }
};

// @desc    Analyze interview answer
const analyzeAnswer = async (req, res) => {
  try {
    const { question, answer, expectedKeywords } = req.body;
    
    let analysis = {
      score: 75,
      feedback: "Your answer has been recorded. Focus on being more specific.",
      missingKeywords: expectedKeywords?.slice(0, 3) || [],
      improvement: "Practice using the STAR method (Situation, Task, Action, Result)."
    };
    
    // Try to use Gemini AI if available
    if (genAI && process.env.GEMINI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `
          Analyze this interview answer:
          
          Question: ${question}
          Answer: ${answer}
          Expected Keywords: ${expectedKeywords?.join(', ') || 'Not specified'}
          
          Return ONLY valid JSON format:
          {
            "score": 75,
            "feedback": "Your answer was good but could include more specific examples.",
            "missingKeywords": ["keyword1", "keyword2"],
            "improvement": "Add more quantifiable achievements to strengthen your answer."
          }
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let analysisText = response.text();
        
        analysisText = analysisText.replace(/```json/g, '').replace(/```/g, '').trim();
        analysis = JSON.parse(analysisText);
        
        console.log("✅ AI analysis completed");
      } catch (aiError) {
        console.error("AI analysis failed, using fallback:", aiError.message);
      }
    }
    
    res.json({
      success: true,
      analysis
    });
    
  } catch (error) {
    console.error('Analyze answer error:', error);
    res.json({
      success: true,
      analysis: {
        score: 70,
        feedback: "Your answer has been recorded. Keep practicing!",
        missingKeywords: [],
        improvement: "Focus on providing specific examples from your experience."
      }
    });
  }
};

// @desc    Schedule AI practice interview
const scheduleAIInterview = async (req, res) => {
  try {
    const { jobId } = req.body;
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    
    const interview = await Interview.create({
      jobId,
      jobTitle: job.jobTitle,
      candidateId: req.userId,
      candidateName: req.user.fullName,
      candidateEmail: req.user.email,
      recruiterId: req.userId,
      date: new Date().toISOString().split('T')[0],
      time: "Practice Mode",
      mode: 'ai',
      status: 'ai_practice',
      isAIMode: true
    });
    
    res.status(201).json({
      success: true,
      message: 'AI Interview practice session started',
      interviewId: interview._id,
      interview
    });
  } catch (error) {
    console.error('Schedule AI interview error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save AI interview results
const saveAIInterviewResults = async (req, res) => {
  try {
    const { interviewId, questions, answers, analyses, totalScore } = req.body;
    
    const interview = await Interview.findByIdAndUpdate(
      interviewId,
      {
        aiQuestions: questions,
        aiAnswers: answers,
        aiAnalyses: analyses,
        aiTotalScore: totalScore,
        status: 'ai_completed',
        completedAt: new Date()
      },
      { new: true }
    );
    
    res.json({
      success: true,
      message: 'Interview results saved successfully',
      interview
    });
  } catch (error) {
    console.error('Save AI interview results error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  // Regular interview
  scheduleInterview,
  getRecruiterInterviews,
  getCandidateInterviews,
  updateInterviewStatus,
  // AI interview
  generateInterviewQuestions,
  analyzeAnswer,
  scheduleAIInterview,
  saveAIInterviewResults
};