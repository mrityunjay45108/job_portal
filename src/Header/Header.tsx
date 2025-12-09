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




import { IconAnchor } from '@tabler/icons-react';
import { IconBellRinging } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { Avatar, Indicator } from '@mantine/core';  // ← Fixed: Combined import
// import { Avatar } from '@mantine/core';
import NavLinks from './NavLinks';


const Header = () => {
  return (
    <div className="w-full bg-[#2a2d2e] px-6 text-white h-20 flex justify-between items-center   ">
      <div className="flex items-center gap-1 text-bright-sun-400">
        <IconAnchor stroke={2.5} size={24} />
        <span className="text-xl font-bold">JobSeekers</span>
      </div>
      
      {NavLinks()}
      
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <span>Mrityunjay</span>
          <Avatar src="avatar2.png" alt="it's me" size="md" />
        </div>
        
        <IconSettings size={24} className="cursor-pointer hover:text-gray-300" />
        
        {/* Indicator wraps the bell icon */}
        <Indicator inline size={8} offset={6} position="top-end" color="red" processing>
          <IconBellRinging size={24} className="cursor-pointer hover:text-gray-300" />
        </Indicator>
      </div>
    </div>
  );
}
export default Header;