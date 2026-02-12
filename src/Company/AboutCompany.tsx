import { COMPANY_DATA } from "../Data/CompanyData";
import { IconUsers, IconCalendar, IconWorld } from "@tabler/icons-react";

const AboutCompany = () => {
  return (
    <div className="bg-mine-shaft-900/50 p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-mine-shaft-800 space-y-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-lg md:text-xl font-bold text-white border-b border-mine-shaft-800 pb-4">
        Company Overview
      </h3>
      
      {/* On mobile, we use a 2-column grid for the stats to save space.
          On desktop, we go back to a vertical stack (space-y-5).
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 md:space-y-5">
        
        <div className="flex items-center gap-3 md:gap-4 group">
          <div className="p-2.5 md:p-3 bg-bright-sun-400/10 rounded-xl group-hover:bg-bright-sun-400/20 transition-colors shrink-0">
            <IconUsers className="text-bright-sun-400" size={window.innerWidth < 768 ? 20 : 24} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-mine-shaft-400 uppercase font-bold tracking-wider truncate">
              Employees
            </p>
            <p className="text-white text-sm md:text-base font-semibold truncate">
              150,000+ globally
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 group">
          <div className="p-2.5 md:p-3 bg-bright-sun-400/10 rounded-xl group-hover:bg-bright-sun-400/20 transition-colors shrink-0">
            <IconCalendar className="text-bright-sun-400" size={window.innerWidth < 768 ? 20 : 24} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] md:text-xs text-mine-shaft-400 uppercase font-bold tracking-wider truncate">
              Founded
            </p>
            <p className="text-white text-sm md:text-base font-semibold truncate">
              Sept 4, 1998
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 md:pt-4">
        <button 
          onClick={() => window.open(COMPANY_DATA.website || "https://www.google.com", "_blank")}
          className="flex items-center justify-center gap-2 w-full py-3 bg-mine-shaft-800 hover:bg-mine-shaft-700 text-white rounded-xl font-bold transition-all border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 active:scale-95 shadow-sm hover:shadow-bright-sun-400/20 text-sm md:text-base"
        >
          <IconWorld size={18} className="hidden md:block" />
          Visit Website
        </button>
      </div>
    </div>
  );
};

export default AboutCompany;