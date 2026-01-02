import './App.css';
import Header from './Header/Header';
import Footer from './Footter/Fotter';
import { Divider, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/carousel/styles.css';
import HomePages from './Pages/HomePages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FindJobs from './Pages/FindJobs';
import FindTalent from './Pages/FindTalent';
import TalentProfilePage from './FindTalent/TalentProfile';
import PostJobPage from './Pages/PostJobPage';
import JobDescPage from './Pages/JobDescPage';
import ApplyJobPage from './Pages/ApllyJobPage';
import CompanyPage from './Pages/CompanyPage';
import PostedJobPage from './Pages/PostedJobPage';
import JobHistoryPage from './Pages/JobsHistoryPage';
import SignUpPage from './Pages/SignUpPage';
import ProfilePage from './Pages/ProfilePage';

function App() {
  const theme = createTheme({
    colors: {
      brightSun: [
        '#fffbeb', '#fff3c6', '#ffe588', '#ffd149', '#ffbd20',
        '#ff9907', '#dd7302', '#b75006', '#943c0c', '#7a330d',
        '#461902',
      ],
      mineShaft: [
        '#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888',
        '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d',
        '#2d2d2d',
      ],
      
      
    },
    fontFamily: "poppians, sans-serif"
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <BrowserRouter>
        <Header />
       
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/Jobs" element={<JobDescPage />} />
          <Route path="/apply-job" element={<ApplyJobPage />} />
          <Route path="/post-jobs" element={<PostJobPage />} />
          <Route path="/Company" element={<CompanyPage />} />
          <Route path="/Posted-Jobs" element={<PostedJobPage />} />
          <Route path="/Jobs-History" element={<JobHistoryPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login" element={<SignUpPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
          <Route path="*" element={<HomePages />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
