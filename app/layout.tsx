import type { Metadata } from "next";
import { Geist, Geist_Mono, Pangolin } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AuthProvider } from "./contexts/AuthContext";
import PageLoader from "./components/PageLoader";
import { metadata } from "./metadata"; // Import our custom metadata

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Initialize the Unkempt font
const unkemptFont = Pangolin({
  weight: "400",
  variable: "--font-pangolin",
  subsets: ["latin"],
});

// Export our custom metadata to be used by Next.js
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unkemptFont.variable} antialiased`}
      >
        <AuthProvider>
          <LoadingProvider>
            <PageLoader />
            {children}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
