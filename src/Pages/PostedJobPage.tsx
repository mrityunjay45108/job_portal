// src/Pages/PostedJobPage.tsx

import { Divider } from "@mantine/core";
import PostedJob from "../PostedJob/PostedJob";
import PostedJobDesc from "../PostedJob/PostedJobDesc";

const PostedJobPage = () => {
    return (
       // Padding top (pt-0) aur margin top (mt-0) ensure karein
       <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] text-white px-4 pb-5 mt-0 pt-0">
            
            {/* 1. Gap Fix: 'my' hata kar 'mb' use karein aur top margin 0 karein */}
            <Divider mb="md" mt={0} color="mineShaft.8" /> 
            
            <div className="flex flex-row gap-5 items-start"> 
                
                {/* Left Section: Jobs Sidebar */}
                <div className="w-1/4 min-w-[300px]"> 
                    <PostedJob />
                </div>

                {/* Right Section: Job Description Area */}
                <div className="flex-1 border-l border-mine-shaft-800 pl-6 min-h-[80vh]"> 
                    <PostedJobDesc />
                </div>
                
            </div>
        </div>
    );
}

export default PostedJobPage;