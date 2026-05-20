
// CandidateDashboard.tsx - Complete fixed code

import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Card,
  Badge,
  Button,
  Modal,
  TextInput,
  Textarea,
  Select,
  ActionIcon,
  Tabs,
  Avatar,
  Text,
  Progress,
  Pagination,
  Alert,
  Skeleton,
  SimpleGrid,
  RingProgress,
  Paper,
  Grid,
} from "@mantine/core";
import {
  IconBriefcase,
  IconClock,
  IconStar,
  IconSearch,
  IconCalendar,
  IconX,
  IconBookmark,
  IconBookmarkFilled,
  IconRobot,
  IconUser,
  IconBell,
  IconTrash,
  IconSend,
  IconChartBar,
  IconRefresh,
  IconArrowRight,
  IconAward,
  IconMapPin,
  IconTrendingUp,
  IconSparkles,
  IconShield,
  IconLogout,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "../components/ProfileModal";
import api from "../services/api";

// Types
interface Job {
  id: string;
  jobTitle: string;
  location: string;
  company: string;
  salary: string;
  jobType: string;
  experience: string;
  skills: string[];
  description: string;
  postedDate: string;
  deadline?: string;
  applicants?: number;
  urgentHiring?: boolean;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status:
    | "applied"
    | "reviewing"
    | "shortlisted"
    | "interview"
    | "rejected"
    | "hired";
  resumeName: string;
  coverLetter?: string;
  matchScore?: number;
  feedback?: string;
}

interface SavedJob {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  savedDate: string;
}

interface Interview {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  mode: "online" | "offline";
  link?: string;
  feedback?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "application" | "interview" | "alert" | "status_update" | "offer";
  read: boolean;
  createdAt: string;
}

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterJobType, setFilterJobType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [applyModalOpen, { open: openApplyModal, close: closeApplyModal }] = useDisclosure(false);
  const [jobDetailsModalOpen, { open: openJobDetailsModal, close: closeJobDetailsModal }] = useDisclosure(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [fullProfileData, setFullProfileData] = useState({
    id: "",
    name: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    company: "",
    about: "",
    skills: [] as string[],
    experience: [] as any[],
    certifications: [] as any[],
    linkedin: "",
    github: "",
    website: "",
    avatar: "",
    banner: "",
    rating: 4.8,
    verified: false,
  });

  const [profile, setProfile] = useState({
    id: "",
    fullName: "Guest User",
    email: "guest@example.com",
    phone: "",
    location: "",
    skills: [] as string[],
    experience: "",
    education: "",
    bio: "",
    resumeName: "",
    linkedin: "",
    github: "",
    portfolio: "",
    expectedSalary: "",
    preferredJobType: "Full-time",
  });

  const [coverLetter, setCoverLetter] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(6);
      else setItemsPerPage(9);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const loadJobs = useCallback(async () => {
    try {
      const response = await api.get("/jobs/active");
      if (response.data.success) {
        const jobsData = response.data.jobs.map((job: any) => ({
          id: job._id,
          jobTitle: job.jobTitle,
          location: job.location,
          company: job.companyName,
          salary: job.salary || "Negotiable",
          jobType: job.jobType,
          experience: job.experience,
          skills: job.skills || [],
          description: job.description,
          postedDate: job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "Just now",
          applicants: job.applicantsCount || 0,
          urgentHiring: false,
        }));
        setJobs(jobsData);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobs([]);
    }
  }, []);

  const loadApplications = useCallback(async () => {
    try {
      const response = await api.get("/applications/my-applications");
      if (response.data.success) {
        const appsData = response.data.applications.map((app: any) => ({
          id: app._id,
          jobId: app.jobId,
          jobTitle: app.jobTitle,
          company: app.company,
          appliedDate: app.appliedDate,
          status: app.status === "interview" ? "interview" : app.status === "shortlisted" ? "shortlisted" : app.status === "hired" ? "hired" : app.status === "rejected" ? "rejected" : "applied",
          resumeName: app.resumeUrl ? "Resume.pdf" : "",
          coverLetter: app.coverLetter,
          matchScore: app.aiScore,
          feedback: app.feedback,
        }));
        setApplications(appsData);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  }, []);

  const loadSavedJobs = useCallback(() => {
    const stored = localStorage.getItem(`saved_jobs_${user?.id || "guest"}`);
    setSavedJobs(stored ? JSON.parse(stored) : []);
  }, [user?.id]);

  const loadInterviews = useCallback(async () => {
    try {
      const response = await api.get("/interviews/candidate");
      if (response.data.success) {
        const interviewsData = response.data.interviews.map((interview: any) => ({
          id: interview._id,
          jobId: interview.jobId,
          jobTitle: interview.jobTitle,
          company: interview.company || "",
          date: interview.date,
          time: interview.time,
          mode: interview.mode,
          link: interview.link,
        }));
        setInterviews(interviewsData);
      }
    } catch (error) {
      console.error("Error loading interviews:", error);
      setInterviews([]);
    }
  }, []);

  const loadNotifications = useCallback(() => {
    const stored = localStorage.getItem(`candidate_notifications_${user?.id || "guest"}`);
    setNotificationsList(stored ? JSON.parse(stored) : []);
  }, [user?.id]);

  const loadProfileFromBackend = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success && response.data.user) {
        const userData = response.data.user;
        const profileData = userData.profile || {};
        setProfile({
          id: userData.id,
          fullName: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phoneNumber || "",
          location: profileData.location || "",
          skills: profileData.skills || [],
          experience: "",
          education: "",
          bio: profileData.bio || "",
          resumeName: "",
          linkedin: profileData.linkedin || "",
          github: profileData.github || "",
          portfolio: profileData.portfolio || "",
          expectedSalary: "",
          preferredJobType: "Full-time",
        });
        setFullProfileData({
          id: userData.id,
          name: userData.fullName,
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phoneNumber,
          location: profileData.location || "",
          title: profileData.title || "",
          company: profileData.company || "",
          about: profileData.bio || "",
          skills: profileData.skills || [],
          experience: profileData.experience || [],
          certifications: profileData.certifications || [],
          linkedin: profileData.linkedin || "",
          github: profileData.github || "",
          website: profileData.portfolio || "",
          avatar: profileData.avatar || "",
          banner: "",
          rating: 4.8,
          verified: false,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }, []);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      loadJobs(),
      loadApplications(),
      loadSavedJobs(),
      loadInterviews(),
      loadNotifications(),
      loadProfileFromBackend(),
    ]);
    setTimeout(() => setLoading(false), 500);
  }, [loadJobs, loadApplications, loadSavedJobs, loadInterviews, loadNotifications, loadProfileFromBackend]);

  const loadFullProfile = useCallback(() => {
    loadProfileFromBackend();
  }, [loadProfileFromBackend]);

  const saveFullProfile = async (updatedProfile: any) => {
    try {
      await api.put("/auth/profile", {
        profile: {
          location: updatedProfile.location,
          title: updatedProfile.title,
          company: updatedProfile.company,
          skills: updatedProfile.skills,
          experience: updatedProfile.experience,
          certifications: updatedProfile.certifications,
          bio: updatedProfile.about,
          linkedin: updatedProfile.linkedin,
          github: updatedProfile.github,
          portfolio: updatedProfile.website,
          avatar: updatedProfile.avatar,
        },
      });
      setFullProfileData(updatedProfile);
      setProfile((prev) => ({
        ...prev,
        fullName: updatedProfile.name || updatedProfile.fullName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
        skills: updatedProfile.skills,
        linkedin: updatedProfile.linkedin,
        github: updatedProfile.github,
      }));
      notifications.show({
        title: "Profile Updated",
        message: "Your profile has been updated successfully!",
        color: "green",
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update profile",
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (user) {
      loadFullProfile();
      loadAllData();
    }
  }, [user, loadFullProfile, loadAllData]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadJobs();
      loadApplications();
      loadInterviews();
    }, 30000);
    return () => clearInterval(interval);
  }, [loadJobs, loadApplications, loadInterviews]);

  const generateRecommendations = useCallback(() => {
    if (!profile.skills.length) {
      setRecommendedJobs([]);
      return;
    }
    setRecommendedJobs(jobs.filter((job) =>
      job?.skills?.some((skill) =>
        profile.skills.some((ps) => ps?.toLowerCase() === skill?.toLowerCase())
      )
    ).slice(0, 4));
  }, [jobs, profile.skills]);

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  const calculateMatchScore = (job: Job | null): number => {
    if (!job?.skills?.length || !profile.skills.length) return 0;
    const matched = job.skills.filter((skill) =>
      profile.skills.some((ps) => ps?.toLowerCase() === skill?.toLowerCase())
    ).length;
    return Math.round((matched / job.skills.length) * 100);
  };

  const handleApply = async () => {
    if (!selectedJob) return;
    if (applications.some((app) => app.jobId === selectedJob.id)) {
      notifications.show({
        title: "Already Applied",
        message: `You have already applied for ${selectedJob.jobTitle}`,
        color: "orange",
      });
      closeApplyModal();
      return;
    }
    try {
      const response = await api.post("/applications/apply", {
        jobId: selectedJob.id,
        coverLetter: coverLetter,
        experience: profile.experience,
        skills: profile.skills.join(", "),
        expectedSalary: profile.expectedSalary,
        noticePeriod: "",
      });
      if (response.data.success) {
        notifications.show({
          title: "Application Submitted! 🎉",
          message: `Your application for ${selectedJob.jobTitle} has been sent.`,
          color: "green",
        });
        const newApp: Application = {
          id: Date.now().toString(),
          jobId: selectedJob.id,
          jobTitle: selectedJob.jobTitle,
          company: selectedJob.company,
          appliedDate: new Date().toISOString(),
          status: "applied",
          resumeName: profile.resumeName,
          coverLetter: coverLetter,
          matchScore: calculateMatchScore(selectedJob),
        };
        const updatedApps = [newApp, ...applications];
        setApplications(updatedApps);
        localStorage.setItem(`candidate_applications_${user?.id || "guest"}`, JSON.stringify(updatedApps));
        
        const updatedJobs = jobs.map((job) =>
          job.id === selectedJob.id ? { ...job, applicants: (job.applicants || 0) + 1 } : job
        );
        setJobs(updatedJobs);
        
        const updatedNotifications = [
          {
            id: Date.now().toString(),
            title: "Application Submitted! 🎉",
            message: `Applied for ${selectedJob.jobTitle} at ${selectedJob.company}`,
            type: "application" as const,
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...notificationsList,
        ];
        setNotificationsList(updatedNotifications);
        localStorage.setItem(`candidate_notifications_${user?.id || "guest"}`, JSON.stringify(updatedNotifications));
        
        closeApplyModal();
        setCoverLetter("");
        setSelectedJob(null);
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to submit application",
        color: "red",
      });
    }
  };

  const handleSaveJob = (job: Job | null) => {
    if (!job) return;
    const existing = savedJobs.find((sj) => sj.jobId === job.id);
    if (existing) {
      const updated = savedJobs.filter((sj) => sj.jobId !== job.id);
      setSavedJobs(updated);
      localStorage.setItem(`saved_jobs_${user?.id || "guest"}`, JSON.stringify(updated));
      notifications.show({ title: "Removed", message: "Job removed from saved", color: "blue" });
    } else {
      const updated = [
        {
          id: Date.now().toString(),
          jobId: job.id,
          jobTitle: job.jobTitle,
          company: job.company,
          location: job.location,
          salary: job.salary,
          savedDate: new Date().toISOString(),
        },
        ...savedJobs,
      ];
      setSavedJobs(updated);
      localStorage.setItem(`saved_jobs_${user?.id || "guest"}`, JSON.stringify(updated));
      notifications.show({ title: "Saved", message: "Job saved successfully", color: "green" });
    }
  };

  const isJobSaved = (id: string) => savedJobs.some((sj) => sj.jobId === id);
  const isJobApplied = (id: string) => applications.some((app) => app.jobId === id);

  const withdrawApplication = async (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app || (app.status !== "applied" && app.status !== "reviewing")) {
      notifications.show({ title: "Cannot Withdraw", message: "This application cannot be withdrawn", color: "red" });
      return;
    }
    try {
      const updated = applications.filter((a) => a.id !== appId);
      setApplications(updated);
      localStorage.setItem(`candidate_applications_${user?.id || "guest"}`, JSON.stringify(updated));
      
      const updatedJobs = jobs.map((job) =>
        job.id === app.jobId ? { ...job, applicants: Math.max(0, (job.applicants || 0) - 1) } : job
      );
      setJobs(updatedJobs);
      notifications.show({ title: "Withdrawn", message: `Application for ${app.jobTitle} withdrawn`, color: "orange" });
    } catch (error) {
      notifications.show({ title: "Error", message: "Failed to withdraw application", color: "red" });
    }
  };

  const markNotificationRead = (id: string) => {
    const updated = notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotificationsList(updated);
    localStorage.setItem(`candidate_notifications_${user?.id || "guest"}`, JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notificationsList.map((n) => ({ ...n, read: true }));
    setNotificationsList(updated);
    localStorage.setItem(`candidate_notifications_${user?.id || "guest"}`, JSON.stringify(updated));
    notifications.show({ title: "Success", message: "All notifications marked as read", color: "green" });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const getFilteredJobs = () => {
    let filtered = [...jobs];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((job) =>
        job.jobTitle?.toLowerCase().includes(term) ||
        job.company?.toLowerCase().includes(term) ||
        job.skills?.some((s) => s.toLowerCase().includes(term))
      );
    }
    if (filterLocation) filtered = filtered.filter((job) => job.location?.toLowerCase().includes(filterLocation.toLowerCase()));
    if (filterJobType) filtered = filtered.filter((job) => job.jobType === filterJobType);
    if (sortBy === "latest") filtered.sort((a, b) => (b.postedDate || "").localeCompare(a.postedDate || ""));
    else if (sortBy === "salary") filtered.sort((a, b) => parseInt(b.salary?.replace(/[^0-9]/g, "") || "0") - parseInt(a.salary?.replace(/[^0-9]/g, "") || "0"));
    else if (sortBy === "match") filtered.sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
    return filtered;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
      applied: { color: "blue", label: "APPLIED", icon: <IconSend size={12} /> },
      reviewing: { color: "yellow", label: "UNDER REVIEW", icon: <IconClock size={12} /> },
      shortlisted: { color: "green", label: "SHORTLISTED", icon: <IconStar size={12} /> },
      interview: { color: "orange", label: "INTERVIEW", icon: <IconCalendar size={12} /> },
      rejected: { color: "red", label: "REJECTED", icon: <IconX size={12} /> },
      hired: { color: "teal", label: "HIRED! 🎉", icon: <IconAward size={12} /> },
    };
    const c = config[status];
    return c ? <Badge color={c.color} size="sm" leftSection={c.icon}>{c.label}</Badge> : <Badge color="gray" size="sm">{status.toUpperCase()}</Badge>;
  };

  const getStep = (status: string): number => {
    const steps = ["applied", "reviewing", "shortlisted", "interview", "hired"];
    return steps.indexOf(status) + 1;
  };

  const filteredJobs = getFilteredJobs();
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const profileCompletion = Math.min(Math.floor((Object.values(profile).filter((v) => v && (Array.isArray(v) ? v.length > 0 : true)).length / 12) * 100), 100);

  const stats = {
    totalApplied: applications.length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interviews: applications.filter((a) => a.status === "interview").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    hired: applications.filter((a) => a.status === "hired").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
  };

  const getFirstName = () => {
    if (user?.fullName) return user.fullName.split(" ")[0];
    return profile.fullName.split(" ")[0];
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 sm:mb-8">
            <Skeleton height={40} width={200} radius="lg" />
            <Skeleton height={40} width={150} radius="xl" />
          </div>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" className="mb-6">
            {[1, 2, 3, 4].map((i) => (<Skeleton key={`skeleton-stat-${i}`} height={100} radius="xl" />))}
          </SimpleGrid>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton height={400} radius="xl" className="lg:col-span-2" />
            <Skeleton height={400} radius="xl" />
          </div>
        </div>
      </div>
    );
  }

  const mobileTabs = [
    { value: "overview", label: "Home", icon: <IconTrendingUp size={18} key="mobile-home" /> },
    { value: "jobs", label: "Jobs", icon: <IconSearch size={18} key="mobile-jobs" /> },
    { value: "applications", label: "Apps", icon: <IconBriefcase size={18} key="mobile-apps" /> },
    { value: "profile", label: "Profile", icon: <IconUser size={18} key="mobile-profile" /> },
    { value: "notifications", label: "Alerts", icon: <IconBell size={18} key="mobile-alerts" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pb-16 sm:pb-8">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <Container size="xl" className="py-3 sm:py-6 px-3 sm:px-4 relative z-10">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <IconSparkles size={18} className="text-white" />
            </div>
            <div>
              <Text size="xs" className="text-blue-600 font-semibold">Dashboard</Text>
              <Text size="sm" fw={700}>Hi, {getFirstName()}!</Text>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="light" size="compact-sm" onClick={() => setProfileModalOpen(true)}><IconUser size={16} /></Button>
            <Button variant="light" size="compact-sm" onClick={handleLogout} color="red"><IconLogout size={16} /></Button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <IconSparkles size={22} className="text-white" />
              </div>
              <Text size="sm" className="text-blue-600 font-semibold">Candidate Dashboard</Text>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Welcome back, {getFirstName()}!</h1>
            <p className="text-sm text-gray-500 mt-1">Track your applications and discover new opportunities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="light" onClick={loadAllData} leftSection={<IconRefresh size={18} />} radius="xl" size="sm">Refresh</Button>
            <Button variant="light" onClick={() => setActiveTab("notifications")} radius="xl" size="sm" className="relative">
              <IconBell size={20} />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center animate-pulse">{unreadCount}</span>}
            </Button>
            <Button onClick={() => setProfileModalOpen(true)} variant="light" leftSection={<IconUser size={18} />} radius="xl" size="sm">Profile</Button>
            <Button onClick={handleLogout} variant="light" color="red" leftSection={<IconLogout size={18} />} radius="xl" size="sm">Logout</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }} spacing="sm" className="mb-6">
          <Card key="stat-total" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-3 sm:p-4">
            <div className="flex justify-between items-center">
              <div><Text size="xs" opacity={0.8}>Total Apps</Text><Text size="28px" fw={800} className="text-2xl sm:text-3xl">{stats.totalApplied}</Text></div>
              <div className="p-2 bg-white/20 rounded-xl"><IconBriefcase size={20} className="sm:size-[24px]" /></div>
            </div>
          </Card>
          <Card key="stat-shortlisted" className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-3 sm:p-4">
            <div className="flex justify-between items-center"><div><Text size="xs" opacity={0.8}>Shortlisted</Text><Text size="28px" fw={800} className="text-2xl sm:text-3xl">{stats.shortlisted}</Text></div><div className="p-2 bg-white/20 rounded-xl"><IconStar size={20} className="sm:size-[24px]" /></div></div>
          </Card>
          <Card key="stat-interviews" className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-lg p-3 sm:p-4">
            <div className="flex justify-between items-center"><div><Text size="xs" opacity={0.8}>Interviews</Text><Text size="28px" fw={800} className="text-2xl sm:text-3xl">{stats.interviews}</Text></div><div className="p-2 bg-white/20 rounded-xl"><IconCalendar size={20} className="sm:size-[24px]" /></div></div>
          </Card>
          <Card key="stat-success" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-3 sm:p-4">
            <div className="flex justify-between items-center"><div><Text size="xs" opacity={0.8}>Success Rate</Text><Text size="28px" fw={800} className="text-2xl sm:text-3xl">{stats.totalApplied ? Math.round((stats.hired / stats.totalApplied) * 100) : 0}%</Text></div><div className="p-2 bg-white/20 rounded-xl"><IconAward size={20} className="sm:size-[24px]" /></div></div>
          </Card>
        </SimpleGrid>

        {/* Profile Strength */}
        <Card key="profile-strength" className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-md mb-6 border border-blue-100 overflow-hidden">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1 text-center sm:text-left"><div className="flex items-center justify-center sm:justify-start gap-2 mb-1"><IconShield size={18} className="text-blue-600" /><Text fw={700} size="sm">Profile Strength</Text></div><Text size="xs" className="text-gray-600">Complete your profile to get better job matches</Text><div className="mt-2 max-w-full sm:max-w-md"><Progress value={profileCompletion} color="blue" size="sm" radius="xl" /></div></div>
            <div><RingProgress size={60} thickness={5} sections={[{ value: profileCompletion, color: "blue" }]} label={<Text size="sm" fw={800} className="text-blue-600">{profileCompletion}%</Text>} /></div>
            <Button variant="gradient" gradient={{ from: "blue", to: "indigo" }} onClick={() => setProfileModalOpen(true)} radius="xl" size="xs">Complete Profile</Button>
          </div>
        </Card>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-3 z-50 sm:hidden shadow-lg">
          {mobileTabs.map((tab) => (
            <button key={tab.value} onClick={() => setActiveTab(tab.value)} className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${activeTab === tab.value ? "text-blue-600" : "text-gray-500"}`}>
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
              {tab.value === "notifications" && unreadCount > 0 && <span className="absolute -top-0.5 right-1/4 w-3 h-3 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">{unreadCount}</span>}
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="bg-white rounded-xl shadow-lg border-0 overflow-hidden">
          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="md">
              <Tabs.List className="px-4 pt-4 pb-0 border-b border-gray-100 gap-1 flex-wrap">
                <Tabs.Tab value="overview" leftSection={<IconTrendingUp size={18} />}>Overview</Tabs.Tab>
                <Tabs.Tab value="jobs" leftSection={<IconSearch size={18} />}>Find Jobs ({jobs.length})</Tabs.Tab>
                <Tabs.Tab value="applications" leftSection={<IconBriefcase size={18} />}>Applications ({applications.length})</Tabs.Tab>
                <Tabs.Tab value="saved" leftSection={<IconBookmark size={18} />}>Saved ({savedJobs.length})</Tabs.Tab>
                <Tabs.Tab value="interviews" leftSection={<IconCalendar size={18} />}>Interviews ({interviews.length})</Tabs.Tab>
                <Tabs.Tab value="notifications" leftSection={<IconBell size={18} />}>Notifications {unreadCount > 0 && <Badge size="xs" color="red" className="ml-1">{unreadCount}</Badge>}</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>

          {/* Mobile Content */}
          <div className="sm:hidden p-3">
            {activeTab === "overview" && (
              <div className="space-y-4" key="mobile-overview">
                <div key="ai-recommended"><div className="flex items-center gap-2 mb-3"><div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"><IconRobot size={16} className="text-white" /></div><h2 className="text-base font-semibold">AI Recommended Jobs</h2></div>
                {recommendedJobs.slice(0, 3).map((job) => (
                  <Paper key={job.id} className="p-3 bg-gray-50 rounded-xl mb-2 cursor-pointer" onClick={() => { setSelectedJob(job); openApplyModal(); }}>
                    <Text fw={600} size="sm">{job.jobTitle}</Text><Text size="xs" c="gray">{job.company} • {job.location}</Text><Badge color="green" size="xs">{calculateMatchScore(job)}% Match</Badge>
                  </Paper>
                ))}</div>
                <div key="recent-activity"><div className="flex items-center gap-2 mb-3"><div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"><IconClock size={16} className="text-white" /></div><h2 className="text-base font-semibold">Recent Activity</h2></div>
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg mb-2">
                    <div><Text fw={500} size="sm">{app.jobTitle}</Text><Text size="xs" c="gray">{app.company}</Text></div>
                    {getStatusBadge(app.status)}
                  </div>
                ))}</div>
              </div>
            )}

            {activeTab === "jobs" && (
              <div key="mobile-jobs"><div className="space-y-2 mb-4">
                <TextInput placeholder="Search jobs..." leftSection={<IconSearch size={16} />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="sm" radius="xl" />
                <div className="flex gap-2"><Select placeholder="Location" data={["Remote", "New York", "London"]} value={filterLocation} onChange={setFilterLocation} clearable size="xs" radius="xl" className="flex-1" /><Select placeholder="Type" data={["Full-time", "Part-time"]} value={filterJobType} onChange={setFilterJobType} clearable size="xs" radius="xl" className="flex-1" /></div>
              </div>
              <div className="space-y-3">{paginatedJobs.slice(0, 5).map((job) => (
                <Card key={job.id} className="border border-gray-100 rounded-xl p-3">
                  <div className="flex justify-between items-start"><div><Text fw={600} size="sm">{job.jobTitle}</Text><Text size="xs" c="gray">{job.company}</Text></div><Button size="xs" radius="xl" variant={isJobApplied(job.id) ? "filled" : "light"} color="blue" onClick={() => { setSelectedJob(job); openApplyModal(); }} disabled={isJobApplied(job.id)}>{isJobApplied(job.id) ? "Applied" : "Apply"}</Button></div>
                  <div className="flex gap-2 mt-1"><Badge key={`${job.id}-type`} size="xs" variant="light">{job.jobType}</Badge><Badge key={`${job.id}-salary`} size="xs" variant="light">{job.salary}</Badge></div>
                </Card>
              ))}</div>
              {totalPages > 1 && <div className="mt-4 flex justify-center"><Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} size="sm" /></div>}</div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-3" key="mobile-apps">{applications.length === 0 ? <div className="text-center py-8"><Text size="sm">No applications yet</Text><Button size="xs" onClick={() => setActiveTab("jobs")} className="mt-2">Browse Jobs</Button></div> : applications.map((app) => (
                <Card key={app.id} className="border border-gray-200 rounded-xl p-3">
                  <div className="flex justify-between items-start"><div><Text fw={600} size="sm">{app.jobTitle}</Text><Text size="xs" c="gray">{app.company}</Text><Text size="xs" c="gray">Applied: {new Date(app.appliedDate).toLocaleDateString()}</Text></div>{getStatusBadge(app.status)}</div>
                  <Progress value={(getStep(app.status) / 5) * 100} color="blue" size="xs" className="mt-2" />
                </Card>
              ))}</div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-3" key="mobile-profile"><div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl"><Avatar size={50} radius="xl" color="blue">{profile.fullName.charAt(0)}</Avatar><div><Text fw={600}>{profile.fullName}</Text><Text size="xs" c="gray">{profile.email}</Text><Badge size="xs" color="blue">{user?.role || "Candidate"}</Badge></div></div>
              <div><Text size="xs" fw={600}>Skills</Text><div className="flex flex-wrap gap-1 mt-1">{profile.skills.map((s, idx) => (<Badge key={`skill-${idx}-${s}`} size="sm">{s}</Badge>))}</div></div>
              <Button variant="light" fullWidth onClick={() => setProfileModalOpen(true)} size="xs">Edit Profile</Button><Button variant="light" color="red" fullWidth onClick={handleLogout} size="xs">Logout</Button></div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-2" key="mobile-notif">{notificationsList.length === 0 ? <div className="text-center py-8"><Text size="sm">No notifications</Text></div> : notificationsList.slice(0, 10).map((notif) => (
                <div key={notif.id} className={`p-3 rounded-xl ${notif.read ? "bg-white border border-gray-200" : "bg-blue-50 border border-blue-200"}`}>
                  <div className="flex gap-2"><div className="p-1.5 bg-blue-100 rounded-lg"><IconSend size={14} /></div><div><Text fw={500} size="xs">{notif.title}</Text><Text size="xs" c="gray">{notif.message}</Text></div></div>
                </div>
              ))}</div>
            )}
          </div>

          {/* Desktop Content */}
          <div className="hidden sm:block">
            <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="md">
              {/* Overview Tab */}
              <Tabs.Panel value="overview" className="p-4 md:p-6">
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200"><div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg"><IconRobot size={18} className="text-white" /></div><h2 className="text-base md:text-lg font-semibold">AI Recommended Jobs</h2></div>
                    {recommendedJobs.length === 0 ? <div className="text-center py-8"><IconRobot size={32} className="mx-auto text-gray-300 mb-2" /><p className="text-sm text-gray-500">No recommendations available</p></div> : recommendedJobs.map((job) => (
                      <Paper key={job.id} className="p-3 md:p-4 bg-gray-50 rounded-xl mb-2 hover:shadow-md transition cursor-pointer" onClick={() => { setSelectedJob(job); openApplyModal(); }}>
                        <div className="flex flex-wrap justify-between items-start gap-2"><div><Text fw={600} size="sm md:text-base">{job.jobTitle}</Text><Text size="xs md:text-sm" c="gray">{job.company} • {job.location}</Text></div><Badge color="green" size="sm">{calculateMatchScore(job)}% Match</Badge></div>
                        <Progress value={calculateMatchScore(job)} color="green" size="xs" className="mt-2" />
                        <Button size="xs" variant="light" color="blue" radius="xl" className="mt-2">Apply Now</Button>
                      </Paper>
                    ))}
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200"><div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"><IconClock size={18} className="text-white" /></div><h2 className="text-base md:text-lg font-semibold">Recent Activity</h2></div>
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mb-2">
                        <div><Text fw={500} size="sm">{app.jobTitle}</Text><Text size="xs" c="gray">{app.company}</Text></div>
                        {getStatusBadge(app.status)}
                      </div>
                    ))}
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              {/* Find Jobs Tab */}
              <Tabs.Panel value="jobs" className="p-4 md:p-6">
                <div className="flex flex-wrap gap-3 mb-6">
                  <TextInput placeholder="Search jobs..." leftSection={<IconSearch size={16} />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 min-w-[150px]" radius="xl" size="sm" />
                  <Select placeholder="Location" data={["Remote", "New York", "London", "San Francisco", "Austin"]} value={filterLocation} onChange={setFilterLocation} clearable radius="xl" className="w-32" size="sm" />
                  <Select placeholder="Job Type" data={["Full-time", "Part-time", "Contract", "Internship"]} value={filterJobType} onChange={setFilterJobType} clearable radius="xl" className="w-28" size="sm" />
                  <Select placeholder="Sort by" data={["Latest", "Salary", "Best Match"]} value={sortBy} onChange={setSortBy} clearable radius="xl" className="w-32" size="sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedJobs.map((job) => {
                    const matchScore = calculateMatchScore(job);
                    const applied = isJobApplied(job.id);
                    const saved = isJobSaved(job.id);
                    return (
                      <Card key={job.id} className="border border-gray-100 rounded-xl hover:shadow-xl transition-all p-3">
                        <div className="flex justify-between items-start">
                          <div className="cursor-pointer flex-1" onClick={() => { setSelectedJob(job); openJobDetailsModal(); }}>
                            <h4 className="font-semibold text-sm md:text-base">{job.jobTitle}</h4>
                            <div className="flex items-center gap-1 mt-1"><IconMapPin size={12} /><Text size="xs" c="gray">{job.company} • {job.location}</Text></div>
                          </div>
                          <ActionIcon variant="subtle" onClick={() => handleSaveJob(job)}>{saved ? <IconBookmarkFilled className="text-yellow-500" size={16} /> : <IconBookmark size={16} />}</ActionIcon>
                        </div>
                        <div className="flex gap-2 mt-2 flex-wrap"><Badge size="xs" variant="light">{job.jobType}</Badge><Badge size="xs" variant="light">{job.salary}</Badge></div>
                        <div className="flex flex-wrap gap-1 mt-2">{job.skills?.slice(0, 2).map((s, idx) => (<Badge key={`${job.id}-skill-${idx}`} size="xs" variant="light" color="gray">{s}</Badge>))}</div>
                        <div className="mt-3 flex justify-between items-center"><div className="flex items-center gap-1"><IconChartBar size={12} className="text-blue-500" /><span className="text-xs">{matchScore}% match</span></div><Button size="xs" radius="xl" variant={applied ? "filled" : "gradient"} gradient={{ from: "blue", to: "indigo" }} onClick={() => { setSelectedJob(job); openApplyModal(); }} disabled={applied} className={applied ? "bg-green-600" : ""}>{applied ? "Applied" : "Apply"}</Button></div>
                      </Card>
                    );
                  })}
                </div>
                {totalPages > 1 && <div className="mt-6 flex justify-center"><Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} color="blue" radius="xl" size="sm" /></div>}
              </Tabs.Panel>

              {/* Applications Tab */}
              <Tabs.Panel value="applications" className="p-4 md:p-6">
                {applications.length === 0 ? <div className="text-center py-12"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"><IconBriefcase size={28} className="text-gray-400" /></div><Text size="md" fw={500}>No applications yet</Text><Button onClick={() => setActiveTab("jobs")} className="mt-4" radius="xl" size="sm">Browse Jobs</Button></div> : applications.map((app) => (
                  <Card key={app.id} className="border border-gray-200 rounded-xl p-3 md:p-4 mb-3 hover:shadow-md transition">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div><Text fw={600} size="sm md:text-base">{app.jobTitle}</Text><Text size="xs" c="gray">{app.company}</Text><Text size="xs" c="gray">Applied: {new Date(app.appliedDate).toLocaleDateString()}</Text></div>
                      <div className="flex gap-2">{getStatusBadge(app.status)}{(app.status === "applied" || app.status === "reviewing") && <Button size="xs" variant="subtle" color="red" onClick={() => withdrawApplication(app.id)}>Withdraw</Button>}</div>
                    </div>
                    <Progress value={(getStep(app.status) / 5) * 100} color="blue" size="xs" className="mt-2" />
                  </Card>
                ))}
              </Tabs.Panel>

              {/* Saved Jobs Tab */}
              <Tabs.Panel value="saved" className="p-4 md:p-6">
                {savedJobs.length === 0 ? <div className="text-center py-12"><IconBookmark size={32} className="mx-auto text-gray-300 mb-2" /><Text size="md" fw={500}>No saved jobs</Text><Button onClick={() => setActiveTab("jobs")} className="mt-4" radius="xl" size="sm">Explore Jobs</Button></div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{savedJobs.map((saved) => {
                  const job = jobs.find((j) => j.id === saved.jobId);
                  return (<Card key={saved.id} className="border border-gray-200 rounded-xl p-3"><div className="flex justify-between items-start"><div><Text fw={600} size="sm">{saved.jobTitle}</Text><Text size="xs" c="gray">{saved.company} • {saved.location}</Text><Text size="xs" fw={500} c="blue">{saved.salary}</Text></div><ActionIcon color="red" variant="subtle" onClick={() => handleSaveJob(job!)}><IconTrash size={14} /></ActionIcon></div><Button variant="light" color="blue" fullWidth size="xs" className="mt-2" onClick={() => { setSelectedJob(job!); openApplyModal(); }}>Apply Now</Button></Card>);
                })}</div>}
              </Tabs.Panel>

              {/* Interviews Tab */}
              <Tabs.Panel value="interviews" className="p-4 md:p-6">
                {interviews.length === 0 ? <div className="text-center py-12"><IconCalendar size={32} className="mx-auto text-gray-300 mb-2" /><Text size="md" fw={500}>No interviews scheduled</Text></div> : interviews.map((interview) => (
                  <Card key={interview.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 mb-3">
                    <div className="flex gap-3"><div className="p-2 bg-blue-100 rounded-lg"><IconCalendar size={20} className="text-blue-600" /></div><div><Text fw={600} size="sm">{interview.jobTitle}</Text><Text size="xs" c="gray">{interview.company}</Text><div className="flex flex-wrap gap-1 mt-1"><Badge size="xs" color="blue">{interview.date}</Badge><Badge size="xs" color="gray">{interview.time}</Badge></div>{interview.link && <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs inline-flex items-center gap-1 mt-1">Join Meeting <IconArrowRight size={10} /></a>}</div></div>
                  </Card>
                ))}
              </Tabs.Panel>

              {/* Notifications Tab */}
              <Tabs.Panel value="notifications" className="p-4 md:p-6">
                {notificationsList.length === 0 ? <div className="text-center py-12"><IconBell size={32} className="mx-auto text-gray-300 mb-2" /><Text size="md" fw={500}>No notifications</Text></div> : <div className="space-y-2"><div className="flex justify-end"><Button size="xs" variant="subtle" onClick={markAllRead}>Mark all as read</Button></div>{notificationsList.map((notif) => (
                  <div key={notif.id} className={`p-3 rounded-xl cursor-pointer transition ${notif.read ? "bg-white border border-gray-200" : "bg-blue-50 border border-blue-200"}`} onClick={() => markNotificationRead(notif.id)}>
                    <div className="flex gap-3"><div className={`p-1.5 rounded-lg ${notif.type === "interview" ? "bg-orange-100" : "bg-blue-100"}`}>{notif.type === "interview" ? <IconCalendar size={14} className="text-orange-600" /> : <IconSend size={14} className="text-blue-600" />}</div><div><Text fw={500} size="sm">{notif.title}</Text><Text size="xs" c="gray">{notif.message}</Text><Text size="xs" c="gray" className="mt-1">{new Date(notif.createdAt).toLocaleDateString()}</Text></div>{!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-auto mt-1"></div>}</div>
                  </div>
                ))}</div>}
              </Tabs.Panel>
            </Tabs>
          </div>
        </Card>

        {/* Modals */}
        <Modal opened={jobDetailsModalOpen} onClose={closeJobDetailsModal} title="Job Details" size="lg" radius="lg" fullScreen={window.innerWidth < 768}>
          {selectedJob && (
            <div className="space-y-3 p-2">
                           <div className="flex flex-wrap justify-between gap-2"><div><h2 className="text-lg font-bold">{selectedJob.jobTitle}</h2><p className="text-sm text-gray-600">{selectedJob.company} • {selectedJob.location}</p></div><Badge color={selectedJob.urgentHiring ? "red" : "blue"}>{selectedJob.urgentHiring ? "Urgent" : selectedJob.jobType}</Badge></div>
              <div className="grid grid-cols-2 gap-2 text-sm"><div><strong>Salary:</strong> {selectedJob.salary}</div><div><strong>Experience:</strong> {selectedJob.experience}</div></div>
              <div><strong>Description:</strong><p className="text-sm text-gray-700 mt-1">{selectedJob.description}</p></div>
              <div><strong>Skills:</strong><div className="flex flex-wrap gap-1 mt-1">{selectedJob.skills?.map((s, idx) => (<Badge key={`modal-skill-${idx}-${s}`} variant="light" color="blue" size="sm">{s}</Badge>))}</div></div>
              <div className="flex gap-3 mt-3"><Button color="blue" className="flex-1" onClick={() => { closeJobDetailsModal(); openApplyModal(); }} disabled={isJobApplied(selectedJob.id)}>{isJobApplied(selectedJob.id) ? "Already Applied" : "Apply Now"}</Button><Button variant="light" color="yellow" onClick={() => handleSaveJob(selectedJob)}>{isJobSaved(selectedJob.id) ? "Saved" : "Save Job"}</Button></div>
            </div>
          )}
        </Modal>

        <Modal opened={applyModalOpen} onClose={closeApplyModal} title={`Apply for ${selectedJob?.jobTitle || "Position"}`} size="lg" radius="lg" fullScreen={window.innerWidth < 768}>
          {selectedJob && (
            <div className="space-y-3">
              <Alert icon={<IconRobot size={14} />} color="blue">Your skills match <strong>{calculateMatchScore(selectedJob)}%</strong> with this job!</Alert>
              <div className="bg-gray-50 p-3 rounded-lg text-sm"><div className="flex justify-between"><span>Company:</span><strong>{selectedJob.company}</strong></div><div className="flex justify-between mt-1"><span>Location:</span><strong>{selectedJob.location}</strong></div><div className="flex justify-between mt-1"><span>Salary:</span><strong className="text-blue-600">{selectedJob.salary}</strong></div></div>
              <Textarea label="Cover Letter" placeholder="Why are you interested in this position?" rows={3} value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} size="sm" />
              <div className="flex gap-3"><Button onClick={handleApply} className="flex-1 bg-green-600">Submit Application</Button><Button onClick={closeApplyModal} variant="light">Cancel</Button></div>
            </div>
          )}
        </Modal>
      </Container>

      <ProfileModal opened={profileModalOpen} onClose={() => setProfileModalOpen(false)} profileData={fullProfileData} onSave={saveFullProfile} isEditable={true} />
    </div>
  );
};

export default CandidateDashboard;