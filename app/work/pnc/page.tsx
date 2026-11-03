import type { Metadata } from "next";
import Link from "next/link";
import Tint from "@/components/Tint";
import { PncPipeline } from "@/components/figures";

export const metadata: Metadata = {
  title: "PNC",
  description: "Software engineering internship on PNC's ML Ops team: production scoring pipelines on AWS and Spark.",
};

// Described at the level of approach only: no internal system names, people, data, or code.
const CARDS = [
  {
    problem: "A home-equity marketing model existed only as a template, with no way to score customers in production.",
    did: "Built the production inference pipeline on AWS that turns the template into a scheduled, live scoring job.",
    result: "The model now scores in production.",
  },
  {
    problem: "A debit card fraud model's PySpark job spent most of its time on multi-table joins.",
    did: "Repartitioned the joins and tuned chunk sizes so the work spread evenly across the cluster.",
    result: "Runtime cut by 60%.",
  },
  {
    problem: "A Tier 1 XGBoost fraud model has to score every customer each cycle on on-prem Spark.",
    did: "Operated its batch inference runs end to end.",
    result: "9M+ records scored per cycle.",
  },
  {
    problem: "Two models produced nulls and training/serving mismatches from loosely defined data.",
    did: "Defined PySpark schemas for their customer-level features and outputs.",
    result: "Null and consistency issues resolved for both models.",
  },
];

export default function PncPage() {
  return (
    <div className="cs">
      <Tint value="pnc" />
      <Link className="back" href="/#pnc">← All work</Link>

      <header className="cs-hero">
        <h1>PNC</h1>
        <p className="line">Software engineering intern on the Machine Learning Operations team.</p>
        <dl className="facts">
          <div><dt>Role</dt><dd>SWE Intern, ML Ops</dd></div>
          <div><dt>Timeline</dt><dd>Jun 2026 – now</dd></div>
          <div><dt>Where</dt><dd>Pittsburgh, PA</dd></div>
          <div><dt>Stack</dt><dd>PySpark, AWS, XGBoost</dd></div>
        </dl>
      </header>

      <section className="section">
        <h2>The work</h2>
        <div className="body">
          <p>
            ML Ops takes models that data scientists have trained and makes them run reliably on real customer data,
            on a schedule, at bank scale. My part was the pipelines around the models: getting features in, scoring
            out, and making both fast and predictable.
          </p>
          <div className="figure"><PncPipeline /></div>
        </div>
      </section>

      <section className="section">
        <h2>What I did</h2>
        <div className="cards">
          {CARDS.map((c) => (
            <div className="card" key={c.result}>
              <span className="label">Problem</span>
              <p>{c.problem}</p>
              <span className="label">What I did</span>
              <p>{c.did}</p>
              <p className="result">{c.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>One migration, up close</h2>
        <div className="body">
          <p>
            The home-equity model was a notebook-style script: config from a YAML file, features computed in the
            same process, two models scored together, and Spark writing straight to Hive. The team&apos;s production
            template expects something different: a class with a run and a save step, configuration from
            environment variables, features read from partitioned parquet, and plain pandas with no Spark session.
          </p>
          <p>
            Before writing anything I mapped the gap line by line, then made a call on each mismatch. Each of the
            three model artifacts got its own environment variable instead of being bundled into one folder.
            The Hive write went away, because the team downstream registers the landing-zone output themselves.
            The performance check and summary tables stayed out of the scoring path, since they&apos;re monitoring,
            not scoring. And the models already carry their own feature lists, so nothing is hardcoded.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>What I learned</h2>
        <div className="body">
          <p>
            <b>The Python was the easy part.</b> The hard questions were ones the code couldn&apos;t answer. Does the
            feature pipeline always finish writing before inference starts? Do downstream readers depend on the
            old partition scheme? Are two date fields the same thing, or only usually the same?
          </p>
          <p>
            So I learned to write those assumptions down where they live: a path check that fails loudly if
            the features aren&apos;t there, and docstrings that flag each decision point for review. I learned to
            bring them to my mentor as specific questions, not as a vague sense that something might be off.
          </p>
        </div>
      </section>

      <nav className="next" aria-label="More work">
        <Link href="/work/chaeum"><span>Previous</span><b>← Chaeum</b></Link>
        <Link href="/"><span>All work</span><b>Home →</b></Link>
      </nav>
    </div>
  );
}
