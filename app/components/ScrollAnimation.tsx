"use client";

import { useRef, useEffect, useState, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  animationType?:
    | "fade-up"
    | "fade-in"
    | "scale-in"
    | "slide-in-right"
    | "slide-in-left";
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  animationType = "fade-up",
  delay = 0,
  threshold = 0.2,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Start animating slightly before element is in view
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Animation class based on the animation type
  const getAnimationClass = () => {
    if (!isVisible) {
      return "opacity-0";
    }

    const transition = `opacity-100 transition-all duration-700 ease-out`;

    switch (animationType) {
      case "fade-up":
        return `transform ${
          isVisible ? "translate-y-0" : "translate-y-16"
        } ${transition}`;
      case "fade-in":
        return transition;
      case "scale-in":
        return `transform ${
          isVisible ? "scale-100" : "scale-95"
        } ${transition}`;
      case "slide-in-right":
        return `transform ${
          isVisible ? "translate-x-0" : "translate-x-16"
        } ${transition}`;
      case "slide-in-left":
        return `transform ${
          isVisible ? "translate-x-0" : "-translate-x-16"
        } ${transition}`;
      default:
        return transition;
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClass()}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
