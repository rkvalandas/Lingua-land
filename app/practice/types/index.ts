export interface AppState {
  isRecording: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  autoListen: boolean;
  transcript: string;
}

export interface ConversationMessage {
  type: "user";
  text: string;
}

export interface AIMessage {
  type: "ai";
  text: string;
  audio?: string;
}

export interface ConversationResponse {
  userText: string;
  aiResponse: string;
  audioUrl?: string;
}