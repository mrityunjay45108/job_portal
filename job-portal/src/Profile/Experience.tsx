// import { useState } from "react";
// import { 
//   IconCalendar, 
//   IconMapPin, 
//   IconBuilding, 
//   IconBriefcase,
//   IconPencil,
//   IconTrash,
//   IconDeviceFloppy,
//   IconX
// } from "@tabler/icons-react";
// import { Badge, Paper, TextInput, Textarea, Button, ActionIcon, Tooltip, Modal } from "@mantine/core";

// interface ExperienceProps {
//   id?: string;
//   title: string;
//   company: string;
//   companyIcon?: string;
//   location: string;
//   startDate: string;
//   endDate: string;
//   description: string;
//   technologies?: string[];
//   edit?: boolean;
//   onSave?: (id: string, data: any) => void;
//   onDelete?: (id: string) => void;
// }

// const Experience = (props: ExperienceProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [editedData, setEditedData] = useState({
//     title: props.title,
//     company: props.company,
//     location: props.location,
//     startDate: props.startDate,
//     endDate: props.endDate,
//     description: props.description,
//     technologies: props.technologies?.join(", ") || "",
//   });

//   const handleSave = () => {
//     setIsEditing(false);
//     if (props.onSave && props.id) {
//       props.onSave(props.id, {
//         ...editedData,
//         technologies: editedData.technologies.split(",").map(t => t.trim()).filter(t => t),
//       });
//     }
//   };

//   const handleDelete = () => {
//     props.onDelete?.(props.id || "");
//     setDeleteConfirmOpen(false);
//   };

//   if (isEditing || props.edit) {
//     return (
//       <Paper className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//         <div className="space-y-4">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-xl">
//               <IconBriefcase size={20} className="text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900">Edit Experience</h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextInput
//               label="Job Title"
//               placeholder="e.g., Senior Software Engineer"
//               value={editedData.title}
//               onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
//               required
//               radius="md"
//               className="md:col-span-2"
//             />
//             <TextInput
//               label="Company"
//               placeholder="e.g., Google"
//               value={editedData.company}
//               onChange={(e) => setEditedData({ ...editedData, company: e.target.value })}
//               required
//               radius="md"
//             />
//             <TextInput
//               label="Location"
//               placeholder="e.g., San Francisco, CA"
//               value={editedData.location}
//               onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
//               radius="md"
//             />
//             <TextInput
//               label="Start Date"
//               placeholder="e.g., Jan 2021"
//               value={editedData.startDate}
//               onChange={(e) => setEditedData({ ...editedData, startDate: e.target.value })}
//               required
//               radius="md"
//             />
//             <TextInput
//               label="End Date"
//               placeholder="e.g., Present or Dec 2023"
//               value={editedData.endDate}
//               onChange={(e) => setEditedData({ ...editedData, endDate: e.target.value })}
//               radius="md"
//             />
//             <Textarea
//               label="Description"
//               placeholder="Describe your responsibilities and achievements..."
//               value={editedData.description}
//               onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
//               minRows={3}
//               required
//               radius="md"
//               className="md:col-span-2"
//             />
//             <TextInput
//               label="Technologies (comma-separated)"
//               placeholder="e.g., React, TypeScript, Node.js"
//               value={editedData.technologies}
//               onChange={(e) => setEditedData({ ...editedData, technologies: e.target.value })}
//               radius="md"
//               className="md:col-span-2"
//             />
//           </div>
          
//           <div className="flex gap-3 pt-2">
//             <Button onClick={handleSave} color="blue" size="sm" radius="md">
//               <IconDeviceFloppy size={16} className="mr-1" /> Save Changes
//             </Button>
//             <Button onClick={() => setIsEditing(false)} variant="light" color="gray" size="sm" radius="md">
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Paper>
//     );
//   }

