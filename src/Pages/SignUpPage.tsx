import { IconAnchor } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";

const SignUpPage = () => {
  const location = useLocation();

  const isSignup = location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] overflow-hidden">
      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-transform duration-1000 ease-in-out ${
          isSignup ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        {/* Login */}
        <Login />

        {/* Center Section */}
        <div
          className={`w-1/2 h-full bg-mine-shaft-900 flex items-center gap-5 justify-center flex-col
  transition-all duration-1000 ease-in-out
  ${
    location.pathname === "/signup" ? "rounded-r-[200px]" : "rounded-l-[200px]"
  }`}
        >
          <Link to="/">
            <div className="flex gap-1 items-center text-bright-sun-400">
              <IconAnchor className="h-16 w-16" stroke={2.5} />
              <div className="text-6xl font-semibold">JobSeekers</div>
            </div>
          </Link>

          <div className="text-2xl text-mine-shaft-200 font-semibold">
            Find the job made for you
          </div>
        </div>

        {/* Signup */}
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
