// import MultiSelectCreatable from "./Multiinputs";
// import { dropdownData } from "../Data/JobsData";

// const SearchBar = () => {
//   return (
//     <div className="flex justify-between">
//       <div className="flex gap-16">
//         {dropdownData.map((item, index) => (
//           <div key={index} className="w-1/5">
//             <MultiSelectCreatable />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;


// import MultiSelectCreatable from "./Multiinputs";
// import { jobTitles, locations } from "../Data/JobData";

// const SearchBar = () => {
//   return (
//     <div className="flex gap-6 flex-wrap">
//       <MultiSelectCreatable
//         options={jobTitles}
//         placeholder="Job Title"
//       />

//       <MultiSelectCreatable
//         options={locations}
//         placeholder="Location"
//       />
//     </div>
//   );
// };

// export default SearchBar;
import { useState } from "react";
import { Slider } from "@mantine/core";
import {
  IconSearch,
  IconMapPin,
  IconBriefcase,
  IconRecharging,
  IconCurrencyRupee,
} from "@tabler/icons-react";

import MultiSelectCreatable from "./Multiinputs";
import {
  jobTitles,
  locations,
  experiences,
  jobTypes,
} from "../Data/JobsData";

const SearchBar = () => {
  const [salary, setSalary] = useState(50);

  return (
    <div className="flex items-center gap-4 px-4 py-4 w-full">
      
      {/* LEFT FILTERS */}
      <MultiSelectCreatable
        options={jobTitles}
        placeholder="Job Title"
        icon={IconSearch}
      />

      <MultiSelectCreatable
        options={locations}
        placeholder="Location"
        icon={IconMapPin}
      />

      <MultiSelectCreatable
        options={experiences}
        placeholder="Experience"
        icon={IconBriefcase}
      />

      <MultiSelectCreatable
        options={jobTypes}
        placeholder="Job Type"
        icon={IconRecharging}
      />

      {/* 👉 PUSH SALARY TO RIGHT */}
      <div
        className="
          ml-auto
          flex items-center gap-3
          h-[42px] px-4
          border border-yellow-400
          rounded-full
        "
      >
        <IconCurrencyRupee size={16} className="text-yellow-400" />

        <span className="text-sm text-yellow-400 whitespace-nowrap">
          Salary
        </span>

        <Slider
          value={salary}
          onChange={setSalary}
          min={0}
          max={100}
          
          label={(value) => `${value} LPA`}
          color="yellow"
          styles={{
            root: { width: 120 },
            track: { height: 4 },
            bar: { height: 4 },
            thumb: { height: 12, width: 12 },
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
