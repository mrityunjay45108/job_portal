// register controller
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Registration failed" });
  }
};




// login controller

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    //  Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Clean user object (password remove)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profilePicture,
    };

    // Send cookie + response
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: userData,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error - Login failed",
      success: false,
    });
  }
};




// logout controller

export const logout = (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};

//update profile controller



export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { username, email, phoneNumber } = req.body;
    const file = req.file;

    let updateData = {};

    // Only update fields if provided
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    // Handle profile image (if uploaded)
    if (file) {
      updateData.profilePicture = file.path; // or cloudinary URL
    }

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  await updatedUser.save(); 
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePicture: updatedUser.profilePicture,
        phoneNumber: updatedUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Profile update failed" });
  }
};