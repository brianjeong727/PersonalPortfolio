import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import me from "../assets/Headshot.png";

export default function Hero() {
  const fullText = `> Hello, I'm Brian Jeong\nSoftware Engineer • Full-Stack Developer • AI Builder`;
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  // TYPEWRITER EFFECT
  useEffect(() => {
    let i = 0;
    const speed = 35; // typing speed (ms per character)

    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(interval);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 text-center grid-bg overflow-hidden">

      {/* Spotlight */}
      <div className="spotlight"></div>

      {/* Image */}
      <motion.img
        src={me}
        alt="Brian"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-40 h-40 rounded-full border-4 border-[#9D4EDD] mx-auto mb-8 
                   shadow-[0_0_25px_#9D4EDD]"
      />

      {/* TERMINAL TYPEWRITER */}
      <pre className="text-3xl md:text-4xl font-bold text-gray-100 whitespace-pre-wrap leading-snug">
        {displayedText}
        {!finished && <span className="text-[#9D4EDD] animate-blink">█</span>}
      </pre>

      {/* Button shows AFTER typing finishes */}
      {finished && (
        <motion.a
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          href="#projects"
          className="mt-10 inline-block border border-[#9D4EDD] text-[#9D4EDD]
                     px-6 py-3 rounded-md hover:bg-[#9D4EDD] hover:text-black 
                     transition font-semibold neon"
        >
          View My Work
        </motion.a>
      )}
    </section>
  );
}
