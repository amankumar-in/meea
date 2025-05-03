"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";

type GradientTheme = 
  | "primary" // blue to purple
  | "secondary" // orange to yellow
  | "success" // green to teal
  | "info" // blue to cyan
  | "warning" // yellow to orange
  | "danger" // red to pink
  | "purple" // purple to violet
  | "peach" // peach to pink
  | "sunset" // orange to red
  | "ocean" // blue to teal

interface GradientColors {
  light: {
    from: string;
    to: string;
  };
  dark: {
    from: string;
    to: string;
  };
}

const gradientThemes: Record<GradientTheme, GradientColors> = {
  primary: {
    light: { from: "#3b82f6", to: "#8b5cf6" }, // blue to purple
    dark: { from: "#60a5fa", to: "#a78bfa" },
  },
  secondary: {
    light: { from: "#f97316", to: "#facc15" }, // orange to yellow
    dark: { from: "#fb923c", to: "#fde047" },
  },
  success: {
    light: { from: "#22c55e", to: "#14b8a6" }, // green to teal
    dark: { from: "#4ade80", to: "#2dd4bf" },
  },
  info: {
    light: { from: "#3b82f6", to: "#06b6d4" }, // blue to cyan
    dark: { from: "#60a5fa", to: "#22d3ee" },
  },
  warning: {
    light: { from: "#facc15", to: "#f97316" }, // yellow to orange
    dark: { from: "#fde047", to: "#fb923c" },
  },
  danger: {
    light: { from: "#ef4444", to: "#ec4899" }, // red to pink
    dark: { from: "#f87171", to: "#f472b6" },
  },
  purple: {
    light: { from: "#8b5cf6", to: "#a855f7" }, // purple to violet
    dark: { from: "#a78bfa", to: "#c084fc" },
  },
  peach: {
    light: { from: "#fb7185", to: "#f9a8d4" }, // peach to pink
    dark: { from: "#fda4af", to: "#f9a8d4" },
  },
  sunset: {
    light: { from: "#f97316", to: "#ef4444" }, // orange to red
    dark: { from: "#fb923c", to: "#f87171" },
  },
  ocean: {
    light: { from: "#3b82f6", to: "#0ea5e9" }, // blue to sky
    dark: { from: "#60a5fa", to: "#38bdf8" },
  },
};

// Common types for all text components
type AsType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

type BaseTextProps = {
  children: ReactNode;
  className?: string;
  as?: AsType;
  color?: string;
  centered?: boolean;
};

type FontSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

// Heading Component with size variations
interface HeadingProps extends BaseTextProps {
  size?: FontSize;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
}

export function Heading({
  children,
  className,
  as = "h2",
  size = "2xl",
  weight = "bold",
  color,
  centered,
}: HeadingProps) {
  const Component = as;
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };
  
  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  return (
    <Component
      className={cn(
        "text-gray-900 dark:text-white",
        sizeClasses[size],
        weightClasses[weight],
        centered && "text-center",
        color,
        className
      )}
    >
      {children}
    </Component>
  );
}

// Gradient Heading Component
interface GradientHeadingProps extends HeadingProps {
  theme?: GradientTheme;
}

export function GradientHeading({
  children,
  className,
  as = "h2",
  size = "4xl",
  theme = "primary",
  centered,
}: GradientHeadingProps) {
  const Component = as;
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };
  
  // Map gradient themes to tailwind classes
  const gradientClasses = {
    primary: "from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400",
    secondary: "from-orange-500 to-yellow-400 dark:from-orange-400 dark:to-yellow-300",
    success: "from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400",
    info: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    warning: "from-yellow-400 to-orange-500 dark:from-yellow-300 dark:to-orange-400",
    danger: "from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400",
    purple: "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
    peach: "from-rose-400 to-pink-400 dark:from-rose-300 dark:to-pink-300",
    sunset: "from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400",
    ocean: "from-blue-500 to-sky-500 dark:from-blue-400 dark:to-sky-400",
  };
  
  return (
    <Component
      className={cn(
        "font-bold bg-clip-text text-transparent bg-gradient-to-r",
        gradientClasses[theme],
        sizeClasses[size],
        centered && "text-center",
        className
      )}
    >
      {children}
    </Component>
  );
}

// Paragraph component
interface ParagraphProps extends BaseTextProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Paragraph({
  children,
  className,
  as = "p",
  size = "md",
  color,
  centered,
}: ParagraphProps) {
  const Component = as;
  
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <Component
      className={cn(
        "text-gray-600 dark:text-gray-300",
        sizeClasses[size],
        centered && "text-center",
        color,
        className
      )}
    >
      {children}
    </Component>
  );
}

// Section Title with optional gradient
interface SectionTitleProps {
  children: ReactNode;
  theme?: GradientTheme;
  withAccent?: boolean;
  className?: string;
  subtitle?: string;
}

export function SectionTitle({
  children,
  theme = "primary",
  withAccent = false,
  className,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className={cn("text-center mb-16", className)}>
      {withAccent && (
        <div className="flex items-center justify-center mb-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <span className="px-3 text-sm font-medium text-blue-600 dark:text-blue-400">FEATURED</span>
          <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
      )}
      
      <GradientHeading
        theme={theme}
        size="4xl"
        className="mb-4"
        centered
      >
        {children}
      </GradientHeading>
      
      {subtitle && (
        <Paragraph 
          centered
          size="lg"
          className="max-w-2xl mx-auto"
        >
          {subtitle}
        </Paragraph>
      )}
    </div>
  );
}

// Other typography components like Link, Caption, List, etc. can be added as needed 