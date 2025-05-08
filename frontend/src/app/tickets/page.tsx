"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";

// Updated interfaces with proper typing
interface RichTextBlock {
  type: string;
  children?: RichTextNode[];
  format?: string;
}

interface RichTextNode {
  type?: string;
  text?: string;
  children?: RichTextNode[];
}

interface AllowedEvent {
  id: number;
  title: string;
  slug: string;
}

interface TicketCategory {
  id: number;
  documentId: string;
  name: string;
  description: RichTextBlock[];
  price: number;
  currency: string;
  validFrom: string;
  validUntil: string;
  maxPurchaseQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  allowedEvents: AllowedEvent[]; // Refined event structure
}

export default function TicketsPage() {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketCategories = async () => {
      try {
        const response = await fetchAPI("/ticket-categories?populate=*");
        console.log("Ticket categories response:", response);

        if (response && response.data) {
          setTicketCategories(response.data);
        } else {
          setError("Failed to retrieve ticket categories data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ticket categories:", err);
        setError("Failed to load ticket categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchTicketCategories();
  }, []);

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to render rich text description
  const renderDescription = (description: RichTextBlock[]) => {
    if (!description || !Array.isArray(description)) return null;

    return description.map((block, blockIndex) => {
      if (block.type === "paragraph") {
        return (
          <p key={blockIndex} className="mb-2">
            {block.children?.map((child: RichTextNode, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      } else if (block.type === "list") {
        return (
          <ul
            key={blockIndex}
            className={
              block.format === "ordered"
                ? "list-decimal ml-5"
                : "list-disc ml-5"
            }
          >
            {block.children?.map((item: RichTextNode, itemIndex: number) => (
              <li key={itemIndex}>
                {item.children?.map((child: RichTextNode, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </li>
            ))}
          </ul>
        );
      }
      return null;
    });
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      <HeroSection />
      <TicketsSection
        ticketCategories={ticketCategories}
        loading={loading}
        error={error}
        formatCurrency={formatCurrency}
        renderDescription={renderDescription}
      />
      <FAQsSection />
      <GroupRegistrationSection />
      
      {/* Global styles for animations and effects */}
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
    </main>
  );
}

// -------------------------------------------------------------------
// Hero Section
// -------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-[#0a1622] dark:via-[#1e2233] dark:to-[#10131a] border-b border-gray-200 dark:border-gray-700">
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
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-300 opacity-20 blur-3xl rounded-full pointer-events-none z-0 dark:bg-blue-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="inline-block h-1 w-16 bg-yellow-500"></span>
              <span className="bg-yellow-400 text-black font-bold px-3 py-1 rounded-lg text-xs shadow-md">
                2025
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              MEA Summit 2025 <span className="text-blue-600 dark:text-blue-400">Tickets</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Secure your place at East Africa&apos;s premier digital transformation summit. 
              Limited availability for exclusive networking and business opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button 
                variant="primary" 
                href="#tickets"
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 border-none px-8 py-3 rounded-lg"
              >
                View Ticket Options
              </Button>
              <Button
                variant="dark"
                buttonType="outline"
                href="/contact"
                className="dark:border-white dark:text-white px-8 py-3 rounded-lg"
              >
                Group Registration
              </Button>
            </div>
          </div>
          <div className="bg-black text-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-8 border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 blur-md opacity-40 transform rotate-45"></div>
            <div className="relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600"></div>
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-4">Key Dates</h2>
              <ul className="space-y-6">
                <li className="flex items-start transform transition-transform hover:translate-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0 rounded-lg shadow-md">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Early Bird Ends</p>
                    <p className="text-gray-300">May 31, 2025</p>
                  </div>
                </li>
                <li className="flex items-start transform transition-transform hover:translate-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0 rounded-lg shadow-md">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">General Registration</p>
                    <p className="text-gray-300">May 1 - June 20, 2025</p>
                  </div>
                </li>
                <li className="flex items-start transform transition-transform hover:translate-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0 rounded-lg shadow-md">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Event Dates</p>
                    <p className="text-gray-300">June 25-27, 2025</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-4 border border-blue-500 bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="font-bold">Limited VIP Tickets Available</p>
                </div>
                <p className="mt-1 text-sm text-gray-300">Early booking recommended for exclusive networking access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Tickets Section
// -------------------------------------------------------------------
function TicketsSection({
  ticketCategories,
  loading,
  error,
  formatCurrency,
  renderDescription,
}: {
  ticketCategories: TicketCategory[];
  loading: boolean;
  error: string | null;
  formatCurrency: (amount: number, currency: string) => string;
  renderDescription: (description: RichTextBlock[]) => React.ReactNode;
}) {
  return (
    <section
      id="tickets"
      className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block mb-3 h-1 w-16 bg-blue-600 mx-auto"></span>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Choose Your Ticket
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select the ticket option that best suits your needs
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="inline-block h-8 w-8 animate-spin border-2 border-solid border-yellow-500 border-r-transparent"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-300">
              Loading ticket options...
            </p>
          </div>
        ) : error ? (
          <div className="border border-gray-200 dark:border-gray-600 p-8 bg-white dark:bg-gray-800 text-center rounded-xl shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 mb-4 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Error Loading Ticket Options
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : ticketCategories.length === 0 ? (
          <div className="border border-gray-200 dark:border-gray-600 p-8 bg-white dark:bg-gray-800 text-center rounded-xl shadow-lg">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No ticket options available at this time. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ticketCategories
              .filter((ticket) => ticket.isActive)
              .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
              .map((ticket) => (
                <div
                  key={ticket.documentId}
                  className={`relative group transition-all duration-300 hover:scale-105 ${
                    ticket.isFeatured ? "z-10" : ""
                  }`}
                >
                  {/* Ticket Card */}
                  <div
                    className={`relative flex flex-col h-full rounded-xl overflow-hidden transform transition-all ${
                      ticket.isFeatured
                        ? "bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-[3px] shadow-[0_0_15px_rgba(59,130,246,0.7),0_0_20px_rgba(156,64,255,0.4)]"
                        : "border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {/* Card Content Container */}
                    <div className={`bg-white dark:bg-gray-800 rounded-[9px] flex flex-col h-full`}>
                      {/* Featured indicator */}
                      {ticket.isFeatured && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black p-2 text-center font-bold shadow-lg text-sm">
                          FEATURED TICKET
                        </div>
                      )}

                      {/* Shine effect (only for featured) */}
                      {ticket.isFeatured && (
                        <div className="absolute inset-0 shine-effect pointer-events-none z-0"></div>
                      )}

                      {/* Ticket header */}
                      <div className={`p-6 ${
                          ticket.isFeatured
                            ? "bg-gradient-to-br from-[#1a1a3f] to-[#0f0f25] text-white pt-12"
                            : "bg-black text-white dark:bg-gray-700 dark:text-white"
                        }`}>
                        <h3 className="text-2xl font-bold mb-2">{ticket.name}</h3>
                        <div className="flex items-baseline">
                          <span className={`text-3xl font-bold mr-2 ${
                              ticket.isFeatured ? "text-yellow-400" : "text-yellow-500"
                            }`}>
                            {formatCurrency(ticket.price, ticket.currency)}
                          </span>
                          <span className="text-sm opacity-75">per person</span>
                        </div>
                      </div>

                      {/* Ticket content */}
                      <div className="p-6 flex-grow border-t border-gray-200 dark:border-gray-600">
                        <div className="text-gray-600 dark:text-gray-300 mb-6">
                          {renderDescription(ticket.description)}
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 ${
                                ticket.isFeatured ? "bg-blue-500" : "bg-yellow-500"
                              } mr-2`}></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Valid until:{" "}
                              {new Date(ticket.validUntil).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 ${
                                ticket.isFeatured ? "bg-blue-500" : "bg-yellow-500"
                              } mr-2`}></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Max purchase: {ticket.maxPurchaseQuantity} tickets
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Purchase button */}
                      <div className="p-6 border-t border-gray-200 dark:border-gray-600">
                        <Button
                          variant={ticket.isFeatured ? "primary" : "dark"}
                          href={`/tickets/buy?categoryId=${ticket.documentId}`}
                          className={`w-full rounded-lg ${
                            ticket.isFeatured
                              ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 border-none"
                              : "dark:border-white dark:text-white"
                          }`}
                        >
                          Purchase Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// FAQs Section
// -------------------------------------------------------------------
function FAQsSection() {
  const faqs = [
    {
      question: "What's included in the All-Access Pass?",
      answer:
        "The All-Access Pass provides entry to all events at MEA 2025, including keynote speeches, workshops, networking events, and the exhibition area. You'll also receive priority check-in and complimentary refreshments.",
    },
    {
      question: "Can I purchase tickets at the venue?",
      answer:
        "We strongly recommend purchasing tickets online in advance to guarantee your spot, as certain events may sell out. Limited tickets may be available at the venue, subject to availability.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "Tickets can be refunded up to 14 days before the event. After that, tickets are non-refundable but can be transferred to another attendee by contacting our support team.",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 dark:bg-yellow-900 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-20 -ml-32 -mb-32 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold mb-4">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Common Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about tickets and attendance
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800"
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button 
            variant="primary" 
            buttonType="outline" 
            href="/about/faq"
            className="px-8 py-3 rounded-lg"
          >
            View All FAQs
          </Button>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------------
// Group Registration Section
// -------------------------------------------------------------------
function GroupRegistrationSection() {
  const benefits = [
    "Discounted rates for 5+ attendees",
    "Reserved seating at keynote events",
    "Dedicated liaison for your group",
    "Simplified billing with a single invoice",
    "Custom networking opportunities",
    "Exclusive VIP lounge access",
  ];

  return (
    <section
      id="group-registration"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold mb-4">
              GROUP & CORPORATE PACKAGES
            </span>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Group Registration
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Coming with a team of 5 or more? Contact us for special group
              rates and custom packages that can be tailored to your
              organization&apos;s needs.
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Corporate Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="font-bold mb-1">15% Discount</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">For groups of 5-9 attendees</div>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                  <div className="font-bold mb-1">25% Discount</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">For groups of 10+ attendees</div>
                </div>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 border-none shadow-lg px-8 py-3 text-white rounded-lg"
            >
              Contact for Group Bookings
            </Button>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-800 text-white dark:from-gray-800 dark:to-black border border-gray-200 dark:border-gray-600 p-8 rounded-xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 blur-md opacity-20 transform rotate-45"></div>
            <div className="relative mb-8">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500"></div>
              <h3 className="text-2xl font-bold">Group Benefits</h3>
            </div>

            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start transform transition-transform hover:translate-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0 rounded-lg shadow-md">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <span className="pt-1">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 border border-yellow-500 bg-yellow-500/10 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-lg font-bold">Corporate Packages</p>
              </div>
              <p className="text-gray-300">
                Special pricing and exclusive benefits available for corporate
                teams. Custom packages start at 10+ attendees with priority access to speakers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
