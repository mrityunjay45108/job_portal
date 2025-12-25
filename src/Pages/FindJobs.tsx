import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] text-white">
      
      {/* Search Section */}
      <div className="p-4">
        <SearchBar />
      </div>

      {/* Divider */}
      <Divider size="xs" mx="md" color="gray" />
      <Jobs />
    </div>
  );
};

export default FindJobs;

