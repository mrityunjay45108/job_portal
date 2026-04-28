import { IconBriefcase, IconMapPin, IconRecharging, IconSearch } from '@tabler/icons-react';

// --- Types ---

export interface dropdownData {
  title: string;
  icon: typeof IconSearch | typeof IconMapPin | typeof IconBriefcase | typeof IconRecharging;
  options: string[];
}

export interface Job {
  jobTitle: string;
  company: string;
  applicants: number;
  experience: 'Entry Level' | 'Intermediate' | 'Expert';
  jobType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance' | 'Internship';
  location: string;
  package: string; // Salary/Package
  // Fields inferred from the JobCard UI and existing data structure
  description: string;
  posted: string;
  bookmarked: boolean;
  companyIcon: string;
  companyColor: string;
}

// --- Filter Dropdown Data ---

export const dropdownData: dropdownData[] = [
  { 
    title: "Job Title", 
    icon: IconSearch, 
    options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] 
  },
  { 
    title: "Location", 
    icon: IconMapPin, 
    options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'] 
  },
  { 
    title: "Experience", 
    icon: IconBriefcase, 
    options: ['Entry Level', 'Intermediate', 'Expert'] 
  },
  { 
    title: "Job Type", 
    icon: IconRecharging, 
    options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] 
  }
];

// --- Initial Job List Data ---

export const jobList: Job[] = [
  {
    jobTitle: "Product Designer",
    company: "Meta",
    companyIcon: "🔷",
    companyColor: "#0084ff",
    applicants: 25,
    experience: "Entry Level",
    jobType: "Full-Time",
    location: "New York",
    package: "32 LPA",
    description: "Meta is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain...",
    posted: "12 days ago",
    bookmarked: false
  },
  {
    jobTitle: "Sr. UX Designer",
    company: "Netflix",
    companyIcon: "N",
    companyColor: "#E50914",
    applicants: 14,
    experience: "Expert",
    jobType: "Part-Time",
    location: "San Francisco",
    package: "40 LPA",
    description: "Netflix is looking for a Sr. UX Designer to enhance our user experience on streaming platforms. Ideal candidates w...",
    posted: "5 days ago",
    bookmarked: false
  },
  {
    jobTitle: "Product Designer",
    company: "Microsoft",
    companyIcon: "🪟",
    companyColor: "#00A4EF",
    applicants: 58,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Remote",
    package: "35 LPA",
    description: "Join Microsoft as a Product Designer and contribute to our new Lightspeed LA studio. We're looking for designers wh...",
    posted: "4 days ago",
    bookmarked: false
  },
  {
    jobTitle: "Product Designer",
    company: "Adobe",
    companyIcon: "🅰️",
    companyColor: "#FF0000",
    applicants: 23,
    experience: "Expert",
    jobType: "Part-Time",
    location: "Toronto",
    package: "33 LPA",
    description: "Adobe is seeking a part-time Product Designer to help us enhance our user experience. You will work closely with o...",
    posted: "22 days ago",
    bookmarked: false
  },
  {
    jobTitle: "Backend Developer",
    company: "Google",
    companyIcon: "G",
    companyColor: "#4285F4",
    applicants: 21,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Mountain View",
    package: "45 LPA",
    description: "Google is looking for a Backend Developer to work on scalable systems and APIs. You'll collaborate with cross-functional teams...",
    posted: "8 days ago",
    bookmarked: false
  },
  {
    jobTitle: "SMM Manager",
    company: "Spotify",
    companyIcon: "🎵",
    companyColor: "#1DB954",
    applicants: 73,
    experience: "Entry Level",
    jobType: "Full-Time",
    location: "Stockholm",
    package: "28 LPA",
    description: "Spotify is seeking a Social Media Marketing Manager to drive engagement and grow our brand presence across platforms...",
    posted: "3 days ago",
    bookmarked: false
  },
  {
    jobTitle: "Frontend Developer",
    company: "Amazon",
    companyIcon: "📦",
    companyColor: "#FF9900",
    applicants: 50,
    experience: "Intermediate",
    jobType: "Full-Time",
    location: "Seattle",
    package: "38 LPA",
    description: "Amazon is hiring a Frontend Developer to create stunning user interfaces for our e-commerce platform. Experience with React required...",
    posted: "6 days ago",
    bookmarked: false
  },
  {
    jobTitle: "iOS Developer",
    company: "Apple",
    companyIcon: "", // Using the Apple logo approximation
    companyColor: "#555555",
    applicants: 30,
    experience: "Expert",
    jobType: "Full-Time",
    location: "Cupertino",
    package: "52 LPA",
    description: "Apple is looking for an experienced iOS Developer to work on cutting-edge mobile applications. Deep knowledge of Swift required...",
    posted: "10 days ago",
    bookmarked: false
  },
  
];
// Job Titles
export const jobTitles = dropdownData.find(
  (item) => item.title === "Job Title"
)?.options || [];

// Locations
export const locations = dropdownData.find(
  (item) => item.title === "Location"
)?.options || [];

// Experience
export const experiences = dropdownData.find(
  (item) => item.title === "Experience"
)?.options || [];

// Job Types
export const jobTypes = dropdownData.find(
  (item) => item.title === "Job Type"
)?.options || [];

//skills 
