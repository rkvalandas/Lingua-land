"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  animationType?:
    | "fade-up"
    | "fade-in"
    | "scale-in"
    | "slide-in-right"
    | "slide-in-left";
  delay?: number;
  className?: string;
  duration?: number;
  once?: boolean;
}

const animationVariants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-in-right": {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-in-left": {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
};

export default function MotionWrapper({
  children,
  animationType = "fade-up",
  delay = 0,
  className = "",
  duration = 0.7,
  once = true,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -50px 0px" }}
      variants={animationVariants[animationType]}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.1, 0.25, 1], // Custom ease for smooth animation
      }}
      style={{
        willChange: "opacity, transform",
        transform: "translate3d(0, 0, 0)", // Force hardware acceleration
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
}
