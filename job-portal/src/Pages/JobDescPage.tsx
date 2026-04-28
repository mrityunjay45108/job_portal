import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/RecommendPostJob"; 

const JobDescPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" mx="md" mb="md" />

      <Link className="my-5 inline-block" to="/find-jobs">
        <Button
          color="brightSun.4"
          leftSection={<IconArrowLeft size={20} />}
          variant="light"
        >
          Back
        </Button>
      </Link>

      {/* Main Wrapper: justify-between hataya aur gap-6 rakha taaki chips ki tarah jude rahein */}
      <div className="flex flex-col md:flex-row gap-6 items-start w-full px-2">
        
        {/* Left Section (70%): Isko pura stretch hone diya */}
        <div className="w-full md:w-[70%] flex-grow">
          <JobDesc />
        </div>

        {/* Right Section (30%): Sidebar width fix kar di */}
        <div className="w-full md:w-[30%] sticky top-5">
          <RecommendedJobs />
        </div>

      </div>
    </div>
  );
};

export default JobDescPage;