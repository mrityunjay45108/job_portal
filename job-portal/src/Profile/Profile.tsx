// import { useState } from "react";
// import { 
//   IconBriefcase, 
//   IconMapPin, 
//   IconMail, 
//   IconPhone, 
//   IconWorld, 
//   IconBrandLinkedin, 
//   IconBrandGithub,
//   IconUsers,
//   IconStar,
//   IconClock,
//   IconCheck,
//   IconAward,
//   IconCertificate,
//   IconCalendar,
//   IconFileText,
//   IconMessage,
//   IconDownload,
//   IconShare,
//   IconHeart,
//   IconFlag,
//   IconDotsVertical,
//   IconEdit
// } from "@tabler/icons-react";
// import { 
//   Button, 
//   Divider, 
//   Badge, 
//   Tabs, 
//   Progress, 
//   Avatar, 
//   Tooltip, 
//   Rating, 
//   Menu, 
//   ActionIcon, 
//   Paper, 
//   Text,
//   RingProgress
// } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
// import Experience from "./Experience";
// import Certification from "./CertiCard";
// import MessageModal from "./MessageModal";

// interface ProfileProps {
//   name?: string;
//   title?: string;
//   company?: string;
//   location?: string;
//   about?: string;
//   email?: string;
//   phone?: string;
//   website?: string;
//   linkedin?: string;
//   github?: string;
//   avatar?: string;
//   banner?: string;
//   skills?: string[];
//   experience?: any[];
//   certifications?: any[];
//   rating?: number;
//   verified?: boolean;
//   isEditable?: boolean;
//   onSave?: (data: any) => void;
// }

// const Profile = (props: ProfileProps) => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [saved, setSaved] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   // Ensure data is always an array
//   const experienceList = Array.isArray(props.experience) ? props.experience : [];
//   const certificationsList = Array.isArray(props.certifications) ? props.certifications : [];
//   const skillsList = Array.isArray(props.skills) ? props.skills : [];

//   // Calculate profile completion
//   const profileCompletion = () => {
//     const fields = [
//       props.name, 
//       props.title, 
//       props.company, 
//       props.location, 
//       props.about, 
//       props.email, 
//       props.phone, 
//       skillsList.length > 0,
//       experienceList.length > 0, 
//       certificationsList.length > 0
//     ];
//     const completed = fields.filter(Boolean).length;
//     return Math.round((completed / fields.length) * 100);
//   };

//   // Get professional avatar
//   const getAvatarUrl = () => {
//     if (props.avatar && !imageError) return props.avatar;
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name || 'User')}&background=3b82f6&color=ffffff&bold=true&size=200&fontsize=0.33&rounded=true`;
//   };

//   const completion = profileCompletion();

//   return (
//     <Paper className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      
//       {/* Cover Banner with Gradient */}
//       <div className="relative h-56 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
//         <img
//           src={props.banner || "/TalentProfile/ProfileBanner.avif"}
//           alt="Banner"
//           className="w-full h-full object-cover opacity-30"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = "/TalentProfile/ProfileBanner.avif";
//           }}
//         />
        
//         {/* Verified Badge */}
//         <div className="absolute top-4 right-4">
//           <Tooltip label="Verified Professional">
//             <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
//               <IconCheck size={16} className="text-white" />
//             </div>
//           </Tooltip>
//         </div>

//         {/* Top Right Actions Menu */}
//         <div className="absolute top-4 right-16">
//           <Menu shadow="md" width={200} position="bottom-end">
//             <Menu.Target>
//               <ActionIcon variant="filled" radius="xl" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
//                 <IconDotsVertical size={18} className="text-white" />
//               </ActionIcon>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item leftSection={<IconShare size={14} />}>Share Profile</Menu.Item>
//               <Menu.Item leftSection={<IconFlag size={14} />}>Report Profile</Menu.Item>
//               <Menu.Divider />
//               <Menu.Item leftSection={<IconFileText size={14} />}>Download Resume</Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
        
//         {/* Profile Image */}
//         <div className="absolute -bottom-16 left-6">
//           <div className="relative">
//             <Avatar
//               src={getAvatarUrl()}
//               alt={props.name}
//               size={130}
//               radius="xl"
//               className="border-4 border-white shadow-xl ring-4 ring-blue-100"
//               onError={() => setImageError(true)}
//             />
//             <Tooltip label="Online">
//               <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//             </Tooltip>
//           </div>
//         </div>
//       </div>

//       <div className="h-20"></div>

//       {/* Profile Header Section */}
//       <div className="px-6">
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div className="flex-1">
//             <div className="flex items-center gap-3 flex-wrap">
//               <h1 className="text-3xl font-bold text-gray-900">{props.name || "User Name"}</h1>
//               <Badge size="lg" variant="light" color="blue" className="bg-blue-50 text-blue-700">
//                 <div className="flex items-center gap-1">
//                   <IconStar size={12} className="fill-blue-600" />
//                   <span>Top Rated</span>
//                 </div>
//               </Badge>
//               {props.verified && (
//                 <Badge size="lg" variant="light" color="green" className="bg-green-50 text-green-700">
//                   <div className="flex items-center gap-1">
//                     <IconCheck size={12} />
//                     <span>Verified</span>
//                   </div>
//                 </Badge>
//               )}
//             </div>
            
//             <div className="mt-3 flex flex-wrap gap-4">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconBriefcase size={16} className="text-blue-500" />
//                 <span className="text-sm font-medium">
//                   {props.title || "Professional"} {props.company && `at ${props.company}`}
//                 </span>
//               </div>
//               {props.location && (
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <IconMapPin size={16} className="text-blue-500" />
//                   <span className="text-sm">{props.location}</span>
//                 </div>
//               )}
//             </div>

//             {/* Rating & Member Since */}
//             <div className="flex items-center gap-4 mt-3 flex-wrap">
//               <div className="flex items-center gap-2">
//                 <Rating value={props.rating || 4.8} readOnly size="sm" fractions={2} />
//                 <span className="text-sm font-semibold text-gray-700">{props.rating || 4.8}</span>
//                 <span className="text-xs text-gray-500">(128 reviews)</span>
//               </div>
//               <div className="flex items-center gap-1 text-xs text-gray-400">
//                 <IconCalendar size={12} />
//                 <span>Member since 2024</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex gap-2">
//             <Tooltip label={saved ? "Saved" : "Save Profile"}>
//               <Button
//                 variant={saved ? "filled" : "light"}
//                 color={saved ? "red" : "gray"}
//                 onClick={() => setSaved(!saved)}
//                 leftSection={<IconHeart size={16} className={saved ? "fill-current" : ""} />}
//                 radius="xl"
//                 className={saved ? "bg-red-500 hover:bg-red-600" : "hover:bg-gray-100"}
//               >
//                 {saved ? "Saved" : "Save"}
//               </Button>
//             </Tooltip>
//             <Button 
//               color="blue" 
//               variant="light" 
//               onClick={open}
//               leftSection={<IconMessage size={16} />}
//               radius="xl"
//               className="hover:bg-blue-100"
//             >
//               Message
//             </Button>
//             <Button 
//               color="blue" 
//               variant="outline"
//               leftSection={<IconDownload size={16} />}
//               radius="xl"
//               className="border-blue-300 text-blue-600 hover:bg-blue-50"
//             >
//               Resume
//             </Button>
//           </div>
//         </div>

//         {/* Contact Info Row with Icons */}
//         <div className="mt-5 flex flex-wrap gap-3 pb-5 border-b border-gray-200">
//           {props.email && (
//             <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
//               <IconMail size={14} className="text-blue-500" />
//               <span className="text-sm text-gray-700">{props.email}</span>
//             </div>
//           )}
//           {props.phone && (
//             <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
//               <IconPhone size={14} className="text-blue-500" />
//               <span className="text-sm text-gray-700">{props.phone}</span>
//             </div>
//           )}
//           {props.website && (
//             <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
//               <IconWorld size={14} className="text-blue-500" />
//               <a href={props.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
//                 {props.website.replace(/^https?:\/\//, '')}
//               </a>
//             </div>
//           )}
//           <div className="flex gap-2 ml-auto">
//             {props.linkedin && (
//               <a 
//                 href={props.linkedin} 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="p-2 bg-gray-100 rounded-full hover:bg-blue-50 transition-all hover:scale-110"
//               >
//                 <IconBrandLinkedin size={16} className="text-gray-600 hover:text-blue-600" />
//               </a>
//             )}
//             {props.github && (
//               <a 
//                 href={props.github} 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all hover:scale-110"
//               >
//                 <IconBrandGithub size={16} className="text-gray-600" />
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Profile Completion Progress */}
//       {completion < 100 && (
//         <div className="mx-6 mt-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//           <div className="flex justify-between items-center mb-2">
//             <div className="flex items-center gap-2">
//               <IconAward size={18} className="text-blue-600" />
//               <span className="text-sm font-semibold text-gray-700">Profile Strength</span>
//             </div>
//             <span className={`text-sm font-bold ${completion >= 70 ? 'text-green-600' : 'text-blue-600'}`}>
//               {completion}% Complete
//             </span>
//           </div>
//           <Progress value={completion} color={completion >= 70 ? "green" : "blue"} size="md" radius="xl" />
//           <p className="text-xs text-gray-500 mt-2">Complete your profile to get more opportunities</p>
//         </div>
//       )}

//       {/* Tabs Section */}
//       <div className="px-6 pt-6 pb-8">
//         <Tabs defaultValue="about" color="blue" radius="md">
//           <Tabs.List className="mb-6 border-b border-gray-200 gap-1">
//             <Tabs.Tab value="about" className="data-[active]:text-blue-600 font-semibold">
//               <IconUsers size={16} className="mr-2" />
//               About
//             </Tabs.Tab>
//             <Tabs.Tab value="skills" className="data-[active]:text-blue-600 font-semibold">
//               <IconStar size={16} className="mr-2" />
//               Skills & Expertise
//               {skillsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-100 text-blue-700">
//                   {skillsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="experience" className="data-[active]:text-blue-600 font-semibold">
//               <IconBriefcase size={16} className="mr-2" />
//               Experience
//               {experienceList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-100 text-blue-700">
//                   {experienceList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="certifications" className="data-[active]:text-blue-600 font-semibold">
//               <IconCertificate size={16} className="mr-2" />
//               Certifications
//               {certificationsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-100 text-blue-700">
//                   {certificationsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//           </Tabs.List>

//           {/* About Tab */}
//           <Tabs.Panel value="about">
//             <div className="space-y-5">
//               <Paper className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                   <IconUsers size={18} className="text-blue-600" />
//                   About Me
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed">
//                   {props.about || "Passionate professional dedicated to delivering excellence. Focused on creating innovative solutions and building meaningful connections in the industry."}
//                 </p>
//               </Paper>

//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 <Paper className="bg-blue-50 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-blue-600">{experienceList.length}</div>
//                   <div className="text-xs text-gray-600 font-medium">Years Experience</div>
//                 </Paper>
//                 <Paper className="bg-green-50 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-green-600">{skillsList.length}</div>
//                   <div className="text-xs text-gray-600 font-medium">Skills</div>
//                 </Paper>
//                 <Paper className="bg-purple-50 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-purple-600">{certificationsList.length}</div>
//                   <div className="text-xs text-gray-600 font-medium">Certifications</div>
//                 </Paper>
//                 <Paper className="bg-orange-50 rounded-xl p-4 text-center">
//                   <div className="text-2xl font-bold text-orange-600">100%</div>
//                   <div className="text-xs text-gray-600 font-medium">Job Success</div>
//                 </Paper>
//               </div>
//             </div>
//           </Tabs.Panel>

//           {/* Skills Tab */}
//           <Tabs.Panel value="skills">
//             <Paper className="bg-gray-50 rounded-xl p-6 border border-gray-100">
//               {skillsList.length > 0 ? (
//                 <div className="flex flex-wrap gap-3">
//                   {skillsList.map((skill: string, index: number) => (
//                     <Badge 
//                       key={index} 
//                       size="lg" 
//                       variant="light" 
//                       color="blue"
//                       className="bg-blue-50 text-blue-700 px-4 py-2.5 text-sm font-medium hover:bg-blue-100 transition-colors cursor-default"
//                       radius="xl"
//                     >
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No skills added yet</p>
//                 </div>
//               )}
//             </Paper>
//           </Tabs.Panel>

//           {/* Experience Tab */}
//           <Tabs.Panel value="experience">
//             <div className="space-y-5">
//               {experienceList.length > 0 ? (
//                 experienceList.map((exp: any, index: number) => (
//                   <Experience key={index} {...exp} />
//                 ))
//               ) : (
//                 <Paper className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
//                   <IconBriefcase size={48} className="mx-auto mb-3 text-gray-300" />
//                   <p className="text-gray-500">No work experience added yet</p>
//                 </Paper>
//               )}
//             </div>
//           </Tabs.Panel>

//           {/* Certifications Tab */}
//           <Tabs.Panel value="certifications">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {certificationsList.length > 0 ? (
//                 certificationsList.map((cert: any, index: number) => (
//                   <Certification key={index} {...cert} />
//                 ))
//               ) : (
//                 <div className="col-span-2">
//                   <Paper className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
//                     <IconCertificate size={48} className="mx-auto mb-3 text-gray-300" />
//                     <p className="text-gray-500">No certifications added yet</p>
//                   </Paper>
//                 </div>
//               )}
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>

//       {/* Updated MessageModal with proper name handling */}
//       <MessageModal 
//         opened={opened} 
//         onClose={close} 
//         name={props.name || "User"}  
//         avatar={props.avatar} 
//       />
//     </Paper>
//   );
// };

// export default Profile;

import { useState } from "react";
import { 
  IconBriefcase, 
  IconMapPin, 
  IconMail, 
  IconPhone, 
  IconWorld, 
  IconBrandLinkedin, 
  IconBrandGithub,
  IconUsers,
  IconStar,
  IconClock,
  IconCheck,
  IconAward,
  IconCertificate,
  IconCalendar,
  IconFileText,
  IconMessage,
  IconDownload,
  IconShare,
  IconHeart,
  IconFlag,
  IconDotsVertical,
  IconEdit,
} from "@tabler/icons-react";
import { 
  Button, 
  Divider, 
  Badge, 
  Tabs, 
  Progress, 
  Avatar, 
  Tooltip, 
  Rating, 
  Menu, 
  ActionIcon, 
  Paper, 
  Text,
  RingProgress,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import Experience from "./Experience";
import Certification from "./CertiCard";
import MessageModal from "./MessageModal";

interface ProfileProps {
  name?: string;
  title?: string;
  company?: string;
  location?: string;
  about?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
  banner?: string;
  skills?: string[];
  experience?: any[];
  certifications?: any[];
  rating?: number;
  verified?: boolean;
  isEditable?: boolean;
  onSave?: (data: any) => void;
}

const Profile = (props: ProfileProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("about");

  const experienceList = Array.isArray(props.experience) ? props.experience : [];
  const certificationsList = Array.isArray(props.certifications) ? props.certifications : [];
  const skillsList = Array.isArray(props.skills) ? props.skills : [];

  const profileCompletion = () => {
    const fields = [
      props.name, props.title, props.company, props.location, 
      props.about, props.email, props.phone, skillsList.length > 0,
      experienceList.length > 0, certificationsList.length > 0
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const getAvatarUrl = () => {
    if (props.avatar && !imageError) return props.avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name || 'User')}&background=1e40af&color=ffffff&bold=true&size=200&fontsize=0.33&rounded=true`;
  };

  const completion = profileCompletion();

  return (
    <Paper className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
      
      {/* Premium Cover Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src={props.banner || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"}
          alt="Banner"
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop";
          }}
        />
        
        {/* Premium Verified Badge */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Tooltip label="Premium Member">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-2 shadow-lg">
              <IconAward size={18} className="text-white" />
            </div>
          </Tooltip>
          <Tooltip label="Verified Professional">
            <div className="bg-green-500 rounded-full p-2 shadow-lg">
              <IconCheck size={18} className="text-white" />
            </div>
          </Tooltip>
        </div>

        {/* Premium Actions Menu */}
        <div className="absolute top-6 right-24">
          <Menu shadow="lg" width={220} position="bottom-end" withArrow>
            <Menu.Target>
              <ActionIcon variant="filled" radius="xl" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                <IconDotsVertical size={20} className="text-white" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconShare size={16} />}>Share Profile</Menu.Item>
              <Menu.Item leftSection={<IconFlag size={16} />}>Report Profile</Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconFileText size={16} />}>Download Resume (PDF)</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        
        {/* Premium Profile Image */}
        <div className="absolute -bottom-20 left-8">
          <div className="relative">
            <Avatar
              src={getAvatarUrl()}
              alt={props.name}
              size={160}
              radius="xl"
              className="border-4 border-white shadow-2xl ring-4 ring-blue-500/30"
              onError={() => setImageError(true)}
            />
            <div className="absolute bottom-2 right-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24"></div>

      {/* Premium Profile Header */}
      <div className="px-8">
        <div className="flex flex-wrap justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-4xl font-bold text-gray-900">{props.name || "Professional"}</h1>
              <div className="flex gap-2">
                <Badge size="xl" variant="light" color="blue" className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">
                  <div className="flex items-center gap-1.5">
                    <IconStar size={14} className="fill-blue-600" />
                    <span className="font-semibold">Top Rated Plus</span>
                  </div>
                </Badge>
                {props.verified && (
                  <Badge size="xl" variant="light" color="green" className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full">
                    <div className="flex items-center gap-1.5">
                      <IconCheck size={14} />
                      <span className="font-semibold">Verified</span>
                    </div>
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <IconBriefcase size={18} className="text-blue-600" />
                <span className="font-medium text-lg">{props.title || "Professional"} {props.company && `at ${props.company}`}</span>
              </div>
              {props.location && (
                <>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <IconMapPin size={16} className="text-blue-600" />
                    <span>{props.location}</span>
                  </div>
                </>
              )}
            </div>

            {/* Premium Rating Section */}
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Rating value={props.rating || 4.9} readOnly size="md" fractions={2} />
                <span className="text-lg font-bold text-gray-800 ml-2">{props.rating || 4.9}</span>
                <span className="text-gray-500 text-sm">(2,847 reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <IconCalendar size={14} />
                <span>Member since 2024</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <IconClock size={14} />
                <span>Response: within 1 hour</span>
              </div>
            </div>
          </div>
          
          {/* Premium Action Buttons */}
          <div className="flex gap-3">
            <Tooltip label={saved ? "Saved" : "Save Profile"}>
              <Button
                variant={saved ? "filled" : "light"}
                color={saved ? "red" : "gray"}
                onClick={() => setSaved(!saved)}
                leftSection={<IconHeart size={18} className={saved ? "fill-current" : ""} />}
                radius="xl"
                size="md"
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </Tooltip>
            <Button 
              color="blue" 
              variant="light" 
              onClick={open}
              leftSection={<IconMessage size={18} />}
              radius="xl"
              size="md"
            >
              Message
            </Button>
            <Button 
              color="blue" 
              variant="gradient"
              gradient={{ from: "blue", to: "indigo" }}
              leftSection={<IconDownload size={18} />}
              radius="xl"
              size="md"
            >
              Download Resume
            </Button>
          </div>
        </div>

        {/* Premium Contact Info */}
        <div className="mt-6 flex flex-wrap gap-4 pb-6 border-b border-gray-200">
          {props.email && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <IconMail size={16} className="text-blue-600" />
              <span className="text-sm text-gray-700">{props.email}</span>
            </div>
          )}
          {props.phone && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <IconPhone size={16} className="text-blue-600" />
              <span className="text-sm text-gray-700">{props.phone}</span>
            </div>
          )}
          {props.website && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <IconWorld size={16} className="text-blue-600" />
              <a href={props.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{props.website}</a>
            </div>
          )}
          {props.linkedin && (
            <a href={props.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition">
              <IconBrandLinkedin size={18} className="text-gray-600 hover:text-blue-600" />
            </a>
          )}
          {props.github && (
            <a href={props.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <IconBrandGithub size={18} className="text-gray-600" />
            </a>
          )}
        </div>
      </div>

      {/* Premium Profile Strength Card */}
      <div className="px-8 mt-6">
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md">
                  <IconAward size={20} className="text-white" />
                </div>
                <div>
                  <Text fw={700} size="lg" className="text-gray-800">Profile Strength</Text>
                  <Text size="sm" className="text-gray-500">Complete your profile to unlock premium features</Text>
                </div>
              </div>
              <div className="max-w-md">
                <Progress value={completion} color={completion >= 70 ? "green" : "blue"} size="lg" radius="xl" />
              </div>
            </div>
            <div className="text-center">
              <RingProgress
                size={100}
                thickness={8}
                sections={[{ value: completion, color: completion >= 70 ? "green" : "blue" }]}
                label={
                  <Text size="28px" fw={800} className="text-blue-600">
                    {completion}%
                  </Text>
                }
              />
            </div>
            <Button
              variant="gradient"
              gradient={{ from: "blue", to: "indigo" }}
              radius="xl"
              size="md"
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Tabs Section */}
      <div className="px-8 pt-6 pb-10">
        <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="lg" variant="pills">
          <Tabs.List className="mb-8 gap-2 flex-wrap">
            <Tabs.Tab value="about" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
              <IconUsers size={18} className="mr-2" />
              About
            </Tabs.Tab>
            <Tabs.Tab value="skills" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
              <IconStar size={18} className="mr-2" />
              Skills & Expertise
              {skillsList.length > 0 && (
                <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
                  {skillsList.length}
                </Badge>
              )}
            </Tabs.Tab>
            <Tabs.Tab value="experience" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
              <IconBriefcase size={18} className="mr-2" />
              Experience
              {experienceList.length > 0 && (
                <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
                  {experienceList.length}
                </Badge>
              )}
            </Tabs.Tab>
            <Tabs.Tab value="certifications" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
              <IconCertificate size={18} className="mr-2" />
              Certifications
              {certificationsList.length > 0 && (
                <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
                  {certificationsList.length}
                </Badge>
              )}
            </Tabs.Tab>
          </Tabs.List>

          {/* About Tab */}
          <Tabs.Panel value="about">
            <div className="space-y-6">
              <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                    <IconUsers size={18} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Bio</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {props.about || "Passionate professional dedicated to delivering excellence. Specialized in creating innovative solutions and building meaningful connections."}
                </p>
              </Paper>

              {/* Stats Cards */}
              <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-center shadow-lg">
                  <div className="text-3xl font-bold text-white">{experienceList.length}</div>
                  <div className="text-sm text-blue-100 mt-1">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-5 text-center shadow-lg">
                  <div className="text-3xl font-bold text-white">{skillsList.length}</div>
                  <div className="text-sm text-green-100 mt-1">Skills</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-center shadow-lg">
                  <div className="text-3xl font-bold text-white">{certificationsList.length}</div>
                  <div className="text-sm text-purple-100 mt-1">Certifications</div>
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-5 text-center shadow-lg">
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-orange-100 mt-1">Success Rate</div>
                </div>
              </SimpleGrid>
            </div>
          </Tabs.Panel>

          {/* Skills Tab */}
          <Tabs.Panel value="skills">
            <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              {skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skillsList.map((skill: string, index: number) => (
                    <Badge 
                      key={index} 
                      size="xl" 
                      variant="light" 
                      color="blue"
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-3 text-base font-medium shadow-sm"
                      radius="xl"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconStar size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-lg">No skills added yet</p>
                </div>
              )}
            </Paper>
          </Tabs.Panel>

          {/* Experience Tab */}
          <Tabs.Panel value="experience">
            <div className="space-y-6">
              {experienceList.length > 0 ? (
                experienceList.map((exp: any, index: number) => (
                  <Experience key={index} {...exp} />
                ))
              ) : (
                <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconBriefcase size={40} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-lg">No work experience added yet</p>
                </Paper>
              )}
            </div>
          </Tabs.Panel>

          {/* Certifications Tab */}
          <Tabs.Panel value="certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {certificationsList.length > 0 ? (
                certificationsList.map((cert: any, index: number) => (
                  <Certification key={index} {...cert} />
                ))
              ) : (
                <div className="col-span-2">
                  <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconCertificate size={40} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-lg">No certifications added yet</p>
                  </Paper>
                </div>
              )}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <MessageModal 
        opened={opened} 
        onClose={close} 
        name={props.name || "Professional"}
        avatar={props.avatar} 
      />
    </Paper>
  );
};

export default Profile;