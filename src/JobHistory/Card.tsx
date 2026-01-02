import {
  Card,
  Group,
  Text,
  Avatar,
  Badge,
  ActionIcon,
  Stack,
  Divider,
  Button,
} from "@mantine/core";
import { IconCalendarMonth, IconClockHour3, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  jobTitle?: string;
  company?: string;
  applicants?: number;
  experience?: string;
  jobType?: string;
  location?: string;
  package?: string; 
  posted?: string;  
  description?: string;
  logo?: string;
  applied?: boolean; 
  saved?: boolean;   
  offered?: boolean; 
  edit?: boolean;
  interviewing?: boolean;
}

const HistoryCard = (props: JobCardProps) => {
  return (
    <Card
      component={Link}
      to="/Jobs"
      className="!bg-mine-shaft-950 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(255,255,0,0.2)] !border-white hover:!border-bright-sun-400 decoration-none w-full sm:max-w-[350px]"
      radius="xl"
      padding="md"
      withBorder
    >
      {/* Top Section */}
      <Group justify="space-between" align="flex-start">
        <Group gap="sm">
          <Avatar radius="xl" color="gray" src={props.logo}>
            {props.company?.[0] || "∞"}
          </Avatar>
          <Stack gap={0}>
            <Text fw={600} size="lg" className="text-white">{props.jobTitle}</Text>
            <Text size="sm" c="dimmed">{props.company} • {props.applicants} Applicants</Text>
          </Stack>
        </Group>

        <ActionIcon 
          variant="subtle" 
          color={props.saved ? "brightSun.4" : "gray"} 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          {props.saved ? <IconHeartFilled size={20} /> : <IconHeart size={20} />}
        </ActionIcon>
      </Group>

      {/* Tags */}
      <Group gap="xs" mt="md">
        <Badge color="violet" variant="light" radius="xl">{props.experience}</Badge>
        <Badge color="green" variant="light" radius="xl">{props.jobType}</Badge>
        <Badge color="orange" variant="light" radius="xl">{props.location}</Badge>
      </Group>

      {/* Interviewing Section: Exactly as per screenshot */}
      {props.interviewing && (
        <div className="flex gap-1 items-center mt-3 text-sm text-white">
          <IconCalendarMonth className="text-bright-sun-400" size={18} stroke={1.5} />
          Sun, 25 August &bull; <span className="text-mine-shaft-400">10:00 AM</span>
        </div>
      )}

      {/* Description */}
      <Text size="sm" c="dimmed" mt="md" lineClamp={2}>{props.description}</Text>

      <Divider my="sm" color="mine-shaft.7" />

      {/* Footer: Dynamic Status */}
      <Group justify="space-between">
        <Text fw={600} size="lg" className="text-white">{props.package || "Negotiable"}</Text>
        <div className="flex items-center gap-1 text-xs text-mine-shaft-300">
          <IconClockHour3 size={16} stroke={1.5} />
          <span>
            {props.applied ? "Applied" : props.offered ? "Interviewed" : "Posted"} {props.posted || "10 days"} 
          </span>
        </div>
      </Group>

      {/* Offered Buttons */}
      {props.offered && (
        <div className="mt-4 flex flex-col gap-2">
           <Divider my="sm" color="mineShaft.7" />
           <div className="flex gap-2">
            <Button color="brightSun.4" variant="outline" fullWidth radius="md">Accept</Button>
            <Button color="brightSun.4" variant="light" fullWidth radius="md">Reject</Button>
          </div>
        </div>
      )}

      {props.edit && (
        <Badge color="brightSun.4" variant="filled" fullWidth mt="md" size="lg" className="text-black">
          Manage Job
        </Badge>
      )}
    </Card>
  );
};

export default HistoryCard;