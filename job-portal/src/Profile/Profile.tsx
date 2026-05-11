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
//   IconEdit,
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
//   RingProgress,
//   SimpleGrid,
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
//   const [activeTab, setActiveTab] = useState<string | null>("about");

//   const experienceList = Array.isArray(props.experience) ? props.experience : [];
//   const certificationsList = Array.isArray(props.certifications) ? props.certifications : [];
//   const skillsList = Array.isArray(props.skills) ? props.skills : [];

//   const profileCompletion = () => {
//     const fields = [
//       props.name, props.title, props.company, props.location, 
//       props.about, props.email, props.phone, skillsList.length > 0,
//       experienceList.length > 0, certificationsList.length > 0
//     ];
//     const completed = fields.filter(Boolean).length;
//     return Math.round((completed / fields.length) * 100);
//   };

//   const getAvatarUrl = () => {
//     if (props.avatar && !imageError) return props.avatar;
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name || 'User')}&background=1e40af&color=ffffff&bold=true&size=200&fontsize=0.33&rounded=true`;
//   };

//   const completion = profileCompletion();

//   return (
//     <Paper className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
      
//       {/* Premium Cover Banner */}
//       <div className="relative h-64 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <img
//           src={props.banner || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"}
//           alt="Banner"
//           className="w-full h-full object-cover opacity-40"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop";
//           }}
//         />
        
//         {/* Premium Verified Badge */}
//         <div className="absolute top-6 right-6 flex gap-2">
//           <Tooltip label="Premium Member">
//             <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-2 shadow-lg">
//               <IconAward size={18} className="text-white" />
//             </div>
//           </Tooltip>
//           <Tooltip label="Verified Professional">
//             <div className="bg-green-500 rounded-full p-2 shadow-lg">
//               <IconCheck size={18} className="text-white" />
//             </div>
//           </Tooltip>
//         </div>

//         {/* Premium Actions Menu */}
//         <div className="absolute top-6 right-24">
//           <Menu shadow="lg" width={220} position="bottom-end" withArrow>
//             <Menu.Target>
//               <ActionIcon variant="filled" radius="xl" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
//                 <IconDotsVertical size={20} className="text-white" />
//               </ActionIcon>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item leftSection={<IconShare size={16} />}>Share Profile</Menu.Item>
//               <Menu.Item leftSection={<IconFlag size={16} />}>Report Profile</Menu.Item>
//               <Menu.Divider />
//               <Menu.Item leftSection={<IconFileText size={16} />}>Download Resume (PDF)</Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
        
//         {/* Premium Profile Image */}
//         <div className="absolute -bottom-20 left-8">
//           <div className="relative">
//             <Avatar
//               src={getAvatarUrl()}
//               alt={props.name}
//               size={160}
//               radius="xl"
//               className="border-4 border-white shadow-2xl ring-4 ring-blue-500/30"
//               onError={() => setImageError(true)}
//             />
//             <div className="absolute bottom-2 right-2">
//               <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="h-24"></div>

//       {/* Premium Profile Header */}
//       <div className="px-8">
//         <div className="flex flex-wrap justify-between items-start gap-6">
//           <div className="flex-1">
//             <div className="flex items-center gap-4 flex-wrap">
//               <h1 className="text-4xl font-bold text-gray-900">{props.name || "Professional"}</h1>
//               <div className="flex gap-2">
//                 <Badge size="xl" variant="light" color="blue" className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">
//                   <div className="flex items-center gap-1.5">
//                     <IconStar size={14} className="fill-blue-600" />
//                     <span className="font-semibold">Top Rated Plus</span>
//                   </div>
//                 </Badge>
//                 {props.verified && (
//                   <Badge size="xl" variant="light" color="green" className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full">
//                     <div className="flex items-center gap-1.5">
//                       <IconCheck size={14} />
//                       <span className="font-semibold">Verified</span>
//                     </div>
//                   </Badge>
//                 )}
//               </div>
//             </div>
            
//             <div className="mt-4 flex flex-wrap gap-4 items-center">
//               <div className="flex items-center gap-2 text-gray-700">
//                 <IconBriefcase size={18} className="text-blue-600" />
//                 <span className="font-medium text-lg">{props.title || "Professional"} {props.company && `at ${props.company}`}</span>
//               </div>
//               {props.location && (
//                 <>
//                   <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <IconMapPin size={16} className="text-blue-600" />
//                     <span>{props.location}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Premium Rating Section */}
//             <div className="flex items-center gap-6 mt-4 flex-wrap">
//               <div className="flex items-center gap-3">
//                 <Rating value={props.rating || 4.9} readOnly size="md" fractions={2} />
//                 <span className="text-lg font-bold text-gray-800 ml-2">{props.rating || 4.9}</span>
//                 <span className="text-gray-500 text-sm">(2,847 reviews)</span>
//               </div>
//               <div className="flex items-center gap-1 text-sm text-gray-400">
//                 <IconCalendar size={14} />
//                 <span>Member since 2024</span>
//               </div>
//               <div className="flex items-center gap-1 text-sm text-gray-400">
//                 <IconClock size={14} />
//                 <span>Response: within 1 hour</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Premium Action Buttons */}
//           <div className="flex gap-3">
//             <Tooltip label={saved ? "Saved" : "Save Profile"}>
//               <Button
//                 variant={saved ? "filled" : "light"}
//                 color={saved ? "red" : "gray"}
//                 onClick={() => setSaved(!saved)}
//                 leftSection={<IconHeart size={18} className={saved ? "fill-current" : ""} />}
//                 radius="xl"
//                 size="md"
//               >
//                 {saved ? "Saved" : "Save"}
//               </Button>
//             </Tooltip>
//             <Button 
//               color="blue" 
//               variant="light" 
//               onClick={open}
//               leftSection={<IconMessage size={18} />}
//               radius="xl"
//               size="md"
//             >
//               Message
//             </Button>
//             <Button 
//               color="blue" 
//               variant="gradient"
//               gradient={{ from: "blue", to: "indigo" }}
//               leftSection={<IconDownload size={18} />}
//               radius="xl"
//               size="md"
//             >
//               Download Resume
//             </Button>
//           </div>
//         </div>

//         {/* Premium Contact Info */}
//         <div className="mt-6 flex flex-wrap gap-4 pb-6 border-b border-gray-200">
//           {props.email && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//               <IconMail size={16} className="text-blue-600" />
//               <span className="text-sm text-gray-700">{props.email}</span>
//             </div>
//           )}
//           {props.phone && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//               <IconPhone size={16} className="text-blue-600" />
//               <span className="text-sm text-gray-700">{props.phone}</span>
//             </div>
//           )}
//           {props.website && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
//               <IconWorld size={16} className="text-blue-600" />
//               <a href={props.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{props.website}</a>
//             </div>
//           )}
//           {props.linkedin && (
//             <a href={props.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition">
//               <IconBrandLinkedin size={18} className="text-gray-600 hover:text-blue-600" />
//             </a>
//           )}
//           {props.github && (
//             <a href={props.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
//               <IconBrandGithub size={18} className="text-gray-600" />
//             </a>
//           )}
//         </div>
//       </div>

//       {/* Premium Profile Strength Card */}
//       <div className="px-8 mt-6">
//         <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
//           <div className="flex flex-wrap justify-between items-center gap-6">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md">
//                   <IconAward size={20} className="text-white" />
//                 </div>
//                 <div>
//                   <Text fw={700} size="lg" className="text-gray-800">Profile Strength</Text>
//                   <Text size="sm" className="text-gray-500">Complete your profile to unlock premium features</Text>
//                 </div>
//               </div>
//               <div className="max-w-md">
//                 <Progress value={completion} color={completion >= 70 ? "green" : "blue"} size="lg" radius="xl" />
//               </div>
//             </div>
//             <div className="text-center">
//               <RingProgress
//                 size={100}
//                 thickness={8}
//                 sections={[{ value: completion, color: completion >= 70 ? "green" : "blue" }]}
//                 label={
//                   <Text size="28px" fw={800} className="text-blue-600">
//                     {completion}%
//                   </Text>
//                 }
//               />
//             </div>
//             <Button
//               variant="gradient"
//               gradient={{ from: "blue", to: "indigo" }}
//               radius="xl"
//               size="md"
//             >
//               Complete Profile
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Premium Tabs Section */}
//       <div className="px-8 pt-6 pb-10">
//         <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="lg" variant="pills">
//           <Tabs.List className="mb-8 gap-2 flex-wrap">
//             <Tabs.Tab value="about" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
//               <IconUsers size={18} className="mr-2" />
//               About
//             </Tabs.Tab>
//             <Tabs.Tab value="skills" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
//               <IconStar size={18} className="mr-2" />
//               Skills & Expertise
//               {skillsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {skillsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="experience" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
//               <IconBriefcase size={18} className="mr-2" />
//               Experience
//               {experienceList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {experienceList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="certifications" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl">
//               <IconCertificate size={18} className="mr-2" />
//               Certifications
//               {certificationsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {certificationsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//           </Tabs.List>

//           {/* About Tab */}
//           <Tabs.Panel value="about">
//             <div className="space-y-6">
//               <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
//                     <IconUsers size={18} className="text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Bio</h3>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed text-lg">
//                   {props.about || "Passionate professional dedicated to delivering excellence. Specialized in creating innovative solutions and building meaningful connections."}
//                 </p>
//               </Paper>

//               {/* Stats Cards */}
//               <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
//                 <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-center shadow-lg">
//                   <div className="text-3xl font-bold text-white">{experienceList.length}</div>
//                   <div className="text-sm text-blue-100 mt-1">Years Experience</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-5 text-center shadow-lg">
//                   <div className="text-3xl font-bold text-white">{skillsList.length}</div>
//                   <div className="text-sm text-green-100 mt-1">Skills</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-center shadow-lg">
//                   <div className="text-3xl font-bold text-white">{certificationsList.length}</div>
//                   <div className="text-sm text-purple-100 mt-1">Certifications</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-5 text-center shadow-lg">
//                   <div className="text-3xl font-bold text-white">100%</div>
//                   <div className="text-sm text-orange-100 mt-1">Success Rate</div>
//                 </div>
//               </SimpleGrid>
//             </div>
//           </Tabs.Panel>

//           {/* Skills Tab */}
//           <Tabs.Panel value="skills">
//             <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
//               {skillsList.length > 0 ? (
//                 <div className="flex flex-wrap gap-3">
//                   {skillsList.map((skill: string, index: number) => (
//                     <Badge 
//                       key={index} 
//                       size="xl" 
//                       variant="light" 
//                       color="blue"
//                       className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-3 text-base font-medium shadow-sm"
//                       radius="xl"
//                     >
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <IconStar size={32} className="text-gray-300" />
//                   </div>
//                   <p className="text-gray-500 text-lg">No skills added yet</p>
//                 </div>
//               )}
//             </Paper>
//           </Tabs.Panel>

//           {/* Experience Tab */}
//           <Tabs.Panel value="experience">
//             <div className="space-y-6">
//               {experienceList.length > 0 ? (
//                 experienceList.map((exp: any, index: number) => (
//                   <Experience key={index} {...exp} />
//                 ))
//               ) : (
//                 <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <IconBriefcase size={40} className="text-gray-300" />
//                   </div>
//                   <p className="text-gray-500 text-lg">No work experience added yet</p>
//                 </Paper>
//               )}
//             </div>
//           </Tabs.Panel>

//           {/* Certifications Tab */}
//           <Tabs.Panel value="certifications">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {certificationsList.length > 0 ? (
//                 certificationsList.map((cert: any, index: number) => (
//                   <Certification key={index} {...cert} />
//                 ))
//               ) : (
//                 <div className="col-span-2">
//                   <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
//                     <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <IconCertificate size={40} className="text-gray-300" />
//                     </div>
//                     <p className="text-gray-500 text-lg">No certifications added yet</p>
//                   </Paper>
//                 </div>
//               )}
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>

//       <MessageModal 
//         opened={opened} 
//         onClose={close} 
//         name={props.name || "Professional"}
//         avatar={props.avatar} 
//       />
//     </Paper>
//   );
// };

// export default Profile;


// import { useState, useRef } from "react";
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
//   IconEdit,
//   IconCamera,
//   IconPlus,
//   IconTrash,
//   IconBrandTwitter,
//   IconBrandInstagram,
//   IconBrandYoutube,
//   IconX,
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
//   RingProgress,
//   SimpleGrid,
//   Modal,
//   TextInput,
//   Textarea,
//   Stack,
//   Group,
//   Switch,
//   Select,
//   ScrollArea,
// } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';
// import { notifications } from "@mantine/notifications";
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
//   twitter?: string;
//   instagram?: string;
//   youtube?: string;
//   avatar?: string;
//   banner?: string;
//   skills?: string[];
//   experience?: any[];
//   certifications?: any[];
//   rating?: number;
//   verified?: boolean;
//   isEditable?: boolean;
//   onSave?: (data: any) => void;
//   onAvatarChange?: (file: File) => void;
//   onProfileComplete?: () => void;
// }

// const Profile = (props: ProfileProps) => {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
//   const [saved, setSaved] = useState(false);
//   const [activeTab, setActiveTab] = useState<string | null>("about");
//   const [uploading, setUploading] = useState(false);
//   const [editedData, setEditedData] = useState(props);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const experienceList = Array.isArray(props.experience) ? props.experience : [];
//   const certificationsList = Array.isArray(props.certifications) ? props.certifications : [];
//   const skillsList = Array.isArray(props.skills) ? props.skills : [];

//   const profileCompletion = () => {
//     const fields = [
//       props.name, props.title, props.company, props.location, 
//       props.about, props.email, props.phone, skillsList.length > 0,
//       experienceList.length > 0, certificationsList.length > 0,
//       props.linkedin, props.github
//     ];
//     const completed = fields.filter(Boolean).length;
//     return Math.round((completed / fields.length) * 100);
//   };

//   const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       notifications.show({
//         title: "Invalid File",
//         message: "Please upload an image file",
//         color: "red"
//       });
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       notifications.show({
//         title: "File Too Large",
//         message: "Please upload an image smaller than 5MB",
//         color: "red"
//       });
//       return;
//     }

//     setUploading(true);
    
//     setTimeout(() => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (props.onAvatarChange) {
//           props.onAvatarChange(file);
//         }
//         setUploading(false);
//         notifications.show({
//           title: "Success!",
//           message: "Profile picture updated successfully",
//           color: "green"
//         });
//       };
//       reader.readAsDataURL(file);
//     }, 1000);
//   };

//   const handleSaveProfile = () => {
//     if (props.onSave) {
//       props.onSave(editedData);
//     }
//     closeEditModal();
//     notifications.show({
//       title: "Profile Updated",
//       message: "Your profile has been updated successfully",
//       color: "green"
//     });
//   };

//   const handleCompleteProfile = () => {
//     openEditModal();
//     if (props.onProfileComplete) {
//       props.onProfileComplete();
//     }
//   };

//   const getAvatarUrl = () => {
//     if (props.avatar) return props.avatar;
//     return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name || 'User')}&background=1e40af&color=ffffff&bold=true&size=200&fontsize=0.33&rounded=true`;
//   };

