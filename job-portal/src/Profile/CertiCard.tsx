// import { useState } from "react";
// import { 
//   IconCalendar, 
//   IconId, 
//   IconExternalLink, 
//   IconCheck, 
//   IconAward,
//   IconPencil,
//   IconDeviceFloppy,
//   IconTrash
// } from "@tabler/icons-react";
// import { 
//   Badge, 
//   Button, 
//   Tooltip, 
//   Paper, 
//   TextInput, 
//   ActionIcon,
//   Modal
// } from "@mantine/core";

// interface CertificationProps {
//   id?: string;
//   name: string;
//   issuer: string;
//   issuerIcon?: string;
//   date?: string;
//   issueDate?: string;
//   expiryDate?: string;
//   credentialId?: string;
//   credentialUrl?: string;
//   verified?: boolean;
//   location?: string;
//   edit?: boolean;
//   onSave?: (id: string, data: any) => void;
//   onDelete?: (id: string) => void;
// }

// const CertiCard = (props: CertificationProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [editedData, setEditedData] = useState({
//     name: props.name,
//     issuer: props.issuer,
//     date: props.date || props.issueDate || "",
//     credentialId: props.credentialId || props.id || "",
//     credentialUrl: props.credentialUrl || "",
//   });

//   const handleSave = () => {
//     setIsEditing(false);
//     if (props.onSave && props.id) {
//       props.onSave(props.id, editedData);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedData({
//       name: props.name,
//       issuer: props.issuer,
//       date: props.date || props.issueDate || "",
//       credentialId: props.credentialId || props.id || "",
//       credentialUrl: props.credentialUrl || "",
//     });
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
//               <IconAward size={20} className="text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900">Edit Certification</h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextInput
//               label="Certification Name"
//               placeholder="e.g., AWS Certified Solutions Architect"
//               value={editedData.name}
//               onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
//               required
//               radius="md"
//               className="md:col-span-2"
//             />
//             <TextInput
//               label="Issuing Organization"
//               placeholder="e.g., Amazon Web Services"
//               value={editedData.issuer}
//               onChange={(e) => setEditedData({ ...editedData, issuer: e.target.value })}
//               required
//               radius="md"
//             />
//             <TextInput
//               label="Issue Date"
//               placeholder="e.g., May 2023"
//               value={editedData.date}
//               onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
//               radius="md"
//             />
//             <TextInput
//               label="Credential ID"
//               placeholder="e.g., AWS-12345-67890"
//               value={editedData.credentialId}
//               onChange={(e) => setEditedData({ ...editedData, credentialId: e.target.value })}
//               radius="md"
//             />
//             <TextInput
//               label="Credential URL (Optional)"
//               placeholder="https://www.credential.net/..."
//               value={editedData.credentialUrl}
//               onChange={(e) => setEditedData({ ...editedData, credentialUrl: e.target.value })}
//               radius="md"
//               className="md:col-span-2"
//             />
//           </div>
          
//           <div className="flex gap-3 pt-2">
//             <Button onClick={handleSave} color="blue" size="sm" radius="md">
//               <IconDeviceFloppy size={16} className="mr-1" /> Save Changes
//             </Button>
//             <Button onClick={handleCancel} variant="light" color="gray" size="sm" radius="md">
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Paper>
//     );
//   }

//   return (
//     <>
//       <Paper className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
//         <div className="flex items-center gap-4">
//           {/* Logo Container */}
//           <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 rounded-xl h-14 w-14 flex-shrink-0 flex items-center justify-center">
//             <img 
//               className="h-8 w-8 object-contain" 
//               src={props.issuerIcon || `/Icons/${props.issuer}.png`} 
//               alt={props.issuer}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/Icons/default.png';
//               }}
//             />
//           </div>

