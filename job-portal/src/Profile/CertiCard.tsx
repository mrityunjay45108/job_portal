// import {
//   IconAward,
//   IconCalendar,
//   IconId,
//   IconExternalLink,
//   IconCheck,
//   IconCertificate,
// } from "@tabler/icons-react";
// import { Badge, Button, Tooltip } from "@mantine/core";

// interface CertificationProps {
//   name?: string;
//   issuer?: string;
//   date?: string;
//   issueDate?: string;
//   id?: string;
//   credentialUrl?: string;
//   issuerIcon?: string;
//   verified?: boolean;
//   expires?: string;
// }

// const Certification = (props: CertificationProps) => {
//   const issueDate = props.date || props.issueDate;
//   const isExpired = props.expires
//     ? new Date(props.expires) < new Date()
//     : false;

//   return (
//     <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200">
//       <div className="flex flex-wrap justify-between items-start gap-4">
//         {/* Left Section */}
//         <div className="flex gap-3 flex-1">
//           {/* Logo Container */}
//           <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
//             <img
//               className="h-8 w-8 object-contain"
//               src={
//                 props.issuerIcon || `/Icons/${props.issuer?.toLowerCase()}.png`
//               }
//               alt={props.issuer}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = "/Icons/default-cert.png";
//               }}
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <div className="flex flex-wrap items-center gap-2 mb-1">
//               <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {props.name || "Certification Name"}
//               </h4>
//               {props.verified && (
//                 <Tooltip label="Verified Certification">
//                   <Badge
//                     size="xs"
//                     color="green"
//                     className="bg-green-100 text-green-700"
//                   >
//                     <IconCheck size={10} className="inline mr-0.5" />
//                     Verified
//                   </Badge>
//                 </Tooltip>
//               )}
//               {isExpired && (
//                 <Badge
//                   size="xs"
//                   color="red"
//                   className="bg-red-100 text-red-700"
//                 >
//                   Expired
//                 </Badge>
//               )}
//             </div>
//             <div className="text-sm text-gray-500 font-medium mb-2">
//               {props.issuer || "Issuing Organization"}
//             </div>
//             <div className="flex flex-wrap gap-3 text-xs text-gray-400">
//               {issueDate && (
//                 <div className="flex items-center gap-1">
//                   <IconCalendar size={12} />
//                   <span>Issued: {issueDate}</span>
//                 </div>
//               )}
//               {props.expires && !isExpired && (
//                 <div className="flex items-center gap-1">
//                   <IconCalendar size={12} />
//                   <span>Expires: {props.expires}</span>
//                 </div>
//               )}
//               {props.id && (
//                 <div className="flex items-center gap-1">
//                   <IconId size={12} />
//                   <span>Credential ID: {props.id}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Link */}
//         {props.credentialUrl && (
//           <Tooltip label="View Credential">
//             <a
//               href={props.credentialUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Button
//                 variant="subtle"
//                 size="compact-sm"
//                 color="blue"
//                 rightSection={<IconExternalLink size={14} />}
//                 className="hover:bg-blue-50 transition-all duration-300"
//               >
//                 Verify
//               </Button>
//             </a>
//           </Tooltip>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Certification;


import {
  IconAward,
  IconCalendar,
  IconId,
  IconExternalLink,
  IconCheck,
  IconCertificate,
  IconClock,
  IconStar,
  IconLink,
} from "@tabler/icons-react";
import { Badge, Button, Tooltip, Divider, Progress } from "@mantine/core";

interface CertificationProps {
  name?: string;
  issuer?: string;
  date?: string;
  issueDate?: string;
  id?: string;
  credentialUrl?: string;
  issuerIcon?: string;
  verified?: boolean;
  expires?: string;
  score?: number;
  grade?: string;
  skills?: string[];
  duration?: string;
}

