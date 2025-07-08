"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Suspense,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

type LoadingContextType = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Create a wrapper component that uses the search params
function LoadingProviderContent({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle route changes
  useEffect(() => {
    setIsLoading(true);

    // Initial loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loader for at least 1.5 seconds for visual effect

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Create the main provider that wraps the content in a Suspense boundary
export function LoadingProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingProviderContent>{children}</LoadingProviderContent>
    </Suspense>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
