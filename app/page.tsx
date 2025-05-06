import { Suspense } from "react";

// Static components
import StructuredData from "./components/StructuredData";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import LanguagesSection from "./components/LanguagesSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import SVGFilters from "./components/SVGFilters";

// Import the client components wrapper
import {
  ClientNavigation,
  ClientParticleBackground,
  AnimatedSection,
} from "./components/ClientComponents";

// Image paths
const characterIllustration = "/character-illustration.png";
const background = "/background.png";
const logo = "/icon.png";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden relative bg-amber-50/50 dark:bg-indigo-900/50">
      {/* Structured Data for SEO */}
      <StructuredData />

      {/* Background with particles - Now using the client component */}
      <ClientParticleBackground backgroundImage={background} />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 flex flex-col items-center min-h-screen">
        {/* Navigation - Now using the client component */}
        <ClientNavigation logo={logo} />

        {/* Main content wrapper */}
        <div className="w-full flex-grow flex flex-col">
          {/* Hero Section with fade-in animation */}
          <AnimatedSection>
            <HeroSection characterImage={characterIllustration} />
          </AnimatedSection>

          {/* Features Section with staggered animation */}
          <AnimatedSection>
            <FeaturesSection />
          </AnimatedSection>

          {/* Languages Section with slide-in animation */}
          <AnimatedSection>
            <LanguagesSection />
          </AnimatedSection>

          {/* CTA Section with scale-in animation */}
          <AnimatedSection>
            <CtaSection />
          </AnimatedSection>
        </div>

        {/* Footer with fade-up animation - Outside the flex-grow container to ensure visibility */}
        <Footer />

        <SVGFilters />
      </div>
    </div>
  );
}
