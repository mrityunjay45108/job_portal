// import { useState } from "react";
// import { Button, Badge, Pagination, TextInput, Select, Modal, Textarea } from "@mantine/core";
// import { 
//   IconMapPin, IconClock, IconHeart, IconHeartFilled, 
//   IconSearch, IconBriefcase, IconMail, IconPhone, 
//   IconUser, IconFileText, IconSend, IconX 
// } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import { notifications } from "@mantine/notifications";

// interface Job {
//   id: string;
//   title: string;
//   location: string;
//   type: string;
//   salary: string;
//   posted: string;
//   description?: string;
//   skills?: string[];
// }

// interface CompanyJobsProps {
//   jobs: Job[];
//   itemsPerPage?: number;
//   showFilters?: boolean;
//   companyName?: string;
// }

// const CompanyJobs = ({ jobs, itemsPerPage = 5, showFilters = true, companyName = "Company" }: CompanyJobsProps) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [savedJobs, setSavedJobs] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState<string | null>(null);
//   const [filterLocation, setFilterLocation] = useState<string | null>(null);
  
//   // Apply Modal State
//   const [applyModalOpen, setApplyModalOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState<Job | null>(null);
//   const [applicantName, setApplicantName] = useState("");
//   const [applicantEmail, setApplicantEmail] = useState("");
//   const [applicantPhone, setApplicantPhone] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const toggleSave = (jobId: string) => {
//     if (savedJobs.includes(jobId)) {
//       setSavedJobs(savedJobs.filter(id => id !== jobId));
//       notifications.show({
//         title: 'Removed',
//         message: 'Job removed from saved list',
//         color: 'blue'
//       });
//     } else {
//       setSavedJobs([...savedJobs, jobId]);
//       notifications.show({
//         title: 'Saved',
//         message: 'Job saved successfully',
//         color: 'green'
//       });
//     }
//   };

//   const isSaved = (jobId: string) => savedJobs.includes(jobId);

//   // Filter jobs
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = searchTerm === "" || 
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.location.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesType = !filterType || job.type === filterType;
//     const matchesLocation = !filterLocation || job.location === filterLocation;
//     return matchesSearch && matchesType && matchesLocation;
//   });

//   // Get unique locations and types for filters
//   const uniqueLocations = [...new Set(jobs.map(job => job.location))];
//   const uniqueTypes = [...new Set(jobs.map(job => job.type))];

//   const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

//   // Reset page when filters change
//   const handleFilterChange = () => {
//     setCurrentPage(1);
//   };

//   const handleApplyClick = (job: Job) => {
//     setSelectedJob(job);
//     setApplyModalOpen(true);
//   };

//   const handleSubmitApplication = () => {
//     if (!applicantName || !applicantEmail) {
//       notifications.show({
//         title: 'Missing Information',
//         message: 'Please fill in your name and email',
//         color: 'red'
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate API call
//     setTimeout(() => {
//       // Save application to localStorage
//       const applications = localStorage.getItem('job_applications');
//       const existingApplications = applications ? JSON.parse(applications) : [];
      
//       const newApplication = {
//         id: Date.now().toString(),
//         jobId: selectedJob?.id,
//         jobTitle: selectedJob?.title,
//         company: companyName,
//         candidateName: applicantName,
//         candidateEmail: applicantEmail,
//         candidatePhone: applicantPhone,
//         coverLetter: coverLetter,
//         appliedDate: new Date().toISOString(),
//         status: 'pending'
//       };
      
//       existingApplications.push(newApplication);
//       localStorage.setItem('job_applications', JSON.stringify(existingApplications));
      
//       // Also save to candidate applications
//       const candidateApps = localStorage.getItem('candidate_applications');
//       const existingCandidateApps = candidateApps ? JSON.parse(candidateApps) : [];
//       existingCandidateApps.push({
//         id: Date.now().toString(),
//         jobId: selectedJob?.id,
//         jobTitle: selectedJob?.title,
//         company: companyName,
//         appliedDate: new Date().toISOString(),
//         status: 'applied',
//         resumeName: 'Uploaded_Resume.pdf'
//       });
//       localStorage.setItem('candidate_applications', JSON.stringify(existingCandidateApps));
      
//       notifications.show({
//         title: 'Application Submitted! 🎉',
//         message: `Your application for ${selectedJob?.title} has been sent successfully.`,
//         color: 'green'
//       });
      
//       // Reset form
//       setApplicantName("");
//       setApplicantEmail("");
//       setApplicantPhone("");
//       setCoverLetter("");
//       setApplyModalOpen(false);
//       setIsSubmitting(false);
//       setSelectedJob(null);
//     }, 1500);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-gray-200">
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <IconBriefcase size={24} className="text-blue-600" />
//             <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Open Positions</h3>
//           </div>
//           <p className="text-gray-500">Join our growing team and shape the future</p>
//         </div>
//         <Badge size="xl" variant="light" color="blue" className="bg-blue-50 text-blue-600 px-4 py-2">
//           {filteredJobs.length} Jobs Available
//         </Badge>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
//           <div className="flex flex-wrap gap-4 items-end">
//             <div className="flex-1 min-w-[200px]">
//               <TextInput
//                 placeholder="Search jobs..."
//                 leftSection={<IconSearch size={16} className="text-gray-400" />}
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   handleFilterChange();
//                 }}
//                 classNames={{
//                   input: "bg-white border-gray-200 focus:border-blue-400"
//                 }}
//               />
//             </div>
//             <div className="w-40">
//               <Select
//                 placeholder="Job Type"
//                 data={uniqueTypes}
//                 value={filterType}
//                 onChange={(val) => {
//                   setFilterType(val);
//                   handleFilterChange();
//                 }}
//                 clearable
//                 classNames={{
//                   input: "bg-white border-gray-200"
//                 }}
//               />
//             </div>
//             <div className="w-44">
//               <Select
//                 placeholder="Location"
//                 data={uniqueLocations}
//                 value={filterLocation}
//                 onChange={(val) => {
//                   setFilterLocation(val);
//                   handleFilterChange();
//                 }}
//                 clearable
//                 classNames={{
//                   input: "bg-white border-gray-200"
//                 }}
//               />
//             </div>
//             {(searchTerm || filterType || filterLocation) && (
//               <Button
//                 variant="subtle"
//                 color="gray"
//                 onClick={() => {
//                   setSearchTerm("");
//                   setFilterType(null);
//                   setFilterLocation(null);
//                   setCurrentPage(1);
//                 }}
//                 size="sm"
//               >
//                 Clear Filters
//               </Button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Jobs List */}
//       {filteredJobs.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
//           <div className="text-6xl mb-4">🔍</div>
//           <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
//           <Button
//             variant="light"
//             color="blue"
//             onClick={() => {
//               setSearchTerm("");
//               setFilterType(null);
//               setFilterLocation(null);
//             }}
//             className="mt-4"
//           >
//             Clear Filters
//           </Button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {paginatedJobs.map((job) => (
//             <div
//               key={job.id}
//               className="group bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
//             >
//               <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <Link to={`/job/${job.id}`}>
//                         <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                           {job.title}
//                         </h4>
//                       </Link>
//                       <div className="flex flex-wrap items-center gap-2 mt-2">
//                         <Badge size="md" variant="light" color="blue" className="bg-blue-50 text-blue-700 font-medium">
//                           {job.type}
//                         </Badge>
//                         <Badge size="md" variant="light" color="green" className="bg-green-50 text-green-700">
//                           {job.salary}
//                         </Badge>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => toggleSave(job.id)}
//                       className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                     >
//                       {isSaved(job.id) ? (
//                         <IconHeartFilled size={20} className="text-red-500" />
//                       ) : (
//                         <IconHeart size={20} className="text-gray-400 hover:text-red-500" />
//                       )}
//                     </button>
//                   </div>

//                   <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
//                     <span className="flex items-center gap-1.5">
//                       <IconMapPin size={16} className="text-gray-400" />
//                       {job.location}
//                     </span>
//                     <span className="flex items-center gap-1.5">
//                       <IconClock size={16} className="text-gray-400" />
//                       Posted {job.posted}
//                     </span>
//                   </div>

//                   {job.description && (
//                     <p className="text-gray-600 text-sm mt-3 line-clamp-2">{job.description}</p>
//                   )}

//                   {job.skills && job.skills.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {job.skills.slice(0, 3).map((skill, idx) => (
//                         <Badge key={idx} size="sm" variant="light" color="gray" className="bg-gray-100 text-gray-600">
//                           {skill}
//                         </Badge>
//                       ))}
//                       {job.skills.length > 3 && (
//                         <Badge size="sm" variant="light" color="gray">
//                           +{job.skills.length - 3}
//                         </Badge>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <Button
//                     variant="gradient"
//                     gradient={{ from: 'blue', to: 'indigo' }}
//                     radius="lg"
//                     size="md"
//                     onClick={() => handleApplyClick(job)}
//                     className="min-w-[120px] shadow-md hover:shadow-lg transition-all duration-300"
//                   >
//                     Apply Now
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center pt-4">
//           <Pagination
//             total={totalPages}
//             value={currentPage}
//             onChange={setCurrentPage}
//             color="blue"
//             radius="xl"
//             size="md"
//           />
//         </div>
//       )}

//       {/* Apply Modal */}
//       <Modal
//         opened={applyModalOpen}
//         onClose={() => setApplyModalOpen(false)}
//         title={`Apply for ${selectedJob?.title || "Position"}`}
//         size="lg"
//         radius="lg"
//         centered
//       >
//         <div className="space-y-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <p className="text-sm text-blue-800">
//               <strong>Position:</strong> {selectedJob?.title}
//             </p>
//             <p className="text-sm text-blue-800 mt-1">
//               <strong>Location:</strong> {selectedJob?.location}
//             </p>
//             <p className="text-sm text-blue-800 mt-1">
//               <strong>Salary:</strong> {selectedJob?.salary}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextInput
//               label="Full Name"
//               placeholder="Enter your full name"
//               value={applicantName}
//               onChange={(e) => setApplicantName(e.target.value)}
//               leftSection={<IconUser size={16} />}
//               required
//             />
//             <TextInput
//               label="Email"
//               placeholder="your@email.com"
//               value={applicantEmail}
//               onChange={(e) => setApplicantEmail(e.target.value)}
//               leftSection={<IconMail size={16} />}
//               required
//             />
//           </div>

//           <TextInput
//             label="Phone Number"
//             placeholder="+1 234 567 8900"
//             value={applicantPhone}
//             onChange={(e) => setApplicantPhone(e.target.value)}
//             leftSection={<IconPhone size={16} />}
//           />

//           <Textarea
//             label="Cover Letter"
//             placeholder="Why are you interested in this position? What makes you a great fit?"
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//             minRows={4}
//           />

//           <div className="bg-gray-50 p-3 rounded-lg">
//             <p className="text-xs text-gray-500 flex items-center gap-2">
//               <IconFileText size={14} />
//               Resume will be uploaded from your profile
//             </p>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button
//               onClick={handleSubmitApplication}
//               loading={isSubmitting}
//               className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
//             >
//               <IconSend size={16} className="mr-2" />
//               Submit Application
//             </Button>
//             <Button
//               onClick={() => setApplyModalOpen(false)}
//               variant="light"
//               color="gray"
//               className="flex-1"
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CompanyJobs;