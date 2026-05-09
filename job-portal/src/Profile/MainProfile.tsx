
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