"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  id?: string;
  staggered?: boolean;
  staggerDelay?: number;
  animationType?:
    | "fade-up"
    | "fade-in"
    | "scale-in"
    | "slide-in-right"
    | "slide-in-left";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function MotionSection({
  children,
  className = "",
  childrenClassName = "",
  id,
  staggered = false,
  animationType = "fade-up",
}: MotionSectionProps) {
  if (!staggered) {
    return (
      <motion.div
        id={id}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        variants={{
          hidden: {
            opacity: 0,
            y: animationType.includes("up") ? 20 : 0,
            x: animationType.includes("right")
              ? 20
              : animationType.includes("left")
              ? -20
              : 0,
            scale: animationType === "scale-in" ? 0.9 : 1,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
          },
        }}
        style={{
          willChange: "opacity, transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <div className={childrenClassName}>{children}</div>
      </motion.div>
    );
  }

  // If staggered is true, we expect children to be an array
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      style={{
        willChange: "opacity, transform",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          className={childrenClassName}
          variants={itemVariants}
          style={{
            willChange: "opacity, transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
