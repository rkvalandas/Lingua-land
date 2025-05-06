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
  toggleRecordingMode
}: UserInputAreaProps) {
  return (
    <div className="flex items-center">
      <TranscriptDisplay 
        transcript={transcript}
        isListening={state.isListening}
        isSpeaking={state.isSpeaking}
        isProcessing={state.isProcessing}
        autoListen={state.autoListen}
        selectedLanguage={selectedLanguage}
      />
      
      <RecordingButton 
        isListening={state.isListening}
        isSpeaking={state.isSpeaking}
        isProcessing={state.isProcessing}
        autoListen={state.autoListen}
        toggleRecordingMode={toggleRecordingMode}
      />
    </div>
  );
}