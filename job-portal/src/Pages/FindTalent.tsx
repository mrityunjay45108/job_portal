import React, { useState } from "react"; // Added useState import
import { BarChart3 } from "lucide-react"; // Added icon import

// 1. Import your local components
// Adjust these paths based on your actual file structure
import SearchBar from "../FindTalent/SearchBar2"; 
import TalentCard from "../FindTalent/JobCard"; // Assuming JobCard is used for TalentCard

// 2. Import your data
import { talentData } from "../Data/TalentData";

// 3. Define the Talent Interface for TypeScript
interface Talent {
  id: string | number;
  name: string;
  title: string;
  location: string;
  skills: string[];
  salary: number;
  avatar?: string;
  company: string;
  postedDaysAgo: number | string;
}

const FindTalent: React.FC = () => {
  // Define the state with specific types
  const [filters, setFilters] = useState({
    name: '',
    jobTitle: '',
    location: '',
    skills: '',
    salaryRange: [1, 100] as [number, number]
  });

  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());

  const toggleFavorite = (id: string | number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Type-safe filtering
  const filteredTalents = (talentData as Talent[]).filter(talent => {
    const matchesName = talent.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesTitle = talent.title.toLowerCase().includes(filters.jobTitle.toLowerCase());
    const matchesLocation = talent.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesSkills = filters.skills === '' || talent.skills.some((skill: string) => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    );
    
    const matchesSalary = talent.salary >= filters.salaryRange[0] && talent.salary <= filters.salaryRange[1];
    
    return matchesName && matchesTitle && matchesLocation && matchesSkills && matchesSalary;
  });

  return (
    <div className="min-h-screen bg-mine-shaft-950 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <SearchBar filters={filters} setFilters={setFilters} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-medium">
            Talents
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-yellow-500 rounded-lg border border-yellow-500 hover:bg-gray-800 transition-colors text-sm">
            Relevance
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTalents.map((talent: Talent) => (
            <TalentCard
              key={talent.id}
              job={talent} // Passing talent as the 'job' prop expected by JobCard
              isFavorite={favorites.has(talent.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-base">No talents found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #eab308;
          cursor: pointer;
          border: 2px solid #1f2937;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #eab308;
          cursor: pointer;
          border: 2px solid #1f2937;
        }
      `}</style>
    </div>
  );
};

export default FindTalent;