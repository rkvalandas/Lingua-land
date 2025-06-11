"use client";

import MotionWrapper from "./MotionWrapper";

export default function ExamPrepSection() {
  const examFeatures = [
    {
      exam: "TOEFL",
      description: "Master all 4 sections with AI-powered practice",
      features: [
        "Speaking Practice",
        "Writing Assistance",
        "Reading Comprehension",
        "Listening Skills",
      ],
      color: "from-blue-500 to-indigo-600",
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
    },
    {
      exam: "IELTS",
      description: "Comprehensive preparation for all band levels",
      features: [
        "Task 1 & 2 Writing",
        "Speaking Mock Tests",
        "Academic Reading",
        "General Training",
      ],
      color: "from-green-500 to-emerald-600",
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
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      exam: "Business",
      description: "Professional English for career advancement",
      features: [
        "Business Vocabulary",
        "Presentation Skills",
        "Email Writing",
        "Meeting Confidence",
      ],
      color: "from-purple-500 to-violet-600",
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full mt-20 sm:mt-32 mb-12 sm:mb-16 px-4 sm:px-6">
      <MotionWrapper animationType="fade-up">
        <div className="text-center mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-4 transform rotate-[0.3deg]"
            style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
          >
            🎯 Ace Your English Exams
          </h2>
          <p className="text-lg text-emerald-700 dark:text-emerald-300 font-handwriting max-w-2xl mx-auto">
            Get exam-ready with AI-powered practice sessions designed
            specifically for TOEFL, IELTS, and professional English tests
          </p>
        </div>
      </MotionWrapper>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {examFeatures.map((feature, index) => (
          <MotionWrapper
            key={feature.exam}
            animationType="fade-up"
            delay={index * 200}
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm transform transition-all hover:scale-105 border-2 border-amber-400 dark:border-amber-500 h-full flex flex-col shadow-lg hover:shadow-xl"
              style={{
                borderRadius: "25px 10px 20px 15px",
                boxShadow: "8px 8px 15px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-2">
                  {feature.exam}
                </h3>
                <p className="text-emerald-700 dark:text-emerald-300 font-handwriting">
                  {feature.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex-grow">
                <ul className="space-y-3">
                  {feature.features.map((item, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span className="text-emerald-700 dark:text-emerald-300 font-handwriting text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-700">
                <button
                  className={`w-full py-3 px-4 bg-gradient-to-r ${feature.color} text-white font-handwriting rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-md`}
                  style={{ borderRadius: "12px 5px 10px 8px" }}
                >
                  Start {feature.exam} Prep 🚀
                </button>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
