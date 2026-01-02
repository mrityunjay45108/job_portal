import { Avatar, ActionIcon, Divider } from "@mantine/core";
import { IconWorld, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";

export const CompanySidebar = () => (
  <div className="flex flex-col gap-6">
    <div className="bg-mine-shaft-900 p-6 rounded-3xl border border-mine-shaft-800">
      <h3 className="text-xl font-bold mb-4">Contact Info</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-mine-shaft-400"><IconWorld size={18}/> Website</span>
          <a href="#" className="text-bright-sun-400 hover:underline">google.com</a>
        </div>
        <Divider size="xs" color="mine-shaft.8" />
        <div className="flex items-center gap-4 pt-2">
          <ActionIcon variant="light" size="lg" color="blue"><IconBrandLinkedin size={20}/></ActionIcon>
          <ActionIcon variant="light" size="lg" color="cyan"><IconBrandTwitter size={20}/></ActionIcon>
        </div>
      </div>
    </div>

    <div className="bg-mine-shaft-900 p-6 rounded-3xl border border-mine-shaft-800">
      <h3 className="text-xl font-bold mb-6 text-white">Similar Companies</h3>
      <div className="space-y-5">
        {['Microsoft', 'Meta', 'Amazon'].map((comp) => (
          <div key={comp} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
              <Avatar radius="md" color="mine-shaft.7">{comp[0]}</Avatar>
              <span className="font-medium group-hover:text-bright-sun-400 transition-colors">{comp}</span>
            </div>
            <IconExternalLink size={16} className="text-mine-shaft-500" />
          </div>
        ))}
      </div>
    </div>
  </div>
);