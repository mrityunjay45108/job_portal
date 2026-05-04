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
  LoadingOverlay,
  Textarea,
  FileInput,
  Notification,
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
    } catch (error) {
      console.error("Error loading job:", error);
      notifications.show({
        title: "Error",
        message: "Failed to load job details",
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

    setApplying(true);
    try {
      const formData = new FormData();
      formData.append("jobId", id!);
      formData.append("coverLetter", coverLetter);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

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
        navigate("/candidate-dashboard");
      }
    } catch (error: any) {
      console.error("Error applying:", error);
      notifications.show({
        title: "Application Failed",
        message:
          error.response?.data?.message || "Failed to submit application",
        color: "red",
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <Container size="xl" className="py-10">
        <LoadingOverlay visible={true} />
      </Container>
    );
  }

  if (!job) {
    return (
      <Container size="xl" className="py-10">
        <Alert color="red">Job not found</Alert>
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
          className="mb-4"
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
                  <Avatar size={60} radius="xl" color="blue">
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
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <Text size="xs" className="text-blue-600">
                      Salary
                    </Text>
                    <Text fw={600} className="text-gray-900">
                      {job.salary}
                    </Text>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <Text size="xs" className="text-green-600">
                      Job Type
                    </Text>
                    <Text fw={600} className="text-gray-900">
                      {job.jobType}
                    </Text>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <Text size="xs" className="text-orange-600">
                      Experience
                    </Text>
                    <Text fw={600} className="text-gray-900">
                      {job.experience}
                    </Text>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <Text size="xs" className="text-purple-600">
                      Applicants
                    </Text>
                    <Text fw={600} className="text-gray-900">
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
                          className="bg-blue-50 text-blue-700"
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
              <Text size="sm" className="text-gray-500 mb-4">
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
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
