import { ScrollArea, Tabs } from "@mantine/core";
import { activeJobs, drafts } from "../Data/PostedJob"; 
import PostedJobCard from "./PostedJobCard";

const PostedJob = () => {
  return (
    <div className="w-full mt-2">
      <div className="text-2xl font-semibold mb-5 text-white">Jobs</div>

      <Tabs color="brightSun.4" variant="pills" defaultValue="active" autoContrast>
        <Tabs.List className="mb-4 gap-2 [&_button[aria-selected='false']]:bg-mine-shaft-900 font-medium">
          <Tabs.Tab 
            className="hover:bg-bright-sun-400 hover:text-black transition-colors" 
            value="active"
          >
            Active [{activeJobs.length}]
          </Tabs.Tab>
          <Tabs.Tab 
            className="hover:bg-bright-sun-400 hover:text-black transition-colors" 
            value="draft"
          >
            Drafts [{drafts.length}]
          </Tabs.Tab>
        </Tabs.List>

        {/* ScrollArea add kiya gaya hai height control karne ke liye */}
        <ScrollArea h={'calc(100vh - 100px)'} scrollbarSize={4} offsetScrollbars>
          <Tabs.Panel value="active">
            <div className="flex flex-col gap-3 mt-4">
              {activeJobs.map((job, index) => (
                <PostedJobCard key={index} {...job} />
              ))}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="draft">
            <div className="flex flex-col gap-3 mt-4">
              {drafts.map((job, index) => (
                <PostedJobCard key={index} {...job} />
              ))}
            </div>
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PostedJob;