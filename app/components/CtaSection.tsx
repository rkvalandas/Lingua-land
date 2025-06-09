"use client";

import { useState } from "react";
import Link from "next/link";
import MotionWrapper from "./MotionWrapper";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function CtaSection() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="w-full mt-16 sm:mt-24 mb-8 text-center">
      <MotionWrapper animationType="scale-in">
        <div
          className="bg-amber-200 dark:bg-green-800 bg-opacity-70 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border-2 border-yellow-500 dark:border-emerald-400"
          style={{
            boxShadow: "4px 4px 0 rgba(0,0,0,0.05)",
          }}
        >
          <MotionWrapper animationType="fade-up" delay={200}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-emerald-800 dark:text-emerald-100 mb-3 sm:mb-4"
              style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
            >
              Start Your Language Learning Journey Today
            </h2>
          </MotionWrapper>

          <MotionWrapper animationType="fade-up" delay={400}>
            <p className="text-base sm:text-lg text-emerald-700 dark:text-lime-200 mb-6 sm:mb-8 max-w-2xl mx-auto font-handwriting">
              Join learners worldwide who are mastering new languages with our
              AI-powered platform. Practice speaking, improve grammar, and
              achieve fluency faster than ever before.
            </p>
          </MotionWrapper>

          <MotionWrapper animationType="scale-in" delay={600}>
            {user ? (
              <Link
                href="/services"
                className="paper-texture inline-block px-8 sm:px-10 py-4 sm:py-5 bg-amber-100 text-amber-800 text-lg sm:text-xl transform hover:scale-105 transition-all animate-pulse"
                style={{
                  borderRadius: "15px",
                  border: "2px solid #f59e0b",
                  backgroundSize: "cover",
                  boxShadow: "3px 4px 0 rgba(146, 64, 14, 0.2)",
                  animation: "pulse 2s infinite",
                }}
              >
                <span className="relative z-10 font-handwriting">
                  Continue Learning
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="paper-texture inline-block px-8 sm:px-10 py-4 sm:py-5 bg-amber-100 text-amber-800 text-lg sm:text-xl transform hover:scale-105 transition-all animate-pulse"
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
              </button>
            )}
          </MotionWrapper>
        </div>
      </MotionWrapper>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
