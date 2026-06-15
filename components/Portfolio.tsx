"use client";

import { useEffect, useRef, useReducer, useCallback } from "react";
import { WORKS, NODE_ICONS, NODE_POSITIONS, BODY, type Work } from "@/lib/data";
import { createFogWorld, type FogWorld } from "@/lib/worlds/fog";
import { createNeuralWorld, type NeuralWorld } from "@/lib/worlds/neural";
import { createHeartWorld, type HeartWorld } from "@/lib/worlds/heart";
import { createBuildWorld, type BuildWorld } from "@/lib/worlds/build";

// ============================================================
// Types
// ============================================================
type StaticScene = "landing" | "body" | "contact";
type JourneyStep = "j0" | "j1" | "j2" | "j3";
type SceneId = StaticScene | JourneyStep;
type SceneState = "active" | "far" | "near";

interface State {
  current: SceneId;
  prev: SceneId | null;
  prevDir: "in" | "out" | null;
  journey: { workId: string; idx: number } | null;
  init: boolean;
}

type Action =
  | { type: "ACTIVATE"; id: SceneId; dir: "in" | "out" }
  | { type: "ENTER_JOURNEY"; workId: string }
  | { type: "JOURNEY_GO"; delta: number }
  | { type: "JOURNEY_TO"; idx: number }
  | { type: "EXIT_JOURNEY" }
  | { type: "CLEAR_INIT" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ACTIVATE": {
      return { ...state, prev: state.current, prevDir: action.dir, current: action.id, init: false };
    }
    case "ENTER_JOURNEY": {
      return { ...state, prev: state.current, prevDir: "in", current: "j0", journey: { workId: action.workId, idx: 0 }, init: false };
    }
    case "JOURNEY_GO": {
      if (!state.journey) return state;
      const ni = state.journey.idx + action.delta;
      if (ni < 0) return { ...state, prev: state.current, prevDir: "out", current: "landing", journey: null };
      if (ni > 3) return state;
      const id = `j${ni}` as JourneyStep;
      return { ...state, prev: state.current, prevDir: action.delta > 0 ? "in" : "out", current: id, journey: { ...state.journey, idx: ni } };
    }
    case "JOURNEY_TO": {
      if (!state.journey || action.idx === state.journey.idx) return state;
      const dir = action.idx > state.journey.idx ? "in" : "out";
      const id = `j${action.idx}` as JourneyStep;
      return { ...state, prev: state.current, prevDir: dir, current: id, journey: { ...state.journey, idx: action.idx } };
    }
    case "EXIT_JOURNEY": {
      return { ...state, prev: state.current, prevDir: "out", current: "landing", journey: null };
    }
    case "CLEAR_INIT":
      return { ...state, init: false };
    default:
      return state;
  }
}

function sceneState(id: SceneId, state: State): SceneState {
  if (id === state.current) return "active";
  if (id === state.prev) return state.prevDir === "in" ? "far" : "near";
  return "far";
}

// ============================================================
// Body panel
// ============================================================
type BodyRegion = "head" | "heart" | "hands";

