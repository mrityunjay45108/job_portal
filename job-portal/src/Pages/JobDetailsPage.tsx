// src/Pages/JobDetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Text,
  Button,
  Badge,
  Divider,
  Group,
  Stack,
  Avatar,
  Title,
  Grid,
  Alert,
  Textarea,
  FileInput,
  Skeleton,
  Card,
  Progress,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import {
  IconBriefcase,
  IconMapPin,
  IconClock,
  IconUsers,
  IconBuilding,
  IconMail,
  IconPhone,
  IconWorld,
  IconCheck,
  IconArrowLeft,
  IconFileText,
  IconSend,
  IconBrain,
  IconMicrophone,
  IconArrowRight,
  IconDeviceLaptop,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface Job {
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
  companyId: string;
  companyEmail?: string;
  companyWebsite?: string;
  companyDescription?: string;
}

// Skeleton Loader Component
const JobDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Container size="xl" className="py-8">
        {/* Back Button Skeleton */}
        <Skeleton height={36} width={120} radius="md" mb={20} />
        
        <Grid gutter="xl">
          {/* Main Content Skeleton */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Paper className="bg-white rounded-2xl shadow-md p-6">
              {/* Header Skeleton */}
              <div className="flex items-center gap-3 mb-6">
                <Skeleton circle height={60} width={60} />
                <div className="flex-1">
                  <Skeleton height={28} width={250} radius="md" />
                  <div className="flex gap-3 mt-2">
                    <Skeleton height={16} width={120} radius="md" />
                    <Skeleton height={16} width={100} radius="md" />
                    <Skeleton height={16} width={80} radius="md" />
                  </div>
                </div>
              </div>
              
              <Divider />
              
              {/* Stats Skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton height={14} width={50} className="mx-auto" radius="md" />
                    <Skeleton height={20} width={80} className="mx-auto mt-1" radius="md" />
                  </div>
                ))}
              </div>
              
              <Divider />
              
              {/* Description Skeleton */}
              <div className="mt-6">
                <Skeleton height={20} width={150} radius="md" mb={10} />
                <Skeleton height={16} width="100%" radius="md" />
                <Skeleton height={16} width="95%" mt={5} radius="md" />
                <Skeleton height={16} width="90%" mt={5} radius="md" />
                <Skeleton height={16} width="85%" mt={5} radius="md" />
              </div>
              
              {/* Skills Skeleton */}
              <div className="mt-6">
                <Skeleton height={20} width={120} radius="md" mb={10} />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={30} width={80} radius="xl" />
                  ))}
                </div>
              </div>
            </Paper>
          </Grid.Col>

          {/* Sidebar Skeleton */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            {/* About Company Skeleton */}
            <Paper className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <Skeleton height={20} width={140} radius="md" mb={15} />
              <Skeleton height={18} width={180} radius="md" mb={5} />
              <Skeleton height={14} width="100%" radius="md" />
              <Skeleton height={14} width="90%" radius="md" mt={5} />
              <Divider className="my-3" />
              <Skeleton height={14} width={200} radius="md" />
            </Paper>

            {/* AI Card Skeleton */}
            <Paper className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton circle height={28} width={28} />
                <Skeleton height={20} width={150} radius="md" />
              </div>
              <Skeleton height={14} width="100%" radius="md" />
              <Skeleton height={14} width="80%" radius="md" mt={5} />
              <Skeleton height={40} width="100%" radius="xl" mt={15} />
            </Paper>

            {/* Application Form Skeleton */}
            <Paper className="bg-white rounded-2xl shadow-md p-6">
              <Skeleton height={20} width={180} radius="md" mb={15} />
              <Skeleton height={60} width="100%" radius="md" mb={10} />
              <Skeleton height={80} width="100%" radius="md" mb={10} />
              <Skeleton height={40} width="100%" radius="xl" />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [showAICard, setShowAICard] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      notifications.show({
        title: "Login Required",
        message: "Please login to view job details",
        color: "orange",
      });
      navigate("/login", { state: { from: `/job/${id}` } });
      return;
    }
    loadJobDetails();
    checkApplicationStatus();
  }, [id, isAuthenticated]);

  const loadJobDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/jobs/${id}`);
      if (response.data.success) {
        setJob(response.data.job);
      } else {
        notifications.show({
          title: "Error",
          message: "Job not found",
          color: "red",
        });
        navigate("/find-jobs");
      }
    } catch (error: any) {
      console.error("Error loading job:", error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.message || "Failed to load job details",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const response = await api.get("/applications/my-applications");
      if (response.data.success) {
        const applied = response.data.applications.some(
          (app: any) => app.jobId === id,
        );
        setHasApplied(applied);
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      notifications.show({
        title: "Login Required",
        message: "Please login to apply for this job",
        color: "orange",
      });
      navigate("/login", { state: { from: `/job/${id}` } });
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

    if (!coverLetter) {
      notifications.show({
        title: "Missing Information",
        message: "Please provide a cover letter",
        color: "yellow",
      });
      return;
    }

    setApplying(true);
    try {
      const response = await api.post("/applications/apply", {
        jobId: id,
        coverLetter: coverLetter,
        experience: "",
        skills: "",
        expectedSalary: "",
        noticePeriod: "",
      });

      if (response.data.success) {
        notifications.show({
          title: "Application Submitted! 🎉",
          message: "Your application has been sent successfully",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        setHasApplied(true);
        setTimeout(() => {
          navigate("/candidate-dashboard");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error applying:", error);
      notifications.show({
        title: "Application Failed",
        message: error.response?.data?.message || "Failed to submit application",
        color: "red",
      });
    } finally {
      setApplying(false);
    }
  };

  const handleAIInterview = () => {
    navigate(`/ai-interview/${id}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Show skeleton while loading
  if (loading) {
    return <JobDetailsSkeleton />;
  }

  if (!job) {
    return (
      <Container size="xl" className="py-10 text-center">
        <Alert color="red" title="Job Not Found">
          The job you're looking for doesn't exist or has been removed.
        </Alert>
        <Button onClick={() => navigate("/find-jobs")} className="mt-4">
          Back to Jobs
        </Button>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Container size="xl" className="py-8">
        {/* Back Button */}
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate("/find-jobs")}
          className="mb-4 hover:bg-gray-100"
        >
          Back to Jobs
        </Button>

        <Grid gutter="xl">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <Paper className="bg-white rounded-2xl shadow-md p-6 mb-6">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar size={60} radius="xl" color="blue" className="shadow-md">
                    {job.companyName?.[0] || "J"}
                  </Avatar>
                  <div>
                    <Title order={2} className="text-gray-900">
                      {job.jobTitle}
                    </Title>
                    <Group gap="sm" mt={4}>
                      <Text size="sm" className="text-gray-500">
                        <IconBuilding size={14} className="inline mr-1" />
                        {job.companyName}
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        <IconMapPin size={14} className="inline mr-1" />
                        {job.location}
                      </Text>
                      <Text size="sm" className="text-gray-500">
                        <IconClock size={14} className="inline mr-1" />
                        Posted {job.postedDate}
                      </Text>
                    </Group>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Job Details */}
              <div className="py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-3 text-center hover:shadow-md transition">
                    <Text size="xs" className="text-blue-600 uppercase tracking-wide">
                      Salary
                    </Text>
                    <Text fw={700} className="text-gray-900">
                      {job.salary}
                    </Text>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center hover:shadow-md transition">
                    <Text size="xs" className="text-green-600 uppercase tracking-wide">
                      Job Type
                    </Text>
                    <Text fw={700} className="text-gray-900">
                      {job.jobType}
                    </Text>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center hover:shadow-md transition">
                    <Text size="xs" className="text-orange-600 uppercase tracking-wide">
                      Experience
                    </Text>
                    <Text fw={700} className="text-gray-900">
                      {job.experience}
                    </Text>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center hover:shadow-md transition">
                    <Text size="xs" className="text-purple-600 uppercase tracking-wide">
                      Applicants
                    </Text>
                    <Text fw={700} className="text-gray-900">
                      {job.applicantsCount}
                    </Text>
                  </div>
                </div>

                <Divider />

                {/* Job Description */}
                <div className="mt-6">
                  <Title order={4} className="text-gray-900 mb-3">
                    Job Description
                  </Title>
                  <Text className="text-gray-600 leading-relaxed">
                    {job.description}
                  </Text>
                </div>

                {/* Skills Required */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mt-6">
                    <Title order={4} className="text-gray-900 mb-3">
                      Skills Required
                    </Title>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          size="lg"
                          variant="light"
                          color="blue"
                          className="bg-blue-50 text-blue-700 px-3 py-1.5"
                          radius="xl"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </Grid.Col>

          {/* Sidebar - About Company & Apply */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            {/* About Company */}
            <Paper className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <Title
                order={4}
                className="text-gray-900 mb-4 flex items-center gap-2"
              >
                <IconBuilding size={18} />
                About Company
              </Title>
              <Text fw={600} className="text-gray-900 mb-2">
                {job.companyName}
              </Text>
              <Text size="sm" className="text-gray-500 mb-4 leading-relaxed">
                {job.companyDescription ||
                  "Leading company in the industry, known for innovation and excellence."}
              </Text>
              <Divider className="my-3" />
              <div className="space-y-2">
                {job.companyEmail && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconMail size={14} />
                    <span>{job.companyEmail}</span>
                  </div>
                )}
                {job.companyWebsite && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IconWorld size={14} />
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {job.companyWebsite}
                    </a>
                  </div>
                )}
              </div>
            </Paper>

            {/* AI Interview Practice Card */}
            {showAICard && (
              <Paper className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconBrain size={28} />
                    <Title order={4} className="text-white">
                      AI Interview Practice
                    </Title>
                  </div>
                  <Tooltip label="Back to Company Info">
                    <ActionIcon
                      variant="white"
                      size="md"
                      radius="xl"
                      onClick={handleGoBack}
                      className="bg-white/20 hover:bg-white/30 transition"
                    >
                      <IconArrowLeft size={18} />
                    </ActionIcon>
                  </Tooltip>
                </div>
                <Text size="sm" className="text-indigo-100 mb-4 leading-relaxed">
                  Practice with our AI interviewer and get real-time feedback on
                  your answers before the real interview.
                </Text>
                <Button
                  onClick={handleAIInterview}
                  fullWidth
                  variant="white"
                  color="indigo"
                  leftSection={<IconMicrophone size={18} />}
                  className="text-indigo-600 font-semibold hover:shadow-md transition"
                >
                  Start AI Practice Interview
                </Button>
              </Paper>
            )}

            {/* Application Form */}
            <Paper className="bg-white rounded-2xl shadow-md p-6">
              <Title
                order={4}
                className="text-gray-900 mb-4 flex items-center gap-2"
              >
                <IconSend size={18} />
                Apply for this position
              </Title>

              {hasApplied ? (
                <Alert
                  color="green"
                  icon={<IconCheck size={16} />}
                  className="mb-4"
                >
                  You have already applied for this position!
                </Alert>
              ) : (
                <>
                  <Text size="sm" className="text-gray-500 mb-4">
                    Fill out the form below to apply for this position.
                  </Text>

                  <FileInput
                    label="Resume/CV"
                    placeholder="Upload your resume"
                    accept="application/pdf"
                    leftSection={<IconFileText size={16} />}
                    value={resumeFile}
                    onChange={setResumeFile}
                    className="mb-4"
                    required
                  />

                  <Textarea
                    label="Cover Letter"
                    placeholder="Why are you interested in this position? Tell us about your relevant experience..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    minRows={4}
                    className="mb-4"
                  />

                  <Button
                    fullWidth
                    size="lg"
                    radius="xl"
                    loading={applying}
                    onClick={handleApply}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition"
                    disabled={!coverLetter}
                  >
                    Submit Application
                  </Button>
                </>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default JobDetailsPage;



