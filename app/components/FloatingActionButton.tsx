"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show FAB after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    if (user) {
      // If user is logged in, navigate to services
      window.location.href = "/services";
    } else {
      // If not logged in, show auth modal
      setAuthModalOpen(true);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleClick}
          className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full p-4 shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow"
          aria-label={user ? "Go to Services" : "Start Learning"}
        >
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>

          {/* Icon */}
          <div className="relative z-10 flex items-center gap-2">
            {user ? (
              <>
                <svg
                  className="w-6 h-6"
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
                <span className="hidden sm:block font-medium">Continue</span>
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="hidden sm:block font-medium">Start Free</span>
              </>
            )}
          </div>

          {/* Floating notification badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            🎯
          </div>
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {user ? "Continue your language journey" : "Start learning for free!"}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
