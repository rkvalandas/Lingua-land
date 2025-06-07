"use client";

import React, { useState } from "react";
import { languages } from "../data/languages";

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (title: string, language: string) => Promise<void>;
  isCreating: boolean;
}

export default function NewConversationModal({
  isOpen,
  onClose,
  onCreateConversation,
  isCreating,
}: NewConversationModalProps) {
  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedLanguage) {
      await onCreateConversation(title.trim(), selectedLanguage);
      setTitle("");
      setSelectedLanguage("English");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    setSelectedLanguage("English");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div 
        className="bg-yellow-100/95 dark:bg-yellow-800/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md transform transition-all border-2 border-amber-400 dark:border-amber-500"
        style={{
          borderRadius: "20px 12px 16px 14px",
          boxShadow: "8px 8px 20px rgba(0,0,0,0.2)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-300 dark:border-amber-600">
          <h2 className="text-xl font-handwriting text-emerald-800 dark:text-emerald-200">
            Create New Conversation
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
            aria-label="Close modal"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="conversation-title"
              className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
            >
              Conversation Title
            </label>
            <input
              id="conversation-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Daily Practice, Business Conversations, Travel"
              className="w-full px-4 py-3 border border-amber-300 dark:border-amber-600 rounded-lg 
                       bg-yellow-50/80 dark:bg-yellow-700/50 text-emerald-900 dark:text-emerald-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       placeholder-emerald-600 dark:placeholder-emerald-400"
              style={{
                borderRadius: "12px 6px 8px 7px"
              }}
              required
              autoFocus
            />
          </div>

          {/* Language Selector */}
          <div>
            <label
              htmlFor="conversation-language"
              className="block text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
            >
              Practice Language
            </label>
            <select
              id="conversation-language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 dark:border-amber-600 rounded-lg 
                       bg-yellow-50/80 dark:bg-yellow-700/50 text-emerald-900 dark:text-emerald-100
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              style={{
                borderRadius: "12px 6px 8px 7px"
              }}
              required
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-amber-300 dark:border-amber-600 
                       text-emerald-700 dark:text-emerald-300 rounded-lg
                       hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors
                       font-medium"
              style={{
                borderRadius: "10px 5px 7px 6px"
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isCreating}
              className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 
                       disabled:bg-emerald-400 disabled:cursor-not-allowed
                       text-white rounded-lg transition-colors font-medium
                       flex items-center justify-center gap-2"
              style={{
                borderRadius: "10px 5px 7px 6px"
              }}
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Conversation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
