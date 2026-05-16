// import { useState } from "react";
// import {
//   Button,
//   TextInput,
//   Textarea,
//   Modal,
//   Group,
//   Badge,
//   Divider,
//   Stack,
//   Paper,
// } from "@mantine/core";
// import {
//   IconEdit,
//   IconCheck,
//   IconX,
//   IconPlus,
//   IconTrash,
//   IconBriefcase,
//   IconCertificate,
//   IconMapPin,
//   IconBuilding,
//   IconCalendar,
// } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";
// import Profile from "./Profile";

// interface EditableProfileProps {
//   profileData: any;
//   onSave: (data: any) => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface Experience {
//   title: string;
//   company: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   technologies: string[];
// }

// interface Certification {
//   name: string;
//   issuer: string;
//   date: string;
//   id: string;
//   credentialUrl: string;
// }

// const EditableProfile = ({
//   profileData,
//   onSave,
//   isOpen,
//   onClose,
// }: EditableProfileProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(profileData);
//   const [showAddExperience, setShowAddExperience] = useState(false);
//   const [showAddCertification, setShowAddCertification] = useState(false);
//   const [showEditExperience, setShowEditExperience] = useState(false);
//   const [showEditCertification, setShowEditCertification] = useState(false);
//   const [editingExperienceIndex, setEditingExperienceIndex] = useState<
//     number | null
//   >(null);
//   const [editingCertificationIndex, setEditingCertificationIndex] = useState<
//     number | null
//   >(null);

//   const [newExperience, setNewExperience] = useState<Experience>({
//     title: "",
//     company: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     description: "",
//     technologies: [],
//   });

//   const [newCertification, setNewCertification] = useState<Certification>({
//     name: "",
//     issuer: "",
//     date: "",
//     id: "",
//     credentialUrl: "",
//   });

//   const [newSkill, setNewSkill] = useState("");

//   const handleSave = () => {
//     onSave(editedData);
//     setIsEditing(false);
//     notifications.show({
//       title: "Success",
//       message: "Profile updated successfully!",
//       color: "green",
//     });
//   };

//   const addExperience = () => {
//     if (!newExperience.title || !newExperience.company) {
//       notifications.show({
//         title: "Missing Information",
//         message: "Please fill in at least title and company",
//         color: "red",
//       });
//       return;
//     }

//     setEditedData({
//       ...editedData,
//       experience: [...(editedData.experience || []), newExperience],
//     });
//     setNewExperience({
//       title: "",
//       company: "",
//       location: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//       technologies: [],
//     });
//     setShowAddExperience(false);
//     notifications.show({
//       title: "Experience Added",
//       message: "Work experience has been added",
//       color: "green",
//     });
//   };

//   const updateExperience = () => {
//     if (editingExperienceIndex !== null && newExperience.title) {
//       const updatedExperiences = [...(editedData.experience || [])];
//       updatedExperiences[editingExperienceIndex] = newExperience;
//       setEditedData({ ...editedData, experience: updatedExperiences });
//       setShowEditExperience(false);
//       setEditingExperienceIndex(null);
//       setNewExperience({
//         title: "",
//         company: "",
//         location: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//         technologies: [],
//       });
//       notifications.show({
//         title: "Experience Updated",
//         message: "Work experience has been updated",
//         color: "green",
//       });
//     }
//   };

//   const editExperience = (index: number) => {
//     setEditingExperienceIndex(index);
//     setNewExperience(editedData.experience[index]);
//     setShowEditExperience(true);
//   };

//   const removeExperience = (index: number) => {
//     const updated = [...(editedData.experience || [])];
//     updated.splice(index, 1);
//     setEditedData({ ...editedData, experience: updated });
//     notifications.show({
//       title: "Experience Removed",
//       message: "Work experience has been removed",
//       color: "orange",
//     });
//   };

//   const addCertification = () => {
//     if (!newCertification.name || !newCertification.issuer) {
//       notifications.show({
//         title: "Missing Information",
//         message: "Please fill in at least certification name and issuer",
//         color: "red",
//       });
//       return;
//     }

//     setEditedData({
//       ...editedData,
//       certifications: [...(editedData.certifications || []), newCertification],
//     });
//     setNewCertification({
//       name: "",
//       issuer: "",
//       date: "",
//       id: "",
//       credentialUrl: "",
//     });
//     setShowAddCertification(false);
//     notifications.show({
//       title: "Certification Added",
//       message: "Certification has been added",
//       color: "green",
//     });
//   };

