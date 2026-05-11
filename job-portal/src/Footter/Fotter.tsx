import { Link, useLocation } from "react-router-dom";
import { 
  IconBrandLinkedin, 
  IconBrandTwitter, 
  IconBrandYoutube, 
  IconBrandFacebook,
  IconSend,
  IconBriefcase,
  IconArrowUp,
  IconHeart,
  IconRocket,
  IconPhone,
  IconMail,
  IconBrandInstagram
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location.pathname === "/signup" || location.pathname === "/login") {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async () => {
    if (!email) {
      notifications.show({
        title: 'Email Required',
        message: 'Please enter your email address',
        color: 'yellow',
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notifications.show({
        title: 'Invalid Email',
        message: 'Please enter a valid email address',
        color: 'red',
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    notifications.show({
      title: 'Subscribed! 🎉',
      message: 'You have successfully subscribed to our newsletter',
      color: 'green',
    });
    setEmail("");
    setIsSubmitting(false);
  };

  const footerLinks = {
    company: [
      { name: "About us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Employer home", path: "/employer" },
      { name: "Sitemap", path: "/sitemap" },
      { name: "Credits", path: "/credits" }
    ],
    help: [
      { name: "Help center", path: "/help" },
      { name: "Summons/Notices", path: "/notices" },
      { name: "Grievances", path: "/grievances" },
      { name: "Report issue", path: "/report" }
    ],
    legal: [
      { name: "Privacy policy", path: "/privacy" },
      { name: "Terms & conditions", path: "/terms" },
      { name: "Fraud alert", path: "/fraud-alert" },
      { name: "Trust & safety", path: "/trust-safety" }
    ]
  };

  const socialLinks = [
    { icon: IconBrandLinkedin, href: "#", color: "text-blue-600" },
    { icon: IconBrandTwitter, href: "#", color: "text-sky-500" },
    { icon: IconBrandYoutube, href: "#", color: "text-red-600" },
    { icon: IconBrandInstagram, href: "#", color: "text-pink-600" },
    { icon: IconBrandFacebook, href: "#", color: "text-blue-700" }
  ];

  return (
    <>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <IconBriefcase size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  JobSeekers
                </h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                India's No.1 Job Site. Connecting talent with opportunities since 2026.
              </p>
              
              <p className="text-xs text-gray-400 mt-4">Connect with us</p>
              <div className="flex gap-2 mt-2">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`p-2 bg-gray-100 rounded-lg ${social.color} hover:bg-gray-200 transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Help</h3>
              <ul className="space-y-2">
                {footerLinks.help.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <IconMail size={12} />
                  <span>mrityunjay204@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <IconPhone size={12} />
                  <span>+91 7324882xxx</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
                  <IconRocket size={16} className="text-blue-600" />
                  Apply on the go
                </h3>
                <p className="text-xs text-gray-500">Get real-time job updates on our App</p>
              </div>
              
              <div className="flex w-full max-w-md gap-2">
                <input
                  type="email"
                  placeholder="Enter email for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe <IconSend size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Simple Copyright */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} JobSeekers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-white border border-gray-200 rounded-full text-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:text-blue-600"
        >
          <IconArrowUp size={18} />
        </button>
      )}
    </>
  );
};

export default Footer;



// import { Link, useLocation } from "react-router-dom";
// import { 
//   IconBrandLinkedin, 
//   IconBrandTwitter, 
//   IconBrandYoutube, 
//   IconBrandFacebook,
//   IconSend,
//   IconBriefcase,
//   IconArrowUp,
//   IconHeart,
//   IconRocket,
//   IconPhone,
//   IconMail,
//   IconBrandInstagram,
//   IconBrandGithub
// } from "@tabler/icons-react";
// import { useState, useEffect } from "react";
// import { notifications } from "@mantine/notifications";

// const Footer = () => {
//   const location = useLocation();
//   const [email, setEmail] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (location.pathname === "/signup" || location.pathname === "/login") {
//     return null;
//   }

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSubscribe = async () => {
//     if (!email) {
//       notifications.show({
//         title: 'Email Required',
//         message: 'Please enter your email address',
//         color: 'yellow',
//       });
//       return;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       notifications.show({
//         title: 'Invalid Email',
//         message: 'Please enter a valid email address',
//         color: 'red',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     notifications.show({
//       title: 'Subscribed! 🎉',
//       message: 'You have successfully subscribed to our newsletter',
//       color: 'green',
//     });
//     setEmail("");
//     setIsSubmitting(false);
//   };

//   const footerLinks = {
//     company: [
//       { name: "About us", path: "/about" },
//       { name: "Careers", path: "/careers" },
//       { name: "Employer home", path: "/employer" },
//       { name: "Sitemap", path: "/sitemap" },
//       { name: "Credits", path: "/credits" }
//     ],
//     help: [
//       { name: "Help center", path: "/help" },
//       { name: "Summons/Notices", path: "/notices" },
//       { name: "Grievances", path: "/grievances" },
//       { name: "Report issue", path: "/report" }
//     ],
//     legal: [
//       { name: "Privacy policy", path: "/privacy" },
//       { name: "Terms & conditions", path: "/terms" },
//       { name: "Fraud alert", path: "/fraud-alert" },
//       { name: "Trust & safety", path: "/trust-safety" }
//     ]
//   };

//   const socialLinks = [
//     { icon: IconBrandLinkedin, href: "https://www.linkedin.com/in/mrityunjay-kumar-8480842a5", color: "text-blue-600" },
//     { icon: IconBrandGithub, href: "https://github.com/mrityunjay45108", color: "text-gray-800" },
//     { icon: IconBrandTwitter, href: "#", color: "text-sky-500" },
//     { icon: IconBrandYoutube, href: "#", color: "text-red-600" },
//     { icon: IconBrandInstagram, href: "#", color: "text-pink-600" },
//     { icon: IconBrandFacebook, href: "#", color: "text-blue-700" }
//   ];

//   return (
//     <>
//       <footer className="bg-white border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-12">
          
//           {/* Main Footer Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            
//             {/* Brand Section */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
//                   <IconBriefcase size={20} className="text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   JobSeekers
//                 </h2>
//               </div>
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 India's No.1 Job Site. Connecting talent with opportunities since 2026.
//               </p>
              
//               <p className="text-xs text-gray-400 mt-4">Connect with us</p>
//               <div className="flex gap-2 mt-2 flex-wrap">
//                 {socialLinks.map((social, idx) => (
//                   <a
//                     key={idx}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`p-2 bg-gray-100 rounded-lg ${social.color} hover:bg-gray-200 transition-all duration-300 hover:scale-110`}
//                   >
//                     <social.icon size={16} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Company Links */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
//               <ul className="space-y-2">
//                 {footerLinks.company.map((link, idx) => (
//                   <li key={idx}>
//                     <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Help Links */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Help</h3>
//               <ul className="space-y-2">
//                 {footerLinks.help.map((link, idx) => (
//                   <li key={idx}>
//                     <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Legal Links */}
//             <div>
//               <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
//               <ul className="space-y-2">
//                 {footerLinks.legal.map((link, idx) => (
//                   <li key={idx}>
//                     <Link to={link.path} className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
              
//               <div className="mt-4 pt-2">
//                 <div className="flex items-center gap-2 text-xs text-gray-400">
//                   <IconMail size={12} />
//                   <a href="mailto:kumarmrityunjay5210@gmail.com" className="hover:text-blue-600 transition-colors">
//                     kumarmrityunjay5210@gmail.com
//                   </a>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
//                   <IconPhone size={12} />
//                   <span>+91 7324882560</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Developer Credit Section */}
//           <div className="border-t border-gray-200 pt-6 mt-8">
//             <div className="text-center">
//               <p className="text-xs text-gray-400">
//                 Developed with <IconHeart size={12} className="inline text-red-500" /> by 
//                 <a 
//                   href="https://github.com/mrityunjay45108" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline ml-1"
//                 >
//                   Mrityunjay Kumar
//                 </a>
//               </p>
//               <div className="flex justify-center gap-4 mt-2 text-xs text-gray-400">
//                 <a href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
//                   LinkedIn
//                 </a>
//                 <span>•</span>
//                 <a href="https://github.com/mrityunjay45108" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 transition-colors">
//                   GitHub
//                 </a>
//                 <span>•</span>
//                 <a href="mailto:kumarmrityunjay5210@gmail.com" className="hover:text-blue-600 transition-colors">
//                   Email
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Newsletter Section */}
//           <div className="border-t border-gray-200 pt-8 mt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//               <div className="text-center md:text-left">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2 justify-center md:justify-start">
//                   <IconRocket size={16} className="text-blue-600" />
//                   Apply on the go
//                 </h3>
//                 <p className="text-xs text-gray-500">Get real-time job updates on our App</p>
//               </div>
              
//               <div className="flex w-full max-w-md gap-2">
//                 <input
//                   type="email"
//                   placeholder="Enter email for newsletter"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
//                   className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <button 
//                   onClick={handleSubscribe}
//                   disabled={isSubmitting}
//                   className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   ) : (
//                     <>
//                       Subscribe <IconSend size={14} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Simple Copyright */}
//           <div className="border-t border-gray-200 pt-6 mt-8">
//             <p className="text-center text-xs text-gray-400">
//               © {new Date().getFullYear()} JobSeekers. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 z-50 p-3 bg-white border border-gray-200 rounded-full text-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:text-blue-600"
//         >
//           <IconArrowUp size={18} />
//         </button>
//       )}
//     </>
//   );
// };

// export default Footer;



