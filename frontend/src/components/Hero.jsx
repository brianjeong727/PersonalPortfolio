import me from "../assets/placeholder-3.png";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-24 px-6">
      <img src={me} alt="Brian" className="w-36 h-36 rounded-full object-cover border-2 border-accent shadow-lg mb-6" />
      <h1 className="text-5xl font-extrabold mb-4">
        Hi, I'm <span className="text-accent">Brian.</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-xl">
        I turn ideas into impactful software.
      </p>
      <a href="#projects" className="mt-8 inline-block border border-accent text-accent px-6 py-3 rounded-md hover:bg-accent hover:text-black transition font-medium">
        View Projects
      </a>
    </section>
  );
}
