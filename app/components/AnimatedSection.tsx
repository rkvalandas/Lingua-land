"use client";

import { ReactNode } from "react";
import MotionSection from "./MotionSection";

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
        <MotionSection className={className}>
          <div className={childrenClassName}>{children}</div>
        </MotionSection>
      </div>
    );
  }

  // If staggered is true, we expect children to be an array
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <MotionSection
      className={className}
      id={id}
      staggered={true}
      staggerDelay={staggerDelay}
      childrenClassName={childrenClassName}
    >
      {childrenArray.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </MotionSection>
  );
}
