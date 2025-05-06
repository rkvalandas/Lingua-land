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
  selectedLanguage
}: TranscriptDisplayProps) {
  return (
    <div
      className="w-full mr-4 min-h-[100px] p-4 rounded-2xl bg-yellow-100 dark:bg-yellow-700 border-2 border-amber-400 dark:border-amber-500 transition-all duration-300 relative"
      style={{ boxShadow: "inset 0 0 15px rgba(132, 204, 22, 0.2)" }}
    >
      {transcript ? (
        <p className="text-emerald-800 dark:text-emerald-100 break-words font-handwriting">
          {transcript}
        </p>
      ) : (
        <div className="flex items-center justify-center pt-5 h-full">
          <p
            className={`text-center font-handwriting ${
              isListening
                ? "text-blue-600 dark:text-blue-200"
                : isSpeaking
                ? "text-emerald-600 dark:text-emerald-200"
                : isProcessing
                ? "text-amber-600 dark:text-amber-200"
                : autoListen
                ? "text-purple-600 dark:text-purple-200"
                : "text-emerald-700 dark:text-emerald-200"
            } transform rotate-[-0.5deg]`}
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
        <div className="absolute top-3 right-3">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </div>
      )}
    </div>
  );
}