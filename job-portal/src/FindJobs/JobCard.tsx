// import {
//   Card,
//   Group,
//   Text,
//   Avatar,
//   Badge,
//   ActionIcon,
//   Stack,
//   Divider,
//   Button,
//   Tooltip,
//   Progress
// } from "@mantine/core";
// import { IconHeart, IconHeartFilled, IconMapPin, IconBriefcase, IconClock, IconChartBar, IconCheck } from "@tabler/icons-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";

// interface JobCardProps {
//   id?: string;
//   jobTitle?: string;
//   company?: string;
//   applicants?: number;
//   experience?: string;
//   jobType?: string;
//   location?: string;
//   package?: string;
//   posted?: string;
//   description?: string;
//   logo?: string;
//   edit?: boolean;
//   skills?: string[];
//   urgentHiring?: boolean;
//   onApply?: (job: any) => void;
//   candidateProfile?: any;
// }

// const JobCard = (props: JobCardProps) => {
//   const [liked, setLiked] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const navigate = useNavigate();

//   const handleApply = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Check if user has profile
//     if (!props.candidateProfile?.fullName || props.candidateProfile?.fullName === "Guest User") {
//       notifications.show({
//         title: 'Profile Required',
//         message: 'Please complete your profile before applying',
//         color: 'orange'
//       });
//       navigate('/profile');
//       return;
//     }
    
//     setIsApplying(true);
    
//     // Navigate directly to apply page with job ID
//     navigate(`/apply/${props.id}`);
    
//     setIsApplying(false);
//   };

//   const calculateMatchScore = () => {
//     if (!props.candidateProfile?.skills || !props.skills) return 0;
//     const matched = props.skills.filter(skill => 
//       props.candidateProfile.skills.some((ps: string) => 
//         ps.toLowerCase() === skill.toLowerCase()
//       )
//     ).length;
//     return Math.round((matched / props.skills.length) * 100);
//   };

//   const matchScore = calculateMatchScore();

//   return (
//     <Card
//       className="bg-white border border-gray-200 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-xl rounded-2xl w-full h-full flex flex-col"
//       radius="lg"
//       padding="lg"
//       withBorder
//     >
//       {/* Urgent Badge */}
//       {props.urgentHiring && (
//         <div className="absolute top-3 right-3">
//           <Badge color="red" size="sm" variant="filled">⚡ Urgent</Badge>
//         </div>
//       )}

//       {/* Top Section */}
//       <Group justify="space-between" align="flex-start" wrap="nowrap">
//         <Group gap="sm" wrap="nowrap">
//           <Avatar radius="xl" color="blue" src={props.logo} className="border border-gray-200">
//             {props.company?.[0] || "∞"}
//           </Avatar>

//           <Stack gap={4}>
//             <Text fw={700} size="lg" className="text-gray-900 line-clamp-1">
//               {props.jobTitle}
//             </Text>
//             <Text size="sm" className="text-gray-500">
//               {props.company} • {props.applicants || 0} Applicants
//             </Text>
//           </Stack>
//         </Group>

//         <ActionIcon 
//           variant="subtle" 
//           color="gray" 
//           onClick={(e) => {
//             e.preventDefault(); 
//             e.stopPropagation();
//             setLiked(!liked);
//           }}
//           className="hover:bg-red-50 flex-shrink-0"
//         >
//           {liked ? <IconHeartFilled size={18} className="text-red-500" /> : <IconHeart size={18} className="text-gray-400" />}
//         </ActionIcon>
//       </Group>

//       {/* Match Score */}
//       {matchScore > 0 && (
//         <div className="mt-3">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-xs text-gray-500">Match Score</span>
//             <span className="text-xs font-semibold text-blue-600">{matchScore}%</span>
//           </div>
//           <Progress value={matchScore} color="blue" size="sm" radius="xl" />
//         </div>
//       )}

//       {/* Tags */}
//       <Group gap="xs" mt="md">
//         {props.experience && (
//           <Badge color="blue" variant="light" radius="xl" className="bg-blue-50 text-blue-700">
//             {props.experience}
//           </Badge>
//         )}
//         {props.jobType && (
//           <Badge color="green" variant="light" radius="xl" className="bg-green-50 text-green-700">
//             {props.jobType}
//           </Badge>
//         )}
//         {props.location && (
//           <Badge color="orange" variant="light" radius="xl" className="bg-orange-50 text-orange-700">
//             {props.location}
//           </Badge>
//         )}
//       </Group>

