const DPR = () => Math.min(2, window.devicePixelRatio || 1);

function fit(cv: HTMLCanvasElement) {
  const d = DPR();
  const w = cv.clientWidth, h = cv.clientHeight;
  cv.width = Math.max(1, w * d);
  cv.height = Math.max(1, h * d);
  const ctx = cv.getContext("2d")!;
  ctx.setTransform(d, 0, 0, d, 0, 0);
  return { w, h, ctx };
}

interface Blob {
  x: number; y: number; r: number;
  vx: number; vy: number;
  depth: number; a: number;
  tint: [number, number, number];
}

export interface FogWorld {
  start(): void;
  stop(): void;
  resize(): void;
  parallax(x: number, y: number): void;
}

export function createFogWorld(cv: HTMLCanvasElement): FogWorld {
  let w = 0, h = 0, ctx: CanvasRenderingContext2D;
  let raf: number | null = null;
  let blobs: Blob[] = [];
  let t0 = 0;
  const par = { x: 0, y: 0 };
  const parT = { x: 0, y: 0 };

  // mobile: skip if viewport is narrow to preserve battery
  const isMobile = () => window.innerWidth < 768;

  function build() {
    const s = fit(cv);
    w = s.w; h = s.h; ctx = s.ctx;
    blobs = [];
    const N = isMobile() ? 5 : 9;
    const tints: Array<[number, number, number]> = [
      [120, 118, 140], [150, 120, 95], [100, 110, 135], [140, 125, 110],
    ];
    for (let i = 0; i < N; i++) {
      const depth = 0.25 + Math.random() * 0.9;
      blobs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (160 + Math.random() * 320) * depth,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.09,
        depth,
        a: 0.05 + Math.random() * 0.06,
        tint: tints[i % tints.length],
      });
    }
  }

  // throttle: on mobile run at ~30fps
  let lastFrame = 0;
  const FRAME_BUDGET = isMobile() ? 33 : 0;

  function frame(t: number) {
    if (!t0) t0 = t;
    if (FRAME_BUDGET > 0 && t - lastFrame < FRAME_BUDGET) {
      raf = requestAnimationFrame(frame);
      return;
    }
    lastFrame = t;
    parT.x += (par.x - parT.x) * 0.05;
    parT.y += (par.y - parT.y) * 0.05;
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    for (const b of blobs) {
      b.x += b.vx; b.y += b.vy;
      if (b.x < -b.r) b.x = w + b.r;
      if (b.x > w + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = h + b.r;
      if (b.y > h + b.r) b.y = -b.r;
      const px = b.x + parT.x * b.depth * 40;
      const py = b.y + parT.y * b.depth * 40;
      const g = ctx.createRadialGradient(px, py, 0, px, py, b.r);
      const [r, gr, bl] = b.tint;
      g.addColorStop(0, `rgba(${r},${gr},${bl},${b.a})`);
      g.addColorStop(1, `rgba(${r},${gr},${bl},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, b.r, 0, 6.28);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (!raf) {
        if (!blobs.length) build();
        raf = requestAnimationFrame(frame);
      }
    },
    stop() {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    },
    resize() { build(); },
    parallax(x: number, y: number) { par.x = x; par.y = y; },
  };
}
