import RecruiterDashboard from "../postedjobmanagement/RecruiterDashboard";

const PostedJobManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-6">
        <RecruiterDashboard />
      </div>
    </div>
  );
};

export default PostedJobManagementPage;