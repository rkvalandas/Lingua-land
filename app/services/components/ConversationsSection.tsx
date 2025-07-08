"use client";

import ConversationItem from "./ConversationItem";
import { ConversationSummary } from "../hooks/useConversationManager";

interface ConversationsSectionProps {
  conversations: ConversationSummary[];
  isLoadingConversations: boolean;
  selectedService: string;
  selectedLanguage: string;
  sidebarCollapsed: boolean;
  onNewConversation: () => void;
  onServiceChange: (serviceId: string) => void;
  onLanguageChange: (language: string) => void;
  onUpdateTitle: (language: string, newTitle: string) => Promise<boolean>;
  onShowOptions: (conversation: ConversationSummary) => void;
}

export default function ConversationsSection({
  conversations,
  isLoadingConversations,
  selectedService,
  selectedLanguage,
  sidebarCollapsed,
  onNewConversation,
  onServiceChange,
  onLanguageChange,
  onUpdateTitle,
  onShowOptions,
}: ConversationsSectionProps) {
  return (
    <>
      {(!sidebarCollapsed || window.innerWidth < 1024) && (
        <div className="h-full flex flex-col px-3 pb-4">
          <div className="border-t-2 border-amber-300/50 dark:border-amber-600/50 pt-6 mt-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3
                className="text-lg font-handwriting text-emerald-800 dark:text-emerald-100 transform rotate-[-0.3deg] font-bold"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
                }}
              >
                💬 Conversations
              </h3>
              <button
                onClick={onNewConversation}
                className="paper-texture text-sm bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-emerald-700 dark:to-emerald-600 text-emerald-900 dark:text-white px-4 py-2 rounded-xl hover:from-emerald-300 hover:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl active:scale-95 touch-manipulation"
                title="Start new conversation"
                style={{
                  borderRadius: "12px 8px 10px 6px",
                  minHeight: "36px",
                  border: "1px solid rgba(16,185,129,0.2)",
                  boxShadow:
                    "0 4px 12px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                ✨ New
              </button>
            </div>

            <div
              className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-600 scrollbar-track-transparent pb-72 px-1"
              style={{
                height: "400px",
                minHeight: "200px",
              }}
            >
              {isLoadingConversations ? (
                <div className="text-sm text-emerald-700 dark:text-emerald-300 text-center py-6">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">
                      Loading conversations...
                    </span>
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
                      onServiceChange("conversation");
                      onLanguageChange(conv.language);
                    }}
                    onUpdateTitle={onUpdateTitle}
                    onShowOptions={onShowOptions}
                  />
                ))
              ) : (
                <div className="text-sm text-emerald-700 dark:text-emerald-300 italic text-center py-8 px-4">
                  <div
                    className="opacity-80 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-700/50"
                    style={{ borderRadius: "12px 8px 10px 6px" }}
                  >
                    <div className="text-2xl mb-2">💭</div>
                    <div className="font-medium">No conversations yet</div>
                    <div className="text-xs mt-1 opacity-70">
                      Click &ldquo;✨ New&rdquo; to start chatting!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
