import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import React from "react";

// Types for button variants
type ButtonVariant = "primary" | "secondary" | "accent" | "light" | "dark";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonType = "solid" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonType?: ButtonType;
  className?: string;
  href?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  buttonType = "solid",
  className = "",
  href,
  fullWidth = false,
  onClick,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  // Base styles that apply to all buttons
  const baseStyles = "font-medium transition-all duration-300 inline-flex items-center justify-center rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Size variations
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };
  
  // Variant styles (colors)
  const variantStyles = {
    primary: {
      solid: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:ring-blue-500",
      ghost: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:ring-blue-500",
    },
    secondary: {
      solid: "bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-500",
      outline: "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 focus:ring-yellow-500",
      ghost: "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 focus:ring-yellow-500",
    },
    accent: {
      solid: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
      outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:ring-purple-500",
      ghost: "text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 focus:ring-purple-500",
    },
    light: {
      solid: "bg-white hover:bg-gray-100 text-gray-900 focus:ring-gray-300",
      outline: "border-2 border-white text-white hover:bg-white/10 focus:ring-white",
      ghost: "text-white hover:bg-white/10 focus:ring-white",
    },
    dark: {
      solid: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-700",
      outline: "border-2 border-gray-800 text-gray-800 dark:text-gray-200 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/30 focus:ring-gray-700",
      ghost: "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/30 focus:ring-gray-700",
    },
  };
  
  // Gradient variations that can be applied with className
  const gradientClasses = {
    "blue": "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white",
    "purple": "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white",
    "yellow": "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900",
  };
  
  // Disabled state
  const disabledStyles = "opacity-50 cursor-not-allowed";
  
  // Full width
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant][buttonType]}
    ${disabled ? disabledStyles : ""}
    ${widthStyles}
    ${className}
  `;
  
  // If href is provided, render as a link
  if (href) {
    return (
      <Link
        href={href}
        className={buttonStyles}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Otherwise render as a button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// You can also add a Chip component for consistent styling of chips
export const Chip = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: {
  variant?: "primary" | "secondary" | "accent" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium";
  
  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };
  
  const variantStyles = {
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    secondary: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    accent: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    light: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    dark: "bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100",
  };
  
  const chipStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;
  
  return (
    <span className={chipStyles} {...props}>
      {children}
    </span>
  );
};
