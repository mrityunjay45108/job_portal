import React from "react";
import { Heart, MapPin, Clock } from "lucide-react";
import { Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";

interface Job {
  id: string | number;
  avatar?: string;
  name: string;
  title: string;
  company: string;
  skills: string[];
  location: string;
  postedDaysAgo: number | string;
}

interface JobCardProps {
  job: Job;
  isFavorite: boolean;
  onToggleFavorite: (id: string | number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isFavorite, onToggleFavorite }) => {
  // Formal avatar generator matching your theme
  const formalAvatar = job.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.name)}&background=2d2d2d&color=eab308&bold=true`;

  return (
    <div className="group relative bg-mine-shaft-950 rounded-2xl p-6 border border-x-mine-shaft-100
                    hover:border-yellow-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(234,179,8,0.2)] 
                    transition-all duration-300 ease-out cursor-pointer">
      
      {/* 1. Header Section: Avatar, Title, and Heart */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative overflow-hidden rounded-xl w-14 h-14 bg-mine-shaft-800 border border-mine-shaft-100/50">
            <img 
              src={formalAvatar} 
              alt={job.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg group-hover:text-yellow-500 transition-colors duration-300">
              {job.name}
            </h3>
            <p className="text-gray-400 text-xs font-medium mt-0.5">
              {job.title} • <span className="text-gray-300">{job.company}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(job.id); }} 
          className="p-2 rounded-full hover:bg-mine-shaft-800 transition-colors focus:outline-none"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-gray-500 group-hover:text-gray-300"}`} />
        </button>
      </div>

      {/* 2. Skills Badges Section */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills?.map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1 text-yellow-500 text-[10px] uppercase font-bold tracking-wider border border-yellow-500/30 rounded-lg group-hover:bg-yellow-500 group-hover:text-gray-900 group-hover:border-yellow-500 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* 3. Footer Info Section (Location & Time) */}
      <div className="flex items-center justify-between text-[11px] pt-4 border-t border-mine-shaft-100/10">
        <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-300 transition-colors">
          <MapPin className="w-3.5 h-3.5 text-yellow-500/70" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-blue-400 transition-colors">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">Posted {job.postedDaysAgo} days ago</span>
        </div>
      </div>

      <Divider color="mineShaft.7" size="xs" my="md" />

      {/* 4. Action Buttons: Profile and Message */}
      <div className="flex gap-2">
        <Link to={`/talent-profile/${job.id}`} className="flex-1">
          <Button 
            variant="outline" 
            color="yellow" 
            fullWidth 
            size="xs" 
            radius="md"
            className="hover:bg-yellow-500/10 transition-colors"
          >
            Profile
          </Button>
        </Link>
        <div className="flex-1">
          <Button 
            variant="light" 
            color="yellow" 
            fullWidth 
            size="xs" 
            radius="md"
            className="hover:bg-yellow-500 hover:text-black transition-all"
          >
            Message
          </Button>
        </div>
      </div>

      {/* Decorative Hover Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default JobCard;