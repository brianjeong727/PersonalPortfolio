import type { Metadata } from "next";
import Link from "next/link";

// Research write-up template. Not linked from the home page until it has real content.
export const metadata: Metadata = {
  title: "PittNAIL",
  robots: { index: false },
};

export default function PittnailPage() {
  return (
    <div className="cs">
      <Link className="back" href="/#pittnail">← All work</Link>

      <header className="cs-hero">
        <h1>PittNAIL</h1>
        <p className="line todo">[Project title, in one plain sentence]</p>
        <dl className="facts">
          <div><dt>Role</dt><dd>Research engineer</dd></div>
          <div><dt>Lab</dt><dd>PittNAIL, University of Pittsburgh</dd></div>
          <div><dt>Timeline</dt><dd className="todo">[start] – now</dd></div>
          <div><dt>Status</dt><dd>In progress</dd></div>
        </dl>
      </header>

      <section className="section">
        <h2>The question</h2>
        <div className="body"><p className="todo">[What the project is trying to find out, and why it matters]</p></div>
      </section>
      <section className="section">
        <h2>My part</h2>
        <div className="body"><p className="todo">[Exactly what you built: data pipeline, experiment infra, tooling, serving]</p></div>
      </section>
      <section className="section">
        <h2>Approach</h2>
        <div className="body"><p className="todo">[System diagram + the one or two engineering decisions that mattered]</p></div>
      </section>
      <section className="section">
        <h2>Results</h2>
        <div className="body"><p className="todo">[Figures, numbers, or a paper/poster link once there is one]</p></div>
      </section>
    </div>
  );
}
