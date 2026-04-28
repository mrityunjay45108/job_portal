import Marquee from "react-fast-marquee";
import { internshipCategory } from "../Data/Data";

const InternshipSection = () => {
  return (
    <div className="mt-18 pb-5 bg-[#2a2d2e]">
      <div className="text-4xl text-center font-semibold mb-3 text-white">
        Browse <span className="text-bright-sun-400">Internships</span>
      </div>

      <div className="text-lg text-center mx-auto mb-10 text-mine-shaft-300 w-1/2">
        Discover the Internships that fit your career aspirations.
      </div>

      {/* Marquee sliding section */}
      <Marquee speed={40} gradient={false} pauseOnHover={true} className="py-4">
        {internshipCategory.map((intern, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between
            bg-mine-shaft-900 w-64 h-72 
            border border-mine-shaft-700 rounded-xl 
            p-5 mx-4 shadow-lg 
            transition duration-300 ease-in-out
            hover:border-bright-sun-400 cursor-pointer"
          >
            {/* Image */}
            <img
              src={intern.img}
              alt={intern.title}
              className="w-14 h-14 rounded-xl object-cover"
            />

            {/* Title */}
            <div className="text-lg font-semibold text-white text-center">
              {intern.title}
            </div>

            {/* Description */}
            <div className="text-sm text-mine-shaft-300 text-center line-clamp-2 px-1">
              {intern.desc}
            </div>

            {/* Openings */}
            <div className="text-bright-sun-400 font-medium text-sm">
              {intern.openings}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InternshipSection;
