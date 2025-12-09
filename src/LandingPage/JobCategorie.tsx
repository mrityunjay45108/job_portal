import Marquee from "react-fast-marquee";
import { jobCategory } from "../Data/Data";

const JobCategorie = () => {
  return (
    <div className="mt-18 pb-5 bg-[#2a2d2e]">
      <div className="text-4xl text-center font-semibold mb-3 text-white">
        Browse <span className="text-bright-sun-400">JobCategory</span>
      </div>

      <div className="text-lg text-center mx-auto mb-10 text-mine-shaft-300 w-1/2">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      {/* Marquee sliding section */}
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={true}
        className="py-4"
      >
        {jobCategory.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-mine-shaft-900 w-64 gap-3 border border-mine-shaft-700 
            rounded-xl p-6 shadow-lg transition duration-300 ease-in-out
            hover:border-bright-sun-400 cursor-pointer mx-4"
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-14 h-14 mb-3 rounded-xl"
            />

            <div className="text-lg font-semibold text-white">
              {category.title}
            </div>

            <div className="text-sm text-mine-shaft-300 text-center">
              {category.desc}
            </div>

            <div className="text-bright-sun-400 font-medium text-sm mt-2">
              {category.jobs}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default JobCategorie;
