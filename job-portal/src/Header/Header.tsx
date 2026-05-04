import { IconBriefcase, IconBellRinging, IconSettings, IconLogin, IconUserPlus } from "@tabler/icons-react";
import { Indicator, Burger, Drawer, Stack, Divider, Button, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { isAuthenticated, loading } = useAuth();

  // Don't show header on auth pages
  const isAuthPage = location.pathname === "/signup" || 
                     location.pathname === "/login" || 
                     location.pathname === "/SignUp" || 
                     location.pathname === "/Login";
  
  if (isAuthPage) {
    return null;
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Skeleton height={32} width={32} circle />
          <Skeleton height={28} width={120} radius="md" />
        </div>
        <div className="hidden md:flex gap-4">
          <Skeleton height={20} width={60} radius="md" />
          <Skeleton height={20} width={60} radius="md" />
          <Skeleton height={20} width={60} radius="md" />
        </div>
        <div className="flex gap-3">
          <Skeleton height={36} width={70} radius="xl" />
          <Skeleton height={36} width={70} radius="xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      
      {/* Left: Logo & Mobile Burger */}
      <div className="flex items-center gap-4">
        <Burger 
          opened={opened} 
          onClick={toggle} 
          hiddenFrom="md" 
          size="sm" 
          color="#374151" 
        />
        
        <Link
          to="/"
          className="flex items-center gap-2 no-underline cursor-pointer group"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
            <IconBriefcase size={20} className="text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            JobSeekers
          </span>
        </Link>
      </div>

      {/* Center: Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        <NavLinks />
      </div>

      {/* Right Section - Authentication dependent */}
      <div className="flex gap-4 md:gap-5 items-center">
        {isAuthenticated ? (
          <>
            {/* Logged In - Show notification and profile */}
            <Indicator
              inline
              size={10}
              offset={4}
              position="top-end"
              color="red"
              withBorder
              processing
            >
              <IconBellRinging
                size={22}
                className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              />
            </Indicator>

            <div className="hidden sm:block">
              <IconSettings
                size={22}
                className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              />
            </div>

            <ProfileMenu />
          </>
        ) : (
          <>
            {/* Logged Out - Show Login and Sign Up buttons */}
            <Button
              variant="subtle"
              size="sm"
              leftSection={<IconLogin size={16} />}
              onClick={handleLoginClick}
              className="text-gray-600 hover:text-blue-600"
            >
              Login
            </Button>
            <Button
              variant="light"
              size="sm"
              leftSection={<IconUserPlus size={16} />}
              onClick={handleSignUpClick}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        opened={opened}
        onClose={close}
        size="75%"
        padding="md"
        title={
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
              <IconBriefcase size={18} className="text-white" />
            </div>
            <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobSeekers
            </span>
          </div>
        }
        classNames={{
          content: "bg-white",
          header: "bg-white border-b border-gray-100",
          body: "p-0"
        }}
      >
        <Stack gap="md" mt="md" px="md">
          <NavLinks onClose={close} />
          
          <Divider className="my-2 border-gray-100" />
          
          {!isAuthenticated && (
            <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg">
              <Button
                fullWidth
                variant="subtle"
                leftSection={<IconLogin size={16} />}
                onClick={() => {
                  close();
                  handleLoginClick();
                }}
                className="justify-start text-gray-700 hover:text-blue-600"
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="light"
                leftSection={<IconUserPlus size={16} />}
                onClick={() => {
                  close();
                  handleSignUpClick();
                }}
                className="justify-start bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                Sign Up
              </Button>
            </div>
          )}

          {isAuthenticated && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <IconSettings size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700">App Preferences</span>
              </div>
            </div>
          )}
        </Stack>
      </Drawer>
    </div>
  );
};

export default Header;