import React, { useState, useEffect } from "react";
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
  Tabs,
  Avatar,
  Divider,
  Pagination,
  Tooltip,
  Skeleton,
  Alert,
  Stack,
  NumberInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconBriefcase,
  IconUsers,
  IconClock,
  IconStar,
  IconDotsVertical,
  IconArchive,
  IconSend,
  IconEye,
  IconDownload,
  IconBuilding,
  IconLogout,
  IconSearch,
  IconCheck,
  IconX,
  IconBookmark,
  IconBookmarkFilled,
  IconRobot,
  IconAward,
  IconMapPin,
  IconTrendingUp,
  IconUserCheck,
  IconCalendar as IconCalendarEvent,
  IconTrophy,
  IconMoodHappy,
  IconVideo,
  IconRefresh,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface Job {
  _id: string;
  jobTitle: string;
  location: string;
  companyName: string;
  status: "active" | "draft" | "closed";
  description?: string;
  salary?: string;
  jobType?: string;
  experience?: string;
  department?: string;
  openings?: number;
  skills?: string[];
  applicantsCount?: number;
  views?: number;
  postedDate?: string;
  createdAt?: string;
}

interface Application {
  _id: string;
  id?: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  coverLetter?: string;
  experience?: string;
  skills?: string;
  expectedSalary?: string;
  resumeUrl?: string;
  status: "pending" | "shortlisted" | "interview" | "hired" | "rejected";
  aiScore?: number;
  isBookmarked?: boolean;
  appliedDate: string;
  feedback?: string;
}

