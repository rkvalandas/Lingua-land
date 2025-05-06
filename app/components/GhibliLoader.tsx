"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GhibliLoaderProps {
  isLoading?: boolean;
}

export default function GhibliLoader({ isLoading = true }: GhibliLoaderProps) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Start fade out animation
      setFadeOut(true);

      // Remove component after animation completes
      const timer = setTimeout(() => {
        setShow(false);
      }, 800); // Match this to the CSS transition duration

      return () => clearTimeout(timer);
    } else {
      setFadeOut(false);
      setShow(true);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-800 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(to bottom, #fef3c7, #fde68a)",
      }}
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
        <div
          className="absolute w-full h-full rounded-full bg-yellow-200 dark:bg-amber-700 animate-pulse"
          style={{
            boxShadow: "0 0 25px rgba(251, 191, 36, 0.6)",
            animation: "pulse 2s infinite ease-in-out",
          }}
        />
        <Image
          src="/icon.png"
          alt="Lingua Land"
          width={120}
          height={120}
          priority={true}
          className="w-full h-full object-contain z-10 animate-bounce-gentle"
          style={{
            animation: "bounce-gentle 2s infinite ease-in-out",
          }}
        />
      </div>

      <div className="bg-yellow-50 dark:bg-amber-800 px-8 py-3 rounded-xl border-2 border-amber-200 dark:border-amber-500 shadow-md">
        <h2
          className="font-handwriting text-2xl text-emerald-700 dark:text-amber-200"
          style={{
            textShadow: "1px 1px 0px rgba(0,0,0,0.1)",
          }}
        >
          Loading Magic...
        </h2>
      </div>

      <div className="mt-8 flex space-x-3">
        <div className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-300 animate-bounce-delayed-1" />
        <div className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-300 animate-bounce-delayed-2" />
        <div className="w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-300 animate-bounce-delayed-3" />
      </div>
    </div>
  );
}
