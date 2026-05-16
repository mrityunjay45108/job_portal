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
  IconSearch,
  IconShieldLock,
  IconMenu2,
  IconX
} from "@tabler/icons-react";
import { Indicator, Burger, Drawer, Stack, Divider, Button, Skeleton, Menu, Avatar, Text, Badge } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show header on auth pages
  const isAuthPage = location.pathname === "/signup" || 
                     location.pathname === "/login" || 
                     location.pathname === "/SignUp" || 
                     location.pathname === "/Login" ||
                     location.pathname === "/admin/login";
  
  if (isAuthPage) {
    return null;
  }

  const handleLoginClick = () => {
    navigate("/login");
    close();
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    close();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    close();
  };

  // Get navigation links based on role
  const getNavLinks = () => {
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
        { label: "My Jobs", href: "/Posted-Jobs", icon: <IconClipboardList size={18} /> },
        { label: "Dashboard", href: "/Recruiter-Dashboard", icon: <IconChartBar size={18} /> }
      ];
    }
    
    return commonLinks;
  };

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Skeleton height={32} width={32} circle />
          <Skeleton height={24} width={100} radius="md" />
        </div>
        <div className="hidden md:flex gap-3">
          <Skeleton height={20} width={70} radius="md" />
          <Skeleton height={20} width={70} radius="md" />
          <Skeleton height={20} width={70} radius="md" />
        </div>
        <div className="flex gap-2">
          <Skeleton height={32} width={70} radius="xl" />
          <Skeleton height={32} width={70} radius="xl" />
          <Skeleton height={32} width={70} radius="xl" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        
        {/* Left: Logo & Mobile Burger - Only burger on mobile */}
        <div className="flex items-center gap-3">
          {/* Mobile Burger - Only visible on mobile */}
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
              <IconBriefcase size={18} className="text-white" />
            </div>
            <span className="text-base md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JobSeekers
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/find-jobs"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === "/find-jobs"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <IconSearch size={16} />
            <span>Find Jobs</span>
          </Link>
          
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
                <IconClipboardList size={16} />
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
                <IconFileText size={16} />
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
                <IconChartBar size={16} />
                <span>Dashboard</span>
              </Link>
            </>
          )}
          
          {isAuthenticated && user?.role === "recruiter" && (
            <>
              <Link
                to="/Posted-Jobs"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === "/Posted-Jobs"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <IconClipboardList size={16} />
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
                <IconChartBar size={16} />
                <span>Dashboard</span>
              </Link>
            </>
          )}
        </div>

        {/* Desktop Right Section - All visible on desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <Indicator
                inline
                size={8}
                offset={3}
                position="top-end"
                color="red"
                withBorder
              >
                <IconBellRinging
                  size={20}
                  className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                />
              </Indicator>

              <Menu shadow="md" width={260} position="bottom-end" withArrow>
                <Menu.Target>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-full transition-all">
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
                        onClick={() => navigate(`/profile/${user?.id}`)}
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
            <div className="flex gap-2">
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
              <Button
                variant="subtle"
                size="sm"
                leftSection={<IconShieldLock size={16} />}
                onClick={() => navigate("/admin/login")}
                className="text-purple-600 hover:bg-purple-50 border border-purple-200"
              >
                Admin
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Right Section - Only bell icon when logged in, otherwise nothing */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated ? (
            <Indicator
              inline
              size={7}
              offset={2}
              position="top-end"
              color="red"
              withBorder
            >
              <IconBellRinging
                size={18}
                className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              />
            </Indicator>
          ) : null}
        </div>
      </div>

      {/* Mobile Drawer - Contains all navigation, login, signup, admin */}
      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
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
          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Menu</p>
            <Link
              to="/find-jobs"
              onClick={close}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                location.pathname === "/find-jobs"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <IconSearch size={20} />
              <span>Find Jobs</span>
            </Link>
            
            {isAuthenticated && user?.role === "candidate" && (
              <>
                <Link
                  to="/my-applications"
                  onClick={close}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === "/my-applications"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconClipboardList size={20} />
                  <span>My Applications</span>
                </Link>
                <Link
                  to="/resume-builder"
                  onClick={close}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === "/resume-builder"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconFileText size={20} />
                  <span>Resume Builder</span>
                </Link>
                <Link
                  to="/candidate-dashboard"
                  onClick={close}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === "/candidate-dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconChartBar size={20} />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
            
            {isAuthenticated && user?.role === "recruiter" && (
              <>
                <Link
                  to="/Posted-Jobs"
                  onClick={close}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === "/Posted-Jobs"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconClipboardList size={20} />
                  <span>My Jobs</span>
                </Link>
                <Link
                  to="/Recruiter-Dashboard"
                  onClick={close}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    location.pathname === "/Recruiter-Dashboard"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconChartBar size={20} />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </div>
          
          <Divider className="my-2" />
          
          {/* Auth Section - Login, Signup, Admin all in drawer on mobile */}
          {!isAuthenticated ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Account</p>
              <button
                onClick={() => {
                  close();
                  handleLoginClick();
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full transition-colors"
              >
                <IconLogin size={20} />
                <span>Login</span>
              </button>
              <button
                onClick={() => {
                  close();
                  handleSignUpClick();
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-blue-600 hover:bg-blue-50 w-full transition-colors"
              >
                <IconUserPlus size={20} />
                <span>Sign Up</span>
              </button>
              <button
                onClick={() => {
                  close();
                  navigate("/admin/login");
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-purple-600 hover:bg-purple-50 w-full transition-colors border border-purple-200"
              >
                <IconShieldLock size={20} />
                <span>Admin Login</span>
              </button>
            </div>
          ) : (
            <>
              {/* User Profile Section */}
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar size={48} radius="xl" color="blue">
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                  <div>
                    <Text fw={600} size="sm" className="text-gray-800">{user?.fullName}</Text>
                    <Text size="xs" className="text-gray-500 break-all">{user?.email}</Text>
                    <Badge size="sm" color="blue" variant="light" className="mt-1">
                      {user?.role === "candidate" ? "Candidate" : "Recruiter"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Divider />
              
              {/* Account Settings */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">Account</p>
                
                {user?.role === "candidate" && (
                  <>
                    <button
                      onClick={() => {
                        close();
                        navigate(`/profile/${user?.id}`);
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconUser size={20} />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        close();
                        navigate("/resume-builder");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconFileText size={20} />
                      <span>Resume Builder</span>
                    </button>
                    <button
                      onClick={() => {
                        close();
                        navigate("/resume-analyzer");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-purple-600 hover:bg-purple-50 w-full text-left transition-colors"
                    >
                      <IconBrain size={20} />
                      <span>AI Resume Analyzer</span>
                      <Badge size="xs" color="purple" className="ml-auto">AI</Badge>
                    </button>
                    <button
                      onClick={() => {
                        close();
                        navigate("/my-applications");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconClipboardList size={20} />
                      <span>My Applications</span>
                    </button>
                    <button
                      onClick={() => {
                        close();
                        navigate("/candidate-dashboard");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconChartBar size={20} />
                      <span>Dashboard</span>
                    </button>
                  </>
                )}
                
                {user?.role === "recruiter" && (
                  <>
                    <button
                      onClick={() => {
                        close();
                        navigate("/Posted-Jobs");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconClipboardList size={20} />
                      <span>My Jobs</span>
                    </button>
                    <button
                      onClick={() => {
                        close();
                        navigate("/Recruiter-Dashboard");
                      }}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                    >
                      <IconChartBar size={20} />
                      <span>Dashboard</span>
                    </button>
                  </>
                )}
                
                <Divider className="my-2" />
                
                <button
                  onClick={() => {
                    close();
                    navigate("/settings");
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full text-left transition-colors"
                >
                  <IconSettings size={20} />
                  <span>Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <IconLogout size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default Header;





// import { 
//   IconBriefcase, 
//   IconBellRinging, 
//   IconSettings, 
//   IconLogin, 
//   IconUserPlus, 
//   IconBuilding, 
//   IconUser, 
//   IconClipboardList, 
//   IconChartBar, 
//   IconLogout,
//   IconFileText,
//   IconBrain,
//   IconSearch,
//   IconShieldLock,
// } from "@tabler/icons-react";
// import { Indicator, Burger, Drawer, Stack, Divider, Button, Skeleton, Menu, Avatar, Text, Badge } from "@mantine/core";
// import { useDisclosure, useMediaQuery } from "@mantine/hooks";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect } from "react";

// const Header = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [opened, { toggle, close }] = useDisclosure(false);
//   const { user, isAuthenticated, loading, logout } = useAuth();
//   const [scrolled, setScrolled] = useState(false);
//   const isMobile = useMediaQuery('(max-width: 768px)');

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Don't show header on auth pages
//   const isAuthPage = location.pathname === "/signup" || 
//                      location.pathname === "/login" || 
//                      location.pathname === "/SignUp" || 
//                      location.pathname === "/Login" ||
//                      location.pathname === "/admin/login";
  
//   if (isAuthPage) {
//     return null;
//   }

//   const handleLoginClick = () => {
//     navigate("/login");
//     close();
//   };

//   const handleSignUpClick = () => {
//     navigate("/signup");
//     close();
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     close();
//     notifications.show({
//       title: "Logged Out",
//       message: "You have been logged out successfully",
//       color: "green",
//     });
//   };

//   // Get user ID safely
//   const userId = user?.id || user?._id;

//   // Get navigation links based on role
//   const getNavLinks = () => {
//     const commonLinks = [
//       { label: "Find Jobs", href: "/find-jobs", icon: <IconSearch size={18} /> }
//     ];
    
//     if (isAuthenticated && user?.role === "candidate") {
//       return [
//         ...commonLinks,
//         { label: "My Applications", href: "/my-applications", icon: <IconClipboardList size={18} /> },
//         { label: "Resume Builder", href: "/resume-builder", icon: <IconFileText size={18} /> },
//         { label: "Dashboard", href: "/candidate-dashboard", icon: <IconChartBar size={18} /> }
//       ];
//     } else if (isAuthenticated && user?.role === "recruiter") {
//       return [
//         ...commonLinks,
//         { label: "My Jobs", href: "/Posted-Jobs", icon: <IconClipboardList size={18} /> },
//         { label: "Dashboard", href: "/Recruiter-Dashboard", icon: <IconChartBar size={18} /> }
//       ];
//     }
    
//     return commonLinks;
//   };

//   // Show skeleton while loading
//   if (loading) {
//     return (
//       <div className="w-full bg-white border-b border-gray-200 px-3 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
//         <div className="flex items-center gap-2 md:gap-3">
//           <Skeleton height={32} width={32} circle />
//           <Skeleton height={24} width={100} radius="md" />
//         </div>
//         <div className="hidden md:flex gap-2">
//           <Skeleton height={20} width={70} radius="md" />
//           <Skeleton height={20} width={70} radius="md" />
//           <Skeleton height={20} width={70} radius="md" />
//         </div>
//         <div className="flex gap-1 md:gap-2">
//           <Skeleton height={32} width={65} radius="xl" />
//           <Skeleton height={32} width={65} radius="xl" />
//           <Skeleton height={32} width={65} radius="xl" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={`w-full bg-white border-b border-gray-200 px-3 md:px-6 py-2.5 md:py-3 flex justify-between items-center sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        
//         {/* Left: Logo & Mobile Burger */}
//         <div className="flex items-center gap-2 md:gap-3">
//           <Burger 
//             opened={opened} 
//             onClick={toggle} 
//             hiddenFrom="md" 
//             size="sm" 
//             color="#374151" 
//           />
          
//           <Link
//             to="/"
//             className="flex items-center gap-1.5 md:gap-2 no-underline cursor-pointer group"
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
//               <IconBriefcase size={16} className="text-white md:size-18" />
//             </div>
//             <span className="text-sm md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               JobSeekers
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-1">
//           <Link
//             to="/find-jobs"
//             className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//               location.pathname === "/find-jobs"
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//             }`}
//           >
//             <IconSearch size={16} />
//             <span>Find Jobs</span>
//           </Link>
          
//           {isAuthenticated && user?.role === "candidate" && (
//             <>
//               <Link
//                 to="/my-applications"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === "/my-applications"
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <IconClipboardList size={16} />
//                 <span>My Applications</span>
//               </Link>
//               <Link
//                 to="/resume-builder"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === "/resume-builder"
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <IconFileText size={16} />
//                 <span>Resume Builder</span>
//               </Link>
//               <Link
//                 to="/candidate-dashboard"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === "/candidate-dashboard"
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <IconChartBar size={16} />
//                 <span>Dashboard</span>
//               </Link>
//             </>
//           )}
          
//           {isAuthenticated && user?.role === "recruiter" && (
//             <>
//               <Link
//                 to="/Posted-Jobs"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === "/Posted-Jobs"
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <IconClipboardList size={16} />
//                 <span>My Jobs</span>
//               </Link>
//               <Link
//                 to="/Recruiter-Dashboard"
//                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   location.pathname === "/Recruiter-Dashboard"
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                 }`}
//               >
//                 <IconChartBar size={16} />
//                 <span>Dashboard</span>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Desktop Right Section */}
//         <div className="hidden md:flex gap-2 items-center">
//           {isAuthenticated ? (
//             <>
//               <Indicator inline size={8} offset={3} position="top-end" color="red" withBorder>
//                 <IconBellRinging size={20} className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
//               </Indicator>

//               <Menu shadow="md" width={260} position="bottom-end" withArrow>
//                 <Menu.Target>
//                   <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-full transition-all">
//                     <Avatar size={32} radius="xl" color="blue" className="border-2 border-blue-100">
//                       {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
//                     </Avatar>
//                     <div className="hidden lg:block text-left">
//                       <Text size="sm" fw={500} className="text-gray-800">
//                         {user?.fullName?.split(" ")[0] || "User"}
//                       </Text>
//                       <Text size="xs" className="text-gray-500 capitalize">
//                         {user?.role || "User"}
//                       </Text>
//                     </div>
//                   </div>
//                 </Menu.Target>
//                 <Menu.Dropdown>
//                   <Menu.Label>
//                     <div className="px-1 py-1">
//                       <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider">
//                         {user?.role === "candidate" ? "Candidate Menu" : "Recruiter Menu"}
//                       </Text>
//                     </div>
//                   </Menu.Label>
                  
//                   {user?.role === "candidate" && (
//                     <>
//                       <Menu.Item 
//                         leftSection={<IconUser size={16} />}
//                         onClick={() => {
//                           if (userId) {
//                             navigate(`/profile/${userId}`);
//                           } else {
//                             notifications.show({
//                               title: "Error",
//                               message: "Unable to load profile",
//                               color: "red",
//                             });
//                           }
//                         }}
//                       >
//                         My Profile
//                       </Menu.Item>
//                       <Menu.Item leftSection={<IconFileText size={16} />} onClick={() => navigate("/resume-builder")}>
//                         Resume Builder
//                       </Menu.Item>
//                       <Menu.Item 
//                         leftSection={<IconBrain size={16} />} 
//                         onClick={() => navigate("/resume-analyzer")}
//                         rightSection={<Badge size="xs" color="purple" variant="light">AI</Badge>}
//                       >
//                         AI Resume Analyzer
//                       </Menu.Item>
//                       <Menu.Item leftSection={<IconClipboardList size={16} />} onClick={() => navigate("/my-applications")}>
//                         My Applications
//                       </Menu.Item>
//                       <Menu.Item leftSection={<IconChartBar size={16} />} onClick={() => navigate("/candidate-dashboard")}>
//                         Dashboard
//                       </Menu.Item>
//                     </>
//                   )}
                  
//                   {user?.role === "recruiter" && (
//                     <>
//                       <Menu.Item leftSection={<IconClipboardList size={16} />} onClick={() => navigate("/Posted-Jobs")}>
//                         My Jobs
//                       </Menu.Item>
//                       <Menu.Item leftSection={<IconChartBar size={16} />} onClick={() => navigate("/Recruiter-Dashboard")}>
//                         Dashboard
//                       </Menu.Item>
//                     </>
//                   )}
                  
//                   <Menu.Divider />
//                   <Menu.Item leftSection={<IconSettings size={16} />} onClick={() => navigate("/settings")}>
//                     Settings
//                   </Menu.Item>
//                   <Menu.Divider />
//                   <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={handleLogout}>
//                     Logout
//                   </Menu.Item>
//                 </Menu.Dropdown>
//               </Menu>
//             </>
//           ) : (
//             <div className="flex gap-2">
//               <Button variant="subtle" size="sm" leftSection={<IconLogin size={16} />} onClick={handleLoginClick}>
//                 Login
//               </Button>
//               <Button variant="light" size="sm" leftSection={<IconUserPlus size={16} />} onClick={handleSignUpClick}>
//                 Sign Up
//               </Button>
//               <Button variant="subtle" size="sm" leftSection={<IconShieldLock size={16} />} onClick={() => navigate("/admin/login")}>
//                 Admin
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Right Section */}
//         <div className="flex md:hidden items-center gap-2">
//           {isAuthenticated && (
//             <Indicator inline size={7} offset={2} position="top-end" color="red" withBorder>
//               <IconBellRinging size={18} className="text-gray-600" />
//             </Indicator>
//           )}
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer
//         opened={opened}
//         onClose={close}
//         size="80%"
//         padding="md"
//         title={
//           <div className="flex items-center gap-2">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
//               <IconBriefcase size={18} className="text-white" />
//             </div>
//             <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               JobSeekers
//             </span>
//           </div>
//         }
//       >
//         <Stack gap="md">
//           {/* Navigation Links */}
//           <div className="space-y-1">
//             <p className="text-xs font-semibold text-gray-400 px-2">Menu</p>
//             <Link to="/find-jobs" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50">
//               <IconSearch size={20} /><span>Find Jobs</span>
//             </Link>
            
//             {isAuthenticated && user?.role === "candidate" && (
//               <>
//                 <Link to="/my-applications" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50">
//                   <IconClipboardList size={20} /><span>My Applications</span>
//                 </Link>
//                 <Link to="/resume-builder" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50">
//                   <IconFileText size={20} /><span>Resume Builder</span>
//                 </Link>
//                 <Link to="/candidate-dashboard" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50">
//                   <IconChartBar size={20} /><span>Dashboard</span>
//                 </Link>
//               </>
//             )}
            
//             {isAuthenticated && user?.role === "recruiter" && (
//               <>
//                 <Link to="/Posted-Jobs" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50">
//                   <IconClipboardList size={20} /><span>My Jobs</span>
//                 </Link>
//                 <Link to="/Recruiter-Dashboard" onClick={close} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50">
//                   <IconChartBar size={20} /><span>Dashboard</span>
//                 </Link>
//               </>
//             )}
//           </div>
          
//           <Divider />
          
//           {!isAuthenticated ? (
//             <div className="space-y-2">
//               <p className="text-xs font-semibold text-gray-400 px-2">Account</p>
//               <button onClick={handleLoginClick} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                 <IconLogin size={20} /><span>Login</span>
//               </button>
//               <button onClick={handleSignUpClick} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-blue-600 hover:bg-blue-50 w-full">
//                 <IconUserPlus size={20} /><span>Sign Up</span>
//               </button>
//               <button onClick={() => { close(); navigate("/admin/login"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-purple-600 hover:bg-purple-50 w-full border border-purple-200">
//                 <IconShieldLock size={20} /><span>Admin Login</span>
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <Avatar size={48} radius="xl" color="blue">
//                     {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
//                   </Avatar>
//                   <div>
//                     <Text fw={600} size="sm">{user?.fullName}</Text>
//                     <Text size="xs" className="text-gray-500 break-all">{user?.email}</Text>
//                     <Badge size="sm" color="blue" variant="light" className="mt-1">
//                       {user?.role === "candidate" ? "Candidate" : "Recruiter"}
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//               <Divider />
              
//               <div className="space-y-1">
//                 <p className="text-xs font-semibold text-gray-400 px-2">Account</p>
                
//                 {user?.role === "candidate" && (
//                   <>
//                     <button
//                       onClick={() => {
//                         close();
//                         if (userId) {
//                           navigate(`/profile/${userId}`);
//                         } else {
//                           notifications.show({
//                             title: "Error",
//                             message: "Unable to load profile",
//                             color: "red",
//                           });
//                         }
//                       }}
//                       className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full"
//                     >
//                       <IconUser size={20} /><span>My Profile</span>
//                     </button>
//                     <button onClick={() => { close(); navigate("/resume-builder"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                       <IconFileText size={20} /><span>Resume Builder</span>
//                     </button>
//                     <button onClick={() => { close(); navigate("/resume-analyzer"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-purple-600 hover:bg-purple-50 w-full">
//                       <IconBrain size={20} /><span>AI Resume Analyzer</span>
//                       <Badge size="xs" color="purple" className="ml-auto">AI</Badge>
//                     </button>
//                     <button onClick={() => { close(); navigate("/my-applications"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                       <IconClipboardList size={20} /><span>My Applications</span>
//                     </button>
//                     <button onClick={() => { close(); navigate("/candidate-dashboard"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                       <IconChartBar size={20} /><span>Dashboard</span>
//                     </button>
//                   </>
//                 )}
                
//                 {user?.role === "recruiter" && (
//                   <>
//                     <button onClick={() => { close(); navigate("/Posted-Jobs"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                       <IconClipboardList size={20} /><span>My Jobs</span>
//                     </button>
//                     <button onClick={() => { close(); navigate("/Recruiter-Dashboard"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                       <IconChartBar size={20} /><span>Dashboard</span>
//                     </button>
//                   </>
//                 )}
                
//                 <Divider className="my-2" />
//                 <button onClick={() => { close(); navigate("/settings"); }} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-gray-700 hover:bg-gray-50 w-full">
//                   <IconSettings size={20} /><span>Settings</span>
//                 </button>
//                 <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-base text-red-600 hover:bg-red-50 w-full">
//                   <IconLogout size={20} /><span>Logout</span>
//                 </button>
//               </div>
//             </>
//           )}
//         </Stack>
//       </Drawer>
//     </>
//   );
// };

// export default Header;