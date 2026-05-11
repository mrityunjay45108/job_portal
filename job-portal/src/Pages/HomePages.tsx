// import DreamJob from "../LandingPage/DreamJob";
// import Companies from "../LandingPage/Companies";
// import JobCategorie from "../LandingPage/JobCategorie";
// import Footer from "../Footter/Fotter";
// import InternshipSection from "../LandingPage/Internships";
// import OurNumbersSection from "../LandingPage/ourmembers";
// import JobSeekerJourney from "../LandingPage/JobSeekersJourney";

// const HomePages = () => {
//   return (
//     <div className="min-h-screen bg-white font-['Poppins'] selection:bg-blue-200/50">
//       <main className="relative flex flex-col">
//         {/* Hero Section */}
//         <section>
//           <DreamJob />
//         </section>

//         {/* Trusted Companies Section */}
//         <section className="border-y border-gray-100 bg-white">
//           <Companies />
//         </section>

//         {/* --- GAP ADJUSTED HERE --- */}
//         {/* gap-24 se kam karke gap-12 kiya gaya hai aur py-20 se py-10 */}
//         <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-12 py-10 px-4 md:px-10 lg:px-20">
          
//           <JobCategorie />
          
//           <section className="relative">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent rounded-[3rem] -z-10" />
//             <InternshipSection />
//           </section>

//           <JobSeekerJourney />
          
//           <OurNumbersSection />
//         </div>
//       </main>

     
//     </div>
//   );
// };

// export default HomePages;


import DreamJob from "../LandingPage/DreamJob";
import Companies from "../LandingPage/Companies";
import JobCategorie from "../LandingPage/JobCategorie";
import Footer from "../Footter/Fotter";
import InternshipSection from "../LandingPage/Internships";
import OurNumbersSection from "../LandingPage/ourmembers";
import JobSeekerJourney from "../LandingPage/JobSeekersJourney";

const HomePages = () => {
  return (
    <div className="min-h-screen bg-white font-['Poppins'] selection:bg-blue-200/50">
      <main className="relative flex flex-col">
        
        {/* Hero Section */}
        <DreamJob />

        {/* Trusted Companies Section */}
        <div className="border-y border-gray-100 bg-white">
          <Companies />
        </div>

        {/* Compact Container with consistent small gaps */}
        <div className="max-w-[1440px] mx-auto w-full flex flex-col px-4 md:px-10 lg:px-20 space-y-8">
          
          <JobCategorie />
          
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent rounded-[3rem] -z-10" />
            <InternshipSection />
          </section>

          <JobSeekerJourney />
          
          <OurNumbersSection />
          
        </div>
      </main>
    </div>
  );
};

export default HomePages;