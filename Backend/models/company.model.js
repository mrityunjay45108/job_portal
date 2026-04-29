import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Unique hona chahiye taaki duplicate na ho
    trim: true
  },
  description: {
    type: String,
    // Agar registration ke waqt description nahi chahiye toh required: false kar dein
    required: false 
  },
  location: {
    type: String,
    required: false 
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, "Please use a valid URL"]
  },
  logo: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;