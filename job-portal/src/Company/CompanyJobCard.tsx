// import { Card, Badge, Button, Group, Text, Avatar, Divider } from "@mantine/core";
// import { IconMapPin, IconClock, IconBriefcase, IconCurrencyDollar, IconHeart, IconHeartFilled } from "@tabler/icons-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface CompanyJobCardProps {
//   id?: string;
//   title: string;
//   company?: string;
//   location: string;
//   type: string;
//   salary: string;
//   posted: string;
//   description?: string;
//   skills?: string[];
//   urgentHiring?: boolean;
//   onApplyClick?: (job: any) => void;
// }

// const CompanyJobCard = ({ 
//   id, 
//   title, 
//   company, 
//   location, 
//   type, 
//   salary, 
//   posted, 
//   description, 
//   skills = [], 
//   urgentHiring,
//   onApplyClick 
// }: CompanyJobCardProps) => {
//   const [saved, setSaved] = useState(false);
//   const navigate = useNavigate();

//   const handleApplyClick = () => {
//     if (onApplyClick) {
//       onApplyClick({ id, title, company, location, type, salary });
//     } else {
//       // Navigate to job description page
//       navigate(`/job/${id}`);
//     }
//   };

//   const handleSaveJob = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSaved(!saved);
    
//     // Save to localStorage
//     const savedJobs = localStorage.getItem('saved_jobs');
//     const existingSaved = savedJobs ? JSON.parse(savedJobs) : [];
    
//     if (!saved) {
//       existingSaved.push({
//         id: Date.now().toString(),
//         jobId: id,
//         jobTitle: title,
//         company: company,
//         location: location,
//         salary: salary,
//         savedDate: new Date().toISOString()
//       });
//       localStorage.setItem('saved_jobs', JSON.stringify(existingSaved));
      
//       // Show notification
//       const notificationsList = localStorage.getItem('candidate_notifications');
//       const existingNotifs = notificationsList ? JSON.parse(notificationsList) : [];
//       existingNotifs.push({
//         id: Date.now().toString(),
//         title: 'Job Saved!',
//         message: `${title} at ${company} has been saved to your list.`,
//         type: 'alert',
//         read: false,
//         createdAt: new Date().toISOString()
//       });
//       localStorage.setItem('candidate_notifications', JSON.stringify(existingNotifs));
//     } else {
//       const updatedSaved = existingSaved.filter((s: any) => s.jobId !== id);
//       localStorage.setItem('saved_jobs', JSON.stringify(updatedSaved));
//     }
//   };

//   return (
//     <Card
//       className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group w-full"
//       padding="lg"
//       radius="lg"
//       withBorder
//     >
//       {/* Urgent Hiring Badge */}
//       {urgentHiring && (
//         <div className="absolute top-3 right-3">
//           <Badge color="red" size="sm" variant="filled" className="animate-pulse">
//              Urgent
//           </Badge>
//         </div>
//       )}

//       {/* Header Section */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-2">
//             <Avatar size="md" radius="xl" color="blue" className="bg-blue-100">
//               {company?.[0] || title[0]}
//             </Avatar>
//             <div>
//               <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {title}
//               </h4>
//               <Text size="sm" className="text-gray-500">{company}</Text>
//             </div>
//           </div>
//         </div>
        
//         <button
//           onClick={handleSaveJob}
//           className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//         >
//           {saved ? (
//             <IconHeartFilled size={20} className="text-red-500" />
//           ) : (
//             <IconHeart size={20} className="text-gray-400 hover:text-red-500" />
//           )}
//         </button>
//       </div>

//       {/* Job Details Badges */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         <Badge color="blue" variant="light" radius="xl" className="bg-blue-50">
//           <div className="flex items-center gap-1">
//             <IconBriefcase size={12} />
//             <span>{type}</span>
//           </div>
//         </Badge>
//         <Badge color="green" variant="light" radius="xl" className="bg-green-50">
//           <div className="flex items-center gap-1">
//             <IconCurrencyDollar size={12} />
//             <span>{salary}</span>
//           </div>
//         </Badge>
//         <Badge color="orange" variant="light" radius="xl" className="bg-orange-50">
//           <div className="flex items-center gap-1">
//             <IconMapPin size={12} />
//             <span>{location}</span>
//           </div>
//         </Badge>
//       </div>

//       {/* Skills Tags */}
//       {skills.length > 0 && (
//         <div className="flex flex-wrap gap-2 mb-4">
//           {skills.slice(0, 3).map((skill, index) => (
//             <Badge key={index} size="sm" variant="light" color="gray" className="bg-gray-100">
//               {skill}
//             </Badge>
//           ))}
//           {skills.length > 3 && (
//             <Badge size="sm" variant="light" color="gray">
//               +{skills.length - 3}
//             </Badge>
//           )}
//         </div>
//       )}

//       {/* Description */}
//       {description && (
//         <Text size="sm" className="text-gray-600 mb-4 line-clamp-2">
//           {description}
//         </Text>
//       )}

//       <Divider className="my-3" />

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-2">
//         <div className="flex items-center gap-1 text-gray-500">
//           <IconClock size={14} />
//           <span className="text-xs">Posted {posted}</span>
//         </div>
        
//         <Button
//           variant="gradient"
//           gradient={{ from: 'blue', to: 'indigo' }}
//           radius="xl"
//           size="sm"
//           onClick={handleApplyClick}
//           className="shadow-sm hover:shadow-md transition-shadow"
//         >
//           Apply Now
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default CompanyJobCard;