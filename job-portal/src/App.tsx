// import "./App.css";
// import Header from "./Header/Header";
// import Footer from "./Footter/Fotter";
// import { MantineProvider, createTheme } from "@mantine/core";
// import "@mantine/core/styles.css";
// import "@mantine/tiptap/styles.css";
// import "@mantine/carousel/styles.css";
// import "@mantine/notifications/styles.css";
// import HomePages from "./Pages/HomePages";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import FindJobs from "./Pages/FindJobs";
// import PostedJobPage from "./Pages/PostedJobPage";
// import CandidateDashboardPage from "./Pages/CandidateDashboardPage";
// import ProfilePage from "./Pages/ProfilePage";
// import { Notifications } from "@mantine/notifications";
// import PostedJobManagementpage from "./Pages/PostedJobManagementpage";
// import Login from "./SignUpLogin/Login";
// import SignUp from "./SignUpLogin/SignUp";
// import { AuthProvider } from "./context/AuthContext";
// import JobDetailsPage from "./Pages/JobDetailsPage";
// // import PostJobPage from "./Pages/PostJobPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import RoleBasedRedirect from "./components/RoleBasedRedirect";
// import ResumeBuilder from "./Pages/ResumeBuilder";
// import ResumeAnalyzerPage from "./Pages/ResumeAnalyzerPage";
// import AIInterview from "./components/AIInterview/AIInterview";
// import MyApplicationsPage from "./Pages/MyApplicationsPage";
// import ManageCompanies from './Pages/Admin/ManageCompanies';
// import ManageInterviews from './Pages/Admin/ManageInterviews';
// import RecruitmentForm from "./LandingPage/RecruitmentForm";


// // ==================== ADMIN PANEL IMPORTS ====================
// import AdminLogin from "./Pages/Admin/AdminLogin";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import ManageCandidates from "./Pages/Admin/ManageCandidates";
// import ManageRecruiters from "./Pages/Admin/ManageRecruiters";
// import ManageJobs from "./Pages/Admin/ManageJobs";
// import ManageApplications from "./Pages/Admin/ManageApplications";
// import ManageAdmins from "./Pages/Admin/ManageAdmins";
// import Reports from "./Pages/Admin/Reports";
// import SystemStats from "./Pages/Admin/SystemStats";
// import AdminPanel from "./Pages/AdminPanel";
// import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
// <><Route path="interviews" element={<ManageInterviews />} /><Route path="companies" element={<ManageCompanies />} /></>

// const theme = createTheme({
//   colors: {
//     brightSun: [
//       "#fffbeb",
//       "#fff3c6",
//       "#ffe588",
//       "#ffd149",
//       "#ffbd20",
//       "#ff9907",
//       "#dd7302",
//       "#b75006",
//       "#943c0c",
//       "#7a330d",
//       "#461902",
//     ],
//     gray: [
//       "#f9fafb",
//       "#f3f4f6",
//       "#e5e7eb",
//       "#d1d5db",
//       "#9ca3af",
//       "#6b7280",
//       "#4b5563",
//       "#374151",
//       "#1f2937",
//       "#111827",
//     ],
//   },
//   fontFamily: "Poppins, sans-serif",
//   primaryColor: "brightSun",
//   components: {
//     Button: {
//       defaultProps: {
//         radius: "md",
//       },
//     },
//   },
// });

// // Layout component to conditionally show header and footer
// function AppLayout() {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith('/admin');
//   const isAuthPage = location.pathname === "/signup" || 
//                     location.pathname === "/login" || 
//                     location.pathname === "/SignUp" || 
//                     location.pathname === "/Login";

//   return (
//     <>
//       {/* Header - Hide on admin routes and auth pages */}
//       {!isAdminRoute && !isAuthPage && <Header />}
      
//       <Routes>
//         {/* ==================== PUBLIC ROUTES ==================== */}
//         <Route path="/" element={<HomePages />} />
//         <Route path="/find-jobs" element={<FindJobs />} />
//         <Route path="/job/:id" element={<JobDetailsPage />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register-interest" element={<RecruitmentForm />} />
//         {/* ==================== ADMIN ROUTES ==================== */}
//         <Route path="/admin/login" element={<AdminLogin />} />
        
//         <Route path="/admin" element={
//           <AdminProtectedRoute>
//             <AdminPanel />
//           </AdminProtectedRoute>
//         }>
//           <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="candidates" element={<ManageCandidates />} />
//           <Route path="recruiters" element={<ManageRecruiters />} />
//           <Route path="jobs" element={<ManageJobs />} />
//           <Route path="applications" element={<ManageApplications />} />
//           <Route path="admins" element={<ManageAdmins />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="system-stats" element={<SystemStats />} />
//         </Route>
        
//         {/* ==================== CANDIDATE ONLY ROUTES ==================== */}
//         <Route element={<ProtectedRoute allowedRoles={["candidate"]} redirectTo="/login" />}>
//           <Route path="/candidate-dashboard" element={<CandidateDashboardPage />} />
//           <Route path="/my-applications" element={<MyApplicationsPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/profile/:userId" element={<ProfilePage />} />
//           <Route path="/resume-builder" element={<ResumeBuilder />} />
//           <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
//           <Route path="/ai-interview/:jobId" element={<AIInterview jobId={""} />} />
//         </Route>
        
//         {/* ==================== RECRUITER ONLY ROUTES ==================== */}
//         <Route element={<ProtectedRoute allowedRoles={["recruiter"]} redirectTo="/login" />}>
//           <Route path="/Recruiter-Dashboard" element={<PostedJobManagementpage />} />
//           <Route path="/Posted-Jobs" element={<PostedJobPage />} />
//           <Route path="/company/profile" element={<ProfilePage />} />
//           <Route path="/find-talent" element={<FindJobs />} />
//         </Route>
        
