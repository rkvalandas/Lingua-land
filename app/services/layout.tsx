"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import SVGFilters from "../components/SVGFilters";
import ParticleBackground from "../components/ParticleBackground";
import { useConversationManager } from "./hooks/useConversationManager";

interface ServicesLayoutProps {
  children: ReactNode;
}

// Service configuration
const services = [
  {
    id: "grammar",
    name: "Grammar Checker",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "translator",
    name: "Translator",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    ),
  },
  {
    id: "summariser",
    name: "Summariser",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "paraphraser",
    name: "Paraphraser",
    icon: ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
      <svg
        className={isCollapsed ? "w-10 h-10" : "w-5 h-5"}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];

// Icons
const ConversationIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("conversation");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize conversation manager for sidebar conversations list
  const { conversations, isLoading: isLoadingConversations } =
    useConversationManager();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsMobileMenuOpen(false); // Close mobile menu when service is selected
    // Pass the service change to children via URL params or context if needed
    const url = new URL(window.location.href);
    url.searchParams.set("service", serviceId);
    window.history.replaceState({}, "", url.toString());
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsMobileMenuOpen(false); // Close mobile menu when language is selected
    // Pass the language change to children via URL params or context if needed
    const url = new URL(window.location.href);
    url.searchParams.set("language", language);
    window.history.replaceState({}, "", url.toString());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50/50 dark:bg-indigo-900/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-800 dark:text-yellow-200 font-handwriting text-lg">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden relative bg-amber-50/50 dark:bg-indigo-900/50 flex">
      <SVGFilters />
      <ParticleBackground />

      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-yellow-200/95 dark:bg-yellow-800/95 backdrop-blur-md border-b border-amber-400 dark:border-amber-500 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <img
              src="/icon.png"
              alt="Lingua Land"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg font-handwriting text-emerald-800 dark:text-emerald-200">
            Lingua Land
          </h1>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 bg-amber-300 dark:bg-amber-600 rounded-lg hover:bg-amber-400 dark:hover:bg-amber-500 transition-all duration-300 flex items-center justify-center text-emerald-800 dark:text-emerald-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar with enhanced mobile support */}
      <div
        className={`
        fixed top-0 left-0 h-screen bg-yellow-200/95 dark:bg-yellow-800/95 
        backdrop-blur-md border-r border-amber-400 dark:border-amber-500
        transform transition-transform duration-300 ease-in-out z-50 flex flex-col
        ${sidebarCollapsed ? "w-16" : "w-80"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:block lg:transform-none
      `}
        style={{
          boxShadow: "6px 6px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Collapse/Expand Button - Only visible on desktop */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`
          hidden lg:flex absolute top-14 -right-4 z-10 w-8 h-8 bg-amber-300 dark:bg-amber-600 
          rounded-full hover:bg-amber-400 dark:hover:bg-amber-500 
          transition-all duration-300 items-center justify-center
          text-emerald-800 dark:text-emerald-200 border-2 border-amber-500 dark:border-amber-400
          shadow-lg hover:shadow-xl
        `}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            boxShadow: "3px 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={sidebarCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
            />
          </svg>
        </button>
        {/* Sidebar Header */}
        <div className="flex items-center p-4 border-b border-amber-400 dark:border-amber-500 flex-shrink-0">
          {!sidebarCollapsed || window.innerWidth < 1024 ? (
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-10 h-10 flex-shrink-0">
                <img
                  src="/icon.png"
                  alt="Lingua Land"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1
                className="text-xl font-handwriting text-emerald-800 dark:text-emerald-200"
                style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
              >
                Lingua Land
              </h1>
            </div>
          ) : (
            <div className="flex-1 flex justify-center">
              <div className="relative w-10 h-10">
                <img
                  src="/icon.png"
                  alt="Lingua Land"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Content - Scrollable with bottom padding for user section */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-24">
          {/* Services Section */}
          <div className="p-2 pb-2">
            {(!sidebarCollapsed || window.innerWidth < 1024) && (
              <h2
                className="text-lg font-handwriting text-emerald-800 dark:text-emerald-200 mb-3 transform rotate-[-0.2deg]"
                style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
              >
                AI Services
              </h2>
            )}

            <nav className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceChange(service.id)}
                  className={`w-full flex items-center ${
                    sidebarCollapsed && window.innerWidth >= 1024
                      ? "justify-center px-2 py-2"
                      : "gap-3 px-3 py-3"
                  } rounded-xl transition-all duration-200 text-left group touch-manipulation ${
                    selectedService === service.id
                      ? "bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-white scale-[1.02]"
                      : "text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-800/25 hover:scale-[1.01] active:scale-95"
                  }`}
                  title={
                    sidebarCollapsed && window.innerWidth >= 1024
                      ? service.name
                      : undefined
                  }
                  style={{
                    borderRadius: "15px 8px 12px 10px",
                    border:
                      selectedService === service.id
                        ? "2px solid #10b981"
                        : "1px solid transparent",
                    boxShadow:
                      selectedService === service.id
                        ? "4px 4px 8px rgba(0,0,0,0.1)"
                        : "2px 2px 4px rgba(0,0,0,0.05)",
                    minHeight: "48px", // Better touch targets on mobile
                  }}
                >
                  <service.icon
                    isCollapsed={sidebarCollapsed && window.innerWidth >= 1024}
                  />
                  {(!sidebarCollapsed || window.innerWidth < 1024) && (
                    <span className="truncate font-medium">{service.name}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Conversations Section - Always visible when sidebar is expanded */}
          {(!sidebarCollapsed || window.innerWidth < 1024) && (
            <div className="px-4 pb-4">
              <div className="border-t border-amber-300 dark:border-amber-600 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-md font-handwriting text-emerald-800 dark:text-emerald-200 transform rotate-[-0.2deg]">
                    Conversations
                  </h3>
                  <button
                    onClick={() => {
                      handleServiceChange("conversation");
                      handleLanguageChange("English");
                    }}
                    className="text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-800 dark:text-white px-3 py-1.5 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-600 transition-all duration-200 font-medium shadow-sm active:scale-95 touch-manipulation"
                    title="Start new conversation"
                    style={{
                      borderRadius: "8px 4px 6px 5px",
                      minHeight: "32px",
                    }}
                  >
                    + New
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {isLoadingConversations ? (
                    <div className="text-sm text-emerald-700 dark:text-emerald-300 text-center py-4">
                      <div className="animate-pulse">
                        Loading conversations...
                      </div>
                    </div>
                  ) : conversations.length > 0 ? (
                    conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => {
                          handleServiceChange("conversation");
                          handleLanguageChange(conv.language);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group touch-manipulation active:scale-95 ${
                          selectedService === "conversation" &&
                          selectedLanguage === conv.language
                            ? "bg-blue-200 dark:bg-blue-700 text-emerald-800 dark:text-white"
                            : "text-emerald-800 dark:text-emerald-200 hover:bg-blue-100 dark:hover:bg-blue-800/25"
                        }`}
                        style={{
                          borderRadius: "12px 6px 8px 7px",
                          boxShadow: "1px 1px 3px rgba(0,0,0,0.05)",
                          minHeight: "48px", // Better touch targets
                        }}
                      >
                        <ConversationIcon />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {conv.title}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-300 opacity-80">
                            {conv.language}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-sm text-emerald-700 dark:text-emerald-300 italic text-center py-4 px-2">
                      <div className="opacity-70">
                        No conversations yet.
                        <br />
                        Click "+ New" to start chatting!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Section - Absolutely positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-amber-400 dark:border-amber-500 bg-yellow-100/95 dark:bg-yellow-800/95 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-xl 
                hover:bg-purple-100 dark:hover:bg-purple-800/30 
                transition-all duration-200 group touch-manipulation active:scale-95
                ${
                  sidebarCollapsed && window.innerWidth >= 1024
                    ? "justify-center"
                    : ""
                }
              `}
              title={
                sidebarCollapsed && window.innerWidth >= 1024
                  ? user.username
                  : undefined
              }
              style={{
                borderRadius: "15px 8px 12px 10px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
                minHeight: "56px", // Better touch target
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <UserIcon />
              </div>
              {(!sidebarCollapsed || window.innerWidth < 1024) && (
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-emerald-800 dark:text-emerald-200 truncate text-sm">
                    {user.username}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-300 truncate opacity-80">
                    {user.email}
                  </div>
                </div>
              )}
              {(!sidebarCollapsed || window.innerWidth < 1024) && (
                <svg
                  className="w-4 h-4 text-emerald-600 dark:text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>

            {/* User Dropdown */}
            {showUserDropdown &&
              (!sidebarCollapsed || window.innerWidth < 1024) && (
                <div
                  className="absolute bottom-full left-0 right-0 mb-3 bg-yellow-100/95 dark:bg-yellow-800/95 backdrop-blur-sm shadow-xl border-2 border-amber-400 dark:border-amber-500 overflow-hidden"
                  style={{
                    boxShadow: "0 -8px 25px rgba(0,0,0,0.15)",
                    borderRadius: "12px 6px 8px 7px",
                  }}
                >
                  <div className="py-1">
                    <button className="w-full px-4 py-3 text-left hover:bg-emerald-100 dark:hover:bg-emerald-800/25 transition-colors flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-sm touch-manipulation active:scale-95">
                      <SettingsIcon />
                      Settings
                    </button>
                    <div className="border-t border-amber-300 dark:border-amber-600 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-100 dark:hover:bg-red-900/25 transition-colors flex items-center gap-3 text-red-600 dark:text-red-400 text-sm touch-manipulation active:scale-95"
                    >
                      <LogoutIcon />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Main Content Area with mobile padding */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden pt-16 lg:pt-0">
        {children}
      </div>

      {/* Click outside to close dropdown and mobile menu */}
      {(showUserDropdown || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowUserDropdown(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}
