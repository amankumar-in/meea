"use client";

import React from "react";

export default function TestPage() {
  const logos = [
    "/images/partners/partner-logo-1.svg",
    "/images/partners/partner-logo-2.svg",
    "/images/partners/partner-logo-3.svg",
    "/images/partners/partner-logo-4.svg",
    "/images/partners/partner-logo-5.svg",
    "/images/partners/partner-logo-6.svg",
  ];

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Logo Carousel Test</h1>
      
      <div className="overflow-hidden mb-12">
        <h2 className="mb-4">Test 1: Basic Animation</h2>
        <div className="whitespace-nowrap">
          <div className="inline-flex items-center gap-12 animate-marquee">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 rounded-lg p-2 min-w-[160px] bg-gray-100"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-h-full w-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate logos for continuous loop */}
            {logos.map((logo, index) => (
              <div
                key={`dup-${index}`}
                className="flex items-center justify-center h-20 rounded-lg p-2 min-w-[160px] bg-gray-100"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden mb-12">
        <h2 className="mb-4">Test 2: Inline Style Animation</h2>
        <div className="whitespace-nowrap">
          <div 
            className="inline-flex items-center gap-12" 
            style={{ 
              animation: "marquee 10s linear infinite",
              display: "inline-flex"
            }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 rounded-lg p-2 min-w-[160px] bg-gray-100"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-h-full w-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate logos for continuous loop */}
            {logos.map((logo, index) => (
              <div
                key={`dup-${index}`}
                className="flex items-center justify-center h-20 rounded-lg p-2 min-w-[160px] bg-gray-100"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="max-h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
