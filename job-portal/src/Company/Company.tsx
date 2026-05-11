// import { useState, useEffect } from "react";
// import {
//   Container, Grid, Card, Text, Badge, Button, Group,
//   Avatar, Tabs, Divider, SimpleGrid, Skeleton, Modal,
//   TextInput, Textarea, FileInput, Alert, LoadingOverlay,
//   Paper, ActionIcon, Tooltip, Select, ThemeIcon,
//   Progress, Chip, Stack
// } from "@mantine/core";
// import {
//   IconMapPin, IconWorld, IconBuilding, IconBriefcase,
//   IconSend, IconCheck, IconAlertCircle, IconUpload,
//   IconUser, IconMail, IconPhone, IconCurrencyDollar,
//   IconClock, IconStar, IconUsers, IconCalendar,
//   IconHeart, IconHeartFilled, IconBrandLinkedin,
//   IconBrandGithub, IconGlobe, IconAward, IconTrendingUp,
//   IconDevices, IconRocket, IconShieldCheck, IconSchool,
//   IconX
// } from "@tabler/icons-react";
// import { useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";
// import COMPANY_DATA from "../Data/CompanyData";

// interface Job {
//   id: string;
//   title: string;
//   type: string;
//   location: string;
//   salary: string;
//   posted: string;
//   description: string;
//   skills: string[];
//   requirements?: string[];
//   benefits?: string[];
//   urgentHiring?: boolean;
//   experience?: string;
// }

// interface CompanyProps {
//   jobId?: string | null;
//   jobTitle?: string | null;
//   companyName?: string | null;
//   jobLocation?: string | null;
//   jobSalary?: string | null;
//   jobType?: string | null;
// }

// const Company = ({ jobId, jobTitle, companyName, jobLocation, jobSalary, jobType }: CompanyProps) => {
//   const navigate = useNavigate();
//   const [company, setCompany] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<string | null>("about");
//   const [applyModalOpen, setApplyModalOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [candidateProfile, setCandidateProfile] = useState<any>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [saved, setSaved] = useState(false);
//   const [formProgress, setFormProgress] = useState(0);

//   // Form State
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     currentCompany: "",
//     currentRole: "",
//     experience: "",
//     portfolio: "",
//     linkedin: "",
//     github: "",
//     expectedSalary: "",
//     noticePeriod: "",
//     coverLetter: ""
//   });

//   useEffect(() => {
//     loadCompanyData();
//     loadCandidateProfile();
//   }, []);

//   useEffect(() => {
//     if (company && jobId) {
//       const job = company.jobs?.find((j: Job) => j.id === jobId);
//       if (job) {
//         setSelectedJob(job);
//         setApplyModalOpen(true);
//       } else {
//         // Create a job object from URL params if not found in company jobs
//         const customJob: Job = {
//           id: jobId,
//           title: jobTitle || "Position",
//           type: jobType || "Full-time",
//           location: jobLocation || company.location,
//           salary: jobSalary || "Negotiable",
//           posted: "Just now",
//           description: "",
//           skills: [],
//           experience: "Not specified"
//         };
//         setSelectedJob(customJob);
//         setApplyModalOpen(true);
//       }
//     }
//   }, [company, jobId]);

//   // Calculate form progress
//   useEffect(() => {
//     const filledFields = Object.values(formData).filter(v => v && v.toString().trim() !== "").length;
//     const totalFields = 7;
//     setFormProgress(Math.min(Math.round((filledFields / totalFields) * 100), 100));
//   }, [formData]);

//   const loadCompanyData = () => {
//     setTimeout(() => {
//       setCompany(COMPANY_DATA);
//       setLoading(false);
//     }, 800);
//   };

