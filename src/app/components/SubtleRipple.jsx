"use client";
import { useEffect, useRef } from "react";

export default function SubtleRipple() {
  const hostRef = useRef(null);
  const ripples = useRef([]);

  useEffect(() => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    const host = hostRef.current;

    function resize() {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    host.appendChild(canvas);

    let raf;
    const onMove = (e) => {
      ripples.current.push({ x: e.clientX, y: e.clientY, r: 0, a: 0.10 });
      if (ripples.current.length > 10) ripples.current.shift();
    };

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripples.current.forEach(r => { r.r += 1.2; r.a *= 0.968; });
      ripples.current = ripples.current.filter(r => r.a > 0.01 && r.r < 180);

      ctx.save();
      ripples.current.forEach(r => {
        const g = ctx.createRadialGradient(r.x, r.y, r.r * 0.25, r.x, r.y, r.r);
        g.addColorStop(0, `rgba(255,255,255,${r.a * 0.5})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      raf = requestAnimationFrame(step);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      try { host.removeChild(canvas); } catch {}
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "soft-light",
        opacity: 0.12,
        zIndex: 5
      }}
    />
  );
}
