import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProvider from "@/components/session-provider";
import LenisScroll from "@/hooks/lenis-scroll";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WaiGenie",
  description: "Your trusted AI-partner in Test Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <LenisScroll /> */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
