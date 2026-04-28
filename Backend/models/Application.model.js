// @ts-check
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume"
  },
  status: {
    type: String,
    enum: ["applied", "shortlisted", "rejected"],
    default: "applied"
  },
  coverLetter: {
    type: String
  }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

export default Application;