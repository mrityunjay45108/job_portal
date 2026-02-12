import { Button, Badge, ActionIcon } from "@mantine/core";
import { IconBookmark, IconClock, IconMapPin } from "@tabler/icons-react";

export const CompanyJobCard = ({ job }: { job: any }) => (
  <div className="bg-mine-shaft-900/40 p-4 sm:p-6 rounded-2xl border border-mine-shaft-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-bright-sun-400 transition-all group">
    
    {/* Left Section: Job Info */}
    <div className="flex flex-col gap-2">
      <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-bright-sun-400 transition-colors">
        {job.title}
      </h4>
      
      {/* Detail Chips */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-mine-shaft-400">
        <span className="flex items-center gap-1">
          <IconMapPin size={14} className="sm:hidden" /> {job.location}
        </span>
        
        {/* Responsive dots: hidden on mobile when things wrap */}
        <span className="hidden sm:inline text-mine-shaft-600">•</span>
        
        <Badge 
          color="brightSun.4" 
          variant="outline" 
          size="xs" 
          className="sm:!text-xs !text-[10px]"
        >
          {job.type}
        </Badge>
        
        <span className="hidden sm:inline text-mine-shaft-600">•</span>
        
        <span className="text-bright-sun-400 font-semibold">{job.salary}</span>
      </div>

      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-mine-shaft-500 mt-1">
        <IconClock size={14} /> Posted {job.posted}
      </div>
    </div>

    {/* Right Section: Actions */}
    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pt-3 sm:pt-0 border-t sm:border-none border-mine-shaft-800">
      <ActionIcon 
        variant="subtle" 
        color="gray" 
        size="lg" 
        className="text-mine-shaft-400 hover:text-bright-sun-400 transition-colors"
      >
        <IconBookmark size={22} stroke={1.5} />
      </ActionIcon>
      
      <Button 
        variant="light" 
        color="brightSun.4" 
        radius="md" 
        className="flex-1 sm:flex-none"
      >
        View Details
      </Button>
    </div>
  </div>
);