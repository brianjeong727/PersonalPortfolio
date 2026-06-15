export interface WorkPoint {
  h: string;
  t: string;
}

export interface WorkMind {
  title: string;
  copy: string;
  points: WorkPoint[];
}

export interface WorkHeart {
  title: string;
  copy: string;
  stat: string;
}

export interface WorkHands {
  title: string;
  copy: string;
  stack: string[];
}

export interface Work {
  id: string;
  name: string;
  roman: [string, string, string];
  hint: string;
  node?: string;
  status: { label: string; kind: string };
  link: { href: string; label: string };
  mind: WorkMind;
  heart: WorkHeart;
  hands: WorkHands;
}

export interface BodyItem {
  role: string;
  org: string;
  t: string;
}

export interface BodySection {
  tag: string;
  title: string;
  items: BodyItem[];
  cta?: { href: string; label: string };
}

export const WORKS: Work[] = [
  {
    id: "central",
    name: "Central",
    roman: ["i", "ii", "iii"],
    hint: "Church operating system",
    node: "primary",
    status: { label: "Live · 200+ users", kind: "live" },
    link: { href: "https://joincentral.app", label: "joincentral.app" },
    mind: {
      title: "I mapped how the ministry actually ran <em>before</em> I wrote a line.",
      copy: "A 197-member campus ministry was stitched across FB Messenger, Google Drive, and WorshipTools — four disconnected tools. As Finance &amp; Operations Director I lived inside that workflow, so I knew exactly where it broke. The framework was never the hard part. <b>The people-logic was.</b>",
      points: [
        { h: "Fairness as an algorithm", t: "Balancing 14 small groups across gender, grade, and history — a human fairness problem encoded as a constraint solver." },
        { h: "Multi-tenant from day one", t: "Five role tiers with team-scoped JSONB permissions — every ministry sees only its own world." },
        { h: "Accountability by design", t: "An immutable audit log across every admin action — trust written into the schema." },
      ],
    },
    heart: {
      title: "It came from my <em>own</em> ministry. I was the user before I was the builder.",
      copy: "I wasn't solving a stranger's problem. I served this community, felt the friction every week, and knew what it cost volunteers. Central now serves 200+ people across Pitt and CMU — and it isn't a demo. People depend on it weekly. I built the right thing because I understood the people first.",
      stat: "197 → 200+ — the community that became the product",
    },
    hands: {
      title: "Then I built the whole thing — and let AI <em>earn</em> its place.",
      copy: "I designed and own Central end to end. Where AI actually gave volunteer hours back, I reached for it: an OCR worship-prep pipeline that parses chord charts with Tesseract.js and generates slides through the Anthropic API. Not a buzzword — real time returned to real people.",
      stack: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tesseract.js", "Anthropic API"],
    },
  },
  {
    id: "prism",
    name: "Prism",
    roman: ["i", "ii", "iii"],
    hint: "Real-time incident command",
    status: { label: "Live link incoming", kind: "pending" },
    link: { href: "#", label: "link incoming" },
    mind: {
      title: "I reasoned backwards from a commander <em>under pressure.</em>",
      copy: "Emergency dispatch needs a live shared picture — where every unit is, what's depleted, what to send next — instantly. The decision that mattered most: let AI estimate, but <b>never let it become the truth.</b> The system stays the source of record; the model only advises.",
      points: [
        { h: "Live operational state", t: "Unit tracking across four operational states, reconciled in real time." },
        { h: "An audit you can search", t: "A LogEntry system records every status transition — a searchable timeline and depletion tracking." },
        { h: "AI in the loop, not in command", t: "Recorded transitions feed Mistral AI for engine and ambulance estimates — advisory only." },
      ],
    },
    heart: {
      title: "High-stakes means someone is <em>scared.</em> The screen has to be kind.",
      copy: "Incident commanders and EMS/fire crews don't need more features — they need clarity in the worst moment of someone's day. Understanding that pressure shaped every choice: what to surface, what to hide, and what must never be ambiguous.",
      stat: "Built for the person making the call when seconds matter",
    },
    hands: {
      title: "An ambiguous, high-stakes problem — <em>shipped fast.</em>",
      copy: "A real-time dashboard for Incident Commanders and EMS/fire units, with live tracking, a searchable event timeline, and AI-assisted estimation. Proof I can take a vague, high-pressure brief and stand up a working real-time system in weeks.",
      stack: ["React", "Django", "Supabase", "Mistral AI"],
    },
  },
  {
    id: "chaeum",
    name: "Chaeum",
    roman: ["i", "ii", "iii"],
    hint: "A site that moves like a building",
    status: { label: "Shipped · Seoul", kind: "shipped" },
    link: { href: "https://chaeum-j-com.vercel.app", label: "chaeum-j-com.vercel.app" },
    mind: {
      title: "I turned a <em>building</em> into a navigation system.",
      copy: "A Seoul real-estate agency had no web presence that conveyed trust or craft. I conceived a “Tower” metaphor: an elevator progress indicator that turns passive scrolling into active, floor-by-floor exploration — the site behaves like the building it represents.",
      points: [
        { h: "Architecture as concept", t: "Information architecture mapped to floors — the structure is the story." },
        { h: "A bilingual type system", t: "KR/ENG across four typefaces on a blueprint-grid identity, led by the agency's manifesto." },
        { h: "Build-time discipline", t: "A pipeline converting JPEGs to content-hashed WebP, with a typed data layer for 24 pieces." },
      ],
    },
    heart: {
      title: "I led with <em>their</em> voice, not mine.",
      copy: "Trust is emotional. I started from the agency's own manifesto and built the identity around how they wanted to be felt — bilingual, crafted, confident. Evidence that I care about how a thing feels, not only whether it works.",
      stat: "A client's brand, understood from the inside out",
    },
    hands: {
      title: "Astro 5, <em>end to end.</em>",
      copy: "I built the whole site: the Tower interaction, the bilingual typographic system, and a build-time image pipeline serving 24 portfolio pieces — fast, cached, and typed.",
      stack: ["Astro 5", "TypeScript", "WebP pipeline"],
    },
  },
];

