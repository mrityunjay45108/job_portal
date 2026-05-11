// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   AppShell,
//   Group,
//   Text,
//   Avatar,
//   Menu,
//   Button,
//   ActionIcon,
//   Indicator,
//   Badge,
//   Drawer,
//   Stack,
//   Divider,
//   Box,
// } from '@mantine/core';
// import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import {
//   IconBell,
//   IconSettings,
//   IconLogout,
//   IconUser,
//   IconShield,
//   IconMenu2,
//   IconDashboard,
//   IconUsers,
//   IconBriefcase,
//   IconFileText,
//   IconChartBar,
//   IconCalendar,      // ✅ Added for Interviews
//   IconBuilding,      // ✅ Added for Companies
//   IconShieldLock,    // ✅ Added for Admins
//   IconReportAnalytics, // ✅ Added for Reports
//   IconDeviceDesktop,  // ✅ Added for System Stats
//   IconHome,          // ✅ Added for Home
//   IconHelp,          // ✅ Added for Help
// } from '@tabler/icons-react';
// import { notifications } from '@mantine/notifications';

// interface AdminHeaderProps {
//   title?: string;
// }

// const AdminHeader = ({ title = "Admin Dashboard" }: AdminHeaderProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [opened, { toggle, close }] = useDisclosure(false);
//   const isMobile = useMediaQuery('(max-width: 768px)');
  
//   const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminData');
//     notifications.show({
//       title: 'Logged Out',
//       message: 'You have been logged out successfully',
//       color: 'green',
//     });
//     navigate('/admin/login');
//   };

//   // ✅ Complete Navigation Items
//   const navItems = [
//     { to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
//     { to: '/admin/candidates', label: 'Candidates', icon: IconUsers },
//     { to: '/admin/recruiters', label: 'Recruiters', icon: IconUsers },
//     { to: '/admin/jobs', label: 'Jobs', icon: IconBriefcase },
//     { to: '/admin/applications', label: 'Applications', icon: IconFileText },
//     { to: '/admin/interviews', label: 'Interviews', icon: IconCalendar },
//     { to: '/admin/companies', label: 'Companies', icon: IconBuilding },
//     { to: '/admin/admins', label: 'Admins', icon: IconShieldLock },
//     { to: '/admin/reports', label: 'Reports', icon: IconChartBar },
//     { to: '/admin/system-stats', label: 'System Stats', icon: IconDeviceDesktop },
//   ];

//   const MobileMenu = () => (
//     <Drawer
//       opened={opened}
//       onClose={close}
//       title="Admin Menu"
//       padding="md"
//       size="75%"
//     >
//       <Stack gap="md">
//         {navItems.map((item) => (
//           <Button
//             key={item.to}
//             variant="subtle"
//             leftSection={<item.icon size={18} />}
//             onClick={() => {
//               navigate(item.to);
//               close();
//             }}
//             fullWidth
//             justify="flex-start"
//             className={location.pathname === item.to ? 'bg-blue-50 text-blue-600' : ''}
//           >
//             {item.label}
//           </Button>
//         ))}
//         <Divider />
//         <Button
//           variant="subtle"
//           color="red"
//           leftSection={<IconLogout size={18} />}
//           onClick={handleLogout}
//           fullWidth
//           justify="flex-start"
//         >
//           Logout
//         </Button>
//       </Stack>
//     </Drawer>
//   );

//   return (
//     <>
//       <AppShell.Header className="bg-white border-b border-gray-200 px-4 md:px-6">
//         <div className="flex items-center justify-between h-full">
//           {/* Left Section */}
//           <div className="flex items-center gap-3 md:gap-4">
//             {isMobile && (
//               <ActionIcon onClick={toggle} variant="subtle" size="lg">
//                 <IconMenu2 size={20} />
//               </ActionIcon>
//             )}
            
//             <div 
//               className="flex items-center gap-2 cursor-pointer" 
//               onClick={() => navigate('/admin/dashboard')}
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <IconShield size={18} className="text-white" />
//               </div>
//               <div className="hidden sm:block">
//                 <Text fw={700} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   JobPortal Admin
//                 </Text>
//                 <Text size="xs" className="text-gray-500">
//                   {title}
//                 </Text>
//               </div>
//             </div>
//           </div>

