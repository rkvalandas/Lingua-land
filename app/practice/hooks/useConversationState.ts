import { useState, useRef, useEffect, useReducer } from "react";
import { AppState, AIMessage, ConversationMessage, ConversationResponse } from "../types";
import { appReducer } from "./appReducer";
import { getSpeechRecognitionLang, getVoiceForLanguage } from "../utils/languageUtils";

// Add SpeechRecognition type definitions
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror?: (event: Event) => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function useConversationState(selectedLanguage: string) {
  const [conversation, setConversation] = useState<(ConversationMessage | AIMessage)[]>([]);

  // Use reducer for related state
  const [state, dispatch] = useReducer(appReducer, {
    isRecording: false,
    isProcessing: false,
    isSpeaking: false,
    isListening: false,
    autoListen: false,
    transcript: "",
  });

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const conversationIdRef = useRef<number | null>(null);
  const recognitionIsRunningRef = useRef(false);
  const conversationContainerRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    // Check browser support
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Your browser doesn't support speech recognition. Please use Chrome or Edge."
      );
      return;
    }

    // Create recognition instance
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = getSpeechRecognitionLang(selectedLanguage);

    // Configure event handlers
    recognition.onstart = () => {
      console.log("Speech recognition started");
      recognitionIsRunningRef.current = true;

      // Stop immediately if AI started speaking
      if (state.isSpeaking || (audioRef.current && !audioRef.current.paused)) {
        console.log("AI speaking detected, stopping recognition");
        recognition.stop();
        recognitionIsRunningRef.current = false;
        return;
      }

      dispatch({ type: "START_LISTENING" });
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      recognitionIsRunningRef.current = false; // Clear our running ref
      dispatch({ type: "STOP_LISTENING" });
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;

          // Handle user interruption
          if (state.isSpeaking && audioRef.current) {
            console.log("User interrupted, stopping audio");
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            dispatch({ type: "STOP_SPEAKING" });
          }
        } else {
          interimTranscript += transcript;
        }
      }

      dispatch({
        type: "SET_TRANSCRIPT",
        text: finalTranscript || interimTranscript,
      });

      // Auto-process final transcript in auto mode
      if (finalTranscript && state.autoListen) {
        recognition.stop();
        processTranscript(finalTranscript);
        dispatch({ type: "RESET_TRANSCRIPT" });
      }
    };

    recognitionRef.current = recognition;

    // Cleanup on unmount
    return () => {
      if (recognition) {
        try {
          recognition.stop();
          recognitionIsRunningRef.current = false;
        } catch (e) {
          console.error("Error stopping recognition on cleanup:", e);
        }
      }
    };
  }, [selectedLanguage, state.autoListen, state.isProcessing, state.isSpeaking]);

  // Auto-listen effect
  useEffect(() => {
    if (
      state.autoListen &&
      !state.isListening &&
      !state.isProcessing &&
      !state.isSpeaking && // Critical check: don't listen while speaking
      recognitionRef.current &&
      !recognitionIsRunningRef.current
    ) {
      const timer = setTimeout(() => {
        if (
          !state.isListening &&
          !state.isProcessing &&
          !state.isSpeaking && // Double-check before starting
          recognitionRef.current &&
          !recognitionIsRunningRef.current
        ) {
          console.log("Auto-starting speech recognition");
          try {
            recognitionIsRunningRef.current = true;
            recognitionRef.current.start();
          } catch (e) {
            recognitionIsRunningRef.current = false;
            console.error("Failed to auto-start recognition:", e);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [state.autoListen, state.isListening, state.isProcessing, state.isSpeaking]);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = getSpeechRecognitionLang(selectedLanguage);
    }
  }, [selectedLanguage]);

  // Setup audio element
  useEffect(() => {
    if (!audioRef.current) return;

    const audioElement = audioRef.current;

    const handlePlay = () => {
      dispatch({ type: "START_SPEAKING" });

      // Stop speech recognition while playing audio - more robust handling
      if (
        recognitionRef.current &&
        (state.isListening || recognitionIsRunningRef.current)
      ) {
        try {
          console.log("Stopping STT while audio plays");
          recognitionRef.current.stop();
          recognitionIsRunningRef.current = false;
          dispatch({ type: "STOP_LISTENING" });
        } catch (e) {
          console.error("Error stopping recognition during audio playback:", e);
        }
      }
    };

    const handleEnded = () => {
      dispatch({ type: "STOP_SPEAKING" });

      // Only schedule recognition restart after a longer delay
      if (state.autoListen && recognitionRef.current && !state.isProcessing) {
        console.log("Audio ended, scheduling STT restart");

        // Prevent any pending recognition attempts
        if (recognitionIsRunningRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            // Ignore errors, just making sure it's stopped
          }
          recognitionIsRunningRef.current = false;
        }

        // Use a longer delay to ensure everything settled
        setTimeout(() => {
          if (
            recognitionRef.current &&
            !recognitionIsRunningRef.current &&
            !state.isProcessing &&
            !state.isSpeaking &&
            state.autoListen
          ) {
            console.log("Now attempting to restart STT after audio");
            try {
              recognitionIsRunningRef.current = true;
              recognitionRef.current.start();
            } catch (e) {
              recognitionIsRunningRef.current = false;
              console.error("Failed to restart recognition after audio:", e);
            }
          } else {
            console.log("Skipping scheduled STT restart - conditions not met");
          }
        }, 1000); // Increased to 1 second to avoid race conditions
      }
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e);
      dispatch({ type: "STOP_SPEAKING" });

      // Try fallback TTS
      const lastAiMessage = conversation[conversation.length - 1];
      if (lastAiMessage && lastAiMessage.type === "ai") {
        useBrowserTTS(lastAiMessage.text, selectedLanguage);
      }
    };

    // Add event listeners
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("error", handleError);

    // Cleanup listeners on effect dependency changes
    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("error", handleError);
    };
  }, [
    audioRef.current,
    state.autoListen,
    state.isProcessing,
    state.isListening,
    state.isSpeaking,
    conversation,
    selectedLanguage,
  ]);

  // Start new conversation when language changes
  useEffect(() => {
    async function startNewConversation() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/conversations",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: 1,
              language: selectedLanguage,
            }),
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        conversationIdRef.current = data.conversationId;
        setConversation([]); // Clear conversation
      } catch (error) {
        console.error("Failed to start conversation:", error);
      }
    }

    startNewConversation();
  }, [selectedLanguage]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      conversation.forEach((message) => {
        if (
          message.type === "ai" &&
          message.audio &&
          message.audio.startsWith("blob:")
        ) {
          URL.revokeObjectURL(message.audio);
        }
      });
    };
  }, [conversation]);

  // Auto-scroll to the bottom when conversation changes
  useEffect(() => {
    if (conversationContainerRef.current) {
      const container = conversationContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [conversation]);

  // Process transcript and get AI response
  const processTranscript = async (text: string): Promise<void> => {
    if (!text.trim()) return;

    try {
      dispatch({ type: "START_PROCESSING" });

      // 1. Get AI response
      const conversationResponse = await fetch(
        "http://localhost:8000/api/conversation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            userId: 1,
            conversationId: conversationIdRef.current,
            language: selectedLanguage,
          }),
        }
      );

      if (!conversationResponse.ok)
        throw new Error(`Error: ${conversationResponse.status}`);

      const data: ConversationResponse = await conversationResponse.json();

      // Add messages to conversation immediately
      setConversation((prev) => [
        ...prev,
        { type: "user", text: data.userText },
        { type: "ai", text: data.aiResponse },
      ]);

      // 2. Request TTS
      try {
        console.log("Requesting TTS for AI response");

        const ttsResponse = await fetch("http://localhost:8000/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: data.aiResponse,
            voice: getVoiceForLanguage(selectedLanguage),
          }),
        });

        if (!ttsResponse.ok)
          throw new Error(`TTS API returned ${ttsResponse.status}`);

        // Parse the response with audio data
        const audioData = await ttsResponse.json();

        if (!audioData.audioData) throw new Error("No audio data received");

        console.log("Received audio data URI");

        // Store the data URI for replay
        setConversation((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage && lastMessage.type === "ai") {
            lastMessage.audio = audioData.audioData;
          }
          return updated;
        });

        // Play the audio
        if (audioRef.current) {
          // Set source and play
          audioRef.current.src = audioData.audioData;

          try {
            await audioRef.current.play();
            console.log("Audio playing successfully");
          } catch (playError) {
            console.error("Audio play error:", playError);
            useBrowserTTS(data.aiResponse, selectedLanguage);
          }
        } else {
          throw new Error("Audio element not available");
        }
      } catch (ttsError) {
        console.error("TTS processing failed:", ttsError);
        useBrowserTTS(data.aiResponse, selectedLanguage);
      }
    } catch (error) {
      console.error("Error processing transcript:", error);
    } finally {
      dispatch({ type: "STOP_PROCESSING" });
    }
  };

  // Browser's built-in TTS fallback
  const useBrowserTTS = (text: string, language: string) => {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechRecognitionLang(language);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      dispatch({ type: "START_SPEAKING" });
      if (recognitionRef.current && state.isListening) {
        recognitionRef.current.stop();
      }
    };

    utterance.onend = () => {
      dispatch({ type: "STOP_SPEAKING" });
      if (state.autoListen && recognitionRef.current && !state.isProcessing) {
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
          } catch (e) {
            console.error("Failed to restart recognition after TTS:", e);
          }
        }, 500);
      }
    };

    utterance.onerror = (error) => {
      console.error("Browser TTS error:", error);
      dispatch({ type: "STOP_SPEAKING" });
    };

    window.speechSynthesis.speak(utterance);
  };

  // Toggle conversation mode
  const toggleRecordingMode = () => {
    if (state.isListening || state.isProcessing || state.isSpeaking) {
      // Stop everything
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          recognitionIsRunningRef.current = false;
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }

      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }

      window.speechSynthesis?.cancel();

      dispatch({ type: "STOP_LISTENING" });
      dispatch({ type: "STOP_SPEAKING" });
      dispatch({ type: "STOP_PROCESSING" });
      dispatch({ type: "SET_AUTO_LISTEN", enable: false });
    } else {
      // Start conversation mode
      setConversation((prev) => {
        if (prev.length === 0) {
          return [
            {
              type: "ai",
              text: "Conversation mode activated. You can start speaking when the listening indicator appears.",
            },
          ];
        }
        return prev;
      });

      dispatch({ type: "SET_AUTO_LISTEN", enable: true });
    }
  };

  // Play a message from history
  const playMessageAudio = (message: AIMessage) => {
    if (!message.audio) return;

    if (audioRef.current) {
      // Stop any current playback
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }

      // Play directly from the data URI
      audioRef.current.src = message.audio;
      audioRef.current.play().catch((error) => {
        console.error("Replay failed:", error);
        useBrowserTTS(message.text, selectedLanguage);
      });
    }
  };

  return {
    state,
    conversation,
    conversationContainerRef,
    audioRef,
    processTranscript,
    toggleRecordingMode,
    playMessageAudio
  };
}