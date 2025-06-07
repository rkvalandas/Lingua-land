import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export interface ConversationSummary {
  id: number;
  language: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export function useConversationManager() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  // Load all conversations for the user
  const loadConversations = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/conversation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      } else {
        console.log("No conversations found");
        setConversations([]);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new conversation
  const createNewConversation = async (
    title: string,
    language: string
  ): Promise<boolean> => {
    if (!token) return false;

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/conversation/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, language }),
      });

      if (response.ok) {
        // Reload conversations to get the updated list
        await loadConversations();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to create new conversation:", error);
      return false;
    }
  };

  // Delete a conversation by language
  const deleteConversation = async (language: string): Promise<boolean> => {
    console.log("deleteConversation called with language:", language);
    if (!token) {
      console.error("No token available for deletion");
      return false;
    }

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const url = `${API_BASE_URL}/api/conversation/${encodeURIComponent(language)}`;
      console.log("Making DELETE request to:", url);
      
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Delete response status:", response.status);
      
      if (response.ok) {
        console.log("Delete request successful, updating local state");
        // Remove from local state
        setConversations((prev) => {
          const updated = prev.filter((conv) => conv.language !== language);
          console.log("Updated conversations list:", updated);
          return updated;
        });
        return true;
      } else {
        const errorText = await response.text();
        console.error("Delete request failed:", response.status, errorText);
        return false;
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      return false;
    }
  };

  // Update conversation title
  const updateConversationTitle = async (
    language: string,
    newTitle: string
  ): Promise<boolean> => {
    if (!token) return false;

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(
        `${API_BASE_URL}/api/conversation/${encodeURIComponent(
          language
        )}/title`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (response.ok) {
        // Update local state
        setConversations((prev) =>
          prev.map((conv) =>
            conv.language === language
              ? {
                  ...conv,
                  title: newTitle,
                  updated_at: new Date().toISOString(),
                }
              : conv
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to update conversation title:", error);
      return false;
    }
  };

  // Check if a conversation exists for a language
  const hasConversation = (language: string): boolean => {
    return conversations.some((conv) => conv.language === language);
  };

  // Get conversation by language
  const getConversation = (
    language: string
  ): ConversationSummary | undefined => {
    return conversations.find((conv) => conv.language === language);
  };

  // Load conversations when token becomes available
  useEffect(() => {
    if (token) {
      loadConversations();
    } else {
      setConversations([]);
    }
  }, [token]);

  return {
    conversations,
    isLoading,
    loadConversations,
    createNewConversation,
    deleteConversation,
    updateConversationTitle,
    hasConversation,
    getConversation,
  };
}
