import TranscriptDisplay from "./TranscriptDisplay";
import RecordingButton from "./RecordingButton";
import { AppState } from "../types";

interface UserInputAreaProps {
  state: AppState;
  transcript: string;
  selectedLanguage: string;
  toggleRecordingMode: () => void;
}

export default function UserInputArea({
  state,
  transcript,
  selectedLanguage,
  toggleRecordingMode,
}: UserInputAreaProps) {
  return (
    <div
      className="flex items-center gap-3 mt-4 p-3 bg-gradient-to-r from-amber-50/95 to-yellow-50/95 dark:from-lime-900/40 dark:to-emerald-900/40 backdrop-blur-lg border-2 border-amber-300/70 dark:border-lime-400/50 rounded-full shadow-xl transition-all duration-300"
      style={{
        boxShadow:
          "0 8px 25px rgba(245, 158, 11, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
      }}
    >
      <div className="flex-1">
        <TranscriptDisplay
          transcript={transcript}
          isListening={state.isListening}
          isSpeaking={state.isSpeaking}
          isProcessing={state.isProcessing}
          autoListen={state.autoListen}
          selectedLanguage={selectedLanguage}
        />
      </div>

      <div className="w-0.5 h-20 bg-gradient-to-b from-amber-300/40 via-amber-400/70 to-amber-300/40 dark:from-lime-400/40 dark:via-lime-400/70 dark:to-lime-400/40 rounded-full"></div>

      <div className="flex-shrink-0">
        <RecordingButton
          isListening={state.isListening}
          isSpeaking={state.isSpeaking}
          isProcessing={state.isProcessing}
          autoListen={state.autoListen}
          toggleRecordingMode={toggleRecordingMode}
        />
      </div>
    </div>
  );
}
