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
    <div className="w-full mt-16 sm:mt-24 mb-8">
      <MotionWrapper animationType="scale-in">
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 dark:from-amber-700 dark:via-amber-800 dark:to-amber-900 rounded-3xl p-8 sm:p-12 backdrop-blur-sm shadow-2xl border border-amber-400/30 dark:border-amber-600/30">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20 dark:opacity-15">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white dark:bg-white/80 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-300 dark:bg-emerald-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-16 left-20 w-12 h-12 bg-teal-300 dark:bg-teal-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-emerald-200 dark:bg-emerald-300 rounded-full animate-bounce"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <MotionWrapper animationType="fade-up" delay={200}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 dark:bg-emerald-800/30 rounded-full border border-emerald-500/30 dark:border-emerald-600/40 mb-6 shadow-lg backdrop-blur-md">
                <span className="text-emerald-100 dark:text-emerald-200 text-sm font-medium">
                  🎉 Start Your Language Journey
                </span>
              </div>
            </MotionWrapper>

            <MotionWrapper animationType="fade-up" delay={300}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-handwriting leading-tight mb-6 text-shadow-sm">
                <span className="block text-white">Ready to Master</span>
                <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent drop-shadow-md">
                  Any Language?
                </span>
              </h2>
            </MotionWrapper>

            <MotionWrapper animationType="fade-up" delay={400}>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto font-handwriting leading-relaxed">
                Transform your language learning experience with AI-powered
                conversations, personalized feedback, and interactive lessons
                that adapt to your pace.
                <span className="block mt-2 font-bold text-emerald-200 dark:text-emerald-300 drop-shadow-md">
                  Start speaking confidently in just 30 days!
                </span>
              </p>
            </MotionWrapper>

            {/* Benefits grid */}
            <MotionWrapper animationType="fade-up" delay={500}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg hover:bg-white/15 dark:hover:bg-white/10 transition-colors duration-300">
                  <span className="text-2xl">🚀</span>
                  <span className="text-white font-medium">Fast Progress</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg hover:bg-white/15 dark:hover:bg-white/10 transition-colors duration-300">
                  <span className="text-2xl">🎯</span>
                  <span className="text-white font-medium">Personalized</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-white/5 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg hover:bg-white/15 dark:hover:bg-white/10 transition-colors duration-300">
                  <span className="text-2xl">🌟</span>
                  <span className="text-white font-medium">AI-Powered</span>
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper animationType="scale-in" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {user ? (
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white text-xl font-handwriting rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-emerald-400/50 dark:border-emerald-500/50"
                  >
                    <span>🎯 Continue Learning</span>
                    <svg
                      className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
                ) : (
                  <>
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white text-xl font-handwriting rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-emerald-400/50 dark:border-emerald-500/50"
                    >
                      <span>🚀 Start Free Today</span>
                      <svg
                        className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
                    </button>
                    <div className="flex items-center gap-2 text-white/90 bg-amber-700/40 dark:bg-amber-900/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-amber-600/30 dark:border-amber-800/40">
                      <svg
                        className="w-5 h-5 text-emerald-200 dark:text-emerald-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        No credit card required
                      </span>
                    </div>
                  </>
                )}
              </div>
            </MotionWrapper>

            {/* Trust indicators */}
            <MotionWrapper animationType="fade-up" delay={700}>
              <div className="mt-8 pt-8 border-t border-amber-500/20 dark:border-amber-700/20">
                <div className="flex flex-wrap justify-center items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-600/20 dark:bg-amber-800/30 rounded-full border border-amber-500/20 dark:border-amber-700/30 backdrop-blur-sm">
                    <span className="text-emerald-300 dark:text-emerald-400">✓</span>
                    <span className="text-sm font-medium">
                      100% Free to Start
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-600/20 dark:bg-amber-800/30 rounded-full border border-amber-500/20 dark:border-amber-700/30 backdrop-blur-sm">
                    <span className="text-emerald-300 dark:text-emerald-400">🔒</span>
                    <span className="text-sm font-medium">
                      Secure & Private
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-amber-600/20 dark:bg-amber-800/30 rounded-full border border-amber-500/20 dark:border-amber-700/30 backdrop-blur-sm">
                    <span className="text-emerald-300 dark:text-emerald-400">🧠</span>
                    <span className="text-sm font-medium">
                      AI-Powered Learning
                    </span>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
