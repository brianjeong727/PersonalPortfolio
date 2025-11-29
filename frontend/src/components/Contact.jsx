import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 text-center">
      <h2 className="text-4xl font-bold mb-10 neon">
        &gt; connect
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <p className="text-gray-300">&gt; connect --email</p>
        <a href="mailto:bjj46@pitt.edu" className="text-[#9D4EDD] neon hover:underline text-xl">
          bjj46@pitt.edu
        </a>

        <p className="text-gray-300">&gt; connect --github</p>
        <a href="https://github.com/brianjeong727" className="text-[#9D4EDD] neon hover:underline text-xl">
          github.com/brianjeong727
        </a>

        <p className="text-gray-300">&gt; connect --linkedin</p>
        <a href="https://linkedin.com/in/brianjeong727" className="text-[#9D4EDD] neon hover:underline text-xl">
          linkedin.com/in/brianjeong727
        </a>
      </motion.div>

      <p className="text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Brian Jeong — Built with React, Tailwind, Framer Motion
      </p>
    </section>
  );
}
