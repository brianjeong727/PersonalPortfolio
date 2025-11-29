import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center px-10 py-6 sticky top-0 z-50 
                 bg-black/40 backdrop-blur-md border-b border-[#9D4EDD]/40"
    >
      {/* Left Terminal Prompt */}
      <h1 className="text-[#9D4EDD] text-xl font-bold neon">
        brian@portfolio:~$
      </h1>

      {/* Right Links */}
      <div className="flex gap-8 text-md font-semibold">
        {["about", "projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className="text-gray-300 hover:text-[#9D4EDD] transition relative"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#9D4EDD] transition-all duration-300 hover:w-full"></span>
          </a>
        ))}
        <a
          href="/resume.pdf"
          className="border border-[#9D4EDD] text-[#9D4EDD] px-3 py-1 rounded-md hover:bg-[#9D4EDD] hover:text-black transition"
        >
          resume
        </a>
      </div>
    </motion.nav>
  );
}
