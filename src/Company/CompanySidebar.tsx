import { Avatar, ActionIcon, Divider } from "@mantine/core";
import { IconWorld, IconBrandLinkedin, IconBrandTwitter, IconExternalLink } from "@tabler/icons-react";

export const CompanySidebar = () => (
  // Changed to a grid on medium screens so cards sit side-by-side when stacked below main content
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
    
    {/* Contact Info Card */}
    <div className="bg-mine-shaft-900 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-mine-shaft-800 h-full">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-white">Contact Info</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="flex items-center gap-2 text-mine-shaft-400">
            <IconWorld size={18} className="shrink-0" /> Website
          </span>
          <a href="https://google.com" target="_blank" rel="noreferrer" className="text-bright-sun-400 hover:underline truncate ml-4">
            google.com
          </a>
        </div>
        
        <Divider size="xs" color="mineShaft.8" />
        
        <div className="flex items-center gap-4 pt-2">
          <ActionIcon variant="light" size="lg" color="blue" className="hover:scale-105 transition-transform">
            <IconBrandLinkedin size={20} />
          </ActionIcon>
          <ActionIcon variant="light" size="lg" color="cyan" className="hover:scale-105 transition-transform">
            <IconBrandTwitter size={20} />
          </ActionIcon>
        </div>
      </div>
    </div>

    {/* Similar Companies Card */}
    <div className="bg-mine-shaft-900 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-mine-shaft-800 h-full">
      <h3 className="text-lg md:text-xl font-bold mb-6 text-white">Similar Companies</h3>
      <div className="space-y-5">
        {['Microsoft', 'Meta', 'Amazon'].map((comp) => (
          <div key={comp} className="flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <Avatar radius="md" color="mineShaft.7" size="sm md:md">
                {comp[0]}
              </Avatar>
              <span className="text-sm md:text-base font-medium group-hover:text-bright-sun-400 transition-colors">
                {comp}
              </span>
            </div>
            <IconExternalLink size={16} className="text-mine-shaft-500 group-hover:text-bright-sun-400" />
          </div>
        ))}
      </div>
    </div>
  </div>
);