//   return (
//     <>
//       <Paper className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 group">
//         <div className="flex gap-4">
//           {/* Logo Container */}
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl h-16 w-16 flex-shrink-0 flex items-center justify-center">
//             <img 
//               className="h-8 w-8 object-contain" 
//               src={props.companyIcon || `/Icons/${props.company}.png`} 
//               alt={props.company}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/Icons/default.png';
//               }}
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
//               <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                 {props.title}
//               </h3>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                   <IconCalendar size={14} className="text-blue-500" />
//                   <span>{props.startDate} - {props.endDate}</span>
//                 </div>
                
//                 {props.edit && (
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Tooltip label="Edit">
//                       <ActionIcon onClick={() => setIsEditing(true)} variant="subtle" color="blue" size="sm">
//                         <IconPencil size={14} />
//                       </ActionIcon>
//                     </Tooltip>
//                     <Tooltip label="Delete">
//                       <ActionIcon onClick={() => setDeleteConfirmOpen(true)} variant="subtle" color="red" size="sm">
//                         <IconTrash size={14} />
//                       </ActionIcon>
//                     </Tooltip>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3 mb-3">
//               <div className="flex items-center gap-1.5 text-gray-600">
//                 <IconBuilding size={14} className="text-gray-400" />
//                 <span className="text-sm font-medium">{props.company}</span>
//               </div>
//               <span className="text-gray-300">•</span>
//               <div className="flex items-center gap-1.5 text-gray-500">
//                 <IconMapPin size={14} className="text-gray-400" />
//                 <span className="text-sm">{props.location}</span>
//               </div>
//             </div>

//             <p className="text-gray-600 text-sm leading-relaxed mb-3">
//               {props.description}
//             </p>

//             {/* Technologies */}
//             {props.technologies && props.technologies.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {props.technologies.map((tech: string, idx: number) => (
//                   <Badge key={idx} size="sm" variant="light" color="blue" className="bg-blue-50 text-blue-700">
//                     {tech}
//                   </Badge>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </Paper>

//       {/* Delete Confirmation Modal */}
//       <Modal opened={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Delete Experience" centered radius="md">
//         <div className="text-center py-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <IconTrash size={28} className="text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Experience?</h3>
//           <p className="text-gray-500 text-sm mb-6">
//             Are you sure you want to delete this work experience? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-center">
//             <Button onClick={() => setDeleteConfirmOpen(false)} variant="light" color="gray" radius="md">Cancel</Button>
//             <Button onClick={handleDelete} color="red" radius="md">Delete Experience</Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default Experience;




import { IconBriefcase, IconMapPin, IconCalendar, IconBuilding, IconClock } from "@tabler/icons-react";
import { Badge, Tooltip } from "@mantine/core";

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
}

const Experience = (props: ExperienceProps) => {
  const isCurrent = props.currentlyWorking || props.endDate === "Present";
  const endDateDisplay = isCurrent ? "Present" : props.endDate;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex flex-wrap justify-between gap-4">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          {/* Logo Container */}
          <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-fit group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
            <img 
              className="h-10 w-10 object-contain" 
              src={props.companyIcon || `/Icons/${props.company?.toLowerCase()}.png`} 
              alt={props.company}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Icons/default-company.png';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {props.title || "Position Title"}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IconBuilding size={14} className="text-gray-400" />
                <span className="font-medium">{props.company || "Company Name"}</span>
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
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full h-fit group-hover:bg-blue-50 transition-all duration-300">
          <IconCalendar size={14} className="text-blue-500" />
          <span className="font-medium">
            {props.startDate || "Start Date"} - {endDateDisplay}
          </span>
          {isCurrent && (
            <Tooltip label="Current Position">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </Tooltip>
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
      
      {/* Tech Stack Tags */}
      {props.technologies && props.technologies.length > 0 && (
        <div className="mt-4 pl-14">
          <div className="flex flex-wrap gap-2">
            {props.technologies.map((tech: string, idx: number) => (
              <Badge 
                key={idx} 
                size="sm" 
                variant="light" 
                color="gray" 
                className="bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-default"
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