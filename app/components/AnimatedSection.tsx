"use client";

import { ReactNode } from "react";
import ScrollAnimation from "./ScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  childrenClassName?: string;
  id?: string;
  staggered?: boolean;
  staggerDelay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  childrenClassName = "",
  id,
  staggered = false,
  staggerDelay = 150,
}: AnimatedSectionProps) {
  if (!staggered) {
    return (
      <div id={id}>
        <ScrollAnimation className={className}>
          <div className={childrenClassName}>{children}</div>
        </ScrollAnimation>
      </div>
    );
  }

  // If staggered is true, we expect children to be an array
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className} id={id}>
      {childrenArray.map((child, index) => (
        <ScrollAnimation
          key={index}
          delay={index * staggerDelay}
          className={childrenClassName}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
}
