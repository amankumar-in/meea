"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Define contact form state type
interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  organization: string;
  subject: string;
  message: string;
  inquiryType: string;
}

// Initial state for the form
const initialFormState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
  inquiryType: "general",
};

export default function ContactPage() {
  // Form state
  const [formState, setFormState] =
    useState<ContactFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare the data for Strapi's API format
      const formData = {
        data: {
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          inquiryType: formState.inquiryType,
          // Include these if you added them to your Strapi model
          phone: formState.phone || undefined,
          organization: formState.organization || undefined,
        },
      };

      // Send the data to Strapi API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact-messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Parse the response
      const result = await response.json();

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to submit form");
      }

      // Reset form and show success message
      setFormState(initialFormState);
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

      console.log("Form submitted successfully:", result);
    } catch (error: any) {
      setSubmitError(
        error.message ||
          "There was a problem submitting your form. Please try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll handler for form
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main className="bg-white dark:bg-gray-900">
        <HeroSection scrollToForm={scrollToForm} />
        <ContactOptionsSection />
        <ContactFormSection
          formRef={formRef}
          formState={formState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          submitError={submitError}
        />
        <InquiryTypesSection />
        <FAQTeaserSection />
        <SocialMediaSection />
      </main>
      
      {/* Global shine-animation styles */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-30deg);
          }
          100% {
            transform: translateX(200%) skewX(-30deg);
          }
        }

        .shine-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          transform: translateX(-120%) skewX(-30deg);
        }

        .group:hover .shine-effect {
          animation: shine 1s forwards;
        }
      `}</style>
    </>
  );
}

// -------------------------------------------------------------------
// Hero Section with Gradient Background
// -------------------------------------------------------------------
interface HeroSectionProps {
  scrollToForm: () => void;
}

function HeroSection({ scrollToForm }: HeroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-[#0a1622] dark:via-[#1e2233] dark:to-[#10131a]">
      {/* Subtle SVG grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Soft blue accent in top-left corner */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-300 opacity-20 blur-3xl rounded-full pointer-events-none z-0 dark:bg-blue-500" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Logo and title header */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/mea-icon.svg"
                alt="MEA Summit Icon"
                className="w-14 h-14 drop-shadow-xl"
                style={{ filter: "drop-shadow(0 0 8px #38bdf8)" }}
              />
              <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-lg text-xs shadow-md">
                CONTACT US
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
              Connect with the
              <span className="text-blue-600 dark:text-blue-400"> MEA Summit Team</span> 
            </h1>
            
            <p className="text-xl text-slate-700 dark:text-white/90 font-light max-w-2xl mb-8">
              Have questions about the summit, sponsorship opportunities, or media inquiries? 
              We&apos;re here to assist you every step of the way.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                onClick={scrollToForm}
                className="relative inline-block px-6 py-3 rounded-lg text-lg font-bold text-white shadow-xl border border-white/30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                Send a Message
              </Button>
              
              <Button
                variant="dark"
                buttonType="outline"
                href="tel:+256779345331"
                className="relative inline-block px-6 py-3 rounded-lg text-lg font-bold border border-white bg-white text-blue-700 dark:bg-blue-900 dark:text-white dark:border-blue-800 shadow-md backdrop-blur-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl shadow-2xl">
              <div className="bg-white dark:bg-gray-800/80 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                      <a href="mailto:info@coinsforcollege.org" className="text-blue-600 dark:text-blue-400 hover:underline">info@coinsforcollege.org</a>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">For general inquiries and information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Phone</h4>
                      <a href="tel:+256779345331" className="text-blue-600 dark:text-blue-400 hover:underline">+256 779 345 331</a>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Available Mon-Fri, 9AM-5PM (EAT)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Address</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        MEA Summit Secretariat<br />
                        Kampala Serena Hotel<br />
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>
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
}

// -------------------------------------------------------------------
// Contact Options Section
// -------------------------------------------------------------------
function ContactOptionsSection() {
  const contactOptions = [
    {
      title: "General Inquiries",
      description:
        "Questions about the summit program, schedule, venue, or general information.",
      email: "info@coinsforcollege.org",
      phone: "+256 779 345 331",
      color: "from-blue-600 to-blue-800",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Sponsorship Opportunities",
      description:
        "Partner with us to showcase your brand to key decision-makers in the Middle East and Africa.",
      email: "sponsors@meaexpo.org",
      phone: "+256 779 345 331",
      color: "from-purple-600 to-purple-800",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Media & Press",
      description:
        "For media inquiries, press passes, interview requests, and promotional materials.",
      email: "media@meaexpo.org",
      phone: "+256 779 345 331",
      color: "from-green-600 to-green-800",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      title: "Speaker Inquiries",
      description:
        "For information about speaking opportunities at the summit and speaker support.",
      email: "speakers@meaexpo.org",
      phone: "+256 779 345 331",
      color: "from-yellow-500 to-yellow-700",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            HOW CAN WE HELP?
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Specialized Support Teams
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Reach out to our dedicated teams for specific inquiries about the MEA Summit 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col h-full"
            >
              <div 
                className={`h-2 w-full bg-gradient-to-r ${option.color}`}
              ></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-6">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-md bg-gradient-to-r ${option.color} flex items-center justify-center mr-4 text-white shadow-lg`}>
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {option.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {option.description}
                </p>
                <div className="space-y-2 mt-auto">
                  <a
                    href={`mailto:${option.email}`}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    {option.email}
                  </a>
                  <a
                    href={`tel:${option.phone.replace(/\s+/g, "")}`}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                    {option.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Inquiry Types Section - New section with stats and information
// -------------------------------------------------------------------
function InquiryTypesSection() {
  const stats = [
    { value: "4h", label: "Response Time", description: "for all inquiries" },
    { value: "5k+", label: "Attendees", description: "expected at MEA Summit 2025" },
    { value: "50+", label: "Countries", description: "represented at the summit" },
    { value: "20+", label: "Industries", description: "across Middle East & Africa" },
  ];

  return (
    <section className="py-20 overflow-hidden relative bg-gradient-to-b from-gray-900 to-blue-900 dark:opacity-80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="url(#gradient)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-4">
            OPPORTUNITIES
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Your Gateway to the MEA Summit
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-black/30 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden border border-gray-800 transform transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="p-8">
                <div className="text-4xl md:text-5xl font-bold mb-3 text-white">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-yellow-400 font-semibold mb-3">
                  {stat.label}
                </div>
                <div className="text-gray-300">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Common Inquiry Types</h3>
              <ul className="space-y-4">
                {[
                  "Summit program and agenda details",
                  "Registration and ticket information",
                  "Sponsorship packages and benefits",
                  "Media accreditation and press passes",
                  "Speaker applications and selection process",
                  "Venue details and accommodation options",
                  "Partnership opportunities and collaborations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="text-gray-200">{item}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="p-6 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Connect Faster </h3>
                <p className="text-gray-200 mb-4">
                  The MEA Summit team is dedicated to providing timely and comprehensive 
                  responses to all inquiries. Our specialized teams ensure you receive 
                  the most accurate information and support for your participation.
                </p>
                <p className="text-gray-200">
                  Whether you&apos;re an attendee, speaker, sponsor, or media representative, 
                  we&apos;re here to make your MEA Summit experience seamless and valuable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Contact Form Section
// -------------------------------------------------------------------
interface ContactFormSectionProps {
  formRef: React.RefObject<HTMLDivElement>;
  formState: ContactFormState;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}

function ContactFormSection({
  formRef,
  formState,
  handleChange,
  handleSubmit,
  isSubmitting,
  submitSuccess,
  submitError,
}: ContactFormSectionProps) {
  return (
    <section
      id="contact-form"
      ref={formRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 rounded-full bg-blue-200 opacity-20 dark:opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-purple-300 opacity-20 dark:opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Send Us a Message
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you have questions about the summit, sponsorship opportunities, or anything else,
            our team is ready to answer all your inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-lg border border-green-500/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                      Message Sent Successfully
                    </h3>
                    <p className="mt-2 text-green-700 dark:text-green-300">
                      Thank you for contacting us. We&apos;ve received your message and will get back to you shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-lg border border-red-500/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                      There was an error
                    </h3>
                    <p className="mt-2 text-red-700 dark:text-red-300">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Organization/Company
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formState.organization}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formState.inquiryType}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="general">General Inquiry</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                  <option value="exhibitor">Exhibitor Information</option>
                  <option value="speaker">Speaker Opportunity</option>
                  <option value="media">Media & Press</option>
                  <option value="ticket">Ticketing Support</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="relative p-1 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 rounded-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 shine-effect pointer-events-none"></div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 h-full">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-l-4 border-blue-500 pl-4">
                  Visit Us at MEA Summit 2025
                </h3>
                
                <div className="mb-8">
                  <div className="h-64 w-full overflow-hidden rounded-lg mb-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7575293756577!2d32.573971299999994!3d0.316619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0afbb1ae1d%3A0x3c240fcd8cc8df7!2sKampala%20Rd%2C%20Kampala%2C%20Uganda!5e0!3m2!1sen!2sus!4v1649919564388!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-md"
                    ></iframe>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    MEA Summit 2025 will be held at the prestigious Kampala Serena Hotel, 
                    located in the heart of Uganda&apos;s capital city.
                  </p>
                  
                  <a
                    href="https://maps.google.com/directions?q=Kampala+Serena+Hotel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                    Get Directions
                  </a>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Office Hours
                  </h4>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 5:00 PM (EAT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">9:00 AM - 12:00 PM (EAT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <svg 
                          className="h-5 w-5 text-blue-600 dark:text-blue-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Summit Information
                        </h5>
                        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                          For the most up-to-date information about the MEA Summit 2025, 
                          please visit our <Link href="/events" className="underline">Events</Link> page.
                        </p>
                      </div>
                    </div>
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
// FAQ Teaser Section - Updated with modern design
// -------------------------------------------------------------------
function FAQTeaserSection() {
  const faqs = [
    {
      question: "When and where will MEA Summit 2025 take place?",
      answer: "MEA Summit 2025 will take place on June 25-27, 2025 at the Kampala Serena Hotel in Kampala, Uganda."
    },
    {
      question: "How can I register for the summit?",
      answer: "Registration can be completed through our website's Tickets page. Early bird rates are available until January 2025."
    },
    {
      question: "What are the sponsorship opportunities available?",
      answer: "We offer various sponsorship packages including Platinum, Gold, and Silver tiers with different benefits and exposure levels."
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to commonly asked questions about the MEA Summit 2025
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 text-white font-bold">
                  Q
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
              </div>
              <div className="ml-14">
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="primary" 
            size="lg" 
            href="/about/faq"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-500 hover:to-purple-500 transform transition-all duration-300 hover:scale-105"
          >
            View Full FAQ
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Social Media Section - Updated with modern design
// -------------------------------------------------------------------
function SocialMediaSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-bg opacity-80 dark:opacity-60"></div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70 dark:opacity-80"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/80 backdrop-filter backdrop-blur-sm text-white text-sm font-semibold mb-4">
            STAY CONNECTED
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white">
            Follow Us on Social Media
          </h2>
          <p className="text-lg text-gray-100 max-w-3xl mx-auto">
            Stay updated with the latest announcements, speakers, and program details for the MEA Summit 2025
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto mb-12">
          {[
            {
              name: "Twitter",
              icon: (
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              ),
              color: "from-blue-400 to-blue-600",
            },
            {
              name: "Facebook",
              icon: (
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
              color: "from-blue-600 to-blue-800",
            },
            {
              name: "Instagram",
              icon: (
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
              color: "from-pink-500 to-purple-600",
            },
            {
              name: "LinkedIn",
              icon: (
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ),
              color: "from-blue-700 to-blue-900",
            },
            {
              name: "YouTube",
              icon: (
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              ),
              color: "from-red-600 to-red-800",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={`https://${social.name.toLowerCase()}.com/meaexpo`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-[2px] bg-gradient-to-r from-white/20 to-white/5 backdrop-blur-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" style={{backgroundImage: `linear-gradient(to right, #3b82f6, #8b5cf6)`}}></div>
              <div className="relative flex flex-col items-center justify-center p-6 bg-black/50 backdrop-blur-md rounded-xl h-full">
                <div className="text-white mb-3 transition-transform duration-500 group-hover:scale-110">
                  {social.icon}
                </div>
                <div className="text-white font-medium text-sm">{social.name}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-200 mb-6">
              Stay informed with the latest updates, speaker announcements, and program details for the MEA Summit 2025
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-black/30 backdrop-filter backdrop-blur-sm border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                variant="primary"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white border-none shadow-xl px-6 py-3 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
            
            <div className="mt-4 text-sm text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from MEA Summit
            </div>
          </div>
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
}
