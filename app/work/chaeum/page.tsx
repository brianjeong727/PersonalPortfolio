import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import Screen from "@/components/Screen";
import Scrolly, { type Panel, type Step } from "@/components/Scrolly";
import Tint from "@/components/Tint";
import { ChaeumCode, ChaeumPipeline, ChaeumTower } from "@/components/figures";
import { RECORDINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chaeum",
  description: "Case study: a bilingual site for a Seoul ad agency, navigated like an elevator.",
};

const PANELS: Panel[] = [
  { node: <ChaeumTower />, caption: "fig. the site as a building" },
  { node: <ChaeumCode />, caption: "real code · floor tracking" },
  { node: <ChaeumPipeline />, caption: "fig. build-time image pipeline" },
  { node: <Screen src={RECORDINGS.chaeum} label="Bilingual type system close-up" still />, caption: "KR / ENG type system" },
];

const STEPS: Step[] = [
  {
    kicker: "The concept",
    title: "The site is a building",
    body: "Chaeum advertises apartment towers, so the site is one. Each section is a floor, from the lobby to the rooftop, and an elevator panel always shows which floor you're on.",
    panel: 0,
  },
  {
    kicker: "Decision 01",
    title: "Scrolling is the elevator ride",
    body: "An IntersectionObserver watches every floor and updates the floor number and directory as you pass it. A car in the elevator shaft rides the scroll position, so passive scrolling turns into moving through the building.",
    tradeoff: "the navigation depends on JavaScript, so the floors still read top to bottom as a normal page without it.",
    panel: 1,
  },
  {
    kicker: "Decision 02",
    title: "Images can't silently go missing",
    body: "All 24 portfolio images go through a typed loader. If a file referenced in the data is missing, the build fails instead of shipping a broken image. Astro then resizes them and emits content-hashed WebP that can be cached forever.",
    tradeoff: "builds are slower because every image is processed at build time, not on request.",
    panel: 2,
  },
  {
    kicker: "Decision 03",
    title: "Two languages, one voice",
    body: "Korean and English sit side by side across four typefaces on a blueprint grid. I started from the agency's own manifesto so the site sounds like them, not like a template.",
    panel: 3,
  },
];

export default function ChaeumPage() {
  return (
    <div className="cs">
      <Tint value="chaeum" />
      <Link className="back" href="/#chaeum">← All work</Link>

      <header className="cs-hero">
        <h1>Chaeum</h1>
        <p className="line">A bilingual site for a Seoul real-estate ad agency, built as a building you ride through.</p>
        <dl className="facts">
          <div><dt>Role</dt><dd>Design engineer (contract)</dd></div>
          <div><dt>Timeline</dt><dd>May – Aug 2025</dd></div>
          <div><dt>Stack</dt><dd>Astro 5, TypeScript</dd></div>
          <div><dt>Live</dt><dd><a href="https://chaeum-j-com.vercel.app" target="_blank" rel="noopener noreferrer">chaeum-j-com.vercel.app ↗</a></dd></div>
        </dl>
        <ViewTransition name="shot-chaeum" share="morph">
          <Screen src={RECORDINGS.chaeum} label="Chaeum screen recording" wide still />
        </ViewTransition>
      </header>

      <section className="section">
        <h2>The problem</h2>
        <div className="body">
          <p>
            Chaeum had years of campaign work for major Korean builders, but it lived in internal documents. They
            needed a web presence that showed the craft and earned trust with clients in both Korean and English.
          </p>
        </div>
      </section>

      <Scrolly steps={STEPS} panels={PANELS} />

      <section className="section">
        <h2>What broke</h2>
        <div className="body">
          <p className="todo">[Brian: one thing that didn&apos;t work the first time, e.g. the floor tracker firing on the wrong floor, Korean line breaks, or image weight, and how you fixed it]</p>
        </div>
      </section>

      <section className="section">
        <h2>Results</h2>
        <div className="body">
          <p>Shipped to the client with <b>24 portfolio pieces</b> across seven floors, replacing internal documents as the way Chaeum shows its work.</p>
          <p className="todo">[Brian: client feedback or anything measurable since launch]</p>
        </div>
      </section>

      <nav className="next" aria-label="More work">
        <Link href="/work/central"><span>Previous</span><b>← Central</b></Link>
        <Link href="/work/pnc"><span>Next</span><b>PNC →</b></Link>
      </nav>
    </div>
  );
}
