// src/components/ProfileModal.tsx
import { Modal } from "@mantine/core";
import { EditableProfile } from "../Profile";

interface ProfileModalProps {
  opened: boolean;
  onClose: () => void;
  profileData: any;
  onSave: (data: any) => void;
  isEditable?: boolean;
}

const ProfileModal = ({ opened, onClose, profileData, onSave, isEditable = true }: ProfileModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="95%"
      radius="lg"
      padding={0}
      withCloseButton={false}
      styles={{
        body: { padding: 0 },
        content: { maxWidth: "95vw", maxHeight: "90vh", overflow: "auto" }
      }}
    >
      <div className="relative">
        {/* Custom close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
          style={{ zIndex: 9999 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        {/* Editable Profile Component */}
        <EditableProfile
          profileData={profileData}
          onSave={onSave}
          isOpen={opened}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default ProfileModal;