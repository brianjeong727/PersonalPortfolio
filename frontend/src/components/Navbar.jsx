export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 sticky top-0 z-50 bg-accent/20 backdrop-blur-md border-b border-accent/30">
      <h1 className="text-xl font-bold tracking-wide text-accent">
        Brian Jeong
      </h1>

      <div className="flex gap-8 text-md font-semibold">
        <a href="#about" className="text-accent hover:underline underline-offset-4 transition">
          About
        </a>
        <a href="#projects" className="text-accent hover:underline underline-offset-4 transition">
          Projects
        </a>
        <a href="#contact" className="text-accent hover:underline underline-offset-4 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}
