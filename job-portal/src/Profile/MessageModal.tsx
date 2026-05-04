// import { Modal, TextInput, Textarea, Button, Stack, Text } from "@mantine/core";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import { IconSend } from "@tabler/icons-react";

// interface MessageModalProps {
//   opened: boolean;
//   onClose: () => void;
//   name?: string;  // Made optional
//   avatar?: string;
// }

// const MessageModal = ({ opened, onClose, name = "User", avatar }: MessageModalProps) => {
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [sending, setSending] = useState(false);

//   const handleSend = async () => {
//     if (!subject || !message) {
//       notifications.show({
//         title: "Missing Information",
//         message: "Please fill in both subject and message",
//         color: "red"
//       });
//       return;
//     }

//     setSending(true);
    
//     // Simulate sending message
//     setTimeout(() => {
//       notifications.show({
//         title: "Message Sent! 🎉",
//         message: `Your message to ${name} has been sent successfully.`,
//         color: "green"
//       });
//       setSending(false);
//       setSubject("");
//       setMessage("");
//       onClose();
//     }, 1000);
//   };

//   return (
//     <Modal
//       opened={opened}
//       onClose={onClose}
//       title={`Send Message to ${name}`}
//       size="lg"
//       radius="lg"
//       centered
//     >
//       <Stack gap="md">
//         {/* Avatar and Name Section */}
//         {avatar && (
//           <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//             <img 
//               src={avatar} 
//               alt={name}
//               className="w-10 h-10 rounded-full object-cover"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=ffffff`;
//               }}
//             />
//             <div>
//               <Text fw={600} size="sm">Messaging: {name}</Text>
//               <Text size="xs" c="gray">Your message will be sent directly to this professional</Text>
//             </div>
//           </div>
//         )}
        
//         {!avatar && (
//           <Text size="sm" c="gray" className="p-3 bg-gray-50 rounded-lg">
//             You are messaging <strong>{name}</strong>
//           </Text>
//         )}
        
//         <TextInput
//           label="Subject"
//           placeholder="e.g., Job Opportunity, Collaboration, Question about experience"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           required
//           radius="md"
//           size="md"
//         />
        
//         <Textarea
//           label="Message"
//           placeholder="Write your message here... Be specific and professional."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           minRows={5}
//           required
//           radius="md"
//           size="md"
//         />
        
//         {/* Character counter */}
//         {message.length > 0 && (
//           <Text size="xs" c="gray" className="text-right">
//             {message.length} characters
//           </Text>
//         )}
        
//         <div className="flex gap-3 justify-end mt-4">
//           <Button 
//             variant="light" 
//             onClick={onClose}
//             radius="xl"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSend} 
//             loading={sending}
//             leftSection={<IconSend size={16} />}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//             radius="xl"
//           >
//             Send Message
//           </Button>
//         </div>
//       </Stack>
//     </Modal>
//   );
// };

// export default MessageModal;




// src/Profile/MessageModal.tsx
// import { Modal, TextInput, Textarea, Button, Stack, Text } from "@mantine/core";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import { IconSend } from "@tabler/icons-react";

// interface MessageModalProps {
//   opened: boolean;
//   onClose: () => void;
//   name?: string;
//   avatar?: string;
// }

// const MessageModal = ({ opened, onClose, name = "User", avatar }: MessageModalProps) => {
//   const [message, setMessage] = useState("");
//   const [subject, setSubject] = useState("");
//   const [sending, setSending] = useState(false);

//   const handleSend = async () => {
//     if (!subject || !message) {
//       notifications.show({
//         title: "Missing Information",
//         message: "Please fill in both subject and message",
//         color: "red"
//       });
//       return;
//     }

//     setSending(true);
    
//     setTimeout(() => {
//       notifications.show({
//         title: "Message Sent! 🎉",
//         message: `Your message to ${name} has been sent successfully.`,
//         color: "green"
//       });
//       setSending(false);
//       setSubject("");
//       setMessage("");
//       onClose();
//     }, 1000);
//   };

//   return (
//     <Modal
//       opened={opened}
//       onClose={onClose}
//       title={`Send Message to ${name}`}
//       size="lg"
//       radius="lg"
//       centered
//     >
//       <Stack gap="md">
//         {avatar && (
//           <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//             <img 
//               src={avatar} 
//               alt={name}
//               className="w-10 h-10 rounded-full object-cover"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=ffffff`;
//               }}
//             />
//             <div>
//               <Text fw={600} size="sm">Messaging: {name}</Text>
//               <Text size="xs" c="gray">Your message will be sent directly to this professional</Text>
//             </div>
//           </div>
//         )}
        
//         {!avatar && (
//           <Text size="sm" c="gray" className="p-3 bg-gray-50 rounded-lg">
//             You are messaging <strong>{name}</strong>
//           </Text>
//         )}
        
//         <TextInput
//           label="Subject"
//           placeholder="e.g., Job Opportunity, Collaboration, Question about experience"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           required
//           radius="md"
//           size="md"
//         />
        
//         <Textarea
//           label="Message"
//           placeholder="Write your message here... Be specific and professional."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           minRows={5}
//           required
//           radius="md"
//           size="md"
//         />
        
//         {message.length > 0 && (
//           <Text size="xs" c="gray" className="text-right">
//             {message.length} characters
//           </Text>
//         )}
        
//         <div className="flex gap-3 justify-end mt-4">
//           <Button variant="light" onClick={onClose} radius="xl">
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSend} 
//             loading={sending}
//             leftSection={<IconSend size={16} />}
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//             radius="xl"
//           >
//             Send Message
//           </Button>
//         </div>
//       </Stack>
//     </Modal>
//   );
// };

// export default MessageModal;

import { Modal, TextInput, Textarea, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconSend } from "@tabler/icons-react";

interface MessageModalProps {
  opened: boolean;
  onClose: () => void;
  name?: string;
  avatar?: string;
}

const MessageModal = ({ opened, onClose, name = "User", avatar }: MessageModalProps) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!subject || !message) {
      notifications.show({
        title: "Missing Information",
        message: "Please fill in both subject and message",
        color: "red"
      });
      return;
    }

    setSending(true);
    
    setTimeout(() => {
      notifications.show({
        title: "Message Sent! 🎉",
        message: `Your message to ${name} has been sent successfully.`,
        color: "green"
      });
      setSending(false);
      setSubject("");
      setMessage("");
      onClose();
    }, 1000);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Send Message to ${name}`}
      size="lg"
      radius="lg"
      centered
    >
      <Stack gap="md">
        {avatar && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <img 
              src={avatar} 
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=ffffff`;
              }}
            />
            <div>
              <Text fw={600} size="sm">Messaging: {name}</Text>
              <Text size="xs" c="gray">Your message will be sent directly</Text>
            </div>
          </div>
        )}
        
        {!avatar && (
          <Text size="sm" c="gray" className="p-3 bg-gray-50 rounded-lg">
            You are messaging <strong>{name}</strong>
          </Text>
        )}
        
        <TextInput
          label="Subject"
          placeholder="e.g., Job Opportunity, Collaboration, Question"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          radius="md"
          size="md"
        />
        
        <Textarea
          label="Message"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={5}
          required
          radius="md"
          size="md"
        />
        
        <div className="flex gap-3 justify-end mt-4">
          <Button variant="light" onClick={onClose} radius="xl">
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            loading={sending}
            leftSection={<IconSend size={16} />}
            className="bg-gradient-to-r from-blue-600 to-indigo-600"
            radius="xl"
          >
            Send Message
          </Button>
        </div>
      </Stack>
    </Modal>
  );
};

export default MessageModal;