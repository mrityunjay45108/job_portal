import { Badge, Tabs, ScrollArea } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";


const PostedJobDesc = (props:any) => {
  return (
    <div className="mt-2 w-full pl-6">
      {/* Title Section - Yeh hamesha top par fixed rahega */}
      <div className="text-3xl font-bold flex items-center gap-3">
        Software Engineer
        <Badge variant="filled" color="brightSun.4" size="sm" className="text-black uppercase">
          Badge
        </Badge>
      </div>
      
      <div className="text-lg font-medium text-mine-shaft-300 mt-1 mb-5">
        New York, United States
      </div>

      {/* Tabs Implementation */}
      <Tabs variant="outline" radius="lg" defaultValue="overview">
        <Tabs.List className="mb-5 font-semibold text-lg [&_button]:text-mine-shaft-300 [&_button[data-active='true']]:text-bright-sun-400">
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
          <Tabs.Tab value="invited">Invited</Tabs.Tab>
        </Tabs.List>

        {/* ScrollArea lagaya hai taaki content footer tak scroll ho ske */}
        <ScrollArea h={'calc(100vh - 190px)'} scrollbarSize={4} type="hover" offsetScrollbars>
          <Tabs.Panel value="overview" className="pt-4 pb-10">
            <div className="text-mine-shaft-200">
              <JobDesc edit={true} />
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="applicants" className="pt-4 pb-10">
            <div className="text-mine-shaft-200">
            No Applicants found.
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="invited" className="pt-4 pb-10">
            <div className="text-mine-shaft-200">Invited candidates details.</div>
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default PostedJobDesc;