//   const updateCertification = () => {
//     if (editingCertificationIndex !== null && newCertification.name) {
//       const updatedCertifications = [...(editedData.certifications || [])];
//       updatedCertifications[editingCertificationIndex] = newCertification;
//       setEditedData({ ...editedData, certifications: updatedCertifications });
//       setShowEditCertification(false);
//       setEditingCertificationIndex(null);
//       setNewCertification({
//         name: "",
//         issuer: "",
//         date: "",
//         id: "",
//         credentialUrl: "",
//       });
//       notifications.show({
//         title: "Certification Updated",
//         message: "Certification has been updated",
//         color: "green",
//       });
//     }
//   };

//   const editCertification = (index: number) => {
//     setEditingCertificationIndex(index);
//     setNewCertification(editedData.certifications[index]);
//     setShowEditCertification(true);
//   };

//   const removeCertification = (index: number) => {
//     const updated = [...(editedData.certifications || [])];
//     updated.splice(index, 1);
//     setEditedData({ ...editedData, certifications: updated });
//     notifications.show({
//       title: "Certification Removed",
//       message: "Certification has been removed",
//       color: "orange",
//     });
//   };

//   const addSkill = () => {
//     if (newSkill && !editedData.skills?.includes(newSkill)) {
//       setEditedData({
//         ...editedData,
//         skills: [...(editedData.skills || []), newSkill],
//       });
//       setNewSkill("");
//       notifications.show({
//         title: "Skill Added",
//         message: `${newSkill} has been added to your profile`,
//         color: "green",
//       });
//     } else if (editedData.skills?.includes(newSkill)) {
//       notifications.show({
//         title: "Duplicate Skill",
//         message: "This skill already exists in your profile",
//         color: "yellow",
//       });
//     }
//   };

//   const removeSkill = (skillToRemove: string) => {
//     setEditedData({
//       ...editedData,
//       skills:
//         editedData.skills?.filter((s: string) => s !== skillToRemove) || [],
//     });
//     notifications.show({
//       title: "Skill Removed",
//       message: `${skillToRemove} has been removed`,
//       color: "orange",
//     });
//   };

//   return (
//     <Modal
//       opened={isOpen}
//       onClose={onClose}
//       size="95%"
//       radius="lg"
//       padding={0}
//       withCloseButton={false}
//       styles={{
//         body: { padding: 0 },
//         content: { maxWidth: "95vw", maxHeight: "90vh", overflow: "auto" },
//       }}
//     >
//       <div className="relative">
//         {/* Custom Header with Edit/Save Buttons */}
//         <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
//           <h2 className="text-xl font-bold text-gray-900">
//             Professional Profile
//           </h2>
//           <div className="flex gap-2">
//             {!isEditing ? (
//               <Button
//                 onClick={() => setIsEditing(true)}
//                 leftSection={<IconEdit size={16} />}
//                 variant="light"
//                 color="blue"
//                 radius="xl"
//               >
//                 Edit Profile
//               </Button>
//             ) : (
//               <>
//                 <Button
//                   onClick={handleSave}
//                   leftSection={<IconCheck size={16} />}
//                   variant="filled"
//                   color="green"
//                   radius="xl"
//                 >
//                   Save Changes
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     setIsEditing(false);
//                     setEditedData(profileData);
//                   }}
//                   leftSection={<IconX size={16} />}
//                   variant="light"
//                   color="red"
//                   radius="xl"
//                 >
//                   Cancel
//                 </Button>
//               </>
//             )}
//             <Button onClick={onClose} variant="subtle" color="gray" radius="xl">
//               Close
//             </Button>
//           </div>
//         </div>

