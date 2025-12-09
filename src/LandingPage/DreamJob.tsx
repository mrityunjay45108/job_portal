import { Avatar } from "@mantine/core";

const DreamJob = () => {
  return (
    <div className="flex items-center px-20 py-10 gap-10 relative">
      {/* ✅ Left Section */}
      <div className="w-[45%] flex flex-col gap-4 relative z-20">
        <div className="text-6xl font-bold text-white">
          Find Your <span className="text-bright-sun-400">Dream Job</span> With Us
        </div>

        <div className="text-lg text-mine-shaft-300">
          Good Life Begins With a Good Company. Start Explore Thousands of Jobs in One Place.
        </div>

        <div className="flex gap-3 mt-5">
          <input
            type="text"
            placeholder="Job Title"
            className="px-4 py-3 w-[45%] bg-mine-shaft-900 text-mine-shaft-100 rounded-lg outline-none focus:ring-2 focus:ring-bright-sun-400"
          />
          <input
            type="text"
            placeholder="Job Type"
            className="px-4 py-3 w-[45%] bg-mine-shaft-900 text-mine-shaft-100 rounded-lg outline-none focus:ring-2 focus:ring-bright-sun-400"
          />
          <button className="bg-bright-sun-400 text-mine-shaft-950 px-6 py-3 rounded-lg hover:bg-bright-sun-500 transition flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Right Section */}
      <div className="w-[55%] flex items-center justify-center relative z-10">
        <div className="w-[30rem] relative pointer-events-none">
          {/* 🧠 Prevent image from capturing clicks */}
          <img src="/job.png" alt="Job" className="w-full" />

          {/* Left Overlay Card */}
          <div className="absolute left-[-70px] top-[28%] w-fit bg-mine-shaft-900/70 border border-bright-sun-400 rounded-xl px-4 py-3 backdrop-blur-lg shadow-xl">
            <div className="flex items-center gap-3">
              <img src="/Google.png" alt="Google" className="w-9 h-9 rounded-lg" />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">Software Engineer</span>
                <span className="text-mine-shaft-300 text-xs">New York</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-mine-shaft-200">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>

          {/* Right Overlay Avatar Card */}
          <div className="absolute right-[-40px] top-[60%] w-fit border-bright-sun-400 border rounded-lg p-3 backdrop-blur-md bg-mine-shaft-900/70 shadow-lg">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">
              10k+ got job
            </div>

            <Avatar.Group className="ml-1">
              <Avatar src="avatar.png" />
              <Avatar src="avatar1.png" />
              <Avatar src="avatar2.png" />
              <Avatar>+9k</Avatar>
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
