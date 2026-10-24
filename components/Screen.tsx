"use client";

import { useEffect, useRef, useState } from "react";

interface ScreenProps {
  /** Looping recording (mp4/webm in /public). Until one exists, a labelled placeholder shows. */
  src?: string;
  poster?: string;
  label: string;
  wide?: boolean;
  /** Skip the scale-in when it scrolls into view (case-study headers). */
  still?: boolean;
}

export default function Screen({ src, poster, label, wide, still }: ScreenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setOn(e.isIntersecting);
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ["screen", wide && "wide", still ? "static" : on && "on"].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={cls}>
      {src ? (
        <video ref={video} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
      ) : (
        <>
          <div className="bar" aria-hidden="true"><i /><i /><i /></div>
          <div className="ph">[ {label} ]</div>
        </>
      )}
    </div>
  );
}