//           {/* Center Section - Desktop Navigation */}
//           {!isMobile && (
//             <div className="flex items-center gap-1 overflow-x-auto max-w-[50%]">
//               {navItems.map((item) => (
//                 <Button
//                   key={item.to}
//                   variant={location.pathname === item.to ? "light" : "subtle"}
//                   size="sm"
//                   leftSection={<item.icon size={16} />}
//                   onClick={() => navigate(item.to)}
//                   color={location.pathname === item.to ? "blue" : "gray"}
//                   className="whitespace-nowrap"
//                 >
//                   {item.label}
//                 </Button>
//               ))}
//             </div>
//           )}

//           {/* Right Section */}
//           <div className="flex items-center gap-2 md:gap-3">
//             {/* Notifications */}
//             <Indicator inline size={10} offset={4} position="top-end" color="red" withBorder>
//               <ActionIcon variant="subtle" size="lg">
//                 <IconBell size={20} className="text-gray-600" />
//               </ActionIcon>
//             </Indicator>

//             {/* Admin Profile Menu */}
//             <Menu shadow="md" width={280} position="bottom-end">
//               <Menu.Target>
//                 <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
//                   <Avatar size={36} radius="xl" color="blue" className="border-2 border-blue-100">
//                     {adminData.fullName?.charAt(0)?.toUpperCase() || 'A'}
//                   </Avatar>
//                   <div className="hidden lg:block">
//                     <Text size="sm" fw={600} className="text-gray-800">
//                       {adminData.fullName || 'Admin'}
//                     </Text>
//                     <Badge size="xs" color="blue" variant="light">
//                       {adminData.role?.toUpperCase() || 'ADMIN'}
//                     </Badge>
//                   </div>
//                 </div>
//               </Menu.Target>

//               <Menu.Dropdown>
//                 <Menu.Label>
//                   <div className="px-1 py-1">
//                     <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider">
//                       {adminData.fullName || 'Admin User'}
//                     </Text>
//                     <Text size="xs" className="text-gray-400">{adminData.email}</Text>
//                   </div>
//                 </Menu.Label>
                
//                 <Menu.Divider />
                
//                 <Menu.Item 
//                   leftSection={<IconUser size={16} />}
//                   onClick={() => navigate('/admin/profile')}
//                 >
//                   My Profile
//                 </Menu.Item>
//                 <Menu.Item 
//                   leftSection={<IconSettings size={16} />}
//                   onClick={() => navigate('/admin/settings')}
//                 >
//                   Settings
//                 </Menu.Item>
                
//                 <Menu.Divider />
                
//                 <Menu.Item 
//                   leftSection={<IconHome size={16} />}
//                   onClick={() => navigate('/')}
//                 >
//                   Back to Homepage
//                 </Menu.Item>
                
//                 <Menu.Divider />
                
//                 <Menu.Item 
//                   leftSection={<IconLogout size={16} />}
//                   color="red"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Menu.Item>
//               </Menu.Dropdown>
//             </Menu>
//           </div>
//         </div>
//       </AppShell.Header>

//       <MobileMenu />
//     </>
//   );
// };

// export default AdminHeader;


// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   AppShell,
//   Group,
//   Text,
//   Avatar,
//   Menu,
//   Button,
//   ActionIcon,
//   Indicator,
//   Badge,
//   Drawer,
//   Stack,
//   Divider,
//   Box,
// } from '@mantine/core';
// import { useDisclosure, useMediaQuery } from '@mantine/hooks';
// import {
//   IconBell,
//   IconSettings,
//   IconLogout,
//   IconUser,
//   IconShield,
//   IconMenu2,
//   IconDashboard,
//   IconUsers,
//   IconBriefcase,
//   IconFileText,
//   IconChartBar,
//   IconCalendar,      // ✅ Add for Interviews
//   IconBuilding,      // ✅ Add for Companies
//   IconShieldLock,    // ✅ Add for Admins
//   IconDeviceDesktop, // ✅ Add for System Stats
// } from '@tabler/icons-react';
// import { notifications } from '@mantine/notifications';

// interface AdminHeaderProps {
//   title?: string;
// }

// const AdminHeader = ({ title = "Admin Dashboard" }: AdminHeaderProps) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [opened, { toggle, close }] = useDisclosure(false);
//   const isMobile = useMediaQuery('(max-width: 768px)');
  
//   const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('adminData');
//     notifications.show({
//       title: 'Logged Out',
//       message: 'You have been logged out successfully',
//       color: 'green',
//     });
//     navigate('/admin/login');
//   };

//   // ✅ Complete navigation items
//   const navItems = [
//     { to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard },
//     { to: '/admin/candidates', label: 'Candidates', icon: IconUsers },
//     { to: '/admin/recruiters', label: 'Recruiters', icon: IconUsers },
//     { to: '/admin/jobs', label: 'Jobs', icon: IconBriefcase },
//     { to: '/admin/applications', label: 'Applications', icon: IconFileText },
//     { to: '/admin/interviews', label: 'Interviews', icon: IconCalendar },
//     { to: '/admin/companies', label: 'Companies', icon: IconBuilding },
//     { to: '/admin/admins', label: 'Admins', icon: IconShieldLock },
//     { to: '/admin/reports', label: 'Reports', icon: IconChartBar },
//     { to: '/admin/system-stats', label: 'System Stats', icon: IconDeviceDesktop },
//   ];

//   const MobileMenu = () => (
//     <Drawer
//       opened={opened}
//       onClose={close}
//       title="Admin Menu"
//       padding="md"
//       size="75%"
//     >
//       <Stack gap="md">
//         {navItems.map((item) => (
//           <Button
//             key={item.to}
//             variant="subtle"
//             leftSection={<item.icon size={18} />}
//             onClick={() => {
//               navigate(item.to);
//               close();
//             }}
//             fullWidth
//             justify="flex-start"
//             className={location.pathname === item.to ? 'bg-blue-50 text-blue-600' : ''}
//           >
//             {item.label}
//           </Button>
//         ))}
//         <Divider />
//         <Button
//           variant="subtle"
//           color="red"
//           leftSection={<IconLogout size={18} />}
//           onClick={handleLogout}
//           fullWidth
//           justify="flex-start"
//         >
//           Logout
//         </Button>
//       </Stack>
//     </Drawer>
//   );

//   return (
//     <>
//       <AppShell.Header className="bg-white border-b border-gray-200 px-4 md:px-6">
//         <div className="flex items-center justify-between h-full">
//           {/* Left Section */}
//           <div className="flex items-center gap-3 md:gap-4">
//             {isMobile && (
//               <ActionIcon onClick={toggle} variant="subtle" size="lg">
//                 <IconMenu2 size={20} />
//               </ActionIcon>
//             )}
            
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <IconShield size={18} className="text-white" />
//               </div>
//               <div className="hidden sm:block">
//                 <Text fw={700} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   JobPortal Admin
//                 </Text>
//                 <Text size="xs" className="text-gray-500">
//                   {title}
//                 </Text>
//               </div>
//             </div>
//           </div>

//           {/* Center Section - Desktop Navigation */}
//           {!isMobile && (
//             <div className="flex items-center gap-1 overflow-x-auto max-w-[55%]">
//               {navItems.map((item) => (
//                 <Button
//                   key={item.to}
//                   variant={location.pathname === item.to ? "light" : "subtle"}
//                   size="sm"
//                   leftSection={<item.icon size={16} />}
//                   onClick={() => navigate(item.to)}
//                   color={location.pathname === item.to ? "blue" : "gray"}
//                   className="whitespace-nowrap"
//                 >
//                   {item.label}
//                 </Button>
//               ))}
//             </div>
//           )}

//           {/* Right Section */}
//           <div className="flex items-center gap-2 md:gap-3">
//             {/* Notifications */}
//             <Indicator inline size={10} offset={4} position="top-end" color="red" withBorder>
//               <ActionIcon variant="subtle" size="lg">
//                 <IconBell size={20} className="text-gray-600" />
//               </ActionIcon>
//             </Indicator>

//             {/* Admin Profile Menu */}
//             <Menu shadow="md" width={260} position="bottom-end">
//               <Menu.Target>
//                 <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
//                   <Avatar size={36} radius="xl" color="blue" className="border-2 border-blue-100">
//                     {adminData.fullName?.charAt(0)?.toUpperCase() || 'A'}
//                   </Avatar>
//                   <div className="hidden lg:block">
//                     <Text size="sm" fw={600} className="text-gray-800">
//                       {adminData.fullName || 'Admin'}
//                     </Text>
//                     <Badge size="xs" color="blue" variant="light">
//                       {adminData.role?.toUpperCase() || 'ADMIN'}
//                     </Badge>
//                   </div>
//                 </div>
//               </Menu.Target>

