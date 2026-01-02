// 1. Saare imports sabse pehle (Top par)
import { IconBriefcase, IconMapPin } from "@tabler/icons-react"; 

// 2. Profile Data Object
const profileData = { 
  name: "Mrityunjay Kumar",
  title: "Full Stack Developer",
  company: "Google",
  location: "Bangalore, India",
  avatar: "/TalentProfile/Piccc.jpeg",
  banner: "/TalentProfile/ProfileBanner.avif",
  about: "Passionate developer with 3+ years of experience in building scalable web applications using React, Node.js, and Cloud technologies.",
  skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "Tailwind CSS", "Docker"],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Working on Google Cloud Platform, improving dashboard performance by 40% and leading a team of 5 developers.",
      companyIcon: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png"
    },
    {
      title: "Software Developer",
      company: "Microsoft",
      location: "Hyderabad",
      startDate: "June 2021",
      endDate: "Dec 2022",
      description: "Developed microservices for Azure using .NET Core and integrated third-party APIs for seamless data flow.",
      companyIcon: "https://img.icons8.com/color/48/microsoft.png"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Aug 2023",
      id: "AWS-123456",
      issuerIcon: "https://img.icons8.com/color/48/amazon-web-services.png"
    }
  ]
};

// 3. Fields Data for SelectInput
export const fields = [
    {
        label: "Job Title",
        placeholder: "Enter Job Title",
        options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'],
        value: "Software Engineer",
        leftSection: IconBriefcase
    },
    {
        label: "Company",
        placeholder: "Enter Company Name",
        options: ['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'],
        value: "Google",
        leftSection: IconBriefcase
    },
    {
        label: "Location",
        placeholder: "Enter Job Location",
        options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'],
        value: "New York, United States",
        leftSection: IconMapPin
    }
];

// 4. Default export hamesha last mein
export default profileData;