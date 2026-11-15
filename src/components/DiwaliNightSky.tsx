"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme/context";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function DiwaliNightSky() {
  const { theme, isMounted } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isMounted || theme !== "dark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const sparks: Spark[] = [];
    const colors = ["#D4AF37", "#E5C378", "#C59B27", "#F0D597", "#E87A38", "#C0394B"];

    const createFirework = (targetX: number, targetY: number) => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 2.2 + 0.8;
        sparks.push({
          x: targetX,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let timer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      timer++;

      // Trigger gentle celebratory firework bursts intermittently
      if (timer % 90 === 0 && Math.random() > 0.3) {
        const x = width * 0.15 + Math.random() * (width * 0.7);
        const y = height * 0.12 + Math.random() * (height * 0.45);
        createFirework(x, y);
      }

      // Constantly release subtle rising phuljhadi / diya ember sparks
      if (timer % 8 === 0 && sparks.length < 80) {
        sparks.push({
          x: Math.random() * width,
          y: height + 10,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(Math.random() * 1.5 + 0.8),
          size: Math.random() * 1.8 + 0.8,
          alpha: 0.9,
          decay: Math.random() * 0.006 + 0.004,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.018; // gentle gravity
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.y > height + 20) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha * 0.7;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isMounted]);

  if (!isMounted || theme !== "dark") return null;

  return (
    <>
      {/* Background Night Sky Canvas: Firecrackers & Phuljhadi Embers */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 opacity-60 mix-blend-screen"
        aria-hidden="true"
      />

      {/* Ambient Illuminated Earthen Diya Lamps (Bottom Corners) */}
      <div
        className="fixed bottom-4 left-6 pointer-events-none z-20 hidden md:flex items-center gap-2 select-none opacity-85 animate-fade-in"
        aria-hidden="true"
      >
        <div className="relative">
          {/* Diya Clay Bowl */}
          <svg className="w-8 h-8 text-[#C59B27] drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]" viewBox="0 0 64 64" fill="currentColor">
            <ellipse cx="32" cy="46" rx="26" ry="12" fill="#8C4A1E" />
            <ellipse cx="32" cy="43" rx="22" ry="7" fill="#C59B27" opacity="0.8" />
            {/* Flickering Flame */}
            <path
              d="M32 14 C36 24 40 32 32 38 C24 32 28 24 32 14 Z"
              fill="#FFB300"
              className="animate-pulse origin-bottom"
            />
            <path
              d="M32 20 C34 26 37 32 32 36 C27 32 30 26 32 20 Z"
              fill="#FFF275"
              className="animate-ping origin-bottom opacity-60"
            />
          </svg>
          <div className="absolute -top-1 left-2.5 w-3 h-3 rounded-full bg-amber-400 blur-xs animate-pulse" />
        </div>
        <span className="text-[9px] font-mono tracking-widest uppercase text-[#D4AF37]/80">
          दीपावली रात्रि • Festive Night
        </span>
      </div>

      <div
        className="fixed bottom-4 right-6 pointer-events-none z-20 hidden md:flex items-center gap-2 select-none opacity-85 animate-fade-in"
        aria-hidden="true"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase text-[#D4AF37]/80">
          திவ்ய தீபம் • Sacred Diya
        </span>
        <div className="relative">
          <svg className="w-8 h-8 text-[#C59B27] drop-shadow-[0_0_12px_rgba(212,175,55,0.7)]" viewBox="0 0 64 64" fill="currentColor">
            <ellipse cx="32" cy="46" rx="26" ry="12" fill="#8C4A1E" />
            <ellipse cx="32" cy="43" rx="22" ry="7" fill="#C59B27" opacity="0.8" />
            <path
              d="M32 14 C36 24 40 32 32 38 C24 32 28 24 32 14 Z"
              fill="#FFB300"
              className="animate-pulse origin-bottom"
            />
            <path
              d="M32 20 C34 26 37 32 32 36 C27 32 30 26 32 20 Z"
              fill="#FFF275"
              className="animate-ping origin-bottom opacity-60"
            />
          </svg>
          <div className="absolute -top-1 left-2.5 w-3 h-3 rounded-full bg-amber-400 blur-xs animate-pulse" />
        </div>
      </div>
    </>
  );
}

export default DiwaliNightSky;
