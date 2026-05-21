// // Backend/create-admin.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();

// // Admin Schema
// const adminSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   password: String,
//   role: String,
//   isActive: { type: Boolean, default: true }
// });

// const Admin = mongoose.model('Admin', adminSchema);

// async function createAdmin() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
    
//     // Check if admin exists
//     const existingAdmin = await Admin.findOne({ email: 'superadmin@jobportal.com' });
//     if (existingAdmin) {
//       console.log('Admin already exists!');
//       console.log('Email: superadmin@jobportal.com');
//       console.log('Password: Admin@123');
//       process.exit();
//     }
    
//     // Create new admin
//     const hashedPassword = await bcrypt.hash('Admin@123', 10);
//     const admin = await Admin.create({
//       fullName: 'Super Admin',
//       email: 'superadmin@jobportal.com',
//       password: hashedPassword,
//       role: 'super_admin'
//     });
    
//     console.log('Super Admin created successfully!');
//     console.log('Email: superadmin@jobportal.com');
//     console.log(' Password: Admin@13');
//     console.log(' Admin ID:', admin._id);
    
//     process.exit();
//   } catch (error) {
//     console.error(' Error:', error.message);
//     process.exit();
//   }
// }

// createAdmin();