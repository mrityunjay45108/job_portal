// register controller
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req,res)=>{
try{

const {fullname,email,phoneNumber,password,role}=req.body;

if(!fullname || !email || !phoneNumber || !password || !role){
return res.status(400).json({
message:"All fields are required"
});
}

const user = await User.findOne({email});

if(user){
return res.status(400).json({
message:"User already exists"
});
}

const hashedPassword = await bcrypt.hash(password,10);

const newUser = await User.create({
fullname,
email,
phoneNumber,
password:hashedPassword,
role
});

res.status(201).json({
message:"Registered Successfully",
success:true,
user:newUser
});

}catch(error){
console.log(error);
res.status(500).json({
message:"Server Error"
})
}
};




// login controller

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

    const { fullname, email, phoneNumber } = req.body;
    const file = req.file;

    let updateData = {};

    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    if (file) {
      updateData.profilePicture = file.path;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    // Email duplicate check
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already in use" });
      }
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

    const { password, ...safeUser } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error - Profile update failed" });
  }
};

