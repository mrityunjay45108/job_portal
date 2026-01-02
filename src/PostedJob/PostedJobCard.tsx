interface JobCardProps {
    jobTitle: string;
    location: string;
    posted: string;
}

const PostedJobCard = ({ jobTitle, location, posted }: JobCardProps) => {
    return (
        <div className="bg-mine-shaft-900 rounded-xl p-3 border-l-4 border-l-bright-sun-400 w-full max-w-md hover:bg-mine-shaft-800 transition-colors cursor-pointer">
            <div className="text-sm font-semibold text-white mb-0.5">{jobTitle}</div>
            <div className="text-xs text-mine-shaft-300 font-medium">
                {location}
            </div>
            <div className="text-[10px] text-mine-shaft-400 mt-0.5">
                {posted}
            </div>
        </div>
    );
};

export default PostedJobCard;