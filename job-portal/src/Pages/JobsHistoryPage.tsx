import { Divider } from "@mantine/core";
import JobHistory from "../JobHistory/JobHistory";

const JobHistoryPage = () => {
  return (
    // min-h-screen ensure karta hai ki dark background poore page par dikhe
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] px-8 pb-10 ">
      <Divider size="xs"  />
      <div className="py-8">
        <JobHistory />
      </div>
    </div>
  );
};

export default JobHistoryPage;