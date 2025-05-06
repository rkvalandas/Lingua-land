import { AppState } from "../types";

type AppAction =
  | { type: "START_RECORDING" }
  | { type: "STOP_RECORDING" }
  | { type: "START_PROCESSING" }
  | { type: "STOP_PROCESSING" }
  | { type: "START_SPEAKING" }
  | { type: "STOP_SPEAKING" }
  | { type: "START_LISTENING" }
  | { type: "STOP_LISTENING" }
  | { type: "SET_AUTO_LISTEN"; enable: boolean }
  | { type: "SET_TRANSCRIPT"; text: string }
  | { type: "RESET_TRANSCRIPT" };

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "START_RECORDING":
      return { ...state, isRecording: true };
    case "STOP_RECORDING":
      return { ...state, isRecording: false };
    case "START_PROCESSING":
      return { ...state, isProcessing: true };
    case "STOP_PROCESSING":
      return { ...state, isProcessing: false };
    case "START_SPEAKING":
      return { ...state, isSpeaking: true };
    case "STOP_SPEAKING":
      return { ...state, isSpeaking: false };
    case "START_LISTENING":
      return { ...state, isListening: true };
    case "STOP_LISTENING":
      return { ...state, isListening: false };
    case "SET_AUTO_LISTEN":
      return { ...state, autoListen: action.enable };
    case "SET_TRANSCRIPT":
      return { ...state, transcript: action.text };
    case "RESET_TRANSCRIPT":
      return { ...state, transcript: "" };
    default:
      return state;
  }
}