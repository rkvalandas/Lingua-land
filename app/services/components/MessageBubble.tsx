import { AIMessage, ConversationMessage } from "../types";

interface MessageBubbleProps {
  message: ConversationMessage | AIMessage;
  playMessageAudio: (message: AIMessage) => void;
}

export default function MessageBubble({ message, playMessageAudio }: MessageBubbleProps) {
  return (
    <div
      className={`mb-3 sm:mb-5 p-3 sm:p-4 ${
        message.type === "user"
          ? "bg-teal-50/80 dark:bg-orange-800/40 border-2 border-amber-300 dark:border-yellow-500 ml-4 sm:ml-12 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl rounded-tl-xl rounded-br-xl transform rotate-[0.3deg]"
          : "bg-amber-50/80 dark:bg-amber-900/40 border-2 border-amber-300 dark:border-yellow-500 mr-4 sm:mr-12 rounded-tl-2xl sm:rounded-tl-3xl rounded-br-2xl sm:rounded-br-3xl rounded-tr-xl rounded-bl-xl transform rotate-[-0.3deg]"
      }`}
      style={{ boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.05)" }}
    >
      <p className="font-handwriting font-semibold mb-1 sm:mb-2 text-emerald-800 dark:text-emerald-200 text-sm sm:text-base">
        {message.type === "user" ? "You" : "Spirit Guide"}
      </p>
      <p className="font-handwriting text-emerald-700 dark:text-emerald-100 text-sm sm:text-base leading-relaxed break-words">
        {message.text}
      </p>
      {message.type === "ai" && message.audio && (
        <button
          onClick={() => message.type === "ai" && playMessageAudio(message)}
          className="mt-3 px-3 py-1 text-sm bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 font-handwriting flex items-center border border-amber-300 dark:border-amber-600 rounded-xl transform hover:scale-105 transition-all"
          style={{ boxShadow: "1px 1px 0 rgba(146, 64, 14, 0.2)" }}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
          Listen Again
        </button>
      )}
    </div>
  );
}