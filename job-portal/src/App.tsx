import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footter/Fotter";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import HomePages from "./Pages/HomePages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindJobs from "./Pages/FindJobs";
import ApplyJobPage from "./Pages/ApllyJobPage";
import PostedJobPage from "./Pages/PostedJobPage";
import CandidateDashboardPage from "./Pages/CandidateDashboardPage";
import ProfilePage from "./Pages/ProfilePage";
import { Notifications } from "@mantine/notifications";
import PostedJobManagementpage from "./Pages/PostedJobManagementpage";
import ApplyPage from "./Pages/ApplyPage";
import Login from "./SignUpLogin/Login";
import SignUp from "./SignUpLogin/SignUp";
import { AuthProvider } from "./context/AuthContext";
import JobDetailsPage from "./Pages/JobDetailsPage";
import PostJobPage from "./Pages/PostJobPage";


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
            {/* Public Routes */}
            <Route path="/" element={<HomePages />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/apply-job" element={<ApplyJobPage />} />
            <Route path="/apply/:jobId" element={<ApplyPage />} />
            
            {/* Auth Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route path="/candidate-dashboard" element={<CandidateDashboardPage />} />
            <Route path="/Recruiter-Dashboard" element={<PostedJobManagementpage />} />
            <Route path="/Posted-Jobs" element={<PostedJobPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePages />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/post-job" element={<PostJobPage />} />

          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;