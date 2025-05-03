"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { RetroGrid } from "@/components/ui/retro-grid";
import { BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { fetchAPI } from "@/lib/api/api-config";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-gray-900">
      <HeroSection />
      <WhyAttendSection />
      <AboutSummitSection />
      <ThematicAreasSection />
      <BlockchainSection />
      <OrganizersSection />
      <TimelineSection />
      <CTASection />
    </main>
  );
}

// -------------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------------
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Animation on mount
    setIsVisible(true);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[90vh] md:h-[85vh] overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-purple-900 dark:from-blue-900 dark:via-blue-800 dark:to-purple-950"
        style={{ 
          opacity: 1 - scrollY / 1000,
        }}
      />
      
      {/* Animated pattern overlay */}
      <RetroGrid 
        angle={60}
        cellSize={80}
        opacity={0.15}
        lightLineColor="white" 
        darkLineColor="white"
        className="z-0"
      />
      
      {/* African landscape silhouette */}
      <div 
        className="absolute bottom-0 w-full h-[20vh] bg-[url('/images/africa-silhouette.png')] bg-bottom bg-contain bg-repeat-x opacity-40 dark:opacity-30"
        style={{ 
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <div 
          className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-blue-500 blur-[100px] dark:bg-blue-600 opacity-30 animate-pulse"
          style={{ 
            animationDuration: '7s',
            transform: `translateY(${Math.sin(Date.now() / 2000) * 20}px)`,
          }}
        />
        <div 
          className="absolute bottom-[30%] right-[15%] w-72 h-72 rounded-full bg-purple-500 blur-[120px] dark:bg-purple-700 opacity-20 animate-pulse"
          style={{ 
            animationDuration: '10s',
            transform: `translateY(${Math.sin(Date.now() / 3000) * 30}px)`,
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Text content */}
            <div 
              className={`max-w-2xl transition-all duration-1000 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-yellow-300 px-3 py-1 rounded-full text-black mb-6 shadow-lg">
                <span className="text-sm font-bold tracking-wide">JUNE 25-27, 2025 • KAMPALA, UGANDA</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-md">
                <span className="relative">
                  <span className="absolute -inset-1 blur-md bg-yellow-400 opacity-30 rounded-lg"></span>
                  <span className="relative">About</span>
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 text-transparent bg-clip-text">
                  MEA Summit
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-xl shadow-text">
                The Middle East and Africa Investment Summit brings together 
                <span className="relative text-yellow-200 mx-1 font-semibold">
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400/50 rounded-full"></span>
                  visionary leaders
                </span> 
                to reshape industries, drive inclusion, and spark innovation across the MEA region.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  href="/about/mission-vision"
                  className="relative overflow-hidden group transition-all duration-300 bg-gradient-to-r from-yellow-500 to-amber-500 border-none hover:from-yellow-400 hover:to-amber-400 shadow-lg hover:shadow-xl"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                  <span className="relative z-10">Our Mission</span>
                </Button>
                
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/about/organizers"
                  className="relative overflow-hidden group bg-transparent border-2 border-white/70 text-white hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                  <span className="relative z-10">Meet the Organizers</span>
                </Button>
              </div>
            </div>
            
            {/* Right side - Decorative element */}
            <div 
              className={`hidden lg:block w-96 h-96 transition-all duration-1000 delay-300 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                {/* Circular rotating border */}
                <div className="absolute inset-0 rounded-full border-4 border-yellow-300/30 animate-spin-slow"></div>
                
                {/* MEA Symbol */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-800/80 to-purple-900/80 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/10">
                  <div className="text-center p-4">
                    <div className="mb-3 flex justify-center">
                      <Image 
                        src="/mea-icon.svg" 
                        alt="MEA Summit Icon" 
                        width={80} 
                        height={80}
                        className="animate-pulse"
                        style={{ animationDuration: '3s' }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">MEA Summit</h3>
                    <p className="text-yellow-300 font-medium">2025</p>
                    
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex justify-center space-x-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">50+</div>
                          <div className="text-xs text-white/70">Countries</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">300+</div>
                          <div className="text-xs text-white/70">Speakers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-white">5K+</div>
                          <div className="text-xs text-white/70">Attendees</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Orbiting circles */}
                <div className="absolute w-full h-full animate-reverse-spin">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                </div>
                <div className="absolute w-full h-full animate-reverse-spin-slow">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                </div>
                <div className="absolute w-full h-full animate-spin-med">
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 animate-bounce-slow cursor-pointer"
        onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
      >
        <span className="text-sm mb-2 font-medium">Scroll to explore</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Why Attend Section
// -------------------------------------------------------------------
function WhyAttendSection() {
  const bentoItems = [
    {
      title: "DeFi & Blockchain",
      description: "Explore the revolutionary potential of decentralized finance across MEA. Connect with leading blockchain innovators, DeFi platforms, and digital currency pioneers shaping the future of finance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
      tags: ["Innovation", "Finance", "Technology"],
      cta: "Learn more",
      href: "/events/crypto-event-1",
      onClick: () => window.location.href = "/events/crypto-event-1",
      colSpan: 2,
      bgColor: "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
      hasPersistentHover: true,
    },
    {
      title: "Connect",
      description: "Meet the people powering MEA's digital future. Network with Heads of State, CEOs, investors, and youth changemakers—all in one place.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.479m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
      status: "High Value",
      tags: ["Networking", "Leaders"],
      cta: "See who's attending",
      href: "/speakers",
      onClick: () => window.location.href = "/speakers",
      bgColor: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)",
    },
    {
      title: "Learn",
      description: "Gain practical insights from digital pioneers, policymakers, and innovators. Master strategies driving financial inclusion, digital trade, and socio-economic impact in MEA.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      tags: ["Insights", "Knowledge"],
      cta: "Explore sessions",
      href: "/events",
      onClick: () => window.location.href = "/events",
      bgColor: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(252, 211, 77, 0.05) 100%)",
    },
    {
      title: "Build",
      description: "Turn ideas into action. Collaborate, co-create, and build scalable digital solutions that transform lives and economies.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
        </svg>
      ),
      status: "Featured",
      tags: ["Innovation", "Collaboration"],
      cta: "Join workshops",
      href: "/events?filter=workshop",
      onClick: () => window.location.href = "/events?filter=workshop",
      bgColor: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
      colSpan: 2,
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Why Attend <AnimatedGradientText className="font-bold" colorFrom="#ffaa40" colorTo="#9c40ff">MEA Summit</AnimatedGradientText>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us for a transformative experience that will reshape your perspective on digital innovation and economic growth in the Middle East and Africa.
          </p>
        </div>

        <BentoGrid items={bentoItems} />
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// About Summit Section
// -------------------------------------------------------------------
function AboutSummitSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-yellow-500 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-blue-500 blur-[100px]" />
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            <AnimatedGradientText 
              colorFrom="#3b82f6" 
              colorTo="#8b5cf6"
              speed={0.8}
              className="font-bold"
            >
              MEA Summit
            </AnimatedGradientText>
            : Bridging Two Dynamic Regions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto mt-2 mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left side content - Map visualization */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden h-full bg-gradient-to-br from-blue-900 to-indigo-900 p-1">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
              
              <div className="relative rounded-xl overflow-hidden p-6 h-full bg-gradient-to-br from-blue-900 to-indigo-900">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
                    JUNE 25-27, 2025
                  </span>
                  <h3 className="text-xl font-bold text-white mb-6">Key Summit Features</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start space-x-4 group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                        01
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover:text-yellow-300 transition-colors">High-level Dialogues</h4>
                        <p className="text-blue-100 text-sm">Engaging discussions with Heads of State and key policymakers</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                        02
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover:text-blue-300 transition-colors">Expert Panels</h4>
                        <p className="text-blue-100 text-sm">In-depth discussions on digital transformation across sectors</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 text-black font-bold transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                        03
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover:text-purple-300 transition-colors">Youth Innovation</h4>
                        <p className="text-blue-100 text-sm">Showcasing the next generation of African and Middle Eastern talent</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                        04
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1 group-hover:text-green-300 transition-colors">Cultural Celebration</h4>
                        <p className="text-blue-100 text-sm">Networking gala highlighting the rich cultural heritage of MEA</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glowing accent */}
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-yellow-500 rounded-full blur-[60px] opacity-60"></div>
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-40"></div>
              </div>
            </div>
          </div>
          
          {/* Right side content - Text */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="space-y-6 relative">
              <div className="relative">
                <span className="inline-block h-1 w-16 bg-blue-600 mb-4"></span>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white flex flex-col sm:flex-row gap-2 sm:items-center">
                  <span>Bridging</span> 
                  <div className="relative inline-flex">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Two Dynamic Regions
                    </span>
                    <span className="absolute bottom-0 left-0 right-0 h-3 bg-blue-100 dark:bg-blue-900 opacity-30 -z-10 transform -skew-x-3"></span>
                  </div>
                </h3>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative group">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  The Middle East and Africa (MEA) Investment Summit is a premier platform designed to catalyze investment, foster partnerships, and drive sustainable growth across these two dynamic regions.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative group">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Hosted in <span className="font-medium text-blue-600 dark:text-blue-400">Kampala, Uganda</span>, the summit brings together Heads of State, Ministers, CEOs, investors, and youth changemakers to explore opportunities in digital transformation, financial inclusion, and cross-border integration.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative group">
                  <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Through high-level dialogues, panel discussions, and networking sessions, the summit aims to unlock the immense potential of collaboration between the Middle East and Africa, driving economic prosperity and fostering innovation.
                </p>

                <div className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-lg backdrop-blur-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                  Explore Summit Agenda
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">300+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Speakers</div>
                </div>
                <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Attendees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Thematic Areas Section
// -------------------------------------------------------------------
function ThematicAreasSection() {
  const investmentAreas = [
    {
      id: "digital",
      title: "Digital Transformation",
      description: "The Middle East and Africa's digital economy is projected to reach $780 billion by 2030. Governments across the region are implementing ambitious national digital strategies, with the UAE's Digital Economy Strategy aiming to double digital economy contribution to GDP within 10 years.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      ),
      gradientFrom: "#FF8FB1",
      gradientTo: "#B06AB3",
      features: [
        "Engage with Saudi Arabia's $6.4B investment in future technologies as part of Vision 2030",
        "Connect with leaders implementing Rwanda's Digital Rwanda 2030 and Smart Rwanda initiatives",
        "Explore Egypt's booming tech sector with $500M+ in startup funding raised in 2023",
        "Discover public-private partnerships driving e-government innovation in the UAE and Kenya"
      ]
    },
    {
      id: "fintech",
      title: "FinTech & Financial Inclusion",
      description: "Africa's mobile money transaction value exceeded $700 billion in 2023, while fintech funding in MENA grew by 32% to reach $2.3 billion. Key growth drivers include digital payments, Islamic fintech (projected to reach $128B by 2025), and cross-border remittance innovations reducing costs from 9% to under 3%.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      gradientFrom: "#4D8AFF",
      gradientTo: "#76AEFB",
      features: [
        "Meet executives from M-Pesa, which processed $200B in transactions and serves over 50M users across Africa",
        "Network with regulators pioneering sandbox frameworks in UAE, Bahrain, and Nigeria",
        "Explore partnerships with the 57 operational digital banks targeting unbanked populations",
        "Learn from Egypt's Fawry and Paymob, leading regional payment solutions providers serving 40M+ customers"
      ]
    },
    {
      id: "blockchain",
      title: "DeFi & Blockchain",
      description: "Blockchain adoption in MEA is accelerating, with the UAE establishing the Dubai Blockchain Strategy and emerging as a global crypto hub with over $980M in crypto investments in 2023. Countries like Nigeria, Kenya, and South Africa rank in the top 20 globally for crypto adoption, with Nigeria having the highest proportion of retail users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      gradientFrom: "#9D50BB",
      gradientTo: "#6E48AA",
      features: [
        "Connect with regulators from VARA (Virtual Assets Regulatory Authority) and the Nigeria SEC's blockchain working group",
        "Explore opportunities with CBDC projects (e-Naira, e-Pound) and UAE's m-CBDC Bridge initiative",
        "Meet founders from the 300+ operational blockchain companies in the Dubai Multi Commodities Centre",
        "Engage with developers creating blockchain solutions for SME trade financing, reducing loan approval times by 75%"
      ]
    },
    {
      id: "sustainable",
      title: "Sustainable Infrastructure",
      description: "The MEA region requires $2.9 trillion in sustainable infrastructure investment by 2030. Projects like Saudi's $500B NEOM and UAE's Masdar City are setting global standards for smart, sustainable urban development. Renewable energy capacity in Africa is set to grow by 112% by 2030, with $30B allocated to green infrastructure in Egypt's national plan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      gradientFrom: "#6EC3F4",
      gradientTo: "#3A8DDE",
      features: [
        "Meet with representatives from Morocco's Noor Solar Power Plant, Africa's largest concentrated solar facility",
        "Explore investment opportunities in Kenya's geothermal sector, which provides 38% of the nation's electricity",
        "Connect with Gulf Cooperation Council green hydrogen initiatives projected to require $120B investment by 2030",
        "Discover Uganda's eco-tourism infrastructure development plan with $800M allocated for 2023-2027"
      ]
    },
    {
      id: "health",
      title: "Health Tech & Wellness",
      description: "Digital health in Africa is projected to reach $11B by 2025, with Nigeria, Egypt, and Kenya leading adoption. The Middle East health tech market is expanding at 12.8% CAGR, reaching $23B by 2028. Mobile health solutions are addressing physician shortages (0.2 doctors per 1,000 people in many African countries vs. the 2.5 WHO recommendation).",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      ),
      gradientFrom: "#F67B92",
      gradientTo: "#E65780",
      features: [
        "Connect with Babylon Health's AI-driven diagnostics platform that reached 2M consultations across Rwanda",
        "Explore partnerships with UAE's Department of Health, which launched 30+ AI health initiatives since 2021",
        "Meet founders from Ghana's mPharma, which manages 700+ pharmacies serving 2M+ patients monthly",
        "Engage with Egypt's Vezeeta, which connects 10M patients with 35,000 healthcare providers across MENA"
      ]
    },
    {
      id: "education",
      title: "EdTech & Skills Development",
      description: "Africa's edtech market is growing at 14.3% annually, projected to reach $3.2B by 2027. The Middle East education technology sector is expanding by 13.2% yearly, with Saudi Arabia's Vision 2030 earmarking $67B for education reform. Digital upskilling initiatives are critical in addressing the 230M jobs across MEA requiring digital skills by 2030.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      gradientFrom: "#F9B876",
      gradientTo: "#F8A15F",
      features: [
        "Network with Moringa School, which has trained 4,000+ software developers with 85% job placement rate",
        "Learn from Egypt's 'WE-Digital 101' initiative which has upskilled 200,000+ citizens in digital literacy",
        "Explore investment opportunities with MENA's micro-credentialing startups raising $150M+ in 2023",
        "Connect with representatives from Saudi's Digital Academy, which aims to graduate 20,000 tech specialists by 2025"
      ]
    },
  ];

  const [selectedArea, setSelectedArea] = useState(investmentAreas[0].id);

  return (
    <section className="py-24 relative overflow-hidden bg-gray-100 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black text-gray-800 dark:text-white">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-300 to-transparent dark:from-blue-500 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-300 to-transparent dark:from-purple-500 dark:to-transparent" />
      </div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            <span className="mr-2">Thematic</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-yellow-500 dark:to-pink-500">
              Investment Areas
            </span>
          </h2>
          <p className="text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
            The MEA Summit focuses on key investment areas that are driving economic growth and 
            innovation across the Middle East and Africa regions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Investment Area Tabs */}
          <div className="lg:w-1/3 flex flex-col space-y-3">
            {investmentAreas.map((area) => (
              <div
                key={area.id}
                className={`cursor-pointer transition-all duration-300 rounded-xl p-4 flex items-center relative overflow-hidden ${
                  selectedArea === area.id
                    ? 'bg-white shadow-md border border-gray-200 dark:bg-white/10 dark:border-white/20'
                    : 'bg-white/80 border border-gray-100 hover:bg-white hover:shadow-sm dark:bg-white/5 dark:border-transparent dark:hover:bg-white/8'
                }`}
                onClick={() => setSelectedArea(area.id)}
              >
                {/* Color bar */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1" 
                  style={{ background: `linear-gradient(to bottom, ${area.gradientFrom}, ${area.gradientTo})` }}
                />
                
                {/* Icon with gradient background */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${area.gradientFrom}, ${area.gradientTo})` }}
                >
                  <div className="text-white scale-75">{area.icon}</div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{area.title}</h3>
                  {selectedArea === area.id && (
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1 xl:block hidden">
                      View opportunities
                    </p>
                  )}
                </div>
                
                {/* Arrow indicator for selected item */}
                {selectedArea === area.id && (
                  <div className="absolute right-4 text-gray-600 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right Side - Featured Area Detail */}
          <div className="lg:w-2/3">
            {investmentAreas.map((area) => (
              <div 
                key={area.id}
                className={`transition-all duration-500 ${
                  selectedArea === area.id ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 h-full relative overflow-hidden shadow-md">
                  {/* Decorative circles */}
                  <div 
                    className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20" 
                    style={{ background: `linear-gradient(135deg, ${area.gradientFrom}, ${area.gradientTo})`, filter: 'blur(60px)' }}
                  />
                  <div 
                    className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full opacity-10" 
                    style={{ background: `linear-gradient(135deg, ${area.gradientTo}, ${area.gradientFrom})`, filter: 'blur(40px)' }}
                  />
                  
                  <div className="relative z-10">
                    {/* Area Icon (Large) */}
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${area.gradientFrom}, ${area.gradientTo})` }}
                    >
                      <div className="text-white scale-150">{area.icon}</div>
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                      <span className="mr-2">{area.title}</span>
                    </h2>
                    
                    <p className="text-gray-700 dark:text-white/80 text-lg mb-6 max-w-2xl">
                      {area.description}
                    </p>
                    
                    {/* Feature Bullets */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      {area.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="text-blue-600 dark:text-white/90 mr-3 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-gray-700 dark:text-white/70">{feature}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 mb-8">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">Market Highlights</div>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ background: `linear-gradient(135deg, ${area.gradientFrom}, ${area.gradientTo})` }}></div>
                          <span className="text-sm text-gray-700 dark:text-white/70">
                            {area.id === "digital" && "12.3% annual growth"}
                            {area.id === "fintech" && "32% increase in funding"}
                            {area.id === "blockchain" && "980M+ in investments"}
                            {area.id === "sustainable" && "$2.9T market by 2030"}
                            {area.id === "health" && "12.8% CAGR in MENA"}
                            {area.id === "education" && "14.3% YoY growth"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full mr-2" style={{ background: `linear-gradient(135deg, ${area.gradientFrom}, ${area.gradientTo})` }}></div>
                          <span className="text-sm text-gray-700 dark:text-white/70">
                            {area.id === "digital" && "16 national digital strategies"}
                            {area.id === "fintech" && "700B+ mobile money volume"}
                            {area.id === "blockchain" && "300+ blockchain companies"}
                            {area.id === "sustainable" && "112% renewable energy growth"}
                            {area.id === "health" && "11B+ market value by 2025"}
                            {area.id === "education" && "230M jobs requiring digital skills"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="inline-flex">
                      <a 
                        href="/tickets"
                        className="px-6 py-3 rounded-lg flex items-center transition-transform duration-300 hover:translate-y-[-2px] text-white shadow-md"
                        style={{ 
                          background: `linear-gradient(to right, ${area.gradientFrom}, ${area.gradientTo})`
                        }}
                      >
                        <span className="font-medium">
                          {area.id === "digital" && "Explore Digital Transformation"}
                          {area.id === "fintech" && "Discover FinTech Opportunities"}
                          {area.id === "blockchain" && "Dive into Blockchain & DeFi"}
                          {area.id === "sustainable" && "Invest in Sustainable Future"}
                          {area.id === "health" && "Transform Healthcare Together"}
                          {area.id === "education" && "Shape Educational Innovation"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Blockchain Section
// -------------------------------------------------------------------
function BlockchainSection() {
  // Define types based on the existing interfaces in the codebase
  interface Speaker {
    id: number;
    Name: string;
    Slug: string;
    Title: string;
    Organization: string;
    ShortBio: string;
    Bio?: string;
    Featured?: boolean;
    ProfileImage?: {
      id?: number;
      url: string;
      formats?: {
        thumbnail?: {
          url: string;
        };
      };
    };
    LinkedIn?: string;
    Twitter?: string;
    Website?: string;
    events?: Array<{
      id: number;
      Title: string;
      Slug: string;
    }>;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  }

  interface Event {
    id: number;
    Title: string;
    Slug: string;
    ShortDescription: string;
    StartDate?: string;
    EndDate?: string;
    Location?: string;
    RoomNumber?: string;
    Enumeration?: string;
    FeaturedEvent?: boolean;
    MaxAttendees?: number;
    Image?: {
      url: string;
      width?: number;
      height?: number;
      alternativeText?: string | null;
      formats?: {
        small?: {
          url: string;
        };
        medium?: {
          url: string;
        };
        thumbnail?: {
          url: string;
        };
      };
    };
    speakers?: Speaker[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  }

  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakerAndEvent = async () => {
      try {
        // Fetch speaker data
        const speakerResponse = await fetchAPI(
          `/speakers?filters[Slug][$eq]=joshua-samuel&populate=*`
        );
        
        // Fetch event data
        const eventResponse = await fetchAPI(
          `/events?filters[Slug][$eq]=crypto-event-1&populate=*`
        );
        
        if (speakerResponse?.data && speakerResponse.data.length > 0) {
          setSpeaker(speakerResponse.data[0]);
        }
        
        if (eventResponse?.data && eventResponse.data.length > 0) {
          setEvent(eventResponse.data[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
        setLoading(false);
      }
    };
    
    fetchSpeakerAndEvent();
  }, []);

  // Format date for display
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate description to 140 characters
  const truncateDescription = (text: string, maxLength: number = 140) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3
      }
    }
  };

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20"></div>
      </div>
      
      {/* Animated orbs - enhanced visibility and movement */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-purple-500/70 blur-3xl blockchain-blob-1"></div>
        <div className="absolute top-40 -left-20 w-[32rem] h-[32rem] rounded-full bg-blue-500/60 blur-3xl blockchain-blob-2"></div>
        <div className="absolute bottom-20 right-20 w-[36rem] h-[36rem] rounded-full bg-yellow-500/60 blur-3xl blockchain-blob-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <span className="px-3 text-sm font-medium text-blue-600 dark:text-blue-400">FEATURED TRACK</span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block">
            Blockchain & Digital Currencies
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring the transformative power of blockchain technology and digital currencies across the Middle East and Africa.
          </p>
        </div>

        {/* Main content - Uses Framer Motion for animations */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Featured Innovation Card - 5 columns */}
          <motion.div className="lg:col-span-5" variants={itemVariants}>
            <div className="h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-blue-500/10 transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <div className="flex mb-4 items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">MEA Blockchain Renaissance</h3>
                </div>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    The Middle East & Africa region is experiencing unprecedented blockchain adoption, with regulatory innovations and real-world implementations leading the way.
                  </p>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 mt-4"
                    variants={statsVariants}
                  >
                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200/50 dark:border-blue-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$980M+</p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">crypto investments in UAE (2023)</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200/50 dark:border-purple-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-purple-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">300+</p>
                      <p className="text-xs text-purple-700 dark:text-purple-300">blockchain companies in DMCC</p>
                    </div>
                    
                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200/50 dark:border-green-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">3</p>
                      <p className="text-xs text-green-700 dark:text-green-300">countries in top 20 for crypto adoption</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Event Card - 7 columns */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            {loading ? (
              <div className="h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : event ? (
              <div className="h-full group relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-600/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Event Image */}
                  <div className="relative lg:w-2/5 overflow-hidden">
                    {event.Image ? (
                      <div className="h-48 lg:h-full relative">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                          alt={event.Title}
                          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Event date badge */}
                        {event.StartDate && (
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                              <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1">
                                {new Date(event.StartDate).toLocaleString('default', { month: 'short' }).toUpperCase()}
                              </div>
                              <div className="text-center px-3 py-2">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                  {new Date(event.StartDate).getDate()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Category label */}
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md uppercase shadow-lg">
                            Crypto Event
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 lg:h-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 lg:p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.Title}</h3>
                    
                    {/* Date, Time and Location - Compact design */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {event.StartDate && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(event.StartDate)}</span>
                        </div>
                      )}
                      
                      {event.Location && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{event.Location}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Description - Truncated to 140 characters */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {truncateDescription(event.ShortDescription)}
                    </p>
                    
                    <div className="mt-auto">
                      {/* Featured Speaker - Compact design */}
                      {speaker && (
                        <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex-shrink-0 mr-3">
                                {speaker.ProfileImage ? (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${speaker.ProfileImage.url}`}
                                    alt={speaker.Name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-white font-bold">
                                      {speaker.Name ? speaker.Name.charAt(0) : "J"}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">{speaker.Name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{speaker.Title}</p>
                              </div>
                            </div>
                            
                            {/* Speaker social links - More compact */}
                            <div className="flex space-x-2">
                              {speaker.LinkedIn && (
                                <a href={speaker.LinkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                </a>
                              )}
                              {speaker.Twitter && (
                                <a href={speaker.Twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                  </svg>
                                </a>
                              )}
                              {speaker.Website && (
                                <a href={speaker.Website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                          
                          {/* Call to action - Floating at the bottom */}
                          <div className="mt-4">
                            <a
                              href={`/events/${event.Slug}`}
                              className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                              View Event Details
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 text-center flex flex-col justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">Event data unavailable</p>
              </div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Key Topics */}
        <motion.div 
          className="mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center px-4">Key Blockchain Topics</h3>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "CBDCs & Stablecoins",
                description: "Central Bank Digital Currencies and regulated stablecoins transforming monetary systems",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  </svg>
                ),
                gradientFrom: "from-blue-500",
                gradientTo: "to-blue-600",
                glowColor: "blue",
                shadowColor: "rgba(59, 130, 246, 0.3)"
              },
              {
                title: "Regulatory Frameworks",
                description: "Evolving legal structures enabling responsible innovation while protecting consumers",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                gradientFrom: "from-purple-500",
                gradientTo: "to-purple-600",
                glowColor: "purple",
                shadowColor: "rgba(139, 92, 246, 0.3)"
              },
              {
                title: "DeFi & Islamic Finance",
                description: "Bridging traditional Islamic finance principles with decentralized technologies",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradientFrom: "from-green-500",
                gradientTo: "to-green-600",
                glowColor: "green",
                shadowColor: "rgba(16, 185, 129, 0.3)"
              },
              {
                title: "Cross-Border Solutions",
                description: "Reducing remittance costs and unlocking efficient trade finance across the region",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                gradientFrom: "from-yellow-500",
                gradientTo: "to-yellow-600",
                glowColor: "yellow",
                shadowColor: "rgba(245, 158, 11, 0.3)"
              }
            ].map((topic, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="backdrop-blur-sm bg-white/70 dark:bg-gray-950/80 rounded-xl overflow-hidden shadow-md border border-gray-200/50 dark:border-gray-600 hover:shadow-lg hover:border-gray-300 dark:hover:border-blue-500/50 transition-all duration-300 group"
                style={{
                  boxShadow: `0 4px 16px ${topic.shadowColor}`
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} w-full`}>
                </div>
                <div className="p-5 dark:bg-gray-900/90">
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} text-white shadow-md mr-3 group-hover:scale-110 transition-transform duration-300`}>
                      {topic.icon}
                    </div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">{topic.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{topic.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Organizers Section
// -------------------------------------------------------------------
function OrganizersSection() {
  const organizers = [
    {
      name: "HiPipo",
      role: "Lead Organizer",
      description:
        "Driving digital innovation and financial inclusion across Africa.",
      logoPlaceholder: "HP",
    },
    {
      name: "COMESA Business Council",
      role: "Strategic Partner",
      description: "Representing private sector interests across the COMESA region.",
      logoPlaceholder: "CBC",
    },
    {
      name: "Ministry of ICT, Uganda",
      role: "Co-organizer",
      description: "Providing policy guidance and government partnership.",
      logoPlaceholder: "MICT",
    },
    {
      name: "Timepledge.org",
      role: "Strategic Partner",
      description: "Fostering financial inclusion and entrepreneurship globally.",
      logoPlaceholder: "TPG",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600"></span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Organizing Partners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            MEA Summit 2025 is a collaborative effort between government agencies, private sector organizations, and international partners from across the Middle East and Africa.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizers.map((org) => (
            <div
              key={org.name}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="h-32 flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-900">
                <span className="text-3xl font-bold text-white">
                  {org.logoPlaceholder}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {org.name}
                </h3>
                <div className="mb-3">
                  <Chip variant="primary" size="sm">
                    {org.role}
                  </Chip>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {org.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button
            variant="primary"
            buttonType="outline"
            href="/about/organizers"
          >
            Learn More About Our Partners
          </Button>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Timeline Section (Using Agenda from MEA Summit)
// -------------------------------------------------------------------
function TimelineSection() {
  const [activeDay, setActiveDay] = useState(0);
  
  // Timeline data for each day
  const days = [
    {
      date: "June 25, 2025",
      title: "Day 1",
      events: [
        {
          time: "9:00 AM - 11:00 AM",
          title: "Opening Ceremony",
          host: "Innocent Kawooya (CEO, HiPipo)",
          color: "blue" as const,
          participants: [
            "Welcome Remarks: Innocent Kawooya, CEO, HiPipo",
            "Welcome Address: CEO, COMESA Business Council",
            "Guest of Honour: Hon. Dr. Chris Baryomunsi, Minister of ICT",
            "Keynote Address: H.E. Invited Head of State"
          ]
        },
        {
          time: "11:30 AM - 1:00 PM",
          title: "Digital Policy For Inclusive Growth",
          host: "Regional ICT Expert (COMESA)",
          color: "purple" as const,
          participants: [
            "Minister of ICT",
            "Executive Director, National ICT Authority",
            "Director, COMESA Digital Transformation",
            "CEO, National Telecom Regulatory Authority"
          ]
        },
        {
          time: "2:00 PM - 3:30 PM",
          title: "Building Resilient Systems",
          host: "Regional SDG Integration Expert",
          color: "indigo" as const,
          participants: [
            "Ministry of Agriculture, Uganda",
            "Founder & CEO, AgriTech Startup, Kenya",
            "Director of Digital Health, WHO Africa",
            "VC, Makerere University"
          ]
        },
        {
          time: "4:00 PM - 5:30 PM",
          title: "Financial Inclusion for Communities",
          host: "FinTech and Financial Services Consultant",
          color: "pink" as const,
          participants: [
            "Deputy Governor, Central Bank",
            "CEO, Women-led FinTech, HiPipo",
            "Country Director, UNCDF Uganda",
            "Executive, MTN Mobile Money"
          ]
        }
      ]
    },
    {
      date: "June 26, 2025",
      title: "Day 2",
      events: [
        {
          time: "9:00 AM - 10:30 AM",
          title: "Smart Agriculture for Climate Resilience",
          host: "Innocent Kawooya (NIM)",
          color: "green" as const,
          participants: [
            "Prof. Lawrence Mugisha, Digital Farming Platform",
            "Director, Research Institute for Agriculture and Climate",
            "Regional Lead, IFAD Digital Initiatives",
            "Agronomist, East African Farmer Cooperative"
          ]
        },
        {
          time: "11:00 AM - 12:30 PM",
          title: "Reimagining Health Through Digital Transformation",
          host: "Global Digital Health Advisor, WHO",
          color: "teal" as const,
          participants: [
            "Director, National Telemedicine Initiative, Rwanda",
            "CTO, HealthTech Startup, My Doctor",
            "Dean, School of Public Health, University",
            "CEO, Africa Digital Health Network"
          ]
        }
      ]
    },
    {
      date: "June 27, 2025",
      title: "Day 3",
      events: [
        {
          time: "9:00 AM - 10:30 AM",
          title: "Heads of State High-Level Dialogue",
          host: "H.E Yoweri Kaguta Museveni",
          color: "amber" as const,
          participants: [
            "H.E. President of Uganda",
            "H.E. President of Zambia",
            "H.E. Prime Minister of UAE",
            "H.E. President of Rwanda"
          ]
        },
        {
          time: "7:00 PM Onwards",
          title: "Grand Music Gala & Youth Recognition Awards",
          host: "Innocent Kawooya (NIM)",
          color: "rose" as const,
          participants: [
            "Performances from MEA's Top Artists",
            "Youth Innovation Awards",
            "Cultural Showcase & Networking"
          ]
        }
      ]
    }
  ];

  // Color mapping for events
  const colorMap = {
    blue: {
      bg: "bg-blue-500",
      bgHover: "hover:bg-blue-600",
      text: "text-blue-600",
      border: "border-blue-500",
      light: "bg-blue-50",
      dark: "bg-blue-900/20",
      timeline: "from-blue-600 to-blue-400",
      darkTimeline: "from-blue-500 to-blue-300",
      dot: "bg-blue-600",
    },
    purple: {
      bg: "bg-purple-500",
      bgHover: "hover:bg-purple-600",
      text: "text-purple-600",
      border: "border-purple-500",
      light: "bg-purple-50",
      dark: "bg-purple-900/20",
      timeline: "from-purple-600 to-purple-400",
      darkTimeline: "from-purple-500 to-purple-300",
      dot: "bg-purple-600",
    },
    indigo: {
      bg: "bg-indigo-500",
      bgHover: "hover:bg-indigo-600",
      text: "text-indigo-600",
      border: "border-indigo-500",
      light: "bg-indigo-50",
      dark: "bg-indigo-900/20",
      timeline: "from-indigo-600 to-indigo-400",
      darkTimeline: "from-indigo-500 to-indigo-300",
      dot: "bg-indigo-600",
    },
    pink: {
      bg: "bg-pink-500",
      bgHover: "hover:bg-pink-600",
      text: "text-pink-600",
      border: "border-pink-500",
      light: "bg-pink-50",
      dark: "bg-pink-900/20",
      timeline: "from-pink-600 to-pink-400",
      darkTimeline: "from-pink-500 to-pink-300",
      dot: "bg-pink-600",
    },
    green: {
      bg: "bg-green-500",
      bgHover: "hover:bg-green-600",
      text: "text-green-600",
      border: "border-green-500",
      light: "bg-green-50",
      dark: "bg-green-900/20",
      timeline: "from-green-600 to-green-400",
      darkTimeline: "from-green-500 to-green-300",
      dot: "bg-green-600",
    },
    teal: {
      bg: "bg-teal-500",
      bgHover: "hover:bg-teal-600",
      text: "text-teal-600",
      border: "border-teal-500",
      light: "bg-teal-50",
      dark: "bg-teal-900/20",
      timeline: "from-teal-600 to-teal-400",
      darkTimeline: "from-teal-500 to-teal-300",
      dot: "bg-teal-600",
    },
    amber: {
      bg: "bg-amber-500",
      bgHover: "hover:bg-amber-600",
      text: "text-amber-600",
      border: "border-amber-500",
      light: "bg-amber-50",
      dark: "bg-amber-900/20",
      timeline: "from-amber-600 to-amber-400",
      darkTimeline: "from-amber-500 to-amber-300",
      dot: "bg-amber-600",
    },
    rose: {
      bg: "bg-rose-500",
      bgHover: "hover:bg-rose-600",
      text: "text-rose-600",
      border: "border-rose-500",
      light: "bg-rose-50",
      dark: "bg-rose-900/20",
      timeline: "from-rose-600 to-rose-400",
      darkTimeline: "from-rose-500 to-rose-300",
      dot: "bg-rose-600",
    }
  };

  // Define color type to match colorMap keys
  type ColorType = keyof typeof colorMap;

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,#88888820_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_bottom,#88888820_1px,transparent_1px)]"></div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-400 rounded-full opacity-[0.07] blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400 rounded-full opacity-[0.07] blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <span className="mx-3 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30">
              June 25-27, 2025
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-4">
            Summit Agenda
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three days of transformative discussions, knowledge sharing, and networking to drive 
            digital innovation and investment across MEA.
          </p>
        </div>

        {/* Day Selection Tabs */}
        <div className="relative z-10 mb-12">
          <div className="flex flex-wrap justify-center">
            <div className="bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-lg inline-flex">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    activeDay === index
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeDay === index && (
                    <motion.div
                      layoutId="activeDayIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="font-semibold">{day.title}:</span>
                    <span className={`text-xs sm:text-sm ${activeDay === index ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}>
                      {day.date}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-4xl mx-auto">
          {days.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`transition-all duration-500 ${
                activeDay === dayIndex ? "block" : "hidden"
              }`}
            >
              <div className="relative">
                {/* Timeline center line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800 ml-6 sm:ml-8 z-0"></div>

                {/* Timeline events */}
                <div className="space-y-12 relative z-10">
                  {day.events.map((event, eventIndex) => {
                    const color = colorMap[event.color as ColorType];

                    return (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: eventIndex * 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="relative pl-16 sm:pl-20"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 mt-1.5 w-[18px] h-[18px] rounded-full bg-white dark:bg-gray-900 border-[3px] border-blue-600 dark:border-blue-400 ml-[5px] sm:ml-[7px] shadow-md flex items-center justify-center">
                          <div className={`w-[6px] h-[6px] rounded-full ${color.dot} animate-pulse`}></div>
                        </div>

                        {/* Event card */}
                        <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                          {/* Colored top band */}
                          <div className={`h-1.5 w-full bg-gradient-to-r ${color.timeline} dark:${color.darkTimeline}`}></div>
                          
                          <div className="p-5">
                            {/* Time badge */}
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-300 mb-3 border border-blue-100 dark:border-blue-800/50">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                              </svg>
                              {event.time}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {event.title}
                            </h3>
                            
                            {/* Host */}
                            <div className="mb-4">
                              <div className={`inline-flex items-center px-3 py-1 rounded-md ${color.light} dark:${color.dark} ${color.text} dark:text-gray-900 text-sm`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1.5">
                                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                </svg>
                                Hosted by: {event.host}
                              </div>
                            </div>
                            
                            {/* Participants */}
                            <div className="space-y-2">
                              {event.participants.map((participant, pIndex) => (
                                <div key={pIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                                  <div className={`mr-2 text-lg ${color.text} dark:text-white/80`}>•</div>
                                  <div>{participant}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Youth Program Section */}
        <div className="mt-24 overflow-hidden rounded-2xl shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
          
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-20 blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-blue-500 rounded-full opacity-20 blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 backdrop-blur-sm mb-4">
                  PARALLEL PROGRAM
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  MEA Summit Youth Program
                </h3>
                
                <p className="text-blue-50 mb-6">
                  Running parallel to the main summit, the Youth Program focuses on empowering young innovators and entrepreneurs from across the Middle East and Africa regions.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    "Youth-Led Innovation Workshops",
                    "From Campus to Global Impact – University Startups",
                    "Youth Innovation Pitch Competition",
                    "Digital Skills for the Future"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-yellow-400">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://www.measummit.com/youth-program/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-colors duration-300"
                >
                  <span>View Youth Program Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2">
                    <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-[240px] h-[240px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-pulse"></div>
                  <div className="absolute inset-[15%] rounded-full bg-gradient-to-r from-blue-400/40 to-purple-400/40 animate-pulse" style={{animationDelay: '500ms'}}></div>
                  <div className="absolute inset-[30%] rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 animate-pulse" style={{animationDelay: '1000ms'}}></div>
                  <div className="relative bg-white/10 backdrop-blur-sm h-24 w-24 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.375 7.058 8.287 8.287 0 0 0 9 9.75c.85.004 1.705.115 2.504.337a6.833 6.833 0 0 0 1.909-3.409 6.749 6.749 0 0 1 4.603 3.483 8.29 8.29 0 0 0-2.653-4.947Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// CTA Section
// -------------------------------------------------------------------
function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"></div>
      
      {/* Pattern overlay */}
      <RetroGrid 
        angle={60}
        cellSize={80}
        opacity={0.2}
        lightLineColor="white" 
        darkLineColor="white"
        className="z-0"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Shape the Future of Digital Innovation in MEA
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Join us at MEA Summit 2025 and be part of the movement to transform economies and lives through technology and investment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="light" size="lg" href="/tickets">
              Register Now
            </Button>
            <Button
              variant="dark"
              buttonType="outline"
              size="lg"
              href="/contact"
              className="border-white text-white hover:bg-white/10"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
