// import { Link, useLocation } from "react-router-dom";

// const NavLinks = () => {
//   const location = useLocation();
  
//   const links = [
//     { name: "Find Jobs", url: "find-jobs" },
//     { name: "Find Talent", url: "find-talent" },
//     { name: "Upload Jobs", url: "upload-jobs" },
//     { name: "About us", url: "about-us" },
//   ];
// const location = useLocation();
//   return (
//     <div className="flex gap-5" text-mine-shaft-300 h-full items-centre>
//       {links.map((link, index) => 
//          <div className={'${location .pathname=="/"+link"border-bright-sun-400":"border-transparent"} border-t[3px] h-full flex-items-centre'}>
      
//       (
//         <Link key={index} to={link.url}>
//           {link.name}
//         </Link>
//       ))}

//       </div>
//     </div>
//   );
// };

// export default NavLinks;

// 


import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();

  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Jobs", url: "/Post-Jobs" },
    { name: "About us", url: "/about-us" },
  ];

  return (
    <div className="flex gap-5 h-full items-center z-50 relative">
      {links.map((link, index) => {
        const isActive = location.pathname === link.url;
        return (
          <Link
            key={index}
            to={link.url}
            className={`flex items-center border-t-[3px] px-3 transition-colors duration-200 ${
              isActive
                ? "text-bright-sun-400 border-bright-sun-400"
                : "text-mine-shaft-300 border-transparent hover:text-bright-sun-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
