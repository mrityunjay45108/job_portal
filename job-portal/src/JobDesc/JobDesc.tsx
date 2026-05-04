// import { useState, useEffect } from "react";
// import { Button, Badge, Divider, Avatar, Skeleton, Alert } from "@mantine/core";
// import { IconMapPin, IconClock, IconBriefcase, IconCurrencyDollar, IconCheck, IconAlertCircle } from "@tabler/icons-react";
// import { useParams, useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";
// // import AboutCompany from "../Company/AboutCompany";

// interface Job {
//   id: string;
//   jobTitle: string;
//   company: string;
//   location: string;
//   salary: string;
//   jobType: string;
//   experience: string;
//   posted: string;
//   applicants: number;
//   description: string;
//   responsibilities?: string[];
//   qualifications?: string[];
//   skills?: string[];
//   urgentHiring?: boolean;
//   companyWebsite?: string;
//   companyEmail?: string;
//   companyPhone?: string;
//   companyEmployees?: string;
//   companyFounded?: string;
//   companyHeadquarters?: string;
// }

// const JobDesc = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState<Job | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [applying, setApplying] = useState(false);
//   const [candidateProfile, setCandidateProfile] = useState<any>(null);

//   useEffect(() => {
//     loadJob();
//     loadCandidateProfile();
//   }, [id]);

//   const loadJob = () => {
//     setLoading(true);
//     const storedJobs = localStorage.getItem('jobs');
//     const storedRecruiterJobs = localStorage.getItem('recruiter_jobs');
    
//     let allJobs: Job[] = [];
    
//     if (storedJobs) {
//       allJobs = [...allJobs, ...JSON.parse(storedJobs)];
//     }
//     if (storedRecruiterJobs) {
//       const recruiterJobs = JSON.parse(storedRecruiterJobs);
//       const activeJobs = recruiterJobs.filter((job: any) => job.status === 'active');
//       allJobs = [...allJobs, ...activeJobs];
//     }
    
//     const foundJob = allJobs.find(job => job.id === id);
//     setJob(foundJob || null);
//     setLoading(false);
//   };

//   const loadCandidateProfile = () => {
//     const storedProfile = localStorage.getItem('candidate_profile');
//     if (storedProfile) {
//       setCandidateProfile(JSON.parse(storedProfile));
//     } else {
//       const defaultProfile = {
//         id: "candidate_" + Date.now(),
//         fullName: "",
//         email: "",
//         phone: "",
//         skills: [],
//         resumeName: ""
//       };
//       setCandidateProfile(defaultProfile);
//       localStorage.setItem('candidate_profile', JSON.stringify(defaultProfile));
//     }
//   };

//   const handleApplyNow = async () => {
//     if (!candidateProfile || !candidateProfile.fullName) {
//       notifications.show({
//         title: 'Profile Required',
//         message: 'Please complete your profile before applying',
//         color: 'orange',
//         icon: <IconAlertCircle size={16} />
//       });
//       navigate('/profile');
//       return;
//     }

//     if (!job) return;

//     setApplying(true);

//     // Check if already applied
//     const existingApplications = localStorage.getItem('candidate_applications');
//     const applications = existingApplications ? JSON.parse(existingApplications) : [];
//     const alreadyApplied = applications.some((app: any) => app.jobId === job.id);

//     if (alreadyApplied) {
//       notifications.show({
//         title: 'Already Applied',
//         message: `You have already applied for ${job.jobTitle}`,
//         color: 'orange'
//       });
//       setApplying(false);
//       return;
//     }

//     // Create new application
//     const newApplication = {
//       id: Date.now().toString(),
//       jobId: job.id,
//       jobTitle: job.jobTitle,
//       company: job.company,
//       appliedDate: new Date().toISOString(),
//       status: 'applied',
//       resumeName: candidateProfile.resumeName || 'resume.pdf',
//     };

//     // Save to candidate applications
//     applications.push(newApplication);
//     localStorage.setItem('candidate_applications', JSON.stringify(applications));

//     // Save to recruiter's job applications
//     const recruiterApps = localStorage.getItem('job_applications');
//     const existingRecruiterApps = recruiterApps ? JSON.parse(recruiterApps) : [];
//     existingRecruiterApps.push({
//       ...newApplication,
//       candidateName: candidateProfile.fullName,
//       candidateEmail: candidateProfile.email,
//       candidatePhone: candidateProfile.phone,
//     });
//     localStorage.setItem('job_applications', JSON.stringify(existingRecruiterApps));

//     // Update job applicants count
//     const updatedJobs = allJobs.map(j => {
//       if (j.id === job.id) {
//         return { ...j, applicants: (j.applicants || 0) + 1 };
//       }
//       return j;
//     });
//     localStorage.setItem('jobs', JSON.stringify(updatedJobs));
//     localStorage.setItem('recruiter_jobs', JSON.stringify(updatedJobs));

//     // Create notification
//     const notificationsList = localStorage.getItem('candidate_notifications');
//     const existingNotifs = notificationsList ? JSON.parse(notificationsList) : [];
//     const newNotification = {
//       id: Date.now().toString(),
//       title: 'Application Submitted!',
//       message: `You have successfully applied for ${job.jobTitle} at ${job.company}.`,
//       type: 'application',
//       read: false,
//       createdAt: new Date().toISOString()
//     };
//     localStorage.setItem('candidate_notifications', JSON.stringify([newNotification, ...existingNotifs]));

//     notifications.show({
//       title: 'Application Submitted! 🎉',
//       message: `Your application for ${job.jobTitle} has been sent successfully.`,
//       color: 'green',
//       icon: <IconCheck size={16} />
//     });

//     setApplying(false);
//     navigate('/candidate/dashboard');
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <Skeleton height={400} radius="lg" />
//           </div>
//           <div>
//             <Skeleton height={500} radius="lg" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <Alert icon={<IconAlertCircle size={16} />} color="red" title="Job Not Found">
//           The job you're looking for doesn't exist or has been removed.
//         </Alert>
//         <Button 
//           onClick={() => navigate('/find-jobs')} 
//           className="mt-4 bg-blue-600 hover:bg-blue-700"
//         >
//           Browse Jobs
//         </Button>
//       </div>
//     );
//   }

//   const allJobs: Job[] = []; // This should be fetched properly

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Left Column - Job Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Job Header */}
//           <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{job.jobTitle}</h1>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Avatar size="sm" radius="xl" className="bg-blue-100 text-blue-600">
//                     {job.company?.[0]}
//                   </Avatar>
//                   <span className="text-gray-600 font-medium">{job.company}</span>
//                 </div>
//               </div>
//               {job.urgentHiring && (
//                 <Badge color="red" size="lg" variant="filled" className="animate-pulse">
//                   ⚡ Urgent Hiring
//                 </Badge>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-4 mt-4 pb-4 border-b border-gray-100">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconMapPin size={18} className="text-gray-400" />
//                 <span>{job.location}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconBriefcase size={18} className="text-gray-400" />
//                 <span>{job.jobType}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconCurrencyDollar size={18} className="text-gray-400" />
//                 <span>{job.salary}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconClock size={18} className="text-gray-400" />
//                 <span>Posted {job.posted}</span>
//               </div>
//             </div>

//             {/* Apply Button at Top */}
//             <div className="mt-4">
//               <Button
//                 fullWidth
//                 size="lg"
//                 loading={applying}
//                 onClick={handleApplyNow}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//               >
//                 {applying ? "Applying..." : "Apply Now"}
//               </Button>
//             </div>
//           </div>

//           {/* Job Description */}
//           <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
//             <p className="text-gray-600 leading-relaxed">{job.description}</p>
//           </div>

//           {/* Responsibilities */}
//           {job.responsibilities && job.responsibilities.length > 0 && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
//               <ul className="space-y-2">
//                 {job.responsibilities.map((resp, index) => (
//                   <li key={index} className="flex items-start gap-2 text-gray-600">
//                     <span className="text-blue-500 mt-1">•</span>
//                     <span>{resp}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Qualifications */}
//           {job.qualifications && job.qualifications.length > 0 && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Qualifications</h2>
//               <ul className="space-y-2">
//                 {job.qualifications.map((qual, index) => (
//                   <li key={index} className="flex items-start gap-2 text-gray-600">
//                     <span className="text-green-500 mt-1">✓</span>
//                     <span>{qual}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Required Skills */}
//           {job.skills && job.skills.length > 0 && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
//               <div className="flex flex-wrap gap-2">
//                 {job.skills.map((skill, index) => (
//                   <Badge key={index} size="lg" variant="light" color="blue" className="bg-blue-50 text-blue-700">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Experience */}
//           {job.experience && (
//             <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Experience Required</h2>
//               <p className="text-gray-600">{job.experience}</p>
//             </div>
//           )}
//         </div>

//         {/* Right Column - Sidebar */}
//         <div className="space-y-6">
//           {/* About Company Component */}
//           <AboutCompany 
//             company={{
//               employees: job.companyEmployees,
//               founded: job.companyFounded,
//               headquarters: job.companyHeadquarters,
//               website: job.companyWebsite,
//               officeLocations: "Multiple Locations",
//               name: job.company,
//               email: job.companyEmail,
//               phone: job.companyPhone
//             }}
//             onApplyClick={handleApplyNow}
//             jobId={job.id}
//             jobTitle={job.jobTitle}
//           />

//           {/* Job Summary Card */}
//           <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md">
//             <h3 className="font-bold text-lg text-gray-900 mb-4">Job Summary</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Job Type:</span>
//                 <span className="font-medium text-gray-900">{job.jobType}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Experience:</span>
//                 <span className="font-medium text-gray-900">{job.experience || "Not specified"}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Salary:</span>
//                 <span className="font-medium text-blue-600">{job.salary}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Location:</span>
//                 <span className="font-medium text-gray-900">{job.location}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Applicants:</span>
//                 <span className="font-medium text-gray-900">{job.applicants || 0}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Posted:</span>
//                 <span className="font-medium text-gray-900">{job.posted}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDesc;