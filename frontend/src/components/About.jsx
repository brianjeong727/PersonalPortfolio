import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl text-center font-bold mb-10 neon">
        &gt; about_me
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-black/40 border border-[#9D4EDD]/40 p-8 rounded-lg shadow-[0_0_20px_#9D4EDD60]"
      >
        <p className="text-gray-300 leading-relaxed">
          I'm a full-stack software engineer studying Computer Science and Data Science at the University of Pittsburgh.
          I build software where clarity, design, and technical depth intersect — from AI-powered academic tools to
          analytics-driven esports platforms.
        </p>

        <p className="text-gray-300 leading-relaxed mt-6">
          I care about turning ideas into real, impactful digital experiences.  
          I love backend + frontend equally — APIs, data pipelines, UI/UX flows, systems design, all of it.
        </p>

        {/* Skills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {["React", "Django", "Python", "JavaScript", "PostgreSQL", "AWS", "Tailwind", "Node"].map((skill) => (
            <span
              key={skill}
              className="border border-[#9D4EDD] text-[#9D4EDD] px-3 py-1 rounded-md text-sm neon"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
