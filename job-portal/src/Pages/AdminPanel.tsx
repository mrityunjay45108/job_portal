import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  ScrollArea,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  Box,
  Burger,
  Divider,
  Avatar,
  Menu,
  Badge,
  Indicator,
  ActionIcon,
  Stack,
  Drawer,
  Container,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconDashboard,
  IconUsers,
  IconBriefcase,
  IconFileText,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconShield,
  IconBell,
  IconMenu2,
  IconUserCheck,
  IconCalendar,
  IconBuilding,
  IconShieldLock,
  IconDeviceDesktop,
  IconHome,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem = ({ icon, label, active, onClick, collapsed }: NavItemProps) => (
  <Tooltip label={collapsed ? label : ''} position="right" withArrow>
    <UnstyledButton
      onClick={onClick}
      className={`w-full px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <ThemeIcon size={28} variant={active ? 'filled' : 'light'} color={active ? 'white' : 'blue'}>
        {icon}
      </ThemeIcon>
      {!collapsed && (
        <Text size="sm" fw={500} className="flex-1">
          {label}
        </Text>
      )}
    </UnstyledButton>
  </Tooltip>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { toggle, close }] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);

  //  Correct way: useEffect instead of useState
  useEffect(() => {
    const data = localStorage.getItem('adminData');
    if (data) {
      setAdminData(JSON.parse(data));
    }
  }, []);

  const navItems = [
    { icon: <IconDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <IconUsers size={20} />, label: 'Candidates', path: '/admin/candidates' },
    { icon: <IconUserCheck size={20} />, label: 'Recruiters', path: '/admin/recruiters' },
    { icon: <IconBriefcase size={20} />, label: 'Jobs', path: '/admin/jobs' },
    { icon: <IconFileText size={20} />, label: 'Applications', path: '/admin/applications' },
    { icon: <IconCalendar size={20} />, label: 'Interviews', path: '/admin/interviews' },
    { icon: <IconBuilding size={20} />, label: 'Companies', path: '/admin/companies' },
    { icon: <IconShieldLock size={20} />, label: 'Admins', path: '/admin/admins' },
    { icon: <IconChartBar size={20} />, label: 'Reports', path: '/admin/reports' },
    { icon: <IconDeviceDesktop size={20} />, label: 'System Stats', path: '/admin/system-stats' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) close();
  };

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

  const MobileDrawer = () => (
    <Drawer
      opened={opened}
      onClose={close}
      title={
        <div className="flex items-center gap-2">
          <IconShield size={24} className="text-blue-600" />
          <Text fw={700} size="lg">Admin Menu</Text>
        </div>
      }
      padding="md"
      size="280px"
    >
      <Stack gap="sm">
        {navItems.map((item) => (
          <UnstyledButton
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`w-full px-3 py-2 rounded-lg transition-all flex items-center gap-3 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ThemeIcon size={28} variant={location.pathname === item.path ? 'filled' : 'light'} color={location.pathname === item.path ? 'white' : 'blue'}>
              {item.icon}
            </ThemeIcon>
            <Text size="sm" fw={500}>{item.label}</Text>
          </UnstyledButton>
        ))}
        
        <Divider my="md" />
        
        <UnstyledButton
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg transition-all flex items-center gap-3 text-red-600 hover:bg-red-50"
        >
          <ThemeIcon size={28} variant="light" color="red">
            <IconLogout size={20} />
          </ThemeIcon>
          <Text size="sm" fw={500}>Logout</Text>
        </UnstyledButton>
      </Stack>
    </Drawer>
  );

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: sidebarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Burger opened={opened} onClick={toggle} size="sm" />
            )}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>
              <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <IconShield size={20} className="text-white" />
              </div>
              {!isMobile && (
                <div>
                  <Text fw={700} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    JobPortal Admin
                  </Text>
                  <Text size="xs" className="text-gray-500">
                    Control Panel
                  </Text>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Collapse Button - Desktop only */}
            {!isMobile && (
              <ActionIcon 
                variant="subtle" 
                size="lg" 
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex"
              >
                <IconMenu2 size={20} />
              </ActionIcon>
            )}

            <Indicator inline size={10} offset={4} position="top-end" color="red" withBorder>
              <ActionIcon variant="subtle" size="lg">
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>

            <Menu shadow="md" width={260} position="bottom-end">
              <Menu.Target>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                  <Avatar size={36} radius="xl" color="blue" className="border-2 border-blue-100">
                    {adminData?.fullName?.charAt(0)?.toUpperCase() || 'A'}
                  </Avatar>
                  {!isMobile && (
                    <div className="hidden lg:block">
                      <Text size="sm" fw={600}>{adminData?.fullName || 'Admin'}</Text>
                      <Badge size="xs" color="blue" variant="light">
                        {adminData?.role?.toUpperCase() || 'ADMIN'}
                      </Badge>
                    </div>
                  )}
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>
                  <Text size="xs" className="text-gray-500">{adminData?.email}</Text>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item leftSection={<IconSettings size={16} />} onClick={() => handleNavigation('/admin/settings')}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconHome size={16} />} onClick={() => navigate('/')}>
                  Back to Homepage
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </AppShell.Header>

      {/* Desktop Navbar */}
      {!isMobile && (
        <AppShell.Navbar className="bg-white border-r border-gray-200 shadow-sm" p="md">
          <AppShell.Section grow component={ScrollArea}>
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  active={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </AppShell.Section>
          
          <AppShell.Section>
            <Divider my="md" />
            <NavItem
              icon={<IconLogout size={20} />}
              label="Logout"
              path="#"
              active={false}
              onClick={handleLogout}
              collapsed={collapsed}
            />
          </AppShell.Section>
        </AppShell.Navbar>
      )}

      {/* Main Content */}
      <AppShell.Main className="bg-gray-50" style={{ paddingTop: 70 }}>
        <Container size="xl" className="py-4 md:py-6 px-3 md:px-4">
          <Outlet />
        </Container>
      </AppShell.Main>

      <MobileDrawer />
    </AppShell>
  );
};

export default AdminPanel;