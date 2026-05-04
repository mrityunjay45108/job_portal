// import React from "react";
// import { Search, MapPin, Briefcase, Sparkles, IndianRupee, Filter, X, SlidersHorizontal } from "lucide-react";

// interface Filters {
//   name: string;
//   jobTitle: string;
//   location: string;
//   skills: string;
//   salaryRange: [number, number];
// }

// interface SearchBarProps {
//   filters: Filters;
//   setFilters: (filters: Filters) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ filters, setFilters }) => {
//   const clearFilters = () => {
//     setFilters({
//       name: '',
//       jobTitle: '',
//       location: '',
//       skills: '',
//       salaryRange: [1, 100]
//     });
//   };

//   const hasActiveFilters = filters.name || filters.jobTitle || filters.location || filters.skills;
//   const activeFilterCount = [filters.name, filters.jobTitle, filters.location, filters.skills].filter(Boolean).length;

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-lg mb-8 overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <SlidersHorizontal size={18} className="text-blue-600" />
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">Advanced Search Filters</h3>
//               <p className="text-xs text-gray-500">Find the perfect candidate</p>
//             </div>
//           </div>
//           {activeFilterCount > 0 && (
//             <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//               {activeFilterCount} active
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <Filter size={18} className="text-blue-600" />
//             <h3 className="font-semibold text-gray-900">Filter Candidates</h3>
//           </div>
//           {hasActiveFilters && (
//             <button 
//               onClick={clearFilters}
//               className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition px-3 py-1 rounded-lg hover:bg-red-50"
//             >
//               <X size={14} />
//               Clear all filters
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//           {/* Talent Name */}
//           <div className="space-y-2">
//             <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
//               <Search size={14} className="text-blue-500" /> Candidate Name
//             </label>
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={filters.name}
//               onChange={(e) => setFilters({ ...filters, name: e.target.value })}
//               className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-4 py-3 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-gray-400"
//             />
//           </div>

//           {/* Job Title */}
//           <div className="space-y-2">
//             <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
//               <Briefcase size={14} className="text-blue-500" /> Role/Title
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Frontend Developer"
//               value={filters.jobTitle}
//               onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
//               className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-4 py-3 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-gray-400"
//             />
//           </div>

//           {/* Location */}
//           <div className="space-y-2">
//             <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
//               <MapPin size={14} className="text-blue-500" /> Location
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Remote, New York"
//               value={filters.location}
//               onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//               className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-4 py-3 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-gray-400"
//             />
//           </div>

//           {/* Skills */}
//           <div className="space-y-2">
//             <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
//               <Sparkles size={14} className="text-blue-500" /> Key Skills
//             </label>
//             <input
//               type="text"
//               placeholder="React, Node.js, Python..."
//               value={filters.skills}
//               onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
//               className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl px-4 py-3 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none placeholder:text-gray-400"
//             />
//           </div>
//         </div>

//         {/* Salary Range Section */}
//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <IndianRupee size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h4 className="text-gray-900 text-sm font-medium">Expected Salary (LPA)</h4>
//                 <p className="text-blue-600 font-bold text-lg">
//                   Up to ₹{filters.salaryRange[1]} <span className="text-xs font-normal text-gray-500">LPA</span>
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex-1 max-w-xl">
//               <input
//                 type="range"
//                 min="1"
//                 max="100"
//                 value={filters.salaryRange[1]}
//                 onChange={(e) =>
//                   setFilters({
//                     ...filters,
//                     salaryRange: [filters.salaryRange[0], parseInt(e.target.value)],
//                   })
//                 }
//                 className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 style={{
//                   background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${filters.salaryRange[1]}%, #e5e7eb ${filters.salaryRange[1]}%, #e5e7eb 100%)`,
//                 }}
//               />
//               <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
//                 <span>1 LPA</span>
//                 <span>25 LPA</span>
//                 <span>50 LPA</span>
//                 <span>75 LPA</span>
//                 <span>100 LPA</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Button */}
//         <div className="mt-6 pt-4">
//           <button 
//             onClick={() => {}} 
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             <Search size={16} className="inline mr-2" />
//             Search Candidates
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;