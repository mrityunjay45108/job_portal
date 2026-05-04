// import { Divider, Button, Container, Skeleton } from "@mantine/core";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, UserCheck } from "lucide-react";
// import { useState, useEffect } from "react";
// // import Profile from "../TalentProfile/Profile";
// import { talentData } from "../Data/TalentData";
// // import Recommend from "../TalentProfile/Recommended";

// const TalentProfilePage = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true);
//   const profile = talentData.find((talent: any) => String(talent.id) === id);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
//         <Container size="xl" className="px-4 py-6">
//           <Skeleton height={40} width={120} radius="xl" className="mb-6" />
//           <div className="flex flex-col lg:flex-row gap-6">
//             <div className="w-full lg:w-[68%]">
//               <Skeleton height={500} radius="xl" />
//             </div>
//             <div className="w-full lg:w-[32%]">
//               <Skeleton height={400} radius="xl" />
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 p-10">
//         <div className="text-center max-w-md mx-auto">
//           <div className="text-6xl mb-4">🔍</div>
//           <h2 className="text-2xl font-bold mb-2">Talent not found!</h2>
//           <p className="text-gray-500 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
//           <Link to="/find-talent">
//             <Button variant="filled" color="blue" radius="xl">
//               Back to Find Talent
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 font-['Poppins']">
//       <Container size="xl" className="px-4 py-6">
//         <Divider className="mb-4 border-gray-200" />

//         {/* Back Button */}
//         <Link to="/find-talent">
//           <Button
//             variant="light"
//             color="blue"
//             leftSection={<ArrowLeft size={16} />}
//             radius="xl"
//             className="mb-6 hover:bg-blue-50 transition-all hover:translate-x-[-2px]"
//           >
//             Back to Search
//           </Button>
//         </Link>

//         {/* Main Content Grid */}
//         <div className="flex flex-col lg:flex-row gap-6 items-start">
//           {/* Left Section - Profile */}
//           <div className="w-full lg:w-[68%]">
//             <Profile {...profile} />
//           </div>

//           {/* Right Section - Recommendations */}
//           <div className="w-full lg:w-[32%] sticky top-6">
//             <Recommend />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default TalentProfilePage;