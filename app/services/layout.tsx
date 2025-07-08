"use client";

import { useState, useEffect, ReactNode, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import {
  useConversationManager,
  ConversationSummary,
} from "./hooks/useConversationManager";
import NewConversationModal from "./components/NewConversationModal";
import ConversationOptionsModal from "./components/ConversationOptionsModal";
import MobileHeader from "./components/MobileHeader";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "./components/LoadingScreen";

interface ServicesLayoutProps {
  children: ReactNode;
}

function ServicesLayoutContent({ children }: ServicesLayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState("conversation");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNewConversationModal, setShowNewConversationModal] =
    useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showOptionsPopup, setShowOptionsPopup] = useState(false);
  const [selectedConversationForOptions, setSelectedConversationForOptions] =
    useState<ConversationSummary | null>(null);

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
    setShowServicesDropdown(false);
    setIsMobileMenuOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("service", serviceId);
    window.history.replaceState({}, "", url.toString());
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsMobileMenuOpen(false);
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

  const handleShowOptions = (conversation: ConversationSummary) => {
    setSelectedConversationForOptions(conversation);
    setShowOptionsPopup(true);
  };

  const handleEditTitle = (newTitle: string) => {
    if (selectedConversationForOptions && newTitle.trim()) {
      setShowOptionsPopup(false);
      updateConversationTitle(
        selectedConversationForOptions.language,
        newTitle.trim()
      );
    }
  };

  const handleDeleteConversation = async () => {
    if (selectedConversationForOptions) {
      await deleteConversation(selectedConversationForOptions.language);
      setShowOptionsPopup(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden relative bg-amber-50/50 dark:bg-indigo-900/50 flex">
      <ParticleBackground />

      {/* Mobile Header */}
      <MobileHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        selectedService={selectedService}
        selectedLanguage={selectedLanguage}
        conversations={conversations}
        isLoadingConversations={isLoadingConversations}
        showServicesDropdown={showServicesDropdown}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onServiceChange={handleServiceChange}
        onLanguageChange={handleLanguageChange}
        onToggleServicesDropdown={() =>
          setShowServicesDropdown(!showServicesDropdown)
        }
        onNewConversation={() => setShowNewConversationModal(true)}
        onUpdateTitle={updateConversationTitle}
        onShowOptions={handleShowOptions}
        onLogout={handleLogout}
      />

      {/* Main Content Area with mobile padding */}
      <div className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden pt-16 lg:pt-0">
        {children}
      </div>

      {/* Click outside to close dropdown and mobile menu */}
      {(isMobileMenuOpen || showServicesDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setShowServicesDropdown(false);
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

      {/* Conversation Options Modal */}
      <ConversationOptionsModal
        isOpen={showOptionsPopup}
        conversation={selectedConversationForOptions}
        onClose={() => setShowOptionsPopup(false)}
        onEditTitle={handleEditTitle}
        onDeleteConversation={handleDeleteConversation}
      />
    </div>
  );
}

// Export the default component with Suspense
export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ServicesLayoutContent>{children}</ServicesLayoutContent>
    </Suspense>
  );
}
