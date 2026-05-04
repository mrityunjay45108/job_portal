// Backend/controllers/upload.controller.js
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User.model');
const Application = require('../models/Application.model');

// @desc    Upload resume
// @route   POST /api/upload/resume
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Update user's profile with resume URL
    const resumeUrl = req.file.path;
    const resumePublicId = req.file.filename;
    
    await User.findByIdAndUpdate(req.userId, {
      'profile.resumeUrl': resumeUrl,
      'profile.resumePublicId': resumePublicId,
      'profile.resumeName': req.file.originalname
    });

    res.json({
      success: true,
      url: resumeUrl,
      publicId: resumePublicId,
      fileName: req.file.originalname,
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

// @desc    Upload avatar
// @route   POST /api/upload/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Delete old avatar if exists
    const user = await User.findById(req.userId);
    if (user?.profile?.avatarPublicId) {
      await cloudinary.uploader.destroy(user.profile.avatarPublicId);
    }

    const avatarUrl = req.file.path;
    const avatarPublicId = req.file.filename;

    await User.findByIdAndUpdate(req.userId, {
      'profile.avatar': avatarUrl,
      'profile.avatarPublicId': avatarPublicId
    });

    res.json({
      success: true,
      url: avatarUrl,
      publicId: avatarPublicId,
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

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
const deleteFile = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required'
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    res.json({
      success: true,
      message: 'File deleted successfully',
      result
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  uploadResume,
  uploadAvatar,
  deleteFile
};