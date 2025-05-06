"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavigationProps {
  logo: string;
}

export default function Navigation({ logo }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="w-full h-16 flex justify-between items-center mb-8 sm:mb-16 pr-6 border-2 border-yellow-50 dark:border-yellow-600 bg-white/30 dark:bg-yellow-900 rounded-2xl"
        style={{ filter: "url(#paper-filter)" }}
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

        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-700 dark:text-emerald-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="hidden md:flex gap-8 text-emerald-800 dark:text-yellow-200 font-handwriting">
          <a
            href="#about"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[-1deg]"
          >
            About
          </a>
          <a
            href="#how-it-works"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[0.5deg]"
          >
            How It Works
          </a>
          <a
            href="#languages"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[1deg]"
          >
            Languages
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden fixed inset-0 bg-amber-50/95 dark:bg-indigo-900/95 z-50 flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-emerald-700 dark:text-emerald-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col items-center gap-8 text-emerald-800 dark:text-emerald-300 font-handwriting text-2xl">
            <a
              href="#about"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[-1deg]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#how-it-works"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[0.5deg]"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#languages"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors transform rotate-[1deg]"
              onClick={() => setMenuOpen(false)}
            >
              Languages
            </a>
          </div>
        </div>
      )}
    </>
  );
}