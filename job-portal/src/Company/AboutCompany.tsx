// import { IconUsers, IconCalendar, IconWorld, IconBuilding, IconBriefcase, IconGlobe, IconArrowRight } from "@tabler/icons-react";
// import { Button } from "@mantine/core";
// import { useNavigate } from "react-router-dom";

// interface AboutCompanyProps {
//   company?: {
//     employees?: string;
//     founded?: string;
//     headquarters?: string;
//     website?: string;
//     officeLocations?: string;
//     name?: string;
//     email?: string;
//     phone?: string;
//     id?: string;
//   };
//   jobId?: string;
//   jobTitle?: string;
//   onApplyClick?: () => void;  // Add this prop
// }

// const AboutCompany = ({ company, jobId, jobTitle, onApplyClick }: AboutCompanyProps) => {
//   const companyData = company || {};
//   const navigate = useNavigate();

//   const handleApplyNow = () => {
//     if (onApplyClick) {
//       // If onApplyClick is provided, use it (for JobDesc page)
//       onApplyClick();
//     } else {
//       // Otherwise navigate to company page (for Company page)
//       const companyName = companyData.name?.toLowerCase().replace(/\s/g, '-') || 'company';
//       navigate(`/company/${companyName}?jobId=${jobId}&jobTitle=${encodeURIComponent(jobTitle || '')}`);
//     }
//   };

//   const handleViewJobs = () => {
//     const companyName = companyData.name?.toLowerCase().replace(/\s/g, '-') || 'company';
//     navigate(`/company/${companyName}/jobs`);
//   };

//   const handleVisitWebsite = () => {
//     if (companyData.website) {
//       const website = companyData.website.startsWith('http') ? companyData.website : `https://${companyData.website}`;
//       window.open(website, "_blank");
//     } else {
//       window.open("https://www.example.com", "_blank");
//     }
//   };

//   return (
//     <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
//       <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//         <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
//           <IconBuilding size={22} className="text-blue-600" />
//         </div>
//         <h3 className="text-xl md:text-2xl font-bold text-gray-900">
//           Company Overview
//         </h3>
//       </div>

//       <div className="space-y-6">
//         {/* Employees */}
//         <div className="flex items-start gap-4 group cursor-pointer" onClick={() => navigate('/company/about#employees')}>
//           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300">
//             <IconUsers size={22} className="text-blue-600" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Employees</p>
//             <p className="text-gray-900 text-base md:text-lg font-bold mt-1">
//               {companyData.employees || "10,000+"}
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">globally across offices</p>
//           </div>
//         </div>

//         {/* Founded */}
//         <div className="flex items-start gap-4 group cursor-pointer" onClick={() => navigate('/company/about#founded')}>
//           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300">
//             <IconCalendar size={22} className="text-blue-600" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Year Founded</p>
//             <p className="text-gray-900 text-base md:text-lg font-bold mt-1">
//               {companyData.founded || "2010"}
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">years of innovation</p>
//           </div>
//         </div>

//         {/* Headquarters */}
//         <div className="flex items-start gap-4 group cursor-pointer" onClick={() => navigate('/company/about#headquarters')}>
//           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300">
//             <IconBuilding size={22} className="text-blue-600" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Global Headquarters</p>
//             <p className="text-gray-900 text-base md:text-lg font-bold mt-1">
//               {companyData.headquarters || "United States"}
//             </p>
//             <p className="text-xs text-gray-400 mt-0.5">Main office location</p>
//           </div>
//         </div>

//         {/* Office Locations */}
//         <div className="flex items-start gap-4 group cursor-pointer" onClick={() => navigate('/company/about#offices')}>
//           <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300">
//             <IconGlobe size={22} className="text-blue-600" />
//           </div>
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Office Locations</p>
//             <p className="text-gray-900 text-base md:text-lg font-bold mt-1">{companyData.officeLocations || "20+ Countries"}</p>
//             <p className="text-xs text-gray-400 mt-0.5">Global presence worldwide</p>
//           </div>
//         </div>
//       </div>

//       {/* Contact Info Section */}
//       {(companyData.email || companyData.phone) && (
//         <div className="mt-6 pt-4 border-t border-gray-200">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
//           <div className="space-y-2">
//             {companyData.email && (
//               <a 
//                 href={`mailto:${companyData.email}`}
//                 className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
//               >
//                  {companyData.email}
//               </a>
//             )}
//             {companyData.phone && (
//               <a 
//                 href={`tel:${companyData.phone}`}
//                 className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
//               >
//                 {companyData.phone}
//               </a>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
//         {/* Apply Now Button */}
//         <button
//           onClick={handleApplyNow}
//           className="group relative w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <IconBriefcase size={18} className="transition-transform group-hover:scale-110" />
//             <span>Apply Now</span>
//             <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
//           </div>
//         </button>

//         {/* View All Jobs Button */}
//         <button
//           onClick={handleViewJobs}
//           className="group relative w-full py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <IconBriefcase size={18} className="transition-transform group-hover:scale-110" />
//             <span>View All Jobs</span>
//           </div>
//         </button>

//         {/* Visit Website Button */}
//         <button
//           onClick={handleVisitWebsite}
//           className="group relative w-full py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <IconWorld size={18} className="transition-transform group-hover:scale-110" />
//             <span>Visit Company Website</span>
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AboutCompany;