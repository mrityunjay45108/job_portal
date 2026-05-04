// src/components/PostedJob/PostedJobCard.tsx
interface JobCardProps {
    id: string;
    jobTitle: string;
    location: string;
    posted: string;
    jobType?: string;
    salary?: string;
    department?: string;
}

const PostedJobCard = ({ jobTitle, location, posted, jobType, salary, department }: JobCardProps) => {
    return (
        <div className="bg-white rounded-xl p-4 border-l-4 border-l-blue-500 w-full hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl border border-gray-200">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="text-base font-semibold text-gray-800 line-clamp-1">{jobTitle}</div>
                        {department && (
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{department}</span>
                        )}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mb-1">{location}</div>
                    {jobType && (
                        <span className="inline-block text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{jobType}</span>
                    )}
                </div>
                {salary && (
                    <div className="text-right">
                        <div className="text-xs text-gray-400">{posted}</div>
                        <div className="text-sm font-semibold text-blue-600 mt-1">{salary}</div>
                    </div>
                )}
            </div>
            {!salary && (
                <div className="text-[10px] text-gray-400 mt-2">{posted}</div>
            )}
        </div>
    );
};

export default PostedJobCard;