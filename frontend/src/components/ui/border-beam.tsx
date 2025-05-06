"use client";

import { cn } from "@/lib/utils";
import { motion, MotionStyle, Transition } from "motion/react";

interface BorderBeamProps {
  /** Size of the animated beam square in px */
  size?: number;
  /** Duration of a full loop in seconds */
  duration?: number;
  /** Negative delay offset for staggering */
  delay?: number;
  /** Gradient start color */
  colorFrom?: string;
  /** Gradient end color */
  colorTo?: string;
  /** Additional motion transition controls */
  transition?: Transition;
  /** Additional classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Reverse direction */
  reverse?: boolean;
  /** Starting offset percentage along the border */
  initialOffset?: number;
}

export const BorderBeam = ({
  className,
  size = 6,
  delay = 0,
  duration = 3,
  colorFrom = "#3b82f6",
  colorTo = "#ec4899",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => (
  <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
    <motion.div
      className={cn(
        "absolute aspect-square",
        "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
        className
      )}
      style={
        {
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          ...style,
        } as MotionStyle
      }
      initial={{ offsetDistance: `${initialOffset}%` }}
      animate={{
        offsetDistance: reverse
          ? [`${100 - initialOffset}%`, `-${initialOffset}%`]
          : [`${initialOffset}%`, `${100 + initialOffset}%`],
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration,
        delay: -delay,
        ...transition,
      }}
    />
  </div>
); 