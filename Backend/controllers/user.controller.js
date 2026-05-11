// // Backend/controllers/user.controller.js
// const User = require('../models/User.model');
// const generateToken = require('../utils/generateToken');

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   try {
//     console.log("Register Request:", req.body);
    
//     const { fullName, email, password, phoneNumber, role } = req.body;

//     // Validation
//     if (!fullName) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Full name is required' 
//       });
//     }
    
//     if (!email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email is required' 
//       });
//     }
    
//     if (!password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Password is required' 
//       });
//     }
    
//     if (!phoneNumber) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Phone number is required' 
//       });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Password must be at least 6 characters' 
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'User already exists with this email' 
//       });
//     }

//     // Create new user
//     const user = new User({
//       fullName,
//       email,
//       password,
//       phoneNumber,
//       role: role || 'candidate'
//     });

//     await user.save();
//     console.log("User saved successfully:", user._id);

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile,
//         createdAt: user.createdAt
//       }
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Server error. Please try again.' 
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   try {
//     console.log("Login Request:", req.body);
    
//     const { email, password } = req.body;

//     // Validation
//     if (!email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Email is required' 
//       });
//     }
    
//     if (!password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Password is required' 
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     // Check password
//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid email or password' 
//       });
//     }

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Server error. Please try again.' 
//     });
//   }
// };

// // @desc    Get current user profile
// // @route   GET /api/auth/me
// // @access  Private
// const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }
//     res.json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateProfile = async (req, res) => {
//   try {
//     const { profile } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { profile },
//       { new: true }
//     ).select('-password');
    
//     res.json({
//       success: true,
//       message: 'Profile updated successfully',
//       user
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getCurrentUser,
//   updateProfile
// };





const User = require('../models/User.model');
const generateToken = require('../utils/generateToken');

// ==================== AUTHENTICATION ====================

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log("Register Request:", req.body);
    
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName) {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = new User({
      fullName,
      email,
      password,
      phoneNumber,
      role: role || 'candidate'
    });

    await user.save();
    console.log("User saved successfully:", user._id);

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error. Please try again.' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    console.log("Login Request:", req.body);
    
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error. Please try again.' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profile },
      { new: true }
    ).select('-password');
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ==================== PROFILE FUNCTIONS ====================

// @desc    Get user profile by ID
// @route   GET /api/users/profile/:userId
// @access  Public
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get additional stats
    const Job = require('../models/Job.model');
    const Application = require('../models/Application.model');
    
    let jobCount = 0;
    let applicationCount = 0;
    
    if (user.role === 'recruiter') {
      jobCount = await Job.countDocuments({ companyId: user._id });
    } else if (user.role === 'candidate') {
      applicationCount = await Application.countDocuments({ candidateId: user._id });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
        createdAt: user.createdAt,
        jobCount,
        applicationCount
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update user profile by ID
// @route   PUT /api/users/profile/:userId
// @access  Private (Owner only)
const updateUserProfile = async (req, res) => {
  try {
    // Check if user is updating their own profile
    if (req.userId !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own profile'
      });
    }

    const { name, title, company, location, about, email, phone, website, linkedin, github, twitter, skills, avatar } = req.body;

    const updateData = {
      fullName: name || req.body.fullName,
      email: email || req.body.email,
      phoneNumber: phone || req.body.phoneNumber,
      profile: {
        title: title || req.body.title,
        company: company || req.body.company,
        location: location || req.body.location,
        about: about || req.body.about,
        website: website || req.body.website,
        linkedin: linkedin || req.body.linkedin,
        github: github || req.body.github,
        twitter: twitter || req.body.twitter,
        avatar: avatar || req.body.avatar,
        skills: skills || req.body.skills || []
      }
    };

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    
    await User.findByIdAndUpdate(req.userId, {
      'profile.avatar': avatarUrl
    });

    res.json({
      success: true,
      url: avatarUrl,
      message: 'Avatar uploaded successfully'
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upload resume
// @route   POST /api/users/resume
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    const resumeName = req.file.originalname;
    
    await User.findByIdAndUpdate(req.userId, {
      'profile.resumeUrl': resumeUrl,
      'profile.resumeName': resumeName
    });

    res.json({
      success: true,
      url: resumeUrl,
      name: resumeName,
      message: 'Resume uploaded successfully'
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  uploadResume
};