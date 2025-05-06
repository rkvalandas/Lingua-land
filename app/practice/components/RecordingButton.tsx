import ListeningIcon from "./icons/ListeningIcon";
import SpeakingIcon from "./icons/SpeakingIcon";
import ProcessingIcon from "./icons/ProcessingIcon";
import StopIcon from "./icons/StopIcon";
import MicrophoneIcon from "./icons/MicrophoneIcon";

interface RecordingButtonProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  autoListen: boolean;
  toggleRecordingMode: () => void;
}

export default function RecordingButton({
  isListening,
  isSpeaking,
  isProcessing,
  autoListen,
  toggleRecordingMode
}: RecordingButtonProps) {
  return (
    <button
      onClick={toggleRecordingMode}
      disabled={isProcessing}
      className={`rounded-full min-w-[90px] min-h-[100px] flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
        isListening
          ? "bg-gradient-to-r from-blue-400 to-blue-600 border-4 border-blue-300"
          : isSpeaking
          ? "bg-gradient-to-r from-emerald-400 to-emerald-600 border-4 border-emerald-300"
          : isProcessing
          ? "bg-gradient-to-r from-amber-400 to-amber-600 border-4 border-amber-300"
          : autoListen
          ? "bg-gradient-to-r from-purple-400 to-purple-600 border-4 border-purple-300"
          : "bg-gradient-to-r from-lime-400 to-emerald-600 border-4 border-lime-500 dark:border-emerald-300"
      }`}
      style={{ 
        boxShadow: "0 0 15px rgba(52, 211, 153, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.8)",
        filter: "drop-shadow(0 0 5px rgba(52, 211, 153, 0.3))"
      }}
    >
      {isListening ? (
        <ListeningIcon />
      ) : isSpeaking ? (
        <SpeakingIcon />
      ) : isProcessing ? (
        <ProcessingIcon />
      ) : autoListen ? (
        <StopIcon />
      ) : (
        <MicrophoneIcon />
      )}
    </button>
  );
}