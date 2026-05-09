// import "./App.css";
// import Header from "./Header/Header";
// import Footer from "./Footter/Fotter";
// import { MantineProvider, createTheme } from "@mantine/core";
// import "@mantine/core/styles.css";
// import "@mantine/tiptap/styles.css";
// import "@mantine/carousel/styles.css";
// import "@mantine/notifications/styles.css";
// import HomePages from "./Pages/HomePages";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import FindJobs from "./Pages/FindJobs";
// import ApplyJobPage from "./Pages/ApllyJobPage";
// import PostedJobPage from "./Pages/PostedJobPage";
// import CandidateDashboardPage from "./Pages/CandidateDashboardPage";
// import ProfilePage from "./Pages/ProfilePage";
// import { Notifications } from "@mantine/notifications";
// import PostedJobManagementpage from "./Pages/PostedJobManagementpage";
// import ApplyPage from "./Pages/ApplyPage";
// import Login from "./SignUpLogin/Login";
// import SignUp from "./SignUpLogin/SignUp";
// import { AuthProvider } from "./context/AuthContext";
// import JobDetailsPage from "./Pages/JobDetailsPage";
// import PostJobPage from "./Pages/PostJobPage";


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

// function App() {
//   return (
//     <MantineProvider theme={theme} defaultColorScheme="light">
//       <Notifications position="top-right" zIndex={1000} />
//       <BrowserRouter>
//         <AuthProvider>
//           <Header />
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomePages />} />
//             <Route path="/find-jobs" element={<FindJobs />} />
//             <Route path="/apply-job" element={<ApplyJobPage />} />
//             <Route path="/apply/:jobId" element={<ApplyPage />} />
            
//             {/* Auth Routes */}
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />
            
//             {/* Dashboard Routes */}
//             <Route path="/candidate-dashboard" element={<CandidateDashboardPage />} />
//             <Route path="/Recruiter-Dashboard" element={<PostedJobManagementpage />} />
//             <Route path="/Posted-Jobs" element={<PostedJobPage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/profile/:userId" element={<ProfilePage />} />
//             <Route path="/profile-page" element={<ProfilePage />} />
//             {/* Fallback */}
//             <Route path="*" element={<HomePages />} />
//             <Route path="/job/:id" element={<JobDetailsPage />} />
//             <Route path="/post-job" element={<PostJobPage />} />

//           </Routes>
//           <Footer />
//         </AuthProvider>
//       </BrowserRouter>
//     </MantineProvider>
//   );
// }

// export default App;



// src/App.tsx
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footter/Fotter";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import HomePages from "./Pages/HomePages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FindJobs from "./Pages/FindJobs";
// import ApplyJobPage from "./Pages/ApllyJobPage";
import PostedJobPage from "./Pages/PostedJobPage";
import CandidateDashboardPage from "./Pages/CandidateDashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import { Notifications } from "@mantine/notifications";
import PostedJobManagementpage from "./Pages/PostedJobManagementpage";
// import ApplyPage from "./Pages/ApplyPage";
import Login from "./SignUpLogin/Login";
import SignUp from "./SignUpLogin/SignUp";
import { AuthProvider } from "./context/AuthContext";
import JobDetailsPage from "./Pages/JobDetailsPage";
import PostJobPage from "./Pages/PostJobPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import ResumeBuilder from "./Pages/ResumeBuilder";
import ResumeAnalyzerPage from "./Pages/ResumeAnalyzerPage";
import AIInterview from "./components/AIInterview/AIInterview"; // ✅ Added AI Interview import
import MyApplicationsPage from "./Pages/MyApplicationsPage";

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

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" zIndex={1000} />
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            {/* ==================== PUBLIC ROUTES ==================== */}
            <Route path="/" element={<HomePages />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* ==================== CANDIDATE ONLY ROUTES ==================== */}
            <Route element={<ProtectedRoute allowedRoles={["candidate"]} redirectTo="/login" />}>
              <Route path="/candidate-dashboard" element={<CandidateDashboardPage />} />
              {/* <Route path="/my-applications" element={<ApplyJobPage />} /> */}
              <Route path="/my-applications" element={<MyApplicationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              {/* <Route path="/apply/:jobId" element={<ApplyPage />} /> */}
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              {/* ✅ Added AI Interview Route */}
              <Route path="/ai-interview/:jobId" element={<AIInterview jobId={""} />} />
            </Route>
            
            {/* ==================== RECRUITER ONLY ROUTES ==================== */}
            <Route element={<ProtectedRoute allowedRoles={["recruiter"]} redirectTo="/login" />}>
              <Route path="/Recruiter-Dashboard" element={<PostedJobManagementpage />} />
              <Route path="/Posted-Jobs" element={<PostedJobPage />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/company/profile" element={<ProfilePage />} />
              <Route path="/find-talent" element={<FindJobs />} />
            </Route>
            
            {/* Dashboard redirect based on role */}
            <Route path="/dashboard" element={<RoleBasedRedirect />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;