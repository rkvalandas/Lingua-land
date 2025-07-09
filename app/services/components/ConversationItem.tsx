"use client";

import { useState } from "react";
import { ConversationSummary } from "../hooks/useConversationManager";
import ConversationIcon from "./icons/ConversationIcon";

interface ConversationItemProps {
  conversation: ConversationSummary;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateTitle: (language: string, newTitle: string) => Promise<boolean>;
  onShowOptions: (conversation: ConversationSummary) => void;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onSelect,
  onUpdateTitle,
  onShowOptions,
}: ConversationItemProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);

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

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowOptions(conversation);
  };

  return (
    <div
      className={`relative w-full rounded-2xl transition-all duration-300 group ${
        isSelected
          ? "bg-gradient-to-r from-amber-200/95 via-amber-100/95 to-amber-200/95 dark:from-amber-700/95 dark:via-amber-600/95 dark:to-amber-700/95 shadow-lg"
          : "hover:bg-gradient-to-r hover:from-amber-100/80 hover:via-yellow-50/80 hover:to-amber-100/80 dark:hover:from-amber-800/80 dark:hover:via-amber-700/80 dark:hover:to-amber-800/80 shadow-md hover:shadow-lg"
      }`}
      style={{
        borderRadius: "14px 10px 12px 8px",
        boxShadow: isSelected
          ? "0 6px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "0 3px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)",
        minHeight: "52px",
        border: isSelected
          ? "2px solid rgba(259,191,39,0.7)"
          : "1px solid rgba(251,191,36,0.6)",
        backdropFilter: "blur(8px)",
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
        className="flex items-center gap-3 px-4 py-3 text-left cursor-pointer touch-manipulation active:scale-95 w-full relative"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/95 to-emerald-700/95 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-400/80 dark:border-emerald-500/80">
          <ConversationIcon />
        </div>
        <div className="flex-1 min-w-0">
          {isEditingTitle ? (
            <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border-2 border-amber-400/90 dark:border-amber-600/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/90 dark:bg-slate-600/90 dark:text-amber-100 backdrop-blur-sm"
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
                  className="paper-texture px-3 py-2 text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="paper-texture px-3 py-2 text-sm bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-200 font-medium shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm font-bold truncate text-emerald-900 dark:text-white">
                {conversation.title}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 opacity-80 font-medium">
                {conversation.language}
              </div>
            </>
          )}
        </div>

        {/* Options button - separate from the main clickable area */}
        {!isEditingTitle && (
          <button
            onClick={handleOptionsClick}
            className="flex-shrink-0 p-2 rounded-lg opacity-60 hover:opacity-100 hover:bg-emerald-200/50 dark:hover:bg-emerald-700/50 transition-all duration-200"
            aria-label="Conversation options"
            title="More options"
          >
            <svg
              className="w-4 h-4 text-emerald-700 dark:text-emerald-300"
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

        {/* Subtle shine effect for selected item */}
        {isSelected && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 pointer-events-none"
            style={{ borderRadius: "14px 10px 12px 8px" }}
          />
        )}
      </div>
    </div>
  );
}