function BodyPanel({ region }: { region: BodyRegion }) {
  const d = BODY[region];
  return (
    <div id="body-panel">
      <div className="bp-head">
        <span className="bp-tag">{d.tag}</span>
        <h3 dangerouslySetInnerHTML={{ __html: d.title }} />
      </div>
      <div className="bp-items">
        {d.items.map((it, i) => (
          <div className="bp-item" key={i}>
            <div className="bp-role">{it.role}</div>
            {it.org && <div className="bp-org">{it.org}</div>}
            {it.t && <p>{it.t}</p>}
          </div>
        ))}
        {d.cta && (
          <a className="btn bp-cta" href={d.cta.href} target="_blank" rel="noopener noreferrer">
            {d.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Project journey scenes
// ============================================================
interface JourneySceneProps {
  work: Work;
  stepIdx: number; // 0=mind, 1=heart, 2=hands, 3=outro
  journeyIdx: number;
  dataState: SceneState;
  onAdvance: () => void;
  onDotClick: (k: number) => void;
  onNextWork: () => void;
  onAllWorks: () => void;
  reduceMotion: boolean;
}

function NeuralCanvas({ active, onMouseMove }: { active: boolean; onMouseMove?: (x: number, y: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const world = useRef<NeuralWorld | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (!world.current) world.current = createNeuralWorld(cv);
    if (active) {
      world.current.resize();
      world.current.start();
    } else {
      world.current.stop();
    }
    return () => { world.current?.stop(); };
  }, [active]);

  useEffect(() => {
    const handleResize = () => { if (active && world.current) world.current.resize(); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);

  return (
    <canvas
      ref={ref}
      className="world"
      onPointerMove={e => {
        if (onMouseMove && world.current) {
          const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
          world.current.mouse(e.clientX - rect.left, e.clientY - rect.top);
          onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
        }
      }}
    />
  );
}

function HeartCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const world = useRef<HeartWorld | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (!world.current) world.current = createHeartWorld(cv);
    if (active) { world.current.resize(); world.current.start(); }
    else { world.current.stop(); }
    return () => { world.current?.stop(); };
  }, [active]);
  useEffect(() => {
    const handleResize = () => { if (active && world.current) world.current.resize(); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);
  return <canvas ref={ref} className="world" />;
}

function BuildCanvas({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const world = useRef<BuildWorld | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (!world.current) world.current = createBuildWorld(cv);
    if (active) { world.current.resize(); world.current.start(); }
    else { world.current.stop(); }
    return () => { world.current?.stop(); };
  }, [active]);
  useEffect(() => {
    const handleResize = () => { if (active && world.current) world.current.resize(); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);
  return <canvas ref={ref} className="world" />;
}

function JourneyScene(props: JourneySceneProps) {
  const { work, stepIdx, journeyIdx, dataState, onAdvance, onDotClick, onNextWork, onAllWorks, reduceMotion } = props;
  const active = dataState === "active";

  if (stepIdx === 3) {
    // outro
    const nextWork = WORKS[(WORKS.indexOf(work) + 1) % WORKS.length];
    return (
      <section
        className="scene proj w-outro"
        data-state={dataState}
      >
        <div className="scene-body" style={{ textAlign: "center" }}>
          <div className="sb-idx" style={{ justifyContent: "center" }}>
            {work.name}<span className="roman">— complete</span>
          </div>
          <h2 className="sb-title" style={{ marginInline: "auto" }}>
            Thought through, felt deeply, and <em>built.</em>
          </h2>
          <div className="outro-actions">
            {work.link.href !== "#" ? (
              <a className="btn solid" href={work.link.href} target="_blank" rel="noopener noreferrer">
                {work.link.label} <span className="ar">↗</span>
              </a>
            ) : (
              <span className="btn ghost">{work.link.label}</span>
            )}
            <button className="btn" type="button" onClick={onNextWork}>
              next: {nextWork.name} <span className="ar">→</span>
            </button>
            <button className="btn" type="button" onClick={onAllWorks}>
              ← all works
            </button>
          </div>
        </div>
        <div className="progress">
          {[0, 1, 2, 3].map(k => (
            <button key={k} type="button" className={k === journeyIdx ? "on" : ""} onClick={() => onDotClick(k)} />
          ))}
        </div>
      </section>
    );
  }

  const specs = [
    { key: "mind" as const, cls: "w-mind" },
    { key: "heart" as const, cls: "w-heart" },
    { key: "hands" as const, cls: "w-hands" },
  ];
  const sp = specs[stepIdx];
  const d = work[sp.key];

  const advLabel = stepIdx < 2 ? "further in" : "where it connects";

  return (
    <section
      className={`scene proj ${sp.cls}`}
      data-state={dataState}
    >
      {sp.key === "mind" && !reduceMotion && (
        <NeuralCanvas active={active} />
      )}
      {sp.key === "heart" && !reduceMotion && (
        <HeartCanvas active={active} />
      )}
      {sp.key === "hands" && !reduceMotion && (
        <BuildCanvas active={active} />
      )}
      <div className="veil" />
      <div className="scene-body">
        <div className="sb-idx">
          {work.name}<span className="roman">— {work.roman[stepIdx]} / iii</span>
        </div>
        <h2 className="sb-title" dangerouslySetInnerHTML={{ __html: d.title }} />
        <p className="sb-copy" dangerouslySetInnerHTML={{ __html: d.copy }} />
        {sp.key === "mind" && (
          <div className="sb-points">
            {work.mind.points.map((pt, i) => (
              <div className="sb-pt" key={i}>
                <h4>{pt.h}</h4>
                <p>{pt.t}</p>
              </div>
            ))}
          </div>
        )}
        {sp.key === "heart" && (
          <div className="sb-stat">{work.heart.stat}</div>
        )}
        {sp.key === "hands" && (
          <div className="sb-stack">
            {work.hands.stack.map((s, i) => <span className="chip" key={i}>{s}</span>)}
          </div>
        )}
      </div>
      <button className="advance" type="button" onClick={onAdvance}>
        <span className="lab">{advLabel}</span>
        <span className="disc"><span className="ico">→</span></span>
      </button>
      <div className="progress">
        {[0, 1, 2, 3].map(k => (
          <button key={k} type="button" className={k === journeyIdx ? "on" : ""} onClick={() => onDotClick(k)} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Main Portfolio
// ============================================================
export default function Portfolio() {
  const [state, dispatch] = useReducer(reducer, {
    current: "landing",
    prev: null,
    prevDir: null,
    journey: null,
    init: true,
  });

  const fogRef = useRef<HTMLCanvasElement>(null);
  const fogWorld = useRef<FogWorld | null>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(false);
  const touchY = useRef<number | null>(null);
  const [bodyRegion, setBodyRegion] = useReducerState<BodyRegion>("head");
  const reduceMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // boot: init class + reveal-on
  useEffect(() => {
    const de = document.documentElement;
    de.classList.add("init", "reveal-on");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        de.classList.remove("init");
        dispatch({ type: "CLEAR_INIT" });
      })
    );
  }, []);

  // fog canvas
  useEffect(() => {
    if (reduceMotion) return;
    const cv = fogRef.current;
    if (!cv) return;
    fogWorld.current = createFogWorld(cv);
    fogWorld.current.start();
    const handleResize = () => fogWorld.current?.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      fogWorld.current?.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [reduceMotion]);

  // parallax on pointer move
  const handlePointerMove = useCallback((e: MouseEvent) => {
    const pmx = (e.clientX / window.innerWidth - 0.5) * 2;
    const pmy = (e.clientY / window.innerHeight - 0.5) * 2;
    fogWorld.current?.parallax(pmx, pmy);
    if (state.current === "landing" && nodesRef.current) {
      Array.from(nodesRef.current.querySelectorAll<HTMLElement>(".node")).forEach(n => {
        const d = parseFloat(n.dataset.depth || "0.6");
        n.style.transform = `translate(calc(-50% + ${pmx * d * -18}px), calc(-50% + ${pmy * d * -14}px))`;
      });
      const wm = document.querySelector<HTMLElement>(".watermark");
      if (wm) wm.style.transform = `translate(${pmx * 22}px, ${pmy * 16}px)`;
    }
  }, [state.current]);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  // wheel navigation
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (!state.journey) return;
      if (wheelLock.current) return;
      if (Math.abs(e.deltaY) < 24) return;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 900);
      dispatch({ type: "JOURNEY_GO", delta: e.deltaY > 0 ? 1 : -1 });
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [state.journey]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (state.journey) dispatch({ type: "EXIT_JOURNEY" });
        else if (state.current !== "landing") dispatch({ type: "ACTIVATE", id: "landing", dir: "out" });
      }
      if (!state.journey) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); dispatch({ type: "JOURNEY_GO", delta: 1 }); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); dispatch({ type: "JOURNEY_GO", delta: -1 }); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state.journey, state.current]);

  // touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      if (touchY.current == null || !state.journey) return;
      const dy = e.changedTouches[0].clientY - touchY.current;
      touchY.current = null;
      if (Math.abs(dy) > 60) dispatch({ type: "JOURNEY_GO", delta: dy < 0 ? 1 : -1 });
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [state.journey]);

  const inDepth = state.current !== "landing";

  const handleNodeClick = (workId: string) => {
    if (state.current === "landing") dispatch({ type: "ENTER_JOURNEY", workId });
  };

  const handleBack = () => {
    if (state.journey) dispatch({ type: "JOURNEY_GO", delta: -1 });
    else dispatch({ type: "ACTIVATE", id: "landing", dir: "out" });
  };

  const goTo = (id: StaticScene) => {
    if (id === "landing" && state.journey) dispatch({ type: "EXIT_JOURNEY" });
    else dispatch({ type: "ACTIVATE", id, dir: "in" });
  };

  const currentWork = state.journey ? WORKS.find(w => w.id === state.journey!.workId) : null;

  return (
    <>
      {!reduceMotion && <canvas id="fog" ref={fogRef} />}
      <div className="vignette" />

      <header className="chrome">
        <div className="name"><b>Brian Jeong</b></div>
        <nav>
          <button type="button" onClick={() => goTo("landing")}>Works</button>
          <button type="button" onClick={() => goTo("body")}>The Whole</button>
          <button type="button" onClick={() => goTo("contact")}>Contact</button>
        </nav>
      </header>

      <button
        className={`backcue${inDepth ? " show" : ""}`}
        type="button"
        onClick={handleBack}
      >
        <span className="ar">←</span> back
      </button>

      <div id="stage">
        {/* ── LANDING ── */}
        <section
          className="scene"
          id="scene-landing"
          data-scene="landing"
          data-state={sceneState("landing", state)}
        >
          <div className="landing-inner">
<div className="land-intro in">
              <div className="kicker">Brian Jeong · CS + Data Science · Pitt</div>
              <h1>
                I solve problems for the communities I belong to — and I build the <em>whole thing.</em>
              </h1>
              <p className="sub">Three projects. Step into any one and travel through how it was thought, who it was for, and what it became.</p>
            </div>
            <div className="nodes" ref={nodesRef}>
              {WORKS.map(w => {
                const pos = NODE_POSITIONS[w.id];
                return (
                  <button
                    key={w.id}
                    className={`node${w.node === "primary" ? " primary in" : " in"}`}
                    type="button"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    data-depth={w.node === "primary" ? 1 : 0.6}
                    onClick={() => handleNodeClick(w.id)}
                  >
                    <span className="glyph">
                      <span className="ring" />
                      <svg viewBox="0 0 100 100" dangerouslySetInnerHTML={{ __html: NODE_ICONS[w.id] }} />
                    </span>
                    <span className="meta">
                      <span className="pname">{w.name}</span>
                      <span className="phint">{w.hint}</span>
                      <span className="enter">enter ›</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="land-hint in">
              <span className="pulse" /> choose a project — step in
            </div>
          </div>
        </section>

        {/* ── BODY (The Whole) ── */}
        <section
          className="scene"
          id="scene-body"
          data-scene="body"
          data-state={sceneState("body", state)}
        >
          <div className="whole">
            <div className="whole-head">
              <div className="kicker">The whole — everything else, mapped to where it lives</div>
            </div>
            <div className="whole-grid">
              <div className="figure">
                <svg viewBox="0 0 200 340" role="img" aria-label="A figure with head, heart, and hands as interactive regions">
                  <g className="stroke">
                    <line x1="100" y1="58" x2="100" y2="190" />
                    <path d="M100,78 L36,150" /><path d="M100,78 L164,150" />
                    <path d="M100,190 L74,310" /><path d="M100,190 L126,310" />
                  </g>
                  <circle className={`bregion${bodyRegion === "head" ? " on" : ""}`} data-region="head" cx="100" cy="34" r="26" />
                  <circle className={`bregion${bodyRegion === "heart" ? " on" : ""}`} data-region="heart" cx="100" cy="120" r="22" />
                  <circle className={`bregion${bodyRegion === "hands" ? " on" : ""}`} data-region="hands" cx="36" cy="156" r="12" />
                  <circle className={`bregion${bodyRegion === "hands" ? " on" : ""}`} data-region="hands" cx="164" cy="156" r="12" />
                </svg>
                {(["head", "heart", "hands-l", "hands-r"] as const).map(cls => {
                  const region = cls.startsWith("hands") ? "hands" : cls as BodyRegion;
                  return (
                    <button
                      key={cls}
                      className={`bhot ${cls}${bodyRegion === region ? " on" : ""}`}
                      data-region={region}
                      type="button"
                      onMouseEnter={() => setBodyRegion(region)}
                      onClick={() => setBodyRegion(region)}
                      onFocus={() => setBodyRegion(region)}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
              <BodyPanel region={bodyRegion} />
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          className="scene"
          id="scene-contact"
          data-scene="contact"
          data-state={sceneState("contact", state)}
        >
          <div className="contact-inner">
            <div className="kicker">Let's talk</div>
            <h2 className="contact-stmt">
              I understand the operation, earn the trust, and ship the <em>whole thing.</em>
            </h2>
            <div className="contact-row">
              <a className="btn solid" href="mailto:bjj46@pitt.edu">
                bjj46@pitt.edu <span className="ar">↗</span>
              </a>
              <a className="btn" href="/Brian-Jeong-Resume.pdf" target="_blank" rel="noopener noreferrer">
                Résumé <span className="ar">↗</span>
              </a>
              <a className="btn" href="https://github.com/brianjeong727" target="_blank" rel="noopener noreferrer">
                GitHub <span className="ar">↗</span>
              </a>
              <a className="btn" href="https://linkedin.com/in/brianjeong727" target="_blank" rel="noopener noreferrer">
                LinkedIn <span className="ar">↗</span>
              </a>
            </div>
            <div className="contact-foot">Brian Jeong · Pittsburgh, PA · CS + Data Science @ Pitt · 2027</div>
          </div>
        </section>

        {/* ── JOURNEY ── */}
        {currentWork && [0, 1, 2, 3].map(stepIdx => (
          <JourneyScene
            key={`${currentWork.id}-j${stepIdx}`}
            work={currentWork}
            stepIdx={stepIdx}
            journeyIdx={state.journey!.idx}
            dataState={sceneState(`j${stepIdx}` as JourneyStep, state)}
            onAdvance={() => dispatch({ type: "JOURNEY_GO", delta: 1 })}
            onDotClick={k => dispatch({ type: "JOURNEY_TO", idx: k })}
            onNextWork={() => {
              const nextWork = WORKS[(WORKS.indexOf(currentWork) + 1) % WORKS.length];
              dispatch({ type: "ENTER_JOURNEY", workId: nextWork.id });
            }}
            onAllWorks={() => dispatch({ type: "EXIT_JOURNEY" })}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </>
  );
}

// ── tiny useState wrapper to avoid importing useState separately ──
function useReducerState<T>(initial: T): [T, (v: T) => void] {
  const [val, dispatch] = useReducer((_: T, action: T) => action, initial);
  return [val, dispatch];
}
