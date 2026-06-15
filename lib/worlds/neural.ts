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

interface Neuron {
  x: number; y: number; r: number;
  branches: Array<Array<[number, number, number, number, number]>>;
  flash: number; drift: number;
}
interface Pulse { from: number; to: number; t: number; sp: number; }

export interface NeuralWorld {
  start(): void;
  stop(): void;
  resize(): void;
  mouse(x: number, y: number): void;
}

export function createNeuralWorld(cv: HTMLCanvasElement): NeuralWorld {
  let w = 0, h = 0, ctx: CanvasRenderingContext2D;
  let raf: number | null = null;
  let neurons: Neuron[] = [];
  let edges: [number, number][] = [];
  let pulses: Pulse[] = [];
  let t0 = 0;
  const mouse = { x: -1, y: -1 };
  const isMobile = () => window.innerWidth < 768;

  function build() {
    const s = fit(cv); w = s.w; h = s.h; ctx = s.ctx;
    const N = isMobile()
      ? Math.max(12, Math.round((w * h) / 52000))
      : Math.max(22, Math.round((w * h) / 26000));
    neurons = [];
    for (let i = 0; i < N; i++) {
      const x = Math.random() * w, y = Math.random() * h;
      const br = 4 + (Math.random() * 4 | 0);
      const branches: Array<Array<[number, number, number, number, number]>> = [];
      for (let b = 0; b < br; b++) {
        const a = Math.random() * Math.PI * 2;
        const len = 34 + Math.random() * 78;
        const segs: Array<[number, number, number, number, number]> = [];
        let cx = x, cy = y, ca = a, wd = 2.2;
        const steps = 3 + (Math.random() * 3 | 0);
        for (let k = 0; k < steps; k++) {
          ca += (Math.random() - 0.5) * 1.0;
          const sl = len / steps;
          const nx = cx + Math.cos(ca) * sl, ny = cy + Math.sin(ca) * sl;
          wd *= 0.7;
          segs.push([cx, cy, nx, ny, wd]);
          cx = nx; cy = ny;
        }
        branches.push(segs);
      }
      neurons.push({ x, y, r: 2.2 + Math.random() * 1.6, branches, flash: 0, drift: Math.random() * 6.28 });
    }
    edges = [];
    for (let i = 0; i < neurons.length; i++) {
      let cnt = 0;
      const order: [number, number][] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (j === i) continue;
        const dx = neurons[i].x - neurons[j].x, dy = neurons[i].y - neurons[j].y;
        order.push([j, Math.hypot(dx, dy)]);
      }
      order.sort((a, b) => a[1] - b[1]);
      for (const [j, d] of order) {
        if (cnt >= 3) break;
        if (d < 230 && i < j) { edges.push([i, j]); cnt++; }
        else if (d < 230) { cnt++; }
      }
    }
    pulses = [];
  }

  function fire(ni: number) {
    neurons[ni].flash = 1;
    for (const e of edges) {
      let from = -1, to = -1;
      if (e[0] === ni) { from = e[0]; to = e[1]; }
      else if (e[1] === ni) { from = e[1]; to = e[0]; }
      if (from >= 0 && pulses.length < 120 && Math.random() < 0.6) {
        pulses.push({ from, to, t: 0, sp: 0.01 + Math.random() * 0.016 });
      }
    }
  }

  function frame(t: number) {
    if (!t0) t0 = t;
    ctx.clearRect(0, 0, w, h);
    for (const e of edges) {
      const a = neurons[e[0]], b = neurons[e[1]];
      const lit = Math.max(a.flash, b.flash);
      const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      grad.addColorStop(0, `rgba(130,150,235,${0.12 + a.flash * 0.5})`);
      grad.addColorStop(1, `rgba(130,150,235,${0.12 + b.flash * 0.5})`);
      ctx.strokeStyle = grad; ctx.lineWidth = 0.9 + lit * 1.4;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    for (const n of neurons) {
      ctx.strokeStyle = `rgba(160,180,255,${0.22 + n.flash * 0.5})`;
      ctx.lineCap = "round";
      for (const br of n.branches) {
        for (const s of br) {
          ctx.lineWidth = Math.max(0.5, s[4]);
          ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); ctx.stroke();
        }
      }
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]; p.t += p.sp;
      const a = neurons[p.from], b = neurons[p.to];
      const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
      g.addColorStop(0, "rgba(190,215,255,1)"); g.addColorStop(1, "rgba(120,150,255,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.28); ctx.fill();
      if (p.t >= 1) { pulses.splice(i, 1); if (Math.random() < 0.7) fire(p.to); }
    }
    for (const n of neurons) {
      n.flash *= 0.95;
      const dm = mouse.x < 0 ? 999 : Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (dm < 70 && Math.random() < 0.05) fire(neurons.indexOf(n));
      const r = n.r + n.flash * 1.8;
      if (n.flash > 0.02) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r + 4 + n.flash * 8);
        g.addColorStop(0, `rgba(190,210,255,${n.flash * 0.6})`);
        g.addColorStop(1, "rgba(120,150,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r + 4 + n.flash * 8, 0, 6.28); ctx.fill();
      }
      ctx.fillStyle = `rgba(150,170,235,${0.5 + n.flash * 0.5})`;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.28); ctx.fill();
      ctx.strokeStyle = `rgba(200,220,255,${0.3 + n.flash * 0.6})`;
      ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(n.x, n.y, r + 1.5, 0, 6.28); ctx.stroke();
    }
    if (Math.random() < 0.1) fire((Math.random() * neurons.length) | 0);
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (!raf) {
        if (!neurons.length) build();
        fire(0);
        raf = requestAnimationFrame(frame);
      }
    },
    stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } },
    resize() { build(); },
    mouse(x: number, y: number) { mouse.x = x; mouse.y = y; },
  };
}