//       {/* Skills Tags */}
//       {props.skills && props.skills.length > 0 && (
//         <Group gap="xs" mt="xs">
//           {props.skills.slice(0, 3).map((skill, index) => (
//             <Badge key={index} size="sm" variant="light" color="gray" className="text-gray-600">
//               {skill}
//             </Badge>
//           ))}
//           {props.skills.length > 3 && (
//             <Badge size="sm" variant="light" color="gray">
//               +{props.skills.length - 3}
//             </Badge>
//           )}
//         </Group>
//       )}

//       {/* Description */}
//       {props.description && (
//         <Text size="sm" className="text-gray-600" mt="md" lineClamp={2}>
//           {props.description}
//         </Text>
//       )}

//       <Divider my="md" className="border-gray-200" />

//       {/* Footer */}
//       <Group justify="space-between" wrap="wrap">
//         <div>
//           <Text fw={700} size="lg" className="text-blue-600">
//             {props.package || "Negotiable"}
//           </Text>
//           <Group gap="xs" mt={4}>
//             <IconClock size={12} className="text-gray-400" />
//             <Text size="xs" className="text-gray-500">
//               {props.posted || "Just now"}
//             </Text>
//           </Group>
//         </div>
//         <Group gap="xs">
//           <IconMapPin size={14} className="text-gray-400" />
//           <Text size="xs" className="text-gray-500">
//             {props.location}
//           </Text>
//         </Group>
//       </Group>

//       {/* Apply Button - Direct Apply Page Navigation */}
//       {!props.edit && (
//         <Button
//           fullWidth
//           mt="md"
//           radius="xl"
//           size="sm"
//           loading={isApplying}
//           onClick={handleApply}
//           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//         >
//           Apply Now
//         </Button>
//       )}

//       {/* Edit Button Logic */}
//       {props.edit && (
//         <Badge color="blue" variant="filled" fullWidth mt="md" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//           Manage Job
//         </Badge>
//       )}
//     </Card>
//   );
// };

// export default JobCard;

// import {
//   Card,
//   Group,
//   Text,
//   Avatar,
//   Badge,
//   ActionIcon,
//   Stack,
//   Divider,
//   Button,
//   Tooltip,
//   Progress
// } from "@mantine/core";
// import { IconHeart, IconHeartFilled, IconMapPin, IconBriefcase, IconClock, IconChartBar, IconCheck } from "@tabler/icons-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";
// import { useAuth } from "../context/AuthContext";

// interface JobCardProps {
//   id?: string;
//   jobTitle?: string;
//   company?: string;
//   applicants?: number;
//   experience?: string;
//   jobType?: string;
//   location?: string;
//   package?: string;
//   posted?: string;
//   description?: string;
//   logo?: string;
//   edit?: boolean;
//   skills?: string[];
//   urgentHiring?: boolean;
//   onApply?: (job: any) => void;
//   candidateProfile?: any;
// }

// const JobCard = (props: JobCardProps) => {
//   const [liked, setLiked] = useState(false);
//   const [isApplying, setIsApplying] = useState(false);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   const handleApply = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Check if user is logged in
//     if (!isAuthenticated) {
//       notifications.show({
//         title: 'Login Required',
//         message: 'Please login to apply for this job',
//         color: 'orange'
//       });
//       navigate('/login', { state: { from: `/apply/${props.id}` } });
//       return;
//     }
    
//     // Check if profile is complete
//     if (!props.candidateProfile?.fullName || props.candidateProfile?.fullName === "Guest User") {
//       notifications.show({
//         title: 'Profile Required',
//         message: 'Please complete your profile before applying',
//         color: 'orange'
//       });
//       navigate('/profile');
//       return;
//     }
    
//     setIsApplying(true);
    
//     // Call onApply callback if provided
//     if (props.onApply) {
//       props.onApply(props);
//     } else {
//       navigate(`/apply/${props.id}`);
//     }
    
//     setIsApplying(false);
//   };

//   const calculateMatchScore = () => {
//     if (!props.candidateProfile?.skills || !props.skills) return 0;
//     const matched = props.skills.filter(skill => 
//       props.candidateProfile.skills.some((ps: string) => 
//         ps.toLowerCase() === skill.toLowerCase()
//       )
//     ).length;
//     return Math.round((matched / props.skills.length) * 100);
//   };

//   const matchScore = calculateMatchScore();

