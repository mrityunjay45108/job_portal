import { Avatar, Button, Text } from "@mantine/core";
import { 
  IconSearch, 
  IconMapPin, 
  IconSparkles, 
  IconWorld, 
  IconChartBar, 
  IconShieldCheck,
  IconArrowRight,
  IconUsers
} from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center px-6 lg:px-24 py-16 gap-16 relative overflow-hidden min-h-[90vh]">
      
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/30 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/40 blur-[120px] -z-10 rounded-full" />

      {/* Left Section */}
      <div className="w-full lg:w-[48%] flex flex-col gap-8 relative z-30">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-sm">
            <IconSparkles size={16} className="text-blue-600" />
            <span className="text-blue-700 font-bold tracking-widest text-[10px] uppercase">
              The Next Gen Talent Network
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tight">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Career Path
            </span>
          </h1>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
          Connect with high-growth companies and elite startups. Your journey to a global career starts with a single click.
        </p>

        {/* Search Bar */}
        <div className="group flex flex-col sm:flex-row items-center gap-3 p-3 bg-white border border-gray-200 rounded-[2rem] mt-4 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center flex-1 px-4 gap-3 w-full">
            <IconSearch className="text-blue-500" size={22} />
            <input 
              type="text" 
              placeholder="Design, Engineering..." 
              className="bg-transparent border-none text-gray-900 w-full outline-none py-3 text-base placeholder:text-gray-400 font-medium"
            />
          </div>
          <div className="hidden sm:block w-[1px] h-10 bg-gray-200" />
          <div className="flex items-center flex-1 px-4 gap-3 w-full">
            <IconMapPin className="text-gray-500" size={22} />
            <input 
              type="text" 
              placeholder="Remote, NYC..." 
              className="bg-transparent border-none text-gray-900 w-full outline-none py-3 text-base placeholder:text-gray-400 font-medium"
            />
          </div>
          <Button 
            size="lg" 
            rightSection={<IconArrowRight size={20} />}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-[1.5rem] px-10 transition-all hover:scale-105 active:scale-95 border-none font-bold text-md h-14 shadow-md"
          >
            Explore Jobs
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-2">
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
            <Avatar size="sm" radius="xl" className="border-2 border-white" />
          </div>
          <div className="text-sm text-gray-600">
            Trusted by <span className="font-bold text-gray-900">10,000+</span> job seekers
          </div>
        </div>
      </div>

      {/* Right Section - Feature Cards */}
      <div className="w-full lg:w-[52%] grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        {/* Card 1 */}
        <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] flex flex-col gap-5 hover:shadow-xl hover:border-blue-300 transition-all group">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
            <IconSparkles size={30} stroke={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">AI Match Engine</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Get a 95% accurate skill-to-job matching score before you even apply.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] mt-0 md:mt-12 flex flex-col gap-5 hover:shadow-xl hover:border-blue-300 transition-all group">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500">
            <IconWorld size={30} stroke={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Global Reach</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Direct access to hiring managers at Fortune 500 & Unicorn startups.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] flex flex-col gap-5 hover:shadow-xl hover:border-blue-300 transition-all group">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">98%</span>
            <IconChartBar size={24} className="text-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Hiring Velocity</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Most candidates land interviews within the first 7 days of profile verification.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] mt-0 md:mt-12 flex flex-col gap-5 hover:shadow-xl hover:border-blue-300 transition-all group">
          <div className="flex -space-x-3 mb-2">
            <Avatar src="https://placehold.co/100" radius="xl" className="border-2 border-white" size="lg" />
            <Avatar src="https://placehold.co/100" radius="xl" className="border-2 border-white" size="lg" />
            <Avatar src="https://placehold.co/100" radius="xl" className="border-2 border-white" size="lg" />
            <Avatar radius="xl" color="blue" className="border-2 border-white font-bold text-sm" size="lg">+5k</Avatar>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Verified Talent <IconShieldCheck size={22} className="text-blue-600" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">Trusted by a community of 50,000+ top-tier industry professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;