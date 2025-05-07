"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api/api-config";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Bitcoin, Coins, Brain, Server, Users } from "lucide-react";

interface Sponsor {
  id: number;
  Name: string;
  Slug: string;
  Tier: "Platinum" | "Gold" | "Silver";
  Description: string;
  Website?: string;
  Featured: boolean;
  Logo?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
    };
  };
  sponsoredEvents?: Array<{
    id: number;
    Title: string;
    Slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTier, setActiveTier] = useState<string>("All");

  const tiers = ["All", "Platinum", "Gold", "Silver"];

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetchAPI("/sponsors?populate=*");
        if (response && response.data) {
          setSponsors(response.data);
          setFilteredSponsors(response.data);
        } else {
          setError("Failed to retrieve sponsors data");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load sponsors. Please try again later.");
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  useEffect(() => {
    if (activeTier === "All") {
      setFilteredSponsors(sponsors);
    } else {
      setFilteredSponsors(
        sponsors.filter((sponsor) => sponsor.Tier === activeTier)
      );
    }
  }, [activeTier, sponsors]);

  // Stats
  const platinumCount = sponsors.filter((s) => s.Tier === "Platinum").length;
  const goldCount = sponsors.filter((s) => s.Tier === "Gold").length;
  const silverCount = sponsors.filter((s) => s.Tier === "Silver").length;

  // Helper for logo url
  const getLogoUrl = (logo: any) => {
    if (!logo?.url) return "";
    if (logo.url.startsWith("http")) return logo.url;
    return `${process.env.NEXT_PUBLIC_API_URL}${logo.url}`;
  };

  // Helper for description truncation
  const truncate = (str: string, n: number) =>
    str.length > n ? str.slice(0, n - 1) + "…" : str;

  return (
    <main className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 w-full">
          {/* Left: Text */}
          <div className="flex-1 w-full flex flex-col items-start justify-center text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
              Shape the Future of Digital Transformation
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-light mb-0 max-w-2xl">
              Collaborate with leading organizations to drive innovation across
              Africa and the Middle East. Your involvement accelerates progress,
              builds networks, and creates lasting impact.
            </p>
          </div>
          {/* Right: Visual + CTA */}
          <div className="flex-1 w-full flex flex-col items-center md:items-end justify-center mb-10 md:mb-0">
            <img
              src="/mea-icon.svg"
              alt="Summit Logo"
              className="w-32 h-32 md:w-48 md:h-48 mb-6 drop-shadow-xl"
            />
            <Button
              variant="primary"
              href="/contact"
              className="w-full md:w-auto px-10 py-4 text-lg font-bold"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Tier Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Sponsorship Tiers
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Filter by partnership level
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-5 py-2 rounded-full font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  ${
                    activeTier === tier
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700"
                  }
                `}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-12 h-12 border-t-2 border-yellow-500 border-solid rounded-full animate-spin mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Loading sponsors...
          </p>
        </div>
      )}
      {error && !loading && (
        <div className="text-center py-24">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 mb-6">
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
          <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Error Loading Sponsors
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}
      {!loading && !error && filteredSponsors.length === 0 && (
        <div className="text-center py-24">
          <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            No Sponsors Found
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No sponsors are currently available in the {activeTier} tier.
          </p>
          <Button variant="primary" onClick={() => setActiveTier("All")}>
            View All Sponsors
          </Button>
        </div>
      )}

      {/* Sponsor Cards Grid */}
      {!loading && !error && filteredSponsors.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredSponsors.map((sponsor) => {
                let borderGradient = "";
                let badgeBg = "";
                let badgeText = "";

                if (sponsor.Tier === "Platinum") {
                  borderGradient =
                    "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-[3px] rounded-3xl shadow-[0_0_10px_rgba(59,130,246,0.7),0_0_20px_rgba(156,64,255,0.5),0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_0_30px_rgba(156,64,255,0.6),0_0_40px_rgba(236,72,153,0.4)] transition-shadow duration-300";
                  badgeBg =
                    "bg-gradient-to-r from-blue-600 to-purple-600 text-white";
                  badgeText = "Platinum Partner";
                } else if (sponsor.Tier === "Gold") {
                  borderGradient =
                    "bg-gradient-to-r from-yellow-500 to-yellow-600 p-[3px] rounded-3xl shadow-[0_0_10px_rgba(255,215,0,0.7),0_0_20px_rgba(255,193,7,0.5),0_0_30px_rgba(255,152,0,0.3)] hover:shadow-[0_0_20px_rgba(255,215,0,0.8),0_0_30px_rgba(255,193,7,0.6),0_0_40px_rgba(255,152,0,0.4)] transition-shadow duration-300";
                  badgeBg =
                    "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black";
                  badgeText = "Gold Partner";
                } else {
                  borderGradient =
                    "bg-gradient-to-r from-gray-400 to-gray-500 p-[3px] rounded-3xl shadow-[0_0_10px_rgba(107,114,128,0.7),0_0_20px_rgba(156,163,175,0.5),0_0_30px_rgba(176,180,190,0.3)] hover:shadow-[0_0_20px_rgba(107,114,128,0.8),0_0_30px_rgba(156,163,175,0.6),0_0_40px_rgba(176,180,190,0.4)] transition-shadow duration-300";
                  badgeBg =
                    "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
                  badgeText = "Silver Partner";
                }

                return (
                  <Link
                    href={`/sponsors/${sponsor.Slug}`}
                    key={sponsor.id}
                    className="block h-full"
                  >
                    <div
                      className={
                        "group w-full h-full flex flex-col items-center " +
                        borderGradient
                      }
                    >
                      <div className="relative bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-none rounded-2xl p-6 flex flex-col items-center w-full h-full overflow-hidden">
                        {/* Shine effect for platinum */}
                        {sponsor.Tier === "Platinum" && (
                          <div className="absolute inset-0 shine-effect pointer-events-none" />
                        )}
                        {/* Tier badge */}
                        <div
                          className={`absolute top-4 left-4 px-2 py-0.5 rounded-md text-[10px] font-bold shadow ${badgeBg}`}
                        >
                          {badgeText}
                        </div>
                        <div className="w-full h-20 flex items-center justify-center mb-4">
                          {sponsor.Logo ? (
                            <img
                              src={getLogoUrl(sponsor.Logo)}
                              alt={sponsor.Name}
                              className="max-h-20 max-w-full object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="h-20 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <span className="text-gray-400 text-xs uppercase tracking-wider">
                                {sponsor.Name}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-center w-full">
                          <div className="font-bold text-gray-900 dark:text-white text-lg mb-1 truncate">
                            {sponsor.Name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300 text-sm mb-3 min-h-[48px]">
                            {truncate(sponsor.Description, 110)}
                          </div>
                          {sponsor.Website && (
                            <a
                              href={sponsor.Website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-xs shadow hover:from-blue-500 hover:to-purple-500 transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Visit Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Public-Private Partnership Section */}
      <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold">
              PARTNERSHIP MODEL
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Public-Private Partnership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              The summit partnership network brings together government, private
              sector, international organizations, and community groups to
              support sustainable economic growth and innovation.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  Government:
                </span>{" "}
                Policy direction and institutional support
              </li>
              <li>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  Private Sector:
                </span>{" "}
                Financial resources and technical expertise
              </li>
              <li>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  International:
                </span>{" "}
                Global networks and capacity building
              </li>
              <li>
                <span className="font-semibold text-blue-700 dark:text-blue-400">
                  Community:
                </span>{" "}
                Inclusive and sustainable development
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-800 dark:to-blue-900 rounded-xl shadow-lg p-10 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">
              Summit Impact
            </h3>
            <ul className="space-y-2 text-blue-900 dark:text-blue-100 text-lg">
              <li>
                <span className="font-bold">$5B+</span> Investment Target
              </li>
              <li>
                <span className="font-bold">50,000+</span> New Jobs
              </li>
              <li>
                <span className="font-bold">30%</span> Export Growth
              </li>
              <li>
                <span className="font-bold">500+</span> International Linkages
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold">
              STRATEGIC FOCUS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Areas of Partnership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The summit highlights investment and collaboration across digital
              transformation themes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
              <div className="mb-4 text-yellow-500">
                {/* Prefer Bitcoin icon, fallback to Coins if not available */}
                {Bitcoin ? (
                  <Bitcoin size={40} className="text-yellow-500" />
                ) : (
                  <Coins size={40} className="text-yellow-500" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Blockchain & Digital Currencies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Cross-border payments, digital assets, and financial innovation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
              <div className="mb-4 text-yellow-500">
                <Brain size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Artificial Intelligence
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                AI-driven solutions for business, government, and society.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
              <div className="mb-4 text-yellow-500">
                <Server size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Digital Infrastructure
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Connectivity, cloud, and secure digital platforms.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
              <div className="mb-4 text-yellow-500">
                <Users size={40} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Innovation & Inclusion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Startups, SMEs, and inclusive digital growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Partnership CTA */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-[url('/images/uganda-landscape.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center z-10">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-500/80 text-white text-sm font-semibold">
            PARTNER INVITATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Partner with the Summit
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            We welcome organizations of all sizes—from local businesses to
            global enterprises—to join our partnership network. For more
            information, contact our team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold rounded-md shadow-lg transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
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
