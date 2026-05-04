import { useState } from "react";
import { Select, RangeSlider, Checkbox, Paper } from "@mantine/core";

interface FiltersProps {
  setLocation?: (loc: string | null) => void;
  setSort?: (sort: string | null) => void;
}

const Filters = ({ setLocation, setSort }: FiltersProps) => {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([30000, 150000]);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const locations = [
    "Remote",
    "New York, NY",
    "San Francisco, CA",
    "Austin, TX",
    "Seattle, WA",
    "Chicago, IL",
    "Boston, MA",
    "Los Angeles, CA"
  ];

  const sortOptions = [
    "Relevance",
    "Most Recent",
    "Salary (High to Low)",
    "Salary (Low to High)"
  ];

  return (
    <Paper shadow="sm" radius="lg" className="bg-white border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <Select
            placeholder="Select location"
            data={locations}
            onChange={setLocation}
            clearable
            classNames={{
              input: "bg-white border-gray-300 text-gray-900",
              dropdown: "bg-white border-gray-200"
            }}
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <Select
            placeholder="Sort by"
            data={sortOptions}
            onChange={setSort}
            clearable
            classNames={{
              input: "bg-white border-gray-300 text-gray-900",
              dropdown: "bg-white border-gray-200"
            }}
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Salary Range
          </label>
          <RangeSlider
            min={0}
            max={200000}
            step={5000}
            value={salaryRange}
            onChange={setSalaryRange}
            label={(value) => `$${value.toLocaleString()}`}
            color="blue"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>${salaryRange[0].toLocaleString()}</span>
            <span>${salaryRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Work Type
          </label>
          <Checkbox
            label="Remote Only"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.currentTarget.checked)}
            color="blue"
          />
        </div>
      </div>
    </Paper>
  );
};

export default Filters;