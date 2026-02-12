import { Avatar, Tabs, Rating, Progress, Divider, Button } from "@mantine/core";
import { IconMapPin, IconWorld, IconCircleCheck, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"; 
import { COMPANY_DATA } from "../Data/CompanyData"; 
import { ReviewCard, StatCard, CompanyJobCard } from "../Company/CompanyDetails";
import AboutCompany from "../Company/AboutCompany";

const CompanyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4 md:p-8 text-white">
      {/* 0. Navigation Header */}
      <Button 
        color="brightSun.4" 
        variant="light" 
        leftSection={<IconArrowLeft size={20} />} 
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-bright-sun-400/10 transition-colors"
      >
        Back to Search
      </Button>

      {/* 1. Brand Banner & Profile */}
      <div className="relative mb-32 md:mb-28">
        <img 
          src="/talentProfile/profileBanner.avif" 
          alt="Company Banner" 
          className="w-full h-48 md:h-64 object-cover rounded-2xl md:rounded-3xl brightness-75 shadow-2xl" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-mine-shaft-950/90 via-mine-shaft-950/50 to-transparent rounded-2xl md:rounded-3xl"></div>
        
        {/* --- Responsive Overlay Implementation --- */}
        <div className="absolute -bottom-20 md:-bottom-16 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-8 z-20 w-full px-4 md:px-0">
          
          {/* Logo Container */}
          <div className="bg-white p-2 md:p-4 rounded-3xl md:rounded-[2.5rem] border-[6px] md:border-[10px] border-mine-shaft-950 shadow-2xl">
            <Avatar 
              src={COMPANY_DATA.logo} 
              alt="Company Logo"
              size={window.innerWidth < 768 ? 80 : 120} 
              radius="md" 
              styles={{ image: { objectFit: 'contain' } }}
            />
          </div>

          {/* Text Info */}
          <div className="pb-0 md:pb-6 text-center md:text-left drop-shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-white">
                {COMPANY_DATA.name}
              </h1>
              <IconCircleCheck className="text-blue-400 fill-blue-400/20 hidden md:block" size={40} />
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-6 mt-3 md:mt-4 text-mine-shaft-200 font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-90">
              <span className="flex items-center gap-2 bg-mine-shaft-900/50 px-3 py-1 rounded-full border border-mine-shaft-800">
                <IconMapPin size={16} className="text-bright-sun-400" /> {COMPANY_DATA.location}
              </span>
              <span className="flex items-center gap-2 bg-mine-shaft-900/50 px-3 py-1 rounded-full border border-mine-shaft-800">
                <IconWorld size={16} className="text-bright-sun-400" /> {COMPANY_DATA.website}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 mt-10">
        
        {/* Left Content (8 Cols on Desktop) */}
        <div className="lg:col-span-8">
          <Tabs variant="pills" radius="xl" defaultValue="about" color="brightSun.4" className="w-full">
            <Tabs.List className="mb-6 md:mb-10 bg-mine-shaft-900/50 p-1 md:p-2 rounded-full w-full sm:w-fit border border-mine-shaft-800 backdrop-blur-sm overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hide">
              <Tabs.Tab value="about" className="flex-1 sm:flex-none px-6 md:px-12 py-2 md:py-3 font-bold text-sm md:text-base">About</Tabs.Tab>
              <Tabs.Tab value="jobs" className="flex-1 sm:flex-none px-6 md:px-12 py-2 md:py-3 font-bold text-sm md:text-base">Jobs</Tabs.Tab>
              <Tabs.Tab value="reviews" className="flex-1 sm:flex-none px-6 md:px-12 py-2 md:py-3 font-bold text-sm md:text-base">Reviews</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about" className="space-y-6 md:space-y-10 animate-fade-in">
              <div className="bg-mine-shaft-900/40 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-mine-shaft-800 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-bright-sun-400">Our Mission</h3>
                <p className="text-mine-shaft-200 text-lg md:text-xl leading-relaxed">
                  {COMPANY_DATA.mission}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {COMPANY_DATA.stats.map((stat: any, i: number) => (
                  <StatCard key={i} {...stat} />
                ))}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="jobs" className="space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 px-2 gap-4">
                 <div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white">Open Roles</h3>
                   <p className="text-mine-shaft-400 mt-1">Join our world-class team</p>
                 </div>
                 <span className="bg-mine-shaft-900 px-4 py-2 rounded-xl border border-mine-shaft-800 text-bright-sun-400 font-bold">
                   {COMPANY_DATA.jobs.length} Positions
                 </span>
               </div>
               <div className="flex flex-col gap-4">
                 {COMPANY_DATA.jobs.map((job: any, i: number) => (
                   <CompanyJobCard key={i} job={job} />
                 ))}
               </div>
            </Tabs.Panel>

            <Tabs.Panel value="reviews" className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-mine-shaft-900/60 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-mine-shaft-800">
                <div className="text-center md:px-6">
                  <h2 className="text-5xl md:text-7xl font-black text-bright-sun-400 tracking-tighter">4.8</h2>
                  <Rating value={4.8} readOnly fractions={2} size="lg" className="mt-2 justify-center" />
                  <p className="text-xs text-mine-shaft-400 mt-4 font-medium uppercase tracking-widest">1.2k+ Reviews</p>
                </div>
                <Divider orientation="vertical" className="hidden md:block" />
                <div className="w-full flex-1 space-y-3">
                    {[85, 10, 5, 0, 0].map((v, i) => (
                     <div key={i} className="flex items-center gap-4 md:gap-6">
                       <span className="w-6 text-xs font-bold text-mine-shaft-300">{5-i} ★</span>
                       <Progress color="brightSun.4" value={v} size="sm" className="flex-1 bg-mine-shaft-800" radius="xl" />
                       <span className="text-xs text-mine-shaft-400 font-bold w-10 text-right">{v}%</span>
                     </div>
                    ))}
                </div>
              </div>
              <div className="grid gap-4 mt-6 md:mt-10">
                {COMPANY_DATA.reviews.map((rev: any, i: number) => (
                  <ReviewCard key={i} {...rev} />
                ))}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>

        {/* Right Sidebar (4 Cols on Desktop) */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
          <AboutCompany />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;