//   const loadCandidateProfile = () => {
//     const storedProfile = localStorage.getItem('candidate_profile');
//     if (storedProfile) {
//       const profile = JSON.parse(storedProfile);
//       setCandidateProfile(profile);
//       setFormData(prev => ({
//         ...prev,
//         fullName: profile.fullName || "",
//         email: profile.email || "",
//         phone: profile.phone || "",
//       }));
//     } else {
//       const defaultProfile = {
//         id: "candidate_" + Date.now(),
//         fullName: "",
//         email: "",
//         phone: "",
//         skills: []
//       };
//       setCandidateProfile(defaultProfile);
//     }
//   };

//   const handleApplyClick = (job: Job) => {
//     setSelectedJob(job);
//     setApplyModalOpen(true);
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmitApplication = async () => {
//     if (!formData.fullName || !formData.email) {
//       notifications.show({
//         title: 'Missing Information',
//         message: 'Please fill in your name and email',
//         color: 'red'
//       });
//       return;
//     }

//     if (!resumeFile && !candidateProfile?.resumeName) {
//       notifications.show({
//         title: 'Resume Required',
//         message: 'Please upload your resume',
//         color: 'red'
//       });
//       return;
//     }

//     setSubmitting(true);
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     try {
//       const newApplication = {
//         id: Date.now().toString(),
//         jobId: selectedJob?.id,
//         jobTitle: selectedJob?.title,
//         company: company?.name,
//         candidateName: formData.fullName,
//         candidateEmail: formData.email,
//         candidatePhone: formData.phone,
//         currentCompany: formData.currentCompany,
//         currentRole: formData.currentRole,
//         experience: formData.experience,
//         portfolio: formData.portfolio,
//         linkedin: formData.linkedin,
//         github: formData.github,
//         expectedSalary: formData.expectedSalary,
//         noticePeriod: formData.noticePeriod,
//         coverLetter: formData.coverLetter,
//         resumeName: resumeFile?.name || candidateProfile?.resumeName || "resume.pdf",
//         appliedDate: new Date().toISOString(),
//         status: 'pending'
//       };

//       // Save to recruiter's applications
//       const recruiterApps = localStorage.getItem('job_applications');
//       const existingRecruiterApps = recruiterApps ? JSON.parse(recruiterApps) : [];
//       existingRecruiterApps.push(newApplication);
//       localStorage.setItem('job_applications', JSON.stringify(existingRecruiterApps));

//       // Save to candidate's applications
//       const candidateApps = localStorage.getItem('candidate_applications');
//       const existingCandidateApps = candidateApps ? JSON.parse(candidateApps) : [];
//       existingCandidateApps.push({
//         id: Date.now().toString(),
//         jobId: selectedJob?.id,
//         jobTitle: selectedJob?.title,
//         company: company?.name,
//         appliedDate: new Date().toISOString(),
//         status: 'applied',
//         resumeName: resumeFile?.name || candidateProfile?.resumeName || 'resume.pdf'
//       });
//       localStorage.setItem('candidate_applications', JSON.stringify(existingCandidateApps));

//       // Create notification
//       const notificationsList = localStorage.getItem('candidate_notifications');
//       const existingNotifs = notificationsList ? JSON.parse(notificationsList) : [];
//       existingNotifs.push({
//         id: Date.now().toString(),
//         title: 'Application Submitted! 🎉',
//         message: `You have successfully applied for ${selectedJob?.title} at ${company?.name}.`,
//         type: 'application',
//         read: false,
//         createdAt: new Date().toISOString()
//       });
//       localStorage.setItem('candidate_notifications', JSON.stringify(existingNotifs));

//       notifications.show({
//         title: 'Application Submitted! 🎉',
//         message: `Your application for ${selectedJob?.title} has been sent successfully.`,
//         color: 'green',
//         icon: <IconCheck size={18} />
//       });

//       setApplyModalOpen(false);
//       setSelectedJob(null);
//       navigate('/candidate/dashboard');

//     } catch (error) {
//       notifications.show({
//         title: 'Error',
//         message: 'Failed to submit application. Please try again.',
//         color: 'red'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container size="xl" className="py-8">
//         <Skeleton height={300} radius="xl" className="mb-8" />
//         <Grid gutter="xl">
//           <Grid.Col span={{ base: 12, lg: 8 }}>
//             <Skeleton height={400} radius="xl" />
//           </Grid.Col>
//           <Grid.Col span={{ base: 12, lg: 4 }}>
//             <Skeleton height={500} radius="xl" />
//           </Grid.Col>
//         </Grid>
//       </Container>
//     );
//   }

//   if (!company) {
//     return (
//       <Container size="xl" className="py-20 text-center">
//         <Text size="xl" c="gray">Company not found</Text>
//         <Button onClick={() => navigate('/find-jobs')} className="mt-4">Browse Jobs</Button>
//       </Container>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Hero Section */}
//       <div className="relative h-[35rem] rounded-b-3xl overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src={company.banner || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400"}
//             className="w-full h-full object-cover"
//             alt="Company Banner"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
//         </div>

//         <div className="relative h-full flex items-end pb-12">
//           <Container size="xl" className="px-4 md:px-8">
//             <div className="flex flex-col md:flex-row items-start gap-6">
//               <Avatar
//                 src={company.logo}
//                 size={140}
//                 radius="xl"
//                 className="border-4 border-white shadow-2xl"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 flex-wrap mb-2">
//                   <h1 className="text-3xl md:text-5xl font-bold text-white">{company.name}</h1>
//                   <Badge size="lg" variant="filled" color="blue" className="bg-blue-500">
//                     {company.industry}
//                   </Badge>
//                 </div>
//                 <div className="flex flex-wrap gap-4 text-white/80 text-sm">
//                   <div className="flex items-center gap-1"><IconMapPin size={16} /> {company.location}</div>
//                   <div className="flex items-center gap-1"><IconUsers size={16} /> {company.employees} employees</div>
//                   <div className="flex items-center gap-1"><IconCalendar size={16} /> Founded {company.founded}</div>
//                   <div className="flex items-center gap-1"><IconWorld size={16} /> <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">{company.website}</a></div>
//                 </div>
//               </div>
//               <Tooltip label={saved ? "Saved" : "Save Company"}>
//                 <ActionIcon
//                   variant="filled"
//                   color={saved ? "red" : "white"}
//                   size="xl"
//                   radius="xl"
//                   onClick={() => setSaved(!saved)}
//                   className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
//                 >
//                   {saved ? <IconHeartFilled size={22} /> : <IconHeart size={22} />}
//                 </ActionIcon>
//               </Tooltip>
//             </div>
//           </Container>
//         </div>
//       </div>

//       {/* Main Content */}
//       <Container size="xl" className="px-4 md:px-8 py-8">
//         <Grid gutter="xl">
//           {/* Left Column - Main Content */}
//           <Grid.Col span={{ base: 12, lg: 8 }}>
//             <Card className="bg-white rounded-2xl shadow-sm border border-gray-100" padding="xl">
//               <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills">
//                 <Tabs.List className="mb-6">
//                   <Tabs.Tab value="about">About Company</Tabs.Tab>
//                   <Tabs.Tab value="jobs">Open Positions ({company.jobs?.length || 0})</Tabs.Tab>
//                   <Tabs.Tab value="culture">Culture & Benefits</Tabs.Tab>
//                 </Tabs.List>

//                 {/* About Tab */}
//                 <Tabs.Panel value="about">
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
//                       <p className="text-gray-600 leading-relaxed">{company.mission}</p>
//                     </div>
//                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
//                       <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Vision</h3>
//                       <p className="text-gray-600 leading-relaxed">{company.vision}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-3">About {company.name}</h3>
//                       <p className="text-gray-600 leading-relaxed">{company.about}</p>
//                     </div>
//                     <Divider />
//                     <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
//                       {company.stats?.map((stat: any, i: number) => (
//                         <Card key={i} className="text-center bg-gray-50 border-0" padding="md">
//                           <Text size="xl" fw={700} c="blue">{stat.value}</Text>
//                           <Text size="xs" c="gray" className="uppercase tracking-wide">{stat.label}</Text>
//                         </Card>
//                       ))}
//                     </SimpleGrid>
//                   </div>
//                 </Tabs.Panel>

//                 {/* Jobs Tab */}
//                 <Tabs.Panel value="jobs">
//                   <div className="space-y-4">
//                     {company.jobs?.map((job: Job) => (
//                       <Card key={job.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300" padding="lg">
//                         <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 flex-wrap mb-2">
//                               <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
//                               {job.urgentHiring && (
//                                 <Badge color="red" size="sm" variant="filled" Urgent</Badge>
//                               )}
//                             </div>
//                             <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-500">
//                               <span className="flex items-center gap-1"><IconBriefcase size={14} /> {job.type}</span>
//                               <span className="flex items-center gap-1"><IconMapPin size={14} /> {job.location}</span>
//                               <span className="flex items-center gap-1"><IconCurrencyDollar size={14} /> {job.salary}</span>
//                               <span className="flex items-center gap-1"><IconClock size={14} /> {job.posted}</span>
//                             </div>
//                             <p className="text-gray-600 text-sm">{job.description}</p>
//                             <div className="flex flex-wrap gap-2 mt-3">
//                               {job.skills?.slice(0, 4).map((skill, idx) => (
//                                 <Badge key={idx} variant="light" color="gray" className="bg-gray-100">{skill}</Badge>
//                               ))}
//                             </div>
//                           </div>
//                           <Button
//                             size="md"
//                             radius="xl"
//                             onClick={() => handleApplyClick(job)}
//                             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 min-w-[120px]"
//                           >
//                             Apply Now
//                           </Button>
//                         </div>
//                       </Card>
//                     ))}
//                   </div>
//                 </Tabs.Panel>

//                 {/* Culture Tab */}
//                 <Tabs.Panel value="culture">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <Card className="bg-gradient-to-br from-green-50 to-teal-50">
//                       <ThemeIcon size="lg" radius="xl" className="bg-green-500 text-white mb-3">
//                         <IconAward size={22} />
//                       </ThemeIcon>
//                       <Text fw={600} className="mb-1">Learning & Development</Text>
//                       <Text size="sm" c="gray">$5,000 annual learning budget, conferences, courses</Text>
//                     </Card>
//                     <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
//                       <ThemeIcon size="lg" radius="xl" className="bg-blue-500 text-white mb-3">
//                         <IconDevices size={22} />
//                       </ThemeIcon>
//                       <Text fw={600} className="mb-1">Work From Home</Text>
//                       <Text size="sm" c="gray">Flexible remote work options & home office stipend</Text>
//                     </Card>
//                     <Card className="bg-gradient-to-br from-orange-50 to-red-50">
//                       <ThemeIcon size="lg" radius="xl" className="bg-orange-500 text-white mb-3">
//                         <IconShieldCheck size={22} />
//                       </ThemeIcon>
//                       <Text fw={600} className="mb-1">Health Insurance</Text>
//                       <Text size="sm" c="gray">Comprehensive medical, dental & vision coverage</Text>
//                     </Card>
//                     <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
//                       <ThemeIcon size="lg" radius="xl" className="bg-purple-500 text-white mb-3">
//                         <IconRocket size={22} />
//                       </ThemeIcon>
//                       <Text fw={600} className="mb-1">Growth Opportunities</Text>
//                       <Text size="sm" c="gray">Fast promotions, mentorship programs & career path</Text>
//                     </Card>
//                   </div>
//                 </Tabs.Panel>
//               </Tabs>
//             </Card>
//           </Grid.Col>

//           {/* Right Column - Sidebar */}
//           <Grid.Col span={{ base: 12, lg: 4 }}>
//             {/* Company Stats Card */}
//             <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg mb-6" padding="lg">
//               <Text size="lg" fw={700} className="mb-4">Why Join {company.name}?</Text>
//               <Stack gap="md">
//                 <div className="flex items-center gap-3"><IconTrendingUp size={20} /> Industry Leader</div>
//                 <div className="flex items-center gap-3"><IconUsers size={20} /> Great Work Culture</div>
//                 <div className="flex items-center gap-3"><IconCurrencyDollar size={20} /> Competitive Salary</div>
//                 <div className="flex items-center gap-3"><IconClock size={20} /> Work-Life Balance</div>
//                 <div className="flex items-center gap-3"><IconSchool size={20} /> Learning Opportunities</div>
//               </Stack>
//             </Card>

//             {/* Contact Card */}
//             <Card className="bg-white rounded-2xl shadow-sm border border-gray-100" padding="lg">
//               <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
//                   <IconMail size={18} className="text-blue-500" />
//                   <a href={`mailto:${company.email}`} className="text-gray-600 hover:text-blue-600">{company.email}</a>
//                 </div>
//                 <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
//                   <IconPhone size={18} className="text-blue-500" />
//                   <a href={`tel:${company.phone}`} className="text-gray-600 hover:text-blue-600">{company.phone}</a>
//                 </div>
//                 <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
//                   <IconMapPin size={18} className="text-blue-500" />
//                   <span className="text-gray-600">{company.headquarters}</span>
//                 </div>
//               </div>
//               <Divider className="my-4" />
//               <div className="flex gap-2 justify-center">
//                 <ActionIcon component="a" href={company.social?.linkedin} target="_blank" size="lg" variant="light" color="blue">
//                   <IconBrandLinkedin size={18} />
//                 </ActionIcon>
//                 <ActionIcon component="a" href={company.social?.github} target="_blank" size="lg" variant="light" color="dark">
//                   <IconBrandGithub size={18} />
//                 </ActionIcon>
//                 <ActionIcon component="a" href="#" target="_blank" size="lg" variant="light" color="blue">
//                   <IconGlobe size={18} />
//                 </ActionIcon>
//               </div>
//             </Card>
//           </Grid.Col>
//         </Grid>
//       </Container>

//       {/* Modern Apply Modal */}
//       <Modal
//         opened={applyModalOpen}
//         onClose={() => {
//           setApplyModalOpen(false);
//           setSelectedJob(null);
//         }}
//         size="lg"
//         radius="lg"
//         padding={0}
//         centered
//         withCloseButton={false}
//       >
//         <div className="relative">
//           {/* Modal Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white rounded-t-lg">
//             <div className="flex justify-between items-start">
//               <div>
//                 <Text size="sm" className="text-blue-100">Apply for Position</Text>
//                 <Text size="xl" fw={700}>{selectedJob?.title}</Text>
//                 <Text size="sm" className="text-blue-100 mt-1">{company?.name} • {selectedJob?.location}</Text>
//               </div>
//               <ActionIcon
//                 variant="transparent"
//                 onClick={() => setApplyModalOpen(false)}
//                 color="white"
//               >
//                 <IconX size={20} />
//               </ActionIcon>
//             </div>
//           </div>

//           {/* Job Summary Badges */}
//           <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-b">
//             <Badge size="lg" variant="light" color="blue">{selectedJob?.type}</Badge>
//             <Badge size="lg" variant="light" color="green">{selectedJob?.salary}</Badge>
//             <Badge size="lg" variant="light" color="orange">{selectedJob?.experience || "Not specified"}</Badge>
//           </div>

//           {/* Form Progress */}
//           <div className="p-5 border-b">
//             <div className="flex justify-between text-sm mb-2">
//               <span>Application Progress</span>
//               <span className="font-semibold text-blue-600">{formProgress}%</span>
//             </div>
//             <Progress value={formProgress} color="blue" size="sm" radius="xl" />
//           </div>

//           {/* Form Fields */}
//           <div className="p-5 max-h-[60vh] overflow-y-auto">
//             <LoadingOverlay visible={submitting} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <TextInput
//                 label="Full Name *"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={(e) => handleInputChange('fullName', e.target.value)}
//                 leftSection={<IconUser size={16} />}
//                 required
//               />
//               <TextInput
//                 label="Email Address *"
//                 placeholder="your@email.com"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 leftSection={<IconMail size={16} />}
//                 required
//               />
//               <TextInput
//                 label="Phone Number"
//                 placeholder="+1 234 567 8900"
//                 value={formData.phone}
//                 onChange={(e) => handleInputChange('phone', e.target.value)}
//                 leftSection={<IconPhone size={16} />}
//               />
//               <TextInput
//                 label="Current Company"
//                 placeholder="Your current employer"
//                 value={formData.currentCompany}
//                 onChange={(e) => handleInputChange('currentCompany', e.target.value)}
//               />
//               <TextInput
//                 label="Current Role"
//                 placeholder="Your current position"
//                 value={formData.currentRole}
//                 onChange={(e) => handleInputChange('currentRole', e.target.value)}
//               />
//               <Select
//                 label="Years of Experience"
//                 placeholder="Select experience"
//                 data={['0-1 years', '1-3 years', '3-5 years', '5-7 years', '7-10 years', '10+ years']}
//                 value={formData.experience}
//                 onChange={(value) => handleInputChange('experience', value || '')}
//               />
//               <TextInput
//                 label="Expected Salary"
//                 placeholder="e.g., $80,000 - $100,000"
//                 value={formData.expectedSalary}
//                 onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
//                 leftSection={<IconCurrencyDollar size={16} />}
//               />
//               <Select
//                 label="Notice Period"
//                 placeholder="Select notice period"
//                 data={['Immediate', '15 Days', '30 Days', '45 Days', '60 Days', '90 Days']}
//                 value={formData.noticePeriod}
//                 onChange={(value) => handleInputChange('noticePeriod', value || '')}
//               />
//             </div>

//             <div className="mb-4">
//               <TextInput
//                 label="LinkedIn Profile"
//                 placeholder="linkedin.com/in/username"
//                 value={formData.linkedin}
//                 onChange={(e) => handleInputChange('linkedin', e.target.value)}
//                 leftSection={<IconBrandLinkedin size={16} className="text-blue-600" />}
//               />
//             </div>

//             <div className="mb-4">
//               <FileInput
//                 label="Upload Resume/CV *"
//                 placeholder="Upload your resume (PDF, DOC, DOCX)"
//                 accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                 leftSection={<IconUpload size={16} />}
//                 value={resumeFile}
//                 onChange={setResumeFile}
//                 description="Max file size: 5MB. Supported formats: PDF, DOC, DOCX"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <Textarea
//                 label="Cover Letter"
//                 placeholder="Why are you interested in this position? What makes you a great fit? Tell us about your experience and motivation..."
//                 value={formData.coverLetter}
//                 onChange={(e) => handleInputChange('coverLetter', e.target.value)}
//                 minRows={4}
//               />
//             </div>

//             <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light">
//               <Text size="xs">By submitting this application, you agree to share your information with {company?.name} for recruitment purposes.</Text>
//             </Alert>
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex gap-3 p-5 border-t bg-gray-50 rounded-b-lg">
//             <Button
//               fullWidth
//               variant="light"
//               onClick={() => setApplyModalOpen(false)}
//               size="md"
//             >
//               Cancel
//             </Button>
//             <Button
//               fullWidth
//               loading={submitting}
//               onClick={handleSubmitApplication}
//               className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//               size="md"
//               leftSection={<IconSend size={18} />}
//             >
//               Submit Application
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Company;
