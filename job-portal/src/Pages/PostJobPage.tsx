import { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  Group,
  Divider,
  Text,
  Paper,
  Select,
  MultiSelect,
  SimpleGrid,
  Stack,
  Title,
  Card,
  Badge,
  Box,
  Progress,
  Stepper,
  Switch,
  NumberInput,
  Container,
  ThemeIcon,
  Grid,
  Alert,
} from "@mantine/core";
import {
  IconSend,
  IconBriefcase,
  IconCurrencyDollar,
  IconMapPin,
  IconCertificate,
  IconAlignLeft,
  IconCheck,
  IconDeviceLaptop,
  IconBuilding,
  IconArrowRight,
  IconEye,
  IconBulb,
  IconList,
  IconTrophy,
  IconUsers,
  IconFileDescription,
  IconBrowserCheck,
  IconRocket,
  IconStar,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

interface JobFormValues {
  title: string;
  company: string;
  companyWebsite: string;
  jobType: string;
  location: string;
  locationType: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: string;
  skills: string[];
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  remotePolicy: string;
  urgentHiring: boolean;
  featuredJob: boolean;
}

const PostJobPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const form = useForm<JobFormValues>({
    initialValues: {
      title: "",
      company: "",
      companyWebsite: "",
      jobType: "",
      location: "",
      locationType: "On-site",
      experience: "",
      salaryMin: 50000,
      salaryMax: 80000,
      salaryType: "yearly",
      skills: [],
      overview: "",
      responsibilities: [],
      qualifications: [],
      benefits: [],
      remotePolicy: "",
      urgentHiring: false,
      featuredJob: false,
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Job title must be at least 5 characters" : null,
      company: (value) => (!value ? "Company name is required" : null),
      jobType: (value) => (!value ? "Job type is required" : null),
      location: (value) => (!value ? "Location is required" : null),
      overview: (value) =>
        value.length < 50
          ? "Please provide a detailed overview (minimum 50 characters)"
          : null,
      salaryMin: (value) => (value <= 0 ? "Minimum salary is required" : null),
      salaryMax: (value, values) =>
        value <= values.salaryMin
          ? "Maximum salary must be greater than minimum"
          : null,
      skills: (value) =>
        value.length === 0 ? "Please select at least one skill" : null,
    },
  });

  const commonSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Vue.js",
    "Angular",
    "C#",
    "PHP",
    "Ruby on Rails",
    "Swift",
    "Kotlin",
    "Flutter",
    "React Native",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "Machine Learning",
    "AI",
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
  ];
  const locationTypes = ["On-site", "Remote", "Hybrid"];
  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6-9 years)",
    "Lead/Manager (10+ years)",
  ];
  const salaryTypes = [
    { value: "yearly", label: "Per Year (Annual)" },
    { value: "monthly", label: "Per Month" },
    { value: "hourly", label: "Per Hour" },
  ];

  const responsibilityExamples = [
    "Lead development of new features and products",
    "Collaborate with cross-functional teams including product and design",
    "Write clean, maintainable, and efficient code",
    "Mentor junior developers and conduct code reviews",
    "Participate in architectural decisions and technical planning",
    "Troubleshoot and debug production issues",
    "Write unit and integration tests",
    "Document technical specifications",
  ];

  const qualificationExamples = [
    "5+ years of experience in software development",
    "Strong proficiency in React and TypeScript",
    "Bachelor's degree in Computer Science or related field",
    "Excellent problem-solving and analytical skills",
    "Strong communication and teamwork abilities",
    "Experience with cloud platforms (AWS, GCP, Azure)",
    "Knowledge of Agile development methodologies",
  ];

  const benefitExamples = [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "401(k) retirement plan with company matching",
    "Flexible work hours and remote options",
    "Professional development budget",
    "Generous paid time off and parental leave",
    "Home office stipend",
    "Gym membership reimbursement",
  ];

  const calculateProgress = () => {
    const sections = [
      form.values.title,
      form.values.company,
      form.values.jobType,
      form.values.location,
      form.values.skills.length > 0,
      form.values.overview.length > 50,
      form.values.responsibilities.length > 0,
      form.values.qualifications.length > 0,
      form.values.salaryMin > 0,
    ];
    const completed = sections.filter(Boolean).length;
    return Math.floor((completed / sections.length) * 100);
  };

  const nextStep = () => {
    if (activeStep === 0) {
      if (
        !form.values.title ||
        !form.values.company ||
        !form.values.jobType ||
        !form.values.location
      ) {
        notifications.show({
          title: "Information Missing",
          message:
            "Please fill in all required fields: Job Title, Company, Job Type, and Location",
          color: "yellow",
        });
        return;
      }
    }
    if (activeStep === 1) {
      if (
        !form.values.overview ||
        !form.values.responsibilities.length ||
        !form.values.skills.length
      ) {
        notifications.show({
          title: "Information Missing",
          message:
            "Please provide job overview, responsibilities, and required skills",
          color: "yellow",
        });
        return;
      }
    }
    if (activeStep === 2) {
      if (!form.values.qualifications.length) {
        notifications.show({
          title: "Information Missing",
          message: "Please add at least one qualification",
          color: "yellow",
        });
        return;
      }
    }
    setActiveStep((current) => current + 1);
  };

  const prevStep = () => setActiveStep((current) => current - 1);

  const handleSubmit = async (values: JobFormValues) => {
    // Prevent duplicate submissions
    if (isSubmitting || submitting) {
      console.log("Already submitting, skipping duplicate request");
      return;
    }

    // Validate company name
    if (!values.company) {
      notifications.show({
        title: "Missing Information",
        message: "Company name is required",
        color: "red",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitting(true);

    try {
      const salaryDisplay = `$${values.salaryMin.toLocaleString()} - $${values.salaryMax.toLocaleString()} / ${values.salaryType}`;

      const jobData = {
        jobTitle: values.title,
        companyName: values.company, // This maps company name correctly
        location: values.location,
        salary: salaryDisplay,
        jobType: values.jobType,
        experience: values.experience,
        description: values.overview,
        skills: values.skills,
        status: "active",
        urgentHiring: values.urgentHiring,
      };

      console.log(" Sending job data:", jobData);

      const response = await api.post("/jobs", jobData);

      if (response.data.success) {
        notifications.show({
          title: "🎉 Success! Job Posted",
          message: `"${values.title}" at ${values.company} is now live and visible to candidates`,
          color: "green",
          icon: <IconCheck size={18} />,
        });

        navigate("/Recruiter-Dashboard");
      } else {
        throw new Error(response.data.message || "Failed to post job");
      }
    } catch (error: any) {
      console.error("Error posting job:", error);
      notifications.show({
        title: "Error",
        message:
          error.response?.data?.message ||
          "Failed to post job. Please try again.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (activeStep) {
      case 0:
        return "Let's start with the basics";
      case 1:
        return "Describe the opportunity";
      case 2:
        return "Set your requirements";
      default:
        return "Review and publish";
    }
  };

  const getStepDescription = () => {
    switch (activeStep) {
      case 0:
        return "Tell us about the position and your company";
      case 1:
        return "Provide details about the role and required skills";
      case 2:
        return "List qualifications, benefits, and work policies";
      default:
        return "Double-check everything before posting";
    }
  };

  // Authentication check after all hooks
  if (!isAuthenticated) {
    return (
      <Container size="xl" className="py-20">
        <Alert color="red" title="Login Required" className="max-w-md mx-auto">
          Please login to post a job.
        </Alert>
      </Container>
    );
  }

  if (user?.role !== "recruiter") {
    return (
      <Container size="xl" className="py-20">
        <Alert color="red" title="Access Denied" className="max-w-md mx-auto">
          Only recruiters can post jobs.
        </Alert>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <Container size="xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <IconBriefcase size={24} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          </div>
          <p className="text-gray-500">
            Fill out the form below to create a new job posting
          </p>
        </div>

        <Paper className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-8 py-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                    <IconRocket size={24} className="text-white" />
                  </div>
                  <Badge
                    size="lg"
                    variant="white"
                    color="blue"
                    className="bg-white/20 text-white border-0"
                  >
                    <div className="flex items-center gap-2">
                      <IconEye size={14} />
                      <span>Post a Job</span>
                    </div>
                  </Badge>
                </div>

                <Title order={2} className="text-3xl font-bold text-white mb-2">
                  Create a New Job Posting
                </Title>
                <Text className="text-blue-100 max-w-2xl">
                  Reach thousands of qualified candidates. Fill in the details
                  below to create an impactful job posting that attracts top
                  talent.
                </Text>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {calculateProgress()}%
                    </div>
                    <Text size="xs" className="text-blue-100">
                      Completion
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Section */}
          <div className="border-b border-gray-200 bg-gray-50/50 px-8 pt-6">
            <div className="mb-2">
              <Text
                size="sm"
                className="text-blue-600 font-semibold uppercase tracking-wide"
              >
                Step {activeStep + 1} of 4
              </Text>
              <Title order={3} className="text-xl font-bold text-gray-900 mt-1">
                {getStepTitle()}
              </Title>
              <Text size="sm" className="text-gray-500 mt-1">
                {getStepDescription()}
              </Text>
            </div>

            <Stepper active={activeStep} color="blue" className="mt-6 mb-4">
              <Stepper.Step
                label="Company & Role"
                description="Basic Information"
              />
              <Stepper.Step
                label="Job Details"
                description="Description & Skills"
              />
              <Stepper.Step label="Requirements" description="Qualifications" />
              <Stepper.Step label="Review" description="Final Check" />
            </Stepper>
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="p-8">
              {/* Step 1: Basic Information */}
              {activeStep === 0 && (
                <Stack gap="xl">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconBulb size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <Text fw={700} size="md" className="text-gray-900 mb-1">
                          Pro Tip: Write an Effective Job Title
                        </Text>
                        <Text size="sm" className="text-gray-600">
                          Use specific job titles like "Senior Frontend
                          Developer" instead of generic ones like "Developer" to
                          attract the right candidates. Include key technologies
                          or seniority levels.
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconBriefcase size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Position Details
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Tell candidates about the role they're applying for
                        </Text>
                      </div>
                    </div>

                    <Grid gutter="lg">
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Job Title *"
                          description="Be specific to attract qualified candidates"
                          placeholder="e.g., Senior Frontend Developer"
                          size="md"
                          radius="md"
                          required
                          {...form.getInputProps("title")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                          label="Employment Type *"
                          description="Select the work arrangement"
                          placeholder="Select job type"
                          data={jobTypes}
                          size="md"
                          radius="md"
                          required
                          {...form.getInputProps("jobType")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                          label="Experience Required"
                          description="Years of experience needed"
                          placeholder="Select experience level"
                          data={experienceLevels}
                          size="md"
                          radius="md"
                          {...form.getInputProps("experience")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                          label="Work Location Type *"
                          description="Where will the candidate work?"
                          placeholder="Select work arrangement"
                          data={locationTypes}
                          size="md"
                          radius="md"
                          required
                          {...form.getInputProps("locationType")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Location *"
                          description="City, state, or 'Remote'"
                          placeholder="e.g., New York, NY or Remote"
                          size="md"
                          radius="md"
                          required
                          {...form.getInputProps("location")}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <Text
                            size="sm"
                            fw={600}
                            className="text-gray-700 mb-3"
                          >
                            Salary Range *
                          </Text>
                          <div className="flex flex-wrap gap-3">
                            <NumberInput
                              label="Minimum"
                              placeholder="50,000"
                              min={0}
                              step={5000}
                              size="md"
                              radius="md"
                              className="flex-1"
                              required
                              {...form.getInputProps("salaryMin")}
                            />
                            <NumberInput
                              label="Maximum"
                              placeholder="80,000"
                              min={0}
                              step={5000}
                              size="md"
                              radius="md"
                              className="flex-1"
                              required
                              {...form.getInputProps("salaryMax")}
                            />
                            <Select
                              label="Frequency"
                              data={salaryTypes}
                              size="md"
                              radius="md"
                              className="w-36"
                              {...form.getInputProps("salaryType")}
                            />
                          </div>
                        </div>
                      </Grid.Col>
                    </Grid>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconBuilding size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Company Profile
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Help candidates learn about your organization
                        </Text>
                      </div>
                    </div>

                    <Grid gutter="lg">
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Company Name *"
                          description="Your organization's legal name"
                          placeholder="e.g., Google, Microsoft"
                          size="md"
                          radius="md"
                          required
                          {...form.getInputProps("company")}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label="Company Website"
                          description="Official company website URL"
                          placeholder="https://example.com"
                          size="md"
                          radius="md"
                          {...form.getInputProps("companyWebsite")}
                        />
                      </Grid.Col>
                    </Grid>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <Text fw={600} className="text-gray-900 mb-3">
                      Priority Settings
                    </Text>
                    <div className="flex flex-wrap gap-6">
                      <Switch
                        label="Urgent Hiring"
                        description="Mark as urgently hiring for priority visibility"
                        checked={form.values.urgentHiring}
                        onChange={(e) =>
                          form.setFieldValue(
                            "urgentHiring",
                            e.currentTarget.checked,
                          )
                        }
                        size="md"
                      />
                      <Switch
                        label="Featured Job"
                        description="Feature job at the top of search results"
                        checked={form.values.featuredJob}
                        onChange={(e) =>
                          form.setFieldValue(
                            "featuredJob",
                            e.currentTarget.checked,
                          )
                        }
                        size="md"
                      />
                    </div>
                  </div>
                </Stack>
              )}

              {/* Step 2: Job Details */}
              {activeStep === 1 && (
                <Stack gap="xl">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconStar size={20} className="text-green-600" />
                      </div>
                      <div>
                        <Text fw={700} size="md" className="text-gray-900 mb-1">
                          Writing Tip: Craft a Compelling Description
                        </Text>
                        <Text size="sm" className="text-gray-600">
                          A great job description clearly outlines expectations,
                          growth opportunities, and your company culture. Focus
                          on what makes your role unique and exciting.
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconFileDescription
                          size={18}
                          className="text-blue-600"
                        />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Job Overview
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Describe the role and its impact
                        </Text>
                      </div>
                    </div>
                    <Textarea
                      label="Job Summary *"
                      description="Provide an overview of the position and what makes it exciting"
                      placeholder="We're looking for a talented Software Engineer to join our growing team. You'll be responsible for building scalable applications and working with cutting-edge technologies..."
                      minRows={5}
                      required
                      size="md"
                      radius="md"
                      {...form.getInputProps("overview")}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconList size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Key Responsibilities *
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          List the main duties and expectations
                        </Text>
                      </div>
                    </div>
                    <MultiSelect
                      label="Responsibilities"
                      description="Select or type the primary responsibilities"
                      placeholder="Select from common responsibilities"
                      data={responsibilityExamples}
                      searchable
                      clearable
                      size="md"
                      radius="md"
                      required
                      {...form.getInputProps("responsibilities")}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconCertificate size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Technical Requirements *
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Select the skills needed for this role
                        </Text>
                      </div>
                    </div>
                    <MultiSelect
                      label="Required Skills"
                      description="Select all relevant technical and soft skills"
                      placeholder="Search and select skills"
                      data={commonSkills}
                      searchable
                      clearable
                      size="md"
                      radius="md"
                      required
                      {...form.getInputProps("skills")}
                    />
                  </div>
                </Stack>
              )}

              {/* Step 3: Requirements */}
              {activeStep === 2 && (
                <Stack gap="xl">
                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconTrophy size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Qualifications & Requirements *
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Educational and professional requirements
                        </Text>
                      </div>
                    </div>
                    <MultiSelect
                      label="Minimum Qualifications"
                      description="Select or add qualifications required for this role"
                      placeholder="Select from common qualifications"
                      data={qualificationExamples}
                      searchable
                      clearable
                      size="md"
                      radius="md"
                      required
                      {...form.getInputProps("qualifications")}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconUsers size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Benefits & Perks
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          What makes your offer attractive?
                        </Text>
                      </div>
                    </div>
                    <MultiSelect
                      label="Compensation & Benefits"
                      description="Select the benefits your company offers"
                      placeholder="Select from common benefits"
                      data={benefitExamples}
                      searchable
                      clearable
                      size="md"
                      radius="md"
                      {...form.getInputProps("benefits")}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-200">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <IconDeviceLaptop size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <Title
                          order={4}
                          size="h4"
                          className="text-gray-900 font-semibold"
                        >
                          Work Policies
                        </Title>
                        <Text size="xs" className="text-gray-500">
                          Remote work and workplace guidelines
                        </Text>
                      </div>
                    </div>
                    <Textarea
                      label="Remote Work Policy"
                      description="Describe your remote/hybrid work arrangements"
                      placeholder="We offer flexible remote work options with optional in-office days. Our team collaborates across time zones using modern tools..."
                      minRows={3}
                      size="md"
                      radius="md"
                      {...form.getInputProps("remotePolicy")}
                    />
                  </div>
                </Stack>
              )}

              {/* Step 4: Review */}
              {activeStep === 3 && (
                <Stack gap="xl">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <IconBrowserCheck
                          size={20}
                          className="text-green-600"
                        />
                      </div>
                      <div>
                        <Text fw={700} size="md" className="text-gray-900 mb-1">
                          Review Your Posting
                        </Text>
                        <Text size="sm" className="text-gray-600">
                          Please carefully review all information before
                          publishing. Make sure everything is accurate and
                          complete to attract the best candidates.
                        </Text>
                      </div>
                    </div>
                  </div>

                  {/* Preview Card */}
                  <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <IconBuilding size={28} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">
                            {form.values.title || "Senior Software Engineer"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {form.values.company || "Tech Company"} •{" "}
                            {form.values.location || "Remote"}
                          </p>
                        </div>
                      </div>
                      {form.values.urgentHiring && (
                        <Badge
                          color="red"
                          size="lg"
                          variant="filled"
                          className="animate-pulse"
                        >
                          ⚡ Urgent Hiring
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                      <Badge color="blue" variant="light" size="lg">
                        <div className="flex items-center gap-1">
                          <IconBriefcase size={14} />{" "}
                          {form.values.jobType || "Full-time"}
                        </div>
                      </Badge>
                      <Badge color="green" variant="light" size="lg">
                        <div className="flex items-center gap-1">
                          <IconMapPin size={14} />{" "}
                          {form.values.locationType || "Remote"}
                        </div>
                      </Badge>
                      <Badge color="orange" variant="light" size="lg">
                        <div className="flex items-center gap-1">
                          <IconCurrencyDollar size={14} /> $
                          {form.values.salaryMin?.toLocaleString()} - $
                          {form.values.salaryMax?.toLocaleString()} /{" "}
                          {form.values.salaryType}
                        </div>
                      </Badge>
                      <Badge color="purple" variant="light" size="lg">
                        <div className="flex items-center gap-1">
                          <IconCertificate size={14} />{" "}
                          {form.values.experience || "Not specified"}
                        </div>
                      </Badge>
                    </div>

                    <Text className="text-gray-600 mt-3 leading-relaxed">
                      {form.values.overview?.substring(0, 250) ||
                        "Join our dynamic team and help us build the future of technology..."}
                      {form.values.overview?.length > 250 && "..."}
                    </Text>

                    <Divider className="my-5" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Text
                          size="xs"
                          className="text-gray-500 uppercase tracking-wider mb-3 font-semibold"
                        >
                          Required Skills
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {form.values.skills.slice(0, 5).map((skill, idx) => (
                            <Badge
                              key={idx}
                              size="sm"
                              variant="outline"
                              color="blue"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {form.values.skills.length > 5 && (
                            <Badge size="sm" variant="outline" color="gray">
                              +{form.values.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <Text
                          size="xs"
                          className="text-gray-500 uppercase tracking-wider mb-3 font-semibold"
                        >
                          Benefits
                        </Text>
                        <div className="flex flex-wrap gap-2">
                          {form.values.benefits
                            .slice(0, 3)
                            .map((benefit, idx) => (
                              <Badge
                                key={idx}
                                size="sm"
                                variant="outline"
                                color="green"
                              >
                                {benefit.length > 20
                                  ? benefit.substring(0, 20) + "..."
                                  : benefit}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>

                    <Divider className="my-5" />

                    <div>
                      <Text
                        size="xs"
                        className="text-gray-500 uppercase tracking-wider mb-3 font-semibold"
                      >
                        Qualifications
                      </Text>
                      <div className="flex flex-wrap gap-2">
                        {form.values.qualifications
                          .slice(0, 3)
                          .map((qual, idx) => (
                            <Badge
                              key={idx}
                              size="md"
                              variant="light"
                              color="gray"
                            >
                              ✓{" "}
                              {qual.length > 30
                                ? qual.substring(0, 30) + "..."
                                : qual}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    {form.values.responsibilities.length > 0 && (
                      <>
                        <Divider className="my-5" />
                        <div>
                          <Text
                            size="xs"
                            className="text-gray-500 uppercase tracking-wider mb-3 font-semibold"
                          >
                            Key Responsibilities
                          </Text>
                          <ul className="list-disc list-inside space-y-1">
                            {form.values.responsibilities
                              .slice(0, 3)
                              .map((resp, idx) => (
                                <li key={idx} className="text-sm text-gray-600">
                                  {resp}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </Card>

                  {/* Progress Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Text fw={700} className="text-gray-900">
                          Posting Readiness
                        </Text>
                        <Text size="xs" className="text-gray-600">
                          Your job posting completion status
                        </Text>
                      </div>
                      <Text fw={800} size="xl" className="text-blue-600">
                        {calculateProgress()}%
                      </Text>
                    </div>
                    <Progress
                      value={calculateProgress()}
                      color="blue"
                      size="lg"
                      radius="xl"
                    />
                    <div className="mt-3 text-sm">
                      {calculateProgress() === 100 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <IconCheck size={16} />
                          <span>
                            Complete! Ready to publish your job posting
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-orange-600">
                          <IconBulb size={16} />
                          <span>
                            Complete all sections to make your job posting live
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Stack>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  size="lg"
                  radius="md"
                >
                  ← Back
                </Button>

                {activeStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
                    rightSection={<IconArrowRight size={18} />}
                    size="lg"
                    radius="md"
                  >
                    Continue to Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={submitting}
                    disabled={submitting || isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
                    leftSection={<IconSend size={18} />}
                    size="lg"
                    radius="md"
                  >
                    Publish Job Posting
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default PostJobPage;
