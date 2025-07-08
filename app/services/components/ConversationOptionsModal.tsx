"use client";

import React, { useState, useEffect } from "react";
import { ConversationSummary } from "../hooks/useConversationManager";

interface ConversationOptionsModalProps {
  isOpen: boolean;
  conversation: ConversationSummary | null;
  onClose: () => void;
  onEditTitle: (newTitle: string) => void;
  onDeleteConversation: () => void;
}

export default function ConversationOptionsModal({
  isOpen,
  conversation,
  onClose,
  onEditTitle,
  onDeleteConversation,
}: ConversationOptionsModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  // Reset editing state when modal opens/closes or conversation changes
  useEffect(() => {
    if (isOpen && conversation) {
      setEditTitle(conversation.title);
      setIsEditingTitle(false);
    }
  }, [isOpen, conversation]);

  const handleEditClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    if (editTitle.trim() && editTitle.trim() !== conversation?.title) {
      onEditTitle(editTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(conversation?.title || "");
    setIsEditingTitle(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveTitle();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  if (!isOpen || !conversation) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div
        className="bg-yellow-100/95 dark:bg-yellow-800/95 backdrop-blur-md rounded-xl shadow-xl w-full max-w-sm max-h-[75vh] overflow-y-auto transform transition-all border border-amber-400 dark:border-amber-500"
        style={{
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.2), 0 4px 15px rgba(245,158,11,0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-300/60 dark:border-amber-600/60">
          <h3 className="text-lg font-handwriting text-emerald-900 dark:text-emerald-100 font-bold">
            💬 Options
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-700/50 transition-colors flex items-center justify-center text-emerald-700 dark:text-emerald-300"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Conversation Title */}
          <div className="mb-4">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
              Conversation
            </p>
            {isEditingTitle ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full text-base text-emerald-900 dark:text-emerald-100 bg-amber-200/40 dark:bg-amber-700/40 rounded-lg px-3 py-2 border border-amber-300/40 dark:border-amber-600/40 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter conversation title..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveTitle}
                    className="flex-1 px-3 py-2 text-sm bg-emerald-300/60 dark:bg-emerald-700/60 hover:bg-emerald-400/70 dark:hover:bg-emerald-600/70 text-emerald-900 dark:text-emerald-100 rounded-lg transition-colors border border-emerald-400/40 dark:border-emerald-600/40"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-3 py-2 text-sm bg-gray-300/60 dark:bg-gray-700/60 hover:bg-gray-400/70 dark:hover:bg-gray-600/70 text-gray-900 dark:text-gray-100 rounded-lg transition-colors border border-gray-400/40 dark:border-gray-600/40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-base text-emerald-900 dark:text-emerald-100 bg-amber-200/40 dark:bg-amber-700/40 rounded-lg px-3 py-2 border border-amber-300/40 dark:border-amber-600/40">
                {conversation.title}
              </p>
            )}
          </div>

          {/* Created Date */}
          <div className="mb-5">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
              Created
            </p>
            <p className="text-base text-emerald-700 dark:text-emerald-300">
              {new Date(conversation.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isEditingTitle && (
              <button
                onClick={handleEditClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-base bg-emerald-200/60 dark:bg-emerald-700/60 hover:bg-emerald-300/70 dark:hover:bg-emerald-600/70 text-emerald-900 dark:text-emerald-100 rounded-lg transition-colors border border-emerald-300/40 dark:border-emerald-600/40"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Title
              </button>
            )}

            <button
              onClick={onDeleteConversation}
              className="w-full flex items-center gap-3 px-4 py-3 text-base bg-red-200/60 dark:bg-red-800/60 hover:bg-red-300/70 dark:hover:bg-red-700/70 text-red-900 dark:text-red-100 rounded-lg transition-colors border border-red-300/40 dark:border-red-600/40"
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Conversation
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-amber-200/30 dark:bg-amber-800/30 border-t border-amber-300/40 dark:border-amber-600/40">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm bg-amber-300/50 dark:bg-amber-700/50 hover:bg-amber-400/60 dark:hover:bg-amber-600/60 text-emerald-900 dark:text-emerald-100 rounded-lg transition-colors border border-amber-400/40 dark:border-amber-600/40"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