//         {/* Edit Forms (shown when editing) */}
//         {isEditing && (
//           <div className="p-6 bg-blue-50 border-b border-blue-200">
//             <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//               <IconEdit size={20} className="text-blue-600" />
//               Edit Profile Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <TextInput
//                 label="Full Name"
//                 value={editedData.name || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, name: e.target.value })
//                 }
//                 radius="md"
//               />
//               <TextInput
//                 label="Professional Title"
//                 value={editedData.title || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, title: e.target.value })
//                 }
//                 placeholder="e.g., Senior Software Engineer"
//                 radius="md"
//               />
//               <TextInput
//                 label="Current Company"
//                 value={editedData.company || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, company: e.target.value })
//                 }
//                 radius="md"
//               />
//               <TextInput
//                 label="Location"
//                 value={editedData.location || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, location: e.target.value })
//                 }
//                 radius="md"
//               />
//               <TextInput
//                 label="Email"
//                 value={editedData.email || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, email: e.target.value })
//                 }
//                 radius="md"
//               />
//               <TextInput
//                 label="Phone"
//                 value={editedData.phone || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, phone: e.target.value })
//                 }
//                 radius="md"
//               />
//               <TextInput
//                 label="LinkedIn URL"
//                 value={editedData.linkedin || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, linkedin: e.target.value })
//                 }
//                 placeholder="https://linkedin.com/in/username"
//                 radius="md"
//               />
//               <TextInput
//                 label="GitHub URL"
//                 value={editedData.github || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, github: e.target.value })
//                 }
//                 placeholder="https://github.com/username"
//                 radius="md"
//               />
//               <TextInput
//                 label="Website/Portfolio"
//                 value={editedData.website || ""}
//                 onChange={(e) =>
//                   setEditedData({ ...editedData, website: e.target.value })
//                 }
//                 placeholder="https://yourportfolio.com"
//                 radius="md"
//                 className="md:col-span-2"
//               />
//             </div>

//             <Textarea
//               label="About Me"
//               value={editedData.about || ""}
//               onChange={(e) =>
//                 setEditedData({ ...editedData, about: e.target.value })
//               }
//               className="mt-4"
//               rows={3}
//               placeholder="Tell us about your professional background, skills, and career goals..."
//               radius="md"
//             />

//             <Divider className="my-6" label="Skills" labelPosition="center" />

//             {/* Skills Management */}
//             <div className="mt-4">
//               <div className="flex flex-wrap gap-2 mb-3">
//                 {editedData.skills?.map((skill: string, idx: number) => (
//                   <Badge
//                     key={idx}
//                     size="lg"
//                     variant="light"
//                     color="blue"
//                     className="cursor-pointer"
//                     rightSection={
//                       <IconX
//                         size={12}
//                         className="cursor-pointer ml-1 hover:text-red-500"
//                         onClick={() => removeSkill(skill)}
//                       />
//                     }
//                   >
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="flex gap-2">
//                 <TextInput
//                   placeholder="Add new skill (e.g., React, Python, AWS)"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   className="flex-1"
//                   radius="md"
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") {
//                       addSkill();
//                     }
//                   }}
//                 />
//                 <Button
//                   onClick={addSkill}
//                   size="md"
//                   radius="md"
//                   variant="light"
//                 >
//                   <IconPlus size={16} className="mr-1" /> Add
//                 </Button>
//               </div>
//             </div>

//             <Divider
//               className="my-6"
//               label="Work Experience"
//               labelPosition="center"
//             />

//             {/* Display existing experiences */}
//             <div className="space-y-3 mb-4">
//               {editedData.experience?.map((exp: any, idx: number) => (
//                 <Paper
//                   key={idx}
//                   className="p-3 bg-white rounded-lg border border-gray-200"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-semibold">{exp.title}</h4>
//                       <p className="text-sm text-gray-600">{exp.company}</p>
//                       <p className="text-xs text-gray-400">
//                         {exp.startDate} - {exp.endDate}
//                       </p>
//                     </div>
//                     <div className="flex gap-1">
//                       <Button
//                         size="xs"
//                         variant="subtle"
//                         onClick={() => editExperience(idx)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="xs"
//                         variant="subtle"
//                         color="red"
//                         onClick={() => removeExperience(idx)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 </Paper>
//               ))}
//             </div>

//             <div className="mt-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowAddExperience(true)}
//                 leftSection={<IconBriefcase size={16} />}
//                 radius="md"
//               >
//                 Add Work Experience
//               </Button>
//             </div>

//             <Divider
//               className="my-6"
//               label="Certifications"
//               labelPosition="center"
//             />

//             {/* Display existing certifications */}
//             <div className="space-y-3 mb-4">
//               {editedData.certifications?.map((cert: any, idx: number) => (
//                 <Paper
//                   key={idx}
//                   className="p-3 bg-white rounded-lg border border-gray-200"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-semibold">{cert.name}</h4>
//                       <p className="text-sm text-gray-600">{cert.issuer}</p>
//                       <p className="text-xs text-gray-400">
//                         Issued: {cert.date}
//                       </p>
//                     </div>
//                     <div className="flex gap-1">
//                       <Button
//                         size="xs"
//                         variant="subtle"
//                         onClick={() => editCertification(idx)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="xs"
//                         variant="subtle"
//                         color="red"
//                         onClick={() => removeCertification(idx)}
//                       >
//                         Remove
//                       </Button>
//                     </div>
//                   </div>
//                 </Paper>
//               ))}
//             </div>

