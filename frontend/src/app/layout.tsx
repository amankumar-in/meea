// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import SiteLayout from "@/components/layout/SiteLayout";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEEA - Middle East & East Africa Investment Summit 2025",
  description:
    "The Middle East & East Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and East Africa region.",
  keywords: [
    "Middle East",
    "East Africa",
    "Investment",
    "Summit",
    "International Collaboration",
  ],
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    title: "MEEA 2025",
    capable: true,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "MEEA - Middle East & East Africa Investment Summit 2025",
    description:
      "The Middle East & East Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and East Africa region.",
    type: "website",
    siteName: "MEEA 2025",
    images: [
      {
        url: "https://unite-backend-gg5m.onrender.com/uploads/og_image1_eb1ac92835.jpg",
        width: 1200,
        height: 630,
        alt: "MEEA 2025 - Middle East & East Africa Investment Summit",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEEA - Middle East & East Africa Investment Summit 2025",
    description:
      "The Middle East & East Africa Investment Summit 2025 is a platform for investors, policymakers, and industry leaders to discuss the latest trends and opportunities in the Middle East and East Africa region.",
    images: [
      {
        url: "https://unite-backend-gg5m.onrender.com/uploads/og_image2_f4440ac129.jpg",
        width: 1200,
        height: 600,
        alt: "MEEA 2025 - Middle East & East Africa Investment Summit",
      },
    ],
    creator: "@meea2025",
    site: "@meea2025",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://meea.coinsforcollege.org",
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
