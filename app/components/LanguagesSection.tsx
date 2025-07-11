"use client";

import MotionWrapper from "./MotionWrapper";

export default function LanguagesSection() {
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese (Mandarin)",
    "Korean",
    "Hindi",
    "Arabic",
    "Dutch",
    "Polish",
    "Swedish",
    "Turkish",
    "Vietnamese",
    "Thai",
    "Indonesian",
    "Bengali",
    "Tamil",
    "Swahili",
    "Hebrew",
    "Persian",
  ];

  // Create staggered animation delays
  const getDelay = (index: number) => {
    return 100 + index * 70; // Increase delay for each item
  };

  // Alternate animations for visual interest
  const getAnimationType = (index: number) => {
    if (index % 3 === 0) return "slide-in-left";
    if (index % 3 === 1) return "fade-up";
    return "slide-in-right";
  };

  return (
    <div id="languages" className="w-full mt-16 sm:mt-24 mb-3 sm:mb-6">
      <MotionWrapper animationType="fade-up">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-center text-emerald-800 dark:text-emerald-200 mb-8 sm:mb-12"
          style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
        >
          Master 150+ Languages from Around the World
        </h2>
      </MotionWrapper>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
        {languages.map((language, index) => (
          <MotionWrapper
            key={language}
            animationType={getAnimationType(index)}
            delay={getDelay(index)}
          >
            <div
              className="px-3 sm:px-4 py-1 sm:py-2 bg-lime-200 dark:bg-lime-800 bg-opacity-70 font-handwriting text-sm sm:text-base text-emerald-700 dark:text-emerald-200 transform transition-all hover:scale-110 hover:shadow-md border-2 border-lime-500 dark:border-lime-600"
              style={{
                borderRadius: "13px",
                boxShadow: "1px 2px 0 rgba(0,0,0,0.05)",
              }}
            >
              {language}
            </div>
          </MotionWrapper>
        ))}
        <MotionWrapper
          animationType="scale-in"
          delay={getDelay(languages.length)}
        >
          <div
            className="px-3 sm:px-4 py-1 sm:py-2 bg-lime-200 dark:bg-lime-800 bg-opacity-70 dark:bg-opacity-90 font-handwriting text-sm sm:text-base text-emerald-700 dark:text-emerald-200 transform transition-all hover:scale-110 hover:shadow-md border-2 border-lime-500 dark:border-lime-600"
            style={{
              borderRadius: "13px",
              boxShadow: "1px 2px 0 rgba(0,0,0,0.05)",
            }}
          >
            And more...
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
}
