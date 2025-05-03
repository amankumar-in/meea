// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/blockchain-animations.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import SiteLayout from "@/components/layout/SiteLayout";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEA Summit 2025",
  description:
    "The Middle East & Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and Africa region.",
  keywords: [
    "Middle East",
    "Africa",
    "Investment",
    "Summit",
    "International Collaboration",
  ],
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    title: "MEA 2025",
    capable: true,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "MEA - Middle East & Africa Investment Summit 2025",
    description:
      "The Middle East & Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and Africa region.",
    type: "website",
    siteName: "MEA 2025",
    images: [
      {
        url: "https://unite-backend-gg5m.onrender.com/uploads/mea_og_630_374bc758c3.jpg",
        width: 1200,
        height: 630,
        alt: "MEA 2025 - Middle East & Africa Investment Summit",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEA - Middle East & Africa Investment Summit 2025",
    description:
      "The Middle East & Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and Africa region.",
    images: [
      {
        url: "https://unite-backend-gg5m.onrender.com/uploads/mea_og_600_147ea48926.jpg",
        width: 1200,
        height: 600,
        alt: "MEA 2025 - Middle East & Africa Investment Summit",
      },
    ],
    creator: "@mea2025",
    site: "@mea2025",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mea.coinsforcollege.org",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <SiteLayout>{children}</SiteLayout>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