//             <div className="mt-2">
//               <Button
//                 variant="outline"
//                 onClick={() => setShowAddCertification(true)}
//                 leftSection={<IconCertificate size={16} />}
//                 radius="md"
//               >
//                 Add Certification
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Original Profile Display */}
//         <Profile {...editedData} />

//         {/* Add Experience Modal */}
//         <Modal
//           opened={showAddExperience}
//           onClose={() => setShowAddExperience(false)}
//           title="Add Work Experience"
//           size="lg"
//           radius="lg"
//         >
//           <Stack gap="md">
//             <TextInput
//               label="Job Title *"
//               placeholder="e.g., Senior Software Engineer"
//               value={newExperience.title}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, title: e.target.value })
//               }
//               required
//             />
//             <TextInput
//               label="Company *"
//               placeholder="e.g., Google, Microsoft"
//               value={newExperience.company}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, company: e.target.value })
//               }
//               required
//             />
//             <TextInput
//               label="Location"
//               placeholder="e.g., San Francisco, CA"
//               value={newExperience.location}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, location: e.target.value })
//               }
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <TextInput
//                 label="Start Date"
//                 placeholder="Jan 2020"
//                 value={newExperience.startDate}
//                 onChange={(e) =>
//                   setNewExperience({
//                     ...newExperience,
//                     startDate: e.target.value,
//                   })
//                 }
//               />
//               <TextInput
//                 label="End Date"
//                 placeholder="Present or Dec 2023"
//                 value={newExperience.endDate}
//                 onChange={(e) =>
//                   setNewExperience({
//                     ...newExperience,
//                     endDate: e.target.value,
//                   })
//                 }
//               />
//             </div>
//             <Textarea
//               label="Description"
//               placeholder="Describe your responsibilities and achievements..."
//               rows={4}
//               value={newExperience.description}
//               onChange={(e) =>
//                 setNewExperience({
//                   ...newExperience,
//                   description: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Technologies (comma-separated)"
//               placeholder="React, Node.js, Python, AWS"
//               value={newExperience.technologies.join(", ")}
//               onChange={(e) =>
//                 setNewExperience({
//                   ...newExperience,
//                   technologies: e.target.value.split(",").map((t) => t.trim()),
//                 })
//               }
//             />
//             <div className="flex gap-2 mt-4">
//               <Button onClick={addExperience} color="blue">
//                 Add Experience
//               </Button>
//               <Button
//                 onClick={() => setShowAddExperience(false)}
//                 variant="light"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Stack>
//         </Modal>

//         {/* Edit Experience Modal */}
//         <Modal
//           opened={showEditExperience}
//           onClose={() => {
//             setShowEditExperience(false);
//             setEditingExperienceIndex(null);
//             setNewExperience({
//               title: "",
//               company: "",
//               location: "",
//               startDate: "",
//               endDate: "",
//               description: "",
//               technologies: [],
//             });
//           }}
//           title="Edit Work Experience"
//           size="lg"
//           radius="lg"
//         >
//           <Stack gap="md">
//             <TextInput
//               label="Job Title *"
//               value={newExperience.title}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, title: e.target.value })
//               }
//             />
//             <TextInput
//               label="Company *"
//               value={newExperience.company}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, company: e.target.value })
//               }
//             />
//             <TextInput
//               label="Location"
//               value={newExperience.location}
//               onChange={(e) =>
//                 setNewExperience({ ...newExperience, location: e.target.value })
//               }
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <TextInput
//                 label="Start Date"
//                 value={newExperience.startDate}
//                 onChange={(e) =>
//                   setNewExperience({
//                     ...newExperience,
//                     startDate: e.target.value,
//                   })
//                 }
//               />
//               <TextInput
//                 label="End Date"
//                 value={newExperience.endDate}
//                 onChange={(e) =>
//                   setNewExperience({
//                     ...newExperience,
//                     endDate: e.target.value,
//                   })
//                 }
//               />
//             </div>
//             <Textarea
//               label="Description"
//               rows={4}
//               value={newExperience.description}
//               onChange={(e) =>
//                 setNewExperience({
//                   ...newExperience,
//                   description: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Technologies (comma-separated)"
//               value={newExperience.technologies.join(", ")}
//               onChange={(e) =>
//                 setNewExperience({
//                   ...newExperience,
//                   technologies: e.target.value.split(",").map((t) => t.trim()),
//                 })
//               }
//             />
//             <div className="flex gap-2 mt-4">
//               <Button onClick={updateExperience} color="blue">
//                 Update Experience
//               </Button>
//               <Button
//                 onClick={() => setShowEditExperience(false)}
//                 variant="light"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Stack>
//         </Modal>