//   return (
//     <Card
//       className="bg-white border border-gray-200 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-xl rounded-2xl w-full h-full flex flex-col"
//       radius="lg"
//       padding="lg"
//       withBorder
//     >
//       {/* Urgent Badge */}
//       {props.urgentHiring && (
//         <div className="absolute top-3 right-3">
//           <Badge color="red" size="sm" variant="filled">⚡ Urgent</Badge>
//         </div>
//       )}

//       {/* Top Section */}
//       <Group justify="space-between" align="flex-start" wrap="nowrap">
//         <Group gap="sm" wrap="nowrap">
//           <Avatar radius="xl" color="blue" src={props.logo} className="border border-gray-200">
//             {props.company?.[0] || "∞"}
//           </Avatar>

//           <Stack gap={4}>
//             <Text fw={700} size="lg" className="text-gray-900 line-clamp-1">
//               {props.jobTitle}
//             </Text>
//             <Text size="sm" className="text-gray-500">
//               {props.company} • {props.applicants || 0} Applicants
//             </Text>
//           </Stack>
//         </Group>

//         <ActionIcon 
//           variant="subtle" 
//           color="gray" 
//           onClick={(e) => {
//             e.preventDefault(); 
//             e.stopPropagation();
//             setLiked(!liked);
//           }}
//           className="hover:bg-red-50 flex-shrink-0"
//         >
//           {liked ? <IconHeartFilled size={18} className="text-red-500" /> : <IconHeart size={18} className="text-gray-400" />}
//         </ActionIcon>
//       </Group>

//       {/* Match Score */}
//       {matchScore > 0 && (
//         <div className="mt-3">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-xs text-gray-500">Match Score</span>
//             <span className="text-xs font-semibold text-blue-600">{matchScore}%</span>
//           </div>
//           <Progress value={matchScore} color="blue" size="sm" radius="xl" />
//         </div>
//       )}

//       {/* Tags */}
//       <Group gap="xs" mt="md">
//         {props.experience && (
//           <Badge color="blue" variant="light" radius="xl" className="bg-blue-50 text-blue-700">
//             {props.experience}
//           </Badge>
//         )}
//         {props.jobType && (
//           <Badge color="green" variant="light" radius="xl" className="bg-green-50 text-green-700">
//             {props.jobType}
//           </Badge>
//         )}
//         {props.location && (
//           <Badge color="orange" variant="light" radius="xl" className="bg-orange-50 text-orange-700">
//             {props.location}
//           </Badge>
//         )}
//       </Group>

//       {/* Skills Tags */}
//       {props.skills && props.skills.length > 0 && (
//         <Group gap="xs" mt="xs">
//           {props.skills.slice(0, 3).map((skill, index) => (
//             <Badge key={index} size="sm" variant="light" color="gray" className="text-gray-600">
//               {skill}
//             </Badge>
//           ))}
//           {props.skills.length > 3 && (
//             <Badge size="sm" variant="light" color="gray">
//               +{props.skills.length - 3}
//             </Badge>
//           )}
//         </Group>
//       )}

//       {/* Description */}
//       {props.description && (
//         <Text size="sm" className="text-gray-600" mt="md" lineClamp={2}>
//           {props.description}
//         </Text>
//       )}

//       <Divider my="md" className="border-gray-200" />

//       {/* Footer */}
//       <Group justify="space-between" wrap="wrap">
//         <div>
//           <Text fw={700} size="lg" className="text-blue-600">
//             {props.package || "Negotiable"}
//           </Text>
//           <Group gap="xs" mt={4}>
//             <IconClock size={12} className="text-gray-400" />
//             <Text size="xs" className="text-gray-500">
//               {props.posted || "Just now"}
//             </Text>
//           </Group>
//         </div>
//         <Group gap="xs">
//           <IconMapPin size={14} className="text-gray-400" />
//           <Text size="xs" className="text-gray-500">
//             {props.location}
//           </Text>
//         </Group>
//       </Group>

//       {/* Apply Button */}
//       {!props.edit && (
//         <Button
//           fullWidth
//           mt="md"
//           radius="xl"
//           size="sm"
//           loading={isApplying}
//           onClick={handleApply}
//           className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
//         >
//           Apply Now
//         </Button>
//       )}

//       {/* Edit Button Logic */}
//       {props.edit && (
//         <Badge color="blue" variant="filled" fullWidth mt="md" size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//           Manage Job
//         </Badge>
//       )}
//     </Card>
//   );
// };

