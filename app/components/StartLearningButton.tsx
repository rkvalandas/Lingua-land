"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useConversationManager } from "../services/hooks/useConversationManager";
import { useState } from "react";

interface StartLearningButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function StartLearningButton({
  className,
  style,
  children,
}: StartLearningButtonProps) {
  const router = useRouter();
  const { token } = useAuth();
  const { conversations, loadConversations } = useConversationManager();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLearning = async () => {
    setIsLoading(true);

    try {
      // If user is not authenticated, redirect to signin
      if (!token) {
        router.push("/signin");
        return;
      }

      // Load conversations to check if user has any
      await loadConversations();

      // Check if user has any conversations
      if (conversations.length > 0) {
        // Redirect to the first conversation available
        const firstConversation = conversations[0];
        router.push(
          `/services?service=conversation&language=${encodeURIComponent(
            firstConversation.language
          )}`
        );
      } else {
        // No conversations available, redirect to services page with a flag to show "create new conversation"
        router.push("/services?service=conversation&new=true");
      }
    } catch (error) {
      console.error("Error handling start learning:", error);
      // Fallback: redirect to services page
      router.push("/services");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartLearning}
      disabled={isLoading}
      className={className}
      style={style}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
