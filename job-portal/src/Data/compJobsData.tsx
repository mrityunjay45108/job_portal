// src/data/compJobsData.ts

export const companyData = {
  id: "cmp_001",
  name: "Google",
  logo: "/Avatar.png",
  banner: "/Profile/banner.jpg",
  industry: "Technology",
  location: "New York, United States",
  employeesCount: 156000,
  founded: 1998,
};

export const companyEmployees = [
  {
    id: "emp_101",
    name: "Jarrod Wood",
    designation: "Senior Software Engineer",
    department: "Engineering",
    location: "New York, USA",
    experience: "8 Years",
    avatar: "/employees/jarrod.png",
  },
  {
    id: "emp_102",
    name: "Emily Carter",
    designation: "Product Manager",
    department: "Product",
    location: "California, USA",
    experience: "6 Years",
    avatar: "/employees/emily.png",
  },
  {
    id: "emp_103",
    name: "Michael Lee",
    designation: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    experience: "5 Years",
    avatar: "/employees/michael.png",
  },
];

export const companyJobs = [
  {
    id: "job_201",
    title: "Software Engineer",
    department: "Engineering",
    employmentType: "Full Time",
    experienceRequired: "2+ Years",
    location: "New York, USA",
    salary: "₹15 – ₹25 LPA",
    postedAt: "3 days ago",
    applicants: 48,
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    description:
      "We are looking for a Software Engineer to build scalable applications.",
  },
  {
    id: "job_202",
    title: "Frontend Developer",
    department: "Engineering",
    employmentType: "Remote",
    experienceRequired: "1–3 Years",
    location: "Remote",
    salary: "₹10 – ₹18 LPA",
    postedAt: "5 days ago",
    applicants: 72,
    skills: ["React", "Tailwind", "TypeScript"],
    description:
      "Responsible for building responsive UI and improving UX.",
  },
  {
    id: "job_203",
    title: "Product Manager",
    department: "Product",
    employmentType: "Full Time",
    experienceRequired: "4+ Years",
    location: "California, USA",
    salary: "₹20 – ₹35 LPA",
    postedAt: "1 week ago",
    applicants: 31,
    skills: ["Agile", "Scrum", "Roadmap Planning"],
    description:
      "Lead product strategy and coordinate with engineering teams.",
  },
];
