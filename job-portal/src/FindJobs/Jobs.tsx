import JobCard from "./JobCard";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salary: string;
  jobType: string;
  experience: string;
  description: string;
  skills: string[];
  applicantsCount: number;
  postedDate: string;
  urgentHiring?: boolean;
}

interface JobsProps {
  jobs: Job[];
  onApply: (job: Job) => void;
}

const Jobs = ({ jobs, onApply }: JobsProps) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 text-lg">No jobs found</p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search filters
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <div key={job._id} className="flex justify-center h-full">
              <JobCard
                _id={job._id}
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                location={job.location}
                salary={job.salary}
                jobType={job.jobType}
                experience={job.experience}
                postedDate={job.postedDate}
                applicantsCount={job.applicantsCount}
                description={job.description}
                skills={job.skills}
                urgentHiring={job.urgentHiring}
                onApply={() => onApply(job)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
