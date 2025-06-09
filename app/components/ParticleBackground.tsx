"use client";

import { useState, useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

export default function ParticleBackground() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }>
  >([]);

  // Memoize particle count to prevent unnecessary re-renders
  const particleCount = useMemo(() => (isMobile ? 15 : 50), [isMobile]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);

    // Reduce animation frequency for better performance
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed * 0.05 > 0 ? p.y - p.speed * 0.05 : 100,
          x: p.x + Math.sin(p.y * 0.03) * 0.1,
          opacity: Math.max(
            0.1,
            Math.min(0.4, p.opacity + (Math.random() * 0.01 - 0.005))
          ),
        }))
      );
    }, 100); // Reduced frequency from 50ms to 100ms

    return () => clearInterval(interval);
  }, [isMobile, particleCount]);

  return (
    <>
      {/* Paper texture background - light mode - optimized */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(254, 240, 138, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(254, 240, 138, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(254, 240, 138, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, rgba(254, 240, 138, 0.7) 0%, rgba(254, 240, 138, 0.5) 100%)
          `,
          filter: "url(#paper-filter)",
          backgroundSize: "200% 200%, 300% 300%, 250% 250%, 100% 100%",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Paper texture background - dark mode - optimized */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(254, 240, 138, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(254, 240, 138, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(254, 240, 138, 0.4) 0%, transparent 50%),
            linear-gradient(135deg, rgba(254, 240, 138, 0.7) 0%, rgba(254, 240, 138, 0.5) 100%)
          `,
          filter: "url(#paper-filter)",
          backgroundSize: "200% 200%, 300% 300%, 250% 250%, 100% 100%",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Additional paper texture overlay with enhanced darkness for depth */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1.5px,
              rgba(139, 69, 19, 0.1) 1.5px,
              rgba(139, 69, 19, 0.1) 3px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1.5px,
              rgba(139, 69, 19, 0.1) 1.5px,
              rgba(139, 69, 19, 0.1) 3px
            ),
                        linear-gradient(135deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.04) 100%),
            radial-gradient(ellipse at center, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.05) 100%)

          `,
        }}
      />

      {/* Dark overlay for dark mode only */}
      <div className="absolute inset-0 z-0 hidden dark:block bg-black/30"></div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-transparent dark:to-lime-900/80"></div>

      {/* Floating particles with improved performance */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 2}px`,
            height: `${particle.size * 2}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(255,255,255,0) 70%)`,
            transform: "translate3d(0, 0, 0)", // Force hardware acceleration
            backfaceVisibility: "hidden",
          }}
          aria-hidden="true"
        ></div>
      ))}
    </>
  );
}
