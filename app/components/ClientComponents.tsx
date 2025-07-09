"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { scrollToElement } from "../utils/scrollUtils";

// Keep using dynamic import for ParticleBackground
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-amber-50/80"></div>,
});

// Export AnimatedSection client component
export { default as AnimatedSection } from "./AnimatedSection";

export function ClientNavigation({ logo }: { logo: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle smooth scrolling for navigation links
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    console.log(`Attempting to scroll to: ${targetId}`);
    scrollToElement(targetId, 80); // 80px offset to account for header height
    setMenuOpen(false);
  };

  return (
    <nav
      className="w-full h-18 sm:h-20 flex justify-between items-center px-4 sm:px-6 border-2 border-emerald-400/90 dark:border-amber-600/90 bg-gradient-to-r from-amber-100/95 via-yellow-50/95 to-amber-200/95 dark:from-amber-800/95 dark:via-yellow-700/95 dark:to-amber-700/95 rounded-3xl relative z-20 shadow-lg"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
      }}
      aria-label="Main navigation"
    >
      <div className="flex items-center transform rotate-[-0.5deg] group">
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-200/95 to-amber-300/95 dark:from-amber-600/95 dark:to-amber-700/95 p-1 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-amber-400/80 dark:border-amber-600/80">
          <Image
            src={logo}
            alt="Lingua Land logo"
            width={80}
            height={80}
            className="w-full h-full object-contain z-10 group-hover:scale-110 transition-transform duration-300"
            priority
          />
        </div>
        <div className="ml-3 sm:ml-4">
          <span
            className="text-2xl sm:text-3xl md:text-4xl font-handwriting bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 dark:from-emerald-300 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent font-bold"
            style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.1)" }}
          >
            Lingua Land
          </span>
          <div className="text-xs sm:text-sm font-handwriting text-emerald-600 dark:text-emerald-200 transform rotate-[0.3deg] mt-[-2px]">
            Learn • Speak • Master
          </div>
        </div>
      </div>

      <div className="relative">
        <button
          ref={buttonRef}
          className="md:hidden flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-emerald-500/95 to-teal-600/95 dark:from-emerald-600/95 dark:to-teal-700/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-emerald-400/80 dark:border-emerald-500/80"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          style={{
            transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-900 dark:text-amber-50 group-hover:text-emerald-950 dark:group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden absolute top-full right-0 mt-3 w-52 py-3 origin-top-right transform transition-all duration-300 ease-in-out"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "scale(1)" : "scale(0.95)",
              animation: menuOpen ? "dropIn 0.3s ease-out forwards" : "none",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden border-2 bg-gradient-to-br from-amber-100/95 via-yellow-50/95 to-amber-200/95 dark:from-amber-800/95 dark:via-yellow-900/95 dark:to-amber-700/95 border-emerald-300/90 dark:border-amber-500/90 shadow-2xl"
              style={{
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  "0px 15px 35px rgba(16, 185, 129, 0.3), 0px 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              }}
            >
              <div className="flex flex-col py-2 font-handwriting text-lg">
                <a
                  href="#services"
                  className="px-6 py-3 hover:bg-gradient-to-r hover:from-emerald-200/90 hover:to-teal-200/90 dark:hover:from-amber-700/90 dark:hover:to-yellow-700/90 text-emerald-900 dark:text-yellow-100 transform hover:scale-105 transition-all duration-200 relative group font-medium"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(5, 46, 22, 0.2)",
                    transform: "rotate(-0.5deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "services")}
                >
                  <span className="relative z-10">Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-300/50 dark:to-yellow-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                </a>
                <a
                  href="#how-it-works"
                  className="px-6 py-3 hover:bg-gradient-to-r hover:from-emerald-200/90 hover:to-teal-200/90 dark:hover:from-amber-700/90 dark:hover:to-yellow-700/90 text-emerald-900 dark:text-yellow-100 transform hover:scale-105 transition-all duration-200 relative group font-medium"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(5, 46, 22, 0.2)",
                    transform: "rotate(0.5deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "how-it-works")}
                >
                  <span className="relative z-10">How It Works</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-300/50 dark:to-yellow-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                </a>
                <a
                  href="#languages"
                  className="px-6 py-3 hover:bg-gradient-to-r hover:from-emerald-200/90 hover:to-teal-200/90 dark:hover:from-amber-700/90 dark:hover:to-yellow-700/90 text-emerald-900 dark:text-yellow-100 transform hover:scale-105 transition-all duration-200 relative group font-medium"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(5, 46, 22, 0.2)",
                    transform: "rotate(-0.3deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "languages")}
                >
                  <span className="relative z-10">Languages</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-300/50 dark:to-yellow-300/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex gap-6 lg:gap-8 text-emerald-900 dark:text-yellow-100 font-handwriting text-lg font-medium">
        <a
          href="#services"
          className="relative px-4 py-2 hover:text-emerald-700 dark:hover:text-yellow-50 transition-all duration-300 transform rotate-[-1deg] hover:scale-110 group"
          onClick={(e) => handleNavClick(e, "services")}
        >
          <span className="relative z-10">Services</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-600/50 dark:to-yellow-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl transform rotate-[1deg]"></div>
        </a>
        <a
          href="#how-it-works"
          className="relative px-4 py-2 hover:text-emerald-700 dark:hover:text-yellow-50 transition-all duration-300 transform rotate-[0.5deg] hover:scale-110 group"
          onClick={(e) => handleNavClick(e, "how-it-works")}
        >
          <span className="relative z-10">How It Works</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-600/50 dark:to-yellow-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl transform rotate-[-0.5deg]"></div>
        </a>
        <a
          href="#languages"
          className="relative px-4 py-2 hover:text-emerald-700 dark:hover:text-yellow-50 transition-all duration-300 transform rotate-[1deg] hover:scale-110 group"
          onClick={(e) => handleNavClick(e, "languages")}
        >
          <span className="relative z-10">Languages</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/50 to-teal-300/40 dark:from-amber-600/50 dark:to-yellow-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl transform rotate-[-1deg]"></div>
        </a>
      </div>
    </nav>
  );
}

export function ClientParticleBackground() {
  return (
    <Suspense
      fallback={<div className="absolute inset-0 bg-amber-50/80"></div>}
    >
      <ParticleBackground />
    </Suspense>
  );
}
