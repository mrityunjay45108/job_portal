import { useEffect, useMemo, useRef, useState } from "react";

const steps = [
  { icon: "🔧", title: "Build Skills", desc: "Upgrade technical & professional skills aligned with industry needs." },
  { icon: "📄", title: "Create Resume", desc: "Craft an ATS-friendly resume that attracts recruiters." },
  { icon: "🎯", title: "Aptitude Prep", desc: "Practice aptitude & logical reasoning with expert strategies." },
  { icon: "💬", title: "Interview Ready", desc: "Prepare HR & technical interviews with confidence." },
  { icon: "💼", title: "Apply Smartly", desc: "Target the right jobs using smart search techniques." },
  { icon: "🎉", title: "Get Hired", desc: "Clear every round & land your dream job successfully." },
];

const JobSeekerJourney = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setVisible(prev => (prev.includes(i) ? prev : [...prev, i]));
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("[data-step]").forEach(el =>
      observer.current?.observe(el)
    );

    return () => observer.current?.disconnect();
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
      })),
    []
  );

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute bg-emerald-400 rounded-full animate-pulse"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Your Journey to a{" "}
            <span className="text-emerald-400">Dream Job</span>
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mb-8">
            A simple 6-step roadmap to build skills, crack interviews,
            and get hired by top companies.
          </p>

          <button className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 px-8 py-4 rounded-xl font-bold shadow-lg transition">
            Start Your Journey 🚀
          </button>

          <div className="mt-12 max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-xl">
            <img
              src="/Jobseekerjourney/Jobseekerjourney.png"
              alt="Job Seeker"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-emerald-600/30 rounded-full" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                data-step
                data-index={i}
                className={`relative pl-20 transition-all duration-700 ${
                  visible.includes(i)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                <div className="absolute left-0 w-12 h-12 rounded-full bg-emerald-500 text-gray-900 flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.icon}
                </div>

                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-emerald-400/40 transition">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default JobSeekerJourney;
