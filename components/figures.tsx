// Diagrams and code excerpts shown in case-study panels.
// Code is copied from the project repos; diagrams are drawn by hand to match them.

export function CentralArchitecture() {
  return (
    <svg className="diagram" viewBox="0 0 520 420" role="img" aria-label="Web and mobile clients call Next.js server actions, which read and write Supabase Postgres under row-level security. A separate route sends OCR text to the Anthropic API.">
      <rect className="hl" x="30" y="40" width="200" height="64" rx="8" />
      <text x="46" y="68">Web · iOS · Android</text>
      <text className="s" x="46" y="88">Next.js + Capacitor</text>
      <rect x="290" y="40" width="200" height="64" rx="8" />
      <text x="306" y="68">Server actions + API</text>
      <text className="s" x="306" y="88">authz checks per team</text>
      <rect className="hl" x="290" y="190" width="200" height="72" rx="8" />
      <text x="306" y="218">Supabase Postgres</text>
      <text className="s" x="306" y="238">row-level security</text>
      <text className="s" x="306" y="252">ministry-scoped tenants</text>
      <rect x="30" y="190" width="200" height="72" rx="8" />
      <text x="46" y="218">Group algorithm</text>
      <text className="s" x="46" y="238">runs in the browser</text>
      <rect x="290" y="320" width="200" height="64" rx="8" />
      <text x="306" y="348">Anthropic API</text>
      <text className="s" x="306" y="368">chord chart → slides</text>
      <path d="M230 72 H290" />
      <path d="M390 104 V190" />
      <path d="M130 104 V190" />
      <path d="M390 262 V320" />
    </svg>
  );
}

export function CentralPipeline() {
  return (
    <svg className="diagram" viewBox="0 0 520 420" role="img" aria-label="A photo of a chord chart goes through Tesseract OCR, then the Anthropic API structures it into slides for Sunday.">
      <rect x="160" y="30" width="200" height="56" rx="8" />
      <text x="176" y="63">Photo of chord chart</text>
      <rect x="160" y="130" width="200" height="56" rx="8" />
      <text x="176" y="155">OCR</text>
      <text className="s" x="176" y="173">Tesseract.js</text>
      <rect className="hl" x="160" y="230" width="200" height="56" rx="8" />
      <text x="176" y="255">Structure + layout</text>
      <text className="s" x="176" y="273">Anthropic API</text>
      <rect x="160" y="330" width="200" height="56" rx="8" />
      <text x="176" y="363">Slides for Sunday</text>
      <path d="M260 86 V130" />
      <path d="M260 186 V230" />
      <path d="M260 286 V330" />
    </svg>
  );
}

export function CentralCode() {
  return (
    <pre className="code">
      <span className="c">{"// lib/group-algorithm.ts (excerpt, loops simplified)\n"}</span>
      <span className="c">{"// Score a group by how many pairs were together last season.\n"}</span>
      <span className="kw">const</span> <span className="fn">groupScore</span>{" = (g: PoolPerson[]) => {\n  "}
      <span className="kw">let</span>{" s = 0\n  "}
      <span className="kw">for</span>{" ("}<span className="kw">let</span>{" i = 0; i < g.length; i++)\n    "}
      <span className="kw">for</span>{" ("}<span className="kw">let</span>{" j = i + 1; j < g.length; j++)\n      s += pairPenalty.get(pairKey(g[i].id, g[j].id)) ?? 0\n  "}
      <span className="kw">return</span>{" s\n}\n\n"}
      <span className="kw">for</span>{" ("}<span className="kw">let</span>{" pass = 0; pass < 60; pass++) {\n  "}
      <span className="kw">let</span>{" improved = "}<span className="kw">false</span>{"\n  "}
      <span className="c">{"// for every person pi in group gi, and pj in group gj:\n"}</span>
      <span className="hl"><span className="c">{"  // Only groups gi and gj change under this swap, so score the delta."}</span></span>{"\n"}
      <span className="hl">{"  "}<span className="kw">const</span>{" before = groupScore(groups[gi]) + groupScore(groups[gj])"}</span>{"\n  swap(gi, pi, gj, pj)\n"}
      <span className="hl">{"  "}<span className="kw">const</span>{" after = groupScore(groups[gi]) + groupScore(groups[gj])"}</span>{"\n  "}
      <span className="kw">if</span>{" (after < before) improved = "}<span className="kw">true</span>{"\n  "}
      <span className="kw">else</span>{" swap(gi, pi, gj, pj) "}<span className="c">{"// undo"}</span>{"\n  "}
      <span className="kw">if</span>{" (!improved) "}<span className="kw">break</span>{"\n}"}
    </pre>
  );
}

export function ChaeumTower() {
  const floors = [
    ["RF", "Rooftop · contact"],
    ["AR", "Archive · all 24 works"],
    ["04", "Featured work"],
    ["03", "Featured work"],
    ["02", "Services"],
    ["01", "About"],
    ["00", "Lobby"],
  ];
  return (
    <svg className="diagram" viewBox="0 0 520 420" role="img" aria-label="The site as a building: seven floors from lobby to rooftop, with an elevator shaft that tracks scroll position and a panel showing the current floor.">
      {floors.map(([code, name], i) => (
        <g key={code}>
          <rect className={code === "03" ? "hl" : undefined} x="150" y={30 + i * 52} width="300" height="44" rx="4" />
          <text x="166" y={57 + i * 52}>{code}</text>
          <text className="s" x="206" y={57 + i * 52}>{name}</text>
        </g>
      ))}
      <rect x="70" y="30" width="40" height="356" rx="4" />
      <rect className="hl" x="76" y="140" width="28" height="36" rx="3" />
      <text className="s" x="40" y="410">shaft = scroll progress</text>
      <path d="M110 158 H150" />
    </svg>
  );
}

