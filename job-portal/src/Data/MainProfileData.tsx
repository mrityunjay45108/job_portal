// // 1. Saare imports sabse pehle (Top par)
// import { IconBriefcase, IconMapPin } from "@tabler/icons-react"; 

// // 2. Profile Data Object
// const profileData = { 
//   name: "Mrityunjay Kumar",
//   title: "Full Stack Developer",
//   company: "Google",
//   location: "Bangalore, India",
//   avatar: "/TalentProfile/Piccc.jpeg",
//   banner: "/TalentProfile/ProfileBanner.avif",
//   about: "Passionate developer with 3+ years of experience in building scalable web applications using React, Node.js, and Cloud technologies.",
//   skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Tailwind CSS", "Docker"],
//   experience: [
//     {
//       title: "Senior Software Engineer",
//       company: "Google",
//       location: "Bangalore",
//       startDate: "Jan 2023",
//       endDate: "Present",
//       description: "Working on Google Cloud Platform, improving dashboard performance by 40% and leading a team of 5 developers.",
//       companyIcon: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
//     },
//     {
//       title: "Software Developer",
//       company: "Microsoft",
//       location: "Hyderabad",
//       startDate: "June 2021",
//       endDate: "Dec 2022",
//       description: "Developed microservices for Azure using .NET Core and integrated third-party APIs for seamless data flow.",
//       companyIcon: "https://img.icons8.com/color/48/microsoft.png"
//     }
//   ],
//   certifications: [
//     {
//       name: "AWS Certified Solutions Architect",
//       issuer: "Amazon Web Services",
//       date: "Aug 2023",
//       id: "AWS-123456",
//       issuerIcon: "https://img.icons8.com/color/48/amazon-web-services.png"
//     }
//   ]
// };

// // 3. Fields Data for SelectInput
// export const fields = [
//     {
//         label: "Job Title",
//         placeholder: "Enter Job Title",
//         options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'],
//         value: "Software Engineer",
//         leftSection: IconBriefcase
//     },
//     {
//         label: "Company",
//         placeholder: "Enter Company Name",
//         options: ['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'],
//         value: "Google",
//         leftSection: IconBriefcase
//     },
//     {
//         label: "Location",
//         placeholder: "Enter Job Location",
//         options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'],
//         value: "New York, United States",
//         leftSection: IconMapPin
//     }
// ];



// // 4. Default export hamesha last mein
// export default profileData;
  

// 1. Saare imports sabse pehle (Top par)
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";

// 2. Profile Data Object
const profileData = {
  id: "user_123",
  name: "Mrityunjay Kumar",
  title: "Full Stack Developer",
  company: "Google",
  location: "Bangalore, India",
  avatar: "/TalentProfile/Piccc.jpeg",
  banner: "/TalentProfile/ProfileBanner.avif",
  email: "mrityunjay.kumar@google.com",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/mrityunjay-kumar",
  github: "https://github.com/mrityunjaykumar",
  website: "https://mrityunjay.dev",
  about: "Passionate developer with 3+ years of experience in building scalable web applications using React, Node.js, and Cloud technologies. I love solving complex problems and creating impactful solutions that make a difference.",
  skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Tailwind CSS", "Docker", "GraphQL", "Next.js"],
  experience: [
    {
      id: "exp_1",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Working on Google Cloud Platform, improving dashboard performance by 40% and leading a team of 5 developers. Implemented real-time analytics features and optimized API response times.",
      companyIcon: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png",
      technologies: ["React", "TypeScript", "Node.js", "Google Cloud", "BigQuery"]
    },
    {
      id: "exp_2",
      title: "Software Developer",
      company: "Microsoft",
      location: "Hyderabad, India",
      startDate: "June 2021",
      endDate: "Dec 2022",
      description: "Developed microservices for Azure using .NET Core and integrated third-party APIs for seamless data flow. Reduced response time by 25% through caching strategies.",
      companyIcon: "https://img.icons8.com/color/48/microsoft.png",
      technologies: ["C#", ".NET Core", "Azure", "SQL Server", "Redis"]
    },
    {
      id: "exp_3",
      title: "Frontend Developer Intern",
      company: "Amazon",
      location: "Bangalore, India",
      startDate: "Jan 2021",
      endDate: "May 2021",
      description: "Assisted in building responsive e-commerce components and improved website accessibility scores.",
      companyIcon: "https://img.icons8.com/color/48/amazon.png",
      technologies: ["React", "Redux", "SCSS", "Jest"]
    }
  ],
  certifications: [
    {
      id: "cert_1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Aug 2023",
      issueDate: "Aug 2023",
      expiryDate: "Aug 2026",
      credentialId: "AWS-123456",
      credentialUrl: "https://aws.amazon.com/verification/123456",
      issuerIcon: "https://img.icons8.com/color/48/amazon-web-services.png",
      verified: true
    },
    {
      id: "cert_2",
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "May 2023",
      issueDate: "May 2023",
      expiryDate: "May 2026",
      credentialId: "GCP-789012",
      credentialUrl: "https://google.com/verification/789012",
      issuerIcon: "https://img.icons8.com/color/48/google-cloud.png",
      verified: true
    },
    {
      id: "cert_3",
      name: "Meta Frontend Developer Professional Certificate",
      issuer: "Meta",
      date: "Jan 2023",
      issueDate: "Jan 2023",
      credentialId: "META-FE-345678",
      credentialUrl: "https://coursera.org/verify/meta-fe-345678",
      issuerIcon: "https://img.icons8.com/color/48/facebook-new.png",
      verified: true
    }
  ],
  languages: [
    { name: "English", level: "Fluent", proficiency: 95 },
    { name: "Hindi", level: "Native", proficiency: 100 },
    { name: "Spanish", level: "Conversational", proficiency: 60 }
  ]
};

// 3. Fields Data for SelectInput
export const fields = [
  {
    label: "Job Title",
    placeholder: "Enter Job Title",
    options: [
      'Designer', 
      'Developer', 
      'Product Manager', 
      'Marketing Specialist', 
      'Data Analyst', 
      'Sales Executive', 
      'Content Writer', 
      'Customer Support',
      'Software Engineer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'DevOps Engineer',
      'Data Scientist'
    ],
    value: "Software Engineer",
    leftSection: IconBriefcase
  },
  {
    label: "Company",
    placeholder: "Enter Company Name",
    options: [
      'Google', 
      'Microsoft', 
      'Meta', 
      'Netflix', 
      'Adobe', 
      'Facebook', 
      'Amazon', 
      'Apple', 
      'Spotify',
      'Tesla',
      'Twitter',
      'LinkedIn',
      'Uber',
      'Airbnb'
    ],
    value: "Google",
    leftSection: IconBriefcase
  },
  {
    label: "Location",
    placeholder: "Enter Job Location",
    options: [
      'Delhi', 
      'New York', 
      'San Francisco', 
      'London', 
      'Berlin', 
      'Tokyo', 
      'Sydney', 
      'Toronto',
      'Bangalore',
      'Hyderabad',
      'Mumbai',
      'Singapore',
      'Dubai',
      'Paris'
    ],
    value: "New York, United States",
    leftSection: IconMapPin
  }
];

// 4. Default export hamesha last mein
export default profileData;