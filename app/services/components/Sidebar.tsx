"use client";

import Image from "next/image";
import ServicesSection from "./ServicesSection";
import ConversationsSection from "./ConversationsSection";
import UserSection from "./UserSection";
import { ChevronIcon } from "./Icons";
import { ConversationSummary } from "../hooks/useConversationManager";

interface User {
  username: string;
  email: string;
}

interface SidebarProps {
  user: User;
  sidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  selectedService: string;
  selectedLanguage: string;
  conversations: ConversationSummary[];
  isLoadingConversations: boolean;
  showServicesDropdown: boolean;
  onToggleSidebar: () => void;
  onServiceChange: (serviceId: string) => void;
  onLanguageChange: (language: string) => void;
  onToggleServicesDropdown: () => void;
  onNewConversation: () => void;
  onUpdateTitle: (language: string, newTitle: string) => Promise<boolean>;
  onShowOptions: (conversation: ConversationSummary) => void;
  onLogout: () => void;
}

export default function Sidebar({
  user,
  sidebarCollapsed,
  isMobileMenuOpen,
  selectedService,
  selectedLanguage,
  conversations,
  isLoadingConversations,
  showServicesDropdown,
  onToggleSidebar,
  onServiceChange,
  onLanguageChange,
  onToggleServicesDropdown,
  onNewConversation,
  onUpdateTitle,
  onShowOptions,
  onLogout,
}: SidebarProps) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-gradient-to-b from-amber-100/95 via-yellow-50/95 to-amber-200/95 
        dark:bg-gradient-to-b dark:from-amber-800/95 dark:via-yellow-700/95 dark:to-amber-700/95
        backdrop-blur-lg border-r-2 border-amber-400/90 dark:border-amber-600/90
        transform transition-all duration-300 ease-in-out z-50 flex flex-col
        ${sidebarCollapsed ? "w-16" : "w-80"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:block lg:transform-none
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:pointer-events-none
      `}
      style={{
        boxShadow:
          "8px 0 32px rgba(0,0,0,0.12), inset -1px 0 0 rgba(255,255,255,0.2)",
      }}
    >
      {/* Collapse/Expand Button - Only visible on desktop */}
      <button
        onClick={onToggleSidebar}
        className={`
          hidden lg:flex absolute top-12 -right-5 z-10 w-10 h-10 
          bg-gradient-to-br from-amber-200/95 to-amber-300/95 dark:from-amber-600/95 dark:to-amber-700/95
          rounded-full hover:from-amber-300/95 hover:to-amber-400/95 dark:hover:from-amber-500/95 dark:hover:to-amber-600/95
          transition-all duration-300 items-center justify-center
          text-emerald-800 dark:text-emerald-100 border-2 border-amber-400/90 dark:border-amber-500/90
          shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95
          backdrop-blur-sm
        `}
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <ChevronIcon direction={sidebarCollapsed ? "right" : "left"} />
      </button>

      {/* Sidebar Header */}
      <div className="flex items-center p-2 border-b-2 border-amber-400/90 dark:border-amber-600/90 flex-shrink-0 bg-gradient-to-r from-transparent via-white/5 to-transparent">
        {!sidebarCollapsed || window.innerWidth < 1024 ? (
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-12 h-12 flex-shrink-0 p-1 bg-gradient-to-br from-amber-200/95 to-amber-300/95 dark:from-amber-600/95 dark:to-amber-700/95 rounded-xl border border-amber-400/80 dark:border-amber-600/80 shadow-md">
              <Image
                src="/icon.png"
                alt="Lingua Land"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <h1
              className="text-2xl font-handwriting text-emerald-800 dark:text-emerald-100 font-bold tracking-wide"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.1), 0 0 8px rgba(16,185,129,0.2)",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
              }}
            >
              Lingua Land
            </h1>
          </div>
        ) : (
          <div className="flex-1 flex justify-center">
            <div className="relative w-12 h-12 p-1 bg-gradient-to-br rounded-lg">
              <Image
                src="/icon.png"
                alt="Lingua Land"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Content - Dynamic flex layout */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Services Section - Fixed height */}
        <div className="flex-shrink-0">
          <ServicesSection
            selectedService={selectedService}
            sidebarCollapsed={sidebarCollapsed}
            showServicesDropdown={showServicesDropdown}
            onServiceChange={onServiceChange}
            onToggleDropdown={onToggleServicesDropdown}
          />
        </div>

        {/* Conversations Section - Takes remaining space with scrolling */}
        <div className="flex-1 min-h-0">
          <ConversationsSection
            conversations={conversations}
            isLoadingConversations={isLoadingConversations}
            selectedService={selectedService}
            selectedLanguage={selectedLanguage}
            sidebarCollapsed={sidebarCollapsed}
            onNewConversation={onNewConversation}
            onServiceChange={onServiceChange}
            onLanguageChange={onLanguageChange}
            onUpdateTitle={onUpdateTitle}
            onShowOptions={onShowOptions}
          />
        </div>
      </div>

      {/* User Section */}
      <UserSection
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        onLogout={onLogout}
      />
    </div>
  );
}
