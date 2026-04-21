import mongoose from "mongoose";

   const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'Recruiter', 'admin'],
        default: 'student',
        required: true,
    },
    skills: [
      {
        type: String,
      }
    ],
     experience: {
        type: String,
    },
     education: {
        type: String,
    },
     profilePicture: {
        type: String,
        default:" "
    },
    resume: {
        type: String,
    },
    resumeOriginalName: {
        type: String,
    },
    company:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;