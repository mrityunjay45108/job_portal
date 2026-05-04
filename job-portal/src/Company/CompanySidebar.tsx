// import { Avatar, ActionIcon, Divider, Button, Tooltip, Badge } from "@mantine/core";
// import { 
//   IconWorld, IconBrandLinkedin, IconBrandTwitter, IconExternalLink, 
//   IconMail, IconMapPin, IconPhone, IconBuilding, IconCalendar, 
//   IconUsers, IconBrandGithub, IconBrandYoutube, IconHeart, 
//   IconHeartFilled, IconShare, IconFlag 
// } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";

// interface CompanySidebarProps {
//   company?: {
//     name?: string;
//     website?: string;
//     email?: string;
//     phone?: string;
//     address?: string;
//     employees?: string;
//     founded?: string;
//     industry?: string;
//     headquarters?: string;
//     location?: string;
//     social?: {
//       linkedin?: string;
//       twitter?: string;
//       github?: string;
//       youtube?: string;
//     };
//   };
// }

// export const CompanySidebar = ({ company }: CompanySidebarProps) => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const companyData = company || {};

//   const similarCompanies = [
//     { name: 'Microsoft', path: '/company/microsoft', logo: 'MS', color: 'blue' },
//     { name: 'Meta', path: '/company/meta', logo: 'M', color: 'indigo' },
//     { name: 'Amazon', path: '/company/amazon', logo: 'A', color: 'orange' },
//     { name: 'Apple', path: '/company/apple', logo: 'A', color: 'gray' },
//     { name: 'Netflix', path: '/company/netflix', logo: 'N', color: 'red' },
//   ];

//   const handleFollow = () => {
//     setIsFollowing(!isFollowing);
//     notifications.show({
//       title: isFollowing ? 'Unfollowed' : 'Following',
//       message: isFollowing 
//         ? `You are no longer following ${companyData.name || "this company"}`
//         : `You are now following ${companyData.name || "this company"}`,
//       color: isFollowing ? 'gray' : 'blue'
//     });
//   };

//   const handleSave = () => {
//     setIsSaved(!isSaved);
//     notifications.show({
//       title: isSaved ? 'Removed' : 'Saved',
//       message: isSaved 
//         ? `Company removed from saved list`
//         : `${companyData.name || "Company"} saved to your list`,
//       color: isSaved ? 'orange' : 'green'
//     });
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     notifications.show({
//       title: 'Link Copied!',
//       message: 'Company link copied to clipboard',
//       color: 'green'
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Follow and Save Buttons Card */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg">
//         <h3 className="text-xl font-bold mb-2">{companyData.name || "Company"}</h3>
//         <p className="text-blue-100 text-sm mb-4">Get updates about new job openings</p>
//         <div className="flex gap-3">
//           <Button
//             onClick={handleFollow}
//             variant={isFollowing ? "white" : "outline"}
//             color={isFollowing ? "blue" : "white"}
//             fullWidth
//             radius="xl"
//             leftSection={isFollowing ? <IconHeartFilled size={16} /> : <IconHeart size={16} />}
//             className={isFollowing ? "text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
//           >
//             {isFollowing ? "Following" : "Follow"}
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant={isSaved ? "white" : "outline"}
//             color={isSaved ? "blue" : "white"}
//             radius="xl"
//             className={isSaved ? "text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
//           >
//             {isSaved ? "✓" : "📌"}
//           </Button>
//           <Button
//             onClick={handleShare}
//             variant="outline"
//             color="white"
//             radius="xl"
//             className="border-white text-white hover:bg-white hover:text-blue-600"
//           >
//             <IconShare size={16} />
//           </Button>
//         </div>
//       </div>

//       {/* Company Info Card */}
//       <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
//         <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
//           <div className="p-2 bg-blue-50 rounded-lg">
//             <IconBuilding size={18} className="text-blue-600" />
//           </div>
//           <h3 className="text-lg font-bold text-gray-900">Company Information</h3>
//         </div>

//         <div className="space-y-4">
//           {/* Industry */}
//           {companyData.industry && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <Badge size="sm" color="blue" variant="light">Industry</Badge>
//               </span>
//               <span className="text-gray-800 text-sm font-medium">{companyData.industry}</span>
//             </div>
//           )}

//           {/* Employees */}
//           {companyData.employees && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <IconUsers size={16} className="text-blue-500" /> Employees
//               </span>
//               <span className="text-gray-800 text-sm font-medium">{companyData.employees}</span>
//             </div>
//           )}

//           {/* Founded */}
//           {companyData.founded && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <IconCalendar size={16} className="text-blue-500" /> Founded
//               </span>
//               <span className="text-gray-800 text-sm font-medium">{companyData.founded}</span>
//             </div>
//           )}

//           {/* Headquarters */}
//           {companyData.headquarters && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <IconBuilding size={16} className="text-blue-500" /> Headquarters
//               </span>
//               <span className="text-gray-800 text-sm font-medium">{companyData.headquarters}</span>
//             </div>
//           )}

//           {/* Location */}
//           {companyData.location && (
//             <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <IconMapPin size={16} className="text-blue-500 mt-0.5" />
//               <div className="flex-1">
//                 <span className="text-sm text-gray-600 block">Location</span>
//                 <p className="text-gray-800 text-sm mt-1">{companyData.location}</p>
//               </div>
//             </div>
//           )}

//           {/* Website */}
//           <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//             <span className="flex items-center gap-2 text-sm text-gray-600">
//               <IconWorld size={16} className="text-blue-500" /> Website
//             </span>
//             <a
//               href={companyData.website ? `https://${companyData.website}` : "#"}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 hover:underline text-sm font-medium truncate max-w-[180px]"
//             >
//               {companyData.website || "example.com"}
//             </a>
//           </div>

//           {/* Email */}
//           {companyData.email && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <IconMail size={16} className="text-blue-500" /> Email
//               </span>
//               <a
//                 href={`mailto:${companyData.email}`}
//                 className="text-blue-600 hover:underline text-sm font-medium truncate max-w-[180px]"
//               >
//                 {companyData.email}
//               </a>
//             </div>
//           )}

//           {/* Phone */}
//           {companyData.phone && (
//             <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="flex items-center gap-2 text-sm text-gray-600">
//                 <IconPhone size={16} className="text-blue-500" /> Phone
//               </span>
//               <a href={`tel:${companyData.phone}`} className="text-gray-700 text-sm">
//                 {companyData.phone}
//               </a>
//             </div>
//           )}

//           {/* Address */}
//           {companyData.address && (
//             <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
//               <IconMapPin size={16} className="text-blue-500 mt-0.5" />
//               <div className="flex-1">
//                 <span className="text-sm text-gray-600 block">Address</span>
//                 <p className="text-gray-800 text-sm mt-1">{companyData.address}</p>
//               </div>
//             </div>
//           )}
//         </div>

//         <Divider className="my-4 border-gray-200" />

//         {/* Social Links */}
//         <div>
//           <p className="text-sm font-semibold text-gray-700 mb-3">Connect with us</p>
//           <div className="flex gap-3 flex-wrap">
//             {companyData.social?.linkedin && (
//               <Tooltip label="LinkedIn">
//                 <ActionIcon
//                   component="a"
//                   href={companyData.social.linkedin}
//                   target="_blank"
//                   variant="light"
//                   size="lg"
//                   color="blue"
//                   className="hover:scale-110 transition-transform bg-blue-50"
//                 >
//                   <IconBrandLinkedin size={18} />
//                 </ActionIcon>
//               </Tooltip>
//             )}
//             {companyData.social?.twitter && (
//               <Tooltip label="Twitter">
//                 <ActionIcon
//                   component="a"
//                   href={companyData.social.twitter}
//                   target="_blank"
//                   variant="light"
//                   size="lg"
//                   color="cyan"
//                   className="hover:scale-110 transition-transform bg-cyan-50"
//                 >
//                   <IconBrandTwitter size={18} />
//                 </ActionIcon>
//               </Tooltip>
//             )}
//             {companyData.social?.github && (
//               <Tooltip label="GitHub">
//                 <ActionIcon
//                   component="a"
//                   href={companyData.social.github}
//                   target="_blank"
//                   variant="light"
//                   size="lg"
//                   color="gray"
//                   className="hover:scale-110 transition-transform bg-gray-100"
//                 >
//                   <IconBrandGithub size={18} />
//                 </ActionIcon>
//               </Tooltip>
//             )}
//             {companyData.social?.youtube && (
//               <Tooltip label="YouTube">
//                 <ActionIcon
//                   component="a"
//                   href={companyData.social.youtube}
//                   target="_blank"
//                   variant="light"
//                   size="lg"
//                   color="red"
//                   className="hover:scale-110 transition-transform bg-red-50"
//                 >
//                   <IconBrandYoutube size={18} />
//                 </ActionIcon>
//               </Tooltip>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Similar Companies Card */}
//       <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
//         <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
//           <div className="p-2 bg-blue-50 rounded-lg">
//             <IconUsers size={18} className="text-blue-600" />
//           </div>
//           <h3 className="text-lg font-bold text-gray-900">Similar Companies</h3>
//         </div>

//         <div className="space-y-4">
//           {similarCompanies.map((comp) => (
//             <Link
//               key={comp.name}
//               to={comp.path}
//               className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
//             >
//               <div className="flex items-center gap-3">
//                 <Avatar radius="md" size="md" className={`bg-gradient-to-br from-${comp.color}-100 to-${comp.color}-200 text-${comp.color}-700`}>
//                   {comp.logo}
//                 </Avatar>
//                 <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
//                   {comp.name}
//                 </span>
//               </div>
//               <IconExternalLink size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
//             </Link>
//           ))}
//         </div>

//         <div className="mt-6 pt-4 border-t border-gray-100">
//           <Button
//             variant="light"
//             color="blue"
//             fullWidth
//             radius="xl"
//             className="group hover:bg-blue-600 hover:text-white transition-all duration-300"
//           >
//             View All Similar Companies
//             <IconExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
//           </Button>
//         </div>
//       </div>

//       {/* Report Issue Card */}
//       <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center">
//         <div className="flex items-center justify-center mb-2">
//           <IconFlag size={20} className="text-gray-400" />
//         </div>
//         <p className="text-xs text-gray-500 mb-2">Found something wrong?</p>
//         <button className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline">
//           Report an issue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompanySidebar;