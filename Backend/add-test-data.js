const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User.model');
const Job = require('./models/Job.model');
const Application = require('./models/Application.model');

async function addMoreData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Add more candidates
    const candidates = await User.insertMany([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('123456', 10),
        phoneNumber: '9876543210',
        role: 'candidate',
        profile: { skills: ['React', 'Node.js'], title: 'Frontend Developer' }
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('123456', 10),
        phoneNumber: '9876543211',
        role: 'candidate',
        profile: { skills: ['Python', 'Django'], title: 'Backend Developer' }
      }
    ]);
    console.log('✅ Added 2 more candidates');

    // Add more jobs
    const recruiter = await User.findOne({ role: 'recruiter' });
    const jobs = await Job.insertMany([
      {
        companyId: recruiter._id,
        companyName: 'Tech Corp',
        jobTitle: 'Frontend Developer',
        location: 'New York, NY',
        description: 'Looking for React expert',
        jobType: 'Full-time',
        salary: '$80k - $120k',
        skills: ['React', 'TypeScript', 'Tailwind'],
        status: 'active'
      },
      {
        companyId: recruiter._id,
        companyName: 'Tech Corp',
        jobTitle: 'Backend Developer',
        location: 'Remote',
        description: 'Looking for Node.js expert',
        jobType: 'Full-time',
        salary: '$90k - $130k',
        skills: ['Node.js', 'Express', 'MongoDB'],
        status: 'active'
      }
    ]);
    console.log('✅ Added 2 more jobs');

    // Add applications
    const job = await Job.findOne({ jobTitle: 'Software Engineer' });
    await Application.create({
      jobId: job._id,
      jobTitle: job.jobTitle,
      company: job.companyName,
      candidateId: candidates[0]._id,
      candidateName: candidates[0].fullName,
      candidateEmail: candidates[0].email,
      candidatePhone: candidates[0].phoneNumber,
      coverLetter: 'I am very interested in this position',
      status: 'pending',
      appliedDate: new Date()
    });
    console.log('✅ Added 1 application');

    console.log('\n✅ More test data added successfully!');
    console.log(`📊 Total Candidates: ${await User.countDocuments({ role: 'candidate' })}`);
    console.log(`📊 Total Jobs: ${await Job.countDocuments()}`);
    console.log(`📊 Total Applications: ${await Application.countDocuments()}`);
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit();
  }
}

addMoreData();

