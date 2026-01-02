import { Avatar, Tabs, Rating, Progress, Divider, Button } from "@mantine/core";
import { IconMapPin, IconWorld, IconCircleCheck, IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"; 
import { COMPANY_DATA } from "../Data/CompanyData"; 
import { ReviewCard, StatCard, CompanyJobCard } from "../Company/CompanyDetails";
import AboutCompany from "../Company/AboutCompany";

const CompanyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-8 text-white">
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
      <div className="relative mb-28">
        <img 
          src="/talentProfile/profileBanner.avif" 
          alt="Company Banner" 
          className="w-full h-64 object-cover rounded-3xl brightness-75 shadow-2xl" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-mine-shaft-950/90 via-mine-shaft-950/50 to-transparent rounded-3xl"></div>
        
        {/* --- Naya Premium Overlay Implementation --- */}
        <div className="absolute -bottom-16 left-10 flex items-end gap-8 z-20">
          {/* Logo Container with High Contrast */}
          <div className="bg-white p-4 rounded-[2.5rem] border-[10px] border-mine-shaft-950 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <Avatar 
              src={COMPANY_DATA.logo} 
              alt="Company Logo"
              size={120} 
              radius="md" 
              styles={{
                image: { objectFit: 'contain' } 
              }}
            />
          </div>

          {/* Text Info with better readability */}
          <div className="pb-6 drop-shadow-2xl">
            <div className="flex items-center gap-4">
              <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-lg">
                {COMPANY_DATA.name}
              </h1>
              <IconCircleCheck className="text-blue-400 fill-blue-400/20" size={40} />
            </div>
            
            <div className="flex gap-6 mt-4 text-mine-shaft-200 font-bold uppercase tracking-widest text-xs opacity-90">
              <span className="flex items-center gap-2 bg-mine-shaft-900/50 px-3 py-1 rounded-full border border-mine-shaft-800">
                <IconMapPin size={18} className="text-bright-sun-400" /> {COMPANY_DATA.location}
              </span>
              <span className="flex items-center gap-2 bg-mine-shaft-900/50 px-3 py-1 rounded-full border border-mine-shaft-800">
                <IconWorld size={18} className="text-bright-sun-400" /> {COMPANY_DATA.website}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Grid (8:4 Layout) */}
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8">
          <Tabs variant="pills" radius="xl" defaultValue="about" color="brightSun.4">
            <Tabs.List className="mb-10 bg-mine-shaft-900/50 p-2 rounded-full w-fit border border-mine-shaft-800 backdrop-blur-sm">
              <Tabs.Tab value="about" className="px-12 py-3 font-bold text-base transition-all">About</Tabs.Tab>
              <Tabs.Tab value="jobs" className="px-12 py-3 font-bold text-base transition-all">Jobs</Tabs.Tab>
              <Tabs.Tab value="reviews" className="px-12 py-3 font-bold text-base transition-all">Reviews</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about" className="space-y-10 animate-fade-in">
              <div className="bg-mine-shaft-900/40 p-10 rounded-[2.5rem] border border-mine-shaft-800 shadow-lg">
                <h3 className="text-3xl font-bold mb-6 text-bright-sun-400">Our Mission</h3>
                <p className="text-mine-shaft-200 text-xl leading-relaxed font-medium">
                  {COMPANY_DATA.mission}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                {COMPANY_DATA.stats.map((stat: any, i: number) => (
                  <StatCard key={i} {...stat} />
                ))}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="jobs" className="space-y-6">
               <div className="flex justify-between items-end mb-4 px-2">
                 <div>
                   <h3 className="text-3xl font-bold text-white">Open Roles</h3>
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
              <div className="flex gap-12 items-center bg-mine-shaft-900/60 p-10 rounded-[2.5rem] border border-mine-shaft-800">
                <div className="text-center px-6">
                  <h2 className="text-7xl font-black text-bright-sun-400 tracking-tighter">4.8</h2>
                  <Rating value={4.8} readOnly fractions={2} size="xl" className="mt-2" />
                  <p className="text-sm text-mine-shaft-400 mt-4 font-medium uppercase tracking-widest">1.2k+ Reviews</p>
                </div>
                <Divider orientation="vertical" />
                <div className="flex-1 space-y-3">
                   {[85, 10, 5, 0, 0].map((v, i) => (
                     <div key={i} className="flex items-center gap-6">
                       <span className="w-6 text-sm font-bold text-mine-shaft-300">{5-i} ★</span>
                       <Progress color="brightSun.4" value={v} size="md" className="flex-1 bg-mine-shaft-800" radius="xl" />
                       <span className="text-sm text-mine-shaft-400 font-bold w-10">{v}%</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="grid gap-4 mt-10">
                {COMPANY_DATA.reviews.map((rev: any, i: number) => (
                  <ReviewCard key={i} {...rev} />
                ))}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>

        <div className="col-span-4 sticky top-8 h-fit">
          <AboutCompany />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;