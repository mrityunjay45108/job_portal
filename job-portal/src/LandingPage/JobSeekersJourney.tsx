const steps = [
  { step: "01", title: "Build Skills", desc: "Upgrade technical & professional skills aligned with industry needs." },
  { step: "02", title: "Create Resume", desc: "Craft an ATS-friendly resume that attracts recruiters." },
  { step: "03", title: "Aptitude Prep", desc: "Practice aptitude & logical reasoning with expert strategies." },
  { step: "04", title: "Interview Ready", desc: "Prepare HR & technical interviews with confidence." },
  { step: "05", title: "Apply Smartly", desc: "Target the right jobs using smart search techniques." },
  { step: "06", title: "Get Hired", desc: "Clear every round & land your dream job successfully." },
];

const JobSeekerJourney = () => {
  return (
    <section className="bg-white py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-blue-600 font-black tracking-[0.3em] text-xs uppercase">Career Roadmap</span>
            <h2 className="text-5xl font-black text-gray-900 leading-tight">
              Your Journey to a <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Job</span>
            </h2>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            A strategic 6-step roadmap designed to take you from learning to earning at top-tier companies.
          </p>

          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            Start Your Journey →
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((item, i) => (
            <div key={i} className="group flex items-center gap-6 p-6 bg-gray-50 border border-gray-200 rounded-[2rem] hover:shadow-lg hover:border-blue-200 transition-all">
              <span className="text-3xl font-black text-gray-300 group-hover:text-blue-400 transition-colors">
                {item.step}
              </span>
              <div>
                <h4 className="text-gray-900 font-bold text-lg">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobSeekerJourney;