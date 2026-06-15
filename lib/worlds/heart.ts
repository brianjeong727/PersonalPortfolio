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

interface Ring { r: number; a: number; }
interface Person { ang: number; rad: number; drift: number; ph: number; sz: number; }

export interface HeartWorld {
  start(): void;
  stop(): void;
  resize(): void;
}

export function createHeartWorld(cv: HTMLCanvasElement): HeartWorld {
  let w = 0, h = 0, ctx: CanvasRenderingContext2D;
  let raf: number | null = null;
  let t0 = 0;
  let rings: Ring[] = [];
  let people: Person[] = [];
  let ekg: number[] = [];
  let lastBeat = -1;
  const PERIOD = 1100;

  function env(ph: number) {
    const g = (c: number, s: number) => Math.exp(-((ph - c) * (ph - c)) / (2 * s * s));
    return Math.min(1, g(0.04, 0.035) + 0.7 * g(0.20, 0.045));
  }

  function build() {
    const s = fit(cv); w = s.w; h = s.h; ctx = s.ctx;
    people = [];
    const P = Math.max(14, Math.round((w * h) / 60000));
    for (let i = 0; i < P; i++) {
      const ang = Math.random() * 6.28;
      const rad = (0.18 + Math.random() * 0.42) * Math.min(w, h);
      people.push({ ang, rad, drift: (Math.random() - 0.5) * 0.0006, ph: Math.random(), sz: 1.6 + Math.random() * 2.4 });
    }
    ekg = new Array(Math.round(w)).fill(0);
    rings = [];
  }

  function frame(t: number) {
    if (!t0) t0 = t;
    const el = t - t0, ph = (el % PERIOD) / PERIOD, e = env(ph);
    const beatIdx = Math.floor(el / PERIOD);
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.46;
    if (beatIdx !== lastBeat) { lastBeat = beatIdx; rings.push({ r: 18, a: 0.5 }); }
    for (let i = rings.length - 1; i >= 0; i--) {
      const rg = rings[i]; rg.r += 3.4; rg.a *= 0.975;
      ctx.strokeStyle = `rgba(255,120,110,${rg.a})`; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, rg.r, 0, 6.28); ctx.stroke();
      if (rg.a < 0.02) rings.splice(i, 1);
    }
    const pts = people.map(p => {
      p.ang += p.drift;
      const rr = p.rad * (1 + e * 0.02);
      return { x: cx + Math.cos(p.ang) * rr, y: cy + Math.sin(p.ang) * rr * 0.86, p };
    });
    ctx.strokeStyle = `rgba(255,150,120,${0.05 + e * 0.05})`; ctx.lineWidth = 1;
    for (const q of pts) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    for (const q of pts) {
      const b = 0.4 + e * 0.6;
      const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.p.sz + 5);
      g.addColorStop(0, `rgba(255,200,150,${b})`); g.addColorStop(1, "rgba(255,140,110,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.x, q.y, q.p.sz + 5, 0, 6.28); ctx.fill();
      ctx.fillStyle = `rgba(255,225,200,${0.6 + e * 0.4})`; ctx.beginPath(); ctx.arc(q.x, q.y, q.p.sz, 0, 6.28); ctx.fill();
    }
    const cr = Math.min(w, h) * (0.12 + e * 0.05);
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 2.4);
    cg.addColorStop(0, `rgba(255,90,90,${0.45 + e * 0.45})`);
    cg.addColorStop(0.5, `rgba(220,50,70,${0.2 + e * 0.2})`);
    cg.addColorStop(1, "rgba(180,30,60,0)");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, cr * 2.4, 0, 6.28); ctx.fill();
    ekg.shift();
    ekg.push(e > 0.5 ? (env(ph) - 0.5) * 2 : (Math.random() - 0.5) * 0.04);
    const by = h - Math.min(80, h * 0.12);
    ctx.strokeStyle = "rgba(255,120,110,0.5)"; ctx.lineWidth = 1.4; ctx.beginPath();
    for (let x = 0; x < ekg.length; x++) { const y = by - ekg[x] * 46; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (!raf) {
        if (!people.length) build();
        t0 = 0;
        raf = requestAnimationFrame(frame);
      }
    },
    stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } },
    resize() { build(); },
  };
}
