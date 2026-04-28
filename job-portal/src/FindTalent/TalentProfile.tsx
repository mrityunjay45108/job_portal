import { Divider, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Profile from "../TalentProfile/Profile";
import { talentData } from "../Data/TalentData"; 
import Recommend from "../TalentProfile/Recommended";

const TalentProfilePage = () => {
  const { id } = useParams();

  const profile = talentData.find((talent: any) => String(talent.id) === id);

  if (!profile) {
    return (
      <div className="min-h-[90vh] bg-mine-shaft-950 text-white p-10">
        <h2>Talent not found!</h2>
        <Link to="/find-talent">
           <Button variant="light" color="yellow" mt="md">Back to Find Talent</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] p-4 gap-4">
      <Divider size="xs" mb="md" />

      <Button
        component={Link}
        to="/find-talent"
        variant="outline"
        color="yellow"
        leftSection={<ArrowLeft size={16} />}
        radius="md"
        mb="md" // Added margin bottom
      >
        Back
      </Button>

      {/* Yahan 'flex' container add kiya hai taaki side-by-side dikhe */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        
        {/* Left Section: Profile (70%) */}
        <div className="w-full md:w-[70%]">
          <Profile {...profile} />
        </div>

        {/* Right Section: Recommend (30%) */}
        <div className="w-full md:w-[30%] gap-5">
          <Recommend />
        </div>

      </div>
    </div>
  );
};

export default TalentProfilePage;