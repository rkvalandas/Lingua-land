"use client";

import Link from "next/link";
import MotionWrapper from "./MotionWrapper";

export default function ServicesSection() {
  const services = [
    {
      title: "AI Conversation",
      description:
        "Practice speaking with an intelligent AI companion that adapts to your language level.",
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
      color: "teal",
    },
    {
      title: "Grammar Checker",
      description:
        "Perfect your writing with AI-powered grammar corrections and suggestions.",
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "emerald",
    },
    {
      title: "Translator",
      description:
        "Instantly translate text between multiple languages with high accuracy.",
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
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
      color: "blue",
    },
    {
      title: "Summariser",
      description:
        "Transform long texts into concise, meaningful summaries in seconds.",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "purple",
    },
    {
      title: "Paraphraser",
      description:
        "Rephrase your text while maintaining meaning and improving clarity.",
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      color: "amber",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      teal: {
        bg: "bg-teal-200 dark:bg-teal-700",
        border: "border-teal-400 dark:border-teal-500",
        iconBg: "bg-teal-100 dark:bg-teal-900",
        iconText: "text-teal-600 dark:text-teal-400",
      },
      emerald: {
        bg: "bg-emerald-200 dark:bg-emerald-700",
        border: "border-emerald-400 dark:border-emerald-500",
        iconBg: "bg-emerald-100 dark:bg-emerald-900",
        iconText: "text-emerald-600 dark:text-emerald-400",
      },
      blue: {
        bg: "bg-blue-200 dark:bg-blue-700",
        border: "border-blue-400 dark:border-blue-500",
        iconBg: "bg-blue-100 dark:bg-blue-900",
        iconText: "text-blue-600 dark:text-blue-400",
      },
      purple: {
        bg: "bg-purple-200 dark:bg-purple-700",
        border: "border-purple-400 dark:border-purple-500",
        iconBg: "bg-purple-100 dark:bg-purple-900",
        iconText: "text-purple-600 dark:text-purple-400",
      },
      amber: {
        bg: "bg-amber-200 dark:bg-amber-700",
        border: "border-amber-400 dark:border-amber-500",
        iconBg: "bg-amber-100 dark:bg-amber-900",
        iconText: "text-amber-600 dark:text-amber-400",
      },
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div id="services" className="w-full mt-20 sm:mt-32 mb-12 sm:mb-16">
      <MotionWrapper animationType="fade-up">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-center text-emerald-800 dark:text-emerald-200 mb-4 transform rotate-[-0.5deg]"
          style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
        >
          Language Learning Services
        </h2>
        <p className="text-lg text-emerald-700 dark:text-emerald-300 text-center font-handwriting mb-8 sm:mb-12">
          Five powerful AI services to accelerate your language learning journey
        </p>
      </MotionWrapper>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
        {services.map((service, index) => {
          const colorClasses = getColorClasses(service.color);
          return (
            <MotionWrapper
              key={service.title}
              animationType="fade-up"
              delay={index * 150}
            >
              <div
                className={`${colorClasses.bg} bg-opacity-70 dark:bg-opacity-40 rounded-2xl p-6 backdrop-blur-sm transform transition-all hover:scale-105 border-2 ${colorClasses.border} h-full flex flex-col`}
                style={{
                  boxShadow: "6px 6px 10px rgba(0,0,0,0.15)",
                  transform: `rotate(${
                    index % 2 === 0 ? "0.5deg" : "-0.5deg"
                  })`,
                }}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full ${colorClasses.iconBg} flex items-center justify-center flex-shrink-0`}
                  style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}
                >
                  <div className={colorClasses.iconText}>{service.icon}</div>
                </div>
                <div className="flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-handwriting text-emerald-800 dark:text-emerald-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-100 font-handwriting flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>

      <MotionWrapper animationType="scale-in" delay={600}>
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/services"
            className="inline-block px-8 py-4 bg-emerald-100 dark:bg-emerald-700 text-emerald-800 dark:text-white text-lg font-handwriting transform hover:scale-105 transition-all"
            style={{
              borderRadius: "20px 5px 15px 10px",
              border: "2px solid #10b981",
              filter: "url(#paper-filter)",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            Explore All Services
          </Link>
        </div>
      </MotionWrapper>
    </div>
  );
}