//         {/* Add Certification Modal */}
//         <Modal
//           opened={showAddCertification}
//           onClose={() => setShowAddCertification(false)}
//           title="Add Certification"
//           size="lg"
//           radius="lg"
//         >
//           <Stack gap="md">
//             <TextInput
//               label="Certification Name *"
//               placeholder="e.g., AWS Certified Solutions Architect"
//               value={newCertification.name}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   name: e.target.value,
//                 })
//               }
//               required
//             />
//             <TextInput
//               label="Issuing Organization *"
//               placeholder="e.g., Amazon Web Services, Google"
//               value={newCertification.issuer}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   issuer: e.target.value,
//                 })
//               }
//               required
//             />
//             <TextInput
//               label="Issue Date"
//               placeholder="Jan 2023"
//               value={newCertification.date}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   date: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Credential ID"
//               placeholder="e.g., 123456789"
//               value={newCertification.id}
//               onChange={(e) =>
//                 setNewCertification({ ...newCertification, id: e.target.value })
//               }
//             />
//             <TextInput
//               label="Credential URL"
//               placeholder="https://www.credential.net/..."
//               value={newCertification.credentialUrl}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   credentialUrl: e.target.value,
//                 })
//               }
//             />
//             <div className="flex gap-2 mt-4">
//               <Button onClick={addCertification} color="blue">
//                 Add Certification
//               </Button>
//               <Button
//                 onClick={() => setShowAddCertification(false)}
//                 variant="light"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Stack>
//         </Modal>

//         {/* Edit Certification Modal */}
//         <Modal
//           opened={showEditCertification}
//           onClose={() => {
//             setShowEditCertification(false);
//             setEditingCertificationIndex(null);
//             setNewCertification({
//               name: "",
//               issuer: "",
//               date: "",
//               id: "",
//               credentialUrl: "",
//             });
//           }}
//           title="Edit Certification"
//           size="lg"
//           radius="lg"
//         >
//           <Stack gap="md">
//             <TextInput
//               label="Certification Name"
//               value={newCertification.name}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   name: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Issuing Organization"
//               value={newCertification.issuer}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   issuer: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Issue Date"
//               value={newCertification.date}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   date: e.target.value,
//                 })
//               }
//             />
//             <TextInput
//               label="Credential ID"
//               value={newCertification.id}
//               onChange={(e) =>
//                 setNewCertification({ ...newCertification, id: e.target.value })
//               }
//             />
//             <TextInput
//               label="Credential URL"
//               value={newCertification.credentialUrl}
//               onChange={(e) =>
//                 setNewCertification({
//                   ...newCertification,
//                   credentialUrl: e.target.value,
//                 })
//               }
//             />
//             <div className="flex gap-2 mt-4">
//               <Button onClick={updateCertification} color="blue">
//                 Update Certification
//               </Button>
//               <Button
//                 onClick={() => setShowEditCertification(false)}
//                 variant="light"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Stack>
//         </Modal>
//       </div>
//     </Modal>
//   );
// };

// export default EditableProfile;




import { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  Textarea,
  Modal,
  Badge,
  Divider,
  Stack,
  Paper,
} from "@mantine/core";
import {
  IconEdit,
  IconCheck,
  IconX,
  IconPlus,
  IconBriefcase,
  IconCertificate,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Profile from "./Profile";

interface EditableProfileProps {
  profileData: any;
  onSave: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
  credentialUrl: string;
}

const EditableProfile = ({
  profileData,
  onSave,
  isOpen,
  onClose,
}: EditableProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [showEditExperience, setShowEditExperience] = useState(false);
  const [showEditCertification, setShowEditCertification] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<
    number | null
  >(null);
  const [editingCertificationIndex, setEditingCertificationIndex] = useState<
    number | null
  >(null);

  const [newExperience, setNewExperience] = useState<Experience>({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: [],
  });

  const [newCertification, setNewCertification] = useState<Certification>({
    name: "",
    issuer: "",
    date: "",
    id: "",
    credentialUrl: "",
  });

  const [newSkill, setNewSkill] = useState("");

  // ✅ Fix: Update editedData when profileData changes
  useEffect(() => {
    if (profileData) {
      setEditedData(profileData);
    }
  }, [profileData]);

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
    notifications.show({
      title: "Success",
      message: "Profile updated successfully!",
      color: "green",
    });
  };

  const addExperience = () => {
    if (!newExperience.title || !newExperience.company) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill in at least title and company",
        color: "red",
      });
      return;
    }

    setEditedData({
      ...editedData,
      experience: [...(editedData.experience || []), newExperience],
    });
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
    });
    setShowAddExperience(false);
    notifications.show({
      title: "Experience Added",
      message: "Work experience has been added",
      color: "green",
    });
  };

  const updateExperience = () => {
    if (editingExperienceIndex !== null && newExperience.title) {
      const updatedExperiences = [...(editedData.experience || [])];
      updatedExperiences[editingExperienceIndex] = newExperience;
      setEditedData({ ...editedData, experience: updatedExperiences });
      setShowEditExperience(false);
      setEditingExperienceIndex(null);
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        technologies: [],
      });
      notifications.show({
        title: "Experience Updated",
        message: "Work experience has been updated",
        color: "green",
      });
    }
  };

  const editExperience = (index: number) => {
    setEditingExperienceIndex(index);
    setNewExperience(editedData.experience[index]);
    setShowEditExperience(true);
  };

  const removeExperience = (index: number) => {
    const updated = [...(editedData.experience || [])];
    updated.splice(index, 1);
    setEditedData({ ...editedData, experience: updated });
    notifications.show({
      title: "Experience Removed",
      message: "Work experience has been removed",
      color: "orange",
    });
  };

  const addCertification = () => {
    if (!newCertification.name || !newCertification.issuer) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill in at least certification name and issuer",
        color: "red",
      });
      return;
    }

    setEditedData({
      ...editedData,
      certifications: [...(editedData.certifications || []), newCertification],
    });
    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      id: "",
      credentialUrl: "",
    });
    setShowAddCertification(false);
    notifications.show({
      title: "Certification Added",
      message: "Certification has been added",
      color: "green",
    });
  };

  const updateCertification = () => {
    if (editingCertificationIndex !== null && newCertification.name) {
      const updatedCertifications = [...(editedData.certifications || [])];
      updatedCertifications[editingCertificationIndex] = newCertification;
      setEditedData({ ...editedData, certifications: updatedCertifications });
      setShowEditCertification(false);
      setEditingCertificationIndex(null);
      setNewCertification({
        name: "",
        issuer: "",
        date: "",
        id: "",
        credentialUrl: "",
      });
      notifications.show({
        title: "Certification Updated",
        message: "Certification has been updated",
        color: "green",
      });
    }
  };

  const editCertification = (index: number) => {
    setEditingCertificationIndex(index);
    setNewCertification(editedData.certifications[index]);
    setShowEditCertification(true);
  };

  const removeCertification = (index: number) => {
    const updated = [...(editedData.certifications || [])];
    updated.splice(index, 1);
    setEditedData({ ...editedData, certifications: updated });
    notifications.show({
      title: "Certification Removed",
      message: "Certification has been removed",
      color: "orange",
    });
  };

  const addSkill = () => {
    if (newSkill && !editedData.skills?.includes(newSkill)) {
      setEditedData({
        ...editedData,
        skills: [...(editedData.skills || []), newSkill],
      });
      setNewSkill("");
      notifications.show({
        title: "Skill Added",
        message: `${newSkill} has been added to your profile`,
        color: "green",
      });
    } else if (editedData.skills?.includes(newSkill)) {
      notifications.show({
        title: "Duplicate Skill",
        message: "This skill already exists in your profile",
        color: "yellow",
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditedData({
      ...editedData,
      skills:
        editedData.skills?.filter((s: string) => s !== skillToRemove) || [],
    });
    notifications.show({
      title: "Skill Removed",
      message: `${skillToRemove} has been removed`,
      color: "orange",
    });
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="95%"
      radius="lg"
      padding={0}
      withCloseButton={false}
      styles={{
        body: { padding: 0 },
        content: { maxWidth: "95vw", maxHeight: "90vh", overflow: "auto" },
      }}
    >
      <div className="relative">
        {/* Custom Header with Edit/Save Buttons */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Professional Profile
          </h2>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  leftSection={<IconEdit size={16} />}
                  variant="light"
                  color="blue"
                  radius="xl"
                >
                  Edit Profile
                </Button>
                <Button onClick={onClose} variant="subtle" color="gray" radius="xl">
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  leftSection={<IconCheck size={16} />}
                  variant="filled"
                  color="green"
                  radius="xl"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(profileData);
                  }}
                  leftSection={<IconX size={16} />}
                  variant="light"
                  color="red"
                  radius="xl"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Edit Forms (shown when editing) */}
        {isEditing && (
          <div className="p-6 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <IconEdit size={20} className="text-blue-600" />
              Edit Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Full Name"
                value={editedData.name || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
                radius="md"
              />
              <TextInput
                label="Professional Title"
                value={editedData.title || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
                placeholder="e.g., Senior Software Engineer"
                radius="md"
              />
              <TextInput
                label="Current Company"
                value={editedData.company || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, company: e.target.value })
                }
                radius="md"
              />
              <TextInput
                label="Location"
                value={editedData.location || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, location: e.target.value })
                }
                radius="md"
              />
              <TextInput
                label="Email"
                value={editedData.email || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                radius="md"
              />
              <TextInput
                label="Phone"
                value={editedData.phone || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, phone: e.target.value })
                }
                radius="md"
              />
              <TextInput
                label="LinkedIn URL"
                value={editedData.linkedin || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, linkedin: e.target.value })
                }
                placeholder="https://linkedin.com/in/username"
                radius="md"
              />
              <TextInput
                label="GitHub URL"
                value={editedData.github || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, github: e.target.value })
                }
                placeholder="https://github.com/username"
                radius="md"
              />
              <TextInput
                label="Website/Portfolio"
                value={editedData.website || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, website: e.target.value })
                }
                placeholder="https://yourportfolio.com"
                radius="md"
                className="md:col-span-2"
              />
            </div>

            <Textarea
              label="About Me"
              value={editedData.about || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, about: e.target.value })
              }
              className="mt-4"
              rows={3}
              placeholder="Tell us about your professional background, skills, and career goals..."
              radius="md"
            />

            <Divider className="my-6" label="Skills" labelPosition="center" />

            {/* Skills Management */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {editedData.skills?.map((skill: string, idx: number) => (
                  <Badge
                    key={idx}
                    size="lg"
                    variant="light"
                    color="blue"
                    className="cursor-pointer"
                    rightSection={
                      <IconX
                        size={12}
                        className="cursor-pointer ml-1 hover:text-red-500"
                        onClick={() => removeSkill(skill)}
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
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1"
                  radius="md"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill();
                    }
                  }}
                />
                <Button
                  onClick={addSkill}
                  size="md"
                  radius="md"
                  variant="light"
                >
                  <IconPlus size={16} className="mr-1" /> Add
                </Button>
              </div>
            </div>

            <Divider
              className="my-6"
              label="Work Experience"
              labelPosition="center"
            />

            {/* Display existing experiences */}
            <div className="space-y-3 mb-4">
              {editedData.experience?.map((exp: any, idx: number) => (
                <Paper
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-400">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => editExperience(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => removeExperience(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Paper>
              ))}
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => setShowAddExperience(true)}
                leftSection={<IconBriefcase size={16} />}
                radius="md"
              >
                Add Work Experience
              </Button>
            </div>

            <Divider
              className="my-6"
              label="Certifications"
              labelPosition="center"
            />

            {/* Display existing certifications */}
            <div className="space-y-3 mb-4">
              {editedData.certifications?.map((cert: any, idx: number) => (
                <Paper
                  key={idx}
                  className="p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-xs text-gray-400">
                        Issued: {cert.date}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => editCertification(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => removeCertification(idx)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Paper>
              ))}
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => setShowAddCertification(true)}
                leftSection={<IconCertificate size={16} />}
                radius="md"
              >
                Add Certification
              </Button>
            </div>
          </div>
        )}

        {/* Original Profile Display */}
        <Profile {...editedData} />

        {/* Add Experience Modal */}
        <Modal
          opened={showAddExperience}
          onClose={() => setShowAddExperience(false)}
          title="Add Work Experience"
          size="lg"
          radius="lg"
        >
          <Stack gap="md">
            <TextInput
              label="Job Title *"
              placeholder="e.g., Senior Software Engineer"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              required
            />
            <TextInput
              label="Company *"
              placeholder="e.g., Google, Microsoft"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              required
            />
            <TextInput
              label="Location"
              placeholder="e.g., San Francisco, CA"
              value={newExperience.location}
              onChange={(e) =>
                setNewExperience({ ...newExperience, location: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Start Date"
                placeholder="Jan 2020"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
              />
              <TextInput
                label="End Date"
                placeholder="Present or Dec 2023"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
            <Textarea
              label="Description"
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
            />
            <TextInput
              label="Technologies (comma-separated)"
              placeholder="React, Node.js, Python, AWS"
              value={newExperience.technologies.join(", ")}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  technologies: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={addExperience} color="blue">
                Add Experience
              </Button>
              <Button
                onClick={() => setShowAddExperience(false)}
                variant="light"
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Modal>

        {/* Edit Experience Modal */}
        <Modal
          opened={showEditExperience}
          onClose={() => {
            setShowEditExperience(false);
            setEditingExperienceIndex(null);
            setNewExperience({
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
              technologies: [],
            });
          }}
          title="Edit Work Experience"
          size="lg"
          radius="lg"
        >
          <Stack gap="md">
            <TextInput
              label="Job Title *"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
            />
            <TextInput
              label="Company *"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
            />
            <TextInput
              label="Location"
              value={newExperience.location}
              onChange={(e) =>
                setNewExperience({ ...newExperience, location: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Start Date"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
              />
              <TextInput
                label="End Date"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
              />
            </div>
            <Textarea
              label="Description"
              rows={4}
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
            />
            <TextInput
              label="Technologies (comma-separated)"
              value={newExperience.technologies.join(", ")}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  technologies: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={updateExperience} color="blue">
                Update Experience
              </Button>
              <Button
                onClick={() => setShowEditExperience(false)}
                variant="light"
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Modal>

        {/* Add Certification Modal */}
        <Modal
          opened={showAddCertification}
          onClose={() => setShowAddCertification(false)}
          title="Add Certification"
          size="lg"
          radius="lg"
        >
          <Stack gap="md">
            <TextInput
              label="Certification Name *"
              placeholder="e.g., AWS Certified Solutions Architect"
              value={newCertification.name}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  name: e.target.value,
                })
              }
              required
            />
            <TextInput
              label="Issuing Organization *"
              placeholder="e.g., Amazon Web Services, Google"
              value={newCertification.issuer}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  issuer: e.target.value,
                })
              }
              required
            />
            <TextInput
              label="Issue Date"
              placeholder="Jan 2023"
              value={newCertification.date}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  date: e.target.value,
                })
              }
            />
            <TextInput
              label="Credential ID"
              placeholder="e.g., 123456789"
              value={newCertification.id}
              onChange={(e) =>
                setNewCertification({ ...newCertification, id: e.target.value })
              }
            />
            <TextInput
              label="Credential URL"
              placeholder="https://www.credential.net/..."
              value={newCertification.credentialUrl}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  credentialUrl: e.target.value,
                })
              }
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={addCertification} color="blue">
                Add Certification
              </Button>
              <Button
                onClick={() => setShowAddCertification(false)}
                variant="light"
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Modal>

        {/* Edit Certification Modal */}
        <Modal
          opened={showEditCertification}
          onClose={() => {
            setShowEditCertification(false);
            setEditingCertificationIndex(null);
            setNewCertification({
              name: "",
              issuer: "",
              date: "",
              id: "",
              credentialUrl: "",
            });
          }}
          title="Edit Certification"
          size="lg"
          radius="lg"
        >
          <Stack gap="md">
            <TextInput
              label="Certification Name"
              value={newCertification.name}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  name: e.target.value,
                })
              }
            />
            <TextInput
              label="Issuing Organization"
              value={newCertification.issuer}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  issuer: e.target.value,
                })
              }
            />
            <TextInput
              label="Issue Date"
              value={newCertification.date}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  date: e.target.value,
                })
              }
            />
            <TextInput
              label="Credential ID"
              value={newCertification.id}
              onChange={(e) =>
                setNewCertification({ ...newCertification, id: e.target.value })
              }
            />
            <TextInput
              label="Credential URL"
              value={newCertification.credentialUrl}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  credentialUrl: e.target.value,
                })
              }
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={updateCertification} color="blue">
                Update Certification
              </Button>
              <Button
                onClick={() => setShowEditCertification(false)}
                variant="light"
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Modal>
      </div>
    </Modal>
  );
};

export default EditableProfile;





