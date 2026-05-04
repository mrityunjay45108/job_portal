import React from "react";
import Marquee from "react-fast-marquee";

const companyList = [
  "Google", "figma", "Netflix", "meta", "Pintrest",
  "slack", "spotify", "Amazon", "Oracal", "tcs"
];

const Companies = () => {
  // TypeScript ko bypass karne ke liye component ko 'any' cast karein
  const MarqueeComp = Marquee as any;

  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-12">
        <p className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-3">
          Trusted Industry Leaders
        </p>
        <h2 className="text-3xl font-semibold text-gray-900">
          Join <span className="text-blue-600 font-bold">1000+</span> Global Companies
        </h2>
      </div>

      <MarqueeComp 
        speed={50} 
        gradient={true} 
        gradientColor={[255, 255, 255]} 
        gradientWidth={100} 
        pauseOnHover={true}
      >
        <div className="flex items-center gap-20 pr-20">
          {companyList.map((company, index) => (
            <div
              key={index}
              /* SHI KIYA GAYA: 'grayscale' aur 'opacity' ko hata diya gaya hai taaki original color dikhe */
              className="flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-110"
            >
              <img
                className="h-10 lg:h-12 w-auto object-contain"
                src={`/Companies/${company}.png`}
                alt={company}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </MarqueeComp>
    </div>
  );
};

export default Companies;