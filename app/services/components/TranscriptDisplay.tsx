interface TranscriptDisplayProps {
  transcript: string;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  autoListen: boolean;
  selectedLanguage: string;
}

export default function TranscriptDisplay({
  transcript,
  isListening,
  isSpeaking,
  isProcessing,
  autoListen,
  selectedLanguage,
}: TranscriptDisplayProps) {
  return (
    <div
      className="w-full min-h-[100px] p-5 rounded-full bg-gradient-to-br from-yellow-50/95 to-amber-50/95 dark:from-yellow-800/40 dark:to-amber-900/40 backdrop-blur-lg border-2 border-amber-300/70 dark:border-amber-400/50 transition-all duration-300 relative shadow-lg"
      style={{
        boxShadow:
          "0 8px 25px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
      }}
    >
      {transcript ? (
        <div className="backdrop-blur-sm bg-white/20 dark:bg-black/20 rounded-2xl p-4 border border-amber-300/40 dark:border-amber-400/30">
          <p className="text-emerald-800 dark:text-emerald-100 break-words font-handwriting text-lg leading-relaxed">
            {transcript}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center pt-2 h-full">
          <p
            className={`text-center font-handwriting text-lg font-medium ${
              isListening
                ? "text-blue-600 dark:text-blue-300"
                : isSpeaking
                ? "text-emerald-600 dark:text-emerald-300"
                : isProcessing
                ? "text-amber-600 dark:text-amber-300"
                : autoListen
                ? "text-purple-600 dark:text-purple-300"
                : "text-emerald-700 dark:text-emerald-300"
            } transform rotate-[-0.5deg] drop-shadow-sm`}
          >
            {isListening
              ? "The spirits are listening... speak now"
              : isSpeaking
              ? "The spirits are speaking..."
              : isProcessing
              ? "The magic is brewing..."
              : autoListen
              ? "Say something in " + selectedLanguage
              : "Touch the magical orb to speak"}
          </p>
        </div>
      )}

      {isListening && (
        <div className="absolute top-4 right-4">
          <span className="flex h-4 w-4">
            <span className="animate-ping absolute h-4 w-4 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative rounded-full h-4 w-4 bg-blue-500 shadow-lg"></span>
          </span>
        </div>
      )}
    </div>
  );
}
