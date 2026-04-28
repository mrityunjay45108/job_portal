import { Tabs } from "@mantine/core";
import { jobList } from "../Data/JobsData";
import HistoryCard from "./Card";

const JobHistory = () => {
  return (
    <div className="flex flex-col w-full mt-5 px-5">
      <div className="text-3xl font-bold mb-8 text-white">Job History</div>

      <Tabs variant="outline" radius="lg" defaultValue="applied">
        <Tabs.List className="[&_button]:!text-xl [&_button]:font-semibold mb-10 [&_button[data-active='true']]:!text-bright-sun-400 gap-8">
          <Tabs.Tab value="applied">Applied</Tabs.Tab>
          <Tabs.Tab value="saved">Saved</Tabs.Tab>
          <Tabs.Tab value="offered">Offered</Tabs.Tab>
          <Tabs.Tab value="interviewing">Interviewing</Tabs.Tab>
        </Tabs.List>

        {/* 1. Applied Tab */}
        <Tabs.Panel value="applied">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-start">
            {jobList.map((job, index) => (
               <HistoryCard key={index} {...job} applied={true} /> 
            ))}
          </div>
        </Tabs.Panel>

        {/* 2. Saved Tab */}
        <Tabs.Panel value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobList.map((job, index) => (
               <HistoryCard key={index} {...job} saved={true} /> 
            ))}
          </div>
        </Tabs.Panel>

        {/* 3. Offered Tab */}
        <Tabs.Panel value="offered">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobList.map((job, index) => (
               <HistoryCard key={index} {...job} offered={true} /> 
            ))}
          </div>
        </Tabs.Panel>

        {/* 4. Interviewing Tab - FIX HERE */}
        <Tabs.Panel value="interviewing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobList.map((job, index) => (
               /* 'applied={true}' ko hata kar 'interviewing={true}' karein.
                  Isse Calendar schedule dikhega aur status "Interviewed" aayega. */
               <HistoryCard key={index} {...job} interviewing={true} /> 
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistory;