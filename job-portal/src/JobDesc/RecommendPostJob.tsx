import { talentData } from "../Data/TalentData";
import JobCard from "../FindTalent/JobCard";

const RecommendedJobs = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-xl font-semibold mb-2 text-white">Recommended Jobs</div>
      
      {/* Scrollable Container: -mb-10 ko hata kar gap-4 rakha taaki cards clean dikhein */}
      <div className="flex flex-col gap-4 h-[calc(100vh-180px)] overflow-y-auto scrollbar-hide">
        {talentData.slice(0, 10).map((talent: any, index: number) => (
          <div key={index} className="transition-all duration-300 hover:scale-[1.02] origin-top">
             <JobCard 
               job={talent} 
               isFavorite={false} 
               onToggleFavorite={() => {}} 
             />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;