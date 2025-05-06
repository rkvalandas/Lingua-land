"use client"; // Add this directive at the top

import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";

interface HeroSectionProps {
  characterImage: string;
}

export default function HeroSection({ characterImage }: HeroSectionProps) {
  return (
    <div className="relative mt-4 sm:mt-8 w-full flex flex-col md:flex-row items-center gap-6 md:gap-16">
      <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 transform rotate-[-0.3deg] text-center md:text-left">
        <ScrollAnimation animationType="fade-in" delay={100}>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-handwriting leading-tight text-emerald-900 dark:text-emerald-200 mx-auto md:mx-0"
            style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
          >
            <ScrollAnimation animationType="slide-in-left" delay={300}>
              <span className="block text-teal-700 dark:text-teal-200 transform rotate-[-0.5deg]">
                Begin Your
              </span>
            </ScrollAnimation>
            <ScrollAnimation animationType="slide-in-right" delay={500}>
              <span className="block text-lime-700 dark:text-lime-200 transform rotate-[0.5deg]">
                Magical Language
              </span>
            </ScrollAnimation>
            <ScrollAnimation animationType="slide-in-left" delay={700}>
              <span className="block text-teal-700 dark:text-teal-200 transform rotate-[-0.2deg]">
                Journey
              </span>
            </ScrollAnimation>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animationType="fade-up" delay={900}>
          <p className="text-base sm:text-lg md:text-xl text-emerald-800 dark:text-emerald-50 font-handwriting">
            Immerse yourself in a world where language learning feels like a
            Studio Ghibli adventure. Our AI companion guides you through
            conversations that adapt to your skill level.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animationType="scale-in" delay={1100}>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/practice"
              className="inline-block mt-4 px-6 sm:px-8 py-3 sm:py-4 bg-amber-100 dark:bg-yellow-700 text-amber-800 dark:text-white text-base sm:text-lg transform hover:scale-105 transition-all"
              style={{
                borderRadius: "15px",
                border: "2px solid #f59e0b",
                boxShadow: "2px 3px 0 rgba(146, 64, 14, 0.2)",
              }}
            >
              <span className="relative z-10 font-handwriting">
                Get Started
              </span>
            </Link>
          </div>
        </ScrollAnimation>
      </div>

      <div className="w-full sm:w-2/3 md:w-1/2 relative transform rotate-[1deg] flex items-center justify-center mt-8 md:mt-0">
        <ScrollAnimation animationType="fade-in" delay={300}>
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mx-auto">
            <div
              className="absolute inset-0 rounded-full"
              style={{ filter: "url(#paper-filter)" }}
            ></div>

            <Image
              src={characterImage}
              alt="Character illustration representing language learning companions"
              width={500}
              height={500}
              priority
              className="relative z-10 w-full h-full object-contain"
              style={{
                transform: "rotate(0.5deg) scale(1.2)",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const placeholder = document.createElement("div");
                placeholder.className =
                  "absolute inset-0 flex items-center justify-center";
                placeholder.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-700 dark:text-emerald-300">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 14.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.5" />
                    <path d="M16 18h-8l-2 7h12l-2-7Z" />
                    <path d="M12 13v5" />
                    <path d="M8 16c2 1 6 1 8 0" />
                  </svg>
                `;
                target.parentNode?.appendChild(placeholder);
              }}
            />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
