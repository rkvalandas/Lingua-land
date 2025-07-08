"use client";

import Image from "next/image";

import { MenuIcon } from "./Icons";

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
}

export default function MobileHeader({
  isMobileMenuOpen,
  onToggleMenu,
}: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-100/95 via-yellow-100/95 to-amber-100/95 dark:from-amber-900/95 dark:via-yellow-900/95 dark:to-amber-900/95 backdrop-blur-lg border-b-2 border-amber-300/60 dark:border-amber-600/60 px-4 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 p-1 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg">
          <Image
            src="/icon.png"
            alt="Lingua Land"
            width={40}
            height={40}
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        </div>
        <h1
          className="text-xl font-handwriting text-emerald-800 dark:text-emerald-100 font-bold"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
          }}
        >
          Lingua Land
        </h1>
      </div>

      <button
        onClick={onToggleMenu}
        className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-700 dark:to-amber-600 rounded-xl hover:from-amber-300 hover:to-amber-500 dark:hover:from-amber-600 dark:hover:to-amber-500 transition-all duration-300 flex items-center justify-center text-emerald-800 dark:text-emerald-100 shadow-lg hover:shadow-xl active:scale-95"
        style={{
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <MenuIcon isOpen={isMobileMenuOpen} />
      </button>
    </div>
  );
}
