import igradeu from "../assets/placeholder-1.png";
import esports from "../assets/placeholder-2.png";

export default function Projects() {
  const projects = [
    {
      title: "iGradeU",
      image: igradeu,
      description:
        "AI-powered platform that forecasts student performance using Canvas, syllabus parsing, and RateMyProfessor data.",
      tech: ["React", "Django", "OpenAI API", "Canvas API"],
      github: "https://github.com/brianjeong727", // update if you have repo link
    },
    {
      title: "Esports Portfolio Builder",
      image: esports,
      description:
        "A platform for gamers to build performance-driven esports profiles featuring match history and analytics.",
      tech: ["React", "Django", "Riot API", "Chart.js"],
      github: "https://github.com/brianjeong727", // update later
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

      <div className="grid gap-12 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-[#111] rounded-lg overflow-hidden shadow-lg hover:shadow-accent/40 transition shadow-md"
          >
            <img src={project.image} alt={project.title} className="w-full" />

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 text-sm mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 border border-accent text-accent rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}