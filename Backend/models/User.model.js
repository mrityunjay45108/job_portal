// Backend/models/User.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    profile: {
      // Basic info
      location: { type: String, default: "" },
      title: { type: String, default: "" },
      company: { type: String, default: "" },
      bio: { type: String, default: "" },

      // Skills & Experience
      skills: [{ type: String }],
      experience: [{ type: Object }], // Store experiences array
      education: [{ type: Object }], // Store education array
      certifications: [{ type: Object }], // Store certifications array

      // Resume fields (Cloudinary support)
      resumeName: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
      resumePublicId: { type: String, default: "" },

      // Social links
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },

      // Avatar (Cloudinary support)
      avatar: { type: String, default: "" },
      avatarPublicId: { type: String, default: "" },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// ==================== INDEXES ====================
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "profile.skills": 1 });

// ==================== PRE-SAVE HOOKS ====================
// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// ==================== INSTANCE METHODS ====================
// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ==================== STATIC METHODS ====================
// Find user by email (case insensitive)
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Get candidate profile
userSchema.methods.getCandidateProfile = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    location: this.profile.location,
    title: this.profile.title,
    company: this.profile.company,
    bio: this.profile.bio,
    skills: this.profile.skills,
    experience: this.profile.experience,
    education: this.profile.education,
    certifications: this.profile.certifications,
    linkedin: this.profile.linkedin,
    github: this.profile.github,
    portfolio: this.profile.portfolio,
    avatar: this.profile.avatar,
    resumeUrl: this.profile.resumeUrl,
    resumeName: this.profile.resumeName,
  };
};

// Get recruiter profile
userSchema.methods.getRecruiterProfile = function () {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    company: this.profile.company,
    location: this.profile.location,
    avatar: this.profile.avatar,
  };
};

module.exports = mongoose.model("User", userSchema);
