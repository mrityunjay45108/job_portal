import {
  Divider,
  ActionIcon,
  TextInput,
  Textarea,
  Badge,
  Button,
} from "@mantine/core";

import {
  IconBriefcase,
  IconMapPin,
  IconDeviceLaptop,
  IconPencil,
  IconDeviceFloppy,
  IconCertificate,
  IconX,
  IconTags,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";

import profileData from "../Data/MainProfileData";

// --- Sub-Component: Experience ---
const ExperienceCard = (props: any) => {
  return (
    <div className="flex gap-4">
      {/* Company Logo */}
      <div className="bg-mine-shaft-800 p-2 rounded-xl h-14 w-14 flex-shrink-0 flex items-center justify-center">
        <img
          src={props.companyIcon}
          alt={props.company}
          className="max-h-full object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {props.edit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-mine-shaft-900 rounded-lg border border-mine-shaft-700 shadow-inner">
            <TextInput
              label="Job Title"
              defaultValue={props.title}
              size="xs"
              variant="filled"
              className="md:col-span-2"
            />
            <TextInput
              label="Company"
              defaultValue={props.company}
              size="xs"
              variant="filled"
            />
            <TextInput
              label="Location"
              defaultValue={props.location}
              size="xs"
              variant="filled"
            />

            {/* Date Update Boxes */}
            <TextInput
              label="Start Date"
              defaultValue={props.startDate}
              placeholder="e.g. Jan 2023"
              size="xs"
              variant="filled"
            />
            <TextInput
              label="End Date"
              defaultValue={props.endDate}
              placeholder="e.g. Present"
              size="xs"
              variant="filled"
            />

            <Textarea
              label="Description"
              defaultValue={props.description}
              size="xs"
              variant="filled"
              autosize
              className="md:col-span-2"
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-white">
              {props.title}
            </div>
            <div className="text-sm text-bright-sun-400 font-medium">
              {props.company} &bull; {props.location}
            </div>
            <div className="text-xs text-mine-shaft-400 mb-2">
              {props.startDate} - {props.endDate}
            </div>
            <p className="text-sm text-mine-shaft-300 leading-relaxed text-justify">
              {props.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-Component: Certification ---
const CertificationCard = (props: any) => {
  return (
    <div className="flex items-center gap-4 w-full">
      {/* Certification Logo */}
      <div className="h-12 w-12 flex-shrink-0">
        <img
          src={props.issuerIcon}
          alt={props.issuer}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex-1">
        {props.edit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-mine-shaft-900 rounded-lg border border-mine-shaft-700">
            <TextInput
              label="Certificate Name"
              defaultValue={props.name}
              size="xs"
              variant="filled"
              className="md:col-span-2"
            />
            <TextInput
              label="Issuer"
              defaultValue={props.issuer}
              size="xs"
              variant="filled"
            />
            <TextInput
              label="Date"
              defaultValue={props.date}
              size="xs"
              variant="filled"
            />
            <TextInput
              label="Credential ID"
              defaultValue={props.id}
              size="xs"
              variant="filled"
              className="md:col-span-2"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-white leading-tight">
                {props.name}
              </div>
              <div className="text-sm text-mine-shaft-400">{props.issuer}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-mine-shaft-500 font-medium">
                {props.date}
              </div>
              <div className="text-[10px] text-mine-shaft-600 font-mono">
                ID: {props.id}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
const MainProfile = () => {
  const [data, setData] = useState(profileData);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  // Saari states ko yahan upar function ke start mein rakh diya hai
  const [addCert, setAddCert] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="w-full mt-2 pb-10 bg-mine-shaft-950 min-h-screen text-mine-shaft-100">
      {/* Banner & Avatar Section */}
      <div className="relative group">
        <img
          src={data.banner}
          alt="Banner"
          className="w-full h-56 object-cover rounded-t-3xl shadow-lg"
        />
        <div className="absolute -bottom-16 left-10">
          <img
            src={data.avatar}
            alt="Profile"
            className="w-44 h-44 rounded-full border-8 border-mine-shaft-950 shadow-2xl object-cover bg-mine-shaft-900"
          />
        </div>
      </div>
      <div className="h-20"></div>

      {/* Info Section */}
      <div className="px-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {edit[0] ? (
                <TextInput
                  value={data.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  variant="filled"
                  size="lg"
                  className="flex-1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {data.name}
                </h1>
              )}
              <ActionIcon
                onClick={() => handleEdit(0)}
                color="brightSun.4"
                variant="subtle"
                size="lg"
              >
                {edit[0] ? <IconDeviceFloppy /> : <IconPencil />}
              </ActionIcon>
            </div>
            <div className="mt-3 text-xl flex gap-2 items-center text-bright-sun-400 font-medium">
              <IconDeviceLaptop size={22} />
              {edit[0] ? (
                <div className="flex gap-2">
                  <TextInput
                    value={data.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    size="xs"
                    variant="filled"
                  />
                  <TextInput
                    value={data.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    size="xs"
                    variant="filled"
                  />
                </div>
              ) : (
                <span>
                  {data.title} &bull; {data.company}
                </span>
              )}
            </div>
            <div className="mt-1 text-base flex gap-2 items-center text-mine-shaft-300">
              <IconMapPin size={20} stroke={1.5} />
              {edit[0] ? (
                <TextInput
                  value={data.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  size="xs"
                  variant="filled"
                />
              ) : (
                data.location
              )}
            </div>
          </div>
        </div>
        <Divider my="xl" color="mineShaft.7" />
      </div>

      <div className="px-10 flex flex-col gap-10">
        {/* skills   */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <IconTags className="text-bright-sun-400" /> Skills
            </div>
            <ActionIcon
              onClick={() => handleEdit(4)}
              variant="subtle"
              color="brightSun.4"
            >
              {edit[4] ? (
                <IconDeviceFloppy size={20} />
              ) : (
                <IconPencil size={20} />
              )}
            </ActionIcon>
          </div>

          <div className="flex flex-wrap gap-3">
            {data.skills?.map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="light"
                color="brightSun.4"
                size="xl"
                className="px-4 py-5 capitalize font-bold"
                styles={{
                  root: {
                    backgroundColor: "rgba(255, 211, 62, 0.1)",
                    color: "#FFD33E",
                    border: "1px solid rgba(255, 211, 62, 0.2)",
                  },
                }}
                rightSection={
                  edit[4] && (
                    <IconX
                      size={16}
                      className="cursor-pointer hover:text-red-500 transition-colors ml-1"
                      onClick={() => {
                        const newSkills = data.skills.filter(
                          (_: any, i: number) => i !== index
                        );
                        setData({ ...data, skills: newSkills });
                      }}
                    />
                  )
                }
              >
                {skill}
              </Badge>
            ))}

            {edit[4] && (
              <TextInput
                placeholder="Add Skill"
                size="sm"
                variant="filled"
                className="w-36"
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    e.currentTarget.value.trim() !== ""
                  ) {
                    setData({
                      ...data,
                      skills: [...data.skills, e.currentTarget.value.trim()],
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
            )}
          </div>
        </section>

        {/* About Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">About</h2>
            <ActionIcon
              onClick={() => handleEdit(1)}
              variant="subtle"
              color="brightSun.4"
            >
              {edit[1] ? (
                <IconDeviceFloppy size={18} />
              ) : (
                <IconPencil size={18} />
              )}
            </ActionIcon>
          </div>
          {edit[1] ? (
            <Textarea
              value={data.about}
              onChange={(e) => handleChange("about", e.target.value)}
              autosize
              minRows={3}
              variant="filled"
            />
          ) : (
            <p className="text-base text-mine-shaft-300 leading-relaxed text-justify max-w-4xl">
              {data.about}
            </p>
          )}
        </section>

        {/* Experience Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <IconBriefcase className="text-bright-sun-400" /> Experience
            </div>
            <div className="flex gap-2">
              <ActionIcon onClick={() => setAddExp(true)} variant="subtle" color="brightSun.4">
                <IconPlus size={22} />
              </ActionIcon>
              <ActionIcon
                onClick={() => handleEdit(2)}
                variant="subtle"
                color="brightSun.4"
              >
                {edit[2] ? (
                  <IconDeviceFloppy size={20} />
                ) : (
                  <IconPencil size={20} />
                )}
              </ActionIcon>
            </div>
          </div>

          <div className="flex flex-col gap-10 border-l-2 border-mine-shaft-800 ml-4 pl-8">
            {data.experience?.map((exp: any, idx: number) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[41px] top-4 w-4 h-4 rounded-full bg-bright-sun-400 border-4 border-mine-shaft-950"></div>
                <ExperienceCard {...exp} edit={edit[2]} />
              </div>
            ))}
          </div>

          {addExp && (
            <div className="mt-8 p-6 bg-mine-shaft-900 rounded-xl border border-mine-shaft-800 ml-4">
              <h3 className="text-lg font-semibold text-white mb-6">Add Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Job Title" placeholder="Software Engineer" required variant="filled" className="md:col-span-2" />
                <TextInput label="Company" placeholder="Google" required variant="filled" />
                <TextInput label="Location" placeholder="Bangalore, India" required variant="filled" />
                <TextInput label="Start Date" placeholder="Jan 2023" required variant="filled" />
                <TextInput label="End Date" placeholder="Present" required variant="filled" />
                <Textarea label="Description" placeholder="Write about your responsibilities..." required variant="filled" autosize minRows={3} className="md:col-span-2" />
              </div>
              <div className="flex gap-4 mt-8">
                <Button onClick={() => setAddExp(false)} color="brightSun.4" variant="outline">Save</Button>
                <Button onClick={() => setAddExp(false)} variant="subtle" color="red.6">Cancel</Button>
              </div>
            </div>
          )}
        </section>

        {/* Certification Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <IconCertificate className="text-bright-sun-400" /> Certifications
            </div>
            <div className="flex gap-2">
              <ActionIcon
                onClick={() => setAddCert(true)}
                variant="subtle"
                color="brightSun.4"
              >
                <IconPlus size={22} />
              </ActionIcon>

              <ActionIcon
                onClick={() => handleEdit(3)}
                variant="subtle"
                color="brightSun.4"
              >
                {edit[3] ? (
                  <IconDeviceFloppy size={20} />
                ) : (
                  <IconPencil size={20} />
                )}
              </ActionIcon>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certifications?.map((cert: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-mine-shaft-900 border border-mine-shaft-800 transition-colors"
              >
                <CertificationCard {...cert} edit={edit[3]} />
              </div>
            ))}
          </div>

          {addCert && (
            <div className="mt-8 p-6 bg-mine-shaft-900 rounded-xl border border-mine-shaft-800">
              <h3 className="text-lg font-semibold text-white mb-6">Add Certificate</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Title" placeholder="Enter title" required variant="filled" />
                <TextInput label="Company" placeholder="Google" required variant="filled" />
                <TextInput label="Issue Date" placeholder="August 2024" required variant="filled" />
                <TextInput label="Certificate ID" placeholder="Enter ID" required variant="filled" />
              </div>
              <div className="flex gap-4 mt-8">
                <Button onClick={() => setAddCert(false)} color="brightSun.4" variant="outline">Save</Button>
                <Button onClick={() => setAddCert(false)} variant="subtle" color="red.6">Cancel</Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MainProfile;