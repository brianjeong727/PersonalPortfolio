import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import igradeu from "../assets/iGradeUImg.png";
import esports from "../assets/placeholder-2.png";
import churchCover from "../assets/churchAppImg.png";

export default function Projects() {
  const sectionRef = useRef(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTrigger(true),
      { threshold: 0.3 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 max-w-6xl mx-auto overflow-hidden"
    >
      <h2 className="text-4xl text-center font-bold mb-20 neon">
        &gt; projects
      </h2>

      {trigger && (
        <motion.div
          className="pixel-glitch-ring"
          initial={{ scale: 0.4, opacity: 1 }}
          animate={{ scale: 7, opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      )}

      <motion.div
        initial={{
          WebkitMaskImage:
            "radial-gradient(circle, transparent 0%, transparent 0%)",
        }}
        animate={
          trigger
            ? {
                WebkitMaskImage:
                  "radial-gradient(circle, black 100%, transparent 100%)",
              }
            : {}
        }
        transition={{ duration: 1.7, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-16">

          {/* === PROJECT 1 — YOUR BEST ONE FIRST === */}
          <GlitchCard
            delay={0.20}
            title="Church Management Platform"
            desc="Full-scale community management platform with authentication, roles, events, announcements, attendance, devotionals, & accountability groups."
            tech={[
              "Django REST",
              "React",
              "JWT Auth",
              "Role-Based Permissions",
              "PostgreSQL",
            ]}
            img={churchCover}
            link="https://central-frontend-7bfi.onrender.com/login"
            link2="https://github.com/brianjeong727/Church-Management-Web-App"
          />

          {/* === PROJECT 2 === */}
          <GlitchCard
            delay={0.35}
            title="iGradeU"
            desc="AI-powered academic forecasting using Canvas, RMP scraping, and syllabus parsing."
            tech={["React", "Django", "OpenAI", "Canvas API"]}
            img={igradeu}
            link="https://github.com/brianjeong727"
          />

          {/* === PROJECT 3 === */}
          <GlitchCard
            delay={0.50}
            title="Esports Portfolio Builder"
            desc="Analytics-driven esports performance tracker with match visualizations."
            tech={["React", "Django", "Riot API", "Chart.js"]}
            img={esports}
            link="https://github.com/brianjeong727"
          />

        </div>
      </motion.div>
    </section>
  );
}

function GlitchCard({ delay, title, desc, tech, img, link, link2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className="bg-black/40 border border-[#9D4EDD]/40 
                 shadow-[0_0_25px_#9D4EDD60] backdrop-blur-lg 
                 rounded-xl p-6"
    >
      <img src={img} alt="" className="w-full rounded mb-4" />

      <h3 className="text-2xl font-semibold mb-2 neon">{title}</h3>
      <p className="text-gray-300 mb-4">{desc}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t, i) => (
          <span
            key={i}
            className="px-2 py-1 border border-[#9D4EDD] text-[#9D4EDD] rounded-md text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      {/* LIVE LINK */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="block text-[#9D4EDD] neon hover:underline mb-1"
        >
          Live Demo →
        </a>
      )}

      {/* GITHUB LINK */}
      {link2 && (
        <a
          href={link2}
          target="_blank"
          rel="noreferrer"
          className="block text-[#9D4EDD] neon hover:underline"
        >
          View Repository →
        </a>
      )}
    </motion.div>
  );
}
