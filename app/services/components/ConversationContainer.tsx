import { ForwardedRef, forwardRef } from "react";
import MessageBubble from "./MessageBubble";
import { AIMessage, ConversationMessage } from "../types";

interface ConversationContainerProps {
  conversation: (ConversationMessage | AIMessage)[];
  isListening: boolean;
  autoListen: boolean;
  playMessageAudio: (message: AIMessage) => void;
}

const ConversationContainer = forwardRef(function ConversationContainer(
  { conversation, isListening, autoListen, playMessageAudio }: ConversationContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div 
      ref={ref}
      className="flex-1 overflow-y-auto mb-6 rounded-2xl p-5 border-2 border-amber-400 dark:border-amber-500 transition-all duration-300 relative bg-yellow-200 dark:bg-amber-900/20"
      style={{ 
        boxShadow: "inset 0 0 20px rgba(217, 119, 6, 0.2), 3px 3px 5px rgba(0, 0, 0, 0.1)",
        maxHeight: "75vh", 
        height: "75vh",
      }}
    >
      {conversation.length === 0 && !isListening ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-center text-emerald-700 dark:text-emerald-200 font-handwriting transform rotate-[-0.5deg]">
            {autoListen
              ? "Just start speaking! The magic will begin..."
              : "✨Press the magical orb below to begin your conversation✨"}
          </p>
        </div>
      ) : (
        <div className="pb-2">
          {conversation.map((message, index) => (
            <MessageBubble 
              key={index}
              message={message}
              playMessageAudio={playMessageAudio}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ConversationContainer;