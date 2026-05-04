// import { useState } from "react";
// import { 
//   Button, TextInput, Textarea, Divider, Text, Paper, 
//   Select, MultiSelect, SimpleGrid, Stack, Title, 
//   ThemeIcon, Container, Card, Badge, Box, Stepper,
//   NumberInput, Switch, Group, Progress,
//   FileInput, Alert, LoadingOverlay
// } from "@mantine/core";
// import { 
//   IconSend, IconBriefcase, IconCurrencyDollar, 
//   IconMapPin, IconCertificate, IconAlignLeft, IconCheck,
//   IconDeviceLaptop, IconClock, IconBuilding, IconUsers,
//   IconRocket, IconShield, IconStar, IconTrendingUp,
//   IconWorld, IconUpload, IconFileText,
//   IconCalendar, IconMedal, IconList, IconMessage
// } from "@tabler/icons-react";
// import { useForm } from "@mantine/form";
// import { notifications } from "@mantine/notifications";
// import { DatePickerInput } from '@mantine/dates';

// // Add this interface
// interface PostJobFormProps {
//   onSuccess?: () => void;
// }

// interface JobFormValues {
//   title: string;
//   department: string;
//   company: string;
//   companyWebsite: string;
//   companySize: string;
//   industry: string;
//   jobType: string;
//   location: string;
//   locationType: string;
//   experience: string;
//   salaryMin: number;
//   salaryMax: number;
//   salaryType: string;
//   skills: string[];
//   overview: string;
//   responsibilities: string[];
//   qualifications: string[];
//   benefits: string[];
//   remotePolicy: string;
//   urgentHiring: boolean;
//   featuredJob: boolean;
//   hideSalary: boolean;
//   visaSponsorship: boolean;
//   applicationDeadline: Date | null;
//   openings: number;
//   education: string;
//   workAuth: string[];
//   languages: string[];
// }

// // Change the function signature to accept props
// export default function PostJobForm({ onSuccess }: PostJobFormProps) {
//   const [submitting, setSubmitting] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
//   const [featuredImage, setFeaturedImage] = useState<File | null>(null);

//   const form = useForm<JobFormValues>({
//     initialValues: {
//       title: "",
//       department: "",
//       company: "",
//       companyWebsite: "",
//       companySize: "",
//       industry: "",
//       jobType: "",
//       location: "",
//       locationType: "On-site",
//       experience: "",
//       salaryMin: 50000,
//       salaryMax: 80000,
//       salaryType: "yearly",
//       skills: [],
//       overview: "",
//       responsibilities: [],
//       qualifications: [],
//       benefits: [],
//       remotePolicy: "",
//       urgentHiring: false,
//       featuredJob: false,
//       hideSalary: false,
//       visaSponsorship: false,
//       applicationDeadline: null,
//       openings: 1,
//       education: "",
//       workAuth: [],
//       languages: [],
//     },
//     validate: {
//       title: (value) => (value && value.length < 5 ? "Job title must be at least 5 characters" : null),
//       company: (value) => (!value ? "Company name is required" : null),
//       overview: (value) => (value && value.length < 50 ? "Please provide a detailed overview (min 50 chars)" : null),
//       salaryMin: (value) => (value && value <= 0 ? "Minimum salary is required" : null),
//       salaryMax: (value, values) => (value && values && value <= values.salaryMin ? "Maximum salary must be greater than minimum" : null),
//     },
//   });

//   const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary'];
//   const locationTypes = ['On-site', 'Remote', 'Hybrid', 'Travel Required'];
//   const experienceLevels = [
//     'Entry Level (0-2 years)',
//     'Mid Level (3-5 years)', 
//     'Senior Level (6-9 years)',
//     'Lead/Manager (10+ years)',
//     'Executive (15+ years)'
//   ];
//   const companySizes = [
//     'Startup (1-10)',
//     'Small (11-50)',
//     'Medium (51-200)',
//     'Large (201-1000)',
//     'Enterprise (1000+)'
//   ];
//   const industries = [
//     'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
//     'Retail', 'Consulting', 'Media', 'Real Estate', 'Transportation',
//     'Energy', 'Nonprofit', 'Government', 'Aerospace', 'Biotechnology'
//   ];
//   const educationLevels = [
//     "High School Diploma",
//     "Associate's Degree",
//     "Bachelor's Degree",
//     "Master's Degree",
//     "PhD",
//     "MBA",
//     "Certification",
//     "Not Required"
//   ];
//   const workAuthOptions = [
//     "US Citizen",
//     "Green Card Holder",
//     "H-1B Visa",
//     "OPT/CPT",
//     "TN Visa",
//     "Work Permit",
//     "Sponsorship Available"
//   ];
//   const languageOptions = [
//     "English (Fluent)",
//     "Spanish", "French", "German", "Chinese", "Japanese",
//     "Arabic", "Hindi", "Portuguese", "Russian", "Italian"
//   ];

//   const commonSkills = [
//     'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
//     'Java', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB',
//     'PostgreSQL', 'Tailwind CSS', 'Vue.js', 'Angular', 'C#', 'PHP',
//     'Ruby on Rails', 'Swift', 'Kotlin', 'Flutter', 'React Native',
//     'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Cybersecurity',
//     'UI/UX Design', 'Product Management', 'Agile', 'Scrum'
//   ];

//   const responsibilityExamples = [
//     "Lead development of new features and products",
//     "Collaborate with cross-functional teams including product and design",
//     "Write clean, maintainable, and efficient code",
//     "Mentor junior developers and conduct code reviews",
//     "Participate in architectural decisions and technical planning",
//     "Troubleshoot and debug production issues",
//     "Write unit and integration tests",
//     "Document technical specifications"
//   ];

//   const qualificationExamples = [
//     "5+ years of experience in software development",
//     "Strong proficiency in React and TypeScript",
//     "Bachelor's degree in Computer Science or related field",
//     "Excellent problem-solving and analytical skills",
//     "Strong communication and teamwork abilities",
//     "Experience with cloud platforms (AWS/Azure/GCP)",
//     "Knowledge of CI/CD pipelines",
//     "Portfolio of previous work"
//   ];

//   const benefitExamples = [
//     "Competitive salary and equity package",
//     "Comprehensive health, dental, and vision insurance",
//     "401(k) retirement plan with company matching",
//     "Flexible work hours and remote options",
//     "Professional development budget ($5,000/year)",
//     "Generous paid time off and parental leave",
//     "Wellness stipend and gym membership",
//     "Home office setup allowance",
//     "Stock options",
//     "Annual company retreats"
//   ];

//   const calculateProgress = () => {
//     const requiredFields = ['title', 'company', 'jobType', 'overview'];
//     const optionalChecks = [
//       form.values.skills.length > 0,
//       form.values.responsibilities.length > 0,
//       form.values.qualifications.length > 0,
//       form.values.salaryMin > 0,
//       form.values.benefits.length > 0,
//       form.values.applicationDeadline !== null
//     ];
//     const requiredCompleted = requiredFields.filter(field => {
//       const value = form.values[field as keyof JobFormValues];
//       return value && value.toString().length > 0;
//     }).length;
//     const optionalCompleted = optionalChecks.filter(Boolean).length;
//     const total = requiredFields.length + optionalChecks.length;
//     const completed = requiredCompleted + optionalCompleted;
//     return Math.floor((completed / total) * 100);
//   };

//   const handleSubmit = async (values: JobFormValues) => {
//     setSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     // Create job object that matches both formats
//     const newJob = {
//       id: Date.now().toString(),
//       jobTitle: values.title,
//       company: values.company,
//       location: values.location,
//       salary: `$${values.salaryMin.toLocaleString()} - $${values.salaryMax.toLocaleString()}`,
//       jobType: values.jobType,
//       experience: values.experience,
//       posted: 'Just now',
//       postedDate: 'Just now',
//       applicants: 0,
//       description: values.overview,
//       skills: values.skills,
//       requirements: values.qualifications,
//       department: values.department,
//       openings: values.openings,
//       status: 'active',
//       locationType: values.locationType
//     };
    
//     // 1. Save to recruiter_jobs (for Posted Jobs page)
//     const storedRecruiterJobs = localStorage.getItem('recruiter_jobs');
//     const existingRecruiterJobs = storedRecruiterJobs ? JSON.parse(storedRecruiterJobs) : [];
//     localStorage.setItem('recruiter_jobs', JSON.stringify([newJob, ...existingRecruiterJobs]));
    
//     // 2. Save to jobs (for Find Jobs page)
//     const storedJobs = localStorage.getItem('jobs');
//     const existingJobs = storedJobs ? JSON.parse(storedJobs) : [];
//     localStorage.setItem('jobs', JSON.stringify([newJob, ...existingJobs]));
    
//     notifications.show({
//       title: '🎉 Job Posted Successfully!',
//       message: 'Your job listing is now live and visible to candidates.',
//       color: 'green',
//       icon: <IconCheck size={18} />,
//       radius: 'lg',
//     });
    
//     // Call onSuccess callback if provided
//     if (onSuccess) {
//       onSuccess();
//     }
    
//     setSubmitting(false);
//     form.reset();
//     setActiveStep(0);
//   };

//   const nextStep = () => {
//     if (activeStep === 0) {
//       if (!form.values.title || !form.values.company) {
//         notifications.show({
//           title: 'Missing Information',
//           message: 'Please fill in job title and company name to continue',
//           color: 'yellow',
//         });
//         return;
//       }
//     }
//     if (activeStep === 1) {
//       if (!form.values.overview || form.values.responsibilities.length === 0) {
//         notifications.show({
//           title: 'Missing Information',
//           message: 'Please provide job overview and responsibilities',
//           color: 'yellow',
//         });
//         return;
//       }
//     }
//     if (activeStep === 2) {
//       if (form.values.skills.length === 0 || form.values.qualifications.length === 0) {
//         notifications.show({
//           title: 'Missing Information',
//           message: 'Please add required skills and qualifications',
//           color: 'yellow',
//         });
//         return;
//       }
//     }
//     setActiveStep((current) => current + 1);
//   };

//   const prevStep = () => setActiveStep((current) => current - 1);

//   const CompanyBenefits = () => (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mt-4">
//       <div className="flex items-center gap-2 mb-3">
//         <IconMedal size={20} className="text-blue-600" />
//         <Text fw={600} className="text-gray-900">Why candidates love working here</Text>
//       </div>
//       <div className="grid grid-cols-2 gap-3">
//         <div className="flex items-center gap-2 text-sm text-gray-700">
//           <IconCheck size={14} className="text-green-500" /> Remote First Culture
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-700">
//           <IconCheck size={14} className="text-green-500" /> Great Work-Life Balance
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-700">
//           <IconCheck size={14} className="text-green-500" /> Learning & Development
//         </div>
//         <div className="flex items-center gap-2 text-sm text-gray-700">
//           <IconCheck size={14} className="text-green-500" /> Diverse & Inclusive Team
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <Box className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-8">
//       <Container size="xl">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
//             <IconRocket size={32} className="text-white" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             Post a Job Opening
//           </h1>
//           <p className="text-gray-500 max-w-2xl mx-auto">
//             Reach thousands of qualified candidates. Fill in the details below to create an impactful job posting that attracts top talent.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <Card className="bg-white border border-gray-200 rounded-xl text-center p-4">
//             <IconUsers size={24} className="text-blue-600 mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-900">50K+</div>
//             <div className="text-xs text-gray-500">Active Candidates</div>
//           </Card>
//           <Card className="bg-white border border-gray-200 rounded-xl text-center p-4">
//             <IconTrendingUp size={24} className="text-green-600 mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-900">2.5K+</div>
//             <div className="text-xs text-gray-500">Jobs Posted Monthly</div>
//           </Card>
//           <Card className="bg-white border border-gray-200 rounded-xl text-center p-4">
//             <IconClock size={24} className="text-orange-600 mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-900">3 Days</div>
//             <div className="text-xs text-gray-500">Average Time to Hire</div>
//           </Card>
//           <Card className="bg-white border border-gray-200 rounded-xl text-center p-4">
//             <IconStar size={24} className="text-yellow-500 mx-auto mb-2" />
//             <div className="text-2xl font-bold text-gray-900">95%</div>
//             <div className="text-xs text-gray-500">Satisfaction Rate</div>
//           </Card>
//         </div>

//         {/* Main Form with Stepper */}
//         <Paper className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Create Job Posting</h2>
//                 <p className="text-blue-100 text-sm mt-1">Complete all steps to attract the best candidates</p>
//               </div>
//               <Badge size="lg" className="bg-white/20 text-white border-0">
//                 <div className="flex items-center gap-2">
//                   <IconShield size={14} />
//                   <span>Premium Job Posting</span>
//                 </div>
//               </Badge>
//             </div>
//             <Progress value={calculateProgress()} color="white" size="sm" radius="xl" className="mt-4 bg-white/20" />
//             <div className="flex justify-between mt-2 text-xs text-blue-100">
//               <span>Basic Info</span>
//               <span>Description</span>
//               <span>Requirements</span>
//               <span>Review</span>
//             </div>
//           </div>

//           <div className="p-8">
//             <Stepper active={activeStep} onStepClick={setActiveStep} color="blue" className="mb-8">
//               <Stepper.Step label="Company & Role" description="Basic Information" />
//               <Stepper.Step label="Job Details" description="Description & Skills" />
//               <Stepper.Step label="Requirements" description="Qualifications & Benefits" />
//               <Stepper.Step label="Review" description="Final Check" />
//             </Stepper>

//             <form onSubmit={form.onSubmit(handleSubmit)}>
//               <LoadingOverlay visible={submitting} zIndex={1000} overlayProps={{ blur: 2 }} />

//               {/* Step 1: Basic Information */}
//               {activeStep === 0 && (
//                 <Stack gap="xl">
//                   <Alert icon={<IconRocket size={16} />} color="blue" className="bg-blue-50 border-blue-200">
//                     <Text size="sm" className="text-blue-800">Fill in the basic details about the position and your company. A clear job title attracts the right candidates.</Text>
//                   </Alert>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconBriefcase size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Job Information</Title>
//                     </div>
                    
//                     <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
//                       <TextInput
//                         label="Job Title *"
//                         description="Be specific to attract qualified candidates"
//                         placeholder="e.g., Senior Frontend Developer"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('title')}
//                       />
//                       <TextInput
//                         label="Department"
//                         placeholder="e.g., Engineering, Marketing, Sales"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('department')}
//                       />
//                       <Select
//                         label="Job Type *"
//                         description="Select the employment type"
//                         placeholder="Select job type"
//                         data={jobTypes}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('jobType')}
//                       />
//                       <Select
//                         label="Experience Level *"
//                         description="Years of experience required"
//                         placeholder="Select experience level"
//                         data={experienceLevels}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('experience')}
//                       />
//                       <Select
//                         label="Location Type *"
//                         description="Work arrangement"
//                         placeholder="Select work arrangement"
//                         data={locationTypes}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('locationType')}
//                       />
//                       <TextInput
//                         label="Location"
//                         description="City, state, or 'Remote'"
//                         placeholder="e.g., New York, NY or Remote"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('location')}
//                       />
//                       <NumberInput
//                         label="Number of Openings"
//                         description="How many positions are available?"
//                         placeholder="1"
//                         min={1}
//                         max={50}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('openings')}
//                       />
//                       <DatePickerInput
//                         label="Application Deadline"
//                         description="Last date to accept applications"
//                         placeholder="Select deadline"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('applicationDeadline')}
//                       />
//                     </SimpleGrid>
//                   </div>

//                   <Divider />

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconCurrencyDollar size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Compensation</Title>
//                     </div>
                    
//                     <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
//                       <NumberInput
//                         label="Min Salary *"
//                         placeholder="50,000"
//                         min={0}
//                         step={5000}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('salaryMin')}
//                       />
//                       <NumberInput
//                         label="Max Salary *"
//                         placeholder="80,000"
//                         min={0}
//                         step={5000}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('salaryMax')}
//                       />
//                       <Select
//                         label="Salary Type"
//                         data={[
//                           { value: 'yearly', label: 'Per Year' },
//                           { value: 'monthly', label: 'Per Month' },
//                           { value: 'hourly', label: 'Per Hour' }
//                         ]}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('salaryType')}
//                       />
//                     </SimpleGrid>
                    
//                     <Group mt="md">
//                       <Switch
//                         label="Hide salary range"
//                         description="Only show to selected candidates"
//                         {...form.getInputProps('hideSalary', { type: 'checkbox' })}
//                       />
//                     </Group>
//                   </div>

//                   <Divider />

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconBuilding size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Company Information</Title>
//                     </div>
                    
//                     <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
//                       <TextInput
//                         label="Company Name *"
//                         placeholder="e.g., Google, Microsoft"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('company')}
//                       />
//                       <TextInput
//                         label="Company Website"
//                         placeholder="https://example.com"
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('companyWebsite')}
//                       />
//                       <Select
//                         label="Company Size"
//                         placeholder="Select company size"
//                         data={companySizes}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('companySize')}
//                       />
//                       <Select
//                         label="Industry"
//                         placeholder="Select industry"
//                         data={industries}
//                         size="md"
//                         radius="md"
//                         {...form.getInputProps('industry')}
//                       />
//                     </SimpleGrid>

