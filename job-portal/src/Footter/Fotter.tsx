import { Link, useLocation } from "react-router-dom";
import { IconBrandLinkedin, IconBrandGithub, IconBrandTwitter, IconBrandYoutube, IconSend } from "@tabler/icons-react";

const Footer = () => {
  const location = useLocation();

  // Hide footer on login and signup pages
  if (location.pathname === "/signup" || location.pathname === "/login") return null;

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-emerald-400 mb-3">
              JobSeekers
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Connecting talent with opportunities.  
              Built with ❤️ in India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6 text-xl">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-emerald-400 transition-colors"><IconBrandTwitter size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-emerald-400 transition-colors"><IconBrandGithub size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:text-emerald-400 transition-colors"><IconBrandYoutube size={20} /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="hover:text-emerald-400 transition-colors">Find Jobs</Link></li>
              <li><Link to="/internships" className="hover:text-emerald-400 transition-colors">Internships</Link></li>
              <li><Link to="/mentorship" className="hover:text-emerald-400 transition-colors">Mentorship</Link></li>
              <li><Link to="/faqs" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4 max-w-xs">
              Get latest job updates directly in your inbox.
            </p>

            <div className="flex w-full max-w-sm md:max-w-none gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded-lg text-gray-900 font-semibold transition-all active:scale-95">
                <IconSend size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-6 text-center">
          <p className="order-2 md:order-1">
            © {new Date().getFullYear()} JobSeekers. All rights reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 order-1 md:order-2">
            <span className="text-gray-400 font-medium">Designed & Developed by</span>
            <a 
              href="https://www.linkedin.com/in/mrityunjay-kumar-8480842a5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors group"
            >
              Mrityunjay Kumar
              <IconBrandLinkedin 
                size={18} 
                className="group-hover:scale-110 transition-transform" 
              />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;