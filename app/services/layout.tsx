"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import {
  useConversationManager,
  ConversationSummary,
} from "./hooks/useConversationManager";
import NewConversationModal from "./components/NewConversationModal";

interface ServicesLayoutProps {
  children: ReactNode;
}

// Conversation Item component to handle individual conversation with options dropdown
interface ConversationItemProps {
  conversation: ConversationSummary;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (language: string) => Promise<boolean>;
  onUpdateTitle: (language: string, newTitle: string) => Promise<boolean>;
}

function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  onDelete,
  onUpdateTitle,
}: ConversationItemProps) {
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setEditTitle(conversation.title);
    setShowOptionsPopup(false);
  };

  const handleSaveTitle = async () => {
    if (editTitle.trim()) {
      const success = await onUpdateTitle(
        conversation.language,
        editTitle.trim()
      );
      if (success) {
        setIsEditingTitle(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setEditTitle(conversation.title);
  };

  const handleDeleteConversation = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${conversation.title}"? This action cannot be undone.`
      )
    ) {
      await onDelete(conversation.language);
    }
    setShowOptionsPopup(false);
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptionsPopup(!showOptionsPopup);
  };

  return (
    <div
      className={`relative w-full rounded-lg transition-all duration-200 group ${
        isSelected
          ? "bg-emerald-200 dark:bg-emerald-700"
          : "hover:bg-emerald-100 dark:hover:bg-emerald-800/25"
      }`}
      style={{
        borderRadius: "12px 6px 8px 7px",
        boxShadow: "1px 1px 3px rgba(0,0,0,0.05)",
        minHeight: "48px",
      }}
    >
      {/* Main conversation area - clickable div instead of button */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Select conversation: ${conversation.title}`}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className="flex items-center gap-3 px-3 py-2.5 text-left cursor-pointer touch-manipulation active:scale-95 w-full"
      >
        <ConversationIcon />
        <div className="flex-1 min-w-0">
          {isEditingTitle ? (
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-600 dark:border-emerald-600 dark:text-emerald-100"
                placeholder="Enter conversation title"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveTitle();
                  } else if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveTitle}
                  className="paper-texture px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="paper-texture px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm font-medium truncate text-emerald-800 dark:text-white">
                {conversation.title}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 opacity-80">
                {conversation.language}
              </div>
            </>
          )}
        </div>

        {/* Options button - separate from the main clickable area */}
        {!isEditingTitle && (
          <button
            onClick={handleOptionsClick}
            className="flex-shrink-0 p-1.5 rounded-md opacity-100"
            aria-label="Conversation options"
            title="More options"
          >
            <svg
              className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Options popup modal */}
      {showOptionsPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all border-2 border-gray-200 dark:border-gray-600"
            style={{
              borderRadius: "16px 10px 14px 12px",
              boxShadow: "8px 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Conversation Options
              </h3>
              <button
                onClick={() => setShowOptionsPopup(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-500 dark:text-gray-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <div className="mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Current conversation:
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {conversation.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {conversation.language}
                </div>
              </div>

              <button
                onClick={handleEditTitle}
                className="w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Title
              </button>

              <button
                onClick={handleDeleteConversation}
                className="w-full px-4 py-3 text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/25 transition-colors flex items-center gap-3 text-red-600 dark:text-red-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
    className="w-4 h-4 flex-shrink-0 text-emerald-800 dark:text-emerald-200"
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
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState("conversation");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNewConversationModal, setShowNewConversationModal] =
    useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  // Initialize conversation manager for sidebar conversations list
  const {
    conversations,
    isLoading: isLoadingConversations,
    createNewConversation,
    deleteConversation,
    updateConversationTitle,
  } = useConversationManager();

  // Check for new conversation parameter and show modal
  useEffect(() => {
    const shouldShowNewModal = searchParams.get("new") === "true";
    if (shouldShowNewModal) {
      setShowNewConversationModal(true);
      // Remove the 'new' parameter from URL after showing modal
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("new");
      const newUrl = newParams.toString()
        ? `${window.location.pathname}?${newParams.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

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

  const handleCreateNewConversation = async (
    title: string,
    language: string
  ) => {
    setIsCreatingConversation(true);
    try {
      const success = await createNewConversation(title, language);
      if (success) {
        // Switch to the new conversation
        handleServiceChange("conversation");
        handleLanguageChange(language);
        setShowNewConversationModal(false);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setIsCreatingConversation(false);
    }
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
                    onClick={() => setShowNewConversationModal(true)}
                    className="paper-texture text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-800 dark:text-white px-3 py-1.5 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-600 transition-all duration-200 font-medium shadow-sm active:scale-95 touch-manipulation"
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
                      <ConversationItem
                        key={conv.id}
                        conversation={conv}
                        isSelected={
                          selectedService === "conversation" &&
                          selectedLanguage === conv.language
                        }
                        onSelect={() => {
                          handleServiceChange("conversation");
                          handleLanguageChange(conv.language);
                        }}
                        onDelete={deleteConversation}
                        onUpdateTitle={updateConversationTitle}
                      />
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

      {/* New Conversation Modal */}
      <NewConversationModal
        isOpen={showNewConversationModal}
        onClose={() => setShowNewConversationModal(false)}
        onCreateConversation={handleCreateNewConversation}
        isCreating={isCreatingConversation}
      />
    </div>
  );
}
