import React from "react";
import { Search, MapPin, Briefcase, Sparkles, IndianRupee } from "lucide-react";

interface Filters {
  name: string;
  jobTitle: string;
  location: string;
  skills: string;
  salaryRange: [number, number];
}

interface SearchBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ filters, setFilters }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 mb-8 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Talent Name */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Search className="w-3 h-3 text-yellow-500" /> Talent Name
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="w-full bg-gray-900/50 text-white text-sm rounded-xl px-4 py-3 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
          />
        </div>

        {/* Job Title */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-3 h-3 text-yellow-500" /> Role
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Dev"
            value={filters.jobTitle}
            onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
            className="w-full bg-gray-900/50 text-white text-sm rounded-xl px-4 py-3 border border-gray-700 focus:border-yellow-500 transition-all outline-none"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-3 h-3 text-yellow-500" /> Location
          </label>
          <input
            type="text"
            placeholder="e.g. Remote, Delhi"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-gray-900/50 text-white text-sm rounded-xl px-4 py-3 border border-gray-700 focus:border-yellow-500 transition-all outline-none"
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-yellow-500" /> Skills
          </label>
          <input
            type="text"
            placeholder="React, Node..."
            value={filters.skills}
            onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
            className="w-full bg-gray-900/50 text-white text-sm rounded-xl px-4 py-3 border border-gray-700 focus:border-yellow-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Salary Slider Section */}
      <div className="mt-8 pt-6 border-t border-gray-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <IndianRupee className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-white text-sm font-medium">Salary Expectation</h4>
              <p className="text-yellow-500 font-bold text-lg">
                Up to ₹{filters.salaryRange[1]} <span className="text-xs font-normal text-gray-400">LPA</span>
              </p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl">
            <input
              type="range"
              min="1"
              max="100"
              value={filters.salaryRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  salaryRange: [filters.salaryRange[0], parseInt(e.target.value)],
                })
              }
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              style={{
                background: `linear-gradient(to right, #eab308 0%, #eab308 ${filters.salaryRange[1]}%, #374151 ${filters.salaryRange[1]}%, #374151 100%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
              <span>1 LPA</span>
              <span>100 LPA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;