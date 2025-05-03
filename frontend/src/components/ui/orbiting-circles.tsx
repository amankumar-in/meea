"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps {
  className?: string;
  numCircles?: number;
  radiusMultiplier?: number;  
  minRadius?: number;
  maxRadius?: number;
  minSize?: number;
  maxSize?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minDuration?: number; 
  maxDuration?: number;
  colors?: string[];
  interactive?: boolean;
  circleContent?: React.ReactNode[];
  centerContent?: React.ReactNode;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className,
  numCircles = 6,
  radiusMultiplier = 1,
  minRadius = 80, 
  maxRadius = 160,
  minSize = 30,
  maxSize = 60, 
  minOpacity = 0.4,
  maxOpacity = 0.9,
  minDuration = 20,
  maxDuration = 50,
  colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3", "#33FFF3"],
  interactive = false,
  circleContent = [],
  centerContent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<Array<{
    id: number;
    radius: number;
    size: number;
    color: string;
    opacity: number;
    duration: number;
    startAngle: number;
    content?: React.ReactNode;
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  
  // Generate circle configurations on mount
  useEffect(() => {
    const newCircles = Array.from({ length: numCircles }, (_, i) => {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const size = minSize + Math.random() * (maxSize - minSize);
      const opacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      
      return {
        id: i,
        radius: radius * radiusMultiplier,
        size,
        color: colors[i % colors.length],
        opacity,
        duration,
        startAngle: Math.random() * 360,
        content: circleContent[i % circleContent.length],
      };
    });
    
    setCircles(newCircles);
  }, [
    numCircles, 
    minRadius, 
    maxRadius, 
    minSize, 
    maxSize, 
    colors, 
    minOpacity, 
    maxOpacity, 
    minDuration, 
    maxDuration, 
    radiusMultiplier,
    circleContent
  ]);
  
  // Handle mouse interaction
  useEffect(() => {
    if (!interactive || !containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Center content */}
      {centerContent && (
        <div className="relative z-10">{centerContent}</div>
      )}
      
      {/* Orbiting circles */}
      {circles.map((circle) => {
        // Calculate position adjustment based on mouse position
        let xAdjust = 0;
        let yAdjust = 0;
        
        if (interactive && mousePosition) {
          xAdjust = mousePosition.x * 20; 
          yAdjust = mousePosition.y * 20;
        }
        
        return (
          <motion.div
            key={circle.id}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
              opacity: circle.opacity,
            }}
            animate={{
              x: [
                `calc(${circle.radius}px * cos(${circle.startAngle}deg) + ${xAdjust}px)`,
                `calc(${circle.radius}px * cos(${circle.startAngle + 360}deg) + ${xAdjust}px)`,
              ],
              y: [
                `calc(${circle.radius}px * sin(${circle.startAngle}deg) + ${yAdjust}px)`,
                `calc(${circle.radius}px * sin(${circle.startAngle + 360}deg) + ${yAdjust}px)`,
              ],
              scale: interactive && mousePosition ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "linear",
              times: [0, 1],
            }}
          >
            {circle.content}
          </motion.div>
        );
      })}
    </div>
  );
};