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

interface Mod { x: number; y: number; mw: number; mh: number; born: number; snap: number; pulse: number; }
interface Packet { wi: number; t: number; sp: number; }

export interface BuildWorld {
  start(): void;
  stop(): void;
  resize(): void;
}

export function createBuildWorld(cv: HTMLCanvasElement): BuildWorld {
  let w = 0, h = 0, ctx: CanvasRenderingContext2D;
  let raf: number | null = null;
  let mods: Mod[] = [];
  let wires: [number, number][] = [];
  let packets: Packet[] = [];
  let t0 = 0;

  function make() {
    const s = fit(cv); w = s.w; h = s.h; ctx = s.ctx;
    mods = []; wires = []; packets = [];
    const cols = Math.max(3, Math.round(w / 240));
    const rows = Math.max(2, Math.round(h / 220));
    const mw = 86, mh = 48;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + 0.5) * (w / cols) + (Math.random() - 0.5) * 40;
        const y = (r + 0.5) * (h / rows) + (Math.random() - 0.5) * 40;
        mods.push({ x, y, mw, mh, born: Math.random() * 1, snap: 1, pulse: 0 });
      }
    }
    for (let i = 0; i < mods.length; i++) {
      let cnt = 0;
      for (let j = 0; j < mods.length && cnt < 2; j++) {
        if (i === j) continue;
        const dx = mods[j].x - mods[i].x, dy = mods[j].y - mods[i].y;
        if (Math.hypot(dx, dy) < w / cols * 1.6 && Math.random() < 0.5) {
          wires.push([i, j]); cnt++;
        }
      }
    }
  }

  function rr(x: number, y: number, ww: number, hh: number, rad: number) {
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + ww, y, x + ww, y + hh, rad);
    ctx.arcTo(x + ww, y + hh, x, y + hh, rad);
    ctx.arcTo(x, y + hh, x, y, rad);
    ctx.arcTo(x, y, x + ww, y, rad);
    ctx.closePath();
  }

  function frame(t: number) {
    if (!t0) t0 = t;
    ctx.clearRect(0, 0, w, h);
    for (const e of wires) {
      const a = mods[e[0]], b = mods[e[1]];
      ctx.strokeStyle = "rgba(255,150,60,0.10)"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    if (Math.random() < 0.10 && packets.length < 60) {
      const wi = (Math.random() * wires.length) | 0;
      packets.push({ wi, t: 0, sp: 0.012 + Math.random() * 0.02 });
    }
    for (let i = packets.length - 1; i >= 0; i--) {
      const pk = packets[i]; pk.t += pk.sp;
      const e = wires[pk.wi]; const a = mods[e[0]], b = mods[e[1]];
      const leg1 = Math.abs(b.x - a.x), leg2 = Math.abs(b.y - a.y), tot = leg1 + leg2 || 1;
      const d = pk.t * tot; let x: number, y: number;
      if (d < leg1) { x = a.x + (b.x - a.x) * (d / (leg1 || 1)); y = a.y; }
      else { x = b.x; y = a.y + (b.y - a.y) * ((d - leg1) / (leg2 || 1)); }
      ctx.fillStyle = "rgba(255,200,120,0.95)";
      ctx.shadowColor = "rgba(255,160,60,0.9)"; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 6.28); ctx.fill();
      ctx.shadowBlur = 0;
      if (pk.t >= 1) { mods[e[1]].pulse = 1; packets.splice(i, 1); }
    }
    for (const m of mods) {
      m.pulse *= 0.92;
      if (Math.random() < 0.002) m.snap = 0;
      m.snap = Math.min(1, m.snap + 0.06);
      const sc = 0.6 + m.snap * 0.4;
      const ww = m.mw * sc, hh = m.mh * sc, x = m.x - ww / 2, y = m.y - hh / 2;
      ctx.fillStyle = `rgba(30,26,24,${0.55 * m.snap})`; rr(x, y, ww, hh, 6); ctx.fill();
      ctx.strokeStyle = `rgba(255,${150 + m.pulse * 80},70,${(0.28 + m.pulse * 0.6) * m.snap})`;
      ctx.lineWidth = 1.4; rr(x, y, ww, hh, 6); ctx.stroke();
      ctx.fillStyle = `rgba(255,180,90,${0.25 * m.snap})`;
      for (let k = 0; k < 3; k++) ctx.fillRect(x + 9, y + 9 + k * 9, (10 + (k * 7) % 22), 2);
    }
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (!raf) {
        if (!mods.length) make();
        raf = requestAnimationFrame(frame);
      }
    },
    stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } },
    resize() { make(); },
  };
}
