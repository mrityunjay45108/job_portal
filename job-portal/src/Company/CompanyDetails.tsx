// import { Avatar, Rating, Badge, Button } from "@mantine/core";
// import { IconMapPin, IconClock, IconHeart, IconHeartFilled } from "@tabler/icons-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// // Stat Card Component
// export const StatCard = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
//   <div className="group bg-white p-5 rounded-2xl border border-gray-200 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-300">
//     <div className="flex justify-center mb-3">
//       <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
//         {icon || <span className="text-2xl">📊</span>}
//       </div>
//     </div>
//     <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{value}</p>
//     <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{label}</p>
//   </div>
// );

// // Review Card Component
// export const ReviewCard = ({ 
//   name, date, rating, comment, avatar, position 
// }: { 
//   name: string; date: string; rating: number; comment: string; avatar?: string; position?: string;
// }) => (
//   <div className="group bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
//     <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
//       <div className="flex gap-3">
//         <Avatar src={avatar} color="blue" radius="xl" size="md" className="border-2 border-white shadow-sm">
//           {name[0]}
//         </Avatar>
//         <div>
//           <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</p>
//           {position && <p className="text-xs text-gray-500">{position}</p>}
//           <p className="text-xs text-gray-400 mt-0.5">{date}</p>
//         </div>
//       </div>
//       <Rating value={rating} readOnly size="sm" />
//     </div>
//     <p className="text-gray-600 text-sm leading-relaxed">"{comment}"</p>
//   </div>
// );

// // Company Job Card Component
// export const CompanyJobCard = ({ job }: { job: any }) => {
//   const [saved, setSaved] = useState(false);

//   return (
//     <div className="group bg-white p-5 rounded-2xl border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//         <div className="flex-1">
//           <div className="flex items-start justify-between">
//             <div>
//               <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {job.title}
//               </h4>
//               <div className="flex flex-wrap items-center gap-2 mt-2">
//                 <Badge size="lg" variant="light" color="blue" className="bg-blue-50 text-blue-700 font-medium">
//                   {job.type}
//                 </Badge>
//                 <Badge size="lg" variant="light" color="green" className="bg-green-50 text-green-700">
//                   {job.salary}
//                 </Badge>
//               </div>
//             </div>
//             <button
//               onClick={() => setSaved(!saved)}
//               className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               {saved ? (
//                 <IconHeartFilled size={20} className="text-red-500" />
//               ) : (
//                 <IconHeart size={20} className="text-gray-400 hover:text-red-500" />
//               )}
//             </button>
//           </div>

//           <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
//             <span className="flex items-center gap-1.5">
//               <IconMapPin size={16} className="text-gray-400" />
//               {job.location}
//             </span>
//             <span className="flex items-center gap-1.5">
//               <IconClock size={16} className="text-gray-400" />
//               Posted {job.posted}
//             </span>
//           </div>

//           {job.description && (
//             <p className="text-gray-600 text-sm mt-3 line-clamp-2">{job.description}</p>
//           )}

//           {job.skills && job.skills.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-3">
//               {job.skills.slice(0, 3).map((skill: string, idx: number) => (
//                 <Badge key={idx} size="sm" variant="light" color="gray" className="bg-gray-100 text-gray-600">
//                   {skill}
//                 </Badge>
//               ))}
//               {job.skills.length > 3 && (
//                 <Badge size="sm" variant="light" color="gray">
//                   +{job.skills.length - 3}
//                 </Badge>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-3">
//           <Link to={`/apply-job?jobId=${job.id}`}>
//             <Button
//               variant="gradient"
//               gradient={{ from: 'blue', to: 'indigo' }}
//               radius="lg"
//               size="md"
//               className="min-w-[120px] shadow-md hover:shadow-lg transition-all duration-300"
//             >
//               Apply Now
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };