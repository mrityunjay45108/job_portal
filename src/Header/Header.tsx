// ------------ this code have alignment error-----------

// import { IconBriefcase } from "@tabler/icons-react";
// import { IconBellRinging } from '@tabler/icons-react';
// import { IconSettings } from '@tabler/icons-react';
// import { Avatar } from '@mantine/core';

// const Header = () => {
//   return (
//     <div className="w-full bg-black px-6 text-white h-28 flex justify-between items-center">
//       <div className="flex items-center gap-3">
//         <IconBriefcase size={24} />
//         <span>logo</span>
//       </div>
//       <div className="flex gap-3">
//        <a href="">Find Jobs</a>
//        <a href="">Find Talent</a>
//        <a href="">Upload jobs</a>
//        <a href="">About us</a>
//       </div>
//       <div className="flex gap-3 items-center">
//       <IconBellRinging/>
//       <div>
//         <div className="flex  items-center "> Mrityunjay</div>
//           <Avatar src="avatar.png" alt="it's me" />
//       </div>
//       <IconSettings/>
//       </div>
//     </div>
//   );
// }
// export default Header;

import { IconAnchor, IconBellRinging, IconSettings } from "@tabler/icons-react";
import { Indicator } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const location = useLocation();

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full bg-[#2a2d2e] px-6 text-white h-20 flex justify-between items-center relative">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-1 text-bright-sun-400 no-underline cursor-pointer relative z-10"
      >
        <IconAnchor stroke={2.5} size={24} />
        <span className="text-xl font-bold">JobSeekers</span>
      </Link>

      {/* Navigation - Wrapped in a div to prevent overlapping */}
      <div className="flex-1 flex justify-center">
        {NavLinks()}
      </div>

      {/* Right Section */}
      <div className="flex gap-5 items-center relative z-20">
        <ProfileMenu />

        <IconSettings
          size={24}
          className="cursor-pointer hover:text-bright-sun-400 transition-colors"
        />

        <Indicator
          inline
          size={9}
          offset={5}
          position="top-end"
          color="red"
          withBorder
          processing
        >
          <IconBellRinging
            size={24}
            className="cursor-pointer hover:text-bright-sun-400 transition-colors"
          />
        </Indicator>
      </div>
    </div>
  );
};

export default Header;