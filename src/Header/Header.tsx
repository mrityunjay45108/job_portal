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
import { Indicator, Burger, Drawer, Stack, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  return (
    <div className="w-full bg-[#2a2d2e] px-4 md:px-6 text-white h-20 flex justify-between items-center sticky top-0 z-50 shadow-md">
      
      {/* Left: Logo & Mobile Burger */}
      <div className="flex items-center gap-4">
        <Burger 
          opened={opened} 
          onClick={toggle} 
          hiddenFrom="md" 
          size="sm" 
          color="white" 
        />
        
        <Link
          to="/"
          className="flex items-center gap-1 text-bright-sun-400 no-underline cursor-pointer"
        >
          <IconAnchor stroke={2.5} size={24} />
          <span className="text-lg md:text-xl font-bold truncate">JobSeekers</span>
        </Link>
      </div>

      {/* Center: Desktop Navigation (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center">
        {NavLinks()}
      </div>

      {/* Right Section */}
      <div className="flex gap-3 md:gap-5 items-center">
        {/* Hidden on small mobile to keep header clean */}
        <div className="hidden sm:block">
          <IconSettings
            size={22}
            className="cursor-pointer hover:text-bright-sun-400 transition-colors"
          />
        </div>

        <Indicator
          inline
          size={8}
          offset={4}
          position="top-end"
          color="red"
          withBorder
          processing
        >
          <IconBellRinging
            size={22}
            className="cursor-pointer hover:text-bright-sun-400 transition-colors"
          />
        </Indicator>

        <ProfileMenu />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        opened={opened}
        onClose={close}
        size="75%"
        padding="md"
        title={
          <div className="flex items-center gap-1 text-bright-sun-400">
            <IconAnchor size={24} />
            <span className="font-bold">JobSeekers</span>
          </div>
        }
        styles={{
          content: { backgroundColor: '#2a2d2e', color: 'white' },
          header: { backgroundColor: '#2a2d2e', color: 'white' },
        }}
      >
        <Stack gap="lg" mt="xl">
          {/* Here you would pass 'close' to NavLinks to shut the drawer on click */}
          {NavLinks()}
          
          <Divider color="mineShaft.7" label="Account Settings" labelPosition="center" />
          
          <div className="flex justify-around items-center pt-4">
            <IconSettings size={28} className="text-mine-shaft-300" />
            <span className="text-sm">App Preferences</span>
          </div>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Header;