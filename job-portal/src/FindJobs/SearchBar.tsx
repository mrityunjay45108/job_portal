import { useState } from "react";
import { Button, TextInput, Group, Paper } from "@mantine/core";
import { IconSearch, IconMapPin, IconFilter } from "@tabler/icons-react";
import MultiSelectCreatable from "./Multiinputs";
import Filters from "./Filters";

interface SearchBarProps {
  onSearch?: (term: string) => void;
  onLocationChange?: (loc: string) => void; // Change to string only
}

const SearchBar = ({ onSearch, onLocationChange }: SearchBarProps) => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const skills = [
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Python",
    "Java",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Next.js",
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];
  const experienceLevels = [
    "0-1 years",
    "1-3 years",
    "3-5 years",
    "5-7 years",
    "7+ years",
  ];

  const handleSearch = () => {
    if (onSearch) onSearch(jobTitle);
    if (onLocationChange) onLocationChange(location);
  };

  const handleLocationChangeWrapper = (loc: string | null) => {
    if (loc && onLocationChange) {
      onLocationChange(loc);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <Paper
        shadow="md"
        radius="xl"
        className="bg-white border border-gray-200 overflow-hidden"
        p={0}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex-1 px-6 py-4">
            <div className="flex items-center gap-3">
              <IconSearch className="text-blue-500" size={20} />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-400 outline-none text-base font-medium"
              />
            </div>
          </div>

          <div className="flex-1 px-6 py-4">
            <div className="flex items-center gap-3">
              <IconMapPin className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-400 outline-none text-base font-medium"
              />
            </div>
          </div>

          <div className="px-4 py-3 md:py-0">
            <Button
              size="lg"
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-8 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Search Jobs
            </Button>
          </div>
        </div>
      </Paper>

      <div className="flex justify-center mt-4">
        <Button
          variant="light"
          color="blue"
          onClick={() => setShowFilters(!showFilters)}
          leftSection={<IconFilter size={16} />}
          className="hover:bg-blue-50"
          radius="xl"
          size="sm"
        >
          {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
        </Button>
      </div>

      {showFilters && (
        <div className="mt-6">
          <Filters setLocation={handleLocationChangeWrapper} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <MultiSelectCreatable
          options={skills}
          placeholder="Select Skills"
          icon={IconSearch}
        />
        <MultiSelectCreatable
          options={jobTypes}
          placeholder="Job Type"
          icon={IconSearch}
        />
        <MultiSelectCreatable
          options={experienceLevels}
          placeholder="Experience Level"
          icon={IconSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
