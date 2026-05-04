// src/Pages/ApplyPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  TextInput,
  Textarea,
  FileInput,
  Select,
  Group,
  Stack,
  Divider,
  Alert,
  Loader,
  Card,
  Badge,
  Grid,
  Progress,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBriefcase,
  IconMapPin,
  IconCurrencyDollar,
  IconClock,
  IconCheck,
  IconFileText,
  IconSend,
  IconArrowLeft,
  IconAlertCircle,
} from "@tabler/icons-react";
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
}

const ApplyPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Form state
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState<string | null>(null);

  // Safely get user phone number (handles different field names)
  const getUserPhone = () => {
    if (!user) return "";
    return (user as any).phoneNumber || (user as any).phone || (user as any).mobile || "";
  };

  // Safely get user full name
  const getUserName = () => {
    if (!user) return "User";
    return (user as any).fullName || (user as any).name || "User";
  };

  // Safely get user email
  const getUserEmail = () => {
    if (!user) return "";
    return (user as any).email || "";
  };

  useEffect(() => {
    if (!isAuthenticated) {
      notifications.show({
        title: "Login Required",
        message: "Please login to apply for this job",
        color: "orange",
        icon: <IconAlertCircle size={16} />,
      });
      navigate("/login", { state: { from: `/apply/${jobId}` } });
      return;
    }
    
    if (user?.role !== "candidate") {
      notifications.show({
        title: "Access Denied",
        message: "Only candidates can apply for jobs",
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
      navigate("/");
      return;
    }
    
    loadJobDetails();
    checkApplicationStatus();
  }, [jobId, isAuthenticated, user]);

  const loadJobDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${jobId}`);
      if (response.data.success && response.data.job) {
        setJob(response.data.job);
      } else {
        setError("Job not found");
      }
    } catch (error: any) {
      console.error("Error loading job:", error);
      setError(error.response?.data?.message || "Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = async () => {
    try {
      const response = await api.get('/applications/my-applications');
      if (response.data.success) {
        const applied = response.data.applications.some(
          (app: any) => app.jobId === jobId
        );
        setHasApplied(applied);
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  const uploadResumeToCloudinary = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("resume", file);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      });
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.open("POST", `${api.defaults.baseURL}/upload/resume`);
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coverLetter) {
      notifications.show({
        title: "Missing Information",
        message: "Please provide a cover letter",
        color: "yellow",
        icon: <IconAlertCircle size={16} />,
      });
      return;
    }
    
    setSubmitting(true);
    setUploadProgress(0);
    
    try {
      let resumeData = { url: "", name: "", publicId: "" };
      
      if (resumeFile) {
        const uploadResponse = await uploadResumeToCloudinary(resumeFile);
        if (uploadResponse.success) {
          resumeData = {
            url: uploadResponse.url,
            name: uploadResponse.fileName,
            publicId: uploadResponse.publicId
          };
        }
      }
      
      const applicationData = {
        jobId,
        coverLetter,
        experience,
        skills,
        expectedSalary,
        noticePeriod,
        resumeUrl: resumeData.url,
        resumeName: resumeData.name,
        resumePublicId: resumeData.publicId,
      };
      
      const response = await api.post('/applications/apply', applicationData);
      
      if (response.data.success) {
        notifications.show({
          title: "Application Submitted! 🎉",
          message: "Your application has been sent successfully",
          color: "green",
          icon: <IconCheck size={16} />,
        });
        
        setTimeout(() => {
          navigate("/candidate-dashboard");
        }, 1500);
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }
    } catch (error: any) {
      console.error("Error submitting application:", error);
      notifications.show({
        title: "Application Failed",
        message: error.response?.data?.message || error.message || "Failed to submit application",
        color: "red",
        icon: <IconAlertCircle size={16} />,
      });
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <Container className="py-20 text-center">
        <Loader size="lg" />
        <Text className="mt-4">Loading job details...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" className="py-20">
        <Alert color="red" title="Error" icon={<IconAlertCircle size={16} />}>
          {error}
        </Alert>
        <Button className="mt-6" variant="light" onClick={() => navigate("/find-jobs")}>
          Back to Jobs
        </Button>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container size="md" className="py-20">
        <Alert color="red" title="Job Not Found" icon={<IconAlertCircle size={16} />}>
          The job you're looking for doesn't exist or has been removed.
        </Alert>
        <Button className="mt-6" variant="light" onClick={() => navigate("/find-jobs")}>
          Browse Jobs
        </Button>
      </Container>
    );
  }

  if (hasApplied) {
    return (
      <Container size="md" className="py-20">
        <Alert color="green" title="Already Applied!" icon={<IconCheck size={16} />}>
          You have already applied for this position. The recruiter will review your application and get back to you soon.
        </Alert>
        <div className="mt-6 flex gap-3">
          <Button variant="light" onClick={() => navigate("/candidate-dashboard")}>
            View My Applications
          </Button>
          <Button variant="light" onClick={() => navigate("/find-jobs")}>
            Browse More Jobs
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <Container size="lg">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate("/find-jobs")}
          className="mb-4"
        >
          Back to Jobs
        </Button>
        
        <Grid gutter="xl">
          {/* Job Details Section */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card className="sticky top-4" shadow="sm" radius="lg" p="lg" withBorder>
              <div className="mb-4">
                <Badge color="blue" size="lg" variant="light">
                  {job.jobType || "Full-time"}
                </Badge>
                <Title order={2} className="mt-3 mb-2">{job.jobTitle}</Title>
                <Text size="lg" fw={500} className="text-gray-700">{job.companyName}</Text>
              </div>
              
              <Divider />
              
              <Stack gap="md" className="mt-4">
                <Group gap="sm">
                  <IconMapPin size={18} className="text-gray-400" />
                  <Text size="sm">{job.location || "Remote"}</Text>
                </Group>
                <Group gap="sm">
                  <IconCurrencyDollar size={18} className="text-gray-400" />
                  <Text size="sm">{job.salary || "Negotiable"}</Text>
                </Group>
                <Group gap="sm">
                  <IconClock size={18} className="text-gray-400" />
                  <Text size="sm">{job.experience || "Not specified"}</Text>
                </Group>
              </Stack>
              
              <Divider className="my-4" />
              
              {job.skills && job.skills.length > 0 && (
                <>
                  <Text fw={600} className="mb-2">Required Skills</Text>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="light" color="blue">{skill}</Badge>
                    ))}
                  </div>
                  <Divider className="my-4" />
                </>
              )}
              
              <div>
                <Text fw={600} className="mb-2">About the Role</Text>
                <Text size="sm" className="text-gray-600 line-clamp-6">{job.description}</Text>
              </div>
            </Card>
          </Grid.Col>
          
          {/* Application Form Section */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper shadow="sm" radius="lg" p="xl" className="bg-white" withBorder>
              <Title order={2} className="mb-2">Application Form</Title>
              <Text className="text-gray-500 mb-6">Fill out the form below to apply for this position</Text>
              
              <form onSubmit={handleSubmit}>
                <Stack gap="lg">
                  {/* Personal Info Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Text fw={600} className="mb-2">Applying as:</Text>
                    <Text>{getUserName()}</Text>
                    <Text size="sm" className="text-gray-500">{getUserEmail()}</Text>
                    <Text size="sm" className="text-gray-500">
                      {getUserPhone() || "Not provided"}
                    </Text>
                  </div>
                  
                  {/* Experience */}
                  <TextInput
                    label="Years of Experience"
                    placeholder="e.g., 3-5 years"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  
                  {/* Skills */}
                  <TextInput
                    label="Key Skills"
                    placeholder="e.g., React, Node.js, Python (comma separated)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  
                  {/* Expected Salary */}
                  <TextInput
                    label="Expected Salary"
                    placeholder="e.g., $80,000 - $100,000"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                  />
                  
                  {/* Notice Period */}
                  <Select
                    label="Notice Period"
                    placeholder="Select notice period"
                    data={["Immediate", "15 days", "30 days", "45 days", "60 days", "90 days"]}
                    value={noticePeriod}
                    onChange={setNoticePeriod}
                    clearable
                  />
                  
                  {/* Resume Upload with Progress */}
                  <div>
                    <FileInput
                      label="Resume/CV"
                      placeholder="Upload your resume (PDF, DOC)"
                      accept=".pdf,.doc,.docx"
                      leftSection={<IconFileText size={16} />}
                      value={resumeFile}
                      onChange={setResumeFile}
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2">
                        <Progress value={uploadProgress} size="sm" color="blue" />
                        <Text size="xs" className="mt-1 text-gray-500">Uploading: {uploadProgress}%</Text>
                      </div>
                    )}
                    <Text size="xs" className="text-gray-400 mt-1">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </Text>
                  </div>
                  
                  {/* Cover Letter */}
                  <Textarea
                    label="Cover Letter *"
                    placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                    minRows={5}
                    required
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    loading={submitting}
                    fullWidth
                    size="lg"
                    radius="xl"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    leftSection={<IconSend size={18} />}
                  >
                    Submit Application
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default ApplyPage;