//                     <FileInput
//                       label="Company Logo"
//                       description="Upload your company logo (PNG, JPG)"
//                       placeholder="Click to upload"
//                       leftSection={<IconUpload size={16} />}
//                       accept="image/png,image/jpeg"
//                       className="mt-4"
//                       size="md"
//                       radius="md"
//                       onChange={setFeaturedImage}
//                     />
//                   </div>

//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <div className="flex gap-4 flex-wrap">
//                       <Switch
//                         label="Urgent Hiring"
//                         description="Mark as urgently hiring for priority visibility"
//                         {...form.getInputProps('urgentHiring', { type: 'checkbox' })}
//                       />
//                       <Switch
//                         label="Featured Job"
//                         description="Feature job at the top of search results"
//                         {...form.getInputProps('featuredJob', { type: 'checkbox' })}
//                       />
//                       <Switch
//                         label="Visa Sponsorship"
//                         description="Company offers visa sponsorship"
//                         {...form.getInputProps('visaSponsorship', { type: 'checkbox' })}
//                       />
//                     </div>
//                   </div>
//                 </Stack>
//               )}

//               {/* Step 2: Job Details */}
//               {activeStep === 1 && (
//                 <Stack gap="xl">
//                   <Alert icon={<IconFileText size={16} />} color="blue" className="bg-blue-50 border-blue-200">
//                     <Text size="sm" className="text-blue-800">Write a compelling job description. Focus on impact, growth opportunities, and what makes your role unique.</Text>
//                   </Alert>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconAlignLeft size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Job Overview</Title>
//                     </div>
//                     <Textarea
//                       label="Job Summary *"
//                       description="Provide an overview of the position and what makes it exciting"
//                       placeholder="We're looking for a talented Software Engineer to join our growing team..."
//                       minRows={5}
//                       withAsterisk
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('overview')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconList size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Key Responsibilities</Title>
//                     </div>
//                     <MultiSelect
//                       label="Responsibilities *"
//                       description="Select or type the primary responsibilities"
//                       placeholder="Select from common responsibilities"
//                       data={responsibilityExamples}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('responsibilities')}
//                     />
//                   </div>

//                   <CompanyBenefits />
//                 </Stack>
//               )}

//               {/* Step 3: Requirements */}
//               {activeStep === 2 && (
//                 <Stack gap="xl">
//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconCertificate size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Required Skills</Title>
//                     </div>
//                     <MultiSelect
//                       label="Technical Skills *"
//                       description="Select the key skills required for this position"
//                       placeholder="Search and select skills"
//                       data={commonSkills}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('skills')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconMedal size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Qualifications</Title>
//                     </div>
//                     <MultiSelect
//                       label="Minimum Qualifications *"
//                       description="Select or add qualifications required for this role"
//                       placeholder="Select from common qualifications"
//                       data={qualificationExamples}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('qualifications')}
//                     />
//                     <Select
//                       label="Education Level"
//                       placeholder="Select minimum education"
//                       data={educationLevels}
//                       mt="md"
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('education')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconUsers size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Benefits & Perks</Title>
//                     </div>
//                     <MultiSelect
//                       label="Benefits"
//                       description="What makes your offer attractive?"
//                       placeholder="Select from common benefits"
//                       data={benefitExamples}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('benefits')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconWorld size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Work Authorization</Title>
//                     </div>
//                     <MultiSelect
//                       label="Work Authorization"
//                       description="Select accepted work authorization types"
//                       placeholder="Select options"
//                       data={workAuthOptions}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('workAuth')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconMessage size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Languages</Title>
//                     </div>
//                     <MultiSelect
//                       label="Preferred Languages"
//                       description="Select language requirements"
//                       placeholder="Select languages"
//                       data={languageOptions}
//                       searchable
//                       clearable
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('languages')}
//                     />
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
//                       <IconDeviceLaptop size={20} className="text-blue-600" />
//                       <Title order={3} size="h4" className="text-gray-900 font-semibold">Remote Work Policy</Title>
//                     </div>
//                     <Textarea
//                       label="Remote Work Details"
//                       description="Describe your remote/hybrid work arrangements"
//                       placeholder="We offer flexible remote work options with occasional team meetups..."
//                       minRows={3}
//                       size="md"
//                       radius="md"
//                       {...form.getInputProps('remotePolicy')}
//                     />
//                   </div>
//                 </Stack>
//               )}

