import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Jobs from "../FindJobs/Jobs";

const FindJobs = () => {
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] text-white">
      
      {/* Wrapper for the entire content. 
         mx-auto centers it, max-w prevents it from stretching too far on 4k screens.
      */}
      <div className="max-w-[90rem] mx-auto flex flex-col gap-4">
        
        {/* Search Section */}
        <div className="px-4 py-6 md:px-8 md:py-10">
          <SearchBar />
        </div>

        {/* Divider - Matches the padding of the content */}
        <div className="px-4 md:px-8">
          <Divider size="xs" color="mineShaft.7" />
        </div>

        {/* Jobs List Section */}
        <div className="px-4 py-4 md:px-8 md:pb-20">
          <Jobs />
        </div>
        
      </div>
    </div>
  );
};

export default FindJobs;
