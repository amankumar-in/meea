"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

interface Event {
  id: number;
  Title: string;
  Slug: string;
  ShortDescription: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  RoomNumber?: string;
  Enumeration: string;
  FeaturedEvent: boolean;
  MaxAttendees?: number;
  Image?: {
    id: number;
    url: string;
    width: number;
    height: number;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Conference",
    "Workshop",
    "Networking",
    "Exhibition",
    "Panel",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchAPI("/events?populate=*");
        console.log("Events response:", response);

        if (response && response.data) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.Enumeration === activeCategory)
      );
    }
  }, [activeCategory, events]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Programme Events
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore conferences, workshops, panels, and networking
                opportunities at the Middle East & Africa Digital Transformation
                Summit (MEA Summit 2025)
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/tickets">
                  Register Now
                </Button>
                <Button
                  variant="dark"
                  buttonType="outline"
                  href="/contact"
                  className="dark:border-white dark:text-white"
                >
                  Become a Speaker
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-8 bg-black text-white dark:bg-white dark:text-black relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600"></div>
                <h2 className="text-2xl font-bold mb-4">June 25-27, 2025</h2>
                <p className="mb-4">Kampala, Uganda</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>300+ Sessions</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>50+ International Speakers</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 inline-block bg-yellow-500 mr-3"></span>
                    <span>5 Specialized Tracks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain & Digital Currencies Section (copied from About page) */}
      <BlockchainSection />

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Event Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Filter events by type
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 font-medium border rounded-md transition-colors duration-150 ${
                  activeCategory === category
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "bg-transparent text-black dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <section className="pt-0 pb-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 border border-gray-200 dark:border-gray-600">
              <div className="mb-6">
                <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Loading events...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500">
                  <svg
                    className="w-6 h-6 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Error Loading Events
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    No Events Found
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    There are currently no events in the {activeCategory}{" "}
                    category.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setActiveCategory("All")}
                  >
                    View All Events
                  </Button>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event, idx) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: idx * 0.08,
                        type: "spring",
                        stiffness: 80,
                        damping: 18,
                      }}
                      whileHover={{ scale: 1.03 }}
                      className="h-full"
                    >
                      <Link
                        href={`/events/${event.Slug}`}
                        className="block h-full group focus:outline-none"
                      >
                        <div
                          className="h-full flex flex-col overflow-hidden transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl group-hover:border-2 group-hover:border-transparent group-hover:shadow-[0_0_0_4px_rgba(59,130,246,0.5),0_8px_32px_0_rgba(236,72,153,0.15)] group-hover:bg-white/80 dark:group-hover:bg-gray-900/80 relative"
                          style={{ borderRadius: 20 }}
                        >
                          {/* Event Image */}
                          <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden rounded-xl">
                            {event.Image ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}${event.Image.url}`}
                                alt={event.Image.alternativeText || event.Title}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-xl"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center rounded-xl">
                                <span className="text-gray-400 text-xl">
                                  MEA Summit 2025
                                </span>
                              </div>
                            )}
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none rounded-xl" />
                            {/* Category indicator - top left */}
                            <div className="absolute top-4 left-4 z-20">
                              <Chip
                                variant="primary"
                                size="sm"
                                className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                              >
                                {event.Enumeration}
                              </Chip>
                            </div>
                            {/* Featured indicator - top right */}
                            {event.FeaturedEvent && (
                              <div className="absolute top-4 right-4 z-20">
                                <span
                                  className="relative overflow-hidden inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-semibold tracking-wide min-w-[48px] min-h-[20px] text-yellow-800 dark:text-yellow-200 bg-white/80 dark:bg-gray-900/80 rounded-xl"
                                  style={{
                                    fontSize: "0.72rem",
                                    lineHeight: 1.1,
                                  }}
                                  tabIndex={-1}
                                  aria-label="Featured Event"
                                >
                                  <span className="relative z-10">
                                    Featured
                                  </span>
                                  <BorderBeam
                                    size={28}
                                    duration={2.5}
                                    colorFrom="#FFD700"
                                    colorTo="#EC4899"
                                  />
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Card Body */}
                          <div className="p-6 flex flex-col flex-grow z-10">
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-pink-500 transition-colors text-gray-900 dark:text-white">
                              <AnimatedGradientText
                                colorFrom="#3B82F6"
                                colorTo="#EC4899"
                                className="font-bold"
                              >
                                {event.Title}
                              </AnimatedGradientText>
                            </h3>
                            {/* Event Details */}
                            <div className="mb-3 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                              {event.StartDate && (
                                <div className="flex items-center">
                                  <svg
                                    className="h-4 w-4 mr-1 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>{formatDate(event.StartDate)}</span>
                                </div>
                              )}
                              {event.Location && (
                                <div className="flex items-center">
                                  <svg
                                    className="h-4 w-4 mr-1 text-pink-500"
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
                                  <span>
                                    {event.Location}
                                    {event.RoomNumber &&
                                      ` - Room ${event.RoomNumber}`}
                                  </span>
                                </div>
                              )}
                              {event.MaxAttendees && (
                                <div className="flex items-center">
                                  <svg
                                    className="h-4 w-4 mr-1 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </svg>
                                  <span>
                                    Capacity: {event.MaxAttendees} attendees
                                  </span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                              {event.ShortDescription.length > 150
                                ? `${event.ShortDescription.substring(
                                    0,
                                    150
                                  )}...`
                                : event.ShortDescription}
                            </p>
                            <div className="mt-auto pt-4">
                              <Button
                                variant="primary"
                                className="w-full shadow-md bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-pink-500 hover:to-blue-500 transition-all duration-200 cursor-pointer border-0 backdrop-blur-md"
                                style={{ cursor: "pointer" }}
                              >
                                View Details
                                <svg
                                  className="ml-2 h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
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
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-8 relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500"></div>
                <h3 className="text-2xl font-bold mb-4">Key Dates</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Early Bird Registration: Until June 10, 2025</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Speaker Submissions: May 31, 2025</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 inline-block mr-3"></span>
                    <span>Exhibition Setup: June 24, 2025</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-8">
              <span className="inline-block mb-3 h-1 w-16 bg-yellow-500"></span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Ready to Connect with Global Leaders?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Secure your spot at MEA Summit 2025 and join industry leaders,
                investors, and innovators from around the world. Early bird
                registration is now open with special rates.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" href="/tickets">
                  Register Now
                </Button>
                {/* Removed View Full Schedule button */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer border animation for Featured chip */}
      <style jsx global>{`
        @keyframes shimmer-beam {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .shimmer-border {
          background: linear-gradient(
            120deg,
            gold 10%,
            #fffbe6 30%,
            gold 60%,
            #ffd600 80%,
            gold 100%
          );
          background-size: 200% 200%;
          animation: shimmer-beam 1.8s linear infinite;
          border-radius: 16px;
          z-index: 1;
          box-sizing: border-box;
          border: 2px solid transparent;
          mask-image: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-image: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
        }
      `}</style>
    </main>
  );
}

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
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate description to 140 characters
  const truncateDescription = (text: string, maxLength: number = 140) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
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
        delay: 0.3,
      },
    },
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
            <span className="px-3 text-sm font-medium text-blue-600 dark:text-blue-400">
              FEATURED TRACK
            </span>
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Blockchain &</span>{" "}
            <AnimatedGradientText
              colorFrom="#3B82F6"
              colorTo="#EC4899"
              className="font-bold"
            >
              Digital Currencies
            </AnimatedGradientText>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring the transformative power of blockchain technology and
            digital currencies across the Middle East and Africa.
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    MEA Blockchain Renaissance
                  </h3>
                </div>

                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    The Middle East & Africa region is experiencing
                    unprecedented blockchain adoption, with regulatory
                    innovations and real-world implementations leading the way.
                  </p>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 mt-4"
                    variants={statsVariants}
                  >
                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200/50 dark:border-blue-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        $980M+
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        crypto investments in UAE (2023)
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 border border-purple-200/50 dark:border-purple-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-purple-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        300+
                      </p>
                      <p className="text-xs text-purple-700 dark:text-purple-300">
                        blockchain companies in DMCC
                      </p>
                    </div>

                    <div className="relative overflow-hidden rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border border-green-200/50 dark:border-green-700/50">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl"></div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        3
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        countries in top 20 for crypto adoption
                      </p>
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
                                {new Date(event.StartDate)
                                  .toLocaleString("default", { month: "short" })
                                  .toUpperCase()}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.Title}
                    </h3>

                    {/* Date, Time and Location - Compact design */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {event.StartDate && (
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{formatDate(event.StartDate)}</span>
                        </div>
                      )}

                      {event.Location && (
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-blue-500"
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
                                      {speaker.Name
                                        ? speaker.Name.charAt(0)
                                        : "J"}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                  {speaker.Name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {speaker.Title}
                                </p>
                              </div>
                            </div>

                            {/* Speaker social links - More compact */}
                            <div className="flex space-x-2">
                              {speaker.LinkedIn && (
                                <a
                                  href={speaker.LinkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                </a>
                              )}
                              {speaker.Twitter && (
                                <a
                                  href={speaker.Twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                  </svg>
                                </a>
                              )}
                              {speaker.Website && (
                                <a
                                  href={speaker.Website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">
                  Event data unavailable
                </p>
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center px-4">
              Key Blockchain Topics
            </h3>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "CBDCs & Stablecoins",
                description:
                  "Central Bank Digital Currencies and regulated stablecoins transforming monetary systems",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                    />
                  </svg>
                ),
                gradientFrom: "from-blue-500",
                gradientTo: "to-blue-600",
                glowColor: "blue",
                shadowColor: "rgba(59, 130, 246, 0.3)",
              },
              {
                title: "Regulatory Frameworks",
                description:
                  "Evolving legal structures enabling responsible innovation while protecting consumers",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                ),
                gradientFrom: "from-purple-500",
                gradientTo: "to-purple-600",
                glowColor: "purple",
                shadowColor: "rgba(139, 92, 246, 0.3)",
              },
              {
                title: "DeFi & Islamic Finance",
                description:
                  "Bridging traditional Islamic finance principles with decentralized technologies",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                gradientFrom: "from-green-500",
                gradientTo: "to-green-600",
                glowColor: "green",
                shadowColor: "rgba(16, 185, 129, 0.3)",
              },
              {
                title: "Cross-Border Solutions",
                description:
                  "Reducing remittance costs and unlocking efficient trade finance across the region",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                gradientFrom: "from-yellow-500",
                gradientTo: "to-yellow-600",
                glowColor: "yellow",
                shadowColor: "rgba(245, 158, 11, 0.3)",
              },
            ].map((topic, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="backdrop-blur-sm bg-white/70 dark:bg-gray-950/80 rounded-xl overflow-hidden shadow-md border border-gray-200/50 dark:border-gray-600 hover:shadow-lg hover:border-gray-300 dark:hover:border-blue-500/50 transition-all duration-300 group"
                style={{
                  boxShadow: `0 4px 16px ${topic.shadowColor}`,
                }}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} w-full`}
                ></div>
                <div className="p-5 dark:bg-gray-900/90">
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${topic.gradientFrom} ${topic.gradientTo} text-white shadow-md mr-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {topic.icon}
                    </div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {topic.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {topic.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
