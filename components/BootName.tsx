"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01<>/{}[]#=+*$%&";
/** How long the whole landing sequence runs; after this the page is at rest. */
const SEQUENCE_MS = 2400;

/**
 * The name, split into letters so it can decode from monospace glyphs into the serif on first load.
 * The reveal timing lives in CSS (keyed off html[data-boot], set by an inline script in the layout),
 * so the page never depends on hydration to become visible. This component only shuffles the glyphs
 * while they show, then clears data-boot so client-side navigation back home doesn't replay it.
 */
export default function BootName({ name }: { name: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-boot")) return;
    const chars = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-g]") ?? []);
    const shuffle = setInterval(() => {
      for (const c of chars) c.dataset.g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }, 45);
    const stopShuffle = setTimeout(() => clearInterval(shuffle), 1100);
    const done = setTimeout(() => root.removeAttribute("data-boot"), SEQUENCE_MS);
    return () => {
      clearInterval(shuffle);
      clearTimeout(stopShuffle);
      clearTimeout(done);
      root.removeAttribute("data-boot");
    };
  }, []);

  let i = 0;
  return (
    <h1 ref={ref} className="boot-name" aria-label={name}>
      {Array.from(name).map((ch, k) =>
        ch === " " ? (
          " "
        ) : (
          <span
            key={k}
            aria-hidden="true"
            data-g={GLYPHS[(k * 7) % GLYPHS.length]}
            style={{ "--i": i++ } as React.CSSProperties}
          >
            {ch}
          </span>
        ),
      )}
    </h1>
  );
}
