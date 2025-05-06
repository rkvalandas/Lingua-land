"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

interface ParticleProps {
  backgroundImage: string;
}

export default function ParticleBackground({ backgroundImage }: ParticleProps) {
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

  useEffect(() => {
    const particleCount = isMobile ? 30 : 100;

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 3 : 5) + 2,
      speed: Math.random() * 1 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed * 0.1 > 0 ? p.y - p.speed * 0.1 : 100,
          x: p.x + Math.sin(p.y * 0.05) * 0.2,
          opacity: p.opacity + (Math.random() * 0.02 - 0.01),
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <>
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ overflow: "hidden" }}
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-60"
          style={{ filter: "url(#paper-filter)" }}
          priority={true}
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-transparent dark:to-lime-900/70"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size * 3}px`,
            height: `${particle.size * 3}px`,
            background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, rgba(255,255,255,0) 70%)`,
            filter: "contrast(1.2)",
          }}
          aria-hidden="true"
        ></div>
      ))}
    </>
  );
}