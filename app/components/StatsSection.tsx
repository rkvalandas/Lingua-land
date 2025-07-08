"use client";

import MotionWrapper from "./MotionWrapper";

export default function StatsSection() {
  const stats = [
    {
      number: "150+",
      label: "Languages Available",
      description: "Comprehensive language support for global learners",
      color: "emerald",
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
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "5",
      label: "AI-Powered Tools",
      description: "Conversation, Translation, Grammar, Exam Prep & TTS",
      color: "blue",
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
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      number: "24/7",
      label: "AI Availability",
      description: "Practice anytime with our intelligent language assistant",
      color: "purple",
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
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "Free",
      label: "To Get Started",
      description: "Begin your language journey at no cost",
      color: "rose",
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
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: {
        bg: "from-emerald-100 to-emerald-200 dark:from-emerald-800 dark:to-emerald-900",
        border: "border-emerald-300 dark:border-emerald-600",
        text: "text-emerald-700 dark:text-emerald-300",
        iconBg: "bg-emerald-200 dark:bg-emerald-700",
      },
      blue: {
        bg: "from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900",
        border: "border-blue-300 dark:border-blue-600",
        text: "text-blue-700 dark:text-blue-300",
        iconBg: "bg-blue-200 dark:bg-blue-700",
      },
      purple: {
        bg: "from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900",
        border: "border-purple-300 dark:border-purple-600",
        text: "text-purple-700 dark:text-purple-300",
        iconBg: "bg-purple-200 dark:bg-purple-700",
      },
      rose: {
        bg: "from-rose-100 to-rose-200 dark:from-rose-800 dark:to-rose-900",
        border: "border-rose-300 dark:border-rose-600",
        text: "text-rose-700 dark:text-rose-300",
        iconBg: "bg-rose-200 dark:bg-rose-700",
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="w-full mt-16 sm:mt-24 mb-12 sm:mb-16">
      <MotionWrapper animationType="fade-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full border border-indigo-200 dark:border-indigo-700 mb-6">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              📊 Our Impact
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-handwriting text-emerald-800 dark:text-emerald-200 transform rotate-[-0.5deg]"
            style={{ textShadow: "2px 2px 4px rgba(0,50,0,0.15)" }}
          >
            Platform Features
          </h2>
          <p className="text-lg sm:text-xl text-emerald-700 dark:text-emerald-300 font-handwriting mt-4 max-w-2xl mx-auto">
            Discover the powerful tools and features that make language learning
            effective and enjoyable
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <MotionWrapper
              key={index}
              animationType="scale-in"
              delay={150 + index * 100}
            >
              <div
                className={`group relative bg-gradient-to-br ${colors.bg} rounded-3xl p-6 sm:p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border ${colors.border} h-full flex flex-col shadow-lg hover:shadow-2xl`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${colors.iconBg} flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform duration-300`}
                >
                  <div className={colors.text}>{stat.icon}</div>
                </div>

                {/* Number */}
                <div className="text-center mb-2">
                  <div
                    className={`text-4xl sm:text-5xl font-bold ${colors.text} font-handwriting`}
                  >
                    {stat.number}
                  </div>
                </div>

                {/* Label */}
                <div className="text-center mb-3">
                  <h3 className="text-lg sm:text-xl font-handwriting text-emerald-800 dark:text-emerald-100">
                    {stat.label}
                  </h3>
                </div>

                {/* Description */}
                <div className="text-center flex-grow">
                  <p className="text-sm sm:text-base text-emerald-700 dark:text-emerald-200 font-handwriting leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div
                  className={`absolute top-3 right-3 w-3 h-3 ${colors.iconBg} rounded-full opacity-50 group-hover:opacity-100 transition-opacity`}
                ></div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>

      {/* Additional info section */}
      <MotionWrapper animationType="fade-up" delay={800}>
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-amber-200 dark:border-amber-700">
              <h3 className="text-2xl sm:text-3xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-4">
                Experience the Future of Language Learning
              </h3>
              <p className="text-lg text-emerald-700 dark:text-emerald-300 font-handwriting mb-6">
                Our AI-powered platform combines cutting-edge technology with
                proven language learning methodologies
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm font-medium">
                    Interactive conversations
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm font-medium">
                    Real-time feedback
                  </span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm font-medium">
                    Personalized learning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
