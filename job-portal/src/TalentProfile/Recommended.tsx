// Recommend.tsx ko aise update karein:

import { talentData } from "../Data/TalentData";
import JobCard from "../FindTalent/JobCard";

const Recommend = () => {
  return (
    <div className="bg-opacity-50 p-4 rounded-xl gap-4">
      <div className="text-xl font-semibold mb-5 text-white">Recommended Talent</div>
      
      {/* Scrollable Container yahan hai */}
      <div className="flex flex-col gap-6 h-[1150px] overflow-y-auto scrollbar-hide">
        {/* talentData se talents nikal kar render karein */}
        {talentData.slice(0, 10).map((talent: any, index: number) => (
          <div key={index} className="scale-90 origin-top -mb-10 hover:scale-95 transition-all duration-300">
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

export default Recommend;