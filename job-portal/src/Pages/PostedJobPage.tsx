import { Divider, Loader } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostedJobPage = () => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
    if (!loading && isAuthenticated && user?.role !== "recruiter") {
      navigate("/");
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  const handleJobUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "recruiter") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Recruiter Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage your job posts, track applicants, and monitor performance</p>
            </div>
          </div>
        </div>
        
        <Divider className="mb-6 border-gray-200" />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section: Jobs Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <PostedJob 
              onJobSelect={handleJobSelect} 
              selectedJobId={selectedJobId}
              refreshTrigger={refreshTrigger}
            />
          </div>

          {/* Right Section: Job Description Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            {selectedJobId ? (
              <PostedJobDesc 
                jobId={selectedJobId} 
                onJobUpdate={handleJobUpdate}
                onJobDelete={() => setSelectedJobId(null)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Job Selected</h3>
                <p className="text-gray-500 text-sm max-w-xs">Select a job from the left panel to view, edit, or manage its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobPage;