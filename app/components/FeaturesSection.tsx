"use client";

import ScrollAnimation from "./ScrollAnimation";

export default function FeaturesSection() {
  return (
    <div id="how-it-works" className="w-full mt-20 sm:mt-32 mb-12 sm:mb-16">
      <ScrollAnimation animationType="fade-up">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-center text-emerald-800 dark:text-emerald-200 mb-8 sm:mb-12 transform rotate-[0.5deg]"
          style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
        >
          How The Magic Works
        </h2>
      </ScrollAnimation>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        <ScrollAnimation animationType="fade-up" delay={150}>
          <div
            className="bg-yellow-200 dark:bg-yellow-700 bg-opacity-70 dark:bg-opacity-40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm transform transition-all hover:scale-105 border-2 border-amber-400 dark:border-amber-500 h-full flex flex-col"
            style={{
              boxShadow: "6px 6px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: "inset 0 0 10px rgba(251, 191, 36, 0.3)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-handwriting text-center text-emerald-800 dark:text-emerald-100 mb-2">
                You Speak
              </h3>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-100 text-center font-handwriting flex-grow">
                Speak in any language and our magical ears will listen and
                understand your words.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animationType="fade-up" delay={300}>
          <div
            className="bg-yellow-200 dark:bg-yellow-700 bg-opacity-70 dark:bg-opacity-40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm transform transition-all hover:scale-105 border-2 border-amber-400 dark:border-amber-500 h-full flex flex-col"
            style={{
              boxShadow: "6px 6px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: "inset 0 0 10px rgba(16, 185, 129, 0.3)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600 dark:text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-handwriting text-center text-emerald-800 dark:text-emerald-100 mb-2">
                Our AI Thinks
              </h3>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-100 text-center font-handwriting flex-grow">
                A wise AI tutor crafts a perfect response that matches your
                language level.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animationType="fade-up" delay={450}>
          <div
            className="bg-yellow-200 dark:bg-yellow-700 bg-opacity-70 dark:bg-opacity-40 rounded-2xl p-5 sm:p-6 backdrop-blur-sm transform transition-all hover:scale-105 border-2 border-amber-400 dark:border-amber-500 sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none h-full flex flex-col"
            style={{
              boxShadow: "6px 6px 10px rgba(0,0,0,0.15)",
            }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: "inset 0 0 10px rgba(14, 165, 233, 0.3)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-sky-600 dark:text-sky-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-handwriting text-center text-emerald-800 dark:text-emerald-100 mb-2">
                Magical Response
              </h3>
              <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-100 text-center font-handwriting flex-grow">
                Listen as our companion responds in a natural voice, helping you
                immerse in the language.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
