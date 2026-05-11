import { useState, useEffect } from "react";
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
  Menu,
  SimpleGrid,
  Tabs,
  Avatar,
  Text,
  Divider,
  Progress,
  Pagination,
  Tooltip,
  FileInput,
  Alert,
  Skeleton,
  Group,
  RingProgress,
  Paper,
} from "@mantine/core";
import {
  IconBriefcase,
  IconUsers,
  IconClock,
  IconStar,
  IconSearch,
  IconCalendar,
  IconCheck,
  IconX,
  IconBookmark,
  IconBookmarkFilled,
  IconRobot,
  IconUpload,
  IconUser,
  IconBell,
  IconTrash,
  IconSend,
  IconFileText,
  IconChartBar,
  IconRefresh,
  IconArrowRight,
  IconAward,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandGithub,
  IconWorld,
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
  const [notificationsList, setNotificationsList] = useState<Notification[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [statsRefresh, setStatsRefresh] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterJobType, setFilterJobType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const [applyModalOpen, { open: openApplyModal, close: closeApplyModal }] =
    useDisclosure(false);
  const [
    jobDetailsModalOpen,
    { open: openJobDetailsModal, close: closeJobDetailsModal },
  ] = useDisclosure(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Profile Modal State
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Full Profile Data for the rich profile view
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

  // Simple profile for dashboard
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

  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Load full profile when user is available
  useEffect(() => {
    if (user) {
      loadFullProfile();
      loadAllData();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadJobs();
      loadApplications();
      loadInterviews();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generateRecommendations();
  }, [jobs, profile.skills]);

  const loadAllData = async () => {
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
  };

  const loadProfileFromBackend = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success && response.data.user) {
        const userData = response.data.user;
        const profileData = userData.profile || {};

        setProfile({
          ...profile,
          id: userData.id,
          fullName: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phoneNumber || "",
          location: profileData.location || "",
          skills: profileData.skills || [],
          bio: profileData.bio || "",
          linkedin: profileData.linkedin || "",
          github: profileData.github || "",
          portfolio: profileData.portfolio || "",
        });

        setFullProfileData({
          ...fullProfileData,
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
        });
      }
    } catch (error) {
      console.error("Error loading profile from backend:", error);
      // Fallback to localStorage
      const userId = user?.id || "guest";
      const stored = localStorage.getItem(`candidate_full_profile_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFullProfileData(parsed);
        setProfile({
          ...profile,
          fullName: parsed.name || user?.fullName || "Guest User",
          email: parsed.email || user?.email || "guest@example.com",
          phone: parsed.phone || "",
          location: parsed.location || "",
          skills: parsed.skills || [],
          linkedin: parsed.linkedin || "",
          github: parsed.github || "",
        });
      }
    }
  };

  const loadFullProfile = () => {
    loadProfileFromBackend();
  };

  const saveFullProfile = async (updatedProfile: any) => {
    try {
      // Save to backend
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

      // Save to localStorage as backup
      const userId = user?.id || "guest";
      localStorage.setItem(
        `candidate_full_profile_${userId}`,
        JSON.stringify(updatedProfile),
      );
      setFullProfileData(updatedProfile);

      // Update simple profile
      setProfile({
        ...profile,
        fullName: updatedProfile.name || updatedProfile.fullName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
        skills: updatedProfile.skills,
        linkedin: updatedProfile.linkedin,
        github: updatedProfile.github,
      });

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

  const loadJobs = async () => {
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
          postedDate: job.postedDate
            ? new Date(job.postedDate).toLocaleDateString()
            : "Just now",
          applicants: job.applicantsCount || 0,
          urgentHiring: false,
        }));
        setJobs(jobsData);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      // Fallback to localStorage
      const storedJobs = localStorage.getItem("jobs");
      const storedRecruiterJobs = localStorage.getItem("recruiter_jobs");
      let allJobs: Job[] = [];
      if (storedJobs) allJobs = [...allJobs, ...JSON.parse(storedJobs)];
      if (storedRecruiterJobs) {
        const activeJobs = JSON.parse(storedRecruiterJobs).filter(
          (job: any) => job.status === "active",
        );
        allJobs = [...allJobs, ...activeJobs];
      }
      setJobs(allJobs);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await api.get("/applications/my-applications");
      if (response.data.success) {
        const appsData = response.data.applications.map((app: any) => ({
          id: app._id,
          jobId: app.jobId,
          jobTitle: app.jobTitle,
          company: app.company,
          appliedDate: app.appliedDate,
          status:
            app.status === "interview"
              ? "interview"
              : app.status === "shortlisted"
                ? "shortlisted"
                : app.status === "hired"
                  ? "hired"
                  : app.status === "rejected"
                    ? "rejected"
                    : "applied",
          resumeName: app.resumeUrl ? "Resume.pdf" : "",
          coverLetter: app.coverLetter,
          matchScore: app.aiScore,
          feedback: app.feedback,
        }));
        setApplications(appsData);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      const stored = localStorage.getItem(
        `candidate_applications_${user?.id || "guest"}`,
      );
      setApplications(stored ? JSON.parse(stored) : []);
    }
  };

  const loadSavedJobs = () => {
    const stored = localStorage.getItem(`saved_jobs_${user?.id || "guest"}`);
    setSavedJobs(stored ? JSON.parse(stored) : []);
  };

  const loadInterviews = async () => {
    try {
      const response = await api.get("/interviews/candidate");
      if (response.data.success) {
        const interviewsData = response.data.interviews.map(
          (interview: any) => ({
            id: interview._id,
            jobId: interview.jobId,
            jobTitle: interview.jobTitle,
            company: interview.company || "",
            date: interview.date,
            time: interview.time,
            mode: interview.mode,
            link: interview.link,
          }),
        );
        setInterviews(interviewsData);
      }
    } catch (error) {
      console.error("Error loading interviews:", error);
      const stored = localStorage.getItem(
        `candidate_interviews_${user?.id || "guest"}`,
      );
      setInterviews(stored ? JSON.parse(stored) : []);
    }
  };

  const loadNotifications = () => {
    const stored = localStorage.getItem(
      `candidate_notifications_${user?.id || "guest"}`,
    );
    setNotificationsList(stored ? JSON.parse(stored) : []);
  };

  const saveApplications = (updatedApps: Application[]) => {
    setApplications(updatedApps);
    localStorage.setItem(
      `candidate_applications_${user?.id || "guest"}`,
      JSON.stringify(updatedApps),
    );
  };

  const saveSavedJobs = (updated: SavedJob[]) => {
    setSavedJobs(updated);
    localStorage.setItem(
      `saved_jobs_${user?.id || "guest"}`,
      JSON.stringify(updated),
    );
  };

  const saveNotifications = (updated: Notification[]) => {
    setNotificationsList(updated);
    localStorage.setItem(
      `candidate_notifications_${user?.id || "guest"}`,
      JSON.stringify(updated),
    );
  };

  const generateRecommendations = () => {
    if (!profile.skills.length) {
      setRecommendedJobs([]);
      return;
    }
    setRecommendedJobs(
      jobs
        .filter((job) =>
          job?.skills?.some((skill) =>
            profile.skills.some(
              (ps) => ps?.toLowerCase() === skill?.toLowerCase(),
            ),
          ),
        )
        .slice(0, 4),
    );
  };

  const calculateMatchScore = (job: Job | null): number => {
    if (!job?.skills?.length || !profile.skills.length) return 0;
    const matched = job.skills.filter((skill) =>
      profile.skills.some((ps) => ps?.toLowerCase() === skill?.toLowerCase()),
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
          title: "Application Submitted! ",
          message: `Your application for ${selectedJob.jobTitle} has been sent.`,
          color: "green",
        });

        // Add to local applications
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
        saveApplications([newApp, ...applications]);

        // Update job applicants count
        const updatedJobs = jobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, applicants: (job.applicants || 0) + 1 }
            : job,
        );
        setJobs(updatedJobs);

        saveNotifications([
          {
            id: Date.now().toString(),
            title: "Application Submitted! 🎉",
            message: `Applied for ${selectedJob.jobTitle} at ${selectedJob.company}`,
            type: "application",
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...notificationsList,
        ]);

        closeApplyModal();
        setCoverLetter("");
        setSelectedJob(null);
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message:
          error.response?.data?.message || "Failed to submit application",
        color: "red",
      });
    }
  };

  const handleSaveJob = (job: Job | null) => {
    if (!job) {
      notifications.show({
        title: "Error",
        message: "Job not found",
        color: "red",
      });
      return;
    }
    const existing = savedJobs.find((sj) => sj.jobId === job.id);
    if (existing) {
      saveSavedJobs(savedJobs.filter((sj) => sj.jobId !== job.id));
      notifications.show({
        title: "Removed",
        message: "Job removed from saved",
        color: "blue",
      });
    } else {
      saveSavedJobs([
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
      ]);
      notifications.show({
        title: "Saved",
        message: "Job saved successfully",
        color: "green",
      });
    }
  };

  const isJobSaved = (id: string) => savedJobs.some((sj) => sj.jobId === id);
  const isJobApplied = (id: string) =>
    applications.some((app) => app.jobId === id);

  const withdrawApplication = async (appId: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app || (app.status !== "applied" && app.status !== "reviewing")) {
      notifications.show({
        title: "Cannot Withdraw",
        message: "This application cannot be withdrawn",
        color: "red",
      });
      return;
    }

    try {
      // Call backend to withdraw if you have an endpoint
      saveApplications(applications.filter((a) => a.id !== appId));

      // Update job applicants count
      const updatedJobs = jobs.map((job) =>
        job.id === app.jobId
          ? { ...job, applicants: Math.max(0, (job.applicants || 0) - 1) }
          : job,
      );
      setJobs(updatedJobs);

      notifications.show({
        title: "Withdrawn",
        message: `Application for ${app.jobTitle} withdrawn`,
        color: "orange",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to withdraw application",
        color: "red",
      });
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill("");
      generateRecommendations();
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
    generateRecommendations();
  };

  const markNotificationRead = (id: string) => {
    saveNotifications(
      notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () => {
    saveNotifications(notificationsList.map((n) => ({ ...n, read: true })));
    notifications.show({
      title: "Success",
      message: "All notifications marked as read",
      color: "green",
    });
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
      filtered = filtered.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(term) ||
          job.company?.toLowerCase().includes(term) ||
          job.skills?.some((s) => s.toLowerCase().includes(term)),
      );
    }
    if (filterLocation)
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(filterLocation.toLowerCase()),
      );
    if (filterJobType)
      filtered = filtered.filter((job) => job.jobType === filterJobType);
    if (sortBy === "latest")
      filtered.sort((a, b) =>
        (b.postedDate || "").localeCompare(a.postedDate || ""),
      );
    else if (sortBy === "salary")
      filtered.sort(
        (a, b) =>
          parseInt(b.salary?.replace(/[^0-9]/g, "") || "0") -
          parseInt(a.salary?.replace(/[^0-9]/g, "") || "0"),
      );
    else if (sortBy === "match")
      filtered.sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
    return filtered;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { color: string; label: string; icon: React.ReactNode }
    > = {
      applied: {
        color: "blue",
        label: "APPLIED",
        icon: <IconSend size={12} />,
      },
      reviewing: {
        color: "yellow",
        label: "UNDER REVIEW",
        icon: <IconClock size={12} />,
      },
      shortlisted: {
        color: "green",
        label: "SHORTLISTED",
        icon: <IconStar size={12} />,
      },
      interview: {
        color: "orange",
        label: "INTERVIEW",
        icon: <IconCalendar size={12} />,
      },
      rejected: { color: "red", label: "REJECTED", icon: <IconX size={12} /> },
      hired: {
        color: "teal",
        label: "HIRED! 🎉",
        icon: <IconAward size={12} />,
      },
    };
    const c = config[status];
    return c ? (
      <Badge color={c.color} size="sm" leftSection={c.icon}>
        {c.label}
      </Badge>
    ) : (
      <Badge color="gray" size="sm">
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getStep = (status: string): number => {
    const steps = ["applied", "reviewing", "shortlisted", "interview", "hired"];
    return steps.indexOf(status) + 1;
  };

  const filteredJobs = getFilteredJobs();
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const profileCompletion = Math.min(
    Math.floor(
      (Object.values(profile).filter(
        (v) => v && (Array.isArray(v) ? v.length > 0 : true),
      ).length /
        12) *
        100,
    ),
    100,
  );

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between mb-8">
            <Skeleton height={50} width={280} radius="lg" />
            <Skeleton height={45} width={200} radius="xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height={120} radius="xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton height={400} radius="xl" className="lg:col-span-2" />
            <Skeleton height={400} radius="xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <Container size="xl" className="py-8 px-4 relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <IconSparkles size={22} className="text-white" />
              </div>
              <Text size="sm" className="text-blue-600 font-semibold">
                Candidate Dashboard
              </Text>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome back, {getFirstName()}!
            </h1>
            <p className="text-gray-500 mt-1">
              Track your applications and discover new opportunities
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="light"
              onClick={loadAllData}
              leftSection={<IconRefresh size={18} />}
              radius="xl"
            >
              Refresh
            </Button>
            <Button
              variant="light"
              onClick={() => setActiveTab("notifications")}
              radius="xl"
              className="relative"
            >
              <IconBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-0 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              onClick={() => setProfileModalOpen(true)}
              variant="light"
              leftSection={<IconUser size={18} />}
              radius="xl"
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="light"
              color="red"
              leftSection={<IconLogout size={18} />}
              radius="xl"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <Text size="sm" opacity={0.8}>
                  Total Applications
                </Text>
                <Text size="40px" fw={800}>
                  {stats.totalApplied}
                </Text>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <IconBriefcase size={28} />
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <Text size="sm" opacity={0.8}>
                  Shortlisted
                </Text>
                <Text size="40px" fw={800}>
                  {stats.shortlisted}
                </Text>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <IconStar size={28} />
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <Text size="sm" opacity={0.8}>
                  Interviews
                </Text>
                <Text size="40px" fw={800}>
                  {stats.interviews}
                </Text>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <IconCalendar size={28} />
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-center">
              <div>
                <Text size="sm" opacity={0.8}>
                  Success Rate
                </Text>
                <Text size="40px" fw={800}>
                  {stats.totalApplied
                    ? Math.round((stats.hired / stats.totalApplied) * 100)
                    : 0}
                  %
                </Text>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl">
                <IconAward size={28} />
              </div>
            </div>
          </Card>
        </SimpleGrid>

        {/* Profile Strength */}
        <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-md mb-8 border border-blue-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="relative z-10 p-5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <IconShield size={20} className="text-blue-600" />
                <Text fw={700} size="lg">
                  Profile Strength
                </Text>
              </div>
              <Text size="sm" className="text-gray-600">
                Complete your profile to get better job matches
              </Text>
              <div className="mt-3 max-w-md">
                <Progress
                  value={profileCompletion}
                  color="blue"
                  size="md"
                  radius="xl"
                />
              </div>
            </div>
            <div className="text-center">
              <RingProgress
                size={80}
                thickness={6}
                sections={[{ value: profileCompletion, color: "blue" }]}
                label={
                  <Text size="lg" fw={800} className="text-blue-600">
                    {profileCompletion}%
                  </Text>
                }
              />
            </div>
            <Button
              variant="gradient"
              gradient={{ from: "blue", to: "indigo" }}
              onClick={() => setProfileModalOpen(true)}
              radius="xl"
            >
              Complete Profile
            </Button>
          </div>
        </Card>

        {/* Main Tabs */}
        <Card className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            color="blue"
            radius="md"
          >
            <Tabs.List className="px-6 pt-5 border-b border-gray-100 gap-1 flex-wrap">
              <Tabs.Tab
                value="overview"
                leftSection={<IconTrendingUp size={18} />}
              >
                Overview
              </Tabs.Tab>
              <Tabs.Tab value="jobs" leftSection={<IconSearch size={18} />}>
                Find Jobs ({jobs.length})
              </Tabs.Tab>
              <Tabs.Tab
                value="applications"
                leftSection={<IconBriefcase size={18} />}
              >
                Applications ({applications.length})
              </Tabs.Tab>
              <Tabs.Tab value="saved" leftSection={<IconBookmark size={18} />}>
                Saved ({savedJobs.length})
              </Tabs.Tab>
              <Tabs.Tab
                value="interviews"
                leftSection={<IconCalendar size={18} />}
              >
                Interviews ({interviews.length})
              </Tabs.Tab>
              <Tabs.Tab
                value="notifications"
                leftSection={<IconBell size={18} />}
              >
                Notifications{" "}
                {unreadCount > 0 && (
                  <Badge size="xs" color="red" className="ml-1">
                    {unreadCount}
                  </Badge>
                )}
              </Tabs.Tab>
            </Tabs.List>

            {/* Overview Tab */}
            <Tabs.Panel value="overview" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    <div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                      <IconRobot size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold">
                      AI Recommended Jobs
                    </h2>
                  </div>
                  {recommendedJobs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <IconRobot
                        size={48}
                        className="mx-auto text-gray-300 mb-3"
                      />
                      <p className="text-gray-500">
                        No recommendations available
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recommendedJobs.map((job) => (
                        <Paper
                          key={job.id}
                          className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition cursor-pointer group"
                          onClick={() => {
                            setSelectedJob(job);
                            openApplyModal();
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Text
                                fw={600}
                                className="group-hover:text-blue-600"
                              >
                                {job.jobTitle}
                              </Text>
                              <Text size="sm" c="gray">
                                {job.company} • {job.location}
                              </Text>
                            </div>
                            <Badge color="green">
                              {calculateMatchScore(job)}% Match
                            </Badge>
                          </div>
                          <Progress
                            value={calculateMatchScore(job)}
                            color="green"
                            size="sm"
                            className="mt-2"
                          />
                          <Button
                            size="xs"
                            variant="light"
                            color="blue"
                            radius="xl"
                            className="mt-2"
                          >
                            Apply Now
                          </Button>
                        </Paper>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <IconClock size={18} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold">Recent Activity</h2>
                  </div>
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-xl mb-2 hover:bg-gray-100 transition"
                    >
                      <div>
                        <Text fw={500}>{app.jobTitle}</Text>
                        <Text size="xs" c="gray">
                          {app.company}
                        </Text>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>

            {/* Find Jobs Tab */}
            <Tabs.Panel value="jobs" className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                <TextInput
                  placeholder="Search jobs..."
                  leftSection={
                    <IconSearch size={18} className="text-gray-400" />
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 min-w-[200px]"
                  radius="xl"
                  size="md"
                />
                <Select
                  placeholder="Location"
                  data={[
                    "Remote",
                    "New York",
                    "London",
                    "San Francisco",
                    "Austin",
                  ]}
                  value={filterLocation}
                  onChange={setFilterLocation}
                  clearable
                  radius="xl"
                  className="w-36"
                />
                <Select
                  placeholder="Job Type"
                  data={["Full-time", "Part-time", "Contract", "Internship"]}
                  value={filterJobType}
                  onChange={setFilterJobType}
                  clearable
                  radius="xl"
                  className="w-32"
                />
                <Select
                  placeholder="Sort by"
                  data={["Latest", "Salary (High to Low)", "Best Match"]}
                  value={sortBy}
                  onChange={setSortBy}
                  clearable
                  radius="xl"
                  className="w-36"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedJobs.map((job) => {
                  const matchScore = calculateMatchScore(job);
                  const applied = isJobApplied(job.id);
                  const saved = isJobSaved(job.id);
                  return (
                    <Card
                      key={job.id}
                      className="border border-gray-100 rounded-xl hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                      {job.urgentHiring && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                            ⚡ Urgent
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-start">
                        <div
                          onClick={() => {
                            setSelectedJob(job);
                            openJobDetailsModal();
                          }}
                          className="cursor-pointer flex-1"
                        >
                          <h4 className="font-semibold group-hover:text-blue-600 transition">
                            {job.jobTitle}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            <IconMapPin size={14} className="text-gray-400" />
                            <Text size="sm" c="gray">
                              {job.company} • {job.location}
                            </Text>
                          </div>
                        </div>
                        <ActionIcon
                          variant="subtle"
                          onClick={() => handleSaveJob(job)}
                        >
                          {saved ? (
                            <IconBookmarkFilled
                              className="text-yellow-500"
                              size={18}
                            />
                          ) : (
                            <IconBookmark size={18} />
                          )}
                        </ActionIcon>
                      </div>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <Badge size="sm" variant="light">
                          {job.jobType}
                        </Badge>
                        <Badge size="sm" variant="light">
                          {job.salary}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills?.slice(0, 3).map((s) => (
                          <Badge key={s} size="xs" variant="light" color="gray">
                            {s}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <IconChartBar size={14} className="text-blue-500" />
                          <span className="text-xs font-medium">
                            {matchScore}% match
                          </span>
                        </div>
                        <Button
                          size="xs"
                          radius="xl"
                          variant={applied ? "filled" : "gradient"}
                          gradient={{ from: "blue", to: "indigo" }}
                          onClick={() => {
                            setSelectedJob(job);
                            openApplyModal();
                          }}
                          disabled={applied}
                          className={applied ? "bg-green-600" : ""}
                        >
                          {applied ? "Applied ✓" : "Apply Now"}
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Posted {job.postedDate} • {job.applicants || 0}{" "}
                        applicants
                      </div>
                    </Card>
                  );
                })}
              </div>
              {filteredJobs.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                  <IconSearch
                    size={48}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <Text size="lg" className="text-gray-500">
                    No jobs found
                  </Text>
                  <Button
                    variant="light"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterLocation(null);
                      setFilterJobType(null);
                    }}
                    className="mt-4"
                    radius="xl"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    color="blue"
                    radius="xl"
                  />
                </div>
              )}
            </Tabs.Panel>

            {/* Applications Tab */}
            <Tabs.Panel value="applications" className="p-6">
              {applications.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconBriefcase size={32} className="text-gray-400" />
                  </div>
                  <Text size="lg" fw={500}>
                    No applications yet
                  </Text>
                  <Button
                    onClick={() => setActiveTab("jobs")}
                    className="mt-4"
                    radius="xl"
                  >
                    Browse Jobs
                  </Button>
                </div>
              ) : (
                applications.map((app) => (
                  <Card
                    key={app.id}
                    className="border border-gray-200 rounded-xl p-4 mb-4 hover:shadow-md transition"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <Group gap="sm" mb={4}>
                          <Text fw={600} size="lg">
                            {app.jobTitle}
                          </Text>
                          {app.matchScore && (
                            <Badge size="xs" color="blue" radius="xl">
                              Match: {app.matchScore}%
                            </Badge>
                          )}
                        </Group>
                        <Text size="sm" c="gray">
                          {app.company}
                        </Text>
                        <Text size="xs" c="gray">
                          Applied:{" "}
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </Text>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(app.status)}
                        {(app.status === "applied" ||
                          app.status === "reviewing") && (
                          <Button
                            size="xs"
                            variant="subtle"
                            color="red"
                            onClick={() => withdrawApplication(app.id)}
                          >
                            Withdraw
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress
                        value={(getStep(app.status) / 5) * 100}
                        color="blue"
                        size="sm"
                        radius="xl"
                      />
                    </div>
                  </Card>
                ))
              )}
            </Tabs.Panel>

            {/* Saved Jobs Tab */}
            <Tabs.Panel value="saved" className="p-6">
              {savedJobs.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconBookmark size={32} className="text-gray-400" />
                  </div>
                  <Text size="lg" fw={500}>
                    No saved jobs
                  </Text>
                  <Button
                    onClick={() => setActiveTab("jobs")}
                    className="mt-4"
                    radius="xl"
                  >
                    Explore Jobs
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedJobs.map((saved) => {
                    const job = jobs.find((j) => j.id === saved.jobId);
                    if (!job) {
                      return (
                        <Card
                          key={saved.id}
                          className="border border-gray-200 rounded-xl p-4 opacity-60 bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Text fw={600}>{saved.jobTitle}</Text>
                              <Text size="sm" c="gray">
                                {saved.company} • {saved.location}
                              </Text>
                              <Text
                                size="sm"
                                fw={500}
                                c="blue"
                                className="mt-1"
                              >
                                {saved.salary}
                              </Text>
                              <Badge color="red" size="xs" className="mt-2">
                                Job no longer available
                              </Badge>
                            </div>
                            <ActionIcon
                              color="red"
                              variant="subtle"
                              onClick={() => handleSaveJob(job!)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </div>
                        </Card>
                      );
                    }
                    return (
                      <Card
                        key={saved.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <Text fw={600}>{job.jobTitle}</Text>
                            <Text size="sm" c="gray">
                              {job.company} • {job.location}
                            </Text>
                            <Text size="sm" fw={500} c="blue" className="mt-1">
                              {job.salary}
                            </Text>
                          </div>
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => handleSaveJob(job)}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </div>
                        <Button
                          variant="light"
                          color="blue"
                          fullWidth
                          className="mt-3"
                          onClick={() => {
                            setSelectedJob(job);
                            openApplyModal();
                          }}
                        >
                          Apply Now
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              )}
            </Tabs.Panel>

            {/* Interviews Tab */}
            <Tabs.Panel value="interviews" className="p-6">
              {interviews.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconCalendar size={32} className="text-gray-400" />
                  </div>
                  <Text size="lg" fw={500}>
                    No interviews scheduled
                  </Text>
                </div>
              ) : (
                interviews.map((interview) => (
                  <Card
                    key={interview.id}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-4"
                  >
                    <div className="flex gap-3">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <IconCalendar size={24} className="text-blue-600" />
                      </div>
                      <div>
                        <Text fw={600}>{interview.jobTitle}</Text>
                        <Text size="sm" c="gray">
                          {interview.company}
                        </Text>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge color="blue">{interview.date}</Badge>
                          <Badge color="gray">{interview.time}</Badge>
                          <Badge variant="light">{interview.mode}</Badge>
                        </div>
                        {interview.link && (
                          <a
                            href={interview.link}
                            target="_blank"
                            className="text-blue-600 text-sm mt-2 inline-flex items-center gap-1"
                          >
                            Join Meeting <IconArrowRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </Tabs.Panel>

            {/* Notifications Tab */}
            <Tabs.Panel value="notifications" className="p-6">
              {notificationsList.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconBell size={32} className="text-gray-400" />
                  </div>
                  <Text size="lg" fw={500}>
                    No notifications
                  </Text>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <Button size="xs" variant="subtle" onClick={markAllRead}>
                      Mark all as read
                    </Button>
                  </div>
                  {notificationsList.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-xl cursor-pointer transition ${notif.read ? "bg-white border border-gray-200" : "bg-blue-50 border border-blue-200"}`}
                      onClick={() => markNotificationRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`p-2 rounded-lg ${notif.type === "interview" ? "bg-orange-100" : "bg-blue-100"}`}
                        >
                          {notif.type === "interview" ? (
                            <IconCalendar
                              size={18}
                              className="text-orange-600"
                            />
                          ) : (
                            <IconSend size={18} className="text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Text fw={600}>{notif.title}</Text>
                          <Text size="sm" c="gray">
                            {notif.message}
                          </Text>
                          <Text size="xs" c="gray" className="mt-1">
                            {new Date(notif.createdAt).toLocaleDateString()}
                          </Text>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Tabs.Panel>
          </Tabs>
        </Card>

        {/* Modals */}
        <Modal
          opened={jobDetailsModalOpen}
          onClose={closeJobDetailsModal}
          title="Job Details"
          size="lg"
          radius="lg"
        >
          {selectedJob && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedJob.jobTitle}</h2>
                  <p className="text-gray-600">
                    {selectedJob.company} • {selectedJob.location}
                  </p>
                </div>
                <Badge color={selectedJob.urgentHiring ? "red" : "blue"}>
                  {selectedJob.urgentHiring ? "Urgent" : selectedJob.jobType}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <strong>Salary:</strong> {selectedJob.salary}
                </div>
                <div>
                  <strong>Experience:</strong> {selectedJob.experience}
                </div>
                <div>
                  <strong>Type:</strong> {selectedJob.jobType}
                </div>
                <div>
                  <strong>👥 Applicants:</strong> {selectedJob.applicants || 0}
                </div>
              </div>
              <div>
                <strong> Description:</strong>
                <p className="text-gray-700 mt-1">{selectedJob.description}</p>
              </div>
              <div>
                <strong>🛠 Skills:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedJob.skills?.map((s) => (
                    <Badge key={s} variant="light" color="blue">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  color="blue"
                  className="flex-1"
                  onClick={() => {
                    closeJobDetailsModal();
                    openApplyModal();
                  }}
                  disabled={isJobApplied(selectedJob.id)}
                >
                  {isJobApplied(selectedJob.id)
                    ? "Already Applied"
                    : "Apply Now"}
                </Button>
                <Button
                  variant="light"
                  color="yellow"
                  onClick={() => handleSaveJob(selectedJob)}
                >
                  {isJobSaved(selectedJob.id) ? "Saved" : "Save Job"}
                </Button>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          opened={applyModalOpen}
          onClose={closeApplyModal}
          title={`Apply for ${selectedJob?.jobTitle || "Position"}`}
          size="lg"
          radius="lg"
        >
          {selectedJob && (
            <div className="space-y-4">
              <Alert icon={<IconRobot size={16} />} color="blue">
                Your skills match{" "}
                <strong>{calculateMatchScore(selectedJob)}%</strong> with this
                job!
              </Alert>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Company:</span>
                  <strong>{selectedJob.company}</strong>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Location:</span>
                  <strong>{selectedJob.location}</strong>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Salary:</span>
                  <strong className="text-blue-600">
                    {selectedJob.salary}
                  </strong>
                </div>
              </div>
              <FileInput
                label="Resume"
                placeholder={profile.resumeName || "Upload resume"}
                accept="application/pdf"
                leftSection={<IconFileText size={16} />}
                value={resumeFile}
                onChange={setResumeFile}
              />
              <Textarea
                label="Cover Letter"
                placeholder="Why are you interested in this position? Tell us about your relevant experience and skills..."
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
              <div className="flex gap-3">
                <Button onClick={handleApply} className="flex-1 bg-green-600">
                  Submit Application
                </Button>
                <Button onClick={closeApplyModal} variant="light">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </Container>

      {/* Profile Modal */}
      <ProfileModal
        opened={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profileData={fullProfileData}
        onSave={saveFullProfile}
        isEditable={true}
      />
    </div>
  );
};

export default CandidateDashboard;
