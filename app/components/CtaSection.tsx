"use client";

import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

export default function CtaSection() {
  return (
    <div className="w-full mt-16 sm:mt-24 mb-8 text-center">
      <ScrollAnimation animationType="scale-in" threshold={0.3}>
        <div
          className="bg-amber-200 dark:bg-green-800 bg-opacity-70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border-2 border-yellow-500 dark:border-emerald-400"
          style={{
            boxShadow: "4px 4px 0 rgba(0,0,0,0.05)",
          }}
        >
          <ScrollAnimation animationType="fade-up" delay={200}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-emerald-800 dark:text-emerald-100 mb-3 sm:mb-4"
              style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
            >
              Begin Your Language Adventure Today
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animationType="fade-up" delay={400}>
            <p className="text-base sm:text-lg text-emerald-700 dark:text-lime-200 mb-6 sm:mb-8 max-w-2xl mx-auto font-handwriting">
              Join thousands of learners who have discovered the joy of
              immersive language learning through our magical AI companion.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animationType="scale-in" delay={600}>
            <Link
              href="/practice"
              className="inline-block px-8 sm:px-10 py-4 sm:py-5 bg-amber-100 text-amber-800 text-lg sm:text-xl transform hover:scale-105 transition-all animate-pulse"
              style={{
                borderRadius: "15px",
                border: "2px solid #f59e0b",
                backgroundSize: "cover",
                boxShadow: "3px 4px 0 rgba(146, 64, 14, 0.2)",
                animation: "pulse 2s infinite",
              }}
            >
              <span className="relative z-10 font-handwriting">
                Start Speaking Now
              </span>
            </Link>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </div>
  );
}
