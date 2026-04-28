import { Divider } from "@mantine/core";
import MainProfile from "../Profile/MainProfile";
import  profileData  from "../Data/MainProfileData";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] text-white">
      {/* my={0} aur py={0} se gap khatam ho jayega */}
      <Divider size="xs" color="mineShaft.8" my={0} /> 
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <MainProfile />
      </div>
    </div>
  );
};
export default ProfilePage;