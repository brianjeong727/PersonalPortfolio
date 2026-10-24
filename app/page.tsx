import Link from "next/link";
import { ViewTransition } from "react";
import Screen from "@/components/Screen";
import SidebarIndex, { type IndexItem } from "@/components/Sidebar";
import { PncPipeline } from "@/components/figures";
import { PROFILE, RECORDINGS } from "@/lib/site";

const INDEX: IndexItem[] = [
  { id: "central", n: "01", title: "Central" },
  { id: "chaeum", n: "02", title: "Chaeum" },
  { id: "pnc", n: "03", title: "PNC" },
  { id: "pittnail", n: "04", title: "PittNAIL" },
];

export default function Home() {
  return (
    <div className="shell">
      <aside className="side">
        <div>
          <h1>{PROFILE.name}</h1>
          <div className="role">{PROFILE.role}</div>
          <p className="bio">{PROFILE.bio}</p>
          <SidebarIndex items={INDEX} />
        </div>
        <div className="links">
          {PROFILE.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
          <span className="mono">{PROFILE.email}</span>
        </div>
      </aside>

      <main className="work">
        <section className="entry" id="central" data-tint="central">
          <div className="head">
            <span className="num">01</span>
            <h2>Central</h2>
            <span className="badge">Live · 200+ weekly users</span>
          </div>
          <p className="line">
            The operating system for a 197-member campus ministry. One app replaced Messenger, Drive, and
            WorshipTools, on the web, iOS, and Android.
          </p>
          <Link href="/work/central" aria-label="Open the Central case study">
            <ViewTransition name="shot-central" share="morph">
              <Screen src={RECORDINGS.central} label="Central screen recording" />
            </ViewTransition>
          </Link>
          <div className="stack">Next.js · Supabase · PostgreSQL · Capacitor · Anthropic API</div>
          <Link className="cta" href="/work/central">Read the case study →</Link>
        </section>

        <section className="entry" id="chaeum" data-tint="chaeum">
          <div className="head">
            <span className="num">02</span>
            <h2>Chaeum</h2>
            <span className="badge">Shipped · Seoul</span>
          </div>
          <p className="line">
            A bilingual site for a Seoul real-estate ad agency that you explore floor by floor, like a building.
          </p>
          <Link href="/work/chaeum" aria-label="Open the Chaeum case study">
            <ViewTransition name="shot-chaeum" share="morph">
              <Screen src={RECORDINGS.chaeum} label="Chaeum screen recording" />
            </ViewTransition>
          </Link>
          <div className="stack">Astro 5 · TypeScript · astro:assets</div>
          <Link className="cta" href="/work/chaeum">Read the case study →</Link>
        </section>

        <section className="entry" id="pnc" data-tint="pnc">
          <div className="head">
            <span className="num">03</span>
            <h2>PNC</h2>
            <span className="badge">SWE Intern, ML Ops · 2026</span>
          </div>
          <p className="line">
            Production scoring pipelines for fraud and marketing models, on AWS and Spark.
          </p>
          <div className="figure">
            <PncPipeline />
          </div>
          <div className="stack">PySpark · AWS · XGBoost · Python</div>
          <Link className="cta" href="/work/pnc">See what I worked on →</Link>
        </section>

        <section className="entry compact" id="pittnail">
          <div className="head">
            <span className="num">04</span>
            <h2>PittNAIL</h2>
            <span className="badge">In progress</span>
          </div>
          <p className="line">
            Owning the engineering side of a research project in my lab at Pitt. Write-up to come as the work
            takes shape.
          </p>
        </section>
      </main>
    </div>
  );
}
