"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { AnimatedGradientText } from "./animated-gradient-text";

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
    light: { from: "#f97316", to: "#eab308" }, // orange to yellow
    dark: { from: "#fb923c", to: "#facc15" },
  },
  success: {
    light: { from: "#10b981", to: "#14b8a6" }, // green to teal
    dark: { from: "#34d399", to: "#2dd4bf" },
  },
  info: {
    light: { from: "#0ea5e9", to: "#06b6d4" }, // blue to cyan
    dark: { from: "#38bdf8", to: "#22d3ee" },
  },
  warning: {
    light: { from: "#eab308", to: "#f97316" }, // yellow to orange
    dark: { from: "#facc15", to: "#fb923c" },
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
    light: { from: "#fb7185", to: "#f472b6" }, // peach to pink
    dark: { from: "#fda4af", to: "#f9a8d4" },
  },
  sunset: {
    light: { from: "#f97316", to: "#ef4444" }, // orange to red
    dark: { from: "#fb923c", to: "#f87171" },
  },
  ocean: {
    light: { from: "#3b82f6", to: "#0ea5e9" }, // blue to cyan
    dark: { from: "#60a5fa", to: "#38bdf8" },
  }
};

// GradientHeading Component
interface GradientHeadingProps {
  children: ReactNode;
  theme?: GradientTheme;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  centered?: boolean;
  animationSpeed?: number;
}

const fontSizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const fontWeightMap = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export function GradientHeading({
  children,
  theme = "primary",
  className,
  as = "h2",
  size = "3xl",
  weight = "bold",
  centered = false,
  animationSpeed = 1,
}: GradientHeadingProps) {
  const HeadingTag = as;
  const gradientColors = gradientThemes[theme];
  
  return (
    <HeadingTag className={cn(
      fontSizeMap[size],
      fontWeightMap[weight],
      centered && "text-center",
      className
    )}>
      <AnimatedGradientText 
        colorFrom={gradientColors.light.from} 
        colorTo={gradientColors.light.to}
        colorFromDark={gradientColors.dark.from}
        colorToDark={gradientColors.dark.to}
        speed={animationSpeed}
        className={weight}
      >
        {children}
      </AnimatedGradientText>
    </HeadingTag>
  );
}

// Normal Heading Component
interface HeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
  color?: string;
  centered?: boolean;
}

export function Heading({
  children,
  className,
  as = "h2",
  size = "3xl",
  weight = "bold",
  color = "text-gray-900 dark:text-white",
  centered = false,
}: HeadingProps) {
  const HeadingTag = as;
  
  return (
    <HeadingTag className={cn(
      fontSizeMap[size],
      fontWeightMap[weight],
      color,
      centered && "text-center",
      className
    )}>
      {children}
    </HeadingTag>
  );
}

// Paragraph Component
interface ParagraphProps {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
  centered?: boolean;
}

export function Paragraph({
  children,
  className,
  size = "md",
  color = "text-gray-600 dark:text-gray-300",
  centered = false,
}: ParagraphProps) {
  return (
    <p className={cn(
      fontSizeMap[size],
      color,
      centered && "text-center",
      "leading-relaxed",
      className
    )}>
      {children}
    </p>
  );
}

// Section Title component (with accent line)
interface SectionTitleProps {
  children: ReactNode;
  subtitle?: ReactNode;
  theme?: GradientTheme;
  className?: string;
  centered?: boolean;
  withAccent?: boolean;
  accentPosition?: "top" | "bottom" | "both";
}

export function SectionTitle({
  children,
  subtitle,
  theme = "primary",
  className,
  centered = true,
  withAccent = true,
  accentPosition = "both",
}: SectionTitleProps) {
  const gradientColors = gradientThemes[theme];
  
  return (
    <div className={cn(
      "mb-12",
      centered && "flex flex-col items-center text-center",
      className
    )}>
      {(withAccent && (accentPosition === "top" || accentPosition === "both")) && (
        <div className={cn(
          "h-1 w-16 mb-6",
          centered ? "mx-auto" : "",
          `bg-gradient-to-r from-[${gradientColors.light.from}] to-[${gradientColors.light.to}] dark:from-[${gradientColors.dark.from}] dark:to-[${gradientColors.dark.to}]`
        )}></div>
      )}
      
      <GradientHeading theme={theme} size="4xl">
        {children}
      </GradientHeading>
      
      {subtitle && (
        <Paragraph size="lg" className="mt-4 max-w-3xl">
          {subtitle}
        </Paragraph>
      )}
      
      {(withAccent && (accentPosition === "bottom" || accentPosition === "both")) && (
        <div className={cn(
          "h-1 w-24 mt-6",
          centered ? "mx-auto" : "",
          `bg-gradient-to-r from-[${gradientColors.light.from}] to-[${gradientColors.light.to}] dark:from-[${gradientColors.dark.from}] dark:to-[${gradientColors.dark.to}]`
        )}></div>
      )}
    </div>
  );
} 