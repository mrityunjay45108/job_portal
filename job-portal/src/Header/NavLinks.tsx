import { Link, useLocation } from "react-router-dom";

interface NavLinksProps {
  onClose?: () => void;
}

const NavLinks = ({ onClose }: NavLinksProps) => {
  const location = useLocation();

  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    // { name: "Find Talent", url: "/find-talent" },
    // { name: "Post Jobs", url: "/post-jobs" },
    { name: "Posted Jobs", url: "/posted-jobs" },
    { name: "Recruiter Dashboard", url: "/recruiter-dashboard" },
    { name: "Candidate Dashboard", url: "/candidate-dashboard" },
  ];

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
      {links.map((link, index) => {
        const isActive = location.pathname === link.url;
        return (
          <Link
            key={index}
            to={link.url}
            onClick={handleClick}
            className={`
              relative px-4 py-2.5 md:py-2 rounded-lg transition-all duration-200
              ${isActive 
                ? "text-blue-600 bg-blue-50 font-semibold" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }
            `}
          >
            {link.name}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full md:hidden" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;