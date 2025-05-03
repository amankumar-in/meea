"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"div"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  colorFromDark?: string;
  colorToDark?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  colorFromDark,
  colorToDark,
  ...props
}: AnimatedGradientTextProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode on client-side 
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeQuery.addEventListener('change', handler);
    return () => darkModeQuery.removeEventListener('change', handler);
  }, []);

  // Default to light mode colors if dark mode colors aren't provided
  const darkColorFrom = colorFromDark || colorFrom;
  const darkColorTo = colorToDark || colorTo;

  return (
    <div 
      className={cn(
        "font-bold animate-gradient bg-clip-text text-transparent bg-[length:400%_400%]",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${isDarkMode ? darkColorFrom : colorFrom}, ${isDarkMode ? darkColorTo : colorTo}, ${isDarkMode ? darkColorFrom : colorFrom})`,
        animationDuration: `${8 / speed}s`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}