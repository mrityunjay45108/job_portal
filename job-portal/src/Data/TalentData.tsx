// Helper function to generate consistent avatar based on name
const getAvatarUrl = (name: string) => {
  // API that generates cute avatars - this URL works fine in img tags
  return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(name)}`;
};

export const talentData = [
  {
    id: 1,
    name: "Mrityunjay Kumar",
    title: "Software Engineer",
    company: "Infosys",
    skills: ["React", "SpringBoot", "MongoDB", "Docker"],
    salary: 75,
    location: "San Francisco",
    postedDaysAgo: 2,
    avatar: getAvatarUrl("Mrityunjay Kumar"), // Will generate a unique avatar
    about: "Passionate Software Engineer with 4+ years of experience building scalable web applications...",
    experience: [
      {
        title: "Software Engineer",
        company: "Google",
        location: "San Francisco, USA",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Building next-generation search features and optimizing backend performance...",
        companyIcon: "/Icons/Google.png"
      },
      {
        title: "Junior Developer",
        company: "Infosys",
        location: "Bangalore, India",
        startDate: "Jul 2020",
        endDate: "Dec 2021",
        description: "Developed UI components for banking applications...",
        companyIcon: "/Icons/Infosys.jpg"
      }
    ],
    certifications: [
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google",
        date: "Jun 2023",
        id: "GCP-9921-X",
        issuerIcon: "/Icons/Google.png"
      }
    ]
  },
  {
    id: 2,
    name: "Manjay Kumar",
    title: "Full Stack Developer",
    company: "Meta",
    skills: ["Node.js", "Python", "PostgreSQL"],
    salary: 85,
    location: "New York",
    postedDaysAgo: 1,
    avatar: getAvatarUrl("Manjay Kumar"),
    about: "Full Stack Developer focused on creating seamless user experiences...",
    experience: [
      {
        title: "Full Stack Developer",
        company: "Meta",
        location: "New York, USA",
        startDate: "Mar 2021",
        endDate: "Present",
        description: "Architecting social media features and improving data consistency...",
        companyIcon: "/Icons/Meta.png"
      }
    ],
    certifications: [
      {
        name: "Meta Full Stack Specialization",
        issuer: "Meta",
        date: "Jan 2024",
        id: "META-CERT-77",
        issuerIcon: "/Icons/Meta.png"
      }
    ]
  },
  {
    id: 3,
    name: "Madhu Sudan Kumar",
    title: "Backend Engineer",
    company: "Amazon",
    skills: ["Java", "AWS", "Docker"],
    salary: 95,
    location: "Seattle",
    postedDaysAgo: 3,
    avatar: getAvatarUrl("Madhu Sudan Kumar"),
    about: "Backend enthusiast with a deep interest in cloud architecture...",
    experience: [
      {
        title: "Backend Engineer",
        company: "Amazon",
        location: "Seattle, USA",
        startDate: "Feb 2020",
        endDate: "Present",
        description: "Scaling distributed systems and managing AWS Lambda functions...",
        companyIcon: "/Icons/Amazon.png"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon",
        date: "Aug 2021",
        id: "AWS-SA-882",
        issuerIcon: "/Icons/Amazon.png"
      }
    ]
  },
  {
    id: 4,
    name: "Abhishek Kumar",
    title: "Frontend Developer",
    company: "Netflix",
    skills: ["React", "TypeScript", "GraphQL"],
    salary: 80,
    location: "Los Angeles",
    postedDaysAgo: 5,
    avatar: getAvatarUrl("Abhishek Kumar"),
    about: "Frontend Specialist dedicated to building high-performance streaming interfaces...",
    experience: [
      {
        title: "Frontend Developer",
        company: "Netflix",
        location: "Los Angeles, USA",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Optimizing video player UI and implementing new features...",
        companyIcon: "/Icons/Netflix.png"
      }
    ],
    certifications: [
      {
        name: "React Advanced Patterns",
        issuer: "Frontend Masters",
        date: "May 2022",
        id: "FM-RCT-101",
        issuerIcon: "/Icons/Netflix.png"
      }
    ]
  },
  {
    id: 5,
    name: "Aditya Kumar",
    title: "DevOps Engineer",
    company: "Microsoft",
    skills: ["Kubernetes", "Jenkins", "Terraform"],
    salary: 90,
    location: "Austin",
    postedDaysAgo: 4,
    avatar: getAvatarUrl("Aditya Kumar"),
    about: "Infrastructure Engineer specialized in CI/CD automation...",
    experience: [
      {
        title: "DevOps Engineer",
        company: "Microsoft",
        location: "Austin, USA",
        startDate: "Jun 2021",
        endDate: "Present",
        description: "Implementing automated pipelines for Azure services...",
        companyIcon: "/Icons/Microsoft.png"
      }
    ],
    certifications: [
      {
        name: "Microsoft Certified: Azure DevOps Engineer",
        issuer: "Microsoft",
        date: "Oct 2022",
        id: "MSFT-AZ-400",
        issuerIcon: "/Icons/Microsoft.png"
      }
    ]
  },
  {
    id: 6,
    name: "Aarav Kumar",
    title: "Data Scientist",
    company: "Apple",
    skills: ["Python", "TensorFlow", "Pandas"],
    salary: 100,
    location: "Cupertino",
    postedDaysAgo: 1,
    avatar: getAvatarUrl("Aarav Kumar"),
    about: "Data Scientist with a passion for Machine Learning...",
    experience: [
      {
        title: "Data Scientist",
        company: "Apple",
        location: "Cupertino, USA",
        startDate: "Apr 2022",
        endDate: "Present",
        description: "Developing machine learning models for Siri...",
        companyIcon: "/Icons/Apple.png"
      },
      {
        title: "Data Analyst",
        company: "IBM",
        location: "San Jose, USA",
        startDate: "Jan 2020",
        endDate: "Mar 2022",
        description: "Analyzed large datasets for enterprise clients...",
        companyIcon: "/Icons/IBM.png"
      }
    ],
    certifications: [
      {
        name: "Deep Learning Specialization",
        issuer: "Coursera",
        date: "Dec 2021",
        id: "COUR-DL-99",
        issuerIcon: "/Icons/Apple.png"
      }
    ]
  }
];