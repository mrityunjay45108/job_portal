import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  selectedRole?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ selectedRole = 'candidate' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your JobSeekers AI assistant. How can I help you with your ${selectedRole} journey today?`,
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Direct responses - No backend needed
  const getDirectResponse = (message: string, role: string): string => {
    const lowerMessage = message.toLowerCase();
    
    const responses: { [key: string]: string } = {
      'hi': `Hello! 👋 How can I help you with your ${role} job search today?`,
      'hello': `Hi there! 😊 Ready to find your dream ${role} job?`,
      'job': `I can help you find ${role} positions! Check the "Find Jobs" section for current openings. What skills do you have?`,
      'interview': `Interview tips for ${role}: 
• Research the company thoroughly
• Practice common questions  
• Prepare your success stories
• Ask thoughtful questions
Good luck! 🍀`,
      'resume': `Resume tips for ${role}:
• Keep it to 1-2 pages
• Use action verbs
• Quantify achievements
• Tailor for each job
Need help with any section?`,
      'salary': `Salary for ${role} roles in India:
• Fresher: ₹3-6 LPA
• Mid-level: ₹6-12 LPA  
• Senior: ₹12-25 LPA
• Expert: ₹25+ LPA`,
      'skill': `Top skills for ${role}:
1. Technical expertise
2. Communication
3. Problem-solving
4. Teamwork
5. Adaptability`,
      'apply': `To apply for jobs:
1. Find a job posting
2. Click "Apply Now"
3. Upload your resume
4. Fill application form
5. Submit!`,
      'dashboard': `Your dashboard shows:
• Application status
• Saved jobs
• Interview schedule
• Profile views`,
      'thank': `You're welcome! 😊 Is there anything else I can help with?`,
      'help': `I can help with:
📌 Finding jobs
📌 Interview prep
📌 Resume building
📌 Salary info
📌 Application tips
What do you need?`
    };
    
    // Check for matching keywords
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses based on role
    if (role === 'candidate') {
      return `I'm your job search assistant! You can ask me about jobs, interviews, resumes, salaries, or application tips. What would you like to know? 🎯`;
    } else if (role === 'recruiter') {
      return `As a recruiter, I can help you post jobs, find candidates, schedule interviews, and manage applications. How can I assist? 💼`;
    } else {
      return `Welcome to JobSeekers! I can help you find jobs, build resumes, prepare for interviews, and more. What brings you here today? 🚀`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getDirectResponse(currentMessage, selectedRole);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  };

  const chatWindowStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '380px',
    height: '550px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    border: '1px solid #e0e0e0',
  };

  const messagesStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#f9f9f9',
  };

  const userMessageStyle: React.CSSProperties = {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  };

  const botMessageStyle: React.CSSProperties = {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: '#333',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    padding: '15px',
    backgroundColor: 'white',
    borderTop: '1px solid #e0e0e0',
    gap: '10px',
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    resize: 'none',
    fontFamily: 'inherit',
    fontSize: '14px',
  };

  const sendButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  const headerStyle: React.CSSProperties = {
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  return (
    <>
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={chatWindowStyle}>
          <div style={headerStyle}>
            <span>🤖 AI Assistant ({selectedRole})</span>
            <button style={closeButtonStyle} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
          
          <div style={messagesStyle}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={message.sender === 'user' ? userMessageStyle : botMessageStyle}
              >
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.4 }}>
                  {message.text}
                </p>
                <small style={{
                  fontSize: '10px',
                  opacity: 0.7,
                  marginTop: '5px',
                  display: 'block'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </small>
              </div>
            ))}
            {isLoading && (
              <div style={{ textAlign: 'center', color: '#666', padding: '10px' }}>
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={inputContainerStyle}>
            <textarea
              style={textareaStyle}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              rows={2}
              disabled={isLoading}
            />
            <button
              style={sendButtonStyle}
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;