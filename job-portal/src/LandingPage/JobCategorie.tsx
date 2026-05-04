import React from "react";
import Marquee from "react-fast-marquee";
import { 
  IconBriefcase, 
  IconDatabase, 
  IconDeviceLaptop, 
  IconMessage2, 
  IconPalette, 
  IconCloudComputing,
} from "@tabler/icons-react";

const jobCategory = [
  { title: "Software Development", desc: "Build modern web and mobile apps", jobs: "1.2k", icon: IconDeviceLaptop, color: "blue" },
  { title: "Design & Creative", desc: "Create stunning UI/UX and graphics", jobs: "800+", icon: IconPalette, color: "purple" },
  { title: "Data Science", desc: "Analyze data for actionable insights", jobs: "500+", icon: IconDatabase, color: "green" },
  { title: "Marketing", desc: "Grow brands with digital strategies", jobs: "900+", icon: IconMessage2, color: "orange" },
  { title: "Cloud Services", desc: "Manage scalable cloud infrastructure", jobs: "400+", icon: IconCloudComputing, color: "cyan" },
  { title: "Business Strategy", desc: "Optimize business operations", jobs: "600+", icon: IconBriefcase, color: "indigo" },
];

const JobCategorie = () => {
  // TypeScript bypass fix
  const MarqueeComp = Marquee as any;

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: "from-blue-100 to-blue-50 text-blue-600 group-hover:from-blue-600 group-hover:to-blue-700",
      purple: "from-purple-100 to-purple-50 text-purple-600 group-hover:from-purple-600 group-hover:to-purple-700",
      green: "from-green-100 to-green-50 text-green-600 group-hover:from-green-600 group-hover:to-green-700",
      orange: "from-orange-100 to-orange-50 text-orange-600 group-hover:from-orange-600 group-hover:to-orange-700",
      cyan: "from-cyan-100 to-cyan-50 text-cyan-600 group-hover:from-cyan-600 group-hover:to-cyan-700",
      indigo: "from-indigo-100 to-indigo-50 text-indigo-600 group-hover:from-indigo-600 group-hover:to-indigo-700",
    };
    return colors[color] || colors.blue;
  };

  return (
    /* bg-white for pure white look */
    <div className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Browse by <span className="text-blue-600">Category</span>
        </h2>
        <p className="text-gray-500 max-w-xl font-medium">
          Explore diverse job opportunities tailored to your skills and career aspirations.
        </p>
      </div>

      <MarqueeComp 
        speed={40} 
        pauseOnHover={true} 
        gradient={true} 
        /* FIX: Latest version support [R, G, B] array */
        gradientColor={[255, 255, 255]} 
        gradientWidth={100}
      >
        {jobCategory.map((category, index) => {
          const IconComponent = category.icon;
          const colorClasses = getColorClasses(category.color);
          const classArray = colorClasses.split(' ');
          
          return (
            <div
              key={index}
              className="flex flex-col bg-white w-72 h-52 border border-gray-100 
              rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl 
              hover:shadow-blue-500/5 hover:border-blue-200 group mx-4 justify-between"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${classArray[0]} ${classArray[1]} flex items-center justify-center ${classArray[2]} group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                <IconComponent size={30} stroke={1.5} /> 
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{category.title}</h3>
                <p className="text-sm text-gray-400 font-medium line-clamp-1">{category.desc}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em]">
                  {category.jobs} Openings
                </span>
              </div>
            </div>
          );
        })}
      </MarqueeComp>
    </div>
  );
};

export default JobCategorie;