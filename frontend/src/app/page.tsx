"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

// -------------------------------------------------------------------
// Type Definitions - Maintained from original for Strapi compatibility
// -------------------------------------------------------------------

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  Image?: {
    url: string;
    alternativeText?: string;
  };
}

interface Speaker {
  id: number;
  Name: string;
  Slug: string;
  Title: string;
  Organization: string;
  ShortBio: string;
  Featured: boolean;
  ProfileImage?: {
    url: string;
  };
}

interface Sponsor {
  id: number;
  Name: string;
  Slug: string;
  Tier: "Platinum" | "Gold" | "Silver";
  Featured: boolean;
  Logo?: {
    url: string;
  };
}

// -------------------------------------------------------------------
// Helper Functions
// -------------------------------------------------------------------

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  return `${apiUrl}${path}`;
};

// -------------------------------------------------------------------
// Completely New Section Components
// -------------------------------------------------------------------

// 1. Dynamic Parallax Hero
const DynamicHeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Sky background layer */}
      <div
        className="absolute inset-0 bg-blue-800"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      ></div>
      
      {/* City skyline silhouette - translates slower */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/kampala-skyline.jpg')",
          backgroundSize: "cover",
          transform: `translateY(${scrollY * 0.2}px)`,
          opacity: 0.7
        }}
      ></div>
      
      {/* Content container */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div 
            className="bg-black/50 p-8 md:p-12 lg:max-w-3xl backdrop-blur-sm rounded-lg transform transition-all duration-500 hover:scale-[1.02]"
            style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 mb-6 rounded-sm">
              <span className="text-sm text-white uppercase tracking-wider font-bold">
                September 15-16, 2025 • Dubai, UAE
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 inline-block">
                MIDDLE EAST
              </div>
              <span className="mx-2 text-white">•</span>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 inline-block">
                EAST AFRICA
              </div>
              <div className="text-white mt-2">INVESTMENT SUMMIT</div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-8 font-light">
              Catalyzing $100+ billion in strategic partnerships across energy, agriculture, technology, and infrastructure
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="/tickets" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-md shadow-lg transition-all duration-300"
              >
                Register Now
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-3 backdrop-blur-md bg-white/10 border border-white/30 text-white font-bold rounded-md hover:bg-white/20 transition-all duration-300"
              >
                Summit Overview
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

// 2. Animated Statistics Section with Magic UI warp background
const AnimatedStatsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { value: "$100B+", label: "Investment Volume", description: "Gulf investments in Africa over the past decade", color: "bg-blue-600" },
    { value: "$59.4B", label: "UAE Investment", description: "Making UAE Africa's fourth-largest investor globally", color: "bg-yellow-500" },
    { value: "300M+", label: "Regional Market", description: "Access to East African Community and COMESA markets", color: "bg-purple-600" },
    { value: "48%", label: "Growth Rate", description: "MENA cryptocurrency market year-on-year increase", color: "bg-green-600" }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Magic UI Warp Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <svg width="100%" height="100%">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="url(#gradient)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-4">
            LANDMARK PARTNERSHIP
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            The Economic Powerhouse Hidden in Plain Sight
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative bg-black/30 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden border border-gray-800 transform transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                transitionDelay: `${index * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.8s ease, transform 0.8s ease"
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, transparent, ${stat.color}, transparent)` }}></div>
              <div className="p-8">
                <div className="text-4xl md:text-5xl font-bold mb-3 text-white">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
                  {stat.label}
                </div>
                <div className="text-gray-300">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Scrolling Partners Carousel with Gradient Background
const PartnersCarousel = () => {
  const logoContainerRef = useRef(null);
  
  // Create 12 logo placeholders
  const logos = Array(12).fill('/images/logo-darkmode.svg');

  return (
    <section className="py-10 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(90deg, #004aad 0%, #cb6ce6 100%)"
        }}
      ></div>
      
      <div className="max-w-full mx-auto px-4 relative">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">
            Supported by Global Partners
          </h3>
        </div>
        
        <div ref={logoContainerRef} className="relative overflow-hidden py-4">
          <div className="flex logos-slide animate-scroll-x">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div key={`logo-1-${index}`} className="flex-shrink-0 mx-8">
                <div className="w-40 h-20 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={60}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {logos.map((logo, index) => (
              <div key={`logo-2-${index}`} className="flex-shrink-0 mx-8">
                <div className="w-40 h-20 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={60}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-x {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

