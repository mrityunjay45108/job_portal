import {
  Card,
  Group,
  Text,
  Avatar,
  Badge,
  ActionIcon,
  Stack,
  Divider,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const JobCard = (props: any) => {
  return (
    <Card
      // Link ke liye component prop use karein
      component={Link}
      to="/Jobs"
      // Aapki original Tailwind classes aur Mantine props
      className="!bg-mine-shaft-950 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(255,255,0,0.2)] !border-white hover:!border-bright-sun-400 decoration-none "
      radius="xl"
      padding="md"
      withBorder
    >
      {/* Top Section */}
      <Group justify="space-between" align="flex-start">
        <Group gap="sm">
          <Avatar radius="xl" color="gray" src={props.logo}>
            {props.companyName?.[0] || "∞"}
          </Avatar>

          <Stack gap={0}>
            <Text fw={600} size="lg" className="text-white">
              {props.jobTitle}
            </Text>
            <Text size="sm" c="dimmed">
              {props.companyName} • {props.applicants} Applicants
            </Text>
          </Stack>
        </Group>

        <ActionIcon 
          variant="subtle" 
          color="gray" 
          onClick={(e) => {
            e.preventDefault(); // Isse card click trigger nahi hoga
            console.log("Wishlist clicked");
          }}
        >
          <IconHeart size={18} />
        </ActionIcon>
      </Group>

      {/* Tags */}
      <Group gap="xs" mt="md">
        <Badge color="violet" variant="light" radius="xl">{props.experience}</Badge>
        <Badge color="green" variant="light" radius="xl">{props.jobType}</Badge>
        <Badge color="orange" variant="light" radius="xl">{props.location}</Badge>
      </Group>

      {/* Description */}
      <Text size="sm" c="dimmed" mt="md" lineClamp={2}>
        {props.description}
      </Text>

      <Divider my="sm" color="mine-shaft.7" />

      {/* Footer */}
      <Group justify="space-between">
        <Text fw={600} size="lg" className="text-white">
          {props.package}
        </Text>
        <Text size="sm" c="dimmed">
          {props.posted}
        </Text>
      </Group>
    </Card>
  );
};

export default JobCard;