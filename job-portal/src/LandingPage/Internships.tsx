import Marquee from "react-fast-marquee";
import { internshipCategory } from "../Data/Data";

const InternshipSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="text-4xl text-center font-bold mb-3 text-gray-900">
        Browse <span className="text-blue-600">Internships</span>
      </div>

      <div className="text-lg text-center mx-auto mb-10 text-gray-600 w-1/2">
        Discover the Internships that fit your career aspirations.
      </div>

      <Marquee speed={40} gradient={false} pauseOnHover={true} className="py-4">
        {internshipCategory.map((intern, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between
            bg-white w-64 h-72 
            border border-gray-200 rounded-xl 
            p-5 mx-4 shadow-md 
            transition duration-300 ease-in-out
            hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={intern.img}
              alt={intern.title}
              className="w-14 h-14 rounded-xl object-cover"
            />

            <div className="text-lg font-semibold text-gray-900 text-center">
              {intern.title}
            </div>

            <div className="text-sm text-gray-600 text-center line-clamp-2 px-1">
              {intern.desc}
            </div>

            <div className="text-blue-600 font-semibold text-sm">
              {intern.openings}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InternshipSection;