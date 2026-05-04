export const COMPANY_DATA = {
  id: "1",
  name: "Google",
  logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
  banner: "/talentProfile/profileBanner.avif",
  location: "Mountain View, CA",
  website: "google.com",
  email: "careers@google.com",
  phone: "+1 (650) 253-0000",
  address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
  founded: "1998",
  employees: "150k+",
  industry: "Technology",
  headquarters: "Mountain View, California",
  mission: "To organize the world's information and make it universally accessible and useful. We believe that information can change lives.",
  vision: "To provide access to the world's information in one click.",
  about: "Google is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.",
  stats: [
    { label: "Industry", value: "Technology", icon: "💻" },
    { label: "Employees", value: "150k+", icon: "👥" },
    { label: "Founded", value: "1998", icon: "📅" },
    { label: "Headquarters", value: "California, USA", icon: "📍" }
  ],
  jobs: [
    { 
      id: "1",
      title: "Senior Software Engineer", 
      location: "Mountain View, CA", 
      type: "Full-time", 
      salary: "$150k - $220k", 
      posted: "2 days ago",
      description: "We are looking for a Senior Software Engineer to join our core search team. You will be responsible for building and maintaining large-scale distributed systems.",
      skills: ["Java", "C++", "Python", "Distributed Systems", "Machine Learning"]
    },
    { 
      id: "2",
      title: "Product Designer", 
      location: "Remote", 
      type: "Full-time", 
      salary: "$120k - $180k", 
      posted: "5 days ago",
      description: "Join our design team to create intuitive and beautiful user experiences for millions of users worldwide.",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Design Systems"]
    },
    { 
      id: "3",
      title: "Frontend Developer", 
      location: "New York, NY", 
      type: "Full-time", 
      salary: "$130k - $190k", 
      posted: "1 week ago",
      description: "Build responsive and performant web applications using modern frontend technologies.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    }
  ],
  reviews: [
    { 
      id: "1",
      name: "Sushma kumari", 
      date: "12 Oct 2023", 
      rating: 5, 
      comment: "Great work culture and amazing perks. The company really cares about employee well-being.",
      position: "Software Engineer",
      avatar: "https://ui-avatars.com/api/?name=Sushma+Kumari&background=3b82f6&color=fff"
    },
    { 
      id: "2",
      name: "Mrityunjay kumar", 
      date: "05 Sep 2023", 
      rating: 4, 
      comment: "Innovative projects, but fast-paced. Great learning opportunities and talented colleagues.",
      position: "Frontend Developer",
      avatar: "https://ui-avatars.com/api/?name=Mrityunjay+Kumar&background=3b82f6&color=fff"
    }
  ],
  social: {
    linkedin: "https://linkedin.com/company/google",
    twitter: "https://twitter.com/google",
    github: "https://github.com/google",
    youtube: "https://youtube.com/google"
  }
};

export default COMPANY_DATA;