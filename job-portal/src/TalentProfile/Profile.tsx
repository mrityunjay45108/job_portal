import { Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import Experience from "./Experience";
import Certification from "./CertiCard";
import MessageModal from "../MessageModal/MessageModal";

const Profile = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    // Yahan w-2/3 hata kar w-full kar diya hai taaki sidebar ke liye jagah bane
    <div className="w-full mt-6 ">
      
      {/* Banner Section */}
      <div className="relative">
        <img
          src={props.banner || "/TalentProfile/ProfileBanner.avif"}
          alt="Banner"
          className="w-full h-48 object-cover rounded-xl"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-20 left-6">
          <img
            src={props.avatar || "/TalentProfile/Piccc.jpeg"}
            alt="Profile"
            className="w-48 h-48 rounded-full border-4 border-mine-shaft-950 shadow-xl object-cover bg-mine-shaft-900"
          />
        </div>
      </div>

      <div className="h-28"></div>

      {/* Info Section */}
      <div className="px-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-white">{props.name}</h1>
          <Button color="brightSun.4" variant="light" onClick={open}>
            Message
          </Button>
        </div>

        <div className="mt-2 text-lg flex gap-2 items-center text-white">
          <IconBriefcase size={20} stroke={1.5} />
          {props.title} &bull; {props.company}
        </div>

        <div className="mt-1 text-base flex gap-2 items-center text-mine-shaft-300">
          <IconMapPin size={20} stroke={1.5} />
          {props.location}
        </div>

        <Divider my="xl" />
      </div>

      {/* About */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">
          {props.about || "No details provided."}
        </div>
      </div>

      <Divider my="xl" />

      {/* Skills */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-3">
          {props.skills?.map((skill: string, index: number) => (
            <div key={index} className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium">
              {skill}
            </div>
          ))}
        </div>
      </div>

      <Divider my="xl" />

      {/* Experience */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Experience</div>
        <div className="flex flex-col gap-6">
          {props.experience?.map((exp: any, index: number) => (
            <Experience key={index} {...exp} />
          ))}
        </div>
      </div>

      <Divider my="xl" />

      {/* Certification */}
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Certification</div>
        <div className="flex flex-col gap-6">
          {props.certifications?.map((cert: any, index: number) => (
            <Certification key={index} {...cert} />
          ))}
        </div>
      </div>

      <MessageModal 
        opened={opened} 
        onClose={close} 
        name={props.name} 
        avatar={props.avatar} 
      />
    </div>
  );
};

export default Profile;