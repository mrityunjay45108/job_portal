import { Divider, Container } from "@mantine/core";
import CandidateDashboard from "../CandidateDashboard/CandidateDashboard";

const CandidateDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 font-['Poppins']">
      <Container size="xl" className="px-4 sm:px-6 lg:px-8 py-6">
        <Divider className="mb-6 border-gray-200" />
        <CandidateDashboard />
      </Container>
    </div>
  );
};

export default CandidateDashboardPage;