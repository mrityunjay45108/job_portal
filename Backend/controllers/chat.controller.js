// Without axios - direct responses only
const getChatResponse = async (req, res) => {
  try {
    const { message, role = 'candidate' } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    console.log(`📨 Received message: "${message}" for role: ${role}`);

    // Direct response without API
    const response = getSmartResponse(message, role);
    
    res.json({
      success: true,
      message: response,
      fallback: false
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getSmartResponse = (message, role) => {
  const msg = message.toLowerCase();
  
  // Candidate responses
  if (role === 'candidate') {
    if (msg.includes('job') || msg.includes('position')) {
      return "I can help you find jobs! Check our 'Find Jobs' section for current openings. What specific role are you looking for? 🎯";
    }
    if (msg.includes('interview')) {
      return "Interview tips:\n• Research the company thoroughly\n• Practice common questions\n• Prepare your success stories\n• Ask thoughtful questions\nGood luck! ";
    }
    if (msg.includes('resume') || msg.includes('cv')) {
      return "Resume tips:\n• Keep it 1-2 pages\n• Use action verbs\n• Quantify achievements\n• Tailor for each job\nNeed help with any section? ";
    }
    if (msg.includes('salary')) {
      return "Salary ranges in India:\n• Entry (0-2 yrs): ₹3-6 LPA\n• Mid (3-5 yrs): ₹6-12 LPA\n• Senior (5+ yrs): ₹12-25 LPA";
    }
    if (msg.includes('skill')) {
      return "Top skills for 2024:\n1. Technical expertise\n2. Communication\n3. Problem-solving\n4. Teamwork\n5. Adaptability";
    }
    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! 👋 I'm your job search assistant. How can I help you today? Ask me about jobs, interviews, or resumes!";
    }
    if (msg.includes('apply')) {
      return "To apply for jobs:\n1. Find a job posting\n2. Click 'Apply Now'\n3. Upload your resume\n4. Fill details\n5. Submit!";
    }
  }
  
  // Recruiter responses
  if (role === 'recruiter') {
    if (msg.includes('post') || msg.includes('job')) {
      return "To post a job:\n1. Go to 'Post a Job'\n2. Fill job details\n3. Set requirements\n4. Publish!";
    }
    if (msg.includes('candidate')) {
      return "Find talented candidates in 'Find Talent' section. Filter by skills, experience, and location! 👥";
    }
  }
  
  // Default response
  return `I'm your ${role} assistant! You can ask me about jobs, interviews, resumes, salaries, or anything related to your career. What would you like to know? 🚀`;
};

module.exports = { getChatResponse };