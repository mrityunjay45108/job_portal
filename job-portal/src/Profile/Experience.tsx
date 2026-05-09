import {
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconBuilding,
  IconClock,
} from "@tabler/icons-react";
import { Badge, Tooltip } from "@mantine/core";

interface ExperienceProps {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  technologies?: string[];
  companyIcon?: string;
  currentlyWorking?: boolean;
}

const Experience = (props: ExperienceProps) => {
  const isCurrent = props.currentlyWorking || props.endDate === "Present";
  const endDateDisplay = isCurrent ? "Present" : props.endDate;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-blue-200">
      <div className="flex flex-wrap justify-between gap-4">
        {/* Left Section */}
        <div className="flex gap-4 flex-1">
          {/* Logo Container */}
          <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl h-fit group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
            <img
              className="h-10 w-10 object-contain"
              src={
                props.companyIcon ||
                `/Icons/${props.company?.toLowerCase()}.png`
              }
              alt={props.company}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/Icons/default-company.png";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
              {props.title || "Position Title"}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <IconBuilding size={14} className="text-gray-400" />
                <span className="font-medium">
                  {props.company || "Company Name"}
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <IconMapPin size={14} className="text-gray-400" />
                <span>{props.location || "Location"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Date */}
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full h-fit group-hover:bg-blue-50 transition-all duration-300">
          <IconCalendar size={14} className="text-blue-500" />
          <span className="font-medium">
            {props.startDate || "Start Date"} - {endDateDisplay}
          </span>
          {isCurrent && (
            <Tooltip label="Current Position">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Description */}
      {props.description && (
        <div className="mt-4 pl-14">
          <p className="text-gray-600 text-sm leading-relaxed">
            {props.description}
          </p>
        </div>
      )}

      {/* Tech Stack Tags */}
      {props.technologies && props.technologies.length > 0 && (
        <div className="mt-4 pl-14">
          <div className="flex flex-wrap gap-2">
            {props.technologies.map((tech: string, idx: number) => (
              <Badge
                key={idx}
                size="sm"
                variant="light"
                color="gray"
                className="bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-default"
                radius="xl"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
