"use client";

import MotionWrapper from "./MotionWrapper";

export default function StatsSection() {
  const stats = [
    {
      number: "150+",
      label: "Languages Supported",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "5",
      label: "AI-Powered Services",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      number: "24/7",
      label: "Available Learning",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "100%",
      label: "Free to Use",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full mt-16 sm:mt-20 mb-12 sm:mb-16">
      <MotionWrapper animationType="fade-up">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-center text-emerald-800 dark:text-emerald-200 mb-8 sm:mb-12 transform rotate-[-0.3deg]"
          style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
        >
          Why Choose Lingua Land?
        </h2>
      </MotionWrapper>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, index) => (
          <MotionWrapper
            key={stat.label}
            animationType="scale-in"
            delay={150 * (index + 1)}
          >
            <div
              className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800 rounded-2xl p-4 sm:p-6 text-center transform transition-all hover:scale-105 border-2 border-emerald-200 dark:border-emerald-600"
              style={{
                boxShadow: "4px 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div className="flex justify-center mb-3 sm:mb-4 text-emerald-600 dark:text-emerald-300">
                {stat.icon}
              </div>
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-handwriting font-bold text-emerald-800 dark:text-emerald-100 mb-1 sm:mb-2"
                style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
              >
                {stat.number}
              </div>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-200 font-handwriting">
                {stat.label}
              </p>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
