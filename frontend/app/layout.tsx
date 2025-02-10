import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import SessionProvider from "@/components/session-provider";
// import { ThemeProvider } from "@/components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WaiGenie",
  description: "Your AI Assistant",
  icons: {
    icon: "/logo.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <SessionProvider>
            {children}
          </SessionProvider>
          <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