//               <Menu.Dropdown>
//                 <Menu.Label>
//                   <div className="px-1 py-1">
//                     <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider">
//                       {adminData.fullName || 'Admin User'}
//                     </Text>
//                     <Text size="xs" className="text-gray-400">{adminData.email}</Text>
//                   </div>
//                 </Menu.Label>
                
//                 <Menu.Divider />
                
//                 <Menu.Item 
//                   leftSection={<IconUser size={16} />}
//                   onClick={() => navigate('/admin/profile')}
//                 >
//                   My Profile
//                 </Menu.Item>
//                 <Menu.Item 
//                   leftSection={<IconSettings size={16} />}
//                   onClick={() => navigate('/admin/settings')}
//                 >
//                   Settings
//                 </Menu.Item>
                
//                 <Menu.Divider />
                
//                 <Menu.Item 
//                   leftSection={<IconLogout size={16} />}
//                   color="red"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Menu.Item>
//               </Menu.Dropdown>
//             </Menu>
//           </div>
//         </div>
//       </AppShell.Header>

//       <MobileMenu />
//     </>
//   );
// };

// export default AdminHeader;




import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Group,
  Text,
  Avatar,
  Menu,
  Button,
  ActionIcon,
  Indicator,
  Badge,
  Drawer,
  Stack,
  Divider,
  Box,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconBell,
  IconSettings,
  IconLogout,
  IconUser,
  IconShield,
  IconMenu2,
  IconDashboard,
  IconUsers,
  IconBriefcase,
  IconFileText,
  IconChartBar,
  IconCalendar,
  IconBuilding,
  IconShieldLock,
  IconDeviceDesktop,
  IconHome,
  IconHelp,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface AdminHeaderProps {
  title?: string;
}

