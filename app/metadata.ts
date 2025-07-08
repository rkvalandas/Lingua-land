import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lingua Land - AI Language Learning Companion",
  description:
    "Immerse yourself in a magical language learning journey with our AI companion that adapts to your skill level.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://lingualand.app"
  ),
  keywords: [
    "language learning",
    "AI companion",
    "language practice",
    "immersive learning",
  ],
  // Add icons configuration for the tab icon
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Lingua Land - Begin Your Magical Language Journey",
    description:
      "Learn languages through immersive AI-guided conversations that adapt to your skill level.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lingua Land - AI Language Learning",
      },
    ],
  },
};
