// import React, { useState, useEffect } from "react";
// import { BarChart3, Users, ChevronDown } from "lucide-react";
// import { Container, Pagination, Skeleton } from "@mantine/core";
// import SearchBar from "../FindTalent/SearchBar2";
// import TalentCard from "../FindTalent/JobCard";
// import { talentData } from "../Data/TalentData";

// interface Talent {
//   id: string | number;
//   name: string;
//   title: string;
//   location: string;
//   skills: string[];
//   salary: number;
//   avatar?: string;
//   company: string;
//   postedDaysAgo: number | string;
//   experience?: string | any[];
//   rating?: number;
//   about?: string;
// }

// const FindTalent: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     name: '',
//     jobTitle: '',
//     location: '',
//     skills: '',
//     salaryRange: [1, 100] as [number, number]
//   });
//   const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
//   const [sortBy, setSortBy] = useState("relevance");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleFavorite = (id: string | number) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(id)) {
//       newFavorites.delete(id);
//     } else {
//       newFavorites.add(id);
//     }
//     setFavorites(newFavorites);
//   };

//   // Helper function to convert experience array to string
//   const getExperienceString = (experience: any): string => {
//     if (!experience) return '';
//     if (typeof experience === 'string') return experience;
//     if (Array.isArray(experience) && experience.length > 0) {
//       // Calculate total years of experience
//       const currentYear = new Date().getFullYear();
//       let totalYears = 0;
//       experience.forEach((exp: any) => {
//         const startYear = parseInt(exp.startDate) || 0;
//         const endYear = exp.endDate === 'Present' ? currentYear : (parseInt(exp.endDate) || startYear);
//         totalYears += (endYear - startYear);
//       });
//       return `${totalYears}+ years`;
//     }
//     return '';
//   };

//   const filteredTalents = (talentData as Talent[]).filter(talent => {
//     const matchesName = talent.name.toLowerCase().includes(filters.name.toLowerCase());
//     const matchesTitle = talent.title.toLowerCase().includes(filters.jobTitle.toLowerCase());
//     const matchesLocation = talent.location.toLowerCase().includes(filters.location.toLowerCase());
    
//     const matchesSkills = filters.skills === '' || (talent.skills && talent.skills.some((skill: string) => 
//       skill.toLowerCase().includes(filters.skills.toLowerCase())
//     ));
    
//     const matchesSalary = talent.salary >= filters.salaryRange[0] && talent.salary <= filters.salaryRange[1];
    
//     return matchesName && matchesTitle && matchesLocation && matchesSkills && matchesSalary;
//   });

//   const getSortedTalents = () => {
//     let sorted = [...filteredTalents];
//     switch(sortBy) {
//       case "salary-high":
//         sorted.sort((a, b) => b.salary - a.salary);
//         break;
//       case "salary-low":
//         sorted.sort((a, b) => a.salary - b.salary);
//         break;
//       case "recent":
//         sorted.sort((a, b) => Number(b.postedDaysAgo) - Number(a.postedDaysAgo));
//         break;
//       default:
//         break;
//     }
//     return sorted;
//   };

//   const sortedTalents = getSortedTalents();
//   const paginatedTalents = sortedTalents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   const totalPages = Math.ceil(sortedTalents.length / itemsPerPage);

//   // Transform talent data for JobCard (convert experience array to string)
//   const transformForJobCard = (talent: Talent) => ({
//     id: talent.id,
//     name: talent.name,
//     title: talent.title,
//     company: talent.company,
//     location: talent.location,
//     skills: talent.skills,
//     salary: talent.salary,
//     postedDaysAgo: talent.postedDaysAgo,
//     avatar: talent.avatar,
//     experience: getExperienceString(talent.experience), // Convert array to string
//     rating: talent.rating,
//     about: talent.about
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
//         <Container size="xl" className="py-6 px-4 sm:px-6">
//           <div className="mb-8">
//             <Skeleton height={40} width={250} radius="md" />
//             <Skeleton height={20} width={300} radius="md" className="mt-2" />
//           </div>
//           <Skeleton height={120} radius="xl" className="mb-8" />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <Skeleton key={i} height={280} radius="xl" />
//             ))}
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
//       <Container size="xl" className="py-6 px-4 sm:px-6">
        
//         {/* Header with Stats */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//             <div>
//               <div className="flex items-center gap-2 mb-1">
//                 <div className="p-2 bg-blue-100 rounded-lg">
//                   <Users size={20} className="text-blue-600" />
//                 </div>
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Talent</h1>
//               </div>
//               <p className="text-gray-500 text-sm">Connect with top professionals worldwide</p>
//             </div>
//             <div className="flex gap-3">
//               <div className="bg-blue-50 rounded-xl px-4 py-2 text-center min-w-[80px]">
//                 <div className="text-2xl font-bold text-blue-600">{filteredTalents.length}</div>
//                 <div className="text-xs text-gray-500">Profiles</div>
//               </div>
//               <div className="bg-green-50 rounded-xl px-4 py-2 text-center min-w-[80px]">
//                 <div className="text-2xl font-bold text-green-600">{favorites.size}</div>
//                 <div className="text-xs text-gray-500">Shortlisted</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <SearchBar filters={filters} setFilters={setFilters} />

//         {/* Sort Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <div className="flex items-center gap-2">
//             <Users size={18} className="text-blue-600" />
//             <h2 className="text-gray-900 font-semibold">
//               {sortedTalents.length} Talent Profiles
//             </h2>
//           </div>
          
//           <button 
//             onClick={() => setSortBy(sortBy === "relevance" ? "salary-high" : 
//               sortBy === "salary-high" ? "salary-low" : 
//               sortBy === "salary-low" ? "recent" : "relevance")}
//             className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all text-sm font-medium"
//           >
//             <BarChart3 size={16} />
//             Sort: {sortBy === "relevance" ? "Relevance" : 
//                    sortBy === "salary-high" ? "Salary: High to Low" :
//                    sortBy === "salary-low" ? "Salary: Low to High" : "Most Recent"}
//             <ChevronDown size={14} />
//           </button>
//         </div>

//         {/* Talent Grid */}
//         {sortedTalents.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {paginatedTalents.map((talent: Talent) => (
//                 <TalentCard
//                   key={talent.id}
//                   job={transformForJobCard(talent)}
//                   isFavorite={favorites.has(talent.id)}
//                   onToggleFavorite={toggleFavorite}
//                 />
//               ))}
//             </div>
//             {totalPages > 1 && (
//               <div className="mt-8 flex justify-center">
//                 <Pagination
//                   total={totalPages}
//                   value={currentPage}
//                   onChange={setCurrentPage}
//                   color="blue"
//                   radius="xl"
//                   size="md"
//                 />
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
//             <div className="text-6xl mb-4">🔍</div>
//             <p className="text-gray-500 text-lg">No talents found matching your criteria</p>
//             <p className="text-gray-400 text-sm mt-1">Try adjusting your search filters</p>
//             <button 
//               onClick={() => {
//                 setFilters({ name: '', jobTitle: '', location: '', skills: '', salaryRange: [1, 100] });
//                 setCurrentPage(1);
//               }}
//               className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default FindTalent;