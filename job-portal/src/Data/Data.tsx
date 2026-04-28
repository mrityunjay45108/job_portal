import { title } from "process";

// ✅ Make this file a proper module
export {};

export const Companies = [
  "Google",
  "Amazon",
  "Figma",
  "Netflix",
  "Meta",
  // "Microsoft",
  "Pintrest",
  "Slack",
  "Spotify",
  "Oracal",
  "Walmart",
  "Tcs",
  "Infosys",
  "Wipro"
];

export const JobCategory = [
  // your data here
];

export const work = [
  {
    name: "Build your resume",
    desc: "create a resume with your skills."
  },
  {
    name: "Apply for job.",
    desc: "Find and apply for job that match your skills"
  },
  {
    name: "Get Hired",
    desc: "connect with employers and start your new job."
  }
];

export const testimonials = [
  {
    name: "Shivam"
  }
];


export const jobCategory = [
  {
    title: "Digital Marketing",
    desc: "Promote brands online with marketing strategies",
    jobs: "1k+ new job posted",
    img: "/icons/marketing.png"
  },
  {
    title: "Web Developer",
    desc: "Build and maintain websites for clients",
    jobs: "2k+ new job posted",
    img: "/icons/webdev.png"
  },
  {
    title: "Arts & Design",
    desc: "Create visual content for branding and media",
    jobs: "500+ new job posted",
    img: "/icons/design.png"
  },
  {
    title: "UI-UX Designer",
    desc: "Design user interfaces and enhance user experience",
    jobs: "800+ new job posted",
    img: "/icons/uiux.png"
  },
  {
    title: "Content Writing",
    desc: "Write and edit content for various platforms",
    jobs: "1.5k+ new job posted",
    img: "/icons/content.png"
  },
  {
    title: "Software Engineer",
    desc: "Develop and maintain software applications",
    jobs: "3k New job posted",
    img: "/icons/Software.png" 
  },
];
  // for internship
export const internshipCategory = [
  {
    img: "/internships/webdev.png",
    title: "Web Development",
    desc: "Frontend and backend development roles.",
    openings: "120+ Internships"
  },
  {
    img: "/internships/uiux.png",
    title: "UI/UX Design",
    desc: "Design modern and user-friendly interfaces.",
    openings: "80+ Internships"
  },
  {
    img: "/internships/ai.png",
    title: "AI & ML",
    desc: "Work on real ML models and AI projects.",
    openings: "60+ Internships"
  },
   {
    img: "/internships/frontend.png",
    title: "Frontend Developer",
    desc: "Work on React, Tailwind, UI components, and build modern interfaces.",
    openings: "150+ Internships"
  },
  {
    img: "/internships/python.png",
    title: "Python Developer",
    desc: "Develop backend systems, APIs, automation scripts, and tools using Python.",
    openings: "130+ Internships"
  },
  {
    img: "/internships/datascience.png",
    title: "Data Science Engineer",
    desc: "Perform web scraping,analyze datasets,build ML models,and automate workflows.",
    openings: "100+ Internships"
  }
];

// data/jobs.js
// Data.ts

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    salary: "₹12 LPA",
  },
];
// src/job-portal/Data.tsx

export const recommendedJobsData = [
  {
    logo: 'Meta', // Placeholder for a logo/icon source
    title: 'Product Designer',
    company: 'Meta',
    applicants: 25,
    level: 'Entry Level',
    type: 'Full-Time',
    location: 'New York',
    description: 'Meta is seeking a Product Designer to join our team. You\'ll be working on designing user-centric interfaces for our blockchai...',
    salary: '₹32 LPA',
    postedDaysAgo: 12,
  },
  {
    logo: 'Netflix',
    title: 'Sr. UX Designer',
    company: 'Netflix',
    applicants: 14,
    level: 'Expert',
    type: 'Part-Time',
    location: 'San Francisco',
    description: 'Netflix is looking for a Sr. UX Designer to enhance our user experience on streaming platforms. Ideal candidates w...',
    salary: '₹40 LPA',
    postedDaysAgo: 5,
  },
  {
    logo: 'Microsoft',
    title: 'Product Designer',
    company: 'Microsoft',
    applicants: 58,
    level: 'Intermediate',
    type: 'Full-Time',
    location: 'Remote',
    description: 'Join Microsoft as a Product Designer and contribute to our new lightspeed LA studio. We\'re looking for designers wh...',
    salary: '₹35 LPA',
    postedDaysAgo: 4,
  },
  {
    logo: 'Adobe',
    title: 'Product Designer',
    company: 'Adobe',
    applicants: 23,
    level: 'Expert',
    type: 'Part-Time',
    location: 'Toronto',
    description: 'Adobe is seeking a part-time Product Designer to help us enhance our user experience. You will work closely with a...',
    salary: '₹33 LPA',
    postedDaysAgo: 22,
  },
  // ... add more data as needed to match the image
];

