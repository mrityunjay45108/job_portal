import Header from "../Header/Header";
import DreamJob from "../LandingPage/DreamJob";
import Companies from "../LandingPage/Companies";
import JobCategorie from "../LandingPage/JobCategorie";
import JobSeekerJourney from "../LandingPage/JobSeekersJourney";
import Footer from "../Footter/Fotter";
import InternshipSection from "../LandingPage/Internships";
import OurNumbersSection from "../LandingPage/ourmembers";

const HomePages = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <Header/>
      <DreamJob/>
      <Companies/>
        <JobSeekerJourney/>
      <JobCategorie/>
      <InternshipSection/>
      <OurNumbersSection/>
      <Footer/>
    </div>
  );
}

export default HomePages;
