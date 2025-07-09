"use client";

import MotionWrapper from "./MotionWrapper";

export default function FeaturesSection() {
  return (
    <div id="how-it-works" className="w-full mt-20 sm:mt-32 mb-12 sm:mb-16">
      <MotionWrapper animationType="fade-up">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/40 via-yellow-500/40 to-amber-600/40 dark:from-amber-700/50 dark:via-amber-800/50 dark:to-amber-900/50 rounded-full border border-amber-400/50 dark:border-amber-600/50 mb-6 shadow-lg backdrop-blur-md">
            <span className="text-emerald-700 dark:text-emerald-300 text-sm font-medium">
              💡 Simple Process
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-handwriting text-emerald-700 dark:text-emerald-300 transform rotate-[0.5deg]"
            style={{ textShadow: "2px 2px 4px rgba(0,50,0,0.15)" }}
          >
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-emerald-600 dark:text-emerald-200 font-handwriting mt-4 max-w-2xl mx-auto">
            Experience the future of language learning in just three simple
            steps
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <MotionWrapper animationType="fade-up" delay={150}>
          <div className="group relative bg-gradient-to-br from-amber-400/40 via-yellow-500/40 to-amber-600/40 dark:from-amber-700/50 dark:via-amber-800/50 dark:to-amber-900/50 rounded-3xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-amber-400/50 dark:border-amber-600/50 h-full flex flex-col shadow-lg hover:shadow-2xl">
            {/* Step number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border border-amber-400/50 dark:border-amber-500/50">
              1
            </div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-700 dark:to-yellow-700 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-300 border border-amber-400/30 dark:border-amber-600/30 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-amber-700 dark:text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow text-center">
              <h3 className="text-2xl font-handwriting text-emerald-700 dark:text-emerald-300 mb-4">
                🗣️ You Speak
              </h3>
              <p className="text-base text-emerald-600 dark:text-emerald-200 font-handwriting flex-grow leading-relaxed">
                Speak naturally in your target language using our advanced voice
                recognition.
                <span className="block mt-2 font-semibold text-amber-700 dark:text-amber-300 drop-shadow-md">
                  &ldquo;No script needed - just be yourself!&rdquo;
                </span>
              </p>
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper animationType="fade-up" delay={300}>
          <div className="group relative bg-gradient-to-br from-emerald-400/40 via-emerald-500/40 to-teal-600/40 dark:from-emerald-700/50 dark:via-emerald-800/50 dark:to-teal-900/50 rounded-3xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-emerald-400/50 dark:border-emerald-600/50 h-full flex flex-col shadow-lg hover:shadow-2xl">
            {/* Step number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border border-emerald-400/50 dark:border-emerald-500/50">
              2
            </div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-700 dark:to-teal-700 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-300 border border-emerald-400/30 dark:border-emerald-600/30 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-emerald-700 dark:text-emerald-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow text-center">
              <h3 className="text-2xl font-handwriting text-emerald-700 dark:text-emerald-300 mb-4">
                🧠 AI Analyzes
              </h3>
              <p className="text-base text-emerald-600 dark:text-emerald-200 font-handwriting flex-grow leading-relaxed">
                Our intelligent AI processes your speech and generates
                contextually appropriate responses.
                <span className="block mt-2 font-semibold text-emerald-700 dark:text-emerald-300 drop-shadow-md">
                  &ldquo;Personalized to your skill level!&rdquo;
                </span>
              </p>
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper animationType="fade-up" delay={450}>
          <div className="group relative bg-gradient-to-br from-blue-400/40 via-blue-500/40 to-cyan-600/40 dark:from-blue-700/50 dark:via-blue-800/50 dark:to-cyan-900/50 rounded-3xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border border-blue-400/50 dark:border-blue-600/50 h-full flex flex-col shadow-lg hover:shadow-2xl">
            {/* Step number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border border-blue-400/50 dark:border-blue-500/50">
              3
            </div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-700 flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-300 border border-blue-400/30 dark:border-blue-600/30 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-700 dark:text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow text-center">
              <h3 className="text-2xl font-handwriting text-emerald-700 dark:text-emerald-300 mb-4">
                🔊 AI Responds
              </h3>
              <p className="text-base text-emerald-700 dark:text-emerald-200 font-handwriting flex-grow leading-relaxed">
                Receive natural voice responses that improve your pronunciation
                and comprehension.
                <span className="block mt-2 font-semibold text-blue-700 dark:text-blue-300">
                  &ldquo;Learn by listening and speaking!&rdquo;
                </span>
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>

      {/* Additional info section */}
      <MotionWrapper animationType="fade-up" delay={600}>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-500/40 via-yellow-500/40 to-amber-600/40 dark:from-amber-700/50 dark:via-amber-800/50 dark:to-amber-900/50 rounded-2xl border border-amber-400/50 dark:border-amber-600/50 shadow-lg backdrop-blur-md">
            <span className="text-2xl">⚡</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-handwriting text-lg">
              Start conversations in 150+ languages instantly!
            </span>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
