"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { NavigationLink } from "@/components/ui/NavigationLink";
import { MobileMenuButton } from "@/components/ui/MobileMenuButton";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Remove Venue from navItems
const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Speakers", href: "/speakers" },
  { name: "Sponsors", href: "/sponsors" },
];

// Separate desktop nav items to include Contact
const desktopNavItems = [...navItems, { name: "Contact", href: "/contact" }];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll state to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 z-30 transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-1.5 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with 2025 chip */}
            <div className="flex items-center">
              <Logo className="md:scale-100 scale-90" />
              <span className="ml-2 hidden md:inline-block bg-yellow-400 text-black font-bold px-2 py-1 rounded-lg text-xs shadow-md">
                2025
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <NavigationLink key={item.name} href={item.href}>
                  {item.name}
                </NavigationLink>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Light/Dark Toggle */}
              <ThemeToggle />
              <Button variant="primary" href="/tickets">
                Get Tickets
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-3">
              <ThemeToggle disableCircle={true} />
              <Button variant="primary" size="sm" href="/tickets">
                Tickets
              </Button>
              <MobileMenuButton
                isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-black dark:text-white"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {/* Logo at top of mobile menu */}
            <div className="py-4 flex items-center">
              <Logo className="scale-90" />
              <span className="ml-2 hidden bg-yellow-400 text-black font-bold px-2 py-1 rounded-lg text-xs shadow-md">
                2025
              </span>
            </div>

            {/* Action Buttons before links */}
            <div className="py-4 space-y-3">
              <div className="flex justify-center">
                <ThemeToggle disableCircle={true} />
              </div>
              <Button variant="primary" fullWidth href="/tickets">
                Get Tickets
              </Button>
              <Button
                variant="secondary"
                buttonType="outline"
                fullWidth
                href="/contact" // Exhibit button goes to contact page
              >
                Exhibit
              </Button>
            </div>

            {/* Main Navigation Links */}
            <nav className="flex-1 flex flex-col">
              {navItems.map((item) => (
                <NavigationLink
                  key={item.name}
                  href={item.href}
                  isMobile={true}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavigationLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}