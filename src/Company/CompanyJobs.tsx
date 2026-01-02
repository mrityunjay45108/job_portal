import { Button, Badge } from "@mantine/core";
import { IconBookmark, IconClock } from "@tabler/icons-react";

export const CompanyJobCard = ({ job }: { job: any }) => (
  <div className="bg-mine-shaft-900/40 p-6 rounded-2xl border border-mine-shaft-800 flex justify-between items-center hover:border-bright-sun-400 transition-all group">
    <div className="flex flex-col gap-2">
      <h4 className="text-xl font-bold text-white group-hover:text-bright-sun-400">
        {job.title}
      </h4>
      <div className="flex items-center gap-3 text-sm text-mine-shaft-400">
        <span>{job.location}</span>
        <span>•</span>
        <Badge color="brightSun.4" variant="outline" size="sm">
          {job.type}
        </Badge>
        <span>•</span>
        <span className="text-bright-sun-400 font-semibold">{job.salary}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-mine-shaft-500 mt-1">
        <IconClock size={14} /> Posted {job.posted}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <IconBookmark className="text-mine-shaft-400 cursor-pointer hover:text-bright-sun-400 transition-colors" />
      <Button variant="light" color="brightSun.4" radius="md">
        View Details
      </Button>
    </div>
  </div>
);
