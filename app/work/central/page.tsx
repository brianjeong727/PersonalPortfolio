import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import Screen from "@/components/Screen";
import Scrolly, { type Panel, type Step } from "@/components/Scrolly";
import Tint from "@/components/Tint";
import {
  CentralArchitecture,
  CentralCode,
  CentralPipeline,
  CentralPolicyCode,
} from "@/components/figures";
import { RECORDINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Central",
  description: "Case study: a multi-tenant church operating system used weekly by 200+ people.",
};

const PANELS: Panel[] = [
  { node: <CentralArchitecture />, caption: "fig. architecture" },
  { node: <CentralPolicyCode />, caption: "real code · row-level security policy" },
  { node: <CentralCode />, caption: "real code · group balancing" },
  { node: <CentralPipeline />, caption: "fig. worship-prep pipeline" },
];

const STEPS: Step[] = [
  {
    kicker: "How it works",
    title: "One Next.js app, one Postgres database",
    body: "The same codebase ships to the web and, through Capacitor, to iOS and Android. Supabase provides auth and Postgres. Each ministry is a tenant, and each tenant's teams carry their own roles and permissions.",
    panel: 0,
  },
  {
    kicker: "Decision 01",
    title: "Tenant boundaries live in the database",
    body: "Every table is guarded by Postgres row-level security, so a query can only ever see its own ministry's rows. Team permissions are JSONB arrays that policies check directly, so adding a permission doesn't need a migration.",
    tradeoff: "the rules live in SQL instead of TypeScript, so they're harder to test. That's exactly where the bug below came from.",
    panel: 1,
  },
  {
    kicker: "Decision 02",
    title: "Fair small groups you can explain in one sentence",
    body: "Members are dealt round-robin by graduation year, visitors fill the smallest groups, then the algorithm swaps pairs of people until nobody is stuck with last season's group.",
    tradeoff: "local search won't find the perfect grouping, but it runs instantly in the browser and leaders can see why someone landed where they did.",
    panel: 2,
  },
  {
    kicker: "Decision 03",
    title: "AI only where it gives hours back",
    body: "Worship prep meant retyping chord charts into slides every week. Now a photo of the chart goes through OCR, and the Anthropic API structures the text into a slide deck.",
    tradeoff: "[Brian: what you gave up, e.g. cost per run or a review step before slides go live]",
    panel: 3,
  },
];

export default function CentralPage() {
  return (
    <div className="cs">
      <Tint value="central" />
      <Link className="back" href="/#central">← All work</Link>

      <header className="cs-hero">
        <h1>Central</h1>
        <p className="line">A church operating system I designed, built, and still run for my own ministry.</p>
        <dl className="facts">
          <div><dt>Role</dt><dd>Solo designer and engineer</dd></div>
          <div><dt>Timeline</dt><dd>Aug 2025 – now</dd></div>
          <div><dt>Users</dt><dd>200+ weekly, Pitt and CMU</dd></div>
          <div><dt>Live</dt><dd><a href="https://joincentral.app" target="_blank" rel="noopener noreferrer">joincentral.app ↗</a></dd></div>
        </dl>
        <ViewTransition name="shot-central" share="morph">
          <Screen src={RECORDINGS.central} label="Central screen recording" wide still />
        </ViewTransition>
      </header>

      <section className="section">
        <h2>The problem</h2>
        <div className="body">
          <p>
            A 197-member campus ministry ran on four disconnected tools. Announcements lived in Messenger, files in
            Drive, sign-ups in forms, and worship sets in WorshipTools. As finance and operations director I was the
            one stitching them together every week, so I knew exactly where it broke.
          </p>
        </div>
      </section>

      <Scrolly steps={STEPS} panels={PANELS} />

      <section className="section">
        <h2>What broke</h2>
        <div className="body">
          <p>
            <b>A write policy that forgot which ministry it was in.</b> While building event budgets, I found that
            the write policies on event plans checked for a planning permission but never checked the ministry. A
            planner in one ministry could run an unfiltered update or delete and reach every ministry&apos;s plans.
          </p>
          <p>
            I proved it before fixing it: inside a transaction that rolled back, an unfiltered delete from a
            member-tier account matched 80 rows across all 4 ministries. The fix scoped both the row and the
            permission lookup to the caller&apos;s ministry. The same probes then touched only that ministry&apos;s
            35 rows, cross-ministry inserts were denied, and no real planner lost access.
          </p>
          <p>
            I shipped the policy fix on its own, separate from the feature that surfaced it, so it could go out
            immediately.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Results</h2>
        <div className="body">
          <p><b>200+ people</b> use Central every week across Pitt and CMU, and <b>4 ministries</b> run on it as separate tenants.</p>
          <p className="todo">[Brian: a short quote from a leader or member, plus any number you track, like hours of worship prep saved]</p>
        </div>
      </section>

      <nav className="next" aria-label="More work">
        <Link href="/"><span>All work</span><b>← Home</b></Link>
        <Link href="/work/chaeum"><span>Next</span><b>Chaeum →</b></Link>
      </nav>
    </div>
  );
}
