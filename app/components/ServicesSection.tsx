"use client";

import Link from "next/link";
import MotionWrapper from "./MotionWrapper";

export default function ServicesSection() {
  const services = [
    {
      title: "AI Conversation",
      description:
        "Practice speaking with an intelligent AI companion that adapts to your language level and provides real-time feedback.",
      features: [
        "Natural voice interaction",
        "Real-time corrections",
        "Personalized topics",
      ],
      emoji: "🗣️",
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
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      ),
      color: "teal",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      title: "Grammar Checker",
      description:
        "Perfect your writing with AI-powered grammar corrections, style suggestions, and detailed explanations.",
      features: [
        "Instant corrections",
        "Style improvements",
        "Learning explanations",
      ],
      emoji: "✍️",
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Smart Translator",
      description:
        "Translate text instantly with context-aware AI that understands nuances and cultural references.",
      features: ["150+ languages", "Context awareness", "Cultural adaptation"],
      emoji: "🌐",
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
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
      color: "blue",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Text Summarizer",
      description:
        "Transform lengthy texts into concise, meaningful summaries while preserving key information and context.",
      features: ["Smart extraction", "Key points focus", "Multiple formats"],
      emoji: "📄",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Paraphraser",
      description:
        "Rephrase your text creatively while maintaining meaning, improving clarity, and enhancing style.",
      features: ["Style variations", "Tone adjustment", "Clarity enhancement"],
      emoji: "🔄",
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      teal: {
        cardBg:
          "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20",
        border: "border-teal-200 dark:border-teal-700",
        iconBg: "bg-teal-100 dark:bg-teal-800",
        iconText: "text-teal-600 dark:text-teal-300",
      },
      emerald: {
        cardBg:
          "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
        border: "border-emerald-200 dark:border-emerald-700",
        iconBg: "bg-emerald-100 dark:bg-emerald-800",
        iconText: "text-emerald-600 dark:text-emerald-300",
      },
      blue: {
        cardBg:
          "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        border: "border-blue-200 dark:border-blue-700",
        iconBg: "bg-blue-100 dark:bg-blue-800",
        iconText: "text-blue-600 dark:text-blue-300",
      },
      purple: {
        cardBg:
          "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
        border: "border-purple-200 dark:border-purple-700",
        iconBg: "bg-purple-100 dark:bg-purple-800",
        iconText: "text-purple-600 dark:text-purple-300",
      },
      amber: {
        cardBg:
          "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
        border: "border-amber-200 dark:border-amber-700",
        iconBg: "bg-amber-100 dark:bg-amber-800",
        iconText: "text-amber-600 dark:text-amber-300",
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="w-full mt-16 sm:mt-24 mb-12 sm:mb-16">
      <MotionWrapper animationType="fade-up">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full border border-blue-200 dark:border-blue-700 mb-6">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              🚀 AI Services
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-handwriting text-emerald-800 dark:text-emerald-200 transform rotate-[0.5deg]"
            style={{ textShadow: "2px 2px 4px rgba(0,50,0,0.15)" }}
          >
            Powerful Learning Tools
          </h2>
          <p className="text-lg sm:text-xl text-emerald-700 dark:text-emerald-300 font-handwriting mt-4 max-w-3xl mx-auto">
            Discover our comprehensive suite of AI-powered tools designed to
            accelerate your language learning journey
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => {
          const colors = getColorClasses(service.color);
          return (
            <MotionWrapper
              key={index}
              animationType="fade-up"
              delay={150 + index * 100}
            >
              <div
                className={`group relative bg-gradient-to-br ${colors.cardBg} rounded-3xl p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 border ${colors.border} h-full flex flex-col shadow-lg hover:shadow-2xl`}
              >
                {/* Header with icon and emoji */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <div className={colors.iconText}>{service.icon}</div>
                  </div>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {service.emoji}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-handwriting text-emerald-800 dark:text-emerald-100 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-emerald-700 dark:text-emerald-200 font-handwriting leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
                      ></div>
                      <span className="text-sm text-emerald-600 dark:text-emerald-300 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/services"
                  className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-handwriting rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <span>Try {service.title}</span>
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.gradient}`}
                  ></div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient}`}
                  ></div>
                </div>
              </div>
            </MotionWrapper>
          );
        })}
      </div>

      {/* Call to action */}
      <MotionWrapper animationType="fade-up" delay={800}>
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-200 dark:border-indigo-700">
              <h3 className="text-2xl sm:text-3xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-4">
                Ready to Start Your Language Journey?
              </h3>
              <p className="text-lg text-emerald-700 dark:text-emerald-300 font-handwriting mb-6">
                Access all these powerful tools and more with our comprehensive
                learning platform
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg font-handwriting rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span>🎯 Explore All Services</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
