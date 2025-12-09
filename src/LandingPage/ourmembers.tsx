import React from "react";

const OurNumbersSection = () => {
  const stats = [
    { number: "7 M+", label: "Active Users" },
    { number: "2 M+", label: "Assessments" },
    { number: "130 K+", label: "Opportunities" },
    { number: "20 +", label: "Brands trust us" },
    { number: "1 K+", label: "Organisations" },
    { number: "3 +", label: "Countries" },
  ];

  return (
    <section className="py-6 bg-[#2a2d2e]  font-sans ">
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#3b82f6_0%,_transparent_70%)] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12">
          Our <span className="text-yellow-400">Numbers</span>
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#1f2122]/80 backdrop-blur-md p-6 rounded-2xl text-center flex flex-col justify-center items-center h-full 
              shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-4xl font-extrabold text-white mb-1">
                {stat.number.split(" ")[0]}{" "}
                <span className="text-blue-400">{stat.number.split(" ")[1]}</span>
              </p>
              <p className="text-sm text-gray-300 font-medium tracking-wide mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurNumbersSection;
