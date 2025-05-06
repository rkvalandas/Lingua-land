"use client";

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import ViewportMeta from "../components/ViewportMeta";
import BackgroundImage from "./components/BackgroundImage";
import LanguageSelector from "./components/LanguageSelector";
import ConversationContainer from "./components/ConversationContainer";
import UserInputArea from "./components/UserInputArea";
import { useConversationState } from "./hooks/useConversationState";
import { languages } from "./data/languages";
import SVGFilters from "./components/SVGFilters";

export default function Practice() {
  // Media query for mobile detection
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const {
    state,
    conversation,
    conversationContainerRef,
    audioRef,
    processTranscript,
    toggleRecordingMode,
    playMessageAudio
  } = useConversationState(selectedLanguage);

  return (
    <div className="min-h-screen overflow-hidden relative bg-amber-50/50 dark:bg-indigo-900/50">
      <ViewportMeta />
      <BackgroundImage />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col min-h-screen">
        <h1 
          className="text-3xl font-handwriting text-center text-emerald-800 dark:text-emerald-200 mb-2 transform rotate-[-0.3deg]"
          style={{ textShadow: "1px 1px 0 rgba(0,50,0,0.1)" }}
        >
          Language Practice
        </h1>
        
        <LanguageSelector 
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          disabled={state.isProcessing || state.isRecording || state.isSpeaking}
        />

        <ConversationContainer 
          ref={conversationContainerRef}
          conversation={conversation}
          isListening={state.isListening}
          autoListen={state.autoListen}
          playMessageAudio={playMessageAudio}
        />

        <UserInputArea 
          state={state}
          transcript={state.transcript}
          selectedLanguage={selectedLanguage}
          toggleRecordingMode={toggleRecordingMode}
        />

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />

        <SVGFilters />
      </div>
    </div>
  );
}