//           {/* Details */}
//           <div className="flex-1">
//             <div className="flex flex-wrap justify-between items-start gap-2">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                     {props.name}
//                   </h4>
//                   {props.verified && (
//                     <Badge size="xs" color="green" className="bg-green-100 text-green-700">
//                       <div className="flex items-center gap-0.5">
//                         <IconCheck size={10} />
//                         Verified
//                       </div>
//                     </Badge>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-500">{props.issuer}</p>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <div className="text-right">
//                   <div className="flex items-center gap-1 text-xs text-gray-500">
//                     <IconCalendar size={12} className="text-gray-400" />
//                     <span>{props.date || props.issueDate || "Not specified"}</span>
//                   </div>
//                   {(props.credentialId || props.id) && (
//                     <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono mt-1">
//                       <IconId size={10} />
//                       <span>ID: {props.credentialId || props.id}</span>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Edit/Delete Actions - Only show if edit mode is enabled */}
//                 {props.edit && (
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <Tooltip label="Edit Certification">
//                       <ActionIcon
//                         onClick={() => setIsEditing(true)}
//                         variant="subtle"
//                         color="blue"
//                         size="sm"
//                       >
//                         <IconPencil size={14} />
//                       </ActionIcon>
//                     </Tooltip>
//                     <Tooltip label="Delete Certification">
//                       <ActionIcon
//                         onClick={() => setDeleteConfirmOpen(true)}
//                         variant="subtle"
//                         color="red"
//                         size="sm"
//                       >
//                         <IconTrash size={14} />
//                       </ActionIcon>
//                     </Tooltip>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Verify Button */}
//           {props.credentialUrl && (
//             <Tooltip label="View Credential">
//               <a href={props.credentialUrl} target="_blank" rel="noopener noreferrer">
//                 <Button 
//                   variant="subtle" 
//                   size="compact-sm"
//                   color="blue"
//                   rightSection={<IconExternalLink size={14} />}
//                   className="hover:bg-blue-50"
//                 >
//                   Verify
//                 </Button>
//               </a>
//             </Tooltip>
//           )}
//         </div>

//         {/* Expiry Date Badge */}
//         {props.expiryDate && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
//               <IconCalendar size={12} />
//               <span>Expires: {props.expiryDate}</span>
//             </div>
//           </div>
//         )}
//       </Paper>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         opened={deleteConfirmOpen}
//         onClose={() => setDeleteConfirmOpen(false)}
//         title="Delete Certification"
//         centered
//         radius="md"
//       >
//         <div className="text-center py-4">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <IconTrash size={28} className="text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Certification?</h3>
//           <p className="text-gray-500 text-sm mb-6">
//             Are you sure you want to delete "{props.name}"? This action cannot be undone.
//           </p>
//           <div className="flex gap-3 justify-center">
//             <Button 
//               onClick={() => setDeleteConfirmOpen(false)} 
//               variant="light" 
//               color="gray"
//               radius="md"
//             >
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleDelete} 
//               color="red"
//               radius="md"
//             >
//               Delete Certification
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default CertiCard;



import { IconAward, IconCalendar, IconId, IconExternalLink, IconCheck, IconCertificate } from "@tabler/icons-react";
import { Badge, Button, Tooltip } from "@mantine/core";

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
}

const Certification = (props: CertificationProps) => {
  const issueDate = props.date || props.issueDate;
  const isExpired = props.expires ? new Date(props.expires) < new Date() : false;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex flex-wrap justify-between items-start gap-4">
        {/* Left Section */}
        <div className="flex gap-3 flex-1">
          {/* Logo Container */}
          <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
            <img 
              className="h-8 w-8 object-contain" 
              src={props.issuerIcon || `/Icons/${props.issuer?.toLowerCase()}.png`} 
              alt={props.issuer}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Icons/default-cert.png';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {props.name || "Certification Name"}
              </h4>
              {props.verified && (
                <Tooltip label="Verified Certification">
                  <Badge size="xs" color="green" className="bg-green-100 text-green-700">
                    <IconCheck size={10} className="inline mr-0.5" />
                    Verified
                  </Badge>
                </Tooltip>
              )}
              {isExpired && (
                <Badge size="xs" color="red" className="bg-red-100 text-red-700">
                  Expired
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500 font-medium mb-2">
              {props.issuer || "Issuing Organization"}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-400">
              {issueDate && (
                <div className="flex items-center gap-1">
                  <IconCalendar size={12} />
                  <span>Issued: {issueDate}</span>
                </div>
              )}
              {props.expires && !isExpired && (
                <div className="flex items-center gap-1">
                  <IconCalendar size={12} />
                  <span>Expires: {props.expires}</span>
                </div>
              )}
              {props.id && (
                <div className="flex items-center gap-1">
                  <IconId size={12} />
                  <span>Credential ID: {props.id}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Link */}
        {props.credentialUrl && (
          <Tooltip label="View Credential">
            <a href={props.credentialUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="subtle" 
                size="compact-sm"
                color="blue"
                rightSection={<IconExternalLink size={14} />}
                className="hover:bg-blue-50 transition-all duration-300"
              >
                Verify
              </Button>
            </a>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Certification;