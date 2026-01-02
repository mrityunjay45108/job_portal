import { COMPANY_DATA } from "../Data/CompanyData";
import { IconUsers, IconCalendar, IconBriefcase } from "@tabler/icons-react";

const AboutCompany = () => {
  return (
    <div className="bg-mine-shaft-900/50 p-8 rounded-[2rem] border border-mine-shaft-800 space-y-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white border-b border-mine-shaft-800 pb-4">Company Overview</h3>
      
      <div className="space-y-5">
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-bright-sun-400/10 rounded-xl group-hover:bg-bright-sun-400/20 transition-colors">
            <IconUsers className="text-bright-sun-400" size={24} />
          </div>
          <div>
            <p className="text-xs text-mine-shaft-400 uppercase font-bold tracking-wider">Employees</p>
            <p className="text-white font-semibold">150,000+ globally</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-bright-sun-400/10 rounded-xl group-hover:bg-bright-sun-400/20 transition-colors">
            <IconCalendar className="text-bright-sun-400" size={24} />
          </div>
          <div>
            <p className="text-xs text-mine-shaft-400 uppercase font-bold tracking-wider">Founded</p>
            <p className="text-white font-semibold">September 4, 1998</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
<button 
  onClick={() => window.open("https://www.google.com", "_blank")}
  className="w-full py-3 bg-mine-shaft-800 hover:bg-mine-shaft-700 text-white rounded-xl font-bold transition-all border border-mine-shaft-700 hover:border-bright-sun-400 hover:text-bright-sun-400 active:scale-95 shadow-sm hover:shadow-bright-sun-400/20"
>
  Visit Website
</button>
      </div>
    </div>
  );
};

export default AboutCompany;