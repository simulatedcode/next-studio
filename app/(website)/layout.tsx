import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import SwupProvider from "@/components/SwupProvider";
import LenisProvider from "@/components/LenisProvider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIMULASI Studio",
  description: "Next.js and Sanity Powered Studio",
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black`}
      >
        <LenisProvider>
          <SwupProvider>
            <Header />
            <main id="swup" className="pt-20 swup-transition-main">
              {children}
            </main>
            <Footer />
          </SwupProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
