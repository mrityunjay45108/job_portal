/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6 md:px-16 lg:px-28 relative overflow-hidden ">
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1 - Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">JS</span>
              </div>
              <h2 className="text-2xl font-bold text-bright-sun-400">JobSeekers</h2>
            </div>

            <p className="text-gray-300 mb-6 flex items-center gap-2">
              Built with <span className="text-red-500">❤️</span> in India for the world
            </p>

            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-lg text-bright-sun-400">Stay Connected</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Sales Inquiries</p>
                  <a href="mailto:sales@jobseekers.com" className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <span>✉️</span> kmrityunjay223@gmail.com
                  </a>
                </div>

                <div>
                  <a href="tel:+919311777388" className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <span>📞</span> +91-7324882119
                  </a>
                  <p className="text-xs text-gray-400 ml-6">(Mon to Fri, 9:30 AM to 6:30 PM)</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Support Inquiries</p>
                  <a href="mailto:support@jobseekers.com" className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <span>✉️</span> support@jobseekers.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">💼</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">✈️</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">🎮</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-400/20 rounded-full flex items-center justify-center transition-all">
                <span className="text-lg">▶️</span>
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold mb-3 text-su">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">
                We'll send you updates on the latest opportunities to showcase your talent and get hired and rewarded regularly.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter!"
                  className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-all text-gray-900 font-semibold">
                  ➤
                </button>
              </div>
              <div className="flex gap-3">
                <button className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm transition-all text-gray-900 font-semibold">
                  Share Your Story Now
                </button>
                <button className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm transition-all text-gray-900 font-semibold">
                  🎯 Publish Opportunity
                </button>
              </div>
            </div>

            {/* App Download */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Download JobSeekers App</h3>
              <div className="flex gap-3">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <div className="bg-black px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-2xl">▶️</span>
                    <div>
                      <p className="text-xs">GET IT ON</p>
                      <p className="font-semibold">Google Play</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <div className="bg-black px-4 py-2 rounded-lg flex items-center gap-2">
                    <span className="text-2xl">🍎</span>
                    <div>
                      <p className="text-xs">Available on the</p>
                      <p className="font-semibold">App Store</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-bright-sun-400">Products</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Brand & Engage</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Source</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Screen</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Assess</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Interview</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Hiring Automation</a></li>
            </ul>

            <h3 className="font-bold text-xl mt-8 mb-4 text-bright-sun-400">Mentorship</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Be a Mentor</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Explore Mentors</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mentorship FAQs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Mentorship Blogs</a></li>
            </ul>
          </div>

          {/* Column 3 - Participate */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-bright-sun-400">Participate</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Competitions & Challenges</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Assessments</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Hackathons</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Workshops & Webinars</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Conferences</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cultural Events</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">College Festivals</a></li>
            </ul>

            <h3 className="font-bold text-xl mt-8 mb-4 text-bright-sun-400">Apply</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Internships</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Scholarships</a></li>
            </ul>
          </div>

          {/* Column 4 - Learn */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-bright-sun-400">Learn</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog Series</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Workshops</a></li>
            </ul>

            <h3 className="font-bold text-xl mt-8 mb-4 text-bright-sun-400">Practice</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">5 Days Interview Prep</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Code & Ace Hiring Assessments</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">100-Day of Coding Sprint</a></li>
            </ul>
          </div>

          {/* Column 5 - Our Properties */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-bright-sun-400">Our Properties</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Talent Awards 2025</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Talent Meet 2025</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Talent Report 2025</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Education Loan</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">EMI Calculator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Igniters Club</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <a href="#" className="hover:text-emerald-400 transition-colors">About Us</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Careers</a>
            <span>|</span>
            <span className="bg-emerald-400 text-gray-900 px-3 py-1 rounded-full font-semibold">We're hiring</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">Life at JobSeekers</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Clientele</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Partner With Us</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Partners</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">FAQs</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Branding Guidelines</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Testimonials</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Rewards Program</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers on Shark Tank</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Case Studies</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Refer & Earn</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">JobSeekers Campus Ambassador Program</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
       <div className="mt-10 flex justify-between items-center flex-wrap text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} JobSeekers. All rights reserved.</p>
            <a
              href="#"
              className="mb-0 justify-end text-emerald-400 hover:text-bright-sun-400 transition-colors font-semibold"
            >
              Designed & Developed by Mrityunjay Kumar
            </a>
          </div>
    </footer>
  );
};

export default Footer;