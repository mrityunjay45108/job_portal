import { Avatar, Button, Text, Loader } from "@mantine/core";
import { 
  IconSearch, 
  IconMapPin, 
  IconSparkles, 
  IconWorld, 
  IconChartBar, 
  IconShieldCheck,
  IconArrowRight,
  IconUsers,
  IconFileText,
  IconTrendingUp,
  IconBrain,
  IconScoreboard
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import api from "../services/api";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
}

const DreamJob = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedJobs, setSuggestedJobs] = useState<Job[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm && !location) {
      notifications.show({
        title: "Search Required",
        message: "Please enter a job title or location to search",
        color: "yellow",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.get('/jobs/active');
      
      if (response.data.success && response.data.jobs) {
        let filteredJobs = response.data.jobs;
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredJobs = filteredJobs.filter(
            (job: any) =>
              job.jobTitle?.toLowerCase().includes(term) ||
              job.companyName?.toLowerCase().includes(term)
          );
        }
        
        if (location) {
          const loc = location.toLowerCase();
          filteredJobs = filteredJobs.filter(
            (job: any) => job.location?.toLowerCase().includes(loc)
          );
        }
        
        localStorage.setItem('searchResults', JSON.stringify(filteredJobs));
        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('searchLocation', location);
        
        navigate(`/find-jobs?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
      }
    } catch (error) {
      console.error("Search error:", error);
      notifications.show({
        title: "Error",
        message: "Failed to search jobs. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchSuggestions = async (value: string) => {
    if (value.length < 2) {
      setSuggestedJobs([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await api.get('/jobs/active');
      if (response.data.success && response.data.jobs) {
        const matches = response.data.jobs
          .filter((job: any) => 
            job.jobTitle?.toLowerCase().includes(value.toLowerCase()) ||
            job.companyName?.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);
        setSuggestedJobs(matches);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const selectSuggestion = (job: Job) => {
    setSearchTerm(job.jobTitle);
    setShowSuggestions(false);
    navigate(`/job/${job._id}`);
  };

  // Function to handle registration form navigation
  const handleRegisterInterest = () => {
    console.log("Navigating to registration form...");
    navigate('/register-interest');
  };

  // Function to handle login navigation for AI features
  const handleAIFeatureClick = () => {
    console.log("Navigating to login for AI features...");
    navigate('/login');
  };

  return (
    <div className="flex flex-col lg:flex-row items-center px-6 lg:px-24 py-16 gap-16 relative overflow-hidden min-h-[90vh]">
      
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/30 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/40 blur-[120px] -z-10 rounded-full" />

      {/* Left Section */}
      <div className="w-full lg:w-[48%] flex flex-col gap-8 relative z-30">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
            <IconSparkles size={16} className="text-blue-600" />
            <span className="text-blue-700 font-bold tracking-widest text-[10px] uppercase">
              The Next Gen Talent Network
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Career Path
            </span>
          </h1>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
          Connect with high-growth companies and elite startups. Your journey to a global career starts with a single click.
        </p>

        {/* Search Bar */}
        <div className="relative group flex flex-col sm:flex-row items-center gap-3 p-3 bg-white border border-gray-200 rounded-[2rem] mt-4 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center flex-1 px-4 gap-3 w-full relative">
            <IconSearch className="text-blue-500" size={22} />
            <input 
              type="text" 
              placeholder="Design, Engineering, Developer..." 
              className="bg-transparent border-none text-gray-900 w-full outline-none py-3 text-base placeholder:text-gray-400 font-medium"
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyPress={handleKeyPress}
            />
            
            {showSuggestions && suggestedJobs.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                {suggestedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                    onClick={() => selectSuggestion(job)}
                  >
                    <div className="font-semibold text-gray-900">{job.jobTitle}</div>
                    <div className="text-sm text-gray-500">{job.companyName} • {job.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="hidden sm:block w-[1px] h-10 bg-gray-200" />
          
          <div className="flex items-center flex-1 px-4 gap-3 w-full">
            <IconMapPin className="text-gray-500" size={22} />
            <input 
              type="text" 
              placeholder="Remote, New York, London..." 
              className="bg-transparent border-none text-gray-900 w-full outline-none py-3 text-base placeholder:text-gray-400 font-medium"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <Button 
            size="lg" 
            rightSection={!loading && <IconArrowRight size={20} />}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-[1.5rem] px-10 transition-all hover:scale-105 active:scale-95 border-none font-bold text-md h-14 shadow-md"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <Loader size="sm" color="white" /> : "Explore Jobs"}
          </Button>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-sm text-gray-500">Popular:</span>
          {["Remote", "Software Engineer", "Product Manager", "Data Scientist", "UI/UX Designer"].map((term) => (
            <button
              key={term}
              onClick={() => setSearchTerm(term)}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-2">
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
          </div>
          <div className="text-sm text-gray-600">
            Trusted by <span className="font-bold text-gray-900">10,000+</span> job seekers
          </div>
        </div>

        {/* Job Count Stats */}
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <IconUsers size={18} className="text-blue-500" />
            <span className="text-sm text-gray-600">50,000+ Active Jobs</span>
          </div>
          <div className="flex items-center gap-2">
            <IconWorld size={18} className="text-blue-500" />
            <span className="text-sm text-gray-600">1000+ Companies Hiring</span>
          </div>
        </div>
      </div>

      {/* Right Section - Feature Cards */}
      <div className="w-full lg:w-[52%] grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        {/* Card 1 - AI Resume Builder */}
        <div 
          className="p-8 bg-white border border-gray-200 rounded-[2.5rem] flex flex-col gap-5 hover:shadow-xl hover:border-purple-300 transition-all group cursor-pointer"
          onClick={handleAIFeatureClick}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-500">
            <IconFileText size={30} stroke={1.5} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">AI Resume Builder</h3>
              <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full font-semibold">New</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">Create professional, ATS-friendly resumes with AI assistance. Get real-time scoring and smart suggestions.</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <IconChartBar size={14} className="text-green-600" />
                <span className="text-xs font-semibold text-green-600">95% ATS Score</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <IconSparkles size={14} className="text-purple-600" />
                <span className="text-xs font-semibold text-purple-600">AI Powered</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-purple-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Building <IconArrowRight size={16} />
          </div>
        </div>

        {/* Card 2 - Register Your Interest (Shifted up) */}
        <div 
          className="p-8 bg-white border border-gray-200 rounded-[2.5rem] mt-0 md:mt-12 flex flex-col gap-5 hover:shadow-xl hover:border-purple-300 transition-all group cursor-pointer"
          onClick={handleRegisterInterest}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-500">
            <IconUsers size={30} stroke={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Register Your Interest</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Submit your profile to get notified about future job opportunities matching your skills.</p>
          </div>
          <div className="mt-2 text-purple-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Apply Now <IconArrowRight size={16} />
          </div>
        </div>

        {/* Card 3 - Higher Interview Chances */}
        <div 
          className="p-8 bg-white border border-gray-200 rounded-[2.5rem] flex flex-col gap-5 hover:shadow-xl hover:border-emerald-300 transition-all group cursor-pointer"
          onClick={handleAIFeatureClick}
        >
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors">3x</span>
            <IconTrendingUp size={24} className="text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Higher Interview Chances</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Candidates with optimized resumes get 3x more interview calls. Improve your resume today!</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <IconBrain size={14} className="text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-600">Smart Tips</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <IconSparkles size={14} className="text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-600">AI Suggestions</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-emerald-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Improve Now <IconArrowRight size={16} />
          </div>
        </div>

        {/* Card 4 - ATS Score Checker (Shifted down) */}
        <div 
          className="p-8 bg-white border border-gray-200 rounded-[2.5rem] mt-0 md:mt-12 flex flex-col gap-5 hover:shadow-xl hover:border-blue-300 transition-all group cursor-pointer"
          onClick={handleAIFeatureClick}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
            <IconScoreboard size={30} stroke={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">ATS Score Checker</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Upload your resume and get instant ATS compatibility score. See how you stack against job requirements.</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <IconTrendingUp size={14} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">Real-time Analysis</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Check Your Score <IconArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;