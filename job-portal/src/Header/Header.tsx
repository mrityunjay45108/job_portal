import { 
  IconBriefcase, 
  IconBellRinging, 
  IconSettings, 
  IconLogin, 
  IconUserPlus, 
  IconBuilding, 
  IconUser, 
  IconClipboardList, 
  IconChartBar, 
  IconLogout,
  IconFileText,
  IconBrain,
  IconSearch
} from "@tabler/icons-react";
import { Indicator, Burger, Drawer, Stack, Divider, Button, Skeleton, Menu, Avatar, Text, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, isAuthenticated, loading, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    navigate("/");
    close();
  };

  // Get navigation links based on role
  const getNavLinks = () => {
    // Common links for everyone
    const commonLinks = [
      { label: "Find Jobs", href: "/find-jobs", icon: <IconSearch size={18} /> }
    ];
    
    if (isAuthenticated && user?.role === "candidate") {
      return [
        ...commonLinks,
        { label: "My Applications", href: "/my-applications", icon: <IconClipboardList size={18} /> },
        { label: "Resume Builder", href: "/resume-builder", icon: <IconFileText size={18} /> },
        { label: "Dashboard", href: "/candidate-dashboard", icon: <IconChartBar size={18} /> }
      ];
    } else if (isAuthenticated && user?.role === "recruiter") {
      return [
        ...commonLinks,
        // ❌ Post a Job removed from here
        { label: "My Jobs", href: "/Posted-Jobs", icon: <IconClipboardList size={18} /> },
        { label: "Dashboard", href: "/Recruiter-Dashboard", icon: <IconChartBar size={18} /> }
      ];
    }
    
    // Not logged in - only show Find Jobs
    return commonLinks;
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
          <Skeleton height={20} width={80} radius="md" />
          <Skeleton height={20} width={80} radius="md" />
          <Skeleton height={20} width={80} radius="md" />
        </div>
        <div className="flex gap-3">
          <Skeleton height={36} width={80} radius="xl" />
          <Skeleton height={36} width={80} radius="xl" />
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

      {/* Center: Desktop Navigation - Always show Find Jobs */}
      <div className="hidden md:flex items-center gap-1">
        {/* Always visible Find Jobs button */}
        <Link
          to="/find-jobs"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            location.pathname === "/find-jobs"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <IconSearch size={18} />
          <span>Find Jobs</span>
        </Link>
        
        {/* Role-specific links */}
        {isAuthenticated && user?.role === "candidate" && (
          <>
            <Link
              to="/my-applications"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/my-applications"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconClipboardList size={18} />
              <span>My Applications</span>
            </Link>
            <Link
              to="/resume-builder"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/resume-builder"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconFileText size={18} />
              <span>Resume Builder</span>
            </Link>
            <Link
              to="/candidate-dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/candidate-dashboard"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconChartBar size={18} />
              <span>Dashboard</span>
            </Link>
          </>
        )}
        
        {isAuthenticated && user?.role === "recruiter" && (
          <>
            {/* ❌ Post a Job link completely removed from desktop navigation */}
            <Link
              to="/Posted-Jobs"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/Posted-Jobs"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconClipboardList size={18} />
              <span>My Jobs</span>
            </Link>
            <Link
              to="/Recruiter-Dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === "/Recruiter-Dashboard"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <IconChartBar size={18} />
              <span>Dashboard</span>
            </Link>
          </>
        )}
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

            {/* Profile Menu - Role based */}
            <Menu shadow="md" width={280} position="bottom-end" withArrow>
              <Menu.Target>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-full transition-all">
                  <Avatar size={32} radius="xl" color="blue" className="border-2 border-blue-100">
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <Text size="sm" fw={500} className="text-gray-800">
                      {user?.fullName?.split(" ")[0] || "User"}
                    </Text>
                    <Text size="xs" className="text-gray-500 capitalize">
                      {user?.role || "User"}
                    </Text>
                  </div>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>
                  <div className="px-1 py-1">
                    <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider">
                      {user?.role === "candidate" ? "Candidate Menu" : "Recruiter Menu"}
                    </Text>
                  </div>
                </Menu.Label>
                
                {user?.role === "candidate" && (
                  <>
                    <Menu.Item 
                      leftSection={<IconUser size={16} />}
                      onClick={() => navigate("/profile")}
                    >
                      My Profile
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconFileText size={16} />}
                      onClick={() => navigate("/resume-builder")}
                    >
                      Resume Builder
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconBrain size={16} />}
                      onClick={() => navigate("/resume-analyzer")}
                      rightSection={
                        <Badge size="xs" color="purple" variant="light">AI</Badge>
                      }
                    >
                      AI Resume Analyzer
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconClipboardList size={16} />}
                      onClick={() => navigate("/my-applications")}
                    >
                      My Applications
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconChartBar size={16} />}
                      onClick={() => navigate("/candidate-dashboard")}
                    >
                      Dashboard
                    </Menu.Item>
                  </>
                )}
                
                {user?.role === "recruiter" && (
                  <>
                    {/* ❌ Post a Job removed from dropdown menu */}
                    <Menu.Item 
                      leftSection={<IconClipboardList size={16} />}
                      onClick={() => navigate("/Posted-Jobs")}
                    >
                      My Jobs
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconChartBar size={16} />}
                      onClick={() => navigate("/Recruiter-Dashboard")}
                    >
                      Dashboard
                    </Menu.Item>
                  </>
                )}
                
                <Menu.Divider />
                
                <Menu.Item 
                  leftSection={<IconSettings size={16} />}
                  onClick={() => navigate("/settings")}
                >
                  Settings
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
          {/* Mobile navigation links */}
          <Link
            to="/find-jobs"
            onClick={close}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === "/find-jobs"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <IconSearch size={18} />
            <span>Find Jobs</span>
          </Link>
          
          {getNavLinks().slice(1).map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={close}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          
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
            <>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar size={40} radius="xl" color="blue">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
                <div>
                  <Text fw={600} size="sm" className="text-gray-800">{user?.fullName}</Text>
                  <Text size="xs" className="text-gray-500 capitalize">{user?.role}</Text>
                </div>
              </div>
              
              {user?.role === "candidate" && (
                <>
                  <button
                    onClick={() => {
                      close();
                      navigate("/profile");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
                  >
                    <IconUser size={18} />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      close();
                      navigate("/resume-builder");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
                  >
                    <IconFileText size={18} />
                    <span>Resume Builder</span>
                  </button>
                  <button
                    onClick={() => {
                      close();
                      navigate("/resume-analyzer");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-purple-600 hover:bg-purple-50 w-full text-left"
                  >
                    <IconBrain size={18} />
                    <span>AI Resume Analyzer</span>
                    <Badge size="xs" color="purple" className="ml-auto">AI</Badge>
                  </button>
                  <button
                    onClick={() => {
                      close();
                      navigate("/my-applications");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
                  >
                    <IconClipboardList size={18} />
                    <span>My Applications</span>
                  </button>
                </>
              )}
              
              {user?.role === "recruiter" && (
                <>
                  {/* ❌ Post a Job removed from mobile drawer */}
                  <button
                    onClick={() => {
                      close();
                      navigate("/Posted-Jobs");
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
                  >
                    <IconClipboardList size={18} />
                    <span>My Jobs</span>
                  </button>
                </>
              )}
              
              <Divider className="my-2" />
              
              <button
                onClick={() => {
                  close();
                  navigate("/settings");
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 w-full text-left"
              >
                <IconSettings size={18} />
                <span>Settings</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 w-full text-left"
              >
                <IconLogout size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </Stack>
      </Drawer>
    </div>
  );
};

export default Header;