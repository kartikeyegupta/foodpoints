import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Duke Food Points Calculator",
  description: "An easier way for Duke Students to see how ahead or behind they are in food points. Created by Kartikeye (Tiki) Gupta.",
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
        {children}
      </body>
    </html>
  );
}

// Declare the gtag function globally to prevent TypeScript errors
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function initializeGoogleAnalytics(trackingId: string): void {
  // Ensure `dataLayer` is initialized
  window.dataLayer = window.dataLayer || [];
  
  // Define the `gtag` function
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Load the gtag.js script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize gtag with the provided tracking ID
  window.gtag('js', new Date());
  window.gtag('config', trackingId);
}

// Call the function to initialize Google Analytics
initializeGoogleAnalytics('G-ZZDL47J2LN');

