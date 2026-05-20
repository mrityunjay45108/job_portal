// // Backend/index.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const adminRoutes = require('./routes/admin.routes');


// dotenv.config();
// connectDB();

// const app = express();

// // CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logger
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Test route (remove these after testing)
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Server is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// app.post('/api/test-body', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'POST request received',
//     body: req.body
//   });
// });

// // Routes
// app.use('/api/auth', require('./routes/user.routes'));
// app.use('/api/jobs', require('./routes/job.routes'));
// app.use('/api/applications', require('./routes/application.routes'));
// app.use('/api/interviews', require('./routes/interview.routes'));
// app.use('/api/upload', require('./routes/upload.routes'));
// app.use('/api/admin', adminRoutes);

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ success: false, message: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: `Route ${req.originalUrl} not found` 
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
//   console.log(` http://localhost:${PORT}`);
//   console.log(` Test GET: http://localhost:${PORT}/api/test`);
//   console.log(` Test POST: http://localhost:${PORT}/api/test-body`);
// });






// // Backend/index.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const adminRoutes = require('./routes/admin.routes');
// const chatRoutes = require('./routes/chat.routes');

// dotenv.config();
// connectDB();

// const app = express();


// // CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use('/uploads', express.static('uploads'));

// // Request logger
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Server is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// app.post('/api/test-body', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'POST request received',
//     body: req.body
//   });
// });

// // ==================== ROUTES ====================
// // Auth routes (login, register, me)
// app.use('/api/auth', require('./routes/user.routes'));
// app.use('/api/chat', chatRoutes);

// // User profile routes (get profile by ID)
// app.use('/api/users', require('./routes/user.routes'));  // ✅ Add this line

// // Other routes
// app.use('/api/jobs', require('./routes/job.routes'));
// app.use('/api/applications', require('./routes/application.routes'));
// app.use('/api/interviews', require('./routes/interview.routes'));
// app.use('/api/upload', require('./routes/upload.routes'));
// app.use('/api/admin', adminRoutes);
// app.use('/api/users', require('./routes/profile.routes'));
// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ success: false, message: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: `Route ${req.originalUrl} not found` 
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
//   console.log(` http://localhost:${PORT}`);
//   console.log(` Test GET: http://localhost:${PORT}/api/test`);
//   console.log(` Test POST: http://localhost:${PORT}/api/test-body`);
//   console.log(` Profile API: http://localhost:${PORT}/api/users/profile/YOUR_USER_ID`);
// });


// // Backend/index.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const adminRoutes = require('./routes/admin.routes');
// const chatRoutes = require('./routes/chat.routes');

// dotenv.config();
// connectDB();

// const app = express();

// // CORS
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'https://job-portal-kxhkpbk57-mrityunjay-kumars-projects-164ce87f.vercel.app'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Body parser
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use('/uploads', express.static('uploads'));

// // Request logger
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // Test route
// app.get('/api/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Server is running!',
//     timestamp: new Date().toISOString()
//   });
// });

// app.post('/api/test-body', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'POST request received',
//     body: req.body
//   });
// });

// // ==================== ROUTES ====================
// // Auth routes (login, register, me)
// app.use('/api/auth', require('./routes/user.routes'));
// app.use('/api/chat', chatRoutes); // ✅ Chat route with GROQ API

// // User profile routes (get profile by ID)
// app.use('/api/users', require('./routes/user.routes'));

// // Other routes
// app.use('/api/jobs', require('./routes/job.routes'));
// app.use('/api/applications', require('./routes/application.routes'));
// app.use('/api/interviews', require('./routes/interview.routes'));
// app.use('/api/upload', require('./routes/upload.routes'));
// app.use('/api/admin', adminRoutes);
// app.use('/api/users', require('./routes/profile.routes'));

// // Error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
//   res.status(500).json({ success: false, message: err.message });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: `Route ${req.originalUrl} not found` 
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   console.log(`📍 http://localhost:${PORT}`);
//   console.log(`🧪 Test GET: http://localhost:${PORT}/api/test`);
//   console.log(`📝 Test POST: http://localhost:${PORT}/api/test-body`);
//   console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat/message`);
//   console.log(`🤖 GROQ Status: ${process.env.GROQ_API_KEY ? '✅ Configured' : '❌ Not configured (using fallback)'}`);
// });






// new
// Backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/admin.routes');
const chatRoutes = require('./routes/chat.routes');

dotenv.config();
connectDB();

const app = express();

// ==================== IMPROVED CORS CONFIGURATION ====================
// Allowed origins - Add your production URLs here
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://job-portal-kxhkpbk57-mrityunjay-kumars-projects-164ce87f.vercel.app',
  'https://job-portal.vercel.app', // Add your main Vercel URL
  'https://*.vercel.app' // Allow all Vercel preview deployments
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For Vercel preview deployments (they have .vercel.app domain)
      if (origin.includes('.vercel.app')) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests explicitly
app.options('*', cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/test-body', (req, res) => {
  res.json({ 
    success: true, 
    message: 'POST request received',
    body: req.body
  });
});

// ==================== ROUTES ====================
// Auth routes (login, register, me)
app.use('/api/auth', require('./routes/user.routes'));
app.use('/api/chat', chatRoutes);

// User profile routes
app.use('/api/users', require('./routes/user.routes'));

// Other routes
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/interviews', require('./routes/interview.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/admin', adminRoutes);
app.use('/api/users', require('./routes/profile.routes'));

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🧪 Test GET: http://localhost:${PORT}/api/test`);
  console.log(`📝 Test POST: http://localhost:${PORT}/api/test-body`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat/message`);
  console.log(`🤖 GROQ Status: ${process.env.GROQ_API_KEY ? '✅ Configured' : '❌ Not configured (using fallback)'}`);
  console.log(`🔧 CORS enabled for development and Vercel deployments`);
});



// // index.js mein CORS section ko aise update karein:
// const allowedOrigins = [
//   'http://localhost:3000', 
//   'http://localhost:3001',
//   process.env.FRONTEND_URL // Ye Render dashboard se aayega
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));



// // index.js
// const allowedOrigins = [
//   'http://localhost:3000', 
//   'http://localhost:3001',
//   process.env.FRONTEND_URL
// ].filter(Boolean); // Ye line 'undefined' values ko array se nikaal degi

// app.use(cors({
//   origin: function (origin, callback) {
//     // Localhost aur direct requests allow karein
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
    
//     // Agar production mein hai aur origin match nahi ho raha
//     console.log("Blocked by CORS:", origin);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));