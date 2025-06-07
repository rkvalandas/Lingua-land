"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LanguageSelector from "./components/LanguageSelector";
import ConversationContainer from "./components/ConversationContainer";
import UserInputArea from "./components/UserInputArea";
import AIServiceUI from "./components/AIServiceUI";
import { useConversationState } from "./hooks/useConversationState";
import { useAIServices } from "./hooks/useAIServices";
import { languages } from "./data/languages";

export default function Services() {
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service") || "conversation";
  const selectedLanguage = searchParams.get("language") || "English";

  // Initialize conversation state
  const {
    state,
    conversation,
    conversationContainerRef,
    audioRef,
    processTranscript,
    toggleRecordingMode,
    playMessageAudio,
  } = useConversationState(selectedLanguage);

  // Initialize AI services hook
  const {
    grammarState,
    translatorState,
    summariserState,
    paraphraserState,
    checkGrammar,
    translateText,
    summariseText,
    paraphraseText,
    updateInputText,
    updateLanguage,
    updateSourceLanguage,
    clearResult,
  } = useAIServices();

  const renderServiceContent = () => {
    switch (selectedService) {
      case "conversation":
        return (
          <div className="h-full flex flex-col relative p-3 sm:p-6">
            {/* Use consistent background styling with landing page */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent dark:from-transparent to-amber-100/30 dark:to-lime-900/50"></div>

            {/* Practice Interface */}
            <div className="relative z-10 flex-1 flex flex-col">
              {/* Conversation Container */}
              <ConversationContainer
                ref={conversationContainerRef}
                conversation={conversation}
                isListening={state.isListening}
                autoListen={state.autoListen}
                playMessageAudio={playMessageAudio}
              />

              {/* User Input Area */}
              <UserInputArea
                state={state}
                transcript={state.transcript}
                selectedLanguage={selectedLanguage}
                toggleRecordingMode={toggleRecordingMode}
              />

              {/* Hidden audio element for TTS */}
              <audio ref={audioRef} style={{ display: "none" }} />
            </div>
          </div>
        );

      case "grammar":
        return (
          <AIServiceUI
            title="Grammar Checker"
            description="Check and correct grammar mistakes in your text"
            placeholder="Enter text to check grammar..."
            buttonText="Check Grammar"
            state={grammarState}
            onProcess={(text: string, language: string) =>
              checkGrammar(text, language)
            }
            onInputChange={(text: string) => updateInputText("grammar", text)}
            onLanguageChange={(language: string) =>
              updateLanguage("grammar", language)
            }
            onClear={() => clearResult("grammar")}
            showLanguageSelector={true}
          />
        );

      case "translator":
        return (
          <AIServiceUI
            title="Translator"
            description="Translate text between different languages"
            placeholder="Enter text to translate..."
            buttonText="Translate"
            state={translatorState}
            onProcess={(
              text: string,
              targetLanguage: string,
              sourceLanguage?: string
            ) => translateText(text, targetLanguage, sourceLanguage)}
            onInputChange={(text: string) =>
              updateInputText("translator", text)
            }
            onLanguageChange={(language: string) =>
              updateLanguage("translator", language)
            }
            onSourceLanguageChange={(language: string) =>
              updateSourceLanguage(language)
            }
            onClear={() => clearResult("translator")}
            showLanguageSelector={true}
            showTranslationLanguages={true}
          />
        );

      case "summariser":
        return (
          <AIServiceUI
            title="Summariser"
            description="Summarise long text into key points"
            placeholder="Enter text to summarise..."
            buttonText="Summarise"
            state={summariserState}
            onProcess={(text: string, language: string) =>
              summariseText(text, language)
            }
            onInputChange={(text: string) =>
              updateInputText("summariser", text)
            }
            onLanguageChange={(language: string) =>
              updateLanguage("summariser", language)
            }
            onClear={() => clearResult("summariser")}
            showLanguageSelector={true}
          />
        );

      case "paraphraser":
        return (
          <AIServiceUI
            title="Paraphraser"
            description="Rephrase text while maintaining meaning"
            placeholder="Enter text to paraphrase..."
            buttonText="Paraphrase"
            state={paraphraserState}
            onProcess={(text: string, language: string) =>
              paraphraseText(text, language)
            }
            onInputChange={(text: string) =>
              updateInputText("paraphraser", text)
            }
            onLanguageChange={(language: string) =>
              updateLanguage("paraphraser", language)
            }
            onClear={() => clearResult("paraphraser")}
            showLanguageSelector={true}
          />
        );

      default:
        return (
          <div className="bg-white/80 dark:bg-yellow-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-yellow-200 dark:border-yellow-600">
            <h2 className="text-3xl font-handwriting text-emerald-800 dark:text-yellow-200 mb-4 transform rotate-[-0.3deg]">
              Service Not Found
            </h2>
            <p className="text-emerald-700 dark:text-yellow-300 mb-6">
              The selected service is not available.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {selectedService === "conversation" ? (
        <div className="flex-1 overflow-hidden">{renderServiceContent()}</div>
      ) : (
        <div className="p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl font-handwriting text-emerald-800 dark:text-emerald-200 mb-2 sm:mb-4 transform rotate-[-0.3deg]">
                Welcome to Lingua Land Services
              </h1>
              <p className="text-emerald-700 dark:text-emerald-300 text-base sm:text-lg">
                Choose a service from the sidebar to get started with your
                language learning journey.
              </p>
            </div>

            {renderServiceContent()}
          </div>
        </div>
      )}
    </>
  );
}