//   const completion = profileCompletion();
//   const isProfileComplete = completion === 100;

//   return (
//     <Paper className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
      
//       {/* Premium Cover - Clean Gradient without Image */}
//       <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
//         {/* Decorative pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
//           <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//         </div>
        
//         {/* Premium Verified Badge */}
//         <div className="absolute top-6 right-6 flex gap-2">
//           <Tooltip label="Premium Member">
//             <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-2 shadow-lg cursor-pointer transition-transform hover:scale-105">
//               <IconAward size={18} className="text-white" />
//             </div>
//           </Tooltip>
//           <Tooltip label="Verified Professional">
//             <div className="bg-green-500 rounded-full p-2 shadow-lg cursor-pointer transition-transform hover:scale-105">
//               <IconCheck size={18} className="text-white" />
//             </div>
//           </Tooltip>
//         </div>

//         {/* Premium Actions Menu */}
//         <div className="absolute top-6 right-28">
//           <Menu shadow="lg" width={220} position="bottom-end" withArrow>
//             <Menu.Target>
//               <ActionIcon variant="filled" radius="xl" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
//                 <IconDotsVertical size={20} className="text-white" />
//               </ActionIcon>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item leftSection={<IconShare size={16} />}>Share Profile</Menu.Item>
//               <Menu.Item leftSection={<IconFlag size={16} />}>Report Profile</Menu.Item>
//               <Menu.Divider />
//               <Menu.Item leftSection={<IconFileText size={16} />}>Download Resume (PDF)</Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
        
//         {/* Profile Image with Upload */}
//         <div className="absolute -bottom-16 left-8">
//           <div className="relative group">
//             <Avatar
//               src={getAvatarUrl()}
//               alt={props.name}
//               size={140}
//               radius="xl"
//               className="border-4 border-white shadow-2xl ring-4 ring-blue-500/30 transition-all duration-300 group-hover:ring-blue-500/50"
//             />
//             {props.isEditable && (
//               <>
//                 <div 
//                   className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <IconCamera size={28} className="text-white" />
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleAvatarUpload}
//                   disabled={uploading}
//                 />
//               </>
//             )}
//             {uploading && (
//               <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
//                 <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               </div>
//             )}
//             <div className="absolute bottom-2 right-2">
//               <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="h-20"></div>

//       {/* Premium Profile Header */}
//       <div className="px-8">
//         <div className="flex flex-wrap justify-between items-start gap-6">
//           <div className="flex-1">
//             <div className="flex items-center gap-4 flex-wrap">
//               <h1 className="text-3xl font-bold text-gray-900">{props.name || "Professional"}</h1>
//               <div className="flex gap-2">
//                 <Badge size="xl" variant="light" color="blue" className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full">
//                   <div className="flex items-center gap-1.5">
//                     <IconStar size={14} className="fill-blue-600" />
//                     <span className="font-semibold">Top Rated Plus</span>
//                   </div>
//                 </Badge>
//                 {props.verified && (
//                   <Badge size="xl" variant="light" color="green" className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full">
//                     <div className="flex items-center gap-1.5">
//                       <IconCheck size={14} />
//                       <span className="font-semibold">Verified</span>
//                     </div>
//                   </Badge>
//                 )}
//               </div>
//             </div>
            
//             <div className="mt-4 flex flex-wrap gap-4 items-center">
//               <div className="flex items-center gap-2 text-gray-700">
//                 <IconBriefcase size={18} className="text-blue-600" />
//                 <span className="font-medium text-lg">{props.title || "Professional"} {props.company && `at ${props.company}`}</span>
//               </div>
//               {props.location && (
//                 <>
//                   <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <IconMapPin size={16} className="text-blue-600" />
//                     <span>{props.location}</span>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Premium Rating Section */}
//             <div className="flex items-center gap-6 mt-4 flex-wrap">
//               <div className="flex items-center gap-3">
//                 <Rating value={props.rating || 4.9} readOnly size="md" fractions={2} />
//                 <span className="text-lg font-bold text-gray-800 ml-2">{props.rating || 4.9}</span>
//                 <span className="text-gray-500 text-sm">(2,847 reviews)</span>
//               </div>
//               <div className="flex items-center gap-1 text-sm text-gray-400">
//                 <IconCalendar size={14} />
//                 <span>Member since 2024</span>
//               </div>
//               <div className="flex items-center gap-1 text-sm text-gray-400">
//                 <IconClock size={14} />
//                 <span>Response: within 1 hour</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Premium Action Buttons */}
//           <div className="flex gap-3 flex-wrap">
//             <Tooltip label={saved ? "Saved" : "Save Profile"}>
//               <Button
//                 variant={saved ? "filled" : "light"}
//                 color={saved ? "red" : "gray"}
//                 onClick={() => setSaved(!saved)}
//                 leftSection={<IconHeart size={18} className={saved ? "fill-current" : ""} />}
//                 radius="xl"
//                 size="md"
//               >
//                 {saved ? "Saved" : "Save"}
//               </Button>
//             </Tooltip>
//             <Button 
//               color="blue" 
//               variant="light" 
//               onClick={open}
//               leftSection={<IconMessage size={18} />}
//               radius="xl"
//               size="md"
//             >
//               Message
//             </Button>
//             <Button 
//               color="blue" 
//               variant="gradient"
//               gradient={{ from: "blue", to: "indigo" }}
//               leftSection={<IconDownload size={18} />}
//               radius="xl"
//               size="md"
//             >
//               Download Resume
//             </Button>
//           </div>
//         </div>

//         {/* Premium Contact Info */}
//         <div className="mt-6 flex flex-wrap gap-4 pb-6 border-b border-gray-200">
//           {props.email && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
//               <IconMail size={16} className="text-blue-600" />
//               <span className="text-sm text-gray-700">{props.email}</span>
//             </div>
//           )}
//           {props.phone && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
//               <IconPhone size={16} className="text-blue-600" />
//               <span className="text-sm text-gray-700">{props.phone}</span>
//             </div>
//           )}
//           {props.website && (
//             <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
//               <IconWorld size={16} className="text-blue-600" />
//               <a href={props.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{props.website}</a>
//             </div>
//           )}
//           {props.linkedin && (
//             <a href={props.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-all hover:scale-110">
//               <IconBrandLinkedin size={18} className="text-gray-600 hover:text-blue-600" />
//             </a>
//           )}
//           {props.github && (
//             <a href={props.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all hover:scale-110">
//               <IconBrandGithub size={18} className="text-gray-600" />
//             </a>
//           )}
//           {props.twitter && (
//             <a href={props.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-sky-100 transition-all hover:scale-110">
//               <IconBrandTwitter size={18} className="text-gray-600 hover:text-sky-500" />
//             </a>
//           )}
//         </div>
//       </div>

//       {/* Profile Strength Card with Complete Profile Button */}
//       <div className="px-8 mt-6">
//         <div className={`rounded-2xl p-6 border transition-all duration-300 ${
//           isProfileComplete 
//             ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
//             : "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-100"
//         }`}>
//           <div className="flex flex-wrap justify-between items-center gap-6">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className={`p-2 rounded-xl shadow-md transition-all ${
//                   isProfileComplete 
//                     ? "bg-gradient-to-r from-green-600 to-emerald-600" 
//                     : "bg-gradient-to-r from-blue-600 to-indigo-600"
//                 }`}>
//                   {isProfileComplete ? <IconCheck size={20} className="text-white" /> : <IconAward size={20} className="text-white" />}
//                 </div>
//                 <div>
//                   <Text fw={700} size="lg" className="text-gray-800">
//                     {isProfileComplete ? "Profile Complete! 🎉" : "Profile Strength"}
//                   </Text>
//                   <Text size="sm" className="text-gray-500">
//                     {isProfileComplete 
//                       ? "Your profile is 100% complete. You're ready to shine!" 
//                       : "Complete your profile to unlock premium features and get noticed by top recruiters"}
//                   </Text>
//                 </div>
//               </div>
//               <div className="max-w-md">
//                 <Progress 
//                   value={completion} 
//                   color={isProfileComplete ? "green" : completion >= 70 ? "blue" : "orange"} 
//                   size="lg" 
//                   radius="xl" 
//                 />
//               </div>
//             </div>
//             <div className="text-center">
//               <RingProgress
//                 size={100}
//                 thickness={8}
//                 sections={[{ value: completion, color: isProfileComplete ? "green" : completion >= 70 ? "blue" : "orange" }]}
//                 label={
//                   <Text size="28px" fw={800} className={isProfileComplete ? "text-green-600" : "text-blue-600"}>
//                     {completion}%
//                   </Text>
//                 }
//               />
//             </div>
//             {props.isEditable && !isProfileComplete && (
//               <Button
//                 variant="gradient"
//                 gradient={{ from: "blue", to: "indigo" }}
//                 radius="xl"
//                 size="md"
//                 leftSection={<IconEdit size={16} />}
//                 onClick={handleCompleteProfile}
//               >
//                 Complete Profile
//               </Button>
//             )}
//             {props.isEditable && isProfileComplete && (
//               <Button
//                 variant="outline"
//                 color="green"
//                 radius="xl"
//                 size="md"
//                 leftSection={<IconEdit size={16} />}
//                 onClick={handleCompleteProfile}
//               >
//                 Edit Profile
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Premium Tabs Section */}
//       <div className="px-8 pt-6 pb-10">
//         <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="lg" variant="pills">
//           <Tabs.List className="mb-8 gap-2 flex-wrap">
//             <Tabs.Tab value="about" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
//               <IconUsers size={18} className="mr-2" />
//               About
//             </Tabs.Tab>
//             <Tabs.Tab value="skills" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
//               <IconStar size={18} className="mr-2" />
//               Skills & Expertise
//               {skillsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {skillsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="experience" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
//               <IconBriefcase size={18} className="mr-2" />
//               Experience
//               {experienceList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {experienceList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//             <Tabs.Tab value="certifications" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
//               <IconCertificate size={18} className="mr-2" />
//               Certifications
//               {certificationsList.length > 0 && (
//                 <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
//                   {certificationsList.length}
//                 </Badge>
//               )}
//             </Tabs.Tab>
//           </Tabs.List>

//           {/* About Tab */}
//           <Tabs.Panel value="about">
//             <div className="space-y-6">
//               <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
//                     <IconUsers size={18} className="text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Bio</h3>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed text-lg">
//                   {props.about || "Passionate professional dedicated to delivering excellence. Specialized in creating innovative solutions and building meaningful connections."}
//                 </p>
//               </Paper>

//               {/* Stats Cards */}
//               <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
//                 <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
//                   <div className="text-3xl font-bold text-white">{experienceList.length}</div>
//                   <div className="text-sm text-blue-100 mt-1">Years Experience</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
//                   <div className="text-3xl font-bold text-white">{skillsList.length}</div>
//                   <div className="text-sm text-green-100 mt-1">Skills</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
//                   <div className="text-3xl font-bold text-white">{certificationsList.length}</div>
//                   <div className="text-sm text-purple-100 mt-1">Certifications</div>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
//                   <div className="text-3xl font-bold text-white">100%</div>
//                   <div className="text-sm text-orange-100 mt-1">Success Rate</div>
//                 </div>
//               </SimpleGrid>
//             </div>
//           </Tabs.Panel>

//           {/* Skills Tab */}
//           <Tabs.Panel value="skills">
//             <Paper className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
//               {skillsList.length > 0 ? (
//                 <div className="flex flex-wrap gap-3">
//                   {skillsList.map((skill: string, index: number) => (
//                     <Badge 
//                       key={index} 
//                       size="xl" 
//                       variant="light" 
//                       color="blue"
//                       className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-3 text-base font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
//                       radius="xl"
//                     >
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <IconStar size={32} className="text-gray-300" />
//                   </div>
//                   <p className="text-gray-500 text-lg">No skills added yet</p>
//                 </div>
//               )}
//             </Paper>
//           </Tabs.Panel>

//           {/* Experience Tab */}
//           <Tabs.Panel value="experience">
//             <div className="space-y-6">
//               {experienceList.length > 0 ? (
//                 experienceList.map((exp: any, index: number) => (
//                   <Experience key={index} {...exp} />
//                 ))
//               ) : (
//                 <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <IconBriefcase size={40} className="text-gray-300" />
//                   </div>
//                   <p className="text-gray-500 text-lg">No work experience added yet</p>
//                 </Paper>
//               )}
//             </div>
//           </Tabs.Panel>

//           {/* Certifications Tab */}
//           <Tabs.Panel value="certifications">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {certificationsList.length > 0 ? (
//                 certificationsList.map((cert: any, index: number) => (
//                   <Certification key={index} {...cert} />
//                 ))
//               ) : (
//                 <div className="col-span-2">
//                   <Paper className="text-center py-16 bg-gray-50 rounded-2xl">
//                     <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <IconCertificate size={40} className="text-gray-300" />
//                     </div>
//                     <p className="text-gray-500 text-lg">No certifications added yet</p>
//                   </Paper>
//                 </div>
//               )}
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>

//       {/* Edit Profile Modal */}
//       <Modal
//         opened={editModalOpened}
//         onClose={closeEditModal}
//         title="Edit Profile"
//         size="xl"
//         radius="lg"
//         scrollAreaComponent={ScrollArea}
//       >
//         <Stack gap="md" className="max-h-[70vh] overflow-auto pr-2">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextInput
//               label="Full Name"
//               value={editedData.name || ""}
//               onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
//               placeholder="Your full name"
//               radius="md"
//             />
//             <TextInput
//               label="Professional Title"
//               value={editedData.title || ""}
//               onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
//               placeholder="e.g., Senior Software Engineer"
//               radius="md"
//             />
//             <TextInput
//               label="Current Company"
//               value={editedData.company || ""}
//               onChange={(e) => setEditedData({ ...editedData, company: e.target.value })}
//               placeholder="Company name"
//               radius="md"
//             />
//             <TextInput
//               label="Location"
//               value={editedData.location || ""}
//               onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
//               placeholder="City, Country"
//               radius="md"
//             />
//             <TextInput
//               label="Email"
//               value={editedData.email || ""}
//               onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
//               placeholder="your@email.com"
//               radius="md"
//             />
//             <TextInput
//               label="Phone"
//               value={editedData.phone || ""}
//               onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
//               placeholder="+1 234 567 8900"
//               radius="md"
//             />
//             <TextInput
//               label="Website"
//               value={editedData.website || ""}
//               onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
//               placeholder="https://yourwebsite.com"
//               radius="md"
//             />
//             <TextInput
//               label="LinkedIn URL"
//               value={editedData.linkedin || ""}
//               onChange={(e) => setEditedData({ ...editedData, linkedin: e.target.value })}
//               placeholder="https://linkedin.com/in/username"
//               radius="md"
//             />
//             <TextInput
//               label="GitHub URL"
//               value={editedData.github || ""}
//               onChange={(e) => setEditedData({ ...editedData, github: e.target.value })}
//               placeholder="https://github.com/username"
//               radius="md"
//             />
//             <TextInput
//               label="Twitter URL"
//               value={editedData.twitter || ""}
//               onChange={(e) => setEditedData({ ...editedData, twitter: e.target.value })}
//               placeholder="https://twitter.com/username"
//               radius="md"
//             />
//           </div>
          
//           <Textarea
//             label="About Me"
//             value={editedData.about || ""}
//             onChange={(e) => setEditedData({ ...editedData, about: e.target.value })}
//             placeholder="Tell us about your professional background, skills, and career goals..."
//             rows={4}
//             radius="md"
//           />

//           <Divider label="Skills" labelPosition="center" />
          
//           <div className="flex flex-wrap gap-2 mb-2">
//             {(editedData.skills || []).map((skill: string, idx: number) => (
//               <Badge
//                 key={idx}
//                 size="lg"
//                 variant="light"
//                 color="blue"
//                 rightSection={
//                   <IconX
//                     size={14}
//                     className="cursor-pointer ml-1 hover:text-red-500"
//                     onClick={() => {
//                       const newSkills = (editedData.skills || []).filter((_: string, i: number) => i !== idx);
//                       setEditedData({ ...editedData, skills: newSkills });
//                     }}
//                   />
//                 }
//               >
//                 {skill}
//               </Badge>
//             ))}
//           </div>
          
//           <div className="flex gap-2">
//             <TextInput
//               placeholder="Add new skill (e.g., React, Python, AWS)"
//               className="flex-1"
//               radius="md"
//               onKeyPress={(e) => {
//                 if (e.key === "Enter") {
//                   const input = e.currentTarget.value;
//                   if (input && !(editedData.skills || []).includes(input)) {
//                     setEditedData({
//                       ...editedData,
//                       skills: [...(editedData.skills || []), input]
//                     });
//                     e.currentTarget.value = "";
//                   }
//                 }
//               }}
//             />
//             <Button
//               onClick={() => {
//                 const input = document.querySelector('input[placeholder="Add new skill"]') as HTMLInputElement;
//                 if (input && input.value && !(editedData.skills || []).includes(input.value)) {
//                   setEditedData({
//                     ...editedData,
//                     skills: [...(editedData.skills || []), input.value]
//                   });
//                   input.value = "";
//                 }
//               }}
//               variant="light"
//             >
//               <IconPlus size={16} />
//             </Button>
//           </div>
//         </Stack>

//         <Group justify="flex-end" mt="xl">
//           <Button variant="light" onClick={closeEditModal} radius="xl">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveProfile} color="blue" radius="xl">
//             Save Changes
//           </Button>
//         </Group>
//       </Modal>

//       <MessageModal 
//         opened={opened} 
//         onClose={close} 
//         name={props.name || "Professional"}
//         avatar={props.avatar} 
//       />
//     </Paper>
//   );
// };

// export default Profile;




import { useState, useRef } from "react";
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
  IconCamera,
  IconPlus,
  IconTrash,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconX,
  IconUpload,
  IconFile,
  IconPdf,
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
  Modal,
  TextInput,
  Textarea,
  Stack,
  Group,
  Switch,
  Select,
  ScrollArea,
  FileInput,
  Loader,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { notifications } from "@mantine/notifications";
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
  twitter?: string;
  instagram?: string;
  youtube?: string;
  avatar?: string;
  banner?: string;
  skills?: string[];
  experience?: any[];
  certifications?: any[];
  rating?: number;
  verified?: boolean;
  isEditable?: boolean;
  resumeUrl?: string;
  resumeName?: string;
  onSave?: (data: any) => void;
  onAvatarChange?: (file: File) => void;
  onProfileComplete?: () => void;
  onResumeUpload?: (file: File) => Promise<void>;
}

const Profile = (props: ProfileProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [resumeModalOpened, { open: openResumeModal, close: closeResumeModal }] = useDisclosure(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("about");
  const [uploading, setUploading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [editedData, setEditedData] = useState(props);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const experienceList = Array.isArray(props.experience) ? props.experience : [];
  const certificationsList = Array.isArray(props.certifications) ? props.certifications : [];
  const skillsList = Array.isArray(props.skills) ? props.skills : [];

  const profileCompletion = () => {
    const fields = [
      props.name, props.title, props.company, props.location, 
      props.about, props.email, props.phone, skillsList.length > 0,
      experienceList.length > 0, certificationsList.length > 0,
      props.linkedin, props.github, props.resumeUrl
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      notifications.show({
        title: "Invalid File",
        message: "Please upload an image file",
        color: "red"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      notifications.show({
        title: "File Too Large",
        message: "Please upload an image smaller than 5MB",
        color: "red"
      });
      return;
    }

    setUploading(true);
    
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (props.onAvatarChange) {
          props.onAvatarChange(file);
        }
        setUploading(false);
        notifications.show({
          title: "Success!",
          message: "Profile picture updated successfully",
          color: "green"
        });
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      notifications.show({
        title: "No File Selected",
        message: "Please select a resume file to upload",
        color: "yellow"
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) {
      notifications.show({
        title: "Invalid File Type",
        message: "Please upload PDF, DOC, or DOCX file",
        color: "red"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (resumeFile.size > 5 * 1024 * 1024) {
      notifications.show({
        title: "File Too Large",
        message: "Please upload a file smaller than 5MB",
        color: "red"
      });
      return;
    }

    setUploadingResume(true);
    
    try {
      if (props.onResumeUpload) {
        await props.onResumeUpload(resumeFile);
        notifications.show({
          title: "Success!",
          message: "Resume uploaded successfully",
          color: "green"
        });
        closeResumeModal();
        setResumeFile(null);
      } else {
        // Simulate upload
        setTimeout(() => {
          notifications.show({
            title: "Success!",
            message: "Resume uploaded successfully",
            color: "green"
          });
          closeResumeModal();
          setResumeFile(null);
          setUploadingResume(false);
        }, 1500);
      }
    } catch (error) {
      notifications.show({
        title: "Upload Failed",
        message: "Failed to upload resume. Please try again.",
        color: "red"
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleDownloadResume = () => {
    if (props.resumeUrl) {
      window.open(props.resumeUrl, '_blank');
      notifications.show({
        title: "Download Started",
        message: "Your resume is being downloaded",
        color: "blue"
      });
    } else {
      notifications.show({
        title: "No Resume Found",
        message: "Please upload a resume first",
        color: "yellow"
      });
    }
  };

  const handleSaveProfile = () => {
    if (props.onSave) {
      props.onSave(editedData);
    }
    closeEditModal();
    notifications.show({
      title: "Profile Updated",
      message: "Your profile has been updated successfully",
      color: "green"
    });
  };

  const handleCompleteProfile = () => {
    openEditModal();
    if (props.onProfileComplete) {
      props.onProfileComplete();
    }
  };

  const getAvatarUrl = () => {
    if (props.avatar) return props.avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.name || 'User')}&background=1e40af&color=ffffff&bold=true&size=200&fontsize=0.33&rounded=true`;
  };

  const completion = profileCompletion();
  const isProfileComplete = completion === 100;
  const hasResume = !!props.resumeUrl;

  return (
    <Paper className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
      
      {/* Premium Cover - Clean Gradient without Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Premium Verified Badge */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Tooltip label="Premium Member">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-2 shadow-lg cursor-pointer transition-transform hover:scale-105">
              <IconAward size={18} className="text-white" />
            </div>
          </Tooltip>
          <Tooltip label="Verified Professional">
            <div className="bg-green-500 rounded-full p-2 shadow-lg cursor-pointer transition-transform hover:scale-105">
              <IconCheck size={18} className="text-white" />
            </div>
          </Tooltip>
        </div>

        {/* Premium Actions Menu */}
        <div className="absolute top-6 right-28">
          <Menu shadow="lg" width={220} position="bottom-end" withArrow>
            <Menu.Target>
              <ActionIcon variant="filled" radius="xl" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                <IconDotsVertical size={20} className="text-white" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconShare size={16} />}>Share Profile</Menu.Item>
              <Menu.Item leftSection={<IconFlag size={16} />}>Report Profile</Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconFileText size={16} />} onClick={handleDownloadResume}>
                Download Resume
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        
        {/* Profile Image with Upload */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative group">
            <Avatar
              src={getAvatarUrl()}
              alt={props.name}
              size={140}
              radius="xl"
              className="border-4 border-white shadow-2xl ring-4 ring-blue-500/30 transition-all duration-300 group-hover:ring-blue-500/50"
            />
            {props.isEditable && (
              <>
                <div 
                  className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <IconCamera size={28} className="text-white" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-20"></div>

      {/* Premium Profile Header */}
      <div className="px-8">
        <div className="flex flex-wrap justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900">{props.name || "Professional"}</h1>
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
                <span className="text-gray-500 text-sm">(2 reviews)</span>
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
          <div className="flex gap-3 flex-wrap">
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
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
            {props.isEditable && (
              <Button 
                variant="outline"
                color="blue"
                leftSection={<IconUpload size={18} />}
                radius="xl"
                size="md"
                onClick={openResumeModal}
              >
                {hasResume ? "Update Resume" : "Upload Resume"}
              </Button>
            )}
          </div>
        </div>

        {/* Premium Contact Info */}
        <div className="mt-6 flex flex-wrap gap-4 pb-6 border-b border-gray-200">
          {props.email && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
              <IconMail size={16} className="text-blue-600" />
              <span className="text-sm text-gray-700">{props.email}</span>
            </div>
          )}
          {props.phone && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
              <IconPhone size={16} className="text-blue-600" />
              <span className="text-sm text-gray-700">{props.phone}</span>
            </div>
          )}
          {props.website && (
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
              <IconWorld size={16} className="text-blue-600" />
              <a href={props.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{props.website}</a>
            </div>
          )}
          {props.linkedin && (
            <a href={props.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-all hover:scale-110">
              <IconBrandLinkedin size={18} className="text-gray-600 hover:text-blue-600" />
            </a>
          )}
          {props.github && (
            <a href={props.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all hover:scale-110">
              <IconBrandGithub size={18} className="text-gray-600" />
            </a>
          )}
          {props.twitter && (
            <a href={props.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-full hover:bg-sky-100 transition-all hover:scale-110">
              <IconBrandTwitter size={18} className="text-gray-600 hover:text-sky-500" />
            </a>
          )}
        </div>
      </div>

      {/* Resume Status Bar */}
      {hasResume && props.resumeName && (
        <div className="px-8 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconPdf size={20} className="text-green-600" />
              <div>
                <Text size="sm" fw={500} className="text-green-800">Resume Uploaded</Text>
                <Text size="xs" className="text-green-600">{props.resumeName}</Text>
              </div>
            </div>
            <Tooltip label="Download Resume">
              <ActionIcon variant="subtle" color="green" onClick={handleDownloadResume}>
                <IconDownload size={18} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Profile Strength Card with Complete Profile Button */}
      <div className="px-8 mt-6">
        <div className={`rounded-2xl p-6 border transition-all duration-300 ${
          isProfileComplete 
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
            : "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-100"
        }`}>
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl shadow-md transition-all ${
                  isProfileComplete 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                }`}>
                  {isProfileComplete ? <IconCheck size={20} className="text-white" /> : <IconAward size={20} className="text-white" />}
                </div>
                <div>
                  <Text fw={700} size="lg" className="text-gray-800">
                    {isProfileComplete ? "Profile Complete! 🎉" : "Profile Strength"}
                  </Text>
                  <Text size="sm" className="text-gray-500">
                    {isProfileComplete 
                      ? "Your profile is 100% complete. You're ready to shine!" 
                      : "Complete your profile to unlock premium features and get noticed by top recruiters"}
                  </Text>
                </div>
              </div>
              <div className="max-w-md">
                <Progress 
                  value={completion} 
                  color={isProfileComplete ? "green" : completion >= 70 ? "blue" : "orange"} 
                  size="lg" 
                  radius="xl" 
                />
              </div>
            </div>
            <div className="text-center">
              <RingProgress
                size={100}
                thickness={8}
                sections={[{ value: completion, color: isProfileComplete ? "green" : completion >= 70 ? "blue" : "orange" }]}
                label={
                  <Text size="28px" fw={800} className={isProfileComplete ? "text-green-600" : "text-blue-600"}>
                    {completion}%
                  </Text>
                }
              />
            </div>
            {props.isEditable && !isProfileComplete && (
              <Button
                variant="gradient"
                gradient={{ from: "blue", to: "indigo" }}
                radius="xl"
                size="md"
                leftSection={<IconEdit size={16} />}
                onClick={handleCompleteProfile}
              >
                Complete Profile
              </Button>
            )}
            {props.isEditable && isProfileComplete && (
              <Button
                variant="outline"
                color="green"
                radius="xl"
                size="md"
                leftSection={<IconEdit size={16} />}
                onClick={handleCompleteProfile}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Premium Tabs Section */}
      <div className="px-8 pt-6 pb-10">
        <Tabs value={activeTab} onChange={setActiveTab} color="blue" radius="lg" variant="pills">
          <Tabs.List className="mb-8 gap-2 flex-wrap">
            <Tabs.Tab value="about" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
              <IconUsers size={18} className="mr-2" />
              About
            </Tabs.Tab>
            <Tabs.Tab value="skills" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
              <IconStar size={18} className="mr-2" />
              Skills & Expertise
              {skillsList.length > 0 && (
                <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
                  {skillsList.length}
                </Badge>
              )}
            </Tabs.Tab>
            <Tabs.Tab value="experience" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
              <IconBriefcase size={18} className="mr-2" />
              Experience
              {experienceList.length > 0 && (
                <Badge size="xs" circle className="ml-2 bg-blue-200 text-blue-800">
                  {experienceList.length}
                </Badge>
              )}
            </Tabs.Tab>
            <Tabs.Tab value="certifications" className="data-[active]:bg-blue-600 data-[active]:text-white font-semibold px-6 py-2.5 rounded-xl transition-all">
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
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-3xl font-bold text-white">{experienceList.length}</div>
                  <div className="text-sm text-blue-100 mt-1">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-3xl font-bold text-white">{skillsList.length}</div>
                  <div className="text-sm text-green-100 mt-1">Skills</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="text-3xl font-bold text-white">{certificationsList.length}</div>
                  <div className="text-sm text-purple-100 mt-1">Certifications</div>
                </div>
                <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
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
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-5 py-3 text-base font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
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

      {/* Edit Profile Modal */}
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Edit Profile"
        size="xl"
        radius="lg"
        scrollAreaComponent={ScrollArea}
      >
        <Stack gap="md" className="max-h-[70vh] overflow-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Full Name"
              value={editedData.name || ""}
              onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              placeholder="Your full name"
              radius="md"
            />
            <TextInput
              label="Professional Title"
              value={editedData.title || ""}
              onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
              placeholder="e.g., Senior Software Engineer"
              radius="md"
            />
            <TextInput
              label="Current Company"
              value={editedData.company || ""}
              onChange={(e) => setEditedData({ ...editedData, company: e.target.value })}
              placeholder="Company name"
              radius="md"
            />
            <TextInput
              label="Location"
              value={editedData.location || ""}
              onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
              placeholder="City, Country"
              radius="md"
            />
            <TextInput
              label="Email"
              value={editedData.email || ""}
              onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              placeholder="your@email.com"
              radius="md"
            />
            <TextInput
              label="Phone"
              value={editedData.phone || ""}
              onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              placeholder="+1 234 567 8900"
              radius="md"
            />
            <TextInput
              label="Website"
              value={editedData.website || ""}
              onChange={(e) => setEditedData({ ...editedData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
              radius="md"
            />
            <TextInput
              label="LinkedIn URL"
              value={editedData.linkedin || ""}
              onChange={(e) => setEditedData({ ...editedData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              radius="md"
            />
            <TextInput
              label="GitHub URL"
              value={editedData.github || ""}
              onChange={(e) => setEditedData({ ...editedData, github: e.target.value })}
              placeholder="https://github.com/username"
              radius="md"
            />
            <TextInput
              label="Twitter URL"
              value={editedData.twitter || ""}
              onChange={(e) => setEditedData({ ...editedData, twitter: e.target.value })}
              placeholder="https://twitter.com/username"
              radius="md"
            />
          </div>
          
          <Textarea
            label="About Me"
            value={editedData.about || ""}
            onChange={(e) => setEditedData({ ...editedData, about: e.target.value })}
            placeholder="Tell us about your professional background, skills, and career goals..."
            rows={4}
            radius="md"
          />

          <Divider label="Skills" labelPosition="center" />
          
          <div className="flex flex-wrap gap-2 mb-2">
            {(editedData.skills || []).map((skill: string, idx: number) => (
              <Badge
                key={idx}
                size="lg"
                variant="light"
                color="blue"
                rightSection={
                  <IconX
                    size={14}
                    className="cursor-pointer ml-1 hover:text-red-500"
                    onClick={() => {
                      const newSkills = (editedData.skills || []).filter((_: string, i: number) => i !== idx);
                      setEditedData({ ...editedData, skills: newSkills });
                    }}
                  />
                }
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <TextInput
              placeholder="Add new skill (e.g., React, Python, AWS)"
              className="flex-1"
              radius="md"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const input = e.currentTarget.value;
                  if (input && !(editedData.skills || []).includes(input)) {
                    setEditedData({
                      ...editedData,
                      skills: [...(editedData.skills || []), input]
                    });
                    e.currentTarget.value = "";
                  }
                }
              }}
            />
            <Button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Add new skill"]') as HTMLInputElement;
                if (input && input.value && !(editedData.skills || []).includes(input.value)) {
                  setEditedData({
                    ...editedData,
                    skills: [...(editedData.skills || []), input.value]
                  });
                  input.value = "";
                }
              }}
              variant="light"
            >
              <IconPlus size={16} />
            </Button>
          </div>
        </Stack>

        <Group justify="flex-end" mt="xl">
          <Button variant="light" onClick={closeEditModal} radius="xl">
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} color="blue" radius="xl">
            Save Changes
          </Button>
        </Group>
      </Modal>

      {/* Resume Upload Modal */}
      <Modal
        opened={resumeModalOpened}
        onClose={closeResumeModal}
        title={hasResume ? "Update Resume" : "Upload Resume"}
        size="md"
        radius="lg"
        centered
      >
        <Stack gap="md">
          <FileInput
            label="Resume/CV"
            description="Upload your resume in PDF, DOC, or DOCX format (Max 5MB)"
            placeholder="Click to select file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            value={resumeFile}
            onChange={setResumeFile}
            leftSection={<IconFile size={16} />}
            radius="md"
          />
          
          {resumeFile && (
            <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
              <IconPdf size={20} className="text-blue-600" />
              <div className="flex-1">
                <Text size="sm" fw={500}>{resumeFile.name}</Text>
                <Text size="xs" className="text-gray-500">
                  {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                </Text>
              </div>
              <ActionIcon variant="subtle" color="red" onClick={() => setResumeFile(null)}>
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          )}

          <div className="flex gap-3 justify-end mt-4">
            <Button variant="light" onClick={closeResumeModal} radius="xl">
              Cancel
            </Button>
            <Button 
              onClick={handleResumeUpload} 
              loading={uploadingResume}
              leftSection={<IconUpload size={16} />}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              radius="xl"
            >
              {hasResume ? "Update Resume" : "Upload Resume"}
            </Button>
          </div>
        </Stack>
      </Modal>

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