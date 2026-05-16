// import {
//   IconBriefcase,
//   IconMapPin,
//   IconCalendar,
//   IconBuilding,
//   IconClock,
// } from "@tabler/icons-react";
// import { Badge, Tooltip } from "@mantine/core";

// interface ExperienceProps {
//   title?: string;
//   company?: string;
//   location?: string;
//   startDate?: string;
//   endDate?: string;
//   description?: string;
//   technologies?: string[];
//   companyIcon?: string;
//   currentlyWorking?: boolean;
// }

// const Experience = (props: ExperienceProps) => {
//   const isCurrent = props.currentlyWorking || props.endDate === "Present";
//   const endDateDisplay = isCurrent ? "Present" : props.endDate;

//   return (
//     <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-blue-200">
//       <div className="flex flex-wrap justify-between gap-4">
//         {/* Left Section */}
//         <div className="flex gap-4 flex-1">
//           {/* Logo Container */}
//           <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-fit group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
//             <img
//               className="h-10 w-10 object-contain"
//               src={
//                 props.companyIcon ||
//                 `/Icons/${props.company?.toLowerCase()}.png`
//               }
//               alt={props.company}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   "/Icons/default-company.png";
//               }}
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
//               {props.title || "Position Title"}
//             </h4>
//             <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <IconBuilding size={14} className="text-gray-400" />
//                 <span className="font-medium">
//                   {props.company || "Company Name"}
//                 </span>
//               </div>
//               <span className="text-gray-300">•</span>
//               <div className="flex items-center gap-1">
//                 <IconMapPin size={14} className="text-gray-400" />
//                 <span>{props.location || "Location"}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Date */}
//         <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full h-fit group-hover:bg-blue-50 transition-all duration-300">
//           <IconCalendar size={14} className="text-blue-500" />
//           <span className="font-medium">
//             {props.startDate || "Start Date"} - {endDateDisplay}
//           </span>
//           {isCurrent && (
//             <Tooltip label="Current Position">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             </Tooltip>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       {props.description && (
//         <div className="mt-4 pl-14">
//           <p className="text-gray-600 text-sm leading-relaxed">
//             {props.description}
//           </p>
//         </div>
//       )}

//       {/* Tech Stack Tags */}
//       {props.technologies && props.technologies.length > 0 && (
//         <div className="mt-4 pl-14">
//           <div className="flex flex-wrap gap-2">
//             {props.technologies.map((tech: string, idx: number) => (
//               <Badge
//                 key={idx}
//                 size="sm"
//                 variant="light"
//                 color="gray"
//                 className="bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-default"
//                 radius="xl"
//               >
//                 {tech}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Experience;



// import {
//   IconBriefcase,
//   IconMapPin,
//   IconCalendar,
//   IconBuilding,
//   IconClock,
//   IconCheck,
//   IconAward,
// } from "@tabler/icons-react";
// import { Badge, Tooltip, Divider } from "@mantine/core";

// interface ExperienceProps {
//   title?: string;
//   company?: string;
//   location?: string;
//   startDate?: string;
//   endDate?: string;
//   description?: string;
//   technologies?: string[];
//   companyIcon?: string;
//   currentlyWorking?: boolean;
//   achievements?: string[];
//   employmentType?: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
// }

// const Experience = (props: ExperienceProps) => {
//   const isCurrent = props.currentlyWorking || props.endDate === "Present";
//   const endDateDisplay = isCurrent ? "Present" : props.endDate;
  
//   const getEmploymentTypeColor = () => {
//     switch(props.employmentType) {
//       case "Full-time": return "bg-green-100 text-green-700";
//       case "Part-time": return "bg-blue-100 text-blue-700";
//       case "Contract": return "bg-orange-100 text-orange-700";
//       case "Internship": return "bg-purple-100 text-purple-700";
//       case "Remote": return "bg-indigo-100 text-indigo-700";
//       default: return "bg-gray-100 text-gray-700";
//     }
//   };

//   const calculateDuration = () => {
//     if (!props.startDate) return null;
    
//     const start = new Date(props.startDate);
//     const end = isCurrent ? new Date() : new Date(props.endDate || "");
//     const years = end.getFullYear() - start.getFullYear();
//     const months = end.getMonth() - start.getMonth();
    
//     if (years === 0 && months === 0) return "Less than a month";
//     if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
//     if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
//     return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
//   };

//   const duration = calculateDuration();

//   return (
//     <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
//       <div className="flex flex-wrap justify-between gap-4">
//         {/* Left Section */}
//         <div className="flex gap-4 flex-1">
//           {/* Logo Container */}
//           <div className="relative">
//             <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-fit group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300 shadow-sm">
//               <img
//                 className="h-10 w-10 object-contain"
//                 src={
//                   props.companyIcon ||
//                   `https://logo.clearbit.com/${props.company?.toLowerCase().replace(/\s/g, '')}.com`
//                 }
//                 alt={props.company}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${props.company?.charAt(0) || 'C'}&background=3b82f6&color=ffffff&bold=true&size=80`;
//                 }}
//               />
//             </div>
//             {isCurrent && (
//               <div className="absolute -top-1 -right-1">
//                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse ring-2 ring-white"></div>
//               </div>
//             )}
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <div className="flex flex-wrap items-center gap-2 mb-1">
//               <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
//                 {props.title || "Position Title"}
//               </h4>
//               {props.employmentType && (
//                 <Badge size="sm" className={`${getEmploymentTypeColor()} font-medium`}>
//                   {props.employmentType}
//                 </Badge>
//               )}
//             </div>
            
//             <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <IconBuilding size={14} className="text-gray-400" />
//                 <span className="font-medium">
//                   {props.company || "Company Name"}
//                 </span>
//               </div>
//               <span className="text-gray-300">•</span>
//               <div className="flex items-center gap-1">
//                 <IconMapPin size={14} className="text-gray-400" />
//                 <span>{props.location || "Location"}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Date */}
//         <div className="flex flex-col items-end gap-1">
//           <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full h-fit group-hover:bg-blue-50 transition-all duration-300">
//             <IconCalendar size={14} className="text-blue-500" />
//             <span className="font-medium">
//               {props.startDate || "Start Date"} - {endDateDisplay}
//             </span>
//             {isCurrent && (
//               <Tooltip label="Current Position">
//                 <IconClock size={12} className="text-green-500 animate-pulse" />
//               </Tooltip>
//             )}
//           </div>
//           {duration && (
//             <div className="text-xs text-gray-400 flex items-center gap-1">
//               <IconClock size={12} />
//               <span>{duration}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       {props.description && (
//         <div className="mt-4 pl-14">
//           <p className="text-gray-600 text-sm leading-relaxed">
//             {props.description}
//           </p>
//         </div>
//       )}

//       {/* Key Achievements */}
//       {props.achievements && props.achievements.length > 0 && (
//         <div className="mt-4 pl-14">
//           <div className="flex items-center gap-2 mb-2">
//             <IconAward size={14} className="text-blue-500" />
//             <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Key Achievements</span>
//           </div>
//           <ul className="space-y-1.5">
//             {props.achievements.map((achievement, idx) => (
//               <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
//                 <IconCheck size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
//                 <span>{achievement}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Tech Stack Tags */}
//       {props.technologies && props.technologies.length > 0 && (
//         <div className="mt-4 pl-14">
//           <div className="flex items-center gap-2 mb-2">
//             <IconBriefcase size={14} className="text-blue-500" />
//             <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Technologies</span>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {props.technologies.map((tech: string, idx: number) => (
//               <Badge
//                 key={idx}
//                 size="md"
//                 variant="light"
//                 color="blue"
//                 className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all cursor-default"
//                 radius="xl"
//               >
//                 {tech}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Experience;





import {
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconBuilding,
  IconClock,
  IconCheck,
  IconAward,
} from "@tabler/icons-react";
import { Badge, Tooltip, Divider } from "@mantine/core";

interface ExperienceProps {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
  companyIcon?: string;
  currentlyWorking?: boolean;
  achievements?: string[];
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
}

const Experience = (props: ExperienceProps) => {
  const isCurrent = props.currentlyWorking || props.endDate === "Present";
  const endDateDisplay = isCurrent ? "Present" : props.endDate;
  
  const getEmploymentTypeColor = () => {
    switch(props.employmentType) {
      case "Full-time": return "bg-green-100 text-green-700";
      case "Part-time": return "bg-blue-100 text-blue-700";
      case "Contract": return "bg-orange-100 text-orange-700";
      case "Internship": return "bg-purple-100 text-purple-700";
      case "Remote": return "bg-indigo-100 text-indigo-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const calculateDuration = () => {
    if (!props.startDate) return null;
    
    const start = new Date(props.startDate);
    const end = isCurrent ? new Date() : new Date(props.endDate || "");
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    if (years === 0 && months === 0) return "Less than a month";
    if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`;
    if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  };

  const duration = calculateDuration();

  // Get company logo URL with fallback
  const getCompanyLogoUrl = () => {
    if (props.companyIcon) return props.companyIcon;
    if (props.company) {
      // Try to get company logo, but with error handling
      const companyName = props.company.toLowerCase().replace(/\s/g, '');
      return `https://logo.clearbit.com/${companyName}.com`;
    }
    return null;
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
      <div className="flex flex-wrap justify-between gap-4">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          {/* Logo Container */}
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-fit group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300 shadow-sm">
              {props.company ? (
                <img
                  className="h-10 w-10 object-contain"
                  src={getCompanyLogoUrl() || `https://ui-avatars.com/api/?name=${props.company.charAt(0)}&background=3b82f6&color=ffffff&bold=true&size=80`}
                  alt={props.company}
                  onError={(e) => {
                    // Fallback to avatar with company initial
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${props.company?.charAt(0) || 'C'}&background=3b82f6&color=ffffff&bold=true&size=80`;
                  }}
                />
              ) : (
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <IconBriefcase size={20} className="text-blue-600" />
                </div>
              )}
            </div>
            {isCurrent && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse ring-2 ring-white"></div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {props.title || "Position Title"}
              </h4>
              {props.employmentType && (
                <Badge size="sm" className={`${getEmploymentTypeColor()} font-medium`}>
                  {props.employmentType}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IconBuilding size={14} className="text-gray-400" />
                <span className="font-medium">
                  {props.company || "Company Name"}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <IconMapPin size={14} className="text-gray-400" />
                <span>{props.location || "Location"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Date */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full h-fit group-hover:bg-blue-50 transition-all duration-300">
            <IconCalendar size={14} className="text-blue-500" />
            <span className="font-medium">
              {props.startDate || "Start Date"} - {endDateDisplay}
            </span>
            {isCurrent && (
              <Tooltip label="Current Position">
                <IconClock size={12} className="text-green-500 animate-pulse" />
              </Tooltip>
            )}
          </div>
          {duration && (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <IconClock size={12} />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {props.description && (
        <div className="mt-4 pl-14">
          <p className="text-gray-600 text-sm leading-relaxed">
            {props.description}
          </p>
        </div>
      )}

      {/* Key Achievements */}
      {props.achievements && props.achievements.length > 0 && (
        <div className="mt-4 pl-14">
          <div className="flex items-center gap-2 mb-2">
            <IconAward size={14} className="text-blue-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Key Achievements</span>
          </div>
          <ul className="space-y-1.5">
            {props.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <IconCheck size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Tags */}
      {props.technologies && props.technologies.length > 0 && (
        <div className="mt-4 pl-14">
          <div className="flex items-center gap-2 mb-2">
            <IconBriefcase size={14} className="text-blue-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Technologies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {props.technologies.map((tech: string, idx: number) => (
              <Badge
                key={idx}
                size="md"
                variant="light"
                color="blue"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all cursor-default"
                radius="xl"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;