const Certification = (props: CertificationProps) => {
  const issueDate = props.date || props.issueDate;
  const isExpired = props.expires
    ? new Date(props.expires) < new Date()
    : false;
  
  const isRecentlyIssued = props.date 
    ? (new Date().getTime() - new Date(props.date).getTime()) < 90 * 24 * 60 * 60 * 1000
    : false;

  const getScoreColor = () => {
    if (!props.score) return "blue";
    if (props.score >= 90) return "green";
    if (props.score >= 75) return "blue";
    if (props.score >= 60) return "yellow";
    return "orange";
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          {/* Logo Container */}
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300 shadow-sm">
              <img
                className="h-10 w-10 object-contain"
                src={
                  props.issuerIcon || 
                  `https://logo.clearbit.com/${props.issuer?.toLowerCase().replace(/\s/g, '')}.com`
                }
                alt={props.issuer}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${props.issuer?.charAt(0) || 'C'}&background=3b82f6&color=ffffff&bold=true&size=80`;
                }}
              />
            </div>
            {props.verified && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
            )}
            {isRecentlyIssued && !props.verified && (
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                {props.name || "Certification Name"}
              </h4>
              {props.verified && (
                <Tooltip label="Verified Certification">
                  <Badge
                    size="sm"
                    variant="light"
                    color="green"
                    className="bg-green-100 text-green-700"
                  >
                    <IconCheck size={12} className="inline mr-0.5" />
                    Verified
                  </Badge>
                </Tooltip>
              )}
              {isRecentlyIssued && (
                <Tooltip label="Recently Issued">
                  <Badge
                    size="sm"
                    variant="light"
                    color="blue"
                    className="bg-blue-100 text-blue-700"
                  >
                    <IconStar size={12} className="inline mr-0.5" />
                    New
                  </Badge>
                </Tooltip>
              )}
              {isExpired && (
                <Tooltip label="Certification Expired">
                  <Badge
                    size="sm"
                    variant="light"
                    color="red"
                    className="bg-red-100 text-red-700"
                  >
                    <IconClock size={12} className="inline mr-0.5" />
                    Expired
                  </Badge>
                </Tooltip>
              )}
            </div>
            
            <div className="text-base font-semibold text-gray-700 mb-2">
              {props.issuer || "Issuing Organization"}
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
              {issueDate && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                  <IconCalendar size={12} className="text-blue-500" />
                  <span>Issued: {issueDate}</span>
                </div>
              )}
              {props.expires && !isExpired && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                  <IconClock size={12} className="text-orange-500" />
                  <span>Expires: {props.expires}</span>
                </div>
              )}
              {props.duration && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                  <IconClock size={12} className="text-purple-500" />
                  <span>Duration: {props.duration}</span>
                </div>
              )}
              {props.id && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                  <IconId size={12} className="text-gray-500" />
                  <span className="font-mono text-xs">ID: {props.id.slice(0, 8)}...</span>
                </div>
              )}
            </div>

            {/* Score/Grade Section */}
            {(props.score || props.grade) && (
              <div className="mt-3 mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">Score</span>
                  <span className="text-sm font-bold text-gray-900">
                    {props.score ? `${props.score}%` : props.grade}
                  </span>
                </div>
                {props.score && (
                  <Progress 
                    value={props.score} 
                    color={getScoreColor()} 
                    size="sm" 
                    radius="xl"
                    className="transition-all duration-500"
                  />
                )}
              </div>
            )}

            {/* Skills Section */}
            {props.skills && props.skills.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-1.5">
                  {props.skills.slice(0, 4).map((skill, idx) => (
                    <Badge
                      key={idx}
                      size="sm"
                      variant="light"
                      color="gray"
                      className="bg-gray-100 text-gray-600 text-xs"
                      radius="xl"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {props.skills.length > 4 && (
                    <Badge
                      size="sm"
                      variant="light"
                      color="gray"
                      className="bg-gray-100 text-gray-600"
                      radius="xl"
                    >
                      +{props.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Link Button */}
        {props.credentialUrl && (
          <Tooltip label="View & Verify Credential">
            <a
              href={props.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button
                variant="light"
                size="sm"
                color="blue"
                rightSection={<IconExternalLink size={14} />}
                className="hover:bg-blue-100 transition-all duration-300 hover:scale-105"
                radius="xl"
              >
                Verify
              </Button>
            </a>
          </Tooltip>
        )}
      </div>

      {/* Optional: Show full credential ID on hover */}
      {props.id && props.id.length > 12 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <IconId size={12} />
            <span>Full Credential ID: </span>
            <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-xs">
              {props.id}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certification;