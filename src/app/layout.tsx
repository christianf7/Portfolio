import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Christian Fitzgerald | Portfolio",
  description: "Christian Fitzgerald's Portfolio @ chrisfitz.dev",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} overflow-x-hidden`}>
      <body className="bg-black min-h-screen overflow-x-hidden">
        {children}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "9670fd56ca234706ae8e661de7b35e2f"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
