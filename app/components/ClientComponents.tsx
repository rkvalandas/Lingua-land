"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
    scrollToElement(targetId, 80); // 80px offset to account for header height
    setMenuOpen(false);
  };

  return (
    <nav
      className="w-full h-16 flex justify-between items-center mb-8 sm:mb-16 pr-6 border-2 border-yellow-50 dark:border-yellow-600 bg-white/30 dark:bg-yellow-900 rounded-2xl relative z-20"
      aria-label="Main navigation"
    >
      <div className="flex items-center transform rotate-[-0.5deg]">
        <div className="relative w-12 h-12 sm:w-16 sm:h-14 md:w-20 md:h-14 rounded-full flex items-center justify-center">
          <Image
            src={logo}
            alt="Lingua Land logo"
            width={80}
            height={80}
            className="w-full h-full object-contain z-10"
            priority
          />
        </div>
        <span
          className="text-2xl sm:text-3xl font-handwriting text-emerald-700 dark:text-yellow-200"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.1)" }}
        >
          Lingua Land
        </span>
      </div>

      <div className="relative">
        <button
          ref={buttonRef}
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          style={{
            transform: menuOpen ? "rotate(0deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-700 dark:text-yellow-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden absolute top-full right-0 mt-2 w-48 py-2 origin-top-right transform transition-all duration-300 ease-in-out"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "scale(1)" : "scale(0.95)",
              animation: menuOpen ? "dropIn 0.3s ease-out forwards" : "none",
            }}
          >
            <div
              className="rounded-xl overflow-hidden border-2 bg-yellow-100 dark:bg-yellow-800 border-yellow-50 dark:border-amber-500"
              style={{
                backdropFilter: "blur(8px)",
                boxShadow:
                  "0px 5px 15px rgba(0,0,0,0.15), 0px 3px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex flex-col py-2 font-handwriting text-lg">
                <a
                  href="#about"
                  className="px-6 py-2.5 hover:bg-amber-100 dark:hover:bg-amber-800/30 text-emerald-800 dark:text-yellow-200 transform hover:scale-105 transition-all duration-150"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(0,50,0,0.1)",
                    transform: "rotate(-0.5deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  About
                </a>
                <a
                  href="#how-it-works"
                  className="px-6 py-2.5 hover:bg-amber-100 dark:hover:bg-amber-800/30 text-emerald-800 dark:text-yellow-200 transform hover:scale-105 transition-all duration-150"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(0,50,0,0.1)",
                    transform: "rotate(0.5deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "how-it-works")}
                >
                  How It Works
                </a>
                <a
                  href="#languages"
                  className="px-6 py-2.5 hover:bg-amber-100 dark:hover:bg-amber-800/30 text-emerald-800 dark:text-yellow-200 transform hover:scale-105 transition-all duration-150"
                  style={{
                    textShadow: "0.5px 0.5px 0 rgba(0,50,0,0.1)",
                    transform: "rotate(-0.3deg)",
                  }}
                  onClick={(e) => handleNavClick(e, "languages")}
                >
                  Languages
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:flex gap-8 text-emerald-800 dark:text-yellow-200 font-handwriting">
        <a
          href="#about"
          className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[-1deg]"
          onClick={(e) => handleNavClick(e, "about")}
        >
          About
        </a>
        <a
          href="#how-it-works"
          className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[0.5deg]"
          onClick={(e) => handleNavClick(e, "how-it-works")}
        >
          How It Works
        </a>
        <a
          href="#languages"
          className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[1deg]"
          onClick={(e) => handleNavClick(e, "languages")}
        >
          Languages
        </a>
      </div>
    </nav>
  );
}

export function ClientParticleBackground({
  backgroundImage,
}: {
  backgroundImage: string;
}) {
  return (
    <Suspense
      fallback={<div className="absolute inset-0 bg-amber-50/80"></div>}
    >
      <ParticleBackground backgroundImage={backgroundImage} />
    </Suspense>
  );
}