//               {/* Step 4: Review */}
//               {activeStep === 3 && (
//                 <Stack gap="xl">
//                   <Alert icon={<IconCheck size={16} />} color="green" className="bg-green-50 border-green-200">
//                     <Text size="sm" className="text-green-800">Review your job posting before publishing. Make sure all information is accurate and complete.</Text>
//                   </Alert>

//                   <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
//                           <IconBuilding size={28} className="text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-xl text-gray-900">{form.values.title || "Senior Software Engineer"}</h3>
//                           <p className="text-sm text-gray-500">{form.values.company || "Tech Company"} • {form.values.location || "Remote"}</p>
//                         </div>
//                       </div>
//                       {form.values.urgentHiring && (
//                         <Badge color="red" size="lg" variant="filled" className="animate-pulse">⚡ Urgent Hiring</Badge>
//                       )}
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       <Badge color="blue" variant="light" size="lg" className="bg-blue-50">
//                         <div className="flex items-center gap-1"><IconBriefcase size={14} /> {form.values.jobType || "Full-time"}</div>
//                       </Badge>
//                       <Badge color="green" variant="light" size="lg" className="bg-green-50">
//                         <div className="flex items-center gap-1"><IconMapPin size={14} /> {form.values.locationType || "Remote"}</div>
//                       </Badge>
//                       <Badge color="orange" variant="light" size="lg" className="bg-orange-50">
//                         <div className="flex items-center gap-1"><IconCurrencyDollar size={14} /> ${form.values.salaryMin?.toLocaleString()} - ${form.values.salaryMax?.toLocaleString()}</div>
//                       </Badge>
//                     </div>

//                     <Text className="text-gray-600 mt-3 leading-relaxed">
//                       {form.values.overview ? form.values.overview.substring(0, 200) : "Join our dynamic team and help us build the future..."}
//                       {form.values.overview && form.values.overview.length > 200 && "..."}
//                     </Text>

//                     <Divider className="my-4" />

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Text size="xs" className="text-gray-500 uppercase tracking-wider mb-2 font-semibold">Skills</Text>
//                         <div className="flex flex-wrap gap-1">
//                           {form.values.skills.slice(0, 4).map((skill, idx) => (
//                             <Badge key={idx} size="sm" variant="light" color="gray">{skill}</Badge>
//                           ))}
//                           {form.values.skills.length > 4 && (
//                             <Badge size="sm" variant="light" color="gray">+{form.values.skills.length - 4}</Badge>
//                           )}
//                         </div>
//                       </div>
//                       <div>
//                         <Text size="xs" className="text-gray-500 uppercase tracking-wider mb-2 font-semibold">Benefits</Text>
//                         <div className="flex flex-wrap gap-1">
//                           {form.values.benefits.slice(0, 3).map((benefit, idx) => (
//                             <Badge key={idx} size="sm" variant="light" color="green">
//                               {benefit.length > 20 ? benefit.substring(0, 20) + '...' : benefit}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                       <div className="flex justify-between items-center">
//                         <Text size="sm" className="text-gray-600">Posting Quality Score</Text>
//                         <Text size="sm" className="text-green-600 font-semibold">{calculateProgress()}% Complete</Text>
//                       </div>
//                       <Progress value={calculateProgress()} color="green" size="sm" radius="xl" mt="xs" />
//                       <Text size="xs" className="text-gray-400 mt-2">
//                         {calculateProgress() === 100 ? "✅ Ready to publish - Your job posting is complete!" : "Complete missing fields to improve visibility"}
//                       </Text>
//                     </div>
//                   </Card>
//                 </Stack>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
//                 <Button
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={activeStep === 0}
//                   className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                   size="lg"
//                   radius="md"
//                 >
//                   Previous
//                 </Button>
                
//                 <div className="flex gap-3">
//                   {activeStep < 3 ? (
//                     <Button
//                       onClick={nextStep}
//                       className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//                       rightSection={<IconSend size={16} />}
//                       size="lg"
//                       radius="md"
//                     >
//                       Continue
//                     </Button>
//                   ) : (
//                     <Button
//                       type="submit"
//                       loading={submitting}
//                       className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
//                       leftSection={<IconRocket size={18} />}
//                       size="lg"
//                       radius="md"
//                     >
//                       Publish Job Posting
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }