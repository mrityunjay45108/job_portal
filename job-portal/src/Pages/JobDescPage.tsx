// import { Button, Divider, Breadcrumbs, Anchor } from "@mantine/core";
// import { IconArrowLeft, IconHome, IconBriefcase } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import JobDesc from "../JobDesc/JobDesc";
// import RecommendedJobs from "../JobDesc/RecommendPostJob";

// const JobDescPage = () => {
//   const breadcrumbItems = [
//     { title: 'Home', href: '/' },
//     { title: 'Find Jobs', href: '/find-jobs' },
//     { title: 'Job Details', href: '#' },
//   ].map((item, index) => (
//     <Anchor 
//       component={Link} 
//       to={item.href} 
//       key={index}
//       className="text-gray-500 hover:text-blue-600 transition-colors text-sm"
//     >
//       {item.title}
//     </Anchor>
//   ));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 font-['poppins']">
//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <Breadcrumbs separator="→" className="text-sm mb-2">
//                 {breadcrumbItems}
//               </Breadcrumbs>
//               <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
//             </div>
            
//             <Link to="/find-jobs">
//               <Button
//                 color="blue"
//                 leftSection={<IconArrowLeft size={18} />}
//                 variant="light"
//                 radius="xl"
//                 className="hover:bg-blue-50"
//               >
//                 Back to Search
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
          
//           {/* Left Column - Job Description */}
//           <div className="w-full lg:w-2/3">
//             <JobDesc />
//           </div>

//           {/* Right Column - Recommended Jobs Sidebar */}
//           <div className="w-full lg:w-1/3">
//             <div className="sticky top-24">
//               <RecommendedJobs />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDescPage;