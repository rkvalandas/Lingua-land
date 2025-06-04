import React, { useState } from "react";
import {
  useConversationManager,
  ConversationSummary,
} from "../hooks/useConversationManager";

interface ConversationSidebarProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ConversationSidebar({
  selectedLanguage,
  onLanguageChange,
  isOpen,
  onToggle,
}: ConversationSidebarProps) {
  const {
    conversations,
    isLoading,
    deleteConversation,
    updateConversationTitle,
  } = useConversationManager();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEditTitle = (conversation: ConversationSummary) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const handleSaveTitle = async (language: string) => {
    if (editTitle.trim()) {
      const success = await updateConversationTitle(language, editTitle.trim());
      if (success) {
        setEditingId(null);
        setEditTitle("");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleDeleteConversation = async (language: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete your ${language} conversation? This action cannot be undone.`
      )
    ) {
      const success = await deleteConversation(language);
      if (success && language === selectedLanguage) {
        // If we deleted the currently selected conversation, we need to switch to another one or clear
        const remainingConversations = conversations.filter(
          (c) => c.language !== language
        );
        if (remainingConversations.length > 0) {
          onLanguageChange(remainingConversations[0].language);
        }
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-80 bg-white/95 dark:bg-slate-800/95 
        backdrop-blur-md border-r border-emerald-200 dark:border-emerald-700
        transform transition-transform duration-300 ease-in-out z-50 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:block lg:transform-none
        ${!isOpen ? "lg:hidden" : ""}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-200 dark:border-emerald-700 flex-shrink-0">
          <h2 className="text-lg font-handwriting text-emerald-800 dark:text-emerald-200">
            Your Conversations
          </h2>
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-emerald-700 dark:text-emerald-300"
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

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-emerald-600 dark:text-emerald-400">
              <p className="font-handwriting text-lg mb-2">
                No conversations yet!
              </p>
              <p className="text-sm">
                Start practicing in any language to create your first
                conversation.
              </p>
            </div>
          ) : (
            <div className="p-2">
              {conversations
                .sort(
                  (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
                )
                .map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`
                    mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200
                    border-2 ${
                      conversation.language === selectedLanguage
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-md"
                        : "border-transparent bg-white/50 dark:bg-slate-700/50 hover:bg-emerald-50/70 dark:hover:bg-emerald-900/20"
                    }
                  `}
                    onClick={() => {
                      if (editingId !== conversation.id) {
                        onLanguageChange(conversation.language);
                        if (window.innerWidth < 1024) {
                          onToggle(); // Close sidebar on mobile after selection
                        }
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                        {conversation.language}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTitle(conversation);
                          }}
                          className="p-1 rounded hover:bg-emerald-200 dark:hover:bg-emerald-700 transition-colors"
                          title="Edit title"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.language);
                          }}
                          className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                          title="Delete conversation"
                        >
                          <svg
                            className="w-4 h-4 text-red-600 dark:text-red-400"
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
                        </button>
                      </div>
                    </div>

                    {editingId === conversation.id ? (
                      <div
                        className="space-y-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-600 dark:border-emerald-600 dark:text-emerald-100"
                          placeholder="Enter conversation title"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveTitle(conversation.language);
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleSaveTitle(conversation.language)
                            }
                            className="px-2 py-1 text-xs bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 font-handwriting mb-1">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          {formatDate(conversation.updated_at)}
                        </p>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
