import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center animate-fadeIn">
      <h2 className="text-4xl font-bold mb-12">Let's Connect</h2>

      <div className="flex justify-center gap-10 text-4xl">

        <a
          href="mailto:bjj46@pitt.edu"
          className="hover:text-accent transition transform hover:-translate-y-1"
        >
          <HiOutlineMail />
        </a>

        <a
          href="https://github.com/brianjeong727"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition transform hover:-translate-y-1"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/brianjeong727"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition transform hover:-translate-y-1"
        >
          <FaLinkedin />
        </a>
      </div>

      <p className="text-gray-400 text-sm mt-10">
        Built with React & TailwindCSS · © {new Date().getFullYear()} Brian Jeong
      </p>
    </section>
  );
}
