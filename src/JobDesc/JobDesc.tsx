import { Button, Divider, ActionIcon } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { desc } from "../Data/JobDescData";
import DOMpurify from 'dompurify';

import {
  IconBriefcase,
  IconMapPin,
  IconPremiumRights,
  IconRecharging,
} from "@tabler/icons-react";

/* Job info cards */
const card = [
  { name: "Location", icon: IconMapPin, value: "New York" },
  { name: "Experience", icon: IconBriefcase, value: "Expert" },
  { name: "Salary", icon: IconPremiumRights, value: "48 LPA" },
  { name: "Job Type", icon: IconRecharging, value: "Full Time" },
];

/* Required skills */
const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "AWS",
  "Tailwind CSS",
];

const JobDesc = () => {
  const data = DOMpurify.sanitize(desc);
  
  return (
    // CHANGE: 'w-full' rakha hai gap hatane ke liye, par background/border hata diya hai
    <div className="w-full">
      
      {/* ================= Header ================= */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img className="h-14" src="/Icons/Google.png" alt="Google" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl text-white">Software Engineer III</div>
            <div className="text-lg text-mine-shaft-300">
              Google &bull; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <Link to="/apply-job">
            <Button color="brightSun.4" size="sm" variant="light">
              Apply
            </Button>
          </Link>
          <IconBookmark
            className="cursor-pointer text-bright-sun-400"
            stroke={1.5}
            size={26}
          />
        </div>
      </div>

      <Divider my="xl" />

      {/* ================= Job Info Cards ================= */}
      <div className="flex justify-between">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              color="brightSun.4"
              className="!h-12 !w-12"
              variant="light"
              radius="xl"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">{item.value}</div>
          </div>
        ))}
      </div>

      <Divider my="xl" />

      {/* ================= Required Skills ================= */}
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex gap-3 w-full">
          {skills.map((skill, index) => (
            <ActionIcon
              key={index}
              color="brightSun.4"
              variant="light"
              radius="xl"
              className="flex-1 !h-10 font-medium !text-sm flex items-center justify-center"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>

      <Divider my="xl" />

      {/* ================= About the Job ================= */}
      <div 
        className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_*]:text-mine-shaft-300 [&_li]:marker:text-bright-sun-400"
        dangerouslySetInnerHTML={{__html: data}}
      />

      <Divider my="xl" />

      {/* ================= About Company ================= */}
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img className="h-8" src="/Icons/Google.png" alt="Google" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">Google</div>
              <div className="text-mine-shaft-300">10k+ Employees</div>
            </div>
          </div>

          <Link to="/company">
            <Button color="brightSun.4" size="sm" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">
          Google's mission is to organize the world's information and make it universally accessible and useful.
        </div>
      </div>
    </div>
  );
};

export default JobDesc;