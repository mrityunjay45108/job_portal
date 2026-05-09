import React from "react";

const OurNumbersSection = () => {
  const stats = [
    { number: "10000k+", label: "Active Users", color: "text-blue-600", bg: "bg-blue-50" },
    { number: "20k+", label: "Assessments", color: "text-emerald-600", bg: "bg-emerald-50" },
    { number: "30K+", label: "Opportunities", color: "text-amber-600", bg: "bg-amber-50" },
    { number: "10+", label: "Trusted Brands", color: "text-purple-600", bg: "bg-purple-50" },
    { number: "1k+", label: "Organizations", color: "text-pink-600", bg: "bg-pink-50" },
    { number: "1+", label: "Countries", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Our <span className="text-blue-600">Numbers</span> Speak for Themselves
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are proud to empower millions of users and thousands of organizations worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group flex flex-col items-center text-center p-6 rounded-2xl ${stat.bg} border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
            >
              <p className={`text-3xl lg:text-4xl font-black mb-2 tracking-tighter ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.number}
              </p>
              
              <div className="w-8 h-1 bg-gray-200 rounded-full mb-4 group-hover:w-12 group-hover:bg-blue-400 transition-all" />
              
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurNumbersSection;