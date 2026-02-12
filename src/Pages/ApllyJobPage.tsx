import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";

const ApplyJobPage = () => {
  return (
    // min-h-screen ensures the background covers the whole page
    // px-4 for mobile, px-8 for tablets, px-16 for desktop
    <div className="min-h-screen bg-mine-shaft-950 px-4 sm:px-8 md:px-16 pb-10">
      
      {/* Navigation wrapper - ensures the button aligns with the form content */}
      <div className="max-w-4xl mx-auto">
        <div className="py-6 md:py-8">
          <Link to="/jobs">
            <Button
              color="brightSun.4"
              variant="light"
              size="sm" // Smaller on mobile by default
              className="hover:translate-x-[-4px] transition-transform" // Subtle interaction
              leftSection={<IconArrowLeft size={20} />}
            >
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* ApplyJobComp is already responsive, so we just wrap it in a centered container */}
        <ApplyJobComp />
      </div>
    </div>
  );
};

export default ApplyJobPage;