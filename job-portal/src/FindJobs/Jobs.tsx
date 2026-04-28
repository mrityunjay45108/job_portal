import { jobList } from "../Data/JobsData";
import JobCard from "./JobCard";
import Sort from "./Sort";

const Jobs = (props: any) => {
  return (
    // Responsive horizontal and vertical padding
    <div className="min-h-screen bg-mine-shaft-950 px-4 py-6 md:px-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section: Stacks on mobile, side-by-side on tablet+ */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center sm:text-left">
            Recommended Jobs
          </h1>
          <div className="flex justify-center sm:justify-end">
            <Sort />
          </div>
        </div>

        {/* Job Cards Grid: 
            1 col: Mobile
            2 col: Tablet (sm)
            3 col: Laptop (lg)
            4 col: Large Desktop (xl)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {jobList.map((job, index) => (
            // Flex wrapper ensures cards in the same row have equal height
            <div key={index} className="flex justify-center h-full">
              <JobCard {...job} />
            </div>
          ))}
        </div>

        {/* Empty State / No Jobs Handling */}
        {jobList.length === 0 && (
          <div className="text-center py-20 bg-mine-shaft-900/20 rounded-3xl border border-dashed border-mine-shaft-800">
            <p className="text-gray-400 text-lg">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;