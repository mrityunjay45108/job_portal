import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const chatApi = axios.create({
  baseURL: `${API_URL}/chat`,
  timeout: 30000,
});

// No authentication needed for chat
export const sendMessage = async (message: string, role: string = 'general') => {
  try {
    const response = await chatApi.post('/message', { message, role });
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      success: false,
      message: "I'm having trouble connecting. Please try again later.",
    };
  }
};

export default chatApi;



// // Chat API service for handling AI conversations

// interface ChatResponse {
//   message: string;
//   fallback?: boolean;
// }

// export const sendMessage = async (message: string, role: string): Promise<ChatResponse> => {
//   try {
//     // Try to connect to your backend API
//     const response = await fetch('http://localhost:5000/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         message, 
//         role,
//         timestamp: new Date().toISOString()
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('API request failed');
//     }

//     const data = await response.json();
    
//     return {
//       message: data.reply || data.message || getSmartResponse(message, role),
//       fallback: false
//     };
//   } catch (error) {
//     // Return smart offline responses when API is unavailable
//     console.warn('Using offline mode for chat:', error);
//     return {
//       message: getSmartResponse(message, role),
//       fallback: true
//     };
//   }
// };

// // Smart offline responses based on user queries
// const getSmartResponse = (message: string, role: string): string => {
//   const lowerMessage = message.toLowerCase();
  
//   // Job-related responses
//   if (lowerMessage.includes('job') || lowerMessage.includes('position')) {
//     return `I can help you find ${role} positions! Check the "Find Jobs" section for current openings.`;
//   }
  
//   if (lowerMessage.includes('interview')) {
//     return `Interview tips for ${role}: Research the company, practice common questions, and highlight your relevant experience.`;
//   }
  
//   if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
//     return `Your resume should highlight achievements relevant to ${role} positions. Focus on quantifiable results!`;
//   }
  
//   if (lowerMessage.includes('salary')) {
//     return `Salaries vary by location and experience. Check job postings for ${role} to see salary ranges.`;
//   }
  
//   if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
//     return `Hello! How can I help you with your ${role} job search today?`;
//   }
  
//   // Default responses based on role
//   const roleResponses = {
//     candidate: "As a job seeker, focus on tailoring your applications and networking.",
//     employer: "Looking to hire? Post jobs and browse candidate profiles in the Find Talent section.",
//     admin: "You have administrative access. You can manage users, jobs, and platform settings."
//   };
  
//   return roleResponses[role as keyof typeof roleResponses] || 
//          `I'm here to help with your job search! What specific information do you need about ${role} positions?`;
// };