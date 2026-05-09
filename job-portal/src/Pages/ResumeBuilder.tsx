// src/Pages/ResumeBuilder.tsx
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Button,
  Stack,
  Tabs,
  TextInput,
  Textarea,
  Group,
  Grid,
  Card,
  Badge,
  ActionIcon,
  Divider,
  FileInput,
  Progress,
  Alert,
  SimpleGrid,
  Stepper,
  NumberInput,
  Select,
  LoadingOverlay,
  Modal,
  Skeleton
} from "@mantine/core";
import {
  IconFileText,
  IconUpload,
  IconUser,
  IconBriefcase,
  IconSchool,
  IconCode,
  IconPlus,
  IconTrash,
  IconEdit,
  IconCheck,
  IconBrain,
  IconArrowRight,
  IconDownload,
  IconEye,
  IconSparkles,
  IconShield,
  IconChartBar,
  IconPrinter,
  IconX
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Skeleton Loader Component
const ResumeBuilderSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-8">
      <Container size="xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Skeleton height={50} width={50} circle />
              <div>
                <Skeleton height={28} width={200} radius="md" />
                <Skeleton height={16} width={250} mt={5} radius="md" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton height={38} width={140} radius="xl" />
              <Skeleton height={38} width={120} radius="xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <Skeleton height={20} width={150} radius="md" />
              <Skeleton height={12} width="100%" mt={10} radius="md" />
              <Skeleton height={8} width="100%" mt={8} radius="xl" />
              <div className="mt-4 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton height={14} width={100} radius="md" />
                    <Skeleton height={14} width={60} radius="md" />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <Skeleton height={20} width={120} radius="md" />
              <div className="mt-3 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} height={14} width="90%" radius="md" />
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex gap-2 mb-6">
                <Skeleton height={36} width={120} radius="lg" />
                <Skeleton height={36} width={80} radius="lg" />
              </div>
              <div className="flex gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton circle height={40} width={40} className="mx-auto" />
                    <Skeleton height={12} width={80} mt={5} radius="md" />
                    <Skeleton height={10} width={60} mt={2} radius="md" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton height={16} width="100%" radius="md" />
                <Skeleton height={16} width="95%" radius="md" />
                <Skeleton height={16} width="90%" radius="md" />
                <Skeleton height={100} width="100%" radius="md" mt={4} />
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  percentage?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

const ResumeBuilder = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>("build");
  const [activeStep, setActiveStep] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  // Form state - with proper initial values
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    location: "",
    title: "",
    summary: ""
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([
    { title: "", company: "", location: "", startDate: "", endDate: "", description: "" }
  ]);
  const [educations, setEducations] = useState<Education[]>([
    { degree: "", institution: "", year: "" }
  ]);
  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "", issuer: "", date: "" }
  ]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addSkill = () => {
    if (newSkill && newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: "", company: "", location: "", startDate: "", endDate: "", description: "" }]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducations([...educations, { degree: "", institution: "", year: "" }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuer: "", date: "" }]);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleFileUpload = async () => {
    if (!resumeFile) {
      notifications.show({
        title: "Error",
        message: "Please select a file to upload",
        color: "red"
      });
      return;
    }

    setUploading(true);
    setTimeout(() => {
      notifications.show({
        title: "Success",
        message: "Resume uploaded successfully!",
        color: "green"
      });
      setUploading(false);
    }, 2000);
  };

  const saveResume = () => {
    const resumeData = {
      personalInfo,
      skills,
      experiences,
      educations,
      certifications,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`resume_${user?.id}`, JSON.stringify(resumeData));
    
    notifications.show({
      title: "Success",
      message: "Resume saved successfully!",
      color: "green",
      icon: <IconCheck size={16} />
    });
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    
    setDownloading(true);
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${personalInfo.fullName || 'Resume'}.pdf`);
      
      notifications.show({
        title: "Success",
        message: "Resume downloaded successfully!",
        color: "green"
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      notifications.show({
        title: "Error",
        message: "Failed to generate PDF",
        color: "red"
      });
    } finally {
      setDownloading(false);
    }
  };

  const printResume = () => {
    const printContent = previewRef.current;
    if (!printContent) return;
    
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${personalInfo.fullName || 'Resume'} - Print</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              .text-center { text-align: center; }
              .text-blue { color: #2563eb; }
              .flex { display: flex; }
              .gap-2 { gap: 8px; }
              .mb-2 { margin-bottom: 8px; }
              .mb-4 { margin-bottom: 16px; }
              .mt-4 { margin-top: 16px; }
              .text-gray { color: #6b7280; }
              .text-sm { font-size: 14px; }
              .text-lg { font-size: 18px; }
              .text-xl { font-size: 24px; }
              .font-bold { font-weight: bold; }
              .font-semibold { font-weight: 600; }
              .border-bottom { border-bottom: 1px solid #e5e7eb; }
              .p-4 { padding: 16px; }
              .mt-2 { margin-top: 8px; }
              .mt-3 { margin-top: 12px; }
              .mt-6 { margin-top: 24px; }
              .gap-4 { gap: 16px; }
              .justify-between { justify-content: space-between; }
              .flex-wrap { flex-wrap: wrap; }
              .bg-white { background-color: white; }
              @media print {
                body { margin: 0; padding: 20px; }
                .no-break { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  const calculateCompletion = () => {
    let completed = 0;
    let total = 0;
    
    if (personalInfo.fullName && personalInfo.fullName.trim()) completed++;
    if (personalInfo.email && personalInfo.email.trim()) completed++;
    if (personalInfo.title && personalInfo.title.trim()) completed++;
    if (personalInfo.summary && personalInfo.summary.trim()) completed++;
    total += 4;
    
    if (skills.length > 0) completed++;
    total++;
    
    const hasExperience = experiences.some(exp => exp.title && exp.title.trim() && exp.company && exp.company.trim());
    if (hasExperience) completed++;
    total++;
    
    const hasEducation = educations.some(edu => edu.degree && edu.degree.trim() && edu.institution && edu.institution.trim());
    if (hasEducation) completed++;
    total++;
    
    return Math.round((completed / total) * 100);
  };

  const completion = calculateCompletion();

  // Show skeleton while loading
  if (isLoading) {
    return <ResumeBuilderSkeleton />;
  }

  if (!isAuthenticated || user?.role !== "candidate") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-8">
      <Container size="xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <IconFileText size={24} className="text-white" />
              </div>
              <div>
                <Title order={1} className="text-2xl font-bold text-gray-900">
                  Resume Builder
                </Title>
                <Text className="text-gray-500">
                  Create a professional resume that stands out
                </Text>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate("/resume-analyzer")}
                leftSection={<IconBrain size={18} />}
                variant="light"
                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
              >
                AI Resume Analyzer
              </Button>
              <Button
                onClick={saveResume}
                leftSection={<IconCheck size={18} />}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Save Resume
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Paper className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <Text fw={700} size="lg" className="mb-3">Profile Completion</Text>
              <Progress value={completion} size="lg" radius="xl" color="blue" />
              <Text size="sm" className="text-gray-500 mt-2">{completion}% Complete</Text>
              <Divider className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Personal Info</span>
                  {personalInfo.fullName ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Skills</span>
                  {skills.length > 0 ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Experience</span>
                  {experiences.some(e => e.title) ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Education</span>
                  {educations.some(e => e.degree) ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
                </div>
              </div>
            </Paper>

            <Paper className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <IconSparkles size={20} className="text-blue-600" />
                <Text fw={700}>Pro Tips</Text>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Use action verbs to describe achievements</li>
                <li>✓ Quantify your accomplishments with numbers</li>
                <li>✓ Tailor your resume for each job application</li>
                <li>✓ Keep formatting clean and professional</li>
                <li>✓ Include relevant keywords from job descriptions</li>
              </ul>
            </Paper>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Paper className="bg-white rounded-2xl shadow-md overflow-hidden">
              <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills" radius="lg">
                <div className="border-b border-gray-200 px-6 pt-4">
                  <Tabs.List className="gap-2">
                    <Tabs.Tab value="build" leftSection={<IconUser size={16} />}>Build Resume</Tabs.Tab>
                    <Tabs.Tab value="preview" leftSection={<IconEye size={16} />}>Preview</Tabs.Tab>
                  </Tabs.List>
                </div>

                <div className="p-6">
                  {/* Build Tab */}
                  <Tabs.Panel value="build">
                    <Stepper active={activeStep} onStepClick={setActiveStep} className="mb-8">
                      <Stepper.Step label="Personal" description="Your details" />
                      <Stepper.Step label="Experience" description="Work history" />
                      <Stepper.Step label="Education" description="Academic" />
                      <Stepper.Step label="Skills" description="Expertise" />
                    </Stepper>

                    {/* Step 0: Personal Info */}
                    {activeStep === 0 && (
                      <Stack gap="md">
                        <SimpleGrid cols={{ base: 1, md: 2 }}>
                          <TextInput
                            label="Full Name"
                            placeholder="John Doe"
                            value={personalInfo.fullName || ""}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                            required
                          />
                          <TextInput
                            label="Professional Title"
                            placeholder="Senior Software Engineer"
                            value={personalInfo.title || ""}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                          />
                          <TextInput
                            label="Email"
                            placeholder="john@example.com"
                            value={personalInfo.email || ""}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                          />
                          <TextInput
                            label="Phone"
                            placeholder="+1 234 567 8900"
                            value={personalInfo.phone || ""}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                          />
                          <TextInput
                            label="Location"
                            placeholder="San Francisco, CA"
                            value={personalInfo.location || ""}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                            className="md:col-span-2"
                          />
                        </SimpleGrid>
                        <Textarea
                          label="Professional Summary"
                          placeholder="A brief overview of your professional background and career goals..."
                          value={personalInfo.summary || ""}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                          minRows={4}
                        />
                      </Stack>
                    )}

                    {/* Step 1: Experience */}
                    {activeStep === 1 && (
                      <Stack gap="md">
                        {experiences.map((exp, idx) => (
                          <Card key={idx} className="bg-gray-50 border border-gray-200 p-4">
                            <div className="flex justify-between items-center mb-3">
                              <Text fw={600}>Experience #{idx + 1}</Text>
                              {idx > 0 && (
                                <ActionIcon color="red" variant="subtle" onClick={() => removeExperience(idx)}>
                                  <IconTrash size={16} />
                                </ActionIcon>
                              )}
                            </div>
                            <SimpleGrid cols={{ base: 1, md: 2 }} className="mb-3">
                              <TextInput
                                label="Job Title"
                                placeholder="Senior Developer"
                                value={exp.title || ""}
                                onChange={(e) => updateExperience(idx, "title", e.target.value)}
                              />
                              <TextInput
                                label="Company"
                                placeholder="Google"
                                value={exp.company || ""}
                                onChange={(e) => updateExperience(idx, "company", e.target.value)}
                              />
                              <TextInput
                                label="Location"
                                placeholder="Mountain View, CA"
                                value={exp.location || ""}
                                onChange={(e) => updateExperience(idx, "location", e.target.value)}
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <TextInput
                                  label="Start Date"
                                  placeholder="Jan 2020"
                                  value={exp.startDate || ""}
                                  onChange={(e) => updateExperience(idx, "startDate", e.target.value)}
                                />
                                <TextInput
                                  label="End Date"
                                  placeholder="Present"
                                  value={exp.endDate || ""}
                                  onChange={(e) => updateExperience(idx, "endDate", e.target.value)}
                                />
                              </div>
                            </SimpleGrid>
                            <Textarea
                              label="Description"
                              placeholder="Describe your responsibilities and achievements..."
                              value={exp.description || ""}
                              onChange={(e) => updateExperience(idx, "description", e.target.value)}
                              minRows={3}
                            />
                          </Card>
                        ))}
                        <Button onClick={addExperience} variant="light" leftSection={<IconPlus size={16} />}>
                          Add Experience
                        </Button>
                      </Stack>
                    )}

                    {/* Step 2: Education */}
                    {activeStep === 2 && (
                      <Stack gap="md">
                        {educations.map((edu, idx) => (
                          <Card key={idx} className="bg-gray-50 border border-gray-200 p-4">
                            <div className="flex justify-between items-center mb-3">
                              <Text fw={600}>Education #{idx + 1}</Text>
                              {idx > 0 && (
                                <ActionIcon color="red" variant="subtle" onClick={() => removeEducation(idx)}>
                                  <IconTrash size={16} />
                                </ActionIcon>
                              )}
                            </div>
                            <SimpleGrid cols={{ base: 1, md: 2 }}>
                              <TextInput
                                label="Degree"
                                placeholder="B.Tech in Computer Science"
                                value={edu.degree || ""}
                                onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                              />
                              <TextInput
                                label="Institution"
                                placeholder="Stanford University"
                                value={edu.institution || ""}
                                onChange={(e) => updateEducation(idx, "institution", e.target.value)}
                              />
                              <TextInput
                                label="Year of Graduation"
                                placeholder="2020"
                                value={edu.year || ""}
                                onChange={(e) => updateEducation(idx, "year", e.target.value)}
                              />
                              <TextInput
                                label="Percentage/CGPA"
                                placeholder="85% / 8.5 CGPA"
                                value={edu.percentage || ""}
                                onChange={(e) => updateEducation(idx, "percentage", e.target.value)}
                              />
                            </SimpleGrid>
                          </Card>
                        ))}
                        <Button onClick={addEducation} variant="light" leftSection={<IconPlus size={16} />}>
                          Add Education
                        </Button>
                      </Stack>
                    )}

                    {/* Step 3: Skills & Certifications */}
                    {activeStep === 3 && (
                      <Stack gap="md">
                        <div>
                          <Text fw={500} className="mb-2">Skills</Text>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {skills.map((skill, idx) => (
                              <Badge
                                key={idx}
                                size="lg"
                                variant="light"
                                color="blue"
                                rightSection={
                                  <IconTrash size={12} className="cursor-pointer ml-1" onClick={() => removeSkill(skill)} />
                                }
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <TextInput
                              placeholder="Add a skill"
                              value={newSkill || ""}
                              onChange={(e) => setNewSkill(e.target.value)}
                              className="flex-1"
                              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                            />
                            <Button onClick={addSkill} variant="light">
                              <IconPlus size={16} />
                            </Button>
                          </div>
                        </div>

                        <Divider />

                        <div>
                          <Text fw={500} className="mb-2">Certifications</Text>
                          {certifications.map((cert, idx) => (
                            <Card key={idx} className="bg-gray-50 border border-gray-200 p-4 mb-3">
                              <div className="flex justify-between items-center mb-3">
                                <Text fw={500}>Certification #{idx + 1}</Text>
                                {idx > 0 && (
                                  <ActionIcon color="red" variant="subtle" onClick={() => removeCertification(idx)}>
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                )}
                              </div>
                              <SimpleGrid cols={{ base: 1, md: 2 }} className="mb-3">
                                <TextInput
                                  label="Certification Name"
                                  placeholder="AWS Certified Solutions Architect"
                                  value={cert.name || ""}
                                  onChange={(e) => updateCertification(idx, "name", e.target.value)}
                                />
                                <TextInput
                                  label="Issuing Organization"
                                  placeholder="Amazon Web Services"
                                  value={cert.issuer || ""}
                                  onChange={(e) => updateCertification(idx, "issuer", e.target.value)}
                                />
                                <TextInput
                                  label="Date Earned"
                                  placeholder="Jan 2023"
                                  value={cert.date || ""}
                                  onChange={(e) => updateCertification(idx, "date", e.target.value)}
                                />
                              </SimpleGrid>
                            </Card>
                          ))}
                          <Button onClick={addCertification} variant="light" leftSection={<IconPlus size={16} />}>
                            Add Certification
                          </Button>
                        </div>
                      </Stack>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                        disabled={activeStep === 3}
                        className="bg-blue-600"
                      >
                        Next
                      </Button>
                    </div>
                  </Tabs.Panel>

                  {/* Preview Tab */}
                  <Tabs.Panel value="preview">
                    <div className="flex gap-3 mb-4 justify-end">
                      <Button
                        onClick={downloadPDF}
                        loading={downloading}
                        leftSection={<IconDownload size={16} />}
                        className="bg-blue-600"
                      >
                        Download PDF
                      </Button>
                      <Button
                        onClick={printResume}
                        leftSection={<IconPrinter size={16} />}
                        variant="light"
                      >
                        Print
                      </Button>
                    </div>

                    <div ref={previewRef} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                      {/* Resume Header */}
                      <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
                        <p className="text-lg text-blue-600 mt-1">{personalInfo.title || "Professional Title"}</p>
                        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-500">
                          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                        </div>
                      </div>

                      <Divider />

                      {/* Professional Summary */}
                      {personalInfo.summary && (
                        <div className="mt-4">
                          <h3 className="font-semibold text-gray-800 mb-2 text-lg border-l-4 border-blue-500 pl-3">Professional Summary</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{personalInfo.summary}</p>
                        </div>
                      )}

                      {/* Skills Section */}
                      {skills.length > 0 && (
                        <div className="mt-5">
                          <h3 className="font-semibold text-gray-800 mb-3 text-lg border-l-4 border-blue-500 pl-3">Technical Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => (
                              <Badge key={idx} size="lg" variant="light" color="blue" className="bg-blue-50 text-blue-700 px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Work Experience */}
                      {experiences.some(e => e.title && e.company) && (
                        <div className="mt-5">
                          <h3 className="font-semibold text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-3">Work Experience</h3>
                          {experiences.map((exp, idx) => (
                            exp.title && exp.company && (
                              <div key={idx} className="mb-5">
                                <div className="flex justify-between items-start flex-wrap">
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                                    <p className="text-gray-600 text-sm">{exp.company} {exp.location && `• ${exp.location}`}</p>
                                  </div>
                                  {exp.startDate && (
                                    <p className="text-gray-400 text-sm">{exp.startDate} - {exp.endDate || "Present"}</p>
                                  )}
                                </div>
                                {exp.description && (
                                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{exp.description}</p>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {/* Education */}
                      {educations.some(e => e.degree && e.institution) && (
                        <div className="mt-5">
                          <h3 className="font-semibold text-gray-800 mb-4 text-lg border-l-4 border-blue-500 pl-3">Education</h3>
                          {educations.map((edu, idx) => (
                            edu.degree && edu.institution && (
                              <div key={idx} className="mb-3">
                                <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                                <p className="text-gray-600 text-sm">{edu.institution}</p>
                                <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                                  {edu.year && <span>🎓 Year: {edu.year}</span>}
                                  {edu.percentage && <span>📊 Percentage: {edu.percentage}</span>}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {/* Certifications */}
                      {certifications.some(c => c.name && c.issuer) && (
                        <div className="mt-5">
                          <h3 className="font-semibold text-gray-800 mb-3 text-lg border-l-4 border-blue-500 pl-3">Certifications</h3>
                          {certifications.map((cert, idx) => (
                            cert.name && cert.issuer && (
                              <div key={idx} className="mb-2">
                                <p className="text-gray-700 text-sm">
                                  <span className="font-semibold">{cert.name}</span> - {cert.issuer}
                                  {cert.date && <span className="text-gray-400 ml-2">({cert.date})</span>}
                                </p>
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      {/* Empty state */}
                      {!personalInfo.fullName && !personalInfo.summary && skills.length === 0 && 
                       !experiences.some(e => e.title) && !educations.some(e => e.degree) && (
                        <div className="text-center py-12 text-gray-400">
                          <IconFileText size={48} className="mx-auto mb-3 opacity-50" />
                          <p>No resume data available. Please fill in your information in the "Build Resume" tab.</p>
                        </div>
                      )}
                    </div>
                  </Tabs.Panel>
                </div>
              </Tabs>
            </Paper>
          </div>
        </div>

        {/* AI Resume Analyzer Card */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/20 rounded-xl">
                <IconBrain size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Resume Analyzer</h3>
                <p className="opacity-90">Get your resume analyzed against job descriptions with AI</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/resume-analyzer')}
                className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg"
                rightSection={<IconArrowRight size={16} />}
              >
                Open Analyzer
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResumeBuilder;