// import { useState } from "react";
// import {
//   Divider,
//   ActionIcon,
//   TextInput,
//   Textarea,
//   Badge,
//   Button,
//   Avatar,
//   Tabs,
//   Paper,
//   Tooltip,
//   LoadingOverlay,
//   FileInput
// } from "@mantine/core";
// import {
//   IconBriefcase,
//   IconMapPin,
//   IconDeviceLaptop,
//   IconPencil,
//   IconDeviceFloppy,
//   IconCertificate,
//   IconX,
//   IconTags,
//   IconPlus,
//   IconMail,
//   IconPhone,
//   IconBrandLinkedin,
//   IconBrandGithub,
//   IconCalendar,
//   IconCheck,
//   IconUpload,
//   IconTrash
// } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";
// import Experience from "./Experience";
// import CertiCard from "./CertiCard";
// import profileData from "../Data/MainProfileData";

// interface ProfileData {
//   id?: string;
//   name: string;
//   title: string;
//   company: string;
//   location: string;
//   about: string;
//   skills: string[];
//   banner: string;
//   avatar: string;
//   experience: any[];
//   certifications: any[];
//   email?: string;
//   phone?: string;
//   linkedin?: string;
//   github?: string;
//   website?: string;
// }

// const MainProfile = () => {
//   const [data, setData] = useState<ProfileData>(profileData);
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState<string | null>("profile");
//   const [newSkill, setNewSkill] = useState("");
//   const [newExp, setNewExp] = useState(false);
//   const [newCert, setNewCert] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [newExpData, setNewExpData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     technologies: ""
//   });
//   const [newCertData, setNewCertData] = useState({
//     name: "",
//     issuer: "",
//     date: "",
//     credentialId: "",
//     credentialUrl: ""
//   });

//   const handleChange = (field: keyof ProfileData, value: any) => {
//     setData({ ...data, [field]: value });
//   };

//   const addSkill = () => {
//     if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
//       setData({ ...data, skills: [...data.skills, newSkill.trim()] });
//       setNewSkill("");
//       notifications.show({
//         title: 'Skill Added',
//         message: `${newSkill} has been added to your profile`,
//         color: 'green'
//       });
//     }
//   };

//   const removeSkill = (skillToRemove: string) => {
//     setData({ ...data, skills: data.skills.filter((skill: string) => skill !== skillToRemove) });
//     notifications.show({
//       title: 'Skill Removed',
//       message: `${skillToRemove} has been removed`,
//       color: 'blue'
//     });
//   };

//   const addExperience = () => {
//     if (newExpData.title && newExpData.company) {
//       const newExpItem = {
//         id: Date.now().toString(),
//         ...newExpData,
//         technologies: newExpData.technologies.split(",").map(t => t.trim()).filter(t => t)
//       };
//       setData({ ...data, experience: [...data.experience, newExpItem] });
//       setNewExpData({ title: "", company: "", location: "", startDate: "", endDate: "", description: "", technologies: "" });
//       setNewExp(false);
//       notifications.show({
//         title: 'Experience Added',
//         message: 'Work experience has been added to your profile',
//         color: 'green'
//       });
//     }
//   };

//   const addCertification = () => {
//     if (newCertData.name && newCertData.issuer) {
//       const newCertItem = {
//         id: Date.now().toString(),
//         ...newCertData
//       };
//       setData({ ...data, certifications: [...data.certifications, newCertItem] });
//       setNewCertData({ name: "", issuer: "", date: "", credentialId: "", credentialUrl: "" });
//       setNewCert(false);
//       notifications.show({
//         title: 'Certification Added',
//         message: 'Certification has been added to your profile',
//         color: 'green'
//       });
//     }
//   };

//   const handleSaveProfile = () => {
//     setLoading(true);
//     setTimeout(() => {
//       localStorage.setItem('user_profile', JSON.stringify(data));
//       notifications.show({
//         title: 'Profile Updated',
//         message: 'Your profile has been saved successfully',
//         color: 'green',
//         icon: <IconCheck size={16} />
//       });
//       setEditMode(false);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleImageUpload = (file: File | null, field: 'avatar' | 'banner') => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setData({ ...data, [field]: reader.result as string });
//         notifications.show({
//           title: 'Image Updated',
//           message: `${field === 'avatar' ? 'Profile picture' : 'Banner'} has been updated`,
//           color: 'green'
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveExperience = (id: string, updatedExp: any) => {
//     const updatedExperiences = data.experience.map((exp: any) =>
//       exp.id === id ? { ...exp, ...updatedExp } : exp
//     );
//     setData({ ...data, experience: updatedExperiences });
//     notifications.show({
//       title: 'Experience Updated',
//       message: 'Work experience has been updated',
//       color: 'green'
//     });
//   };

//   const handleDeleteExperience = (id: string) => {
//     const updatedExperiences = data.experience.filter((exp: any) => exp.id !== id);
//     setData({ ...data, experience: updatedExperiences });
//     notifications.show({
//       title: 'Experience Deleted',
//       message: 'Work experience has been removed',
//       color: 'orange'
//     });
//   };

//   const handleSaveCertification = (id: string, updatedCert: any) => {
//     const updatedCertifications = data.certifications.map((cert: any) =>
//       cert.id === id ? { ...cert, ...updatedCert } : cert
//     );
//     setData({ ...data, certifications: updatedCertifications });
//     notifications.show({
//       title: 'Certification Updated',
//       message: 'Certification has been updated',
//       color: 'green'
//     });
//   };

//   const handleDeleteCertification = (id: string) => {
//     const updatedCertifications = data.certifications.filter((cert: any) => cert.id !== id);
//     setData({ ...data, certifications: updatedCertifications });
//     notifications.show({
//       title: 'Certification Deleted',
//       message: 'Certification has been removed',
//       color: 'orange'
//     });
//   };

//   const profileCompletion = () => {
//     const fields = ['name', 'title', 'company', 'location', 'about', 'skills'];
//     const completed = fields.filter(field => {
//       const value = data[field as keyof ProfileData];
//       return value && (Array.isArray(value) ? value.length > 0 : value.toString().length > 0);
//     }).length;
//     return Math.round((completed / fields.length) * 100);
//   };

//   return (
//     <div className="w-full relative">
//       <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
      
//       {/* Profile Completion Bar */}
//       {!editMode && profileCompletion() < 100 && (
//         <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-sm font-medium text-blue-800">Profile Completion</span>
//             <span className="text-sm font-bold text-blue-800">{profileCompletion()}%</span>
//           </div>
//           <div className="w-full bg-blue-200 rounded-full h-2">
//             <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${profileCompletion()}%` }}></div>
//           </div>
//           <p className="text-xs text-blue-600 mt-2">Complete your profile to get better job matches</p>
//         </div>
//       )}

//       {/* Banner & Avatar Section */}
//       <div className="relative group">
//         <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600">
//           <img
//             src={data.banner}
//             alt="Banner"
//             className="w-full h-full object-cover opacity-40"
//           />
//           {editMode && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//               <FileInput
//                 placeholder="Change Banner"
//                 accept="image/png,image/jpeg"
//                 onChange={(file) => handleImageUpload(file, 'banner')}
//                 className="bg-white rounded-lg"
//                 leftSection={<IconUpload size={16} />}
//               />
//             </div>
//           )}
//         </div>
        
//         <div className="absolute -bottom-16 left-6">
//           <div className="relative">
//             <Avatar
//               src={data.avatar}
//               alt={data.name}
//               size={120}
//               radius="xl"
//               className="border-4 border-white shadow-xl bg-white"
//             />
//             {editMode && (
//               <Tooltip label="Change Photo">
//                 <label className="absolute bottom-1 right-1 cursor-pointer">
//                   <div className="bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition">
//                     <IconPencil size={14} />
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/png,image/jpeg"
//                     className="hidden"
//                     onChange={(e) => handleImageUpload(e.target.files?.[0] || null, 'avatar')}
//                   />
//                 </label>
//               </Tooltip>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <div className="h-20"></div>

//       {/* Profile Header */}
//       <div className="px-4">
//         <div className="flex flex-wrap justify-between items-start gap-4">
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-2 flex-wrap">
//               {editMode ? (
//                 <TextInput
//                   value={data.name}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                   size="xl"
//                   radius="md"
//                   className="flex-1 max-w-md"
//                   placeholder="Name"
//                 />
//               ) : (
//                 <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
//               )}
//               <Tooltip label={editMode ? "Save Changes" : "Edit Profile"}>
//                 <ActionIcon
//                   onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
//                   color={editMode ? "green" : "blue"}
//                   variant="light"
//                   size="lg"
//                   radius="xl"
//                 >
//                   {editMode ? <IconDeviceFloppy size={18} /> : <IconPencil size={18} />}
//                 </ActionIcon>
//               </Tooltip>
//             </div>

//             <div className="space-y-1">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <IconDeviceLaptop size={18} className="text-blue-500" />
//                 {editMode ? (
//                   <div className="flex gap-2 flex-wrap">
//                     <TextInput
//                       value={data.title}
//                       onChange={(e) => handleChange("title", e.target.value)}
//                       size="sm"
//                       radius="md"
//                       placeholder="Title"
//                     />
//                     <TextInput
//                       value={data.company}
//                       onChange={(e) => handleChange("company", e.target.value)}
//                       size="sm"
//                       radius="md"
//                       placeholder="Company"
//                     />
//                   </div>
//                 ) : (
//                   <span className="text-gray-700">{data.title} at {data.company}</span>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-2 text-gray-500">
//                 <IconMapPin size={16} className="text-gray-400" />
//                 {editMode ? (
//                   <TextInput
//                     value={data.location}
//                     onChange={(e) => handleChange("location", e.target.value)}
//                     size="sm"
//                     radius="md"
//                     placeholder="Location"
//                   />
//                 ) : (
//                   <span className="text-sm">{data.location}</span>
//                 )}
//               </div>
//             </div>

//             {/* Contact Info - Edit Mode */}
//             {editMode && (
//               <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <TextInput
//                   label="Email"
//                   placeholder="your@email.com"
//                   value={data.email || ""}
//                   onChange={(e) => handleChange("email", e.target.value)}
//                   size="sm"
//                 />
//                 <TextInput
//                   label="Phone"
//                   placeholder="+1 234 567 8900"
//                   value={data.phone || ""}
//                   onChange={(e) => handleChange("phone", e.target.value)}
//                   size="sm"
//                 />
//                 <TextInput
//                   label="LinkedIn URL"
//                   placeholder="https://linkedin.com/in/username"
//                   value={data.linkedin || ""}
//                   onChange={(e) => handleChange("linkedin", e.target.value)}
//                   size="sm"
//                 />
//                 <TextInput
//                   label="GitHub URL"
//                   placeholder="https://github.com/username"
//                   value={data.github || ""}
//                   onChange={(e) => handleChange("github", e.target.value)}
//                   size="sm"
//                 />
//               </div>
//             )}

//             {/* Social Links - View Mode */}
//             {!editMode && (
//               <div className="flex gap-2 mt-3">
//                 {data.email && (
//                   <Tooltip label="Email">
//                     <a href={`mailto:${data.email}`}>
//                       <ActionIcon variant="light" color="gray" radius="xl">
//                         <IconMail size={16} />
//                       </ActionIcon>
//                     </a>
//                   </Tooltip>
//                 )}
//                 {data.phone && (
//                   <Tooltip label="Phone">
//                     <a href={`tel:${data.phone}`}>
//                       <ActionIcon variant="light" color="gray" radius="xl">
//                         <IconPhone size={16} />
//                       </ActionIcon>
//                     </a>
//                   </Tooltip>
//                 )}
//                 {data.linkedin && (
//                   <Tooltip label="LinkedIn">
//                     <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
//                       <ActionIcon variant="light" color="gray" radius="xl">
//                         <IconBrandLinkedin size={16} />
//                       </ActionIcon>
//                     </a>
//                   </Tooltip>
//                 )}
//                 {data.github && (
//                   <Tooltip label="GitHub">
//                     <a href={data.github} target="_blank" rel="noopener noreferrer">
//                       <ActionIcon variant="light" color="gray" radius="xl">
//                         <IconBrandGithub size={16} />
//                       </ActionIcon>
//                     </a>
//                   </Tooltip>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <Divider className="my-6 border-gray-200" />
//       </div>

//       {/* Tabs Section */}
//       <div className="px-4">
//         <Tabs value={activeTab} onChange={setActiveTab} color="blue" variant="pills">
//           <Tabs.List className="mb-6 gap-2 flex-wrap">
//             <Tabs.Tab value="profile" className="data-[active]:bg-blue-600 data-[active]:text-white">
//               Profile
//             </Tabs.Tab>
//             <Tabs.Tab value="skills" className="data-[active]:bg-blue-600 data-[active]:text-white">
//               Skills & Expertise
//             </Tabs.Tab>
//             <Tabs.Tab value="experience" className="data-[active]:bg-blue-600 data-[active]:text-white">
//               Work Experience
//             </Tabs.Tab>
//             <Tabs.Tab value="certifications" className="data-[active]:bg-blue-600 data-[active]:text-white">
//               Certifications
//             </Tabs.Tab>
//           </Tabs.List>

//           {/* Profile Tab */}
//           <Tabs.Panel value="profile">
//             <div className="space-y-6">
//               <Paper className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-3">About Me</h2>
//                 {editMode ? (
//                   <Textarea
//                     value={data.about}
//                     onChange={(e) => handleChange("about", e.target.value)}
//                     minRows={4}
//                     radius="md"
//                     placeholder="Tell us about yourself..."
//                   />
//                 ) : (
//                   <p className="text-gray-600 leading-relaxed">{data.about}</p>
//                 )}
//               </Paper>
//             </div>
//           </Tabs.Panel>

//           {/* Skills Tab */}
//           <Tabs.Panel value="skills">
//             <div className="space-y-6">
//               <Paper className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                 <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
//                   <div className="flex items-center gap-2">
//                     <IconTags className="text-blue-600" size={20} />
//                     <h2 className="text-xl font-semibold text-gray-900">Core Skills</h2>
//                   </div>
//                   {editMode && (
//                     <div className="flex gap-2">
//                       <TextInput
//                         value={newSkill}
//                         onChange={(e) => setNewSkill(e.target.value)}
//                         placeholder="Add new skill"
//                         size="sm"
//                         radius="md"
//                         onKeyPress={(e) => e.key === 'Enter' && addSkill()}
//                       />
//                       <Button onClick={addSkill} size="sm" radius="md" color="blue">
//                         <IconPlus size={14} /> Add
//                       </Button>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {data.skills?.map((skill: string, index: number) => (
//                     <Badge
//                       key={index}
//                       size="xl"
//                       variant="light"
//                       color="blue"
//                       className="bg-blue-50 text-blue-700 px-4 py-2 text-sm font-medium"
//                       radius="xl"
//                       rightSection={
//                         editMode && (
//                           <IconX
//                             size={14}
//                             className="cursor-pointer hover:text-red-500 ml-1"
//                             onClick={() => removeSkill(skill)}
//                           />
//                         )
//                       }
//                     >
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </Paper>
//             </div>
//           </Tabs.Panel>

//           {/* Experience Tab */}
//           <Tabs.Panel value="experience">
//             <div className="space-y-6">
//               <div className="flex justify-between items-center flex-wrap gap-3">
//                 <div className="flex items-center gap-2">
//                   <IconBriefcase className="text-blue-600" size={20} />
//                   <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
//                 </div>
//                 {editMode && (
//                   <Button onClick={() => setNewExp(true)} size="sm" radius="xl" color="blue" variant="light">
//                     <IconPlus size={14} className="mr-1" /> Add Experience
//                   </Button>
//                 )}
//               </div>

//               <div className="space-y-4">
//                 {data.experience?.map((exp: any, idx: number) => (
//                   <Experience 
//                     key={idx} 
//                     {...exp} 
//                     edit={editMode} 
//                     onSave={handleSaveExperience}
//                     onDelete={handleDeleteExperience}
//                   />
//                 ))}
//               </div>

//               {newExp && editMode && (
//                 <Paper className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-4">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Experience</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <TextInput 
//                       label="Job Title" 
//                       placeholder="Software Engineer" 
//                       required 
//                       radius="md" 
//                       className="md:col-span-2"
//                       value={newExpData.title}
//                       onChange={(e) => setNewExpData({ ...newExpData, title: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Company" 
//                       placeholder="Google" 
//                       required 
//                       radius="md"
//                       value={newExpData.company}
//                       onChange={(e) => setNewExpData({ ...newExpData, company: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Location" 
//                       placeholder="Location" 
//                       radius="md"
//                       value={newExpData.location}
//                       onChange={(e) => setNewExpData({ ...newExpData, location: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Start Date" 
//                       placeholder="Jan 2023" 
//                       required 
//                       radius="md"
//                       value={newExpData.startDate}
//                       onChange={(e) => setNewExpData({ ...newExpData, startDate: e.target.value })}
//                     />
//                     <TextInput 
//                       label="End Date" 
//                       placeholder="Present" 
//                       radius="md"
//                       value={newExpData.endDate}
//                       onChange={(e) => setNewExpData({ ...newExpData, endDate: e.target.value })}
//                     />
//                     <Textarea 
//                       label="Description" 
//                       placeholder="Describe your responsibilities..." 
//                       required 
//                       radius="md" 
//                       autosize 
//                       minRows={3} 
//                       className="md:col-span-2"
//                       value={newExpData.description}
//                       onChange={(e) => setNewExpData({ ...newExpData, description: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Technologies (comma-separated)" 
//                       placeholder="React, TypeScript, Node.js" 
//                       radius="md" 
//                       className="md:col-span-2"
//                       value={newExpData.technologies}
//                       onChange={(e) => setNewExpData({ ...newExpData, technologies: e.target.value })}
//                     />
//                   </div>
//                   <div className="flex gap-3 mt-6">
//                     <Button onClick={addExperience} color="blue">Save Experience</Button>
//                     <Button onClick={() => setNewExp(false)} variant="light" color="gray">Cancel</Button>
//                   </div>
//                 </Paper>
//               )}
//             </div>
//           </Tabs.Panel>

//           {/* Certifications Tab */}
//           <Tabs.Panel value="certifications">
//             <div className="space-y-6">
//               <div className="flex justify-between items-center flex-wrap gap-3">
//                 <div className="flex items-center gap-2">
//                   <IconCertificate className="text-blue-600" size={20} />
//                   <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
//                 </div>
//                 {editMode && (
//                   <Button onClick={() => setNewCert(true)} size="sm" radius="xl" color="blue" variant="light">
//                     <IconPlus size={14} className="mr-1" /> Add Certification
//                   </Button>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {data.certifications?.map((cert: any, idx: number) => (
//                   <CertiCard 
//                     key={idx} 
//                     {...cert} 
//                     edit={editMode} 
//                     onSave={handleSaveCertification}
//                     onDelete={handleDeleteCertification}
//                   />
//                 ))}
//               </div>

//               {newCert && editMode && (
//                 <Paper className="bg-gray-50 rounded-xl p-6 border border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Certification</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <TextInput 
//                       label="Certificate Name" 
//                       placeholder="Certificate name" 
//                       required 
//                       radius="md" 
//                       className="md:col-span-2"
//                       value={newCertData.name}
//                       onChange={(e) => setNewCertData({ ...newCertData, name: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Issuer" 
//                       placeholder="Google" 
//                       required 
//                       radius="md"
//                       value={newCertData.issuer}
//                       onChange={(e) => setNewCertData({ ...newCertData, issuer: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Issue Date" 
//                       placeholder="August 2024" 
//                       required 
//                       radius="md"
//                       value={newCertData.date}
//                       onChange={(e) => setNewCertData({ ...newCertData, date: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Credential ID" 
//                       placeholder="Enter ID" 
//                       required 
//                       radius="md" 
//                       className="md:col-span-2"
//                       value={newCertData.credentialId}
//                       onChange={(e) => setNewCertData({ ...newCertData, credentialId: e.target.value })}
//                     />
//                     <TextInput 
//                       label="Credential URL (Optional)" 
//                       placeholder="https://credential.link/..." 
//                       radius="md" 
//                       className="md:col-span-2"
//                       value={newCertData.credentialUrl}
//                       onChange={(e) => setNewCertData({ ...newCertData, credentialUrl: e.target.value })}
//                     />
//                   </div>
//                   <div className="flex gap-3 mt-6">
//                     <Button onClick={addCertification} color="blue">Save Certification</Button>
//                     <Button onClick={() => setNewCert(false)} variant="light" color="gray">Cancel</Button>
//                   </div>
//                 </Paper>
//               )}
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default MainProfile;



import Profile from "./Profile";

interface MainProfileProps {
  profileData?: any;
  isEditable?: boolean;
  onSave?: (data: any) => void;
}

const MainProfile = ({ profileData, isEditable = true, onSave }: MainProfileProps) => {
  return (
    <Profile 
      {...profileData}
      isEditable={isEditable}
      onSave={onSave}
    />
  );
};

export default MainProfile;