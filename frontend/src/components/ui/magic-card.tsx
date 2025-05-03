"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  spotlight?: boolean;
  spotlightColor?: string;
  borderSpotlight?: boolean;
  borderSpotlightColor?: string;
  glowColor?: string;
  shadowColor?: string;
}

export function MagicCard({
  as: Component = "div",
  className,
  children,
  spotlight = false,
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  borderSpotlight = false,
  borderSpotlightColor = "rgba(255, 255, 255, 0.5)",
  glowColor = "rgba(120, 119, 198, 0.3)",
  shadowColor = "rgba(0, 0, 0, 0.25)",
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize the position
    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;

    // Calculate rotation based on mouse position
    const rotateX = (normalizedY - 0.5) * 6; // 6 degrees max rotation
    const rotateY = (0.5 - normalizedX) * 6; // 6 degrees max rotation

    // Apply the rotation and other effects
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Update spotlight position if enabled
    if (spotlight || borderSpotlight) {
      setPosition({ x, y });
      setOpacity(1);
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset card rotation
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    
    // Hide spotlight
    setOpacity(0);
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Component
      ref={cardRef}
      className={cn(
        "relative overflow-hidden transition-transform duration-200 will-change-transform",
        {
          "border rounded-xl dark:shadow-[0_0_15px_rgba(0,0,0,0.6)]": true,
        },
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        boxShadow: `0 50px 100px -30px ${shadowColor}`,
      }}
      {...props}
    >
      {children}
      
      {/* Spotlight overlay */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor} 0%, transparent 70%)`,
          }}
        />
      )}
      
      {/* Border spotlight */}
      {borderSpotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
          style={{
            opacity: opacity * 0.7,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${borderSpotlightColor} 0%, transparent 70%)`,
            backgroundClip: "padding-box",
          }}
        />
      )}
      
      {/* Focused glow effect */}
      {isFocused && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
          style={{
            boxShadow: `0 0 20px 2px ${glowColor}`,
          }}
        />
      )}
    </Component>
  );
}