//         {/* ==================== DASHBOARD REDIRECT ==================== */}
//         <Route path="/dashboard" element={<RoleBasedRedirect />} />
        
//         {/* ==================== FALLBACK ==================== */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
      
//       {/* Footer - Hide on admin routes and auth pages */}
//       {!isAdminRoute && !isAuthPage && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <MantineProvider theme={theme} defaultColorScheme="light">
//       <Notifications position="top-right" zIndex={1000} />
//       <BrowserRouter>
//         <AuthProvider>
//           <AppLayout />
//         </AuthProvider>
//       </BrowserRouter>
//     </MantineProvider>
//   );
// }

// export default App;



import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footter/Fotter";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import HomePages from "./Pages/HomePages";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import FindJobs from "./Pages/FindJobs";
import PostedJobPage from "./Pages/PostedJobPage";
import CandidateDashboardPage from "./Pages/CandidateDashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import { Notifications } from "@mantine/notifications";
import PostedJobManagementpage from "./Pages/PostedJobManagementpage";
import Login from "./SignUpLogin/Login";
import SignUp from "./SignUpLogin/SignUp";
import { AuthProvider } from "./context/AuthContext";
import JobDetailsPage from "./Pages/JobDetailsPage";
// import PostJobPage from "./Pages/PostJobPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import ResumeBuilder from "./Pages/ResumeBuilder";
import ResumeAnalyzerPage from "./Pages/ResumeAnalyzerPage";
import AIInterview from "./components/AIInterview/AIInterview";
import MyApplicationsPage from "./Pages/MyApplicationsPage";
import ManageCompanies from './Pages/Admin/ManageCompanies';
import ManageInterviews from './Pages/Admin/ManageInterviews';
import RecruitmentForm from "./LandingPage/RecruitmentForm";
import ChatBot from "./components/ChatBot/ChatBot"; // ADDED: Import ChatBot

// ==================== ADMIN PANEL IMPORTS ====================
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageCandidates from "./Pages/Admin/ManageCandidates";
import ManageRecruiters from "./Pages/Admin/ManageRecruiters";
import ManageJobs from "./Pages/Admin/ManageJobs";
import ManageApplications from "./Pages/Admin/ManageApplications";
import ManageAdmins from "./Pages/Admin/ManageAdmins";
import Reports from "./Pages/Admin/Reports";
import SystemStats from "./Pages/Admin/SystemStats";
import AdminPanel from "./Pages/AdminPanel";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
<><Route path="interviews" element={<ManageInterviews />} /><Route path="companies" element={<ManageCompanies />} /></>

const theme = createTheme({
  colors: {
    brightSun: [
      "#fffbeb",
      "#fff3c6",
      "#ffe588",
      "#ffd149",
      "#ffbd20",
      "#ff9907",
      "#dd7302",
      "#b75006",
      "#943c0c",
      "#7a330d",
      "#461902",
    ],
    gray: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
    ],
  },
  fontFamily: "Poppins, sans-serif",
  primaryColor: "brightSun",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});

// Layout component to conditionally show header and footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === "/signup" || 
                    location.pathname === "/login" || 
                    location.pathname === "/SignUp" || 
                    location.pathname === "/Login";

  // Determine user role for ChatBot based on current route or auth context
  // You can also get this from your AuthContext
  const getUserRole = () => {
    // Default role for public users
    if (isAuthPage) return "candidate";
    if (isAdminRoute) return "admin";
    // You can add more logic here based on your auth context
    return "candidate";
  };

  return (
    <>
      {/* Header - Hide on admin routes and auth pages */}
      {!isAdminRoute && !isAuthPage && <Header />}
      
      <Routes>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="/" element={<HomePages />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-interest" element={<RecruitmentForm />} />
        {/* ==================== ADMIN ROUTES ==================== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <AdminPanel />
          </AdminProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="candidates" element={<ManageCandidates />} />
          <Route path="recruiters" element={<ManageRecruiters />} />
          <Route path="jobs" element={<ManageJobs />} />
          <Route path="applications" element={<ManageApplications />} />
          <Route path="admins" element={<ManageAdmins />} />
          <Route path="reports" element={<Reports />} />
          <Route path="system-stats" element={<SystemStats />} />
        </Route>
        
        {/* ==================== CANDIDATE ONLY ROUTES ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["candidate"]} redirectTo="/login" />}>
          <Route path="/candidate-dashboard" element={<CandidateDashboardPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/ai-interview/:jobId" element={<AIInterview jobId={""} />} />
        </Route>
        
        {/* ==================== RECRUITER ONLY ROUTES ==================== */}
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} redirectTo="/login" />}>
          <Route path="/Recruiter-Dashboard" element={<PostedJobManagementpage />} />
          <Route path="/Posted-Jobs" element={<PostedJobPage />} />
          <Route path="/company/profile" element={<ProfilePage />} />
          <Route path="/find-talent" element={<FindJobs />} />
        </Route>
        
        {/* ==================== DASHBOARD REDIRECT ==================== */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />
        
        {/* ==================== FALLBACK ==================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Footer - Hide on admin routes and auth pages */}
      {!isAdminRoute && !isAuthPage && <Footer />}
      
      {/* CHATBOT - Shows on ALL pages (public, auth, admin, etc.) */}
      {/* Hide on admin login page to avoid confusion, but show on admin dashboard */}
      {location.pathname !== "/admin/login" && (
        <ChatBot selectedRole={getUserRole()} />
      )}
    </>
  );
}

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;