export const NODE_ICONS: Record<string, string> = {
  central: `<g class="orbit"><circle class="gdot" cx="50" cy="12" r="2.4"/><circle class="gdot" cx="84" cy="38" r="2.4"/><circle class="gdot" cx="72" cy="82" r="2.4"/><circle class="gdot" cx="28" cy="82" r="2.4"/><circle class="gdot" cx="16" cy="38" r="2.4"/></g>
    <path class="gline" d="M50 12 L50 38 M84 38 L60 46 M72 82 L56 58 M28 82 L44 58 M16 38 L40 46"/>
    <circle class="gline" cx="50" cy="50" r="13"/>`,
  prism: `<path class="gline" d="M50 22 L78 74 L22 74 Z"/>
    <path class="gline" d="M8 50 L34 56"/>
    <path class="gline" d="M66 56 L92 44 M66 60 L92 56 M66 64 L92 68"/>`,
  chaeum: `<path class="gline" d="M34 84 L34 28 L66 16 L66 84"/>
    <path class="gline" d="M34 40 L66 30 M34 52 L66 44 M34 64 L66 58 M34 76 L66 72"/>
    <path class="gline" d="M24 84 L76 84"/>`,
};

export const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  central: { x: 57, y: 55 },
  prism: { x: 81, y: 27 },
  chaeum: { x: 83, y: 78 },
};

export const BODY: Record<string, BodySection> = {
  head: {
    tag: "the foundation",
    title: "Everything I study sharpens how I <em>solve.</em>",
    items: [
      { role: "B.S. Computer Science & Data Science", org: "University of Pittsburgh · Minor in Korean · GPA 3.77 · 2027", t: "" },
      { role: "Coursework that compounds", org: "", t: "Database Systems · Data Structures & Algorithms II · Operating Systems · Machine Learning · Artificial Intelligence · Systems Software · Computer Organization & Assembly." },
    ],
    cta: { href: "/Brian-Jeong-Resume.pdf", label: "Résumé ↗" },
  },
  heart: {
    tag: "the care",
    title: "I teach the way I build — for the <em>person in front of me.</em>",
    items: [
      { role: "Undergraduate Teaching Assistant", org: "Data Structures & Algorithms II · Pitt", t: "200+ review slides, recitations and office hours, projects redesigned around real cybersecurity scenarios — average exam scores up 15% across 60+ students." },
      { role: "Peer Tutor", org: "Computer & Information Science · Pitt", t: "20 weekly hours across DSA II, Computer Org & Assembly, and Intermediate Programming — 35+ students, understanding over answers." },
      { role: "Finance & Operations Director", org: "Korean Central Church of Pittsburgh", t: "A $5.8K budget for a 197-member nonprofit; $1.5K secured in grants; operating budget grown 3.9×. The community that became Central." },
    ],
  },
  hands: {
    tag: "the craft",
    title: "Where my technical work runs in <em>production.</em>",
    items: [
      { role: "Software Engineering Intern — ML Ops", org: "PNC Financial Services", t: "Built a production inference pipeline for a home-equity model on AWS; cut a Debit Card Fraud model's runtime 60% via PySpark partitioning; ran batch inference for a Tier-1 XGBoost fraud model scoring 9M+ records per cycle." },
    ],
  },
};
