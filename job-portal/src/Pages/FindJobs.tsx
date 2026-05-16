import {
  Divider,
  Pagination,
  Skeleton,
} from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";
import Sort from "../FindJobs/Sort";
import api from "../services/api";

// Export this interface so it can be imported by Jobs.tsx
export interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  description: string;
  skills: string[];
  applicantsCount: number;
  postedDate: string;
  urgentHiring?: boolean;
}

const FindJobs = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState<string>("Most Recent");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getSampleJobs = useCallback((): Job[] => {
    return [
      {
        _id: "1",
        jobTitle: "Senior Frontend Developer",
        companyName: "Google",
        location: "New York, USA",
        salary: "$120k - $150k",
        jobType: "Full-time",
        experience: "5+ years",
        description: "We are looking for a Senior Frontend Developer with expertise in React and TypeScript to join our team...",
        skills: ["React", "TypeScript", "Next.js", "Tailwind"],
        applicantsCount: 48,
        postedDate: "2 days ago",
        urgentHiring: true,
      },
      {
        _id: "2",
        jobTitle: "Backend Engineer",
        companyName: "Amazon",
        location: "London, UK",
        salary: "$90k - $120k",
        jobType: "Full-time",
        experience: "3-5 years",
        description: "Join our backend team to build scalable services using Node.js and AWS...",
        skills: ["Node.js", "Python", "AWS", "Docker"],
        applicantsCount: 32,
        postedDate: "5 days ago",
      },
      {
        _id: "3",
        jobTitle: "DevOps Engineer",
        companyName: "Microsoft",
        location: "Seattle, USA",
        salary: "$110k - $140k",
        jobType: "Full-time",
        experience: "3+ years",
        description: "Looking for DevOps engineer with Kubernetes and CI/CD experience...",
        skills: ["Kubernetes", "Docker", "Jenkins", "Terraform"],
        applicantsCount: 24,
        postedDate: "1 week ago",
      },
    ];
  }, []);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/jobs/active');
      console.log("Jobs response:", response.data);
      
      if (response.data.success && response.data.jobs) {
        const formattedJobs: Job[] = response.data.jobs.map((job: any) => ({
          _id: job._id,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          location: job.location,
          salary: job.salary || "Negotiable",
          jobType: job.jobType,
          experience: job.experience,
          description: job.description,
          skills: job.skills || [],
          applicantsCount: job.applicantsCount || 0,
          postedDate: job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "Just now",
          urgentHiring: false,
        }));
        setJobs(formattedJobs);
      } else {
        console.log("No jobs from backend, using sample data");
        setJobs(getSampleJobs());
      }
    } catch (error) {
      console.error("Error loading jobs from backend:", error);
      setJobs(getSampleJobs());
    } finally {
      setLoading(false);
    }
  }, [getSampleJobs]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const getFilteredJobs = (): Job[] => {
    let filtered = [...jobs];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(term) ||
          job.companyName?.toLowerCase().includes(term) ||
          (job.skills && job.skills.some((skill) => skill.toLowerCase().includes(term))),
      );
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (sortBy === "Salary (High to Low)") {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salary?.replace(/[^0-9]/g, "") || "0");
        const bSalary = parseInt(b.salary?.replace(/[^0-9]/g, "") || "0");
        return bSalary - aSalary;
      });
    } else if (sortBy === "Salary (Low to High)") {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salary?.replace(/[^0-9]/g, "") || "0");
        const bSalary = parseInt(b.salary?.replace(/[^0-9]/g, "") || "0");
        return aSalary - bSalary;
      });
    } else if (sortBy === "Most Recent") {
      filtered.sort((a, b) => (b.postedDate || "").localeCompare(a.postedDate || ""));
    }

    return filtered;
  };

  const handleApplyClick = (job: Job) => {
    console.log("Apply clicked for job:", job);
    
    if (!isAuthenticated) {
      notifications.show({
        title: "Login Required",
        message: "Please login to apply for this job",
        color: "orange",
        icon: <IconAlertCircle size={16} />,
      });
      navigate("/login", { state: { from: `/job/${job._id}` } });
      return;
    }

    if (user?.role !== "candidate") {
      notifications.show({
        title: "Access Denied",
        message: "Only candidates can apply for jobs",
        color: "red",
      });
      return;
    }

    navigate(`/job/${job._id}`);
  };

  const filteredJobs = getFilteredJobs();
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-6 md:py-10">
          <Skeleton height={120} radius="xl" mb={30} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={320} radius="lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-6 md:py-10">
        <SearchBar onSearch={setSearchTerm} onLocationChange={setLocation} />

        <Divider className="my-6" />

        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Found {filteredJobs.length} jobs
          </h2>
          <Sort setSortBy={setSortBy} currentSort={sortBy} />
        </div>

        <Jobs
          jobs={paginatedJobs}
          onApply={handleApplyClick}
        />

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              color="blue"
              radius="md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;