const AdminHeader = ({ title = "Admin Dashboard" }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  
  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    notifications.show({
      title: 'Logged Out',
      message: 'You have been logged out successfully',
      color: 'green',
    });
    navigate('/admin/login');
  };

  // ✅ Complete navigation items with icons
  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard, description: 'Overview & Stats' },
    { to: '/admin/candidates', label: 'Candidates', icon: IconUsers, description: 'Manage job seekers' },
    { to: '/admin/recruiters', label: 'Recruiters', icon: IconUsers, description: 'Manage employers' },
    { to: '/admin/jobs', label: 'Jobs', icon: IconBriefcase, description: 'All job postings' },
    { to: '/admin/applications', label: 'Applications', icon: IconFileText, description: 'Job applications' },
    { to: '/admin/interviews', label: 'Interviews', icon: IconCalendar, description: 'Scheduled interviews' },
    { to: '/admin/companies', label: 'Companies', icon: IconBuilding, description: 'Registered companies' },
    { to: '/admin/admins', label: 'Admins', icon: IconShieldLock, description: 'System administrators' },
    { to: '/admin/reports', label: 'Reports', icon: IconChartBar, description: 'Analytics & reports' },
    { to: '/admin/system-stats', label: 'System Stats', icon: IconDeviceDesktop, description: 'Server health' },
  ];

  // Get visible nav items based on screen size
  const getVisibleNavItems = () => {
    if (isMobile) return navItems.slice(0, 4);
    if (isTablet) return navItems.slice(0, 6);
    return navItems;
  };

  const MobileMenu = () => (
    <Drawer
      opened={opened}
      onClose={close}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <IconShield size={18} className="text-white" />
          </div>
          <Text fw={700} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Menu
          </Text>
        </div>
      }
      padding="md"
      size="80%"
    >
      <Stack gap="sm">
        {navItems.map((item) => (
          <Button
            key={item.to}
            variant={location.pathname === item.to ? "filled" : "subtle"}
            color={location.pathname === item.to ? "blue" : "gray"}
            leftSection={<item.icon size={20} />}
            onClick={() => {
              navigate(item.to);
              close();
            }}
            fullWidth
            justify="flex-start"
            className="h-12"
          >
            <div className="flex flex-col items-start">
              <Text size="sm" fw={500}>{item.label}</Text>
              <Text size="xs" c="dimmed">{item.description}</Text>
            </div>
          </Button>
        ))}
        <Divider className="my-3" />
        <Button
          variant="subtle"
          color="red"
          leftSection={<IconLogout size={20} />}
          onClick={handleLogout}
          fullWidth
          justify="flex-start"
          className="h-12"
        >
          Logout
        </Button>
      </Stack>
    </Drawer>
  );

  return (
    <>
      <AppShell.Header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-full px-3 md:px-6">
          
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {isMobile && (
              <ActionIcon onClick={toggle} variant="subtle" size="lg" aria-label="Menu">
                <IconMenu2 size={22} />
              </ActionIcon>
            )}
            
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/admin/dashboard')}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <IconShield size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <Text fw={700} size="md" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  JobPortal Admin
                </Text>
                <Text size="xs" className="text-gray-500">
                  {title}
                </Text>
              </div>
            </div>
          </div>

          {/* Center Section - Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-0.5 overflow-x-auto custom-scrollbar px-2">
              {getVisibleNavItems().map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Tooltip
                    key={item.to}
                    label={item.description}
                    position="bottom"
                    withArrow
                    openDelay={500}
                  >
                    <Button
                      variant={isActive ? "light" : "subtle"}
                      size="sm"
                      leftSection={<item.icon size={18} />}
                      onClick={() => navigate(item.to)}
                      color={isActive ? "blue" : "gray"}
                      className={`whitespace-nowrap transition-all duration-200 ${
                        isActive ? 'bg-blue-50' : 'hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Tooltip>
                );
              })}
              
              {/* Show "More" dropdown if needed */}
              {!isTablet && navItems.length > getVisibleNavItems().length && (
                <Menu shadow="md" width={200} position="bottom-start">
                  <Menu.Target>
                    <Button variant="subtle" size="sm">
                      More...
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {navItems.slice(getVisibleNavItems().length).map((item) => (
                      <Menu.Item
                        key={item.to}
                        leftSection={<item.icon size={16} />}
                        onClick={() => navigate(item.to)}
                      >
                        {item.label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Dark Mode Toggle - Optional */}
            <Tooltip label={darkMode ? "Light Mode" : "Dark Mode"} position="bottom">
              <ActionIcon 
                variant="subtle" 
                size="lg"
                onClick={() => setDarkMode(!darkMode)}
                className="hidden md:flex"
              >
                {darkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Tooltip>

            {/* Help Button */}
            <Tooltip label="Help & Support" position="bottom">
              <ActionIcon 
                variant="subtle" 
                size="lg"
                onClick={() => window.open('/help', '_blank')}
                className="hidden md:flex"
              >
                <IconHelp size={20} className="text-gray-600" />
              </ActionIcon>
            </Tooltip>

            {/* Notifications */}
            <Tooltip label="Notifications" position="bottom">
              <Indicator inline size={10} offset={5} position="top-end" color="red" withBorder>
                <ActionIcon variant="subtle" size="lg" onClick={() => notifications.show({
                  title: 'No New Notifications',
                  message: 'You have no unread notifications',
                  color: 'blue',
                })}>
                  <IconBell size={20} className="text-gray-600" />
                </ActionIcon>
              </Indicator>
            </Tooltip>

            {/* Admin Profile Menu */}
            <Menu shadow="md" width={280} position="bottom-end" withArrow>
              <Menu.Target>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-all duration-200">
                  <Avatar 
                    size={36} 
                    radius="xl" 
                    color="blue" 
                    className="border-2 border-blue-100 shadow-sm"
                  >
                    {adminData.fullName?.charAt(0)?.toUpperCase() || 'A'}
                  </Avatar>
                  <div className="hidden lg:block">
                    <Text size="sm" fw={600} className="text-gray-800">
                      {adminData.fullName || 'Admin'}
                    </Text>
                    <Badge size="xs" color="blue" variant="light" className="mt-0.5">
                      {adminData.role?.toUpperCase() || 'ADMIN'}
                    </Badge>
                  </div>
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <div className="px-2 py-1">
                    <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider">
                      {adminData.fullName || 'Admin User'}
                    </Text>
                    <Text size="xs" className="text-gray-400 mt-0.5">{adminData.email}</Text>
                  </div>
                </Menu.Label>
                
                <Menu.Divider />
                
                <Menu.Item 
                  leftSection={<IconUser size={16} />}
                  onClick={() => navigate('/admin/profile')}
                >
                  My Profile
                </Menu.Item>
                <Menu.Item 
                  leftSection={<IconSettings size={16} />}
                  onClick={() => navigate('/admin/settings')}
                >
                  Settings
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Item 
                  leftSection={<IconHome size={16} />}
                  onClick={() => navigate('/')}
                >
                  Back to Homepage
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Item 
                  leftSection={<IconLogout size={16} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </AppShell.Header>

      <MobileMenu />

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};

export default AdminHeader;