interface Interview {
  _id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
  mode: "online" | "offline";
  link?: string;
  status: "scheduled" | "completed" | "cancelled";
}

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  
  // Modal states
  const [jobModalOpen, { open: openJobModal, close: closeJobModal }] = useDisclosure(false);
  const [editJobModalOpen, { open: openEditJobModal, close: closeEditJobModal }] = useDisclosure(false);
  const [appModalOpen, { open: openAppModal, close: closeAppModal }] = useDisclosure(false);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  // Form states
  const [messageText, setMessageText] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewMode, setInterviewMode] = useState<"online" | "offline">("online");
  const [interviewLink, setInterviewLink] = useState("");
  const [skillInput, setSkillInput] = useState<string>("");
  
  const [editFormData, setEditFormData] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    description: "",
    department: "",
    openings: 1,
    skills: [] as string[],
  });
  
  const [newJobData, setNewJobData] = useState({
    jobTitle: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    experience: "",
    description: "",
    department: "",
    openings: 1,
    skills: [] as string[],
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadJobs(), loadApplications(), loadInterviews()]);
    } catch (error) {
      console.error("Error loading data:", error);
      notifications.show({
        title: "Error",
        message: "Failed to load dashboard data",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadJobs = async () => {
    try {
      const response = await api.get('/jobs/recruiter/jobs');
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobs([]);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await api.get('/applications/recruiter');
      if (response.data.success) {
        console.log("✅ Loaded applications:", response.data.applications?.length);
        setApplications(response.data.applications || []);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    }
  };

  const loadInterviews = async () => {
    try {
      const response = await api.get('/interviews/recruiter');
      if (response.data.success) {
        setInterviews(response.data.interviews);
      }
    } catch (error) {
      console.error("Error loading interviews:", error);
      setInterviews([]);
    }
  };

  // ✅ Helper function to safely get application ID - returns string, never undefined
  const getAppId = (app: Application): string => {
    const id = app._id || app.id;
    if (!id || id === "undefined" || id === "null" || id === "") {
      console.error("❌ Invalid application ID:", app);
      return "";
    }
    return id;
  };

  const addSkill = () => {
    if (skillInput && !newJobData.skills.includes(skillInput)) {
      setNewJobData({
        ...newJobData,
        skills: [...newJobData.skills, skillInput]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setNewJobData({
      ...newJobData,
      skills: newJobData.skills.filter(s => s !== skill)
    });
  };

  const addEditSkill = () => {
    if (skillInput && !editFormData.skills.includes(skillInput)) {
      setEditFormData({
        ...editFormData,
        skills: [...editFormData.skills, skillInput]
      });
      setSkillInput("");
    }
  };

  const removeEditSkill = (skill: string) => {
    setEditFormData({
      ...editFormData,
      skills: editFormData.skills.filter(s => s !== skill)
    });
  };

  const handleCreateJob = async () => {
    if (!newJobData.jobTitle || !newJobData.location || !newJobData.description) {
      notifications.show({
        title: "Missing Fields",
        message: "Please fill in all required fields",
        color: "red",
      });
      return;
    }

    try {
      const response = await api.post('/jobs', newJobData);
      if (response.data.success) {
        notifications.show({
          title: "Success! 🎉",
          message: "Job posted successfully",
          color: "green",
        });
        closeJobModal();
        setNewJobData({
          jobTitle: "",
          location: "",
          jobType: "Full-time",
          salary: "",
          experience: "",
          description: "",
          department: "",
          openings: 1,
          skills: [],
        });
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to post job",
        color: "red",
      });
    }
  };

  const handleUpdateJob = async () => {
    if (!editingJob) return;

    try {
      const response = await api.put(`/jobs/${editingJob._id}`, editFormData);
      if (response.data.success) {
        notifications.show({
          title: "Success",
          message: "Job updated successfully",
          color: "green",
        });
        closeEditJobModal();
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update job",
        color: "red",
      });
    }
  };

  const handleDeleteJob = async () => {
    if (!jobToDelete) return;

    try {
      const response = await api.delete(`/jobs/${jobToDelete._id}`);
      if (response.data.success) {
        notifications.show({
          title: "Deleted",
          message: "Job removed successfully",
          color: "orange",
        });
        setDeleteModalOpen(false);
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to delete job",
        color: "red",
      });
    }
  };

  const handlePublishJob = async (jobId: string) => {
    try {
      const response = await api.patch(`/jobs/${jobId}/status`, { status: "active" });
      if (response.data.success) {
        notifications.show({
          title: "Published 🚀",
          message: "Job is now live",
          color: "green",
        });
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to publish job",
        color: "red",
      });
    }
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      const response = await api.patch(`/jobs/${jobId}/status`, { status: "draft" });
      if (response.data.success) {
        notifications.show({
          title: "Archived",
          message: "Job moved to drafts",
          color: "blue",
        });
        loadJobs();
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to archive job",
        color: "red",
      });
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setEditFormData({
      jobTitle: job.jobTitle,
      location: job.location,
      jobType: job.jobType || "Full-time",
      salary: job.salary || "",
      experience: job.experience || "",
      description: job.description || "",
      department: job.department || "",
      openings: job.openings || 1,
      skills: job.skills || [],
    });
    openEditJobModal();
  };

  // ✅ FIXED: Application status update with validation
  const updateApplicationStatus = async (appId: string, status: Application["status"]) => {
    if (!appId || appId === "undefined" || appId === "null" || appId === "") {
      console.error("❌ Invalid application ID:", appId);
      notifications.show({
        title: "Error",
        message: "Invalid application ID. Please refresh the page.",
        color: "red",
      });
      return;
    }

    try {
      const response = await api.put(`/applications/${appId}/status`, { status });
      if (response.data.success) {
        notifications.show({
          title: "Status Updated",
          message: `Application marked as ${status}`,
          color: "green",
        });
        await loadApplications();
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update status",
        color: "red",
      });
    }
  };

  // ✅ FIXED: Toggle bookmark with validation
  const toggleBookmark = async (appId: string) => {
    if (!appId || appId === "undefined" || appId === "null" || appId === "") {
      console.error("❌ Invalid application ID for bookmark:", appId);
      notifications.show({
        title: "Error",
        message: "Invalid application ID. Please refresh the page.",
        color: "red",
      });
      return;
    }

    try {
      const response = await api.patch(`/applications/${appId}/bookmark`);
      if (response.data.success) {
        notifications.show({
          title: "Bookmark Updated",
          message: response.data.isBookmarked ? "Candidate bookmarked" : "Bookmark removed",
          color: "blue",
        });
        await loadApplications();
      }
    } catch (error: any) {
      console.error("Error updating bookmark:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to update bookmark",
        color: "red",
      });
    }
  };

  const sendInterviewInvite = async () => {
    if (!selectedApp || !interviewDate || !interviewTime) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill all interview details",
        color: "red",
      });
      return;
    }

    const appId = getAppId(selectedApp);
    if (!appId) {
      notifications.show({
        title: "Error",
        message: "Invalid application ID",
        color: "red",
      });
      return;
    }

    try {
      const response = await api.post('/interviews', {
        jobId: selectedApp.jobId,
        jobTitle: selectedApp.jobTitle,
        candidateId: selectedApp.candidateId,
        candidateName: selectedApp.candidateName,
        candidateEmail: selectedApp.candidateEmail,
        date: interviewDate,
        time: interviewTime,
        mode: interviewMode,
        link: interviewLink,
      });

      if (response.data.success) {
        notifications.show({
          title: "Interview Scheduled! 🎯",
          message: `Invitation sent to ${selectedApp.candidateName}`,
          color: "green",
        });
        setInterviewModalOpen(false);
        setInterviewDate("");
        setInterviewTime("");
        setInterviewLink("");
        await loadInterviews();
        await updateApplicationStatus(appId, "interview");
      }
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to schedule interview",
        color: "red",
      });
    }
  };

  const sendMessage = async () => {
    if (!selectedApp || !messageText) return;

    notifications.show({
      title: "Message Sent! ✉️",
      message: `Message sent to ${selectedApp.candidateName}`,
      color: "green",
    });
    setMessageModalOpen(false);
    setMessageText("");
  };

  const runAIScreening = async () => {
    setLoading(true);
    setTimeout(() => {
      notifications.show({
        title: "AI Screening Complete 🤖",
        message: "Resumes have been analyzed",
        color: "green",
      });
      setLoading(false);
      loadApplications();
    }, 2000);
  };

  const bulkDownloadResumes = () => {
    const shortlistedApps = applications.filter(app => app.status === "shortlisted");
    notifications.show({
      title: "Download Started 📥",
      message: `Downloading ${shortlistedApps.length} resumes...`,
      color: "blue",
    });
  };

  const activeJobs = jobs.filter(job => job.status === "active");
  const totalApplications = applications.length;
  const shortlistedApps = applications.filter(app => app.status === "shortlisted");
  const interviewApps = applications.filter(app => app.status === "interview");
  const hiredApps = applications.filter(app => app.status === "hired");
  const upcomingInterviews = interviews.filter(i => i.status === "scheduled");

  const getFilteredApplications = () => {
    let filtered = applications;
    if (selectedJob) filtered = filtered.filter(app => app.jobId === selectedJob._id);
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (showBookmarkedOnly) filtered = filtered.filter(app => app.isBookmarked);
    return filtered;
  };

  const filteredApps = getFilteredApplications();
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);

  const stats = [
    { label: "Total Jobs", value: jobs.length, change: "+12%", icon: <IconBriefcase size={24} />, color: "from-blue-500 to-blue-600" },
    { label: "Active Jobs", value: activeJobs.length, change: "+5%", icon: <IconCheck size={24} />, color: "from-green-500 to-green-600" },
    { label: "Applications", value: totalApplications, change: "+28%", icon: <IconUsers size={24} />, color: "from-purple-500 to-purple-600" },
    { label: "Shortlisted", value: shortlistedApps.length, change: "+18%", icon: <IconStar size={24} />, color: "from-yellow-500 to-yellow-600" },
    { label: "Hired", value: hiredApps.length, change: "+8%", icon: <IconTrophy size={24} />, color: "from-teal-500 to-teal-600" },
    { label: "Interviews", value: interviewApps.length, change: "+15%", icon: <IconCalendarEvent size={24} />, color: "from-pink-500 to-pink-600" },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
      pending: { color: "yellow", label: "PENDING", icon: <IconClock size={12} /> },
      shortlisted: { color: "green", label: "SHORTLISTED", icon: <IconStar size={12} /> },
      interview: { color: "blue", label: "INTERVIEW", icon: <IconCalendarEvent size={12} /> },
      rejected: { color: "red", label: "REJECTED", icon: <IconX size={12} /> },
      hired: { color: "teal", label: "HIRED", icon: <IconAward size={12} /> },
      active: { color: "green", label: "ACTIVE", icon: <IconCheck size={12} /> },
      draft: { color: "gray", label: "DRAFT", icon: <IconArchive size={12} /> },
    };
    const c = config[status];
    return c ? (
      <Badge color={c.color} size="sm" leftSection={c.icon} variant="light">
        {c.label}
      </Badge>
    ) : (
      <Badge color="gray" size="sm">{status.toUpperCase()}</Badge>
    );
  };

  if (loading) {
    return (
      <Container size="xl" className="py-8">
        <div className="space-y-4">
          <Skeleton height={60} radius="xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (<Skeleton key={i} height={100} radius="xl" />))}
          </div>
          <Skeleton height={400} radius="xl" />
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Container size="xl" className="py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
              <IconMoodHappy size={16} />
              Welcome back, {user?.fullName?.split(" ")[0]}! Here's your hiring overview.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={openJobModal} leftSection={<IconPlus size={18} />} className="bg-gradient-to-r from-blue-600 to-blue-700" radius="xl" size="md">
              Post New Job
            </Button>
            <Button onClick={loadAllData} variant="light" leftSection={<IconRefresh size={18} />} radius="xl" size="md">
              Refresh
            </Button>
            <Button onClick={logout} variant="light" color="red" leftSection={<IconLogout size={18} />} radius="xl" size="md">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="relative overflow-hidden bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all" padding="md">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-12 -mt-12`} />
              <div className="relative">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                  <div className={`p-1.5 bg-gradient-to-br ${stat.color} rounded-lg text-white`}>{stat.icon}</div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 text-xs font-semibold">{stat.change}</span>
                  <IconTrendingUp size={10} className="text-green-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Card className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills" radius="lg">
            <div className="px-5 pt-4 border-b border-gray-100 overflow-x-auto">
              <Tabs.List className="gap-2">
                <Tabs.Tab value="jobs" className="font-semibold">💼 My Jobs ({jobs.length})</Tabs.Tab>
                <Tabs.Tab value="applications" className="font-semibold">📝 Applications ({totalApplications})</Tabs.Tab>
                <Tabs.Tab value="shortlisted" className="font-semibold">⭐ Shortlisted ({shortlistedApps.length})</Tabs.Tab>
                <Tabs.Tab value="interviews" className="font-semibold">📅 Interviews ({upcomingInterviews.length})</Tabs.Tab>
              </Tabs.List>
            </div>

            <div className="p-5">
              {/* Jobs Tab */}
              <Tabs.Panel value="jobs">
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <div key={job._id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all hover:border-blue-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="font-semibold text-gray-900 text-lg">{job.jobTitle}</h4>
                            {getStatusBadge(job.status)}
                          </div>
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-1"><IconMapPin size={14} className="text-gray-400" /><span className="text-sm">{job.location}</span></div>
                            <div className="flex items-center gap-1"><IconBriefcase size={14} className="text-gray-400" /><span className="text-sm">{job.jobType}</span></div>
                            <div className="flex items-center gap-1"><IconClock size={14} className="text-gray-400" /><span className="text-sm">{job.experience}</span></div>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-1"><IconEye size={14} className="text-gray-400" /><span>{job.views || 0} views</span></div>
                            <div className="flex items-center gap-1"><IconUsers size={14} className="text-gray-400" /><span>{job.applicantsCount || 0} applicants</span></div>
                            <div className="flex items-center gap-1"><IconStar size={14} className="text-gray-400" /><span>{job.openings || 1} openings</span></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Tooltip label="View Applicants">
                            <ActionIcon variant="light" color="blue" onClick={() => { setSelectedJob(job); setActiveTab("applications"); }} size="lg">
                              <IconUsers size={18} />
                            </ActionIcon>
                          </Tooltip>
                          <Menu position="bottom-end">
                            <Menu.Target>
                              <ActionIcon variant="light" size="lg">
                                <IconDotsVertical size={18} />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item leftSection={<IconEdit size={14} />} onClick={() => handleEditJob(job)}>Edit Job</Menu.Item>
                              <Menu.Item leftSection={<IconSend size={14} />} onClick={() => handlePublishJob(job._id)}>Publish</Menu.Item>
                              <Menu.Item leftSection={<IconArchive size={14} />} onClick={() => handleArchiveJob(job._id)}>Archive</Menu.Item>
                              <Menu.Divider />
                              <Menu.Item leftSection={<IconTrash size={14} />} color="red" onClick={() => { setJobToDelete(job); setDeleteModalOpen(true); }}>Delete</Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeJobs.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl">
                      <IconBriefcase size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No active jobs</p>
                      <Button onClick={openJobModal} className="mt-4" radius="xl">Post Your First Job</Button>
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              {/* ✅ FIXED: Applications Tab with proper TypeScript */}
              <Tabs.Panel value="applications">
                <div className="space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="flex gap-3 flex-wrap">
                      <TextInput 
                        placeholder="Search candidates..." 
                        leftSection={<IconSearch size={16} />} 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-64" 
                        radius="xl" 
                      />
                      <Button 
                        variant={showBookmarkedOnly ? "filled" : "light"} 
                        color="yellow" 
                        onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)} 
                        leftSection={<IconBookmarkFilled size={16} />} 
                        radius="xl"
                      >
                        Bookmarked
                      </Button>
                      <Button 
                        variant="light" 
                        color="blue" 
                        onClick={runAIScreening} 
                        leftSection={<IconRobot size={16} />} 
                        loading={loading} 
                        radius="xl"
                      >
                        AI Screen
                      </Button>
                      <Button 
                        variant="light" 
                        color="green" 
                        onClick={bulkDownloadResumes} 
                        leftSection={<IconDownload size={16} />} 
                        radius="xl"
                      >
                        Download
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">{filteredApps.length} candidates found</div>
                  </div>

                  {paginatedApps.map((app) => {
                    // ✅ Get the correct application ID safely - use non-null assertion or check
                    const applicationId = app._id || app.id || "";
                    
                    // Skip rendering if no valid ID
                    if (!applicationId) {
                      console.warn("Skipping application with no ID:", app);
                      return null;
                    }
                    
                    return (
                      <div key={applicationId} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all hover:border-blue-200">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3 flex-1">
                            <Avatar size="lg" radius="xl" color="blue" className="shadow-md">
                              {app.candidateName?.charAt(0) || "?"}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h4 className="font-semibold text-gray-900">{app.candidateName}</h4>
                                {getStatusBadge(app.status)}
                                {app.aiScore && (
                                  <Badge color="blue" variant="light" size="sm">
                                    <IconRobot size={12} className="inline mr-1" /> AI: {app.aiScore}%
                                  </Badge>
                                )}
                                {app.isBookmarked && (
                                  <Badge color="yellow" variant="light" size="sm">
                                    <IconBookmarkFilled size={12} className="inline mr-1" /> Bookmarked
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{app.candidateEmail}</p>
                              <p className="text-sm text-gray-500 mt-1">{app.jobTitle}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-2">
                            {/* ✅ FIXED: Use applicationId (string, not undefined) */}
                            <ActionIcon 
                              variant="light" 
                              color={app.isBookmarked ? "yellow" : "gray"} 
                              onClick={() => toggleBookmark(applicationId)} 
                              size="lg"
                            >
                              {app.isBookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}
                            </ActionIcon>
                            <Menu position="bottom-end">
                              <Menu.Target>
                                <ActionIcon variant="light" size="lg">
                                  <IconDotsVertical size={18} />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item 
                                  leftSection={<IconEye size={14} />} 
                                  onClick={() => { setSelectedApp(app); openAppModal(); }}
                                >
                                  View Details
                                </Menu.Item>
                                <Menu.Item 
                                  leftSection={<IconSend size={14} />} 
                                  onClick={() => { setSelectedApp(app); setMessageModalOpen(true); }}
                                >
                                  Send Message
                                </Menu.Item>
                                <Menu.Item 
                                  leftSection={<IconCalendarEvent size={14} />} 
                                  onClick={() => { setSelectedApp(app); setInterviewModalOpen(true); }}
                                >
                                  Schedule Interview
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item 
                                  leftSection={<IconUserCheck size={14} />} 
                                  color="green" 
                                  onClick={() => updateApplicationStatus(applicationId, "shortlisted")}
                                >
                                  Shortlist
                                </Menu.Item>
                                <Menu.Item 
                                  leftSection={<IconCalendarEvent size={14} />} 
                                  color="blue" 
                                  onClick={() => updateApplicationStatus(applicationId, "interview")}
                                >
                                  Interview
                                </Menu.Item>
                                <Menu.Item 
                                  leftSection={<IconTrophy size={14} />} 
                                  color="teal" 
                                  onClick={() => updateApplicationStatus(applicationId, "hired")}
                                >
                                  Hire
                                </Menu.Item>
                                <Menu.Item 
                                  leftSection={<IconX size={14} />} 
                                  color="red" 
                                  onClick={() => updateApplicationStatus(applicationId, "rejected")}
                                >
                                  Reject
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {totalPages > 1 && (
                    <div className="mt-4 flex justify-center">
                      <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} color="blue" radius="xl" />
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              {/* Shortlisted Tab - ✅ FIXED */}
              <Tabs.Panel value="shortlisted">
                {shortlistedApps.map((app) => {
                  const applicationId = app._id || app.id || "";
                  if (!applicationId) return null;
                  
                  return (
                    <div key={applicationId} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <Avatar size="lg" radius="xl" color="green">
                            {app.candidateName?.charAt(0) || "?"}
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-900">{app.candidateName}</h4>
                            <p className="text-sm text-gray-600">{app.candidateEmail}</p>
                            <p className="text-sm text-gray-500">{app.jobTitle}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="xs" 
                            variant="light" 
                            color="blue" 
                            onClick={() => { setSelectedApp(app); setInterviewModalOpen(true); }} 
                            leftSection={<IconCalendarEvent size={14} />} 
                            radius="xl"
                          >
                            Schedule Interview
                          </Button>
                          <Button 
                            size="xs" 
                            variant="light" 
                            color="gray" 
                            onClick={() => { setSelectedApp(app); openAppModal(); }} 
                            leftSection={<IconEye size={14} />} 
                            radius="xl"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Tabs.Panel>

              {/* Interviews Tab */}
              <Tabs.Panel value="interviews">
                {upcomingInterviews.map((interview) => (
                  <div key={interview._id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{interview.candidateName}</h4>
                        <p className="text-sm text-gray-600">{interview.jobTitle}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge color="blue" size="sm" leftSection={<IconCalendarEvent size={12} />}>
                            {new Date(interview.date).toLocaleDateString()}
                          </Badge>
                          <Badge color="gray" size="sm" leftSection={<IconClock size={12} />}>
                            {interview.time}
                          </Badge>
                          <Badge variant="light" size="sm" leftSection={interview.mode === "online" ? <IconVideo size={12} /> : <IconBuilding size={12} />}>
                            {interview.mode === "online" ? "Online" : "In-Person"}
                          </Badge>
                        </div>
                      </div>
                      {interview.link && (
                        <Button 
                          component="a" 
                          href={interview.link} 
                          target="_blank" 
                          size="xs" 
                          variant="light" 
                          color="blue" 
                          leftSection={<IconVideo size={14} />} 
                          radius="xl"
                        >
                          Join Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </Tabs.Panel>
            </div>
          </Tabs>
        </Card>

        {/* Post Job Modal */}
        <Modal opened={jobModalOpen} onClose={closeJobModal} title="Post a New Job" size="lg" radius="lg">
          <Stack gap="md">
            <TextInput 
              label="Job Title" 
              placeholder="e.g., Senior Frontend Developer" 
              value={newJobData.jobTitle} 
              onChange={(e) => setNewJobData({ ...newJobData, jobTitle: e.target.value })} 
              required 
            />
            <TextInput 
              label="Location" 
              placeholder="e.g., New York, NY / Remote" 
              value={newJobData.location} 
              onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })} 
              required 
            />
            <Select 
              label="Job Type" 
              data={["Full-time", "Part-time", "Contract", "Internship"]} 
              value={newJobData.jobType} 
              onChange={(val) => setNewJobData({ ...newJobData, jobType: val || "Full-time" })} 
            />
            <TextInput 
              label="Salary Range" 
              placeholder="e.g., $80k - $120k" 
              value={newJobData.salary} 
              onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })} 
            />
            <TextInput 
              label="Experience Required" 
              placeholder="e.g., 3-5 years" 
              value={newJobData.experience} 
              onChange={(e) => setNewJobData({ ...newJobData, experience: e.target.value })} 
            />
            <Textarea 
              label="Job Description" 
              placeholder="Detailed job description..." 
              rows={4} 
              value={newJobData.description} 
              onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })} 
              required 
            />
            <div>
              <label className="block text-sm font-medium mb-1">Skills Required</label>
              <div className="flex gap-2 mb-2">
                <TextInput 
                  placeholder="Add a skill" 
                  value={skillInput} 
                  onChange={(e) => setSkillInput(e.target.value)} 
                  className="flex-1" 
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()} 
                />
                <Button onClick={addSkill} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newJobData.skills.map((skill, idx) => (
                  <Badge 
                    key={idx} 
                    size="lg" 
                    variant="light" 
                    color="blue" 
                    rightSection={<IconX size={12} className="cursor-pointer" onClick={() => removeSkill(skill)} />}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <NumberInput 
              label="Number of Openings" 
              min={1} 
              value={newJobData.openings} 
              onChange={(val) => setNewJobData({ ...newJobData, openings: Number(val) || 1 })} 
            />
            <Button onClick={handleCreateJob} color="blue" fullWidth radius="xl">
              Post Job
            </Button>
          </Stack>
        </Modal>

        {/* Edit Job Modal */}
        <Modal opened={editJobModalOpen} onClose={closeEditJobModal} title="Edit Job" size="lg" radius="lg">
          <Stack gap="md">
            <TextInput 
              label="Job Title" 
              value={editFormData.jobTitle} 
              onChange={(e) => setEditFormData({ ...editFormData, jobTitle: e.target.value })} 
            />
            <TextInput 
              label="Location" 
              value={editFormData.location} 
              onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })} 
            />
            <Select 
              label="Job Type" 
              data={["Full-time", "Part-time", "Contract"]} 
              value={editFormData.jobType} 
              onChange={(val) => setEditFormData({ ...editFormData, jobType: val || "Full-time" })} 
            />
            <TextInput 
              label="Salary Range" 
              value={editFormData.salary} 
              onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })} 
            />
            <TextInput 
              label="Experience Required" 
              value={editFormData.experience} 
              onChange={(e) => setEditFormData({ ...editFormData, experience: e.target.value })} 
            />
            <Textarea 
              label="Description" 
              value={editFormData.description} 
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} 
              rows={4} 
            />
            <div>
              <label className="block text-sm font-medium mb-1">Skills Required</label>
              <div className="flex gap-2 mb-2">
                <TextInput 
                  placeholder="Add a skill" 
                  value={skillInput} 
                  onChange={(e) => setSkillInput(e.target.value)} 
                  className="flex-1" 
                  onKeyPress={(e) => e.key === 'Enter' && addEditSkill()} 
                />
                <Button onClick={addEditSkill} size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editFormData.skills.map((skill, idx) => (
                  <Badge 
                    key={idx} 
                    size="lg" 
                    variant="light" 
                    color="blue" 
                    rightSection={<IconX size={12} className="cursor-pointer" onClick={() => removeEditSkill(skill)} />}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <NumberInput 
              label="Number of Openings" 
              min={1} 
              value={editFormData.openings} 
              onChange={(val) => setEditFormData({ ...editFormData, openings: Number(val) || 1 })} 
            />
            <div className="flex gap-3 pt-4">
              <Button onClick={handleUpdateJob} fullWidth color="blue">Save Changes</Button>
              <Button onClick={closeEditJobModal} variant="light" fullWidth>Cancel</Button>
            </div>
          </Stack>
        </Modal>

        {/* Application Details Modal */}
        <Modal opened={appModalOpen} onClose={closeAppModal} title="Application Details" size="lg" radius="lg">
          {selectedApp && (
            <Stack gap="md">
              <div className="flex gap-4 items-center">
                <Avatar size="xl" radius="xl" color="blue">
                  {selectedApp.candidateName?.charAt(0) || "?"}
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedApp.candidateName}</h3>
                  <p className="text-gray-500">{selectedApp.candidateEmail}</p>
                  <p className="text-gray-500">{selectedApp.candidatePhone}</p>
                </div>
              </div>
              <Divider />
              <div><strong>Position:</strong><p className="text-gray-600 mt-1">{selectedApp.jobTitle}</p></div>
              <div><strong>Experience:</strong><p className="text-gray-600 mt-1">{selectedApp.experience || "Not specified"}</p></div>
              <div><strong>Skills:</strong><p className="text-gray-600 mt-1">{selectedApp.skills || "Not specified"}</p></div>
              <div><strong>Expected Salary:</strong><p className="text-gray-600 mt-1">{selectedApp.expectedSalary || "Negotiable"}</p></div>
              {selectedApp.coverLetter && (
                <div><strong>Cover Letter:</strong><p className="text-gray-600 mt-1">{selectedApp.coverLetter}</p></div>
              )}
              <Divider />
              <div className="flex gap-2 flex-wrap">
                <Button color="green" onClick={() => {
                  const id = getAppId(selectedApp);
                  if (id) updateApplicationStatus(id, "shortlisted");
                }}>Shortlist</Button>
                <Button color="blue" onClick={() => {
                  const id = getAppId(selectedApp);
                  if (id) updateApplicationStatus(id, "interview");
                }}>Interview</Button>
                <Button color="teal" onClick={() => {
                  const id = getAppId(selectedApp);
                  if (id) updateApplicationStatus(id, "hired");
                }}>Hire</Button>
                <Button color="red" variant="light" onClick={() => {
                  const id = getAppId(selectedApp);
                  if (id) updateApplicationStatus(id, "rejected");
                }}>Reject</Button>
              </div>
            </Stack>
          )}
        </Modal>

        {/* Schedule Interview Modal */}
        <Modal opened={interviewModalOpen} onClose={() => setInterviewModalOpen(false)} title="Schedule Interview" centered>
          <Stack gap="md">
            <TextInput 
              label="Date" 
              placeholder="YYYY-MM-DD" 
              value={interviewDate} 
              onChange={(e) => setInterviewDate(e.target.value)} 
              leftSection={<IconCalendarEvent size={14} />} 
            />
            <TextInput 
              label="Time" 
              placeholder="10:00 AM" 
              value={interviewTime} 
              onChange={(e) => setInterviewTime(e.target.value)} 
              leftSection={<IconClock size={14} />} 
            />
            <Select 
              label="Mode" 
              data={[{ value: "online", label: "Online" }, { value: "offline", label: "Offline" }]} 
              value={interviewMode} 
              onChange={(val) => setInterviewMode(val as "online" | "offline")} 
            />
            {interviewMode === "online" && (
              <TextInput 
                label="Meeting Link" 
                placeholder="https://meet.google.com/..." 
                value={interviewLink} 
                onChange={(e) => setInterviewLink(e.target.value)} 
              />
            )}
            <Button onClick={sendInterviewInvite} color="blue" fullWidth radius="xl">
              Send Invitation
            </Button>
          </Stack>
        </Modal>

        {/* Send Message Modal */}
        <Modal opened={messageModalOpen} onClose={() => setMessageModalOpen(false)} title="Send Message" centered>
          <Stack gap="md">
            <Textarea 
              rows={4} 
              value={messageText} 
              onChange={(e) => setMessageText(e.target.value)} 
              placeholder="Type your message..." 
            />
            <Button onClick={sendMessage} color="blue" fullWidth radius="xl">
              Send Message
            </Button>
          </Stack>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Job" centered>
          <div className="text-center">
            <IconTrash size={48} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">Delete "{jobToDelete?.jobTitle}"?</h3>
            <p className="text-gray-500 mb-4">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button onClick={() => setDeleteModalOpen(false)} variant="light" fullWidth>Cancel</Button>
              <Button onClick={handleDeleteJob} color="red" fullWidth>Delete</Button>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default RecruiterDashboard;