// export default JobCard;

// src/components/FindJobs/JobCard.tsx
import {
  Card,
  Group,
  Text,
  Avatar,
  Badge,
  ActionIcon,
  Stack,
  Divider,
  Button,
} from "@mantine/core";
import { IconHeart, IconHeartFilled, IconMapPin, IconClock } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface JobCardProps {
  _id?: string;
  jobTitle?: string;
  companyName?: string;
  applicantsCount?: number;
  experience?: string;
  jobType?: string;
  location?: string;
  salary?: string;
  postedDate?: string;
  description?: string;
  skills?: string[];
  urgentHiring?: boolean;
  onApply?: (job: any) => void;
}

const JobCard = (props: JobCardProps) => {
  const [liked, setLiked] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleApply = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsApplying(true);
    
    // Create job object to pass to onApply
    const jobData = {
      _id: props._id,
      jobTitle: props.jobTitle,
      companyName: props.companyName,
    };
    
    if (props.onApply) {
      props.onApply(jobData);
    }
    
    setIsApplying(false);
  };

  const handleCardClick = () => {
    if (props._id) {
      navigate(`/job/${props._id}`);
    }
  };

  return (
    <Card
      className="bg-white border border-gray-200 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-xl rounded-2xl w-full h-full flex flex-col"
      radius="lg"
      padding="lg"
      withBorder
      onClick={handleCardClick}
    >
      {props.urgentHiring && (
        <div className="absolute top-3 right-3">
          <Badge color="red" size="sm" variant="filled">⚡ Urgent</Badge>
        </div>
      )}

      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Avatar radius="xl" color="blue" className="border border-gray-200">
            {props.companyName?.[0] || "∞"}
          </Avatar>

          <Stack gap={4}>
            <Text fw={700} size="lg" className="text-gray-900 line-clamp-1">
              {props.jobTitle}
            </Text>
            <Text size="sm" className="text-gray-500">
              {props.companyName} • {props.applicantsCount || 0} Applicants
            </Text>
          </Stack>
        </Group>

        <ActionIcon 
          variant="subtle" 
          color="gray" 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="hover:bg-red-50 flex-shrink-0"
        >
          {liked ? <IconHeartFilled size={18} className="text-red-500" /> : <IconHeart size={18} className="text-gray-400" />}
        </ActionIcon>
      </Group>

      <Group gap="xs" mt="md">
        {props.experience && (
          <Badge color="blue" variant="light" radius="xl" className="bg-blue-50 text-blue-700">
            {props.experience}
          </Badge>
        )}
        {props.jobType && (
          <Badge color="green" variant="light" radius="xl" className="bg-green-50 text-green-700">
            {props.jobType}
          </Badge>
        )}
        {props.location && (
          <Badge color="orange" variant="light" radius="xl" className="bg-orange-50 text-orange-700">
            {props.location}
          </Badge>
        )}
      </Group>

      {props.skills && props.skills.length > 0 && (
        <Group gap="xs" mt="xs">
          {props.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} size="sm" variant="light" color="gray" className="text-gray-600">
              {skill}
            </Badge>
          ))}
          {props.skills.length > 3 && (
            <Badge size="sm" variant="light" color="gray">
              +{props.skills.length - 3}
            </Badge>
          )}
        </Group>
      )}

      {props.description && (
        <Text size="sm" className="text-gray-600" mt="md" lineClamp={2}>
          {props.description}
        </Text>
      )}

      <Divider my="md" className="border-gray-200" />

      <Group justify="space-between" wrap="wrap">
        <div>
          <Text fw={700} size="lg" className="text-blue-600">
            {props.salary || "Negotiable"}
          </Text>
          <Group gap="xs" mt={4}>
            <IconClock size={12} className="text-gray-400" />
            <Text size="xs" className="text-gray-500">
              {props.postedDate || "Just now"}
            </Text>
          </Group>
        </div>
        <Group gap="xs">
          <IconMapPin size={14} className="text-gray-400" />
          <Text size="xs" className="text-gray-500">
            {props.location}
          </Text>
        </Group>
      </Group>

      {/* ✅ Apply Button - navigates to apply page */}
      <Button
        fullWidth
        mt="md"
        radius="xl"
        size="sm"
        loading={isApplying}
        onClick={handleApply}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
      >
        Apply Now
      </Button>
    </Card>
  );
};

export default JobCard;