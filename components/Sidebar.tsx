"use client";

import { useEffect, useRef, useState } from "react";

export interface IndexItem {
  id: string;
  n: string;
  title: string;
}

/** Index that follows the scroll: highlights the section in view, fills a progress line, and tints the page. */
export default function SidebarIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const nav = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el != null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          setActive(el.id);
          document.body.dataset.tint = el.dataset.tint ?? "";
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => {
      if (!fill.current || !nav.current) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      fill.current.style.height = `${p * (nav.current.offsetHeight - 12)}px`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    onScroll();

    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      delete document.body.dataset.tint;
    };
  }, [items]);

  return (
    <nav className="index" aria-label="Work" ref={nav}>
      <span className="fill" ref={fill} aria-hidden="true" />
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={it.id === active ? "on" : undefined}
          aria-current={it.id === active ? "true" : undefined}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          <span className="n">{it.n}</span>
          <span className="t">{it.title}</span>
        </a>
      ))}
    </nav>
  );
}
