// src/Pages/ResumeBuilder.tsx
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Text,
  Paper,
  Button,
  Stack,
  Tabs,
  TextInput,
  Textarea,
  Card,
  Badge,
  ActionIcon,
  Divider,
  Progress,
  SimpleGrid,
  Skeleton,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import {
  IconFileText,
  IconUser,
  IconPlus,
  IconTrash,
  IconCheck,
  IconBrain,
  IconArrowRight,
  IconDownload,
  IconEye,
  IconSparkles,
  IconPrinter,
  IconMenu2,
  IconMapPin,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Skeleton Loader Component
const ResumeBuilderSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-4 sm:py-8">
      <Container size="xl" className="px-3 sm:px-4">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton height={45} width={45} circle />
              <div>
                <Skeleton height={24} width={180} radius="md" />
                <Skeleton height={14} width={220} mt={5} radius="md" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton height={36} width={120} radius="xl" />
              <Skeleton height={36} width={100} radius="xl" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 sm:p-6">
              <Skeleton height={20} width={140} radius="md" />
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
            <Card className="p-4 sm:p-6">
              <Skeleton height={20} width={120} radius="md" />
              <div className="mt-3 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} height={14} width="90%" radius="md" />
                ))}
              </div>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton height={32} width={100} radius="lg" />
                <Skeleton height={32} width={80} radius="lg" />
              </div>
              <div className="flex flex-wrap justify-around gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton circle height={35} width={35} className="mx-auto" />
                    <Skeleton height={10} width={60} mt={5} radius="md" />
                    <Skeleton height={8} width={50} mt={2} radius="md" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <Skeleton height={16} width="100%" radius="md" />
                <Skeleton height={16} width="95%" radius="md" />
                <Skeleton height={16} width="90%" radius="md" />
                <Skeleton height={80} width="100%" radius="md" mt={4} />
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
  const [activeTab, setActiveTab] = useState<string | null>("preview");
  const [activeStep, setActiveStep] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    summary: "",
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // Load saved resume data on mount only
  useEffect(() => {
    const savedResume = localStorage.getItem(`resume_${user?.id}`);
    if (savedResume) {
      try {
        const data = JSON.parse(savedResume);
        if (data.personalInfo) setPersonalInfo(data.personalInfo);
        if (data.skills) setSkills(data.skills);
        if (data.experiences && data.experiences.length > 0) setExperiences(data.experiences);
        if (data.educations && data.educations.length > 0) setEducations(data.educations);
        if (data.certifications && data.certifications.length > 0) setCertifications(data.certifications);
      } catch (error) {
        console.error("Error loading saved resume:", error);
      }
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const addSkill = () => {
    if (newSkill && newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", company: "", location: "", startDate: "", endDate: "", description: "" },
    ]);
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

  const saveResume = () => {
    const resumeData = {
      personalInfo,
      skills,
      experiences,
      educations,
      certifications,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(`resume_${user?.id}`, JSON.stringify(resumeData));
    notifications.show({
      title: "Success",
      message: "Resume saved successfully!",
      color: "green",
      icon: <IconCheck size={16} />,
    });
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${personalInfo.fullName || "Resume"}.pdf`);
      notifications.show({ 
        title: "Success", 
        message: "Resume downloaded successfully!", 
        color: "green" 
      });
    } catch (error) {
      console.error("PDF Error:", error);
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
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${personalInfo.fullName || "Resume"} - Print</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: white; }
              .resume-container { max-width: 800px; margin: 0 auto; }
              .text-center { text-align: center; }
              .text-blue { color: #2563eb; }
              .mb-2 { margin-bottom: 8px; }
              .mb-3 { margin-bottom: 12px; }
              .mb-4 { margin-bottom: 16px; }
              .mb-5 { margin-bottom: 20px; }
              .mt-1 { margin-top: 4px; }
              .mt-2 { margin-top: 8px; }
              .mt-3 { margin-top: 12px; }
              .text-gray { color: #6b7280; }
              .text-sm { font-size: 14px; }
              .text-md { font-size: 16px; }
              .text-lg { font-size: 18px; }
              .text-xl { font-size: 24px; }
              .text-2xl { font-size: 28px; }
              .font-bold { font-weight: bold; }
              .font-semibold { font-weight: 600; }
              .border-bottom { border-bottom: 1px solid #e5e7eb; }
              .border-left-blue { border-left: 3px solid #2563eb; padding-left: 12px; }
              .skill-badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin: 4px; }
              .flex { display: flex; }
              .flex-wrap { flex-wrap: wrap; }
              .justify-between { justify-content: space-between; }
              .items-start { align-items: flex-start; }
              .gap-1 { gap: 4px; }
              .gap-2 { gap: 8px; }
              .gap-3 { gap: 12px; }
              .p-3 { padding: 12px; }
              .my-2 { margin-top: 8px; margin-bottom: 8px; }
              @media print { body { padding: 20px; } }
            </style>
          </head>
          <body>
            <div class="resume-container">${printContent.innerHTML}</div>
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
    if (personalInfo.fullName?.trim()) completed++;
    if (personalInfo.email?.trim()) completed++;
    if (personalInfo.title?.trim()) completed++;
    if (personalInfo.summary?.trim()) completed++;
    total += 4;
    if (skills.length > 0) completed++;
    total++;
    const hasExperience = experiences.some((exp) => exp.title?.trim() && exp.company?.trim());
    if (hasExperience) completed++;
    total++;
    const hasEducation = educations.some((edu) => edu.degree?.trim() && edu.institution?.trim());
    if (hasEducation) completed++;
    total++;
    const hasCertification = certifications.some((cert) => cert.name?.trim());
    if (hasCertification) completed++;
    total++;
    return Math.round((completed / total) * 100);
  };

  const completion = calculateCompletion();

  if (isLoading) return <ResumeBuilderSkeleton />;
  if (!isAuthenticated || user?.role !== "candidate") return <Navigate to="/login" replace />;

  const SidebarContent = () => (
    <div className="space-y-4">
      <Paper className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100">
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
            {experiences.some((e) => e.title && e.company) ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Education</span>
            {educations.some((e) => e.degree && e.institution) ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Certifications</span>
            {certifications.some((c) => c.name) ? <IconCheck size={14} className="text-green-500" /> : <span className="text-gray-400">Pending</span>}
          </div>
        </div>
      </Paper>
      <Paper className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <IconSparkles size={20} className="text-blue-600" />
          <Text fw={700}>Pro Tips</Text>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Use action verbs to describe achievements</li>
          <li>✓ Quantify your accomplishments with numbers</li>
          <li>✓ Tailor your resume for each job application</li>
          <li>✓ Keep formatting clean and professional</li>
          <li>✓ Include relevant certifications and courses</li>
        </ul>
      </Paper>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 py-4 sm:py-8">
      <Container size="xl" className="px-3 sm:px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <IconFileText size={22} className="text-white sm:size-[24px]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-xs sm:text-sm text-gray-500">Create a professional resume that stands out</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button 
                onClick={() => navigate("/resume-analyzer")} 
                leftSection={<IconBrain size={16} />} 
                variant="light" 
                size="sm" 
                className="flex-1 sm:flex-none bg-purple-50 hover:bg-purple-100"
              >
                <span className="hidden sm:inline">AI Resume Analyzer</span>
                <span className="sm:hidden">AI Analyzer</span>
              </Button>
              <Button 
                onClick={saveResume} 
                leftSection={<IconCheck size={16} />} 
                size="sm" 
                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={() => setMobileMenuOpen(true)} 
            variant="light" 
            leftSection={<IconMenu2 size={18} />} 
            fullWidth
          >
            Show Tips & Progress
          </Button>
        </div>

        {/* Mobile Drawer */}
        <Drawer 
          opened={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          title="Resume Tips" 
          position="right" 
          size="85%" 
          padding="md"
        >
          <SidebarContent />
        </Drawer>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <SidebarContent />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Paper className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
              <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills" radius="lg">
                <div className="border-b border-gray-200 px-3 sm:px-6 pt-3 sm:pt-4">
                  <Tabs.List className="gap-1 sm:gap-2 flex-wrap">
                    <Tabs.Tab value="build" leftSection={<IconUser size={14} />}>
                      Build
                    </Tabs.Tab>
                    <Tabs.Tab value="preview" leftSection={<IconEye size={14} />}>
                      Preview
                    </Tabs.Tab>
                  </Tabs.List>
                </div>

                <div className="p-3 sm:p-6">
                  {/* Build Tab */}
                  <Tabs.Panel value="build">
                    {/* Mobile Stepper */}
                    <div className="overflow-x-auto pb-2 mb-4 sm:mb-8">
                      <div className="flex justify-between min-w-[320px]">
                        {["Personal", "Experience", "Education", "Skills & Cert"].map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`flex flex-col items-center px-2 py-1 rounded-lg transition ${
                              activeStep === idx ? "text-blue-600" : "text-gray-400"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                                activeStep === idx
                                  ? "bg-blue-600 text-white"
                                  : activeStep > idx
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {activeStep > idx ? <IconCheck size={16} /> : idx + 1}
                            </div>
                            <span className="text-[10px] sm:text-xs mt-1 whitespace-nowrap">{label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 0: Personal Info */}
                    {activeStep === 0 && (
                      <Stack gap="sm">
                        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                          <TextInput 
                            label="Full Name" 
                            placeholder="John Doe" 
                            value={personalInfo.fullName} 
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })} 
                            required 
                            size="sm" 
                          />
                          <TextInput 
                            label="Professional Title" 
                            placeholder="Senior Software Engineer" 
                            value={personalInfo.title} 
                            onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })} 
                            size="sm" 
                          />
                          <TextInput 
                            label="Email" 
                            placeholder="john@example.com" 
                            value={personalInfo.email} 
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} 
                            size="sm" 
                          />
                          <TextInput 
                            label="Phone" 
                            placeholder="+1 234 567 8900" 
                            value={personalInfo.phone} 
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} 
                            size="sm" 
                          />
                          <TextInput 
                            label="Location" 
                            placeholder="San Francisco, CA" 
                            value={personalInfo.location} 
                            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })} 
                            className="md:col-span-2" 
                            size="sm" 
                          />
                        </SimpleGrid>
                        <Textarea 
                          label="Professional Summary" 
                          placeholder="A brief overview of your professional background..." 
                          value={personalInfo.summary} 
                          onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })} 
                          minRows={3} 
                          size="sm" 
                        />
                      </Stack>
                    )}

                    {/* Step 1: Experience */}
                    {activeStep === 1 && (
                      <Stack gap="sm">
                        <ScrollArea className="h-[400px]" offsetScrollbars>
                          {experiences.length === 0 ? (
                            <Card className="bg-gray-50 border border-gray-200 p-4 text-center">
                              <Text c="dimmed" size="sm">No experience added yet. Click "Add Experience" to start.</Text>
                            </Card>
                          ) : (
                            experiences.map((exp, idx) => (
                              <Card key={idx} className="bg-gray-50 border border-gray-200 p-3 sm:p-4 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                  <Text fw={600} size="sm">Experience #{idx + 1}</Text>
                                  <ActionIcon color="red" variant="subtle" onClick={() => removeExperience(idx)}>
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </div>
                                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                                  <TextInput 
                                    label="Job Title" 
                                    placeholder="Senior Developer" 
                                    value={exp.title} 
                                    onChange={(e) => updateExperience(idx, "title", e.target.value)} 
                                    size="sm" 
                                  />
                                  <TextInput 
                                    label="Company" 
                                    placeholder="Google" 
                                    value={exp.company} 
                                    onChange={(e) => updateExperience(idx, "company", e.target.value)} 
                                    size="sm" 
                                  />
                                  <TextInput 
                                    label="Location" 
                                    placeholder="Mountain View, CA" 
                                    value={exp.location} 
                                    onChange={(e) => updateExperience(idx, "location", e.target.value)} 
                                    size="sm" 
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <TextInput 
                                      label="Start Date" 
                                      placeholder="Jan 2020" 
                                      value={exp.startDate} 
                                      onChange={(e) => updateExperience(idx, "startDate", e.target.value)} 
                                      size="sm" 
                                    />
                                    <TextInput 
                                      label="End Date" 
                                      placeholder="Present" 
                                      value={exp.endDate} 
                                      onChange={(e) => updateExperience(idx, "endDate", e.target.value)} 
                                      size="sm" 
                                    />
                                  </div>
                                </SimpleGrid>
                                <Textarea 
                                  label="Description" 
                                  placeholder="Describe your responsibilities and achievements..." 
                                  value={exp.description} 
                                  onChange={(e) => updateExperience(idx, "description", e.target.value)} 
                                  minRows={2} 
                                  size="sm" 
                                  className="mt-2" 
                                />
                              </Card>
                            ))
                          )}
                        </ScrollArea>
                        <Button onClick={addExperience} variant="light" leftSection={<IconPlus size={16} />} size="sm">
                          Add Experience
                        </Button>
                      </Stack>
                    )}

                    {/* Step 2: Education */}
                    {activeStep === 2 && (
                      <Stack gap="sm">
                        <ScrollArea className="h-[400px]" offsetScrollbars>
                          {educations.length === 0 ? (
                            <Card className="bg-gray-50 border border-gray-200 p-4 text-center">
                              <Text c="dimmed" size="sm">No education added yet. Click "Add Education" to start.</Text>
                            </Card>
                          ) : (
                            educations.map((edu, idx) => (
                              <Card key={idx} className="bg-gray-50 border border-gray-200 p-3 sm:p-4 mb-4">
                                <div className="flex justify-between items-center mb-3">
                                  <Text fw={600} size="sm">Education #{idx + 1}</Text>
                                  <ActionIcon color="red" variant="subtle" onClick={() => removeEducation(idx)}>
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </div>
                                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                                  <TextInput 
                                    label="Degree" 
                                    placeholder="B.Tech in Computer Science" 
                                    value={edu.degree} 
                                    onChange={(e) => updateEducation(idx, "degree", e.target.value)} 
                                    size="sm" 
                                  />
                                  <TextInput 
                                    label="Institution" 
                                    placeholder="Stanford University" 
                                    value={edu.institution} 
                                    onChange={(e) => updateEducation(idx, "institution", e.target.value)} 
                                    size="sm" 
                                  />
                                  <TextInput 
                                    label="Year" 
                                    placeholder="2020" 
                                    value={edu.year} 
                                    onChange={(e) => updateEducation(idx, "year", e.target.value)} 
                                    size="sm" 
                                  />
                                  <TextInput 
                                    label="Percentage/CGPA" 
                                    placeholder="85% / 8.5 CGPA" 
                                    value={edu.percentage || ""} 
                                    onChange={(e) => updateEducation(idx, "percentage", e.target.value)} 
                                    size="sm" 
                                  />
                                </SimpleGrid>
                              </Card>
                            ))
                          )}
                        </ScrollArea>
                        <Button onClick={addEducation} variant="light" leftSection={<IconPlus size={16} />} size="sm">
                          Add Education
                        </Button>
                      </Stack>
                    )}

                    {/* Step 3: Skills & Certifications */}
                    {activeStep === 3 && (
                      <Stack gap="sm">
                        <ScrollArea className="h-[400px]" offsetScrollbars>
                          {/* Skills Section */}
                          <div className="mb-6">
                            <Text fw={600} size="md" className="mb-3">Skills</Text>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {skills.map((skill, idx) => (
                                <Badge 
                                  key={idx} 
                                  size="md" 
                                  variant="light" 
                                  color="blue" 
                                  rightSection={
                                    <IconTrash 
                                      size={12} 
                                      className="cursor-pointer ml-1 hover:text-red-500" 
                                      onClick={() => removeSkill(skill)} 
                                    />
                                  }
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {skills.length === 0 && (
                                <Text size="sm" c="dimmed">No skills added yet. Add your skills below.</Text>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <TextInput 
                                placeholder="Add a skill (e.g., React, Python, Project Management)" 
                                value={newSkill} 
                                onChange={(e) => setNewSkill(e.target.value)} 
                                className="flex-1" 
                                onKeyPress={(e) => e.key === "Enter" && addSkill()} 
                                size="sm" 
                              />
                              <Button onClick={addSkill} variant="light" size="sm">
                                <IconPlus size={16} />
                              </Button>
                            </div>
                          </div>

                          <Divider className="my-4" />

                          {/* Certifications Section */}
                          <div>
                            <Text fw={600} size="md" className="mb-3">Certifications</Text>
                            {certifications.length === 0 ? (
                              <Card className="bg-gray-50 border border-gray-200 p-4 text-center">
                                <Text c="dimmed" size="sm">No certifications added yet. Click "Add Certification" to start.</Text>
                              </Card>
                            ) : (
                              certifications.map((cert, idx) => (
                                <Card key={idx} className="bg-gray-50 border border-gray-200 p-3 mb-3">
                                  <div className="flex justify-between items-center mb-3">
                                    <Text fw={500} size="sm">Certification #{idx + 1}</Text>
                                    <ActionIcon color="red" variant="subtle" onClick={() => removeCertification(idx)}>
                                      <IconTrash size={16} />
                                    </ActionIcon>
                                  </div>
                                  <SimpleGrid cols={{ base: 1, md: 2 }} spacing="sm">
                                    <TextInput 
                                      label="Certification Name" 
                                      placeholder="AWS Certified Solutions Architect" 
                                      value={cert.name} 
                                      onChange={(e) => updateCertification(idx, "name", e.target.value)} 
                                      size="sm" 
                                    />
                                    <TextInput 
                                      label="Issuing Organization" 
                                      placeholder="Amazon Web Services" 
                                      value={cert.issuer} 
                                      onChange={(e) => updateCertification(idx, "issuer", e.target.value)} 
                                      size="sm" 
                                    />
                                    <TextInput 
                                      label="Date Earned" 
                                      placeholder="January 2023" 
                                      value={cert.date} 
                                      onChange={(e) => updateCertification(idx, "date", e.target.value)} 
                                      size="sm" 
                                    />
                                  </SimpleGrid>
                                </Card>
                              ))
                            )}
                            <Button onClick={addCertification} variant="light" leftSection={<IconPlus size={16} />} size="sm">
                              Add Certification
                            </Button>
                          </div>
                        </ScrollArea>
                      </Stack>
                    )}

                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))} 
                        disabled={activeStep === 0} 
                        size="sm"
                      >
                        Previous
                      </Button>
                      <Button 
                        onClick={() => setActiveStep(Math.min(3, activeStep + 1))} 
                        disabled={activeStep === 3} 
                        className="bg-blue-600 hover:bg-blue-700" 
                        size="sm"
                      >
                        Next
                      </Button>
                    </div>
                  </Tabs.Panel>

                  {/* Preview Tab - Complete with all sections */}
                  <Tabs.Panel value="preview">
                    <div className="flex flex-col sm:flex-row gap-2 mb-4 justify-end">
                      <Button 
                        onClick={downloadPDF} 
                        loading={downloading} 
                        leftSection={<IconDownload size={16} />} 
                        className="bg-blue-600 hover:bg-blue-700" 
                        size="sm"
                      >
                        Download PDF
                      </Button>
                      <Button 
                        onClick={printResume} 
                        leftSection={<IconPrinter size={16} />} 
                        variant="light" 
                        size="sm"
                      >
                        Print
                      </Button>
                    </div>

                    {/* Resume Preview */}
                    <div 
                      ref={previewRef} 
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                      style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
                    >
                      <div className="max-w-[800px] mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-6 pb-4 border-b border-gray-200">
                          <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {personalInfo.fullName || "Your Name"}
                          </h1>
                          <p className="text-lg text-blue-600 font-medium mb-3">
                            {personalInfo.title || "Professional Title"}
                          </p>
                          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                            {personalInfo.email && (
                              <div className="flex items-center gap-1">
                                <IconMail size={14} /> {personalInfo.email}
                              </div>
                            )}
                            {personalInfo.phone && (
                              <div className="flex items-center gap-1">
                                <IconPhone size={14} /> {personalInfo.phone}
                              </div>
                            )}
                            {personalInfo.location && (
                              <div className="flex items-center gap-1">
                                <IconMapPin size={14} /> {personalInfo.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Professional Summary */}
                        {personalInfo.summary && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-3 text-md border-l-4 border-blue-500 pl-3">
                              Professional Summary
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed pl-3">
                              {personalInfo.summary}
                            </p>
                          </div>
                        )}

                        {/* Work Experience Section */}
                        {experiences.length > 0 && experiences.some(exp => exp.title || exp.company) && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-4 text-md border-l-4 border-blue-500 pl-3">
                              Work Experience
                            </h3>
                            <div className="space-y-4 pl-3">
                              {experiences.map((exp, idx) => (
                                (exp.title || exp.company) && (
                                  <div key={idx} className="mb-4">
                                    <div className="flex flex-wrap justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-semibold text-gray-800">{exp.title || "Position"}</h4>
                                        <p className="text-sm text-gray-600">{exp.company || "Company"}</p>
                                        {exp.location && (
                                          <p className="text-xs text-gray-500 mt-1">{exp.location}</p>
                                        )}
                                      </div>
                                      {(exp.startDate || exp.endDate) && (
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                          {exp.startDate || "Start"} - {exp.endDate || "Present"}
                                        </span>
                                      )}
                                    </div>
                                    {exp.description && (
                                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                        {exp.description}
                                      </p>
                                    )}
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Education Section */}
                        {educations.length > 0 && educations.some(edu => edu.degree || edu.institution) && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-4 text-md border-l-4 border-blue-500 pl-3">
                              Education
                            </h3>
                            <div className="space-y-3 pl-3">
                              {educations.map((edu, idx) => (
                                (edu.degree || edu.institution) && (
                                  <div key={idx} className="flex flex-wrap justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-gray-800">{edu.degree || "Degree"}</h4>
                                      <p className="text-sm text-gray-600">{edu.institution || "Institution"}</p>
                                      {edu.percentage && (
                                        <p className="text-xs text-gray-500 mt-1">Grade: {edu.percentage}</p>
                                      )}
                                    </div>
                                    {edu.year && (
                                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {edu.year}
                                      </span>
                                    )}
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skills Section */}
                        {skills.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-3 text-md border-l-4 border-blue-500 pl-3">
                              Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 pl-3">
                              {skills.map((skill, idx) => (
                                <Badge key={idx} size="md" variant="light" color="blue">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certifications Section */}
                        {certifications.length > 0 && certifications.some(cert => cert.name) && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-800 mb-3 text-md border-l-4 border-blue-500 pl-3">
                              Certifications
                            </h3>
                            <div className="space-y-2 pl-3">
                              {certifications.map((cert, idx) => (
                                cert.name && (
                                  <div key={idx} className="flex flex-wrap justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                                      {cert.issuer && (
                                        <p className="text-xs text-gray-500">{cert.issuer}</p>
                                      )}
                                    </div>
                                    {cert.date && (
                                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        {cert.date}
                                      </span>
                                    )}
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Empty State Message */}
                        {!personalInfo.fullName && !personalInfo.summary && skills.length === 0 && 
                         experiences.length === 0 && educations.length === 0 && (
                          <div className="text-center py-12">
                            <IconFileText size={64} className="text-gray-300 mx-auto mb-4" />
                            <Text size="lg" c="dimmed">No resume data available</Text>
                            <Text size="sm" c="dimmed" mt={2}>
                              Please go to the Build tab and add your information
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>
                  </Tabs.Panel>
                </div>
              </Tabs>
            </Paper>
          </div>
        </div>

        {/* AI Resume Analyzer Card */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl">
                <IconBrain size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-md sm:text-xl font-bold">AI Resume Analyzer</h3>
                <p className="text-xs sm:text-sm opacity-90">Get your resume analyzed with AI-powered insights</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/resume-analyzer")} 
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg" 
              rightSection={<IconArrowRight size={16} />} 
              size="sm"
            >
              Open Analyzer
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResumeBuilder;