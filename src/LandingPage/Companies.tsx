
import React from "react";
import Marquee from "react-fast-marquee";
const companyList = [
  "Google",
  "figma",
  "Netflix",
  "meta",
  // "microsoft",
  "Pintrest",
  "slack",
  "spotify",
  "Oracal",
  "tcs",
  // "Infosys",
  // "Wipro",
  "Amazon",
];

const Companies = () => {
  return (
    <div className="mt-19 pb-5">
      <div className="text-center mb-10 text-4xl font-semibold text-mine-shaft-100 bg-[#2a2d2e]">
        Trusted By <span className="text-bright-sun-400">1000+</span> Companies
      </div>

      <Marquee>
        <div className="flex items-center">
          {companyList.map((company, index) => (
            <div
              key={index}
              className="mx-8 px-2 py-1 hover:bg-mine-shaft-900 rounded-xl"
            >
              <img
                className="h-14 rounded-xl "
                src={`/Companies/${company}.png`}
                alt={company}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Companies;




