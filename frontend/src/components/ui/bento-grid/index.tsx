"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  href?: string;
  onClick?: () => void;
  colSpan?: number;
  hasPersistentHover?: boolean;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-6 rounded-xl overflow-hidden transition-all duration-300",
            "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.05)]",
            "hover:-translate-y-1 will-change-transform",
            item.colSpan === 2 ? "md:col-span-2" : "",
            item.className,
            item.hasPersistentHover && 
              "shadow-[0_2px_12px_rgba(0,0,0,0.05)] -translate-y-1 dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
            (item.onClick || item.href) && "cursor-pointer"
          )}
          style={{
            background: item.bgColor,
            color: item.textColor,
          }}
          onClick={item.onClick}
          role={item.onClick || item.href ? "button" : undefined}
          tabIndex={item.onClick || item.href ? 0 : undefined}
        >
          {/* Pattern overlay */}
          <div className={`absolute inset-0 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                {item.icon}
              </div>
              {item.status && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                    "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                    "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                  )}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 tracking-tight text-xl">
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-snug">
                {item.description}
              </p>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {item.cta && (
              <span className="text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                {item.cta} →
              </span>
            )}
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
}