// 4. Strategic Sectors with Hexagonal Grid - Completely redesigned with images
const StrategicSectorsGrid = () => {
  const sectors = [
    {
      title: "Energy Transformation",
      description: "Renewable projects with $7B investment by ACWA Power and 10 GW green energy capacity by Masdar",
      image: "/images/east-africa-map.jpg"
    },
    {
      title: "Agricultural Security",
      description: "Strategic investments addressing food security for Gulf nations that import 80-90% of their food",
      image: "/images/natural-resources.jpg"
    },
    {
      title: "Infrastructure Projects",
      description: "Port development with $1.72B DP World investment creating logistics networks across East Africa",
      image: "/images/economic-powerhouse.jpeg"
    },
    {
      title: "Financial Integration",
      description: "Cross-regional frameworks with Gulf banks establishing East African operations and $1B fund of funds",
      image: "/images/uganda-landscape.jpg"
    },
    {
      title: "Digital Economy",
      description: "Technology partnerships with UAE and Ethiopia developing data centers up to 1,000 megawatts",
      image: "/images/kampala-skyline.jpg"
    },
    {
      title: "Smart City Initiatives",
      description: "Urban innovation with Rwandan partnerships leveraging Dubai's experience in smart implementation",
      image: "/images/banner-1.svg"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            STRATEGIC COLLABORATION
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sectors Driving Regional Integration
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            High-impact investment areas creating sustainable economic partnerships between the Middle East and East Africa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {sectors.map((sector, index) => (
            <div 
              key={index} 
              className="group overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl relative"
            >
              <div className="h-48 overflow-hidden">
                <Image 
                  src={sector.image}
                  alt={sector.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transform transition-all duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                  {sector.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            href="/sectors" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-none shadow-xl"
          >
            Explore All Sectors
          </Button>
        </div>
      </div>
    </section>
  );
};

// 5. Blockchain and Crypto Section (Dedicated as requested)
const BlockchainSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Blockchain-inspired animated background */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="blockchain-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#blockchain-grid)" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-blue-900 text-blue-200 text-sm font-semibold mb-4">
              DIGITAL FINANCE INNOVATION
            </span>
            <h2 className="text-4xl font-bold text-white mb-6">
              Blockchain & Digital Finance Revolution
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-xl">
                The Middle East has emerged as a global blockchain innovation hub, with the UAE and neighboring countries becoming preferred destinations for crypto companies seeking regulatory clarity and institutional support.
              </p>
              <p className="text-xl">
                In 2025, Circle (USDC issuer) received official approval from the UAE's financial regulators, while Dubai's International Financial Centre recognized USDC and EURC as the first approved stablecoins in the region.
              </p>
              <p className="text-xl">
                Beyond cryptocurrencies, the region is pioneering real-world applications in cross-border payments, supply chain verification, digital identity, and asset tokenization that connect businesses across Middle East and East African markets.
              </p>
            </div>
            
            <div className="mt-10">
              <Button 
                variant="primary" 
                href="/blockchain" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-none shadow-xl"
              >
                Digital Finance Agenda
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Blockchain visualization element */}
            <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 p-1 rounded-xl shadow-2xl">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-4">
                  Regional Blockchain Innovations
                </h3>
                
                <div className="space-y-6">
                  {[
                    "UAE ranks 3rd globally in crypto adoption with comprehensive regulatory frameworks",
                    "Circle's USDC receives regulatory approval from Abu Dhabi Global Market (ADGM)",
                    "Dubai International Financial Centre (DIFC) recognizes stablecoins for institutional use",
                    "Cross-border payment corridors linking Gulf states with East African markets",
                    "Blockchain-powered trade finance solutions reducing settlement time by 80%"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-gray-300">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 rounded-lg bg-blue-900 bg-opacity-50">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h4 className="text-lg font-bold text-white">UAE Stablecoin Initiative</h4>
                  </div>
                  <p className="mt-2 text-gray-300">
                    ADQ, First Abu Dhabi Bank, and IHC have partnered to launch a UAE dirham-backed stablecoin to enhance digital payment infrastructure
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. Investment Landscape Interactive Cards
const InvestmentLandscapeSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  
  const investmentData = [
    {
      title: "Sovereign Wealth Funds",
      amount: "$2.4 Trillion+",
      description: "Combined assets of ADIA ($993B), PIF ($925B), and QIA ($475-500B) with increasing allocations to East African markets",
      color: "from-blue-600 to-blue-800"
    },
    {
      title: "Private Equity & VC",
      amount: "$7.58 Billion",
      description: "MENA deal value in first half of 2023, targeting financial services, technology, healthcare, agriculture, and renewable energy",
      color: "from-purple-600 to-purple-800"
    },
    {
      title: "UAE Foreign Direct Investment",
      amount: "$110 Billion",
      description: "UAE's commitment to projects between 2019 and 2023, including $72 billion in renewable energy development",
      color: "from-green-600 to-green-800"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold mb-4">
            CAPITAL FLOWS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Landscape
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Major financial institutions driving economic integration between the Middle East and East Africa
          </p>
        </div>
        
        <div className="relative">
          {/* Card navigation tabs */}
          <div className="flex justify-center mb-8 relative z-10">
            {investmentData.map((item, index) => (
              <button
                key={index}
                className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all duration-300 ${
                  activeCard === index 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                }`}
                onClick={() => setActiveCard(index)}
              >
                {item.title}
              </button>
            ))}
          </div>
          
          {/* Card display area */}
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden p-0.5">
            <div className={`absolute inset-0 bg-gradient-to-r ${investmentData[activeCard].color} opacity-30 rounded-lg`}></div>
            
            <div className="relative p-8 md:p-12 bg-white dark:bg-gray-900 rounded-lg m-0.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${investmentData[activeCard].color}`}>
                    {investmentData[activeCard].amount}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {investmentData[activeCard].description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {item === 1 ? '84%' : item === 2 ? '57%' : item === 3 ? '32%' : '91%'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item === 1 ? 'Sustainable Finance' : item === 2 ? 'Technology Ventures' : item === 3 ? 'Infrastructure Projects' : 'Long-term Growth'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="primary" 
            href="/investment" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black border-none shadow-xl"
          >
            Investment Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

// 7. Banner Section from original (kept as requested)
const BannerSection = () => (
  <section className="w-full border-b border-gray-200 dark:border-gray-700">
    <div
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #004aad 0%, #cb6ce6 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/events/uganda-s-journey-to-the-digital-age">
          <Image
            src="/images/banner-1.svg"
            alt="Banner"
            width={1200}
            height={300}
            className="w-full h-auto block"
          />
        </Link>
      </div>
    </div>
  </section>
);

// 8. Global Significance 3D Cards
const GlobalSignificanceSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            GLOBAL IMPACT
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Strategic Global Significance
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Middle East-East Africa partnerships are reshaping global trade routes and geopolitical dynamics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Maritime Infrastructure",
              description: "UAE-based DP World's investments in East African ports enhancing connectivity along critical global shipping lanes",
              image: "/images/east-africa-map.jpg",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              ),
              stat: "30%",
              statLabel: "Red Sea shipping volume reduction during 2023-2024 security challenges"
            },
            {
              title: "Geopolitical Influence",
              description: "Gulf states established as pivotal actors in a region traditionally influenced by Western powers and China",
              image: "/images/economic-powerhouse.jpeg",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ),
              stat: "8",
              statLabel: "Countries in the Council of Arab and African States Bordering the Red Sea"
            },
            {
              title: "Alternative Frameworks",
              description: "Emerging alternative to China's Belt and Road Initiative with different investment approaches and equity stakes",
              image: "/images/natural-resources.jpg",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              ),
              stat: "G20",
              statLabel: "Saudi Arabia supporting AU's successful bid"
            }
          ].map((card, index) => (
            <div 
              key={index} 
              className="group relative transform transition-all duration-500 perspective hover:scale-[1.01]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform -rotate-6 rounded-xl opacity-20 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-0"></div>
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-500 group-hover:shadow-2xl">
                <div className="h-48 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-all duration-700 scale-100 group-hover:scale-110"
                    style={{ backgroundImage: `url(${card.image})` }}
                  ></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mr-3">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {card.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {card.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mr-3">
                        {card.stat}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {card.statLabel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. Reimagined Events Grid Section (kept but styled differently)
const EventsGridSection = ({ events }: { events: Event[] }) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            PROGRAM HIGHLIGHTS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Summit Agenda
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Key events during the MEA Summit 2025
          </p>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/events"
          className="mt-4 md:mt-0"
        >
          Full Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center">
                  <span className="text-gray-400">Event Image</span>
                  <div className="absolute top-0 left-0 p-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 text-xs uppercase tracking-wider text-white rounded-full">
                      Day {index + 1}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white text-lg">
                    {
                      [
                        "Ministerial Opening",
                        "Investment Roundtables",
                        "Sovereign Fund Forum",
                        "Sector-Specific Panels",
                        "Technology Showcase",
                        "Structured Networking",
                        "Bilateral Meetings",
                        "Investment Commitments",
                      ][index]
                    }
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>September {15 + index}, 2025</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Dubai International Convention Centre</span>
                  </div>
                </div>
              </div>
            ))
          : events.slice(0, 8).map((event) => (
              <Link
                href={`/events/${event.Slug}`}
                key={event.id}
                className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative">
                  {event.Image ? (
                    <Image
                      src={getImageUrl(event.Image.url)}
                      alt={event.Image.alternativeText || event.Title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">MEA 2025</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 p-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 text-xs uppercase tracking-wider text-white rounded-full">
                      {event.Enumeration}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-white text-lg group-hover:text-blue-600 transition-colors">
                    {event.Title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(event.StartDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="h-4 w-4 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{event.Location}</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  </section>
);

// 10. Featured Speakers Section (kept but styled differently)
const FeaturedSpeakersSection = ({
  speakers,
  loading,
}: {
  speakers: Speaker[];
  loading: boolean;
}) => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold mb-4">
            GLOBAL LEADERS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Distinguished Speakers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with decision makers shaping Middle East-East Africa partnerships
          </p>
        </div>
        <Button
          variant="primary"
          buttonType="outline"
          href="/speakers"
          className="mt-4 md:mt-0"
        >
          View All Speakers
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 animate-pulse h-80 rounded-xl shadow-lg overflow-hidden"
            ></div>
          ))}
        </div>
      ) : speakers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Speaker announcements coming soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {speakers.map((speaker) => (
            <Link
              href={`/speakers/${speaker.Slug}`}
              key={speaker.id}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-square w-full bg-gray-100 dark:bg-gray-700 relative">
                  {speaker.ProfileImage ? (
                    <Image
                      src={getImageUrl(speaker.ProfileImage.url)}
                      alt={speaker.Name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 text-4xl font-bold">
                        {speaker.Name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {speaker.Organization && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1 px-3">
                      <div className="text-xs uppercase tracking-wider truncate">
                        {speaker.Organization}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-white">
                    {speaker.Name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {speaker.Title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </section>
);

// 11. Sponsors Grid Section (kept but styled differently)
const SponsorsGridSection = ({ sponsors }: { sponsors: Sponsor[] }) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-800">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
          STRATEGIC PARTNERS
        </span>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          MEA Summit 2025 Partners
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Leading organizations supporting Middle East-East Africa economic integration
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {sponsors.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="group p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center"
              >
                <div className="h-24 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">
                    Partner Logo
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold text-gray-900 dark:text-white">
                    Partner Name
                  </div>
                  <div className="mt-1">
                    <Chip
                      variant="primary"
                      size="sm"
                    >
                      Partner Tier
                    </Chip>
                  </div>
                </div>
              </div>
            ))
          : sponsors.slice(0, 8).map((sponsor) => (
              <div
                key={sponsor.id}
                className="group p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center"
              >
                <div className="h-24 w-full flex items-center justify-center">
                  {sponsor.Logo ? (
                    <Image
                      src={getImageUrl(sponsor.Logo.url)}
                      alt={sponsor.Name}
                      width={240}
                      height={96}
                      className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700 h-full w-full rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        {sponsor.Name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold text-gray-900 dark:text-white mb-2">
                    {sponsor.Name}
                  </div>
                  <div>
                    <Chip
                      variant={
                        sponsor.Tier === "Platinum"
                          ? "primary"
                          : sponsor.Tier === "Gold"
                          ? "secondary"
                          : "accent"
                      }
                      size="sm"
                      className={
                        sponsor.Tier === "Platinum"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : sponsor.Tier === "Gold"
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                          : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                      }
                    >
                      {sponsor.Tier} Partner
                    </Chip>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="mt-12 text-center">
        <Button 
          variant="primary" 
          buttonType="outline" 
          href="/sponsors"
        >
          View All Partners
        </Button>
      </div>
    </div>
  </section>
);

// 12. Immersive CTA Section with animated gradient background
const ImmersiveCTASection = () => (
  <section className="relative py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/uganda-landscape.jpg')" }}
    ></div>
    
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black opacity-70"></div>
    
    {/* Animated gradient background */}
    <div className="absolute inset-0 animate-gradient-bg opacity-80"></div>
    
    <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <span className="inline-block px-4 py-1 rounded-full bg-blue-500/80 backdrop-filter backdrop-blur-sm text-white text-sm font-semibold mb-6">
        JOIN THE FUTURE
      </span>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        Shape the Strategic Integration Roadmap
      </h2>
      
      <p className="text-xl text-gray-100 mb-10 max-w-3xl mx-auto">
        MEA Summit 2025 is implementing a phased integration framework to address structural, political, and institutional barriers to deeper Middle East-East Africa economic partnership.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="/tickets" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-md shadow-lg transition-all duration-300"
        >
          Register for MEA Summit
        </a>
        
        <a
          href="/contact"
          className="inline-block px-8 py-3 backdrop-blur-md bg-white/20 border border-white/30 text-white font-bold rounded-md hover:bg-white/30 transition-all duration-300"
        >
          Contact Organizers
        </a>
      </div>
    </div>
    
    <style jsx global>{`
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      
      .animate-gradient-bg {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 10s ease infinite;
      }
    `}</style>
  </section>
);

// 13. Modern Contact Form
const ModernContactForm = () => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Contact Us
          </h2>
          
          <div className="space-y-8 mt-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-6 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Email
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  General Inquiries: info@measummit.org
                  <br />
                  Participation: delegates@measummit.org
                  <br />
                  Media Inquiries: media@measummit.org
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-6 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Phone
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dubai Office: +971 4 123 4567
                  <br />
                  Nairobi Office: +254 20 987 6543
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mr-6 shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Address
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  MEA Summit Secretariat
                  <br />
                  Dubai International Financial Centre
                  <br />
                  Level 14, Gate Building
                  <br />
                  Dubai, United Arab Emirates
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex space-x-4">
            {[
              { name: "linkedin", icon: (
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              ) },
              { name: "twitter", icon: (
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              ) },
              { name: "facebook", icon: (
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              ) },
              { name: "instagram", icon: (
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.014-4.849-.072-3.26-.149-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              ) }
            ].map((social) => (
              <a 
                key={social.name} 
                href={`#${social.name}`}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transition-transform hover:scale-110"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl shadow-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Organization Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Inquiry Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>General Inquiry</option>
                    <option>Participation Information</option>
                    <option>Speaking Opportunity</option>
                    <option>Partnership</option>
                    <option>Media & Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-none shadow-xl py-3"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 14. Newsletter Section
const NewsletterSection = () => (
  <section className="relative py-12 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
    
    {/* Decorative circles */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-300 opacity-10 blur-3xl"></div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <h2 className="text-3xl font-bold mb-2 text-white">
            Stay Updated on MEA Summit 2025
          </h2>
          <p className="text-white text-opacity-80">
            Subscribe to receive policy briefings, investment insights, and program announcements
          </p>
        </div>
        <div className="md:col-span-4">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow px-4 py-3 rounded-l-lg bg-white/20 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 text-white dark:text-white placeholder-gray-700 dark:placeholder-white dark:placeholder-opacity-60 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40"
            />
            <Button 
              variant="primary"
              className="rounded-r-lg bg-white text-blue-600 hover:bg-gray-100 border-none shadow-xl"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// -------------------------------------------------------------------
// Main HomePage Component
// -------------------------------------------------------------------

export default function HomePage() {
  // State for API data
  const [events, setEvents] = useState<Event[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState({
    events: true,
    speakers: true,
    sponsors: true,
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchAPI(
          "/events?populate=*&sort=StartDate:asc&pagination[limit]=8"
        );
        if (response && response.data) {
          setEvents(response.data);
        }
        setLoading((prev) => ({ ...prev, events: false }));
      } catch (err) {
        console.error("Error fetching events:", err);
        setLoading((prev) => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  // Fetch featured speakers
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetchAPI(
          "/speakers?filters[Featured][$eq]=true&populate=*&pagination[limit]=8"
        );
        if (response && response.data) {
          setSpeakers(response.data);
        }
        setLoading((prev) => ({ ...prev, speakers: false }));
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setLoading((prev) => ({ ...prev, speakers: false }));
      }
    };
    fetchSpeakers();
  }, []);

  // Fetch sponsors
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        if (response && response.data) {
          setSponsors(response.data);
        }
        setLoading((prev) => ({ ...prev, sponsors: false }));
      } catch (err) {
        console.error("Error fetching sponsors:", err);
        setLoading((prev) => ({ ...prev, sponsors: false }));
      }
    };
    fetchSponsors();
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Completely new layout and sections */}
      <DynamicHeroSection />
      <AnimatedStatsSection />
      <PartnersCarousel />
      <StrategicSectorsGrid />
      <FeaturedSpeakersSection speakers={speakers} loading={loading.speakers} />
      <BannerSection />
      <BlockchainSection />
      <InvestmentLandscapeSection />
      <EventsGridSection events={events} />
      <GlobalSignificanceSection />
      <ImmersiveCTASection />
      <SponsorsGridSection sponsors={sponsors} />
      <ModernContactForm />
      <NewsletterSection />
    </main>
  );
}