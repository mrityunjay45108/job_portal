// // test-groq.js
// require('dotenv').config();
// const axios = require('axios');

// const testGroq = async () => {
//   console.log(' Testing GROQ API Connection...\n');
  
//   // Check if API key exists
//   if (!process.env.GROQ_API_KEY) {
//     console.error('GROQ_API_KEY not found in .env file');
//     console.log(' Please add: GROQ_API_KEY=your_api_key_here');
//     return;
//   }
  
//   console.log(' API Key found:', process.env.GROQ_API_KEY.substring(0, 10) + '...');
  
//   try {
//     const response = await axios.post(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         model: 'mixtral-8x7b-32768',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a helpful job search assistant.'
//           },
//           {
//             role: 'user',
//             content: 'Give me 3 tips for a job interview'
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 200,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
//           'Content-Type': 'application/json'
//         },
//         timeout: 10000
//       }
//     );
    
//     console.log('\n GROQ API Response:');
//     console.log('='.repeat(50));
//     console.log(response.data.choices[0].message.content);
//     console.log('='.repeat(50));
//     console.log('\n GROQ API is working perfectly!');
    
//   } catch (error) {
//     console.error('\n GROQ API Error:');
//     if (error.response) {
//       console.error('Status:', error.response.status);
//       console.error('Message:', error.response.data?.error?.message || error.message);
//     } else {
//       console.error('Message:', error.message);
//     }
//     console.log('\n Tips:');
//     console.log('1. Check if API key is correct');
//     console.log('2. Check internet connection');
//     console.log('3. Verify GROQ account has credits');
//   }
// };

// // Run the test
// testGroq();