import { Menu, Avatar, Switch, Divider, Skeleton } from "@mantine/core";
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconLogout2,
  IconHeart,
  IconSettings,
  IconBriefcase,
} from "@tabler/icons-react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../context/AuthContext";

const ProfileMenu = () => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notifications.show({
      title: 'Logged Out',
      message: 'You have been successfully logged out',
      color: 'blue',
    });
    navigate('/');
  };

  const handleThemeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    notifications.show({
      title: 'Theme Changed',
      message: event.currentTarget.checked ? 'Dark mode enabled' : 'Light mode enabled',
      color: 'blue',
    });
  };

  // Don't show if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton height={20} width={80} radius="md" />
        <Skeleton height={40} width={40} circle />
      </div>
    );
  }

  const displayName = user?.fullName || "User";
  const userEmail = user?.email || "";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <Menu shadow="md" width={260} opened={opened} onChange={setOpened} position="bottom-end">
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors hidden sm:block">
            {displayName.split(' ')[0]}
          </span>
          <Avatar 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=ffffff&bold=true`}
            alt="profile" 
            size="md" 
            radius="xl"
            className="border-2 border-gray-200 group-hover:border-blue-400 transition-all"
          >
            {firstLetter}
          </Avatar>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="mt-2">
        {/* User Info Header */}
        <div className="px-3 py-2 border-b border-gray-100 mb-1">
          <div className="flex items-center gap-3">
            <Avatar 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3b82f6&color=ffffff&bold=true`}
              size="md" 
              radius="xl"
            >
              {firstLetter}
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{displayName}</div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
          </div>
        </div>

        {/* Role Badge */}
        {user?.role && (
          <div className="px-3 pb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              user.role === 'recruiter' 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {user.role === 'recruiter' ? '👔 Recruiter' : '🎯 Candidate'}
            </span>
          </div>
        )}

        <Menu.Item
          component={Link}
          to={user?.role === 'recruiter' ? "/Recruiter-Dashboard" : "/candidate-dashboard"}
          leftSection={<IconUserCircle size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          component={Link}
          to="/my-applications"
          leftSection={<IconBriefcase size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
        >
          My Applications
        </Menu.Item>

        <Menu.Item
          leftSection={<IconMessageCircle size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
          rightSection={
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
          }
        >
          Messages
        </Menu.Item>

        <Menu.Item
          component={Link}
          to="/resume"
          leftSection={<IconFileText size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
        >
          My Resume
        </Menu.Item>

        <Menu.Item
          component={Link}
          to="/saved-jobs"
          leftSection={<IconHeart size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
        >
          Saved Jobs
        </Menu.Item>

        <Divider className="my-1" />

        <Menu.Item
          component={Link}
          to="/settings"
          leftSection={<IconSettings size={18} className="text-gray-500" />}
          className="hover:bg-blue-50"
        >
          Settings
        </Menu.Item>

        <Menu.Item
          leftSection={!checked ? <MoonIcon size={16} className="text-gray-500" /> : <SunIcon size={16} className="text-yellow-500" />}
          rightSection={
            <Switch
              checked={checked}
              onChange={handleThemeToggle}
              size="sm"
              onLabel={<SunIcon size={12} />}
              offLabel={<MoonIcon size={12} />}
              color="blue"
            />
          }
          className="hover:bg-blue-50"
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={18} />}
          onClick={handleLogout}
          className="hover:bg-red-50"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;