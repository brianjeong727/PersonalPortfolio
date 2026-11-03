"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface Step {
  kicker: string;
  title: string;
  body: ReactNode;
  tradeoff?: ReactNode;
  /** Index into `panels` shown while this step is in view. */
  panel: number;
}

export interface Panel {
  node: ReactNode;
  caption: string;
}

/** Text steps scroll on the left while a pinned panel swaps to match the step in view. */
export default function Scrolly({ steps, panels }: { steps: Step[]; panels: Panel[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = steps[active]?.panel ?? 0;

  return (
    <div className="scrolly">
      <div className="steps">
        {steps.map((s, i) => (
          <section
            key={s.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`step${i === active ? " on" : ""}`}
          >
            <span className="kicker">{s.kicker}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="inline-panel on">{panels[s.panel]?.node}</div>
            {s.tradeoff && (
              <div className="trade">
                <b>Tradeoff:</b> {s.tradeoff}
              </div>
            )}
          </section>
        ))}
      </div>
      <div className="pin">
        {panels.map((p, i) => (
          <div key={p.caption} className={`layer${i === shown ? " on" : ""}`} aria-hidden={i !== shown}>
            {p.node}
            <span className="cap">{p.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
