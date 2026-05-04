// import { Container, Button, Skeleton } from "@mantine/core";
// import { useNavigate, useLocation } from "react-router-dom";
// import { IconArrowLeft, IconBuilding } from "@tabler/icons-react";
// import { useState, useEffect } from "react";
// // import Company from "../Company/Company";

// const CompanyPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
  
//   // Get query params for job details
//   const queryParams = new URLSearchParams(location.search);
//   const jobId = queryParams.get('jobId');
//   const jobTitle = queryParams.get('jobTitle');
//   const companyName = queryParams.get('company');
//   const jobLocation = queryParams.get('location');
//   const jobSalary = queryParams.get('salary');
//   const jobType = queryParams.get('jobType');

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Container size="xl" className="py-6 px-4">
//           <Skeleton height={250} radius="xl" className="mb-8" />
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <Skeleton height={400} radius="xl" />
//             </div>
//             <div>
//               <Skeleton height={500} radius="xl" />
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Simple Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <Container size="xl" className="px-4 py-3">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="light"
//               size="sm"
//               leftSection={<IconArrowLeft size={16} />}
//               onClick={() => navigate(-1)}
//               radius="xl"
//             >
//               Back
//             </Button>
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <IconBuilding size={16} className="text-blue-500" />
//               <span>Company Profile</span>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* Main Content */}
//       <Container size="xl" className="py-6 px-4">
//         <Company 
//           jobId={jobId}
//           jobTitle={jobTitle}
//           companyName={companyName}
//           jobLocation={jobLocation}
//           jobSalary={jobSalary}
//           jobType={jobType}
//         />
//       </Container>
//     </div>
//   );
// };

// export default CompanyPage;