export function ChaeumPipeline() {
  return (
    <svg className="diagram" viewBox="0 0 520 420" role="img" aria-label="JPEGs in src/assets are loaded by a typed glob that fails the build if a file is missing, then Astro's image pipeline emits content-hashed WebP.">
      <rect x="160" y="30" width="200" height="56" rx="8" />
      <text x="176" y="55">24 JPEGs</text>
      <text className="s" x="176" y="73">src/assets/work</text>
      <rect className="hl" x="160" y="130" width="200" height="56" rx="8" />
      <text x="176" y="155">Typed glob loader</text>
      <text className="s" x="176" y="173">missing file = failed build</text>
      <rect x="160" y="230" width="200" height="56" rx="8" />
      <text x="176" y="255">astro:assets</text>
      <text className="s" x="176" y="273">resize + convert</text>
      <rect x="160" y="330" width="200" height="56" rx="8" />
      <text x="176" y="355">Hashed WebP</text>
      <text className="s" x="176" y="373">cached forever</text>
      <path d="M260 86 V130" />
      <path d="M260 186 V230" />
      <path d="M260 286 V330" />
    </svg>
  );
}

export function ChaeumCode() {
  return (
    <pre className="code">
      <span className="c">{"// src/pages/index.astro (excerpt): elevator floor tracking\n"}</span>
      <span className="kw">const</span>{" floorIO = "}<span className="kw">new</span> <span className="fn">IntersectionObserver</span>{"(entries => {\n  entries.forEach(en => {\n    "}
      <span className="kw">if</span>{" (en.isIntersecting && en.intersectionRatio > 0.4) {\n      "}
      <span className="kw">const</span>{" el = en.target "}<span className="kw">as</span>{" HTMLElement\n"}
      <span className="hl">{"      floorNum.innerHTML = fmtFloor(el.dataset.floor!)"}</span>{"\n"}
      <span className="hl">{"      floorName.textContent = (el.dataset.name ?? '').split(' / ')[0]"}</span>{"\n      document.querySelectorAll('#dir a').forEach(a =>\n        a.classList.toggle('active', a.dataset.for === el.id))\n    }\n  })\n}, { threshold: [0.4, 0.6] })\n\n"}
      <span className="c">{"// the shaft's car rides the scroll position\n"}</span>
      <span className="kw">const</span>{" p = clamp(scrollY / h, 0, 1)\nshaftCar.style.top = (p * (shaftH - 12)) + 'px'"}
    </pre>
  );
}

export function PncPipeline() {
  return (
    <svg className="diagram" viewBox="0 0 640 220" role="img" aria-label="Generic batch scoring flow: source tables feed PySpark feature jobs, a trained model scores records in batch, and scored output lands in output tables for downstream teams.">
      <rect x="10" y="80" width="110" height="60" rx="8" />
      <text x="24" y="106">Source tables</text>
      <text className="s" x="24" y="124">customer data</text>
      <rect className="hl" x="160" y="80" width="130" height="60" rx="8" />
      <text x="174" y="106">PySpark features</text>
      <text className="s" x="174" y="124">partitioned joins</text>
      <rect x="330" y="80" width="130" height="60" rx="8" />
      <text x="344" y="106">Batch scoring</text>
      <text className="s" x="344" y="124">XGBoost · 9M+ rows</text>
      <rect x="500" y="80" width="130" height="60" rx="8" />
      <text x="514" y="106">Output tables</text>
      <text className="s" x="514" y="124">typed schema</text>
      <path d="M120 110 H160" />
      <path d="M290 110 H330" />
      <path d="M460 110 H500" />
      <text className="s" x="10" y="200">simplified and generic: no internal systems, names, or data</text>
    </svg>
  );
}

export function CentralPolicyCode() {
  return (
    <pre className="code">
      <span className="c">{"-- supabase/event_plans_tenant_scoping_hotfix.sql (excerpt)\n"}</span>
      <span className="kw">CREATE POLICY</span>{" event_plans_update "}<span className="kw">ON</span>{" public.event_plans\n  "}
      <span className="kw">FOR UPDATE USING</span>{" (\n"}
      <span className="hl">{"    ministry_id = ("}<span className="kw">SELECT</span>{" auth_ministry_id())"}</span>{"\n    "}
      <span className="kw">AND</span>{" (\n      ("}<span className="kw">SELECT</span>{" auth_is_admin_or_leader())\n      "}
      <span className="kw">OR EXISTS</span>{" (\n        "}<span className="kw">SELECT</span>{" 1 "}<span className="kw">FROM</span>{" team_members tm\n        "}
      <span className="kw">JOIN</span>{" team_roles tr "}<span className="kw">ON</span>{" tr.id = tm.role_id\n        "}
      <span className="kw">JOIN</span>{" teams t "}<span className="kw">ON</span>{" t.id = tm.team_id\n        "}
      <span className="kw">WHERE</span>{" tm.user_id = ("}<span className="kw">SELECT</span>{" auth.uid())\n"}
      <span className="hl">{"          "}<span className="kw">AND</span>{" t.ministry_id = ("}<span className="kw">SELECT</span>{" auth_ministry_id())"}</span>{"\n          "}
      <span className="kw">AND</span>{" tr.permissions @> '[\"can_plan_events\"]'::jsonb\n      )\n    )\n  );"}
    </pre>
  );
}
