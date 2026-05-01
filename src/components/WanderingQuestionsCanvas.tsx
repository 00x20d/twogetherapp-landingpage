import { useRef, useEffect } from "react";

interface PointState {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  speed: number;
  offset: number;
  wave: number;
  oscillationTarget: number;
  oscillationCurrent: number;
  force: number;
  angle: number;
  active: boolean;
  show: boolean;
  color: string;
  alpha: number;
}

interface MarkState {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  speed: number;
  points: { x: number; y: number }[];
  posOffset: number;
  sizeOffset: number;
  speedOffset: number;
  time: number;
  targetX: number;
  targetY: number;
}

function hashNoise(x: number): number {
  const n = Math.sin(x * 12.9898 + 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise1D(x: number): number {
  const ix = Math.floor(x);
  const fx = x - ix;
  const a = hashNoise(ix);
  const b = hashNoise(ix + 1);
  const t = fx * fx * (3 - 2 * fx);
  return a + (b - a) * t;
}

function generateQuestionMarkPath(
  cx: number,
  cy: number,
  w: number,
  h: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    let px: number, py: number;

    if (t < 0.75) {
      const st = t / 0.75;
      const angle = Math.PI * 1.5 + st * Math.PI * 1.3;
      const rx = w * 0.35;
      const ry = h * 0.3;
      px = cx + Math.cos(angle) * rx;
      py = cy - h * 0.15 + Math.sin(angle) * ry;
    } else {
      const st = (t - 0.75) / 0.25;
      px = cx + (Math.random() - 0.5) * w * 0.06;
      py = cy + h * 0.25 + st * h * 0.15;
    }

    px += (Math.random() - 0.5) * w * 0.04;
    py += (Math.random() - 0.5) * h * 0.04;

    points.push({ x: px, y: py });
  }

  // Add the dot
  points.push({ x: cx + (Math.random() - 0.5) * w * 0.04, y: cy + h * 0.42 });

  return points;
}

interface WanderingQuestionsCanvasProps {
  className?: string;
  sparse?: boolean;
}

export default function WanderingQuestionsCanvas({
  className = "",
  sparse = false,
}: WanderingQuestionsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    points: PointState[];
    marks: MarkState[];
    cols: number;
    rows: number;
    cellW: number;
    cellH: number;
    mouseX: number;
    mouseY: number;
    isMouseDown: boolean;
    time: number;
    rafId: number;
    lastTime: number;
    width: number;
    height: number;
    dpr: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLS = sparse ? 70 : 100;
    const ROWS = sparse ? 42 : 60;
    const MARK_COUNT = sparse ? 20 : 30;
    const PADDING = 0.1;
    const BG_COLOR = "#FDF9F6";
    const INK_COLORS = ["#F28C82", "#635885"];

    function init() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const contentW = width * (1 - PADDING * 2);
      const contentH = height * (1 - PADDING * 2);
      const cellW = contentW / COLS;
      const cellH = contentH / ROWS;

      const points: PointState[] = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const bx = width * PADDING + c * cellW + cellW * 0.5;
          const by = height * PADDING + r * cellH + cellH * 0.5;
          points.push({
            bx,
            by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            baseSize: cellW * 0.35 + Math.random() * cellW * 0.25,
            size: cellW * 0.35,
            speed: 0.5 + Math.random() * 0.8,
            offset: Math.random() * Math.PI * 2,
            wave: 0,
            oscillationTarget: 0,
            oscillationCurrent: 0,
            force: 0,
            angle: 0,
            active: false,
            show: false,
            color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
            alpha: 0.3 + Math.random() * 0.4,
          });
        }
      }

      const marks: MarkState[] = [];
      for (let i = 0; i < MARK_COUNT; i++) {
        const mw = cellW * (4 + Math.random() * 6);
        const mh = cellH * (6 + Math.random() * 8);
        const mx = width * PADDING + Math.random() * contentW;
        const my = height * PADDING + Math.random() * contentH;
        marks.push({
          id: i,
          x: mx,
          y: my,
          w: mw,
          h: mh,
          color: INK_COLORS[Math.floor(Math.random() * INK_COLORS.length)],
          speed: 0.2 + Math.random() * 0.3,
          points: generateQuestionMarkPath(mx, my, mw, mh),
          posOffset: Math.random() * 1000,
          sizeOffset: Math.random() * 1000,
          speedOffset: Math.random() * 1000,
          time: Math.random() * 100,
          targetX: mx,
          targetY: my,
        });
      }

      stateRef.current = {
        points,
        marks,
        cols: COLS,
        rows: ROWS,
        cellW,
        cellH,
        mouseX: -1000,
        mouseY: -1000,
        isMouseDown: false,
        time: 0,
        rafId: 0,
        lastTime: 0,
        width,
        height,
        dpr,
      };
    }

    function update(dt: number) {
      const s = stateRef.current!;
      s.time += dt;

      const contentW = s.width * (1 - PADDING * 2);
      const contentH = s.height * (1 - PADDING * 2);

      // Update marks
      for (const mark of s.marks) {
        mark.time += dt;
        const nx = smoothNoise1D(mark.time * mark.speed * 0.5 + mark.posOffset);
        const ny = smoothNoise1D(
          mark.time * mark.speed * 0.5 + mark.posOffset + 100,
        );

        mark.targetX = s.width * PADDING + nx * contentW;
        mark.targetY = s.height * PADDING + ny * contentH;

        mark.x += (mark.targetX - mark.x) * 0.02;
        mark.y += (mark.targetY - mark.y) * 0.02;

        // Regenerate points periodically
        if (Math.random() < 0.01) {
          mark.points = generateQuestionMarkPath(
            mark.x,
            mark.y,
            mark.w,
            mark.h,
          );
        } else {
          // Shift points with mark
          const dx = mark.x - mark.points[0]?.x || 0;
          const dy = mark.y - mark.points[0]?.y || 0;
          for (const p of mark.points) {
            p.x += dx * 0.01;
            p.y += dy * 0.01;
          }
        }
      }

      // Update points
      const mouseRadius = 100;
      const mouseForce = s.isMouseDown ? 80 : 40;

      for (let i = 0; i < s.points.length; i++) {
        const p = s.points[i];

        // Check proximity to marks for activation
        let nearMark = false;
        for (const mark of s.marks) {
          for (const mp of mark.points) {
            const ddx = p.bx - mp.x;
            const ddy = p.by - mp.y;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist < mark.w * 0.5) {
              nearMark = true;
              break;
            }
          }
          if (nearMark) break;
        }

        if (nearMark && !p.active && Math.random() < 0.15) {
          p.active = true;
          p.show = true;
        }

        if (!nearMark && p.active && Math.random() < 0.05) {
          p.active = false;
        }

        if (!p.active) continue;

        // Wave motion
        p.wave = Math.sin(s.time * p.speed * 0.8 + p.offset) * s.cellH * 0.3;

        // Mouse interaction
        const mdx = p.x - s.mouseX;
        const mdy = p.y - s.mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseRadius && mDist > 0.1) {
          const force = (1 - mDist / mouseRadius) * mouseForce;
          p.force = Math.min(p.force + force * dt * 2, mouseForce);
          p.angle = Math.atan2(mdy, mdx);
        } else {
          p.force *= Math.pow(0.92, 60 * dt);
        }

        // Oscillation
        p.oscillationTarget = p.force * 0.3;
        p.oscillationCurrent +=
          (p.oscillationTarget - p.oscillationCurrent) * 5 * dt;

        // Velocity
        p.vx += (Math.cos(p.angle) * p.force - p.vx) * 5 * dt;
        p.vy += (Math.sin(p.angle) * p.force - p.vy) * 5 * dt;

        // Spring back to base
        const springK = 3;
        const damp = 0.85;
        p.vx += (p.bx - p.x) * springK * dt;
        p.vy += (p.by + p.wave - p.y) * springK * dt;
        p.vx *= damp;
        p.vy *= damp;

        // Update position
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Update size
        p.size = p.baseSize * (0.8 + p.oscillationCurrent * 0.5);
      }
    }

    function render() {
      const s = stateRef.current!;
      ctx!.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx!.clearRect(0, 0, s.width, s.height);

      // Background
      ctx!.fillStyle = BG_COLOR;
      ctx!.fillRect(0, 0, s.width, s.height);

      // Draw all active points as one path
      const activePoints = s.points.filter((p) => p.active && p.show);
      if (activePoints.length === 0) return;

      // First layer - main fill
      ctx!.beginPath();
      for (const p of activePoints) {
        ctx!.moveTo(p.x + p.size * 0.5, p.y);
        ctx!.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      }
      ctx!.fillStyle = INK_COLORS[0];
      ctx!.fill();

      // Second layer - soft edge subtraction
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.beginPath();
      for (const p of activePoints) {
        ctx!.moveTo(p.x + p.size * 0.7, p.y);
        ctx!.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
      }
      ctx!.fillStyle = "rgba(0,0,0,0.4)";
      ctx!.fill();

      ctx!.globalCompositeOperation = "source-over";
    }

    function animate(timestamp: number) {
      if (!stateRef.current) return;
      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = timestamp;
      let dt = (timestamp - s.lastTime) / 1000;
      s.lastTime = timestamp;

      // Clamp dt to avoid huge jumps
      dt = Math.min(dt, 0.05);

      update(dt);
      render();
      s.rafId = requestAnimationFrame(animate);
    }

    init();
    stateRef.current!.rafId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (stateRef.current) {
        stateRef.current.mouseX = e.clientX - rect.left;
        stateRef.current.mouseY = e.clientY - rect.top;
      }
    };

    const handleMouseDown = () => {
      if (stateRef.current) stateRef.current.isMouseDown = true;
    };

    const handleMouseUp = () => {
      if (stateRef.current) stateRef.current.isMouseDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches.length > 0 && stateRef.current) {
        stateRef.current.mouseX = e.touches[0].clientX - rect.left;
        stateRef.current.mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchStart = () => {
      if (stateRef.current) stateRef.current.isMouseDown = true;
    };

    const handleTouchEnd = () => {
      if (stateRef.current) {
        stateRef.current.isMouseDown = false;
        stateRef.current.mouseX = -1000;
        stateRef.current.mouseY = -1000;
      }
    };

    const handleMouseLeave = () => {
      if (stateRef.current) {
        stateRef.current.mouseX = -1000;
        stateRef.current.mouseY = -1000;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(stateRef.current?.rafId || 0);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [sparse]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
