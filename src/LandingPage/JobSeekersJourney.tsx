import { useState, useEffect, useRef } from "react";

const JobSeekerJourney = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const steps = [
    {
      icon: "🔧",
      title: "Build Your Skills",
      desc: "Upgrade your technical and professional skills to match top industry standards and employer requirements.",
    },
    {
      icon: "📄",
      title: "Craft a Winning Resume",
      desc: "Create a professional resume that highlights your strengths and captures recruiter attention instantly.",
    },
    {
      icon: "🎯",
      title: "Ace the Aptitude",
      desc: "Strengthen your problem-solving abilities and crack aptitude tests with proven practice methods.",
    },
    {
      icon: "💬",
      title: "Master Interviews",
      desc: "Prepare for HR and technical interviews with expert guidance to answer confidently and impress employers.",
    },
    {
      icon: "💼",
      title: "Apply Strategically",
      desc: "Learn smart job search strategies to target the right opportunities and maximize your success rate.",
    },
    {
      icon: "🎉",
      title: "Land Your Dream Job",
      desc: "Follow a guided path, clear every step, and secure the dream job you've always aimed for.",
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const indexValue = el.dataset.index;
            if (!indexValue) return;

            const i = parseInt(indexValue, 10);
            setVisibleSteps((prev) => (prev.includes(i) ? prev : [...prev, i]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elems = document.querySelectorAll("[data-step]") as NodeListOf<HTMLElement>;
    elems.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="relative w-full bg-[#2a2d2e] text-white py-20 px-6 md:px-16 lg:px-28 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-red-500/40 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Journey to your{" "}
              <span className="text-bright-sun-400 inline-block">Dream Job</span>{" "}
              <span className="inline-block">👨‍💼</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Master skills, gain experience, and land your dream job in just 6 steps with our JobSeekers Platform
            </p>

            <button className="bg-emerald-400 hover:bg-emerald-500 text-gray-900 font-bold py-4 px-10 rounded-lg transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50">
              Get Ready for Job
            </button>

            {/* UPDATED IMAGE SECTION */}
            <div className="mt-12 relative">
              <div className="w-full max-w-md mx-auto relative">
                <div className="absolute right-8 bottom-0 text-6xl opacity-30">🌿</div>

                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#35383a]/50 to-[#2a2d2e]/30 backdrop-blur-sm border border-gray-700/20 h-72">
                  <img
                    src="/Jobseekerjourney/Jobseekerjourney.png"
                    alt="Job seeker"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-4 right-4 bg-emerald-400 rounded-full p-3">
                    <span className="text-2xl">💻</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE TIMELINE */}
          <div className="order-1 md:order-2 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-800" />

            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  data-step
                  data-index={index}
                  className={`relative transition-all duration-700 ${
                    visibleSteps.includes(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-6 pl-20">
                    <div className="absolute left-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#35383a] to-[#2a2d2e] flex items-center justify-center border-2 border-emerald-700/40 shadow-lg relative transition-all hover:border-emerald-600/60">
                        <span className="text-3xl">{step.icon}</span>

                        {visibleSteps.includes(index) && (
                          <div className="absolute inset-0 rounded-full border-2 border-emerald-600 animate-ping" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-h-[100px] flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                        {step.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default JobSeekerJourney;
