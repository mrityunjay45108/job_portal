import { useState } from "react";
import { Card, Badge, Text, Group, Avatar, ActionIcon, Button } from "@mantine/core";
import { IconMapPin, IconBriefcase, IconCurrencyDollar, IconHeart, IconHeartFilled, IconBookmark } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Microsoft",
    logo: "/Icons/Microsoft.png",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $170k",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Next.js"],
    rating: 4.5
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Amazon",
    logo: "/Icons/Amazon.png",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140k - $180k",
    posted: "1 day ago",
    skills: ["Node.js", "Python", "AWS"],
    rating: 4.3
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Meta",
    logo: "/Icons/Meta.png",
    location: "Remote",
    type: "Contract",
    salary: "$90k - $120k",
    posted: "3 days ago",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    rating: 4.6
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Netflix",
    logo: "/Icons/Netflix.png",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    posted: "5 days ago",
    skills: ["Kubernetes", "Docker", "AWS"],
    rating: 4.4
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Apple",
    logo: "/Icons/Apple.png",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$160k - $210k",
    posted: "1 week ago",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    rating: 4.7
  }
];

const RecommendedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const toggleSave = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
        <Badge color="blue" variant="light" className="bg-blue-50 text-blue-600">
          {recommendedJobs.length} Jobs
        </Badge>
      </div>
      
      <div className="flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
        {recommendedJobs.map((job) => (
          <Card 
            key={job.id}
            className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            padding="md"
          >
            <div className="flex gap-3">
              {/* Company Logo */}
              <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <Avatar size="md" radius="md" src={job.logo} className="w-10 h-10">
                  {job.company[0]}
                </Avatar>
              </div>

              {/* Job Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <Link to="/job-details">
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                  </Link>
                  <ActionIcon 
                    variant="subtle" 
                    color="gray" 
                    onClick={() => toggleSave(job.id)}
                    className="hover:bg-red-50"
                  >
                    {savedJobs.includes(job.id) ? (
                      <IconHeartFilled size={16} className="text-red-500" />
                    ) : (
                      <IconHeart size={16} className="text-gray-400" />
                    )}
                  </ActionIcon>
                </div>
                
                <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <IconMapPin size={12} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <IconBriefcase size={12} />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
                    <IconCurrencyDollar size={12} />
                    {job.salary}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} size="xs" variant="light" color="blue" className="bg-blue-50 text-blue-600">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 2 && (
                    <Badge size="xs" variant="light" color="gray">
                      +{job.skills.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">Posted {job.posted}</p>
                  <Button 
                    variant="light" 
                    color="blue" 
                    size="xs" 
                    radius="xl"
                    component={Link}
                    to="/apply-job"
                  >
                    Quick Apply
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link to="/find-jobs">
          <Button variant="subtle" color="blue" fullWidth radius="xl">
            View